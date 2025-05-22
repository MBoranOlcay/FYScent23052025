// components/PerfumeCard.tsx
import Image from 'next/image';
import Link from 'next/link';
import type { Product as Perfume } from '@/types';

const createBrandSlug = (brandName?: string): string => {
    if (!brandName) return "";
    return brandName.toLowerCase().replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's').replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ç/g, 'c').replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
};

interface PerfumeCardProps {
  perfume: Perfume;
}

export default function PerfumeCard({ perfume }: PerfumeCardProps) {
  const imageUrl = perfume.images && perfume.images.length > 0 ? perfume.images[0] : undefined;
  const perfumeDetailLink = perfume.slug ? `/perfumes/${perfume.slug}` : `/perfumes/${perfume.id}`;

  return (
    <div className="group bg-white rounded-md shadow hover:shadow-lg transition-all duration-200 flex flex-col h-full overflow-hidden border border-gray-200">
      <Link href={perfumeDetailLink} className="block relative w-full aspect-[4/5] bg-gray-50"> {/* Aspect ratio ve arka plan */}
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={perfume.name || 'Parfüm görseli'}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 20vw, 15vw" // Boyutları küçülttük
            style={{ objectFit: 'contain' }} // 'contain' genellikle daha iyi
            className="p-2 sm:p-3 transition-transform duration-300 group-hover:scale-105" // İçten padding
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
        {/* "NEW" etiketi gibi şeyler eklenebilir */}
        {/* <span className="absolute top-2 left-2 bg-teal-500 text-white text-[10px] font-semibold px-1.5 py-0.5 rounded">YENİ</span> */}
      </Link>
      
      <div className="p-3 text-center flex flex-col flex-grow"> {/* Padding azaltıldı */}
        {perfume.brand && (
          <Link href={`/brands/${createBrandSlug(perfume.brand)}`} className="block mb-0.5">
            <p className="text-[11px] sm:text-xs text-gray-500 hover:text-amber-600 font-sans uppercase tracking-wide transition-colors truncate">
              {perfume.brand}
            </p>
          </Link>
        )}
        <h3 className="text-xs sm:text-sm font-semibold text-gray-800 group-hover:text-amber-700 font-serif min-h-[2.2em] line-clamp-2 leading-tight">
          {/* Font boyutu küçültüldü, min-h ve leading ayarlandı */}
          <Link href={perfumeDetailLink} className="hover:underline">
            {perfume.name || "İsimsiz Parfüm"}
          </Link>
        </h3>
        {/* Koku Ailesi (Wikiparfum'daki gibi) */}
        {perfume.details?.family && (
          <div className="mt-auto pt-1.5"> {/* mt-auto ile en alta iter */}
            <p className="text-[10px] sm:text-xs text-gray-400 font-sans truncate">
              {perfume.details.family}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}