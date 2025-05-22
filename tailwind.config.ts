// parfum-vitrini/tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  // tailwind.config.ts
theme: {
  extend: {
    fontFamily: {
      sans: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'], // Inter'i fallback olarak da ekleyebiliriz
      serif: ['var(--font-playfair-display)', 'Playfair Display', 'Georgia', 'serif'], // Playfair Display'i fallback olarak da ekleyebiliriz
    },
      colors: {
        // Kendi lavanta renklerimiz (bunları hala kullanabiliriz veya Bolt'un renkleriyle uyumlu hale getirebiliriz)
        lavender: {
          light: '#f3e8ff',    // Açık Menekşe / Lavanta
          DEFAULT: '#c084fc',  // Ana Lila / Eflatun
          medium: '#a855f7',   // Orta Lila
          dark: '#6b21a8',     // Koyu Lila / Patlıcan Moru
        },
        // Senin istediğin ana arka plan rengi
        brand: {
          lightBg: '#EDE7F6',
        },
        // Bolt.new'den gelen amber renkleri (vurgular için kullanılabilir)
        amber: {
          50: '#fff8e1',
          100: '#ffecb3',
          200: '#ffe082',
          300: '#ffd54f',
          400: '#ffca28',
          500: '#ffc107', // Ana Amber (Belki butonlarda veya aktif elementlerde)
          600: '#ffb300',
          700: '#ffa000', // Bolt'un FragranceNotes'ta kullandığı renk
          800: '#ff8f00', // Bolt'un ProductInfo'da kullandığı renk
          900: '#ff6f00',
        },
        // Netlify sitesindeki gibi daha nötr renkler de ekleyebiliriz
        // Örnek:
        // neutral: {
        //   light: '#f8f9fa', // Açık gri arka planlar
        //   DEFAULT: '#6c757d', // Normal metin
        //   dark: '#343a40',   // Başlıklar, koyu metin
        // }
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    // Eğer Bolt.new projesinde tailwindcss/typography veya forms gibi eklentiler varsa,
    // ve biz de kullanacaksak buraya ekleyebiliriz.
    // Şimdilik boş bırakıyorum. Bolt.new'in plugins kısmında bir şey yoktu.
    // Eğer ProductTabs veya ProductInfo'daki "prose" sınıflarını kullanacaksak:
    // require('@tailwindcss/typography'),
  ],
};
export default config;