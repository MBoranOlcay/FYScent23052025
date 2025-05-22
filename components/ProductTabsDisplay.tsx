// components/ProductTabsDisplay.tsx
"use client";

import React, { useState, useEffect, useMemo } from 'react'; // useEffect EKLENDİ
import type { Product, Review } from '@/types'; // Tipleri @/types'dan alıyoruz
import { Star } from 'lucide-react';

interface ProductTabsDisplayProps {
  product: Product;
}

export default function ProductTabsDisplay({ product }: ProductTabsDisplayProps) {
  const [activeTab, setActiveTab] = useState('description'); // Başlangıçta açıklama sekmesi aktif
  const [isMounted, setIsMounted] = useState(false);

  // Yorumlar dizisi boş veya tanımsızsa, hata almamak için boş bir diziyle değiştir
  const reviews = Array.isArray(product.reviews) ? product.reviews : [];

  const tabs = useMemo(() => [
    { id: 'description', label: 'Açıklama' },
    { id: 'notes', label: 'Notlar' },
    { id: 'details', label: 'Detaylar' },
    // Yorumlar varsa sekmesini göster, yoksa gösterme veya farklı bir mesaj göster
    ...(reviews.length > 0 ? [{ id: 'reviews', label: `Yorumlar (${reviews.length})` }] : [])
  ], [reviews.length]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  // Eğer hiç sekme yoksa (örneğin veri eksikse) bir şey gösterme veya bir mesaj göster
  if (tabs.length === 0 && !product.longDescription && !product.details) {
    return null; // Veya <p>Ek bilgi bulunmuyor.</p>
  }

  const renderStars = (rating: number) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, index) => (
          <Star
            key={index}
            size={16}
            className={
              index < Math.floor(rating) // Tam yıldızlar için Math.floor
                ? "text-amber-500 fill-current" // fill-current daha iyi olabilir
                : index < rating // Yarım yıldızlar için (bu kodda yarım yıldız yok ama mantık bu)
                  ? "text-amber-500 fill-current opacity-60" // Örnek yarım yıldız stili
                  : "text-gray-300 fill-current" // Boş yıldızlar için fill-current
            }
          />
        ))}
      </div>
    );
  };

  return (
    <div className="py-10 md:py-12"> {/* Üst ve alt boşluk */}
      <div className="border-b border-gray-200">
        <div className="flex space-x-1 sm:space-x-4 overflow-x-auto -mb-px px-4 sm:px-0"> {/* Yatay scroll ve padding ayarı */}
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`whitespace-nowrap py-3 sm:py-4 px-4 sm:px-6 font-sans font-medium text-sm sm:text-base border-b-2 transition-colors duration-200 ease-in-out focus:outline-none
                ${activeTab === tab.id
                  ? 'border-amber-600 text-amber-700'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="py-8 px-1"> {/* Sekme içeriği için hafif padding */}
        {activeTab === 'description' && product.longDescription && (
          <div className="prose prose-sm sm:prose-base max-w-none text-gray-700 font-sans leading-relaxed">
            {/* longDescription'ı satır başlarını koruyarak göstermek için whitespace-pre-line */}
            <p className="whitespace-pre-line">{product.longDescription}</p>
          </div>
        )}

        {activeTab === 'details' && product.details && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 font-sans text-sm">
            {/* Sol Sütun Detaylar */}
            <div className="space-y-2">
              {product.details.gender && <div className="flex"><dt className="w-2/5 text-gray-500 font-medium">Cinsiyet:</dt><dd className="w-3/5 text-gray-700">{product.details.gender}</dd></div>}
              {product.details.family && <div className="flex"><dt className="w-2/5 text-gray-500 font-medium">Koku Ailesi:</dt><dd className="w-3/5 text-gray-700">{product.details.family}</dd></div>}
              {product.details.concentration && <div className="flex"><dt className="w-2/5 text-gray-500 font-medium">Yoğunluk:</dt><dd className="w-3/5 text-gray-700">{product.details.concentration}</dd></div>}
              {product.details.releaseYear && <div className="flex"><dt className="w-2/5 text-gray-500 font-medium">Çıkış Yılı:</dt><dd className="w-3/5 text-gray-700">{product.details.releaseYear}</dd></div>}
            </div>
            {/* Sağ Sütun Detaylar */}
            <div className="space-y-2">
              {product.details.longevity && <div className="flex"><dt className="w-2/5 text-gray-500 font-medium">Kalıcılık:</dt><dd className="w-3/5 text-gray-700">{product.details.longevity}</dd></div>}
              {product.details.sillage && <div className="flex"><dt className="w-2/5 text-gray-500 font-medium">Yayılım (Sillage):</dt><dd className="w-3/5 text-gray-700">{product.details.sillage}</dd></div>}
              {product.details.recommendedUse && product.details.recommendedUse.length > 0 && (
                <div className="flex"><dt className="w-2/5 text-gray-500 font-medium">Önerilen Kullanım:</dt><dd className="w-3/5 text-gray-700">{product.details.recommendedUse.join(', ')}</dd></div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'reviews' && reviews.length > 0 && (
          <div className="space-y-8">
            {/* Genel Rating Özeti (Bolt.new'deki gibi) */}
            {product.ratings && (
              <div className="mb-8 pb-6 border-b border-gray-200">
                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
                  <div className="flex items-baseline mb-2 sm:mb-0">
                    <span className="text-3xl font-serif font-semibold text-gray-800">{product.ratings.average.toFixed(1)}</span>
                    <span className="text-gray-500 font-sans">/5</span>
                  </div>
                  <div className="flex flex-col items-start">
                    {renderStars(product.ratings.average)} {/* Ortalama rating için yıldızlar */}
                    <p className="text-xs text-gray-500 mt-1 font-sans">
                      {product.ratings.count} yoruma göre
                    </p>
                  </div>
                </div>
              </div>
            )}
            {/* Yorum Listesi */}
            {reviews.map((review: Review) => (
              <div key={review.id} className="pt-2 pb-6 border-b border-gray-100 last:border-b-0">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-sans font-semibold text-gray-800">{review.userName}</h4>
                  <span className="font-sans text-xs text-gray-400">{new Date(review.date).toLocaleDateString('tr-TR')}</span>
                </div>
                <div className="mb-2">
                  {renderStars(review.rating)}
                </div>
                <p className="font-sans text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                  {review.comment}
                </p>
                {/* "Helpful" butonu şimdilik pasif */}
                {/* <div className="mt-3 flex items-center text-xs">
                  <button className="text-gray-500 hover:text-amber-700 transition-colors">
                    {review.helpful} kişi bunu faydalı buldu
                  </button>
                </div> */}
              </div>
            ))}
            {/* Yorum Yazma Butonu (şimdilik sadece görsel) */}
            <div className="mt-10">
              <button className="font-sans border border-amber-600 text-amber-700 px-6 py-3 rounded-lg hover:bg-amber-50 transition-colors text-sm font-medium">
                Yorum Yaz
              </button>
            </div>
          </div>
        )}
         {activeTab === 'reviews' && reviews.length === 0 && (
            <p className="font-sans text-gray-500 text-center py-8">Bu ürün için henüz yorum yapılmamış.</p>
        )}
      </div>
    </div>
  );
}