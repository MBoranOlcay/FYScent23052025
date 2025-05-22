// parfum-vitrini/app/blog/page.tsx
import Link from 'next/link';
import Image from 'next/image';
import { blogPosts } from '@/data/blogContent'; // @/data/blogData'DAN IMPORT EDİYORUZ
import type { Metadata } from 'next';
import type { BlogPost } from '@/types';

export const metadata: Metadata = {
  title: 'Blog - FindMyScent',
  description: 'FindMyScent blogunda parfüm dünyasından en son haberler, trend kokular ve parfüm seçim rehberleri.',
};

export default function BlogListPage() {
  const postsToDisplay = blogPosts as BlogPost[];
  console.log("BlogListPage (DIŞ VERİ) - Gelen blogPosts verisi:", postsToDisplay);

  return (
    <div className="bg-white min-h-screen">
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <header className="text-center mb-12 md:mb-16">
            <h1 className="text-4xl sm:text-5xl font-serif font-bold text-gray-800">
            FindMyScent Blog
            </h1>
            <p className="mt-3 text-lg text-gray-600 font-sans max-w-2xl mx-auto">
              Parfüm dünyasına dair en son trendler, uzman ipuçları ve ilham verici hikayeler.
            </p>
          </header>
          
          {postsToDisplay && postsToDisplay.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
              {postsToDisplay.map((post, index) => (
                <article key={post.slug} className="group flex flex-col bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                  <Link href={`/blog/${post.slug}`} className="block">
                    <div className="relative aspect-video overflow-hidden">
                      {post.coverImage ? (
                        <Image 
                          src={post.coverImage} 
                          alt={post.title || 'Blog gönderi kapak resmi'}
                          fill
                          style={{ objectFit: 'cover' }}
                          className="transform group-hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          priority={index < 3}
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                          <span className="text-gray-400 text-sm">Görsel Yok</span>
                        </div>
                      )}
                    </div>
                  </Link>
                  <div className="p-6 flex flex-col flex-grow">
                    <time className="font-sans text-xs text-gray-500 mb-1">
                      {new Date(post.date).toLocaleDateString('tr-TR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </time>
                    <h2 className="text-xl font-serif font-semibold text-gray-900 mb-2 flex-grow">
                      <Link href={`/blog/${post.slug}`} className="hover:text-amber-700 transition-colors line-clamp-2">
                        {post.title}
                      </Link>
                    </h2>
                    <p className="font-sans text-sm text-gray-600 line-clamp-3 mb-4">
                      {post.summary}
                    </p>
                    <div className="mt-auto pt-2">
                      <Link href={`/blog/${post.slug}`} className="font-sans text-sm font-medium text-amber-700 hover:text-amber-800 transition-colors group-hover:underline">
                        Devamını Oku →
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 py-10">Henüz blog yazısı bulunmuyor.</p>
          )}
        </div>
      </main>
    </div>
  );
}