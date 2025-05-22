"use client";
import React, { useState } from 'react';
import type { FragranceNote } from '@/types';

interface FragranceNotesProps {
  notes: FragranceNote[];
}

const FragranceNotesDisplay: React.FC<FragranceNotesProps> = ({ notes }) => {
  const [activeNote, setActiveNote] = useState<FragranceNote | null>(null);
  
  const topNotes = notes.filter(note => note.type === 'top');
  const heartNotes = notes.filter(note => note.type === 'heart');
  const baseNotes = notes.filter(note => note.type === 'base');

  return (
    <div className="py-16">
      <h2 className="text-3xl font-serif font-bold text-gray-900 mb-10 text-center tracking-tight">Koku Notaları</h2>
      <div className="relative">
        <div className="flex justify-center mb-14">
          <div className="relative w-[320px] h-[320px] md:w-[360px] md:h-[360px]">
            {/* Triangular diagram */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-full h-full">
                {/* Draw the triangle */}
                <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
                  <path 
                    d="M50,10 L90,80 L10,80 Z" 
                    fill="none" 
                    stroke="#d97706" 
                    strokeWidth="2"
                  />
                </svg>
                {/* Top notes label */}
                <div className="absolute top-[2%] left-[50%] transform -translate-x-1/2 text-center">
                  <span className="block text-xs text-amber-700 uppercase tracking-wider font-semibold mb-1">Top Notes</span>
                  <div className="h-px w-12 bg-amber-700 mx-auto"></div>
                </div>
                {/* Heart notes label */}
                <div className="absolute top-[38%] left-[87%] transform -translate-x-1/2 text-center">
                  <span className="block text-xs text-amber-700 uppercase tracking-wider font-semibold mb-1">Heart Notes</span>
                  <div className="h-px w-12 bg-amber-700 mx-auto"></div>
                </div>
                {/* Base notes label */}
                <div className="absolute top-[38%] left-[13%] transform -translate-x-1/2 text-center">
                  <span className="block text-xs text-amber-700 uppercase tracking-wider font-semibold mb-1">Base Notes</span>
                  <div className="h-px w-12 bg-amber-700 mx-auto"></div>
                </div>
                {/* Top notes */}
                <div className="absolute top-[18%] left-[50%] transform -translate-x-1/2 flex flex-wrap justify-center gap-2 max-w-[140px]">
                  {topNotes.map((note) => (
                    <button
                      key={note.name}
                      className={`px-3 py-1 text-xs rounded-full font-semibold transition-all shadow-sm border border-amber-200 focus:outline-none ${
                        activeNote?.name === note.name
                          ? 'bg-amber-700 text-white'
                          : 'bg-amber-50 text-amber-700 hover:bg-amber-100'
                      }`}
                      onClick={() => setActiveNote(activeNote?.name === note.name ? null : note)}
                    >
                      {note.name}
                    </button>
                  ))}
                </div>
                {/* Heart notes */}
                <div className="absolute top-[54%] left-[74%] transform -translate-x-1/2 flex flex-wrap justify-center gap-2 max-w-[120px]">
                  {heartNotes.map((note) => (
                    <button
                      key={note.name}
                      className={`px-3 py-1 text-xs rounded-full font-semibold transition-all shadow-sm border border-amber-200 focus:outline-none ${
                        activeNote?.name === note.name
                          ? 'bg-amber-700 text-white'
                          : 'bg-amber-50 text-amber-700 hover:bg-amber-100'
                      }`}
                      onClick={() => setActiveNote(activeNote?.name === note.name ? null : note)}
                    >
                      {note.name}
                    </button>
                  ))}
                </div>
                {/* Base notes */}
                <div className="absolute top-[54%] left-[26%] transform -translate-x-1/2 flex flex-wrap justify-center gap-2 max-w-[120px]">
                  {baseNotes.map((note) => (
                    <button
                      key={note.name}
                      className={`px-3 py-1 text-xs rounded-full font-semibold transition-all shadow-sm border border-amber-200 focus:outline-none ${
                        activeNote?.name === note.name
                          ? 'bg-amber-700 text-white'
                          : 'bg-amber-50 text-amber-700 hover:bg-amber-100'
                      }`}
                      onClick={() => setActiveNote(activeNote?.name === note.name ? null : note)}
                    >
                      {note.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Note description */}
        <div 
          className={`text-center transition-all duration-300 ${
            activeNote ? 'opacity-100 max-h-24' : 'opacity-0 max-h-0 overflow-hidden'
          }`}
        >
          {activeNote && (
            <div className="bg-amber-50 p-4 rounded-lg inline-block border border-amber-200 shadow">
              <p className="text-sm text-amber-900">
                <span className="font-semibold">{activeNote.name}</span>: {activeNote.description}
              </p>
            </div>
          )}
        </div>
      </div>
      <div className="mt-14 max-w-2xl mx-auto">
        <div className="grid grid-cols-3 gap-6">
          <div className="text-center">
            <h3 className="font-serif text-lg font-bold text-amber-700 mb-3">Top Notes</h3>
            <p className="text-sm text-gray-500 mb-2">The first impression</p>
            <ul className="space-y-1">
              {topNotes.map((note) => (
                <li key={note.name} className="text-sm text-amber-900 font-medium">{note.name}</li>
              ))}
            </ul>
          </div>
          <div className="text-center">
            <h3 className="font-serif text-lg font-bold text-amber-700 mb-3">Heart Notes</h3>
            <p className="text-sm text-gray-500 mb-2">The essence</p>
            <ul className="space-y-1">
              {heartNotes.map((note) => (
                <li key={note.name} className="text-sm text-amber-900 font-medium">{note.name}</li>
              ))}
            </ul>
          </div>
          <div className="text-center">
            <h3 className="font-serif text-lg font-bold text-amber-700 mb-3">Base Notes</h3>
            <p className="text-sm text-gray-500 mb-2">The lasting impression</p>
            <ul className="space-y-1">
              {baseNotes.map((note) => (
                <li key={note.name} className="text-sm text-amber-900 font-medium">{note.name}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FragranceNotesDisplay;