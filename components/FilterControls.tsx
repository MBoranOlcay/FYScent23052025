// components/FilterControls.tsx
"use client";

import React from 'react'; // Bu import kalsa da olur, zararı yok

interface FilterControlsProps {
  allBrands: string[];
  selectedBrands: string[];
  onBrandChange: (brand: string) => void;
}

export default function FilterControls({
  allBrands,
  selectedBrands,
  onBrandChange,
}: FilterControlsProps) {
  return (
    <div className="mb-8 p-6 bg-white rounded-lg shadow">
      <h3 className="text-xl font-serif font-semibold text-gray-800 mb-4">
        Markaya Göre Filtrele
      </h3>
      <div className="space-y-2">
        {allBrands.sort().map((brand) => ( // SORUN BURADA OLABİLİR (allBrands undefined ise)
          <label key={brand} className="flex items-center space-x-3 cursor-pointer hover:bg-amber-50 p-2 rounded-md transition-colors">
            <input
              type="checkbox"
              className="h-5 w-5 text-amber-600 border-gray-300 rounded focus:ring-amber-500"
              checked={selectedBrands.includes(brand)}
              onChange={() => onBrandChange(brand)}
            />
            <span className="font-sans text-gray-700">{brand}</span>
          </label>
        ))}
      </div>
    </div>
  );
}