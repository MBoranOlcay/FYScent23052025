// parfum-vitrini/app/perfumes/[slug]/page.tsx

import Link from 'next/link';
import type { Metadata, ResolvingMetadata } from 'next';
import type { Product as Perfume, FragranceNote } from '@/types';
import { supabase } from '@/lib/supabaseClient';
import { notFound } from 'next/navigation';

import ProductGallery from '@/components/ProductGallery'; // Bu dosyanın da en son doğru haliyle olduğundan emin ol
import ProductInfo from '@/components/ProductInfo';
import FragrancePyramid from '@/components/FragrancePyramid';
import ProductTabsDisplay from '@/components/ProductTabsDisplay';

interface PerfumeDetailPageProps {
  params: { slug: string };
}

async function fetchPerfumeDataBySlug(slug: string): Promise<Perfume | null> {
  console.log(`[fetchPerfumeDataBySlug] Fetching perfume with slug: ${slug}`);
  const { data, error } = await supabase
    .from('perfumes')
    .select(`
      id, name, slug, description, images, long_description,
      details_gender, details_family, details_concentration, details_release_year, details_longevity, details_sillage,
      brand:brands (id, name, slug), 
      fragranceNotes:perfume_notes (
        note_type,
        note:notes (id, name, description)
      )
      /* Supabase'de olmayan sütunlar (price, ratings vs.) sorgudan çıkarıldı */
    `)
    .eq('slug', slug)
    .single();

  if (error) {
    console.error(`Supabase error in fetchPerfumeDataBySlug (slug: ${slug}):`, error.message);
    return null;
  }
  if (!data) {
    console.log(`Supabase: Perfume with slug '${slug}' not found in fetchPerfumeDataBySlug.`);
    return null;
  }

  const perfume: Perfume = {
    id: data.id?.toString() ?? `unknown-id-${slug}`,
    name: data.name ?? 'İsim Bilgisi Yok',
    slug: data.slug ?? slug,
    brand: data.brand?.name ?? 'Bilinmeyen Marka',
    description: data.description ?? '',
    images: Array.isArray(data.images) ? data.images : [],
    fragranceNotes: Array.isArray(data.fragranceNotes) 
      ? data.fragranceNotes.map((pn: any) => ({
          name: pn.note?.name ?? 'Bilinmeyen Nota',
          type: (pn.note_type ?? 'base') as 'top' | 'heart' | 'base',
          description: pn.note?.description ?? '',
        }))
      : [],
    longDescription: data.long_description ?? '',
    details: {
      gender: data.details_gender ?? undefined,
      family: data.details_family ?? undefined,
      concentration: data.details_concentration ?? undefined,
      releaseYear: data.details_release_year ?? undefined,
      longevity: data.details_longevity ?? undefined,
      sillage: data.details_sillage ?? undefined,
    },
    price: undefined, 
    discountPrice: undefined,
    ratings: { average: 0, count: 0 },
    sizes: [],
    reviews: [],
    relatedProducts: [],
  };
  return perfume;
}

export async function generateMetadata({ params }: PerfumeDetailPageProps): Promise<Metadata> {
  const perfume = await fetchPerfumeDataBySlug(params.slug);
  if (!perfume) {
    return { 
      title: 'Parfüm Bulunamadı - FindYourScent',
      description: 'Aradığınız parfüm bulunamadı.',
    };
  }
  return {
    title: `${perfume.name} - ${perfume.brand} | FindYourScent`,
    description: perfume.description?.substring(0, 160) || `${perfume.name}, ${perfume.brand} markasının eşsiz bir kokusudur. Detayları keşfedin.`,
    openGraph: {
      title: `${perfume.name} by ${perfume.brand}`,
      description: perfume.description?.substring(0, 160) || `${perfume.name} parfümünün detayları.`,
      images: perfume.images && perfume.images.length > 0 ? [{ url: perfume.images[0] }] : [],
    },
  };
}

export async function generateStaticParams() {
  console.log("[generateStaticParams] Fetching slugs from Supabase...");
  const { data: perfumesFromDB, error } = await supabase
    .from('perfumes')
    .select('slug');

  if (error || !perfumesFromDB) {
    console.error("Error fetching perfume slugs for generateStaticParams:", error?.message);
    return []; // Hata durumunda veya veri yoksa boş dizi döndür
  }

  const paths = perfumesFromDB
    .filter(p => p.slug) // slug'ı null veya undefined olmayanları al
    .map((p) => ({
      slug: p.slug!, // slug'ın var olduğunu belirt
    }));
  console.log("[generateStaticParams] Generated paths:", paths);
  return paths;
}

export default async function PerfumeDetailPage({ params }: PerfumeDetailPageProps) {
  const perfume = await fetchPerfumeDataBySlug(params.slug);

  if (!perfume) {
    notFound();
  }

  const groupedNotesForProductInfo = (perfume.fragranceNotes && Array.isArray(perfume.fragranceNotes))
    ? perfume.fragranceNotes.reduce((acc, note) => {
        if (note && note.type && note.name) {
          (acc[note.type] = acc[note.type] || []).push(note.name);
        }
        return acc;
      }, { top: [], heart: [], base: [] } as Record<FragranceNote['type'], string[]>)
    : { top: [], heart: [], base: [] };

  return (
    <div>
      {perfume.images && perfume.images.length > 0 && (
        <div
          className="h-[40vh] md:h-[45vh] bg-cover bg-center relative -z-10"
          style={{ backgroundImage: `url(${perfume.images[0]})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent"></div>
        </div>
      )}
      <div 
        className={`container mx-auto px-4 sm:px-6 lg:px-8 relative ${
          perfume.images && perfume.images.length > 0 
            ? 'md:-mt-[20vh] lg:-mt-[15vh] -mt-[10vh]'
            : 'mt-10 md:mt-12'
        }`}
      >
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden mb-16 md:mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
            <div className="lg:col-span-1 p-4 sm:p-6 md:p-8 border-r-0 lg:border-r lg:border-gray-200 flex justify-center lg:justify-start">
              <ProductGallery
                images={perfume.images || []}
                productName={perfume.name || "Parfüm"}
              />
            </div>
            <div className="lg:col-span-2 p-6 sm:p-8 md:p-10">
              <ProductInfo 
                perfume={perfume} 
                groupedNotes={groupedNotesForProductInfo} 
              />
            </div>
          </div>

          {perfume.fragranceNotes && perfume.fragranceNotes.length > 0 && (
            <div className="border-t border-gray-200">
              <FragrancePyramid notes={perfume.fragranceNotes} />
            </div>
          )}
          {(perfume.longDescription || perfume.details || (perfume.reviews && perfume.reviews.length > 0)) && (
            <div className="border-t border-gray-200 px-2 sm:px-4 md:px-6 lg:px-8">
              <ProductTabsDisplay product={perfume} />
            </div>
          )}
        </div>
        <div className="mt-12 mb-16 text-center">
          <Link href="/perfumes" className="inline-flex items-center gap-2 text-amber-700 hover:text-amber-800 transition-colors font-sans font-medium text-md">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" /></svg>
            Tüm Parfümlere Göz At
          </Link>
        </div>
      </div>
    </div>
  );
}