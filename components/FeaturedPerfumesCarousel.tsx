// components/FeaturedPerfumesCarousel.tsx
"use client";

import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import type { Product as Perfume } from '@/types';
import PerfumeCard from './PerfumeCard'; // Mevcut PerfumeCard'ımızı kullanacağız
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface FeaturedPerfumesCarouselProps {
  perfumes: Perfume[];
  options?: Parameters<typeof useEmblaCarousel>[0]; // Embla Carousel opsiyonları
}

export default function FeaturedPerfumesCarousel({ 
  perfumes, 
  options 
}: FeaturedPerfumesCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel(options || { loop: true, align: 'start' });

  const scrollPrev = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  if (!perfumes || perfumes.length === 0) {
    return null; // Parfüm yoksa bir şey gösterme
  }

  return (
    <div className="relative group"> {/* Navigasyon butonlarını hover'da göstermek için group */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex"> {/* Embla için sarmalayıcı */}
          {perfumes.map((perfume) => (
            // Her bir slide için flex-shrink-0 ve genişlik ayarı önemli
            <div className="flex-grow-0 flex-shrink-0 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5 p-2" key={perfume.id}>
              {/* 
                basis-full: En küçük ekranda tek kart
                sm:basis-1/2: Small ekranlarda 2 kart
                md:basis-1/3: Medium ekranlarda 3 kart
                lg:basis-1/4: Large ekranlarda 4 kart
                xl:basis-1/5: Extra large ekranlarda 5 kart
                Bu değerleri istediğin gibi ayarlayabilirsin.
              */}
              <PerfumeCard perfume={perfume} />
            </div>
          ))}
        </div>
      </div>

      {/* Navigasyon Butonları */}
      {emblaApi && perfumes.length > (emblaApi.scrollSnapList().length / perfumes.length) && ( // Sadece scroll mümkünse butonları göster
        <>
          <button
            className="absolute top-1/2 -translate-y-1/2 left-0 sm:-left-4 z-10 p-2 bg-white/70 hover:bg-white rounded-full shadow-md transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 focus:outline-none disabled:opacity-30 disabled:cursor-not-allowed"
            onClick={scrollPrev}
            disabled={!emblaApi?.canScrollPrev()}
            aria-label="Önceki parfümler"
          >
            <ChevronLeft className="h-6 w-6 text-gray-700" />
          </button>
          <button
            className="absolute top-1/2 -translate-y-1/2 right-0 sm:-right-4 z-10 p-2 bg-white/70 hover:bg-white rounded-full shadow-md transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 focus:outline-none disabled:opacity-30 disabled:cursor-not-allowed"
            onClick={scrollNext}
            disabled={!emblaApi?.canScrollNext()}
            aria-label="Sonraki parfümler"
          >
            <ChevronRight className="h-6 w-6 text-gray-700" />
          </button>
        </>
      )}
    </div>
  );
}