export interface Review {
    id: string;
    userName: string;
    rating: number;
    date: string;
    comment: string;
    helpful: number;
  }
  
  export interface FragranceNote {
    name: string;
    type: 'top' | 'heart' | 'base';
    description: string;
  }
  
  export interface Product {
    id: string;
    name: string;
    brand: string;
    description: string;
    longDescription: string;
    price?: number; // Opsiyonel yaptık
  discountPrice?: number; // Opsiyonel yaptık
  ratings?: { // Opsiyonel yaptık veya içindekileri de opsiyonel yapabiliriz
    average: number;
    count: number;
    };
    sizes: {
      value: string;
      price: number;
      isAvailable: boolean;
    }[];
    images: string[];
    fragranceNotes: FragranceNote[];
    details: {
      gender: string;
      family: string;
      concentration: string;
      releaseYear: number;
      recommendedUse: string[];
      longevity: string;
      sillage: string;
    };
    reviews: Review[];
    relatedProducts: string[];
}

// YENİ EKLENEN BLOGPOST TİPİ
export interface BlogPost {
  slug: string;
  title: string;
  date: string; // Veya Date tipi olarak da düşünebilirsin, string daha basit
  summary: string;
  content: string; // HTML içeriği
  metaTitle: string;
  metaDescription: string;
  coverImage: string; // Resim yolu
}
export interface Brand { // Bolt.new'den gelen Brand tipi
  id: string; // Bu bizim Supabase'deki slug'ımız olabilir veya ayrı bir ID
  name: string;
  description: string;
  longDescription?: string; // Opsiyonel yapabiliriz
  logo?: string; // Resim yolu
  banner?: string; // Resim yolu
  foundedYear?: number;
  headquarters?: string;
  category?: string; // 'Luxury', 'Contemporary' gibi
  featured?: boolean;
  // Kendi eklediğimiz slug ve count alanlarını da düşünebiliriz
  slug?: string; // URL için
  perfumeCount?: number; // Markadaki parfüm sayısı
}