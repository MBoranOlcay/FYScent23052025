// components/ProductGallery.tsx
"use client";

import React, { useState, MouseEvent } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react';

interface ProductGalleryProps {
  images?: string[];
  productName: string;
}

export default function ProductGallery({ images = [], productName }: ProductGalleryProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });

  if (!images || images.length === 0) {
    return (
      <div className="sticky top-20 md:top-24 flex flex-col items-center w-full max-w-[300px] sm:max-w-[340px] mx-auto"> {/* Max genişlik ve dikey pozisyon */}
        <div className="relative w-full aspect-square rounded-lg bg-gray-100 flex items-center justify-center shadow-md border border-gray-200">
          <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
          <p className="absolute bottom-3 text-[10px] text-gray-400">Görsel bulunmuyor</p>
        </div>
      </div>
    );
  }

  const mainImageUrl = images[currentImageIndex];

  const handlePrevImage = () => { setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1)); setIsZoomed(false); };
  const handleNextImage = () => { setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1)); setIsZoomed(false); };
  const handleThumbnailClick = (index: number) => { setCurrentImageIndex(index); setIsZoomed(false); };
  const toggleZoom = (event?: MouseEvent<HTMLDivElement | HTMLButtonElement>) => { if (event) event.stopPropagation(); setIsZoomed(!isZoomed); if (isZoomed) { setZoomPosition({ x: 50, y: 50 }); } };
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => { if (!isZoomed) return; const { left, top, width, height } = e.currentTarget.getBoundingClientRect(); const x = Math.max(0, Math.min(100, ((e.clientX - left) / width) * 100)); const y = Math.max(0, Math.min(100, ((e.clientY - top) / height) * 100)); setZoomPosition({ x, y }); };
  const handleMouseLeave = () => { /* if (isZoomed) { setIsZoomed(false); } */ };

  return (
    <div className="sticky top-20 md:top-24 flex flex-col items-center w-full max-w-[300px] sm:max-w-[340px] mx-auto"> {/* Max genişlik ve dikey pozisyon */}
      {/* Ana Resim Alanı */}
      <div 
        className={`relative w-full aspect-square rounded-lg overflow-hidden shadow-lg border border-gray-200 mb-3 
                    ${isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'}`}
        onClick={() => toggleZoom()}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div 
          className="absolute inset-0 transition-transform duration-300 ease-out"
          style={{ 
            transform: isZoomed ? 'scale(2)' : 'scale(1)', // Zoom ölçeği artırıldı
            transformOrigin: isZoomed ? `${zoomPosition.x}% ${zoomPosition.y}%` : 'center center'
          }}
        >
          {mainImageUrl && (
            <Image
              src={mainImageUrl}
              alt={`${productName} - Resim ${currentImageIndex + 1}`}
              fill
              style={{ objectFit: 'contain' }} // 'contain' daha iyi
              priority={currentImageIndex === 0}
              sizes="(max-width: 640px) 80vw, 340px" // Basitleştirilmiş sizes
              className={`transition-opacity duration-300 ${isZoomed ? '' : 'hover:opacity-90'}`} // Zoom değilken hafif hover efekti
            />
          )}
        </div>
        
        <button
          className="absolute top-2 right-2 bg-white/80 hover:bg-white p-1.5 rounded-full shadow-md transition-all z-10"
          onClick={(e) => toggleZoom(e)}
          aria-label={isZoomed ? "Zoom'u kapat" : "Yakınlaştır"}
        >
          {isZoomed ? <ZoomOut size={16} className="text-gray-600" /> : <ZoomIn size={16} className="text-gray-600" />}
        </button>

        {images.length > 1 && !isZoomed && (
          <>
            <button 
              className="absolute top-1/2 left-2 transform -translate-y-1/2 z-10 bg-white/80 hover:bg-white p-1.5 rounded-full shadow-md transition-all"
              onClick={(e) => { e.stopPropagation(); handlePrevImage(); }}
              aria-label="Önceki resim"
            >
              <ChevronLeft size={18} className="text-gray-600" />
            </button>
            <button 
              className="absolute top-1/2 right-2 transform -translate-y-1/2 z-10 bg-white/80 hover:bg-white p-1.5 rounded-full shadow-md transition-all"
              onClick={(e) => { e.stopPropagation(); handleNextImage(); }}
              aria-label="Sonraki resim"
            >
              <ChevronRight size={18} className="text-gray-600" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnail Galerisi */}
      {images.length > 1 && (
        <div className="flex justify-center space-x-1.5 overflow-x-auto py-1 w-full">
          {images.map((imgSrc, index) => (
            <button
              key={imgSrc + index} // Key'i daha benzersiz yapalım
              className={`relative flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-md overflow-hidden border-2 transition-all duration-200
                ${index === currentImageIndex 
                  ? 'border-amber-500 ring-1 ring-amber-500 ring-offset-1' 
                  : 'border-gray-300 hover:border-amber-400 opacity-80 hover:opacity-100'
              }`}
              onClick={() => handleThumbnailClick(index)}
              aria-label={`Resim ${index + 1}'e geç`}
            >
              <Image 
                src={imgSrc} 
                alt={`Thumbnail ${productName} ${index + 1}`} 
                fill
                style={{ objectFit: 'cover' }}
                sizes="56px" // w-14 için yaklaşık
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}