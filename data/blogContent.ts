// parfum-vitrini/data/blogContent.ts
import type { BlogPost } from '@/types'; // BlogPost tipini @/types/index.ts'den alıyoruz

// BU SATIRIN TAM OLARAK BÖYLE OLDUĞUNDAN EMİN OL:
export const blogPosts: BlogPost[] = [
  {
    slug: 'mevsimin-secilen-parfumleri-2025',
    title: 'Mevsimin Seçilen Parfümleri: 2025 İlkbahar & Yaz Parfüm Rehberi',
    date: '2025-03-15',
    summary: '2025\'in en popüler ilkbahar ve yaz parfümlerini keşfedin. Ferah çiçeksi, meyvemsi ve hafif kokularla bu sezonun favori notaları burada.',
    content: `
      <p>Yeni mevsimle birlikte gardıroplarımız kadar parfümlerimizi de yenileme zamanı! 2025 ilkbahar-yaz sezonu, hafif ama etkileyici kokularla dolup taşıyor. İşte bu sezonun öne çıkan 5 parfüm önerisi:</p>
      <h2 class="text-2xl font-serif mt-6 mb-3">Dior J'adore Parfum d'Eau</h2>
      <p><strong>Notalar:</strong> Neroli, Yasemin Sambac, Manolya, Gül</p>
      <p><strong>Neden Seçilmeli:</strong> Zarif, saf ve alkolsüz; J'adore'un su bazlı yenilikçi yorumu.</p>
      <h2 class="text-2xl font-serif mt-6 mb-3">Gucci Bloom Eau de Parfum</h2>
      <p><strong>Notalar:</strong> Sümbülteber, Yasemin, Rangoon Sarmaşığı</p>
      <p><strong>Neden Seçilmeli:</strong> Yoğun beyaz çiçeklerle romantik ve otantik bir bahar kokusu.</p>
      <h2 class="text-2xl font-serif mt-6 mb-3">Jo Malone London Peony & Blush Suede</h2>
      <p><strong>Notalar:</strong> Kırmızı Elma, Şakayık, Süet</p>
      <p><strong>Neden Seçilmeli:</strong> Flörtöz, narin ve lüks; ilkbahar günleri için ideal.</p>
      <h2 class="text-2xl font-serif mt-6 mb-3">Tom Ford Neroli Portofino</h2>
      <p><strong>Notalar:</strong> Neroli, Limon, Bergamot, Amber</p>
      <p><strong>Neden Seçilmeli:</strong> Akdeniz esintisi arayanlar için unisex, temiz ve sofistike bir kaçış.</p>
      <h2 class="text-2xl font-serif mt-6 mb-3">Byredo Gypsy Water</h2>
      <p><strong>Notalar:</strong> Bergamot, Çam İğneleri, Vanilya, Sandal Ağacı</p>
      <p><strong>Neden Seçilmeli:</strong> Özgür ruhlu, bohem ve odunsu; hem ferah hem de sıcak.</p>
      <p class="mt-6 italic text-gray-600"><strong>İpucu:</strong> Sıcak havalarda parfümü nabız noktalarınıza veya hafifçe saçlarınıza sıkmak, kokunun gün boyu sizinle kalmasına yardımcı olur.</p>
    `,
    metaTitle: 'Mevsimin Seçilen Parfümleri | 2025 İlkbahar & Yaz Kokuları - FindMyScent',
    metaDescription: '2025\'in en popüler ilkbahar ve yaz parfümlerini keşfedin. FindMyScent ile ferah çiçeksi, meyvemsi ve hafif kokularla bu sezonun favori notalarını bulun.',
    coverImage: '/images/blog/spring-summer-guide.jpg'
  },
  {
    slug: '2024-yilinin-en-cok-tercih-edilen-parfumleri',
    title: '2024 Yılının En Çok Tercih Edilen Parfümleri',
    date: '2024-12-28',
    summary: '2024 yılında en çok satan ve en beğenilen parfümleri listeledik. Lüks markalardan ikonik kokulara kadar işte yılın en çok tercih edilenleri.',
    content: `
      <p>2024 yılı boyunca hangi parfümler trend oldu...</p>
      {/* ... (içeriğin tamamı) ... */}
    `,
    metaTitle: '2024\'ün En Çok Satan Parfümleri | En Popüler Kokular - FindMyScent',
    metaDescription: '2024 yılında en çok satan ve en beğenilen parfümleri listeledik...',
    coverImage: '/images/blog/popular-2024.jpg'
  },
  {
    slug: 'kendinize-uygun-parfumu-nasil-secersiniz',
    title: 'Kendinize Uygun Parfümü Nasıl Seçersiniz?',
    date: '2024-12-15',
    summary: 'Doğru parfümü seçmek zor olabilir...',
    content: `
      <p>Parfüm seçimi kişiseldir...</p>
      {/* ... (içeriğin tamamı) ... */}
    `,
    metaTitle: 'Kişisel Parfüm Seçimi Rehberi | İdeal Kokunuzu Bulun - FindMyScent',
    metaDescription: 'Doğru parfümü seçmek zor olabilir...',
    coverImage: '/images/blog/how-to-choose-perfume.jpg'
  }
];