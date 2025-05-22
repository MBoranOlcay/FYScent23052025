// parfum-vitrini/app/brands/[brandSlug]/page.tsx
import Link from 'next/link';
import Image from 'next/image';
import { supabase } from '@/lib/supabaseClient';
import type { Brand, Product as Perfume, FragranceNote, ProductDetails } from '@/types';
import { notFound } from 'next/navigation';
import type { Metadata, ResolvingMetadata } from 'next';
import PerfumeCard from '@/components/PerfumeCard';

const createBrandSlugForURL = (brandName: string): string => {
    if (!brandName) return "";
    return brandName.toLowerCase().replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's').replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ç/g, 'c').replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
};

interface BrandDetailPageProps {
  params: { brandSlug: string };
}

async function getBrandDetails(slug: string): Promise<Brand | null> {
  console.log(`[BrandDetail - getBrandDetails] Fetching brand for slug: ${slug}`);
  const { data, error } = await supabase
    .from('brands')
    .select(`
      id, name, slug, description, long_description, logo_url, banner_url, 
      founded_year, headquarters, category, is_featured,
      perfumes_count: perfumes(count)
    `)
    .eq('slug', slug)
    .single();

  if (error) { console.error(`Supabase error fetching brand by SLUG (${slug}):`, error.message); return null; }
  if (!data) { console.log(`Supabase: Brand with slug '${slug}' not found.`); return null; }

  let perfumeCount = 0;
  if (data.perfumes_count && Array.isArray(data.perfumes_count) && data.perfumes_count.length > 0) {
    perfumeCount = data.perfumes_count[0].count;
  } else if (typeof data.perfumes_count === 'number') {
    perfumeCount = data.perfumes_count;
  }

  return {
    id: data.id,
    name: data.name || 'Marka Adı Yok',
    slug: data.slug || createBrandSlugForURL(data.name || ''),
    description: data.description || '',
    longDescription: data.long_description || '',
    logo: data.logo_url || undefined,
    banner: data.banner_url || undefined,
    foundedYear: data.founded_year || undefined,
    headquarters: data.headquarters || undefined,
    category: data.category || undefined,
    featured: data.is_featured || false,
    perfumeCount: perfumeCount,
  } as Brand;
}

async function getPerfumesByBrandId(brandId: string): Promise<Perfume[]> {
  console.log(`[BrandDetail - getPerfumesByBrandId] Fetching perfumes for brandId: ${brandId}`);
  const { data, error } = await supabase
    .from('perfumes')
    .select(`
      id, 
      name, 
      slug, 
      description, 
      images,
      details_family, 
      brand:brands ( name ) 
    `)
    .eq('brand_id', brandId)
    .order('name', { ascending: true })
    .limit(20);

  if (error) { console.error(`Supabase error fetching perfumes by brandId (${brandId}):`, error.message); return []; }
  if (!data) { console.log(`Supabase: No perfumes found for brandId ${brandId}.`); return []; }
  
  return data.map(p => {
    const brandNameFromJoin = p.brand && typeof p.brand === 'object' && 'name' in p.brand ? (p.brand as {name: string}).name : 'Bilinmeyen Marka';
    return {
      id: p.id?.toString() ?? `brand-perf-${Math.random().toString(36).substring(7)}`,
      name: p.name ?? 'İsimsiz Parfüm',
      slug: p.slug ?? createBrandSlugForURL(p.name ?? ''),
      brand: brandNameFromJoin,
      description: p.description ?? '',
      images: Array.isArray(p.images) ? p.images : [],
      fragranceNotes: [] as FragranceNote[], 
      details: { 
          family: p.details_family ?? undefined,
          gender: undefined, concentration: undefined, releaseYear: undefined, longevity: undefined, sillage: undefined,
      } as ProductDetails,
      longDescription: undefined,
      price: undefined,
      discountPrice: undefined,
      ratings: undefined,
      sizes: undefined,
      reviews: undefined,
      relatedProducts: undefined,
    };
  }) as Perfume[];
}

export async function generateMetadata({ params }: BrandDetailPageProps): Promise<Metadata> {
  const brand = await getBrandDetails(params.brandSlug);
  if (!brand) return { title: 'Marka Bulunamadı - FindYourScent' };
  return {
    title: `${brand.name} Parfümleri | FindYourScent`,
    description: brand.description || `Keşfedin: ${brand.name} markasının tüm parfüm koleksiyonu ve marka hikayesi.`,
    openGraph: { 
      title: `${brand.name} - FindYourScent`, 
      description: brand.description, 
      images: brand.banner ? [{ url: brand.banner }] : (brand.logo ? [{ url: brand.logo }] : []) 
    },
  };
}

export async function generateStaticParams() {
  const { data: brandsFromDB, error } = await supabase.from('brands').select('slug');
  if (error || !brandsFromDB) { return []; }
  return brandsFromDB.filter(b => b.slug).map((b) => ({ brandSlug: b.slug! }));
}

export default async function BrandDetailPage({ params }: BrandDetailPageProps) {
  const brand = await getBrandDetails(params.brandSlug);
  
  if (!brand) {
    notFound();
  }
  const brandPerfumes = brand.id ? await getPerfumesByBrandId(brand.id.toString()) : [];

  return (
    <div className="min-h-screen bg-gray-50">
      {brand.banner && (
        <div 
          className="h-[45vh] sm:h-[50vh] md:h-[60vh] bg-cover bg-center relative"
          style={{ backgroundImage: `url(${brand.banner})` }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center text-center p-4">
            {brand.logo && (
              <div className="mb-4 sm:mb-6 w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 relative bg-white/20 backdrop-blur-sm rounded-full p-2 shadow-lg">
                <Image src={brand.logo} alt={`${brand.name} Logosu`} fill style={{objectFit: 'contain'}} className="rounded-full"/>
              </div>
            )}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-white drop-shadow-md">
              {brand.name}
            </h1>
            {brand.description && (
              <p className="mt-2 text-sm sm:text-md md:text-lg text-gray-100 max-w-2xl mx-auto drop-shadow-sm">
                {brand.description}
              </p>
            )}
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {brand.longDescription && (
          <section className="max-w-3xl mx-auto mb-12 md:mb-16 bg-white p-6 sm:p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl sm:text-3xl font-serif font-semibold text-gray-800 text-center mb-6 md:mb-8">
              Markamızın Hikayesi
            </h2>
            <div 
                className="prose prose-base sm:prose-lg max-w-none text-gray-700 font-sans leading-relaxed whitespace-pre-line 
                           prose-headings:font-serif prose-headings:text-gray-800 prose-strong:font-semibold"
            >
              <p>{brand.longDescription}</p> 
            </div>
          </section>
        )}

        {(brand.foundedYear || brand.headquarters || typeof brand.perfumeCount === 'number') && (
          <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 text-center mb-12 md:mb-16 max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-lg">
            {brand.foundedYear && (
              <div>
                <p className="text-3xl sm:text-4xl font-serif text-amber-700 font-semibold">{brand.foundedYear}</p>
                <p className="text-xs sm:text-sm text-gray-500 font-sans mt-1 uppercase tracking-wider">Kuruluş</p>
              </div>
            )}
            {brand.headquarters && (
              <div>
                <p className="text-3xl sm:text-4xl font-serif text-amber-700 font-semibold">{brand.headquarters}</p>
                <p className="text-xs sm:text-sm text-gray-500 font-sans mt-1 uppercase tracking-wider">Merkez</p>
              </div>
            )}
            {typeof brand.perfumeCount === 'number' && brand.perfumeCount > 0 && (
              <div>
                <p className="text-3xl sm:text-4xl font-serif text-amber-700 font-semibold">{brand.perfumeCount}</p>
                <p className="text-xs sm:text-sm text-gray-500 font-sans mt-1 uppercase tracking-wider">Parfüm</p>
              </div>
            )}
          </section>
        )}

        {brandPerfumes.length > 0 && (
          <section>
            <h2 className="text-2xl sm:text-3xl font-serif font-semibold text-gray-800 text-center mb-10 md:mb-12">
              {brand.name} Koleksiyonundan Seçmeler
            </h2>
            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-8">
              {brandPerfumes.map((perfume) => (
                <PerfumeCard key={perfume.id} perfume={perfume} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}