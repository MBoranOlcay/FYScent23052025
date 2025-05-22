// parfum-vitrini/app/blog/[slug]/page.tsx

// import type { BlogPost } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from "next";

// VERİYİ TEKRAR @/data/blogData ALIAS'I İLE ALMAYI DENİYORUZ
import { blogPosts } from '@/data/blogContent'; 

console.log('[blogContent] blogPosts:', blogPosts);

type PageProps = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata(
  { params }: PageProps,
): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  console.log(`[generateMetadata] (@/data import) Gelen slug: ${slug}`);
  
  if (!blogPosts || !Array.isArray(blogPosts)) {
    console.error("[generateMetadata] (@/data import) blogPosts tanımsız veya bir dizi değil!");
    return { title: 'Yazı Yüklenirken Hata - FindMyScent Blog' };
  }
  
  const post = blogPosts.find((p) => p.slug === slug);
  console.log(`[generateMetadata] (@/data import) Bulunan post: ${post ? post.title : 'Bulunamadı'}`);

  if (!post) {
    return { title: 'Yazı Bulunamadı - FindMyScent Blog' };
  }

  return {
    title: `${post.metaTitle || post.title} - FindMyScent`,
    description: post.metaDescription || post.summary,
    openGraph: {
      title: post.metaTitle || post.title,
      description: post.metaDescription || post.summary,
      images: post.coverImage ? [{ url: post.coverImage }] : [],
      type: 'article',
      publishedTime: post.date,
      authors: ['FindMyScent Ekibi'],
    },
  };
}

export async function generateStaticParams() {
  console.log("[generateStaticParams] (@/data import) Çalışıyor.");
  
  if (!blogPosts || !Array.isArray(blogPosts)) {
    console.error("[generateStaticParams] (@/data import) blogPosts tanımsız veya bir dizi değil! Boş dizi döndürülüyor.");
    return [];
  }

  const paths = blogPosts.map((post) => ({
    slug: post.slug,
  }));
  console.log("[generateStaticParams] (@/data import) Oluşturulan path'ler:", paths);
  return paths;
}

export default async function BlogPostPage({ params }: PageProps) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  console.log(`[BlogPostPage] (@/data import) Render ediliyor. Gelen slug: ${slug}`);

  if (!blogPosts || !Array.isArray(blogPosts)) {
    console.error("[BlogPostPage] (@/data import) blogPosts tanımsız veya bir dizi değil!");
    notFound();
  }

  const post = blogPosts.find(p => p.slug === slug);
  console.log(`[BlogPostPage] (@/data import) Bulunan post: ${post ? post.title : 'Bulunamadı'}`);

  if (!post) {
    notFound();
  }

  return (
    <div className="bg-white min-h-screen">
      <main className="pt-24 pb-16">
        <article className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <header className="mb-8 md:mb-12 text-center">
            <Link href="/blog" className="font-sans text-sm text-amber-700 hover:text-amber-800 hover:underline mb-4 inline-block">
              ← Tüm Yazılara Geri Dön
            </Link>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-gray-900">
              {post.title}
            </h1>
            <time className="block font-sans text-sm text-gray-500 mt-3">
              Yayınlanma Tarihi: {new Date(post.date).toLocaleDateString('tr-TR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </time>
          </header>

          {post.coverImage && (
            <div className="relative aspect-video rounded-lg overflow-hidden mb-8 md:mb-12 shadow-lg">
              <Image 
                src={post.coverImage}
                alt={post.title || 'Blog kapak resmi'}
                fill
                style={{ objectFit: 'cover' }}
                priority
                sizes="(max-width: 768px) 100vw, 896px"
              />
            </div>
          )}

          <div 
            className="prose prose-lg sm:prose-xl max-w-none 
                       prose-headings:font-serif prose-headings:text-gray-800 
                       prose-p:font-sans prose-p:text-gray-700 prose-p:leading-relaxed
                       prose-strong:font-semibold prose-strong:text-gray-900 
                       prose-a:text-amber-700 hover:prose-a:text-amber-800 hover:prose-a:underline
                       prose-ul:font-sans prose-li:font-sans prose-li:marker:text-amber-600
                       prose-h2:mt-10 prose-h2:mb-4 prose-h3:mt-8 prose-h3:mb-3"
            dangerouslySetInnerHTML={{ __html: post.content || "" }}
          />
        </article>
      </main>
    </div>
  );
}