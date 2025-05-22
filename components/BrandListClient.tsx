// parfum-vitrini/components/BrandListClient.tsx
"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search } from 'lucide-react';
import type { Brand } from '@/types'; // Brand tipinin perfumeCount içerdiğinden emin ol

// Marka adını URL dostu bir slug'a çevirmek için
const createBrandSlugForURL = (brandName: string): string => {
    if (!brandName) return "";
    return brandName
      .toLowerCase()
      .replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's')
      .replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ç/g, 'c')
      .replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
};

interface BrandListClientProps {
  initialBrands: Brand[];
}

export default function BrandListClient({ initialBrands }: BrandListClientProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredBrands = useMemo(() => {
    if (!searchTerm.trim()) {
      return initialBrands;
    }
    const lowerSearchTerm = searchTerm.toLowerCase();
    return initialBrands.filter(brand =>
      brand.name.toLowerCase().includes(lowerSearchTerm) ||
      (brand.description && brand.description.toLowerCase().includes(lowerSearchTerm))
    );
  }, [searchTerm, initialBrands]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <>
      {/* Arama Çubuğu */}
      <div className="mb-10 md:mb-12 max-w-2xl mx-auto">
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Marka adı veya açıklamada ara..."
            className="w-full pl-12 pr-4 py-3.5 text-base border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 font-sans"
          />
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Marka Listesi */}
      {filteredBrands.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6 md:gap-8">
          {filteredBrands.map((brand) => (
            <Link
              key={brand.slug || brand.id}
              href={`/brands/${brand.slug || createBrandSlugForURL(brand.name)}`}
              className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col text-decoration-none" // text-decoration-none eklendi
            >
              <div className="relative w-full aspect-[16/10] bg-gray-50"> {/* Arka plan rengi eklendi */}
                {brand.logo ? (
                  <Image
                    src={brand.logo}
                    alt={`${brand.name} Logosu`}
                    fill
                    style={{ objectFit: 'contain' }} // 'contain' logolar için daha iyi
                    className="p-6 transition-transform duration-300 group-hover:scale-105" // Daha fazla padding
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1"><path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  </div>
                )}
                {brand.category && (
                    <span className="absolute top-3 right-3 text-xs bg-amber-100 text-amber-800 px-2.5 py-1 rounded-full font-medium shadow-sm">
                        {brand.category}
                    </span>
                )}
              </div>
              
              <div className="p-5 flex flex-col flex-grow">
                <h2 className="text-xl lg:text-2xl font-serif font-semibold text-gray-800 group-hover:text-amber-700 mb-1.5">
                  {brand.name}
                </h2>
                <p className="font-sans text-sm text-gray-600 line-clamp-3 mb-3 flex-grow">
                  {brand.description}
                </p>
                <div className="mt-auto pt-2.5 text-xs text-gray-500 font-sans border-t border-gray-100 flex flex-wrap justify-between items-center gap-x-2">
                  {(brand.foundedYear || brand.headquarters) && (
                    <span className="whitespace-nowrap">
                      {brand.foundedYear && `Kuruluş: ${brand.foundedYear}`}
                      {brand.foundedYear && brand.headquarters && <span className="mx-1">•</span>}
                      {brand.headquarters}
                    </span>
                  )}
                  {typeof brand.perfumeCount === 'number' && brand.perfumeCount > 0 && (
                    <span className="font-semibold text-amber-700 whitespace-nowrap">{brand.perfumeCount} ürün</span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
            <Search size={48} className="text-gray-300 mx-auto mb-4" />
            <p className="text-xl text-gray-500 font-sans mb-2">Marka Bulunamadı</p>
            <p className="text-gray-400 font-sans">Arama teriminizi kontrol edin.</p>
        </div>
      )}
    </>
  );
}