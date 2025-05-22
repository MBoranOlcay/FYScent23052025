// parfum-vitrini/app/brands/page.tsx

import { supabase } from '@/lib/supabaseClient';
import type { Brand } from '@/types'; // Brand tipini @/types'dan alıyoruz
import type { Metadata } from 'next';
import BrandListClient from '@/components/BrandListClient'; 

export const metadata: Metadata = {
  title: 'Tüm Markalar - FindYourScent',
  description: 'FindYourScent\'te bulunan tüm parfüm markalarını ve ürün sayılarını keşfedin.',
};

// Marka adını URL dostu bir slug'a çevirmek için
const createBrandSlugForURL = (brandName: string): string => {
    if (!brandName) return "";
    return brandName.toLowerCase().replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's').replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ç/g, 'c').replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
};

// Brand tipini BrandWithCount olarak genişletelim veya Brand arayüzüne count ekleyelim
interface BrandWithCountFromDB extends Brand { // Supabase'den gelen veri için geçici tip
  perfumes_count?: { count: number }[] | number; // Supabase'in count döndürme şekline göre
}

async function getBrandsWithProductCounts(): Promise<Brand[]> { // Dönen tip hala Brand
  console.log("[getBrandsWithProductCounts] Fetching brands and counts from Supabase...");
  
  const { data: brandsData, error: brandsError } = await supabase
    .from('brands')
    .select(`
      id, 
      name, 
      slug, 
      description, 
      long_description,
      logo_url, 
      banner_url, 
      founded_year, 
      headquarters, 
      category, 
      is_featured,
      perfumes_count: perfumes(count) 
    `)
    .order('name', { ascending: true });

  if (brandsError) {
    console.error('Supabase error fetching brands with counts:', brandsError.message);
    return [];
  }
  if (!brandsData) {
    console.log('Supabase: No brands found.');
    return [];
  }

  console.log(`[getBrandsWithProductCounts] Data received from Supabase:`, brandsData);

  const processedBrands = brandsData.map((b: BrandWithCountFromDB) => {
    let perfumeCount = 0;
    if (b.perfumes_count && Array.isArray(b.perfumes_count) && b.perfumes_count.length > 0) {
      perfumeCount = b.perfumes_count[0].count;
    } else if (typeof b.perfumes_count === 'number') {
      perfumeCount = b.perfumes_count;
    }

    return {
      id: b.id,
      name: b.name,
      slug: b.slug || createBrandSlugForURL(b.name),
      description: b.description || '',
      longDescription: b.long_description || '',
      logo: b.logo_url || undefined,
      banner: b.banner_url || undefined,
      foundedYear: b.founded_year || undefined,
      headquarters: b.headquarters || undefined,
      category: b.category || undefined,
      featured: b.is_featured || false,
      perfumeCount: perfumeCount, // perfumeCount'u Brand tipine ekledik veya BrandWithCount kullanıyoruz
    };
  });
  
  console.log(`[getBrandsWithProductCounts] ${processedBrands.length} brands processed.`);
  return processedBrands as Brand[]; // Tip ataması
}

export default async function BrandsPage() {
  const initialBrands = await getBrandsWithProductCounts();

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-screen">
      <header className="text-center mb-10 md:mb-12">
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-gray-800">
          Parfüm Markaları
        </h1>
        <p className="mt-3 text-lg text-gray-600 font-sans max-w-xl mx-auto">
          Koleksiyonumuzdaki tüm seçkin markaları keşfedin ve ürün sayılarını görün.
        </p>
      </header>
      <BrandListClient initialBrands={initialBrands} />
    </div>
  );
}