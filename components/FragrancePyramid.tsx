// components/FragrancePyramid.tsx (Adım 4: İnteraktiflik ve tam fonksiyonellik)
"use client";

import React, { useState } from 'react';
import type { FragranceNote } from '@/types';

interface FragrancePyramidProps {
  notes: FragranceNote[];
}

export default function FragrancePyramid({ notes }: FragrancePyramidProps) {
  const [activeNote, setActiveNote] = useState<FragranceNote | null>(null);
  
  if (!Array.isArray(notes) || notes.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-gray-500">Bu parfüm için detaylı nota bilgisi bulunmamaktadır.</p>
      </div>
    );
  }
  
  const topNotes = notes.filter(note => note.type === 'top');
  const heartNotes = notes.filter(note => note.type === 'heart');
  const baseNotes = notes.filter(note => note.type === 'base');

  // handleNoteClick fonksiyonunu geri ekliyoruz
  const handleNoteClick = (note: FragranceNote) => {
    setActiveNote(currentActiveNote => 
      currentActiveNote?.name === note.name ? null : note // Aynı notaya tekrar tıklanırsa açıklamayı kapat
    );
  };

  return (
    <div className="py-10 md:py-12">
      <h2 className="text-2xl sm:text-3xl font-serif font-semibold text-gray-800 mb-10 md:mb-12 text-center">
        Koku Piramidi
      </h2>
      
      <div className="relative flex flex-col items-center">
        {/* Üçgen Şema ve Nota Butonları */}
        <div className="mb-10 md:mb-12 w-full max-w-xs sm:max-w-sm md:max-w-md">
          <div className="relative w-full" style={{paddingBottom: '86.6%'}}>
            <svg viewBox="0 0 100 86.6" className="absolute inset-0 w-full h-full">
              <polygon points="50,0 100,86.6 0,86.6" className="fill-amber-50 stroke-amber-200 stroke-[0.5px]" />
            </svg>
            
            <div className="absolute top-[2%] left-1/2 -translate-x-1/2 text-center">
              <span className="block font-sans text-xs text-amber-700 uppercase tracking-wider mb-0.5">Tepe</span>
              <div className="h-px w-8 bg-amber-600 mx-auto"></div>
            </div>
            <div className="absolute top-[58%] -right-[10%] sm:-right-[5%] md:right-0 text-center transform -translate-y-1/2 rotate-[60deg] origin-bottom-left">
              <span className="block font-sans text-xs text-amber-700 uppercase tracking-wider mb-0.5">Kalp</span>
              <div className="h-px w-8 bg-amber-600 mx-auto"></div>
            </div>
            <div className="absolute top-[58%] -left-[10%] sm:-left-[5%] md:left-0 text-center transform -translate-y-1/2 -rotate-[60deg] origin-bottom-right">
              <span className="block font-sans text-xs text-amber-700 uppercase tracking-wider mb-0.5">Dip</span>
              <div className="h-px w-8 bg-amber-600 mx-auto"></div>
            </div>

            {/* Tepe Notalar Butonları (onClick ve dinamik class eklendi) */}
            <div className="absolute top-[18%] left-1/2 -translate-x-1/2 flex flex-wrap justify-center items-center gap-1.5 max-w-[60%]">
              {topNotes.map((note) => (
                <button
                  key={note.name}
                  onClick={() => handleNoteClick(note)} // onClick eklendi
                  className={`font-sans text-xs px-2 py-1 rounded-full transition-all duration-200 ease-in-out shadow-sm hover:shadow-md
                    ${activeNote?.name === note.name ? 'bg-amber-700 text-white scale-105 ring-2 ring-offset-1 ring-amber-700' : 'bg-white text-amber-700 border border-amber-200 hover:bg-amber-100'}`}
                >
                  {note.name}
                </button>
              ))}
            </div>
            
            {/* Kalp Notalar Butonları (onClick ve dinamik class eklendi) */}
            <div className="absolute top-[58%] left-[68%] -translate-x-1/2 -translate-y-1/2 flex flex-wrap justify-center items-center gap-1.5 max-w-[50%]">
              {heartNotes.map((note) => (
                <button
                  key={note.name}
                  onClick={() => handleNoteClick(note)} // onClick eklendi
                  className={`font-sans text-xs px-2 py-1 rounded-full transition-all duration-200 ease-in-out shadow-sm hover:shadow-md
                  ${activeNote?.name === note.name ? 'bg-amber-700 text-white scale-105 ring-2 ring-offset-1 ring-amber-700' : 'bg-white text-amber-700 border border-amber-200 hover:bg-amber-100'}`}
                >
                  {note.name}
                </button>
              ))}
            </div>
            
            {/* Dip Notalar Butonları (onClick ve dinamik class eklendi) */}
            <div className="absolute top-[58%] left-[32%] -translate-x-1/2 -translate-y-1/2 flex flex-wrap justify-center items-center gap-1.5 max-w-[50%]">
              {baseNotes.map((note) => (
                <button
                  key={note.name}
                  onClick={() => handleNoteClick(note)} // onClick eklendi
                  className={`font-sans text-xs px-2 py-1 rounded-full transition-all duration-200 ease-in-out shadow-sm hover:shadow-md
                  ${activeNote?.name === note.name ? 'bg-amber-700 text-white scale-105 ring-2 ring-offset-1 ring-amber-700' : 'bg-white text-amber-700 border border-amber-200 hover:bg-amber-100'}`}
                >
                  {note.name}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Aktif Nota Açıklaması (Geri Eklendi) */}
        <div className={`text-center transition-all duration-300 ease-in-out h-auto ${activeNote ? 'max-h-40 opacity-100 py-4' : 'max-h-0 opacity-0 py-0 overflow-hidden'}`}>
          {activeNote && activeNote.description && ( // description alanı varsa göster
            <div className="bg-amber-50 p-4 rounded-lg inline-block max-w-md shadow">
              <p className="font-sans text-sm text-gray-800">
                <strong className="font-semibold text-amber-800">{activeNote.name}</strong>: {activeNote.description}
              </p>
            </div>
          )}
        </div>
      </div>
      
      {/* Alt Kısım: Notaların Sütunlu Listesi */}
      <div className="mt-10 md:mt-12 max-w-3xl mx-auto px-4">
        {/* ... (Bir önceki adımdaki sütunlu liste kodu aynı kalacak) ... */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
          {[
            { title: 'Tepe Notalar', notes: topNotes, description: 'İlk izlenim, havaya ilk yayılan notalar.' },
            { title: 'Kalp Notalar', notes: heartNotes, description: 'Parfümün karakteri, özü.' },
            { title: 'Dip Notalar', notes: baseNotes, description: 'Kalıcılığı sağlayan, en son hissedilen notalar.' },
          ].map(section => (
            <div key={section.title} className="text-center sm:text-left">
              <h3 className="font-serif text-lg font-medium text-amber-700 mb-2">{section.title}</h3>
              <p className="font-sans text-xs text-gray-500 mb-3">{section.description}</p>
              {section.notes.length > 0 ? (
                <ul className="space-y-1">
                  {section.notes.map(note => (
                    <li key={note.name} className="font-sans text-sm text-gray-700">{note.name}</li>
                  ))}
                </ul>
              ) : (
                <p className="font-sans text-sm text-gray-400 italic">Bu kategoride nota bulunmuyor.</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}