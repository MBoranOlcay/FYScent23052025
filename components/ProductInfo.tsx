// components/ProductInfo.tsx
import Link from 'next/link'; // Link'i import et
import type { Product as Perfume, FragranceNote } from '@/types';

// Marka adını URL dostu bir slug'a çevirmek için yardımcı fonksiyon
const createBrandSlug = (brandName?: string) => { // brandName opsiyonel olabilir
    if (!brandName) return ""; // brandName tanımsızsa boş string döndür
    return brandName
      .toLowerCase()
      .replace(/ğ/g, 'g')
      .replace(/ü/g, 'u')
      .replace(/ş/g, 's')
      .replace(/ı/g, 'i')
      .replace(/ö/g, 'o')
      .replace(/ç/g, 'c')
      .replace(/\s+/g, '-') // Boşlukları tire ile değiştir
      .replace(/[^\w-]+/g, ''); // Alfanümerik olmayan karakterleri kaldır (tire hariç)
};

interface ProductInfoProps {
  perfume: Perfume;
  groupedNotes: Record<FragranceNote['type'], string[]>;
}

export default function ProductInfo({ perfume, groupedNotes }: ProductInfoProps) {
  return (
    <div className="flex flex-col space-y-6"> {/* Genel dikey boşluk ayarı */}
      
      {/* MARKA ADI (Linkli) */}
      {perfume.brand && (
        <div>
          <Link 
            href={`/brands/${createBrandSlug(perfume.brand)}`} 
            className="inline-block" // Linkin blok gibi davranmaması için
          >
            <p className="font-sans text-xs sm:text-sm font-medium text-amber-700 hover:text-amber-800 hover:underline uppercase tracking-wider transition-colors">
              {perfume.brand}
            </p>
          </Link>
        </div>
      )}

      {/* ÜRÜN ADI */}
      <div>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-gray-900 leading-tight">
          {perfume.name}
        </h1>
      </div>
      
      {/* Yıldız Rating ve Yorum Sayısı */}
      {perfume.ratings && perfume.ratings.count > 0 && ( // Sadece yorum varsa göster
        <div className="flex items-center space-x-1">
          {[...Array(5)].map((_, i) => (
            <svg key={i} className={`w-4 h-4 ${i < Math.floor(perfume.ratings!.average) ? 'text-amber-500 fill-current' : 'text-gray-300 fill-current'}`} viewBox="0 0 20 20" fill="currentColor"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
          ))}
          <span className="font-sans text-xs text-gray-500 ml-1">({perfume.ratings.count} yorum)</span>
        </div>
      )}

      {/* AÇIKLAMA */}
      {perfume.description && ( // Açıklama varsa göster
        <div className="mt-2">
          <h2 className="font-serif text-lg sm:text-xl font-medium text-gray-800 mb-2">Açıklama</h2>
          <div className="font-sans text-sm sm:text-base text-gray-700 leading-relaxed prose prose-sm sm:prose-base max-w-none">
            <p>{perfume.description}</p>
          </div>
        </div>
      )}

      {/* NOTALAR */}
      {perfume.fragranceNotes && perfume.fragranceNotes.length > 0 && (
        <div className="mt-4">
          <h2 className="font-serif text-lg sm:text-xl font-medium text-gray-800 mb-3">Notalar</h2>
          <div className="space-y-3">
            {Object.entries(groupedNotes).map(([type, noteNames]) => (
              noteNames.length > 0 && (
                <div key={type}>
                  <h3 className="font-serif text-sm sm:text-md font-semibold text-amber-700 capitalize mb-1.5">
                    {type === 'top' ? 'Tepe Notalar' : type === 'heart' ? 'Kalp Notalar' : 'Dip Notalar'}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {noteNames.map((noteName, index) => (
                      <span
                        key={index}
                        className="font-sans bg-amber-100 text-amber-800 text-xs font-medium px-2.5 py-1 rounded-full shadow-sm hover:bg-amber-200 transition-colors"
                      >
                        {noteName}
                      </span>
                    ))}
                  </div>
                </div>
              )
            ))}
          </div>
        </div>
      )}

      {/* Ek Detaylar */}
      {perfume.details && (
        <div className="mt-6 pt-4 border-t border-gray-200">
          <h3 className="font-serif text-md font-medium text-gray-800 mb-2">Ek Detaylar</h3>
          <dl className="font-sans text-sm space-y-1 text-gray-600">
            {perfume.details.concentration && <div className="flex"><dt className="w-2/5 sm:w-1/3 text-gray-500">Yoğunluk:</dt><dd>{perfume.details.concentration}</dd></div>}
            {perfume.details.family && <div className="flex"><dt className="w-2/5 sm:w-1/3 text-gray-500">Koku Ailesi:</dt><dd>{perfume.details.family}</dd></div>}
            {perfume.details.gender && <div className="flex"><dt className="w-2/5 sm:w-1/3 text-gray-500">Cinsiyet:</dt><dd>{perfume.details.gender}</dd></div>}
            {/* Diğer details alanları eklenebilir */}
          </dl>
        </div>
      )}
    </div>
  );
}