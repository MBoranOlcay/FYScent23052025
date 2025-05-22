// parfum-vitrini/app/page.tsx
import Link from 'next/link';
import Image from 'next/image';
import { Sparkles } from 'lucide-react';
import FeaturedPerfumesCarousel from '@/components/FeaturedPerfumesCarousel';
import { supabase } from '@/lib/supabaseClient'; // Supabase client'ı import et
import type { Product as Perfume } from '@/types';

// Supabase'den öne çıkan parfümleri çekmek için fonksiyon
async function getFeaturedPerfumes(): Promise<Perfume[]> {
  console.log("[HomePage - getFeaturedPerfumes] Fetching featured perfumes...");
  const { data, error } = await supabase
    .from('perfumes')
    .select(`
      id, 
      name, 
      slug, 
      description, 
      images,
      brand:brands ( name )
    `)
    .limit(10) // Öne çıkanlar için 10 parfüm çekelim
    .order('created_at', { ascending: false }); // En yeni eklenenler veya başka bir kriter

  if (error) {
    console.error('[HomePage - getFeaturedPerfumes] Supabase error:', error.message);
    return [];
  }
  if (!data) {
    console.log('[HomePage - getFeaturedPerfumes] No featured perfumes found.');
    return [];
  }
  console.log(`[HomePage - getFeaturedPerfumes] ${data.length} perfumes received.`);

  return data.map(p => ({
    id: p.id?.toString() ?? `featured-unknown-${Math.random().toString(36).substring(7)}`,
    name: p.name ?? 'İsimsiz Parfüm',
    slug: p.slug ?? '', // Slug alanı Perfume tipinde olmalı
    brand: p.brand?.name ?? 'Bilinmeyen Marka',
    description: p.description ?? '',
    images: Array.isArray(p.images) ? p.images : [],
    fragranceNotes: [], // Carousel için gerekmeyebilir, boş bırakılabilir
    longDescription: undefined,
    details: undefined,
    price: undefined, 
    ratings: undefined,
    sizes: undefined, 
    reviews: undefined, 
    relatedProducts: undefined,
  })) as Perfume[];
}

export default async function HomePage() {
  const featuredPerfumesForCarousel = await getFeaturedPerfumes();

  return (
    <>
      {/* Hero Alanı */}
      <section 
        className="relative flex flex-col items-center justify-center text-center bg-gradient-to-br from-purple-100 via-pink-50 to-amber-100 px-4"
        // Header'ın fixed olduğunu ve yüksekliğinin CSS değişkeni ile yönetildiğini varsayıyoruz
        // (globals.css'te :root { --header-height: 5rem; /* veya header yüksekliği */ })
        style={{ minHeight: 'calc(100vh - var(--header-height, 5rem))' }}
      >
        {/* Sağdaki Büyük Bulanık Görsel Alanı */}
        <div className="absolute inset-y-0 right-0 w-1/2 md:w-2/5 lg:w-1/3 xl:w-2/5 opacity-30 sm:opacity-40 pointer-events-none -z-10">
          <div className="absolute -right-1/4 sm:-right-1/3 top-1/2 -translate-y-1/2 w-[25rem] h-[25rem] sm:w-[35rem] sm:h-[35rem] md:w-[45rem] md:h-[45rem] lg:w-[50rem] lg:h-[50rem]">
            <Image 
              src="/images/site/hero-decoration.png" // Bu görselin public/images/site altında olduğundan emin ol
              alt="Dekoratif parfüm şişeleri"
              fill
              style={{ objectFit: 'contain' }}
              className="rounded-full filter blur-md"
              quality={75}
              priority // Sayfanın üst kısmında olduğu için öncelikli
            />
            <div className="absolute inset-0 bg-gradient-to-br from-amber-300/10 via-rose-300/10 to-purple-300/10 rounded-full filter blur-2xl -z-1" />
          </div>
        </div>
        
        {/* İçerik Alanı */}
        <div className="relative z-10 container mx-auto flex flex-col items-center justify-center flex-grow py-12 sm:py-16">
          <div className="max-w-2xl lg:max-w-3xl mx-auto">
            <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl font-bold text-gray-800 mb-6 sm:mb-8">
              FindYourScent'e Hoş Geldiniz
            </h1>
            <p className="text-md sm:text-lg md:text-xl font-sans text-gray-600 mb-10 sm:mb-12 max-w-lg lg:max-w-xl mx-auto">
              Mükemmel kokunuzu, özenle seçilmiş lüks parfüm koleksiyonumuz aracılığıyla keşfedin.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
              <Link
                href="/quiz" // Bu sayfa henüz yok
                className="group relative inline-flex items-center justify-center px-7 py-3.5 sm:px-8 sm:py-4 text-base sm:text-lg font-medium text-white bg-amber-600 hover:bg-amber-700 rounded-full overflow-hidden transition-all duration-300 ease-out shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <Sparkles className="w-5 h-5 mr-2.5 opacity-90 group-hover:opacity-100 transition-opacity" />
                Kokumu Bul
                <div className="absolute inset-0 bg-white/10 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              </Link>
              
              <Link
                href="/perfumes"
                className="group relative inline-flex items-center justify-center px-7 py-3.5 sm:px-8 sm:py-4 text-base sm:text-lg font-medium text-amber-700 border-2 border-amber-600 bg-white/70 hover:bg-white rounded-full overflow-hidden transition-all duration-300 ease-out hover:text-amber-800 hover:border-amber-800 shadow-md hover:shadow-lg"
              >
                Tüm Parfümler
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Öne Çıkan Parfümler Carousel Alanı */}
      {featuredPerfumesForCarousel.length > 0 && (
        <section className="py-16 md:py-24 bg-gray-50"> {/* Arka plan rengi değiştirildi */}
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-serif font-semibold text-gray-800 text-center mb-10 md:mb-12">
              Öne Çıkan Kokularımız
            </h2>
            
            <FeaturedPerfumesCarousel perfumes={featuredPerfumesForCarousel} />

            <div className="text-center mt-12 md:mt-16">
              <Link
                href="/perfumes"
                className="inline-block border-2 border-amber-700 text-amber-700 hover:bg-amber-700 hover:text-white font-sans font-semibold py-3 px-8 rounded-lg transition-all duration-300 text-md"
              >
                Tüm Koleksiyonu Gör
              </Link>
            </div>
          </div>
        </section>
      )}
    </>
  );
}