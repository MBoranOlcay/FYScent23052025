// components/SearchBar.tsx
"use client";

// import React, { useState } from 'react'; // React importu gereksiz, useState yeterli
import { useState } from 'react'; // Sadece useState'i import edelim
import { Search } from 'lucide-react';

interface SearchBarProps {
  onSearchChange: (searchTerm: string) => void;
  initialValue?: string;
}

export default function SearchBar({ onSearchChange, initialValue = "" }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState(initialValue);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);
    onSearchChange(newSearchTerm);
  };

  return (
    <div className="relative w-full max-w-lg mx-auto">
      <input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        placeholder="Parfüm adı veya marka ara..."
        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 font-sans text-md"
      />
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-gray-400" />
      </div>
    </div>
  );
}