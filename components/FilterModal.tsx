// components/FilterModal.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { X as XIcon, ChevronDown, ChevronUp } from 'lucide-react';

interface FilterSectionHeaderProps {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  itemCount?: number;
}

// FilterSectionHeader BİLEŞENİNİN İÇİ DOLDURULDU
const FilterSectionHeader: React.FC<FilterSectionHeaderProps> = ({ title, isOpen, onToggle, itemCount }) => (
  <button
    onClick={onToggle}
    className="flex items-center justify-between w-full py-3 text-left text-lg font-sans font-medium text-gray-700 hover:text-gray-900 focus:outline-none"
    aria-expanded={isOpen}
  >
    <span>
      {title}
      {itemCount !== undefined && itemCount > 0 && (
        <span className="ml-2 text-xs font-normal bg-amber-200 text-amber-800 px-1.5 py-0.5 rounded-full">
          {itemCount}
        </span>
      )}
    </span>
    {isOpen ? <ChevronUp size={20} className="text-gray-500" /> : <ChevronDown size={20} className="text-gray-500" />}
  </button>
);


interface FilterModalProps {
  allBrands: string[];
  allNotes: string[];
  allFamilies: string[];
  initialSelectedBrands: string[];
  initialSelectedNotes: string[];
  initialSelectedFamilies: string[];
  onApplyFilters: (selectedBrands: string[], selectedNotes: string[], selectedFamilies: string[]) => void;
  onClose: () => void;
}

export default function FilterModal({
  allBrands,
  allNotes,
  allFamilies,
  initialSelectedBrands,
  initialSelectedNotes,
  initialSelectedFamilies,
  onApplyFilters,
  onClose,
}: FilterModalProps) {
  const [tempSelectedBrands, setTempSelectedBrands] = useState<string[]>(initialSelectedBrands || []);
  const [tempSelectedNotes, setTempSelectedNotes] = useState<string[]>(initialSelectedNotes || []);
  const [tempSelectedFamilies, setTempSelectedFamilies] = useState<string[]>(initialSelectedFamilies || []);

  const [isBrandsOpen, setIsBrandsOpen] = useState(true);
  const [isNotesOpen, setIsNotesOpen] = useState(true);
  const [isFamiliesOpen, setIsFamiliesOpen] = useState(true);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    const originalBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = originalBodyOverflow;
    };
  }, [onClose]);

  const handleBrandChange = (brand: string) => setTempSelectedBrands(prev => prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]);
  const handleNoteChange = (note: string) => setTempSelectedNotes(prev => prev.includes(note) ? prev.filter(n => n !== note) : [...prev, note]);
  const handleFamilyChange = (family: string) => setTempSelectedFamilies(prev => prev.includes(family) ? prev.filter(f => f !== family) : [...prev, family]);

  const handleApply = () => {
    onApplyFilters(tempSelectedBrands || [], tempSelectedNotes || [], tempSelectedFamilies || []);
  };

  const handleReset = () => {
    setTempSelectedBrands([]);
    setTempSelectedNotes([]);
    setTempSelectedFamilies([]);
  };
  
  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[100] p-4 transition-opacity duration-300 ease-in-out"
    >
      <div 
        className="bg-white rounded-xl shadow-2xl w-full max-w-md max-h-[85vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 sm:p-6 border-b border-gray-200">
          <h2 className="text-xl sm:text-2xl font-serif font-semibold text-gray-800">
            Filtrele
          </h2>
          <button 
            onClick={onClose} 
            className="text-gray-400 hover:text-gray-600 transition-colors p-1 -mr-1 rounded-full hover:bg-gray-100"
            aria-label="Filtreleri kapat"
          >
            <XIcon size={24} />
          </button>
        </div>

        {/* Modal Body (Scrollable) */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-1 divide-y divide-gray-100">
          {/* Marka Filtresi */}
          <div>
            <FilterSectionHeader title="Markalar" isOpen={isBrandsOpen} onToggle={() => setIsBrandsOpen(!isBrandsOpen)} itemCount={tempSelectedBrands.length}/>
            {isBrandsOpen && ( <div className="pt-2 pb-3 max-h-40 sm:max-h-48 overflow-y-auto space-y-1 pr-1 border rounded-md p-2"> {allBrands.sort().map((brand) => ( <label key={brand} className="flex items-center space-x-3 cursor-pointer p-1.5 hover:bg-amber-50 rounded transition-colors"> <input type="checkbox" className="h-4 w-4 text-amber-600 border-gray-300 rounded focus:ring-amber-500" checked={tempSelectedBrands.includes(brand)} onChange={() => handleBrandChange(brand)} /> <span className="text-sm text-gray-600 select-none">{brand}</span> </label> ))} {allBrands.length === 0 && <p className="text-xs text-gray-400 p-1.5">Filtrelenecek marka bulunamadı.</p>} </div>)}
          </div>

          {/* Nota Filtresi */}
          <div>
            <FilterSectionHeader title="Notalar" isOpen={isNotesOpen} onToggle={() => setIsNotesOpen(!isNotesOpen)} itemCount={tempSelectedNotes.length}/>
            {isNotesOpen && ( <div className="pt-2 pb-3 max-h-40 sm:max-h-48 overflow-y-auto space-y-1 pr-1 border rounded-md p-2"> {allNotes.map((note) => ( <label key={note} className="flex items-center space-x-3 cursor-pointer p-1.5 hover:bg-amber-50 rounded transition-colors"> <input type="checkbox" className="h-4 w-4 text-amber-600 border-gray-300 rounded focus:ring-amber-500" checked={tempSelectedNotes.includes(note)} onChange={() => handleNoteChange(note)} /> <span className="text-sm text-gray-600 select-none">{note}</span> </label> ))} {allNotes.length === 0 && <p className="text-xs text-gray-400 p-1.5">Filtrelenecek nota bulunamadı.</p>} </div>)}
          </div>

          {/* Koku Ailesi Filtresi */}
          <div>
            <FilterSectionHeader title="Koku Aileleri" isOpen={isFamiliesOpen} onToggle={() => setIsFamiliesOpen(!isFamiliesOpen)} itemCount={tempSelectedFamilies.length}/>
            {isFamiliesOpen && ( <div className="pt-2 pb-3 max-h-40 sm:max-h-48 overflow-y-auto space-y-1 pr-1 border rounded-md p-2"> {allFamilies.sort().map((family) => ( <label key={family} className="flex items-center space-x-3 cursor-pointer p-1.5 hover:bg-amber-50 rounded transition-colors"> <input type="checkbox" className="h-4 w-4 text-amber-600 border-gray-300 rounded focus:ring-amber-500" checked={tempSelectedFamilies.includes(family)} onChange={() => handleFamilyChange(family)} /> <span className="text-sm text-gray-600 select-none">{family}</span> </label> ))} {allFamilies.length === 0 && <p className="text-xs text-gray-400 p-1.5">Filtrelenecek koku ailesi bulunamadı.</p>} </div>)}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-end p-5 sm:p-6 border-t border-gray-200 space-x-3 mt-auto">
          <button onClick={handleReset} className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-150">Sıfırla</button>
          <button onClick={handleApply} className="px-7 py-2.5 text-sm font-medium text-white bg-amber-600 hover:bg-amber-700 rounded-lg transition-colors duration-150 shadow-sm hover:shadow-md">Filtreleri Uygula</button>
        </div>
      </div>
    </div>
  );
}