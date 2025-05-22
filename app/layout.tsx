// parfum-vitrini/app/layout.tsx
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css"; // globals.css import ediliyor

import Header from "@/components/Header";
import Footer from "@/components/Footer"; // Footer import edildi

const inter = Inter({
  subsets: ["latin"],
  variable: '--font-inter', // CSS değişkeni olarak Inter
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ['400', '500', '600', '700'], // Kullanacağımız ağırlıklar
  variable: '--font-playfair-display', // CSS değişkeni olarak Playfair Display
});

export const metadata: Metadata = {
  title: "FindMyScent - Eşsiz Parfüm Koleksiyonu",
  description: "FindMyScent ile en özel ve popüler parfümleri keşfedin. Notalarına göre filtreleyin, favori kokunuzu bulun.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Font değişkenlerini html tag'ine ekliyoruz
    <html lang="tr" className={`${inter.variable} ${playfairDisplay.variable}`}>
      {/* 
        globals.css içindeki body stilini kullanacağız.
        Eğer globals.css'te body için font-family: var(--font-inter) tanımlıysa,
        buradaki font-sans'a gerek kalmaz. Ama Tailwind'in varsayılanı için kalabilir.
      */}
      <body className="font-sans text-gray-800 bg-brand-lightBg flex flex-col min-h-screen">
        <Header />
        {/* 
          Header'ımız fixed olduğu için main içeriğinin header altına gizlenmemesi lazım.
          Header bileşeninin yüksekliği (py-3 veya py-5 + içerik) yaklaşık 4rem (64px) veya 5rem (80px) olabilir.
          Bu değeri --header-height olarak globals.css'te tanımladık.
        */}
        <main className="flex-grow" style={{ paddingTop: 'var(--header-height, 5rem)' }}> 
          {/* 
            Eğer --header-height globals.css'te yoksa, varsayılan 5rem (80px) kullanılır.
            Daha iyi bir çözüm, Header bileşeninin gerçek yüksekliğini ölçüp bu değeri ayarlamaktır.
          */}
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}