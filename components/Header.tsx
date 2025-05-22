// components/Header.tsx
"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link'; // Next.js Link bileşenini kullanalım
import { Search, Heart, Menu, X } from 'lucide-react'; // ShoppingBag kaldırıldı

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Katalog', href: '/perfumes' },
    { name: 'Blog', href: '/blog' }, // Yeni Blog linki
    { name: 'Markalar', href: '/brands' }
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white shadow-md py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between">
          {/* Sol Taraf: Logo */}
          <div className="flex items-center">
            <Link href="/" className={`text-2xl font-serif font-medium transition-colors duration-300 ${isScrolled ? 'text-gray-900' : 'text-white'}`}>
            FindMyScent
            </Link>
          </div>

          {/* Orta Kısım: Navigasyon Linkleri (Masaüstü) */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm tracking-wide hover:opacity-70 transition-opacity ${
                  isScrolled ? 'text-gray-700' : 'text-white'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Sağ Taraf: İkonlar (Masaüstü) */}
          <div className="hidden md:flex items-center space-x-6">
            <button className={`hover:opacity-70 transition-opacity ${isScrolled ? 'text-gray-700' : 'text-white'}`}>
              <Search size={20} />
            </button>
            <button className={`hover:opacity-70 transition-opacity ${isScrolled ? 'text-gray-700' : 'text-white'}`}>
              <Heart size={20} />
            </button>
          </div>

          {/* Mobil Menü Butonu */}
          <button
            className={`md:hidden hover:opacity-70 transition-opacity ${isScrolled ? 'text-gray-700' : 'text-white'}`}
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* Mobil Menü İçeriği */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-white z-[60] p-5 md:hidden">
          <div className="flex justify-between items-center mb-8">
            <Link href="/" className="text-2xl font-serif font-medium text-gray-900" onClick={() => setIsMobileMenuOpen(false)}>
            FindMyScent
            </Link>
            <button onClick={() => setIsMobileMenuOpen(false)} className="text-gray-900">
              <X size={24} />
            </button>
          </div>
          <div className="space-y-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="block text-lg text-gray-800 hover:text-amber-700 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>
          <div className="mt-10 pt-6 border-t border-gray-200 flex items-center justify-around">
            <button className="flex flex-col items-center text-gray-700"><Search size={20} /><span className="text-xs mt-1">Ara</span></button>
            <button className="flex flex-col items-center text-gray-700"><Heart size={20} /><span className="text-xs mt-1">Favoriler</span></button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;