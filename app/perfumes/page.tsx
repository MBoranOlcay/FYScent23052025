// parfum-vitrini/app/perfumes/page.tsx
// "use client"; // BU SATIRI SİLDİK/YORUMLADIK

import { supabase } from '@/lib/supabaseClient';
import type { Product as Perfume, FragranceNote } from '@/types'; // Tiplerimizi import ediyoruz
import PerfumeListClient from '@/components/PerfumeListClient'; // Yeni İstemci Bileşenimizi import ediyoruz
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tüm Parfümler - FindMyScent',
  description: 'FindMyScent koleksiyonundaki tüm eşsiz parfümleri, markaları ve notaları keşfedin.',
};

// Supabase'den tüm parfümleri çekmek için fonksiyon
async function getAllPerfumes(): Promise<Perfume[]> {
  console.log("[getAllPerfumes] Fetching all perfumes from Supabase...");
  const { data, error } = await supabase
    .from('perfumes')
    .select(`
      id, 
      name, 
      slug, 
      description, 
      images,
      brand:brands ( name ), 
      fragranceNotes:perfume_notes (
        note_type,
        note:notes ( name ) 
      ),
      details_family 
    `)
    .order('name', { ascending: true }); // İsimlerine göre sıralayalım

  if (error) {
    console.error('Supabase error fetching all perfumes:', error.message);
    return [];
  }
  if (!data) {
    console.log('Supabase: No perfumes found in getAllPerfumes.');
    return [];
  }
  console.log(`[getAllPerfumes] ${data.length} perfumes received from Supabase.`);

  // Gelen veriyi kendi Perfume tipimize map'leyelim
  return data.map(p => ({
    id: p.id?.toString() ?? `unknown-${Math.random()}`, // ID her zaman string olmalı
    name: p.name ?? 'İsim Yok',
    slug: p.slug ?? '',
    brand: p.brand?.name ?? 'Bilinmeyen Marka',
    description: p.description ?? '',
    images: Array.isArray(p.images) ? p.images : [],
    fragranceNotes: Array.isArray(p.fragranceNotes) 
      ? p.fragranceNotes.map((pn: any) => ({
          name: pn.note?.name ?? 'Bilinmeyen Nota',
          type: (pn.note_type ?? 'base') as 'top' | 'heart' | 'base',
          description: '', // Listeleme için description'a gerek yok şimdilik
        })) 
      : [],
    details: { 
      family: p.details_family ?? undefined 
      // Diğer details alanları listeleme için gerekmiyorsa undefined olabilir
    },
    // Listeleme için gerekmeyen diğer alanlar için varsayılanlar
    longDescription: undefined, 
    price: undefined, 
    ratings: undefined, 
    sizes: undefined, 
    reviews: undefined, 
    relatedProducts: undefined,
  })) as Perfume[];
}

export default async function PerfumesPage() {
  const initialPerfumesData = await getAllPerfumes();

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl sm:text-4xl font-bold font-serif text-gray-800 mb-8 text-center">
        Tüm Parfümler
      </h1>
      
      <PerfumeListClient initialPerfumes={initialPerfumesData} />
    </div>
  );
}