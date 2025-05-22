// parfum-vitrini/data/perfumes.ts

// Bolt.new'in tiplerini kendi projemizdeki yoldan import ediyoruz
// ve Product'ı Perfume olarak yeniden adlandırıyoruz.
import type { Product as Perfume, FragranceNote, Review } from '@/types';

// Eski PerfumeNote ve Perfume arayüz tanımlarını siliyoruz, çünkü artık '@/types'dan geliyorlar.

export const perfumesData: Perfume[] = [
  // 1. Chanel No. 5 (Bolt.new yapısına göre zenginleştirilmiş)
  {
    id: '1',
    name: 'Chanel No. 5',
    brand: 'Chanel',
    description: 'Zamansız bir zarafet ve kadınsılığın sembolü olan ikonik bir çiçeksi aldehit parfümü.',
    longDescription: `Chanel No. 5, 1921'de Coco Chanel tarafından piyasaya sürülen ve parfüm dünyasında devrim yaratan bir kokudur. Ernest Beaux tarafından yaratılan bu parfüm, ilk defa büyük miktarda aldehit içeren çiçeksi bir koku olmasıyla ünlüdür. Üst notalardaki aldehitler, neroli, ylang-ylang, bergamot ve limon; kalp notalardaki iris, menekşe kökü, yasemin, zambak ve gül; ve dip notalardaki amber, sandal ağacı, paçuli, misk, vanilya, meşe yosunu ve vetiver ile karmaşık ve sofistike bir yapı sunar. Marilyn Monroe'nun "Yatarken sadece birkaç damla Chanel No. 5 giyerim" sözleriyle de ölümsüzleşmiştir.`,
    price: 150.00, // Örnek fiyat
    discountPrice: 135.00, // Örnek indirimli fiyat (opsiyonel)
    ratings: { // Örnek rating
      average: 4.8,
      count: 2500,
    },
    sizes: [ // Örnek bedenler ve fiyatları
      { value: '50ml EDP', price: 105.00, isAvailable: true },
      { value: '100ml EDP', price: 150.00, isAvailable: true },
      { value: '200ml EDP', price: 210.00, isAvailable: false },
    ],
    images: [ // Ana görseli ilk sıraya koyalım, diğerleri Bolt.new'deki gibi galeri için olabilir
      '/images/perfumes/chanel-no5.jpg', // Bizim ana görselimiz
      // Örnek ek görseller (varsa)
      // '/images/perfumes/chanel-no5-alt1.jpg',
      // '/images/perfumes/chanel-no5-alt2.jpg',
    ],
    fragranceNotes: [ // Kendi notalarımızı Bolt.new'in FragranceNote tipine uyarlıyoruz
      { name: 'Aldehitler', type: 'top', description: 'Parlak ve sabunsu bir açılış sağlar.' },
      { name: 'Ylang-Ylang', type: 'top', description: 'Egzotik ve tatlı çiçeksi nota.' },
      { name: 'Neroli', type: 'top', description: 'Acı portakal çiçeğinden elde edilen tazeleyici nota.' },
      { name: 'Yasemin', type: 'heart', description: 'Zengin ve baş döndürücü beyaz çiçek.' }, // 'middle' yerine 'heart' kullandım, Bolt'un tipine uygun
      { name: 'Gül', type: 'heart', description: 'Klasik ve romantik çiçeksi kraliçe.' },
      { name: 'Sandal Ağacı', type: 'base', description: 'Kremsi ve sıcak odunsu temel.' },
      { name: 'Vanilya', type: 'base', description: 'Tatlı ve rahatlatıcı dip nota.' },
    ],
    details: { // Örnek detaylar
      gender: 'Kadın',
      family: 'Çiçeksi Aldehit',
      concentration: 'Eau de Parfum',
      releaseYear: 1921,
      recommendedUse: ['Akşam', 'Özel Günler'],
      longevity: 'Uzun ömürlü (7-12 saat)',
      sillage: 'Orta ila Güçlü',
    },
    reviews: [ // Örnek yorumlar
      {
        id: 'review_chanel1',
        userName: 'Ayşe K.',
        rating: 5,
        date: '2023-05-10',
        comment: 'Klasik ve zamansız bir koku. Her zaman favorim!',
        helpful: 15,
      },
    ],
    relatedProducts: ['2', '11'], // İlgili ürün ID'leri (kendi listemizden)
  },

  // --- DİĞER 19 PARFÜM İÇİN DE BENZER ŞEKİLDE GÜNCELLEME YAPILACAK ---
  // Aşağıdakiler şimdilik eski yapıda, bunları da yukarıdaki gibi zenginleştirmen gerekecek.
  // Yeni alanlar için (longDescription, ratings vb.) varsayılan değerler atayabilirsin.
  // fragranceNotes'taki type'ı 'middle' yerine 'heart' yapmayı unutma.

  {
    id: '2',
    name: 'Dior Sauvage',
    brand: 'Dior',
    description: 'Kaba ve asil notaların birleştiği, taze ve güçlü bir erkek parfümü.',
    longDescription: '...', // Doldurulacak
    price: 120.00, ratings: { average: 4.7, count: 1800 }, sizes: [{value: '100ml EDT', price: 120, isAvailable: true}],
    images: ['/images/perfumes/dior-sauvage.jpg'],
    fragranceNotes: [
      { name: 'Bergamot', type: 'top', description: '...' },
      { name: 'Biber', type: 'top', description: '...' },
      { name: 'Lavanta', type: 'heart', description: '...' }, // middle -> heart
      { name: 'Sichuan Biberi', type: 'heart', description: '...' }, // middle -> heart
      { name: 'Ambroksan', type: 'base', description: '...' },
      { name: 'Sedir Ağacı', type: 'base', description: '...' },
    ],
    details: { gender: 'Erkek', family: 'Aromatik Fougere', concentration: 'EDT', releaseYear: 2015, recommendedUse: ['Günlük', 'Ofis'], longevity: 'Orta', sillage: 'Orta'},
    reviews: [], relatedProducts: ['3', '18'],
  },
  {
    id: '21', // ID'yi kendi sıralamana göre ayarla
    name: 'Chanel Coco Mademoiselle',
    brand: 'Chanel',
    description: 'Modern ve sofistike, paçuli ve turunçgil notalarının canlı birleşimiyle genç ve özgür ruhlu kadınlar için.',
    longDescription: 'Chanel Coco Mademoiselle, oryantal-taze bir koku olarak sınıflandırılır. Canlı portakal notalarıyla açılır, ardından yasemin ve gülün çiçeksi kalbi gelir. Paçuli ve vetiverin derinliği kokuya kalıcılık ve karakter katar.',
    price: 160.00, ratings: { average: 4.9, count: 3200 }, sizes: [{value: '50ml EDP', price: 110, isAvailable: true}, {value: '100ml EDP', price: 160, isAvailable: true}],
    images: ['/images/perfumes/chanel-coco-mademoiselle.jpg'],
    fragranceNotes: [
      { name: 'Portakal', type: 'top', description: 'Canlı ve enerjik bir açılış.' },
      { name: 'Bergamot', type: 'top', description: 'Ferahlatıcı turunçgil notası.' },
      { name: 'Türk Gülü', type: 'heart', description: 'Zarif ve klasik çiçeksi kalp.' },
      { name: 'Yasemin', type: 'heart', description: 'Baştan çıkarıcı beyaz çiçek.' },
      { name: 'Paçuli', type: 'base', description: 'Topraksı ve derin bir temel.' },
      { name: 'Vetiver', type: 'base', description: 'Odunsu ve dumanlı bir dokunuş.' },
      { name: 'Beyaz Misk', type: 'base', description: 'Yumuşak ve kalıcı bir iz.' },
    ],
    details: { gender: 'Kadın', family: 'Oryantal Çiçeksi', concentration: 'Eau de Parfum', releaseYear: 2001, recommendedUse: ['Günlük', 'Özel Günler'], longevity: 'Uzun', sillage: 'Orta'},
    reviews: [], relatedProducts: ['1', '4'],
  },
  {
    id: '22',
    name: 'Dior J’adore Parfum d’Eau',
    brand: 'Dior',
    description: 'Su bazlı, alkolsüz, çiçeksi notaların saf ve doğal bir yorumu. Neroli, yasemin ve manolyanın taze buketi.',
    longDescription: 'Dior J’adore Parfum d’Eau, J\'adore serisinin yenilikçi, su bazlı ve alkolsüz bir yorumudur. Çiçeklerin doğal kokusunu en saf haliyle sunmayı amaçlar. Neroli, yasemin sambac, manolya ve gül notalarını içerir.',
    price: 170.00, ratings: { average: 4.6, count: 850 }, sizes: [{value: '50ml', price: 120, isAvailable: true}, {value: '100ml', price: 170, isAvailable: true}],
    images: ['/images/perfumes/dior-jadore-parfum-deau.jpg'],
    fragranceNotes: [
      { name: 'Neroli', type: 'top', description: 'Canlandırıcı ve tatlı portakal çiçeği.' },
      { name: 'Yasemin Sambac', type: 'heart', description: 'Yoğun ve şehvetli beyaz çiçek.' },
      { name: 'Manolya', type: 'heart', description: 'Kremsi ve limonumsu çiçeksi nota.' },
      { name: 'Gül', type: 'heart', description: 'Taze ve narin gül yaprakları.' }
    ],
    details: { gender: 'Kadın', family: 'Çiçeksi', concentration: 'Parfum d\'Eau (Alkolsüz)', releaseYear: 2022, recommendedUse: ['Günlük', 'Hassas Ciltler'], longevity: 'Orta', sillage: 'Yumuşak'},
    reviews: [], relatedProducts: ['2', '6'],
  },
  {
    id: '23',
    name: 'Yves Saint Laurent Libre Intense',
    brand: 'Yves Saint Laurent',
    description: 'Libre\'nin daha yoğun ve şehvetli versiyonu. Lavanta, portakal çiçeği ve orkide notalarının cesur birleşimi.',
    longDescription: 'Yves Saint Laurent Libre Intense, özgürlüğün ve tutkunun daha derin bir ifadesidir. Fransız lavantası ve Fas portakal çiçeği ikilisine, vanilya ve yanan orkide akoru eklenerek daha sıcak ve yoğun bir koku elde edilmiştir.',
    price: 180.00, ratings: { average: 4.8, count: 1500 }, sizes: [{value: '50ml EDP Intense', price: 130, isAvailable: true}, {value: '90ml EDP Intense', price: 180, isAvailable: true}],
    images: ['/images/perfumes/ysl-libre-intense.jpg'],
    fragranceNotes: [
      { name: 'Mandalina', type: 'top', description: 'Canlı ve tatlı turunçgil.' },
      { name: 'Lavanta', type: 'top', description: 'Aromatik ve rahatlatıcı Fransız lavantası.' },
      { name: 'Portakal Çiçeği', type: 'heart', description: 'Baştan çıkarıcı ve ışıltılı Fas portakal çiçeği.' },
      { name: 'Orkide Akoru', type: 'heart', description: 'Egzotik ve şehvetli çiçeksi nota.' },
      { name: 'Madagaskar Vanilyası', type: 'base', description: 'Sıcak ve kremsi tatlılık.' },
      { name: 'Tonka Fasulyesi', type: 'base', description: 'Badem ve vanilya benzeri sıcaklık.' },
    ],
    details: { gender: 'Kadın', family: 'Oryantal Fougere', concentration: 'Eau de Parfum Intense', releaseYear: 2020, recommendedUse: ['Akşam', 'Soğuk Hava'], longevity: 'Çok Uzun', sillage: 'Güçlü'},
    reviews: [], relatedProducts: ['4', '13'],
  },
  // Lancôme La Vie Est Belle (ID: 6) zaten vardı, tekrar eklemiyorum.
  // Carolina Herrera Good Girl (ID: 13) zaten vardı, tekrar eklemiyorum.
  {
    id: '24',
    name: 'Jo Malone Peony & Blush Suede',
    brand: 'Jo Malone London',
    description: 'Şakayık çiçeklerinin narin cazibesi, kırmızı elmanın sulu ısırığı ve süetin yumuşaklığıyla flörtöz bir koku.',
    longDescription: 'Jo Malone London Peony & Blush Suede, zarif ve çekici bir çiçeksi kokudur. Kırmızı elma, şakayık, yasemin, gül ve karanfil notaları ile süet akorunun birleşiminden oluşur.',
    price: 145.00, ratings: { average: 4.7, count: 1100 }, sizes: [{value: '30ml Cologne', price: 75, isAvailable: true}, {value: '100ml Cologne', price: 145, isAvailable: true}],
    images: ['/images/perfumes/jo-malone-peony-blush-suede.jpg'],
    fragranceNotes: [
      { name: 'Kırmızı Elma', type: 'top', description: 'Sulu ve tatlı meyvemsi açılış.' },
      { name: 'Şakayık', type: 'heart', description: 'Narin ve romantik çiçeksi kalp.' },
      { name: 'Süet', type: 'base', description: 'Yumuşak ve lüks bir dokunuş.' },
    ],
    details: { gender: 'Kadın', family: 'Çiçeksi', concentration: 'Cologne', releaseYear: 2013, recommendedUse: ['Günlük', 'İlkbahar'], longevity: 'Orta', sillage: 'Orta'},
    reviews: [], relatedProducts: ['14', '25'],
  },
  // Maison Francis Kurkdjian Baccarat Rouge 540 (ID: 10) zaten vardı, tekrar eklemiyorum.
  {
    id: '25',
    name: 'Tom Ford Lost Cherry',
    brand: 'Tom Ford',
    description: 'Kiraz likörü, acı badem ve egzotik çiçeklerin baştan çıkarıcı ve tatlı bir karışımı.',
    longDescription: 'Tom Ford Lost Cherry, tatlı ve ekşi notaların karşı konulmaz birleşimiyle oyuncu ve şehvetli bir gurme kokusudur. Siyah kiraz, kiraz likörü, acı badem, Türk gülü, yasemin sambac, Peru balzamı ve tonka fasulyesi içerir.',
    price: 350.00, ratings: { average: 4.5, count: 900 }, sizes: [{value: '50ml EDP', price: 350, isAvailable: true}],
    images: ['/images/perfumes/tom-ford-lost-cherry.jpg'],
    fragranceNotes: [
      { name: 'Siyah Kiraz', type: 'top', description: 'Yoğun ve tatlı kiraz.' },
      { name: 'Kiraz Likörü', type: 'top', description: 'Alkollü ve meyvemsi bir dokunuş.' },
      { name: 'Acı Badem', type: 'top', description: 'Hafif acı ve kremsi.' },
      { name: 'Türk Gülü', type: 'heart', description: 'Zengin ve kadifemsi gül.' },
      { name: 'Peru Balsamı', type: 'base', description: 'Sıcak ve vanilyamsı reçine.' },
      { name: 'Kavrulmuş Tonka Fasulyesi', type: 'base', description: 'Tatlı ve baharatlı.' },
    ],
    details: { gender: 'Unisex', family: 'Amber Çiçeksi', concentration: 'Eau de Parfum', releaseYear: 2018, recommendedUse: ['Özel Günler', 'Akşam'], longevity: 'Uzun', sillage: 'Orta'},
    reviews: [], relatedProducts: ['5', '10'],
  },
  {
    id: '26',
    name: 'Jo Malone Poppy & Barley',
    brand: 'Jo Malone London',
    description: 'İngiliz kırlarının canlı gelincikleri, siyah frenk üzümü ve arpanın sıcaklığıyla sarmalanmış çiçeksi bir koku.',
    longDescription: 'Jo Malone London Poppy & Barley, canlı ve neşeli bir çiçeksi kokudur. Siyah frenk üzümü, gelincik ve arpa notalarını içerir. İncir ve menekşe de kokuya derinlik katar.',
    price: 145.00, ratings: { average: 4.6, count: 750 }, sizes: [{value: '30ml Cologne', price: 75, isAvailable: true}, {value: '100ml Cologne', price: 145, isAvailable: true}],
    images: ['/images/perfumes/jo-malone-poppy-barley.jpg'],
    fragranceNotes: [
      { name: 'Siyah Frenk Üzümü', type: 'top', description: 'Canlı ve meyvemsi bir açılış.' },
      { name: 'Gelincik', type: 'heart', description: 'Narin ve pudramsı çiçeksi nota.' },
      { name: 'Arpa', type: 'base', description: 'Sıcak ve rahatlatıcı bir temel.' },
    ],
    details: { gender: 'Unisex', family: 'Çiçeksi', concentration: 'Cologne', releaseYear: 2019, recommendedUse: ['Günlük', 'İlkbahar/Yaz'], longevity: 'Orta', sillage: 'Yumuşak'},
    reviews: [], relatedProducts: ['14', '24'],
  },
  {
    id: '27',
    name: 'Kayali Vanilla 28',
    brand: 'Kayali',
    description: 'Zengin vanilya, esmer şeker ve tonka fasulyesinin sıcak ve baştan çıkarıcı bir gurme karışımı.',
    longDescription: 'Kayali Vanilla 28, Huda Kattan\'ın parfüm markasından, vanilya severler için yaratılmış zengin ve katmanlı bir kokudur. Vanilya orkidesi, tonka absolut, amber ağacı, misk ve esmer şeker notalarını içerir.',
    price: 118.00, ratings: { average: 4.8, count: 1200 }, sizes: [{value: '50ml EDP', price: 85, isAvailable: true}, {value: '100ml EDP', price: 118, isAvailable: true}],
    images: ['/images/perfumes/kayali-vanilla-28.jpg'],
    fragranceNotes: [
      { name: 'Vanilya Orkidesi', type: 'top', description: 'Tatlı ve kremsi vanilya.' },
      { name: 'Yasemin', type: 'heart', description: 'Hafif çiçeksi bir dokunuş.' },
      { name: 'Esmer Şeker', type: 'base', description: 'Karamelize tatlılık.' },
      { name: 'Tonka Fasulyesi Absolut', type: 'base', description: 'Sıcak ve baharatlı.' },
      { name: 'Amber Ağacı', type: 'base', description: 'Odunsu ve sıcak.' },
    ],
    details: { gender: 'Unisex', family: 'Amber Vanilya', concentration: 'Eau de Parfum', releaseYear: 2018, recommendedUse: ['Günlük', 'Soğuk Hava'], longevity: 'Uzun', sillage: 'Orta'},
    reviews: [], relatedProducts: ['5', '25'],
  },
  {
    id: '28',
    name: 'Gucci Bloom',
    brand: 'Gucci',
    description: 'Beyaz çiçeklerin zengin bir buketi; sümbülteber, yasemin ve Rangoon sarmaşığının pudramsı ve kadınsı kokusu.',
    longDescription: 'Gucci Bloom, Alessandro Michele yönetimindeki Gucci\'nin ilk parfümüdür. Kadınların çeşitliliğini ve özgünlüğünü kutlayan, doğal sümbülteber ve yasemin tomurcuklarının zengin bir karışımını sunar. Rangoon sarmaşığı ise kokuya pudramsı bir çiçeksilik katar.',
    price: 135.00, ratings: { average: 4.7, count: 1900 }, sizes: [{value: '50ml EDP', price: 98, isAvailable: true}, {value: '100ml EDP', price: 135, isAvailable: true}],
    images: ['/images/perfumes/gucci-bloom.jpg'],
    fragranceNotes: [
      { name: 'Rangoon Sarmaşığı', type: 'top', description: 'Eşsiz, hafif pudramsı çiçeksi açılış.' },
      { name: 'Sümbülteber', type: 'heart', description: 'Yoğun ve kremsi beyaz çiçek.' },
      { name: 'Yasemin Tomurcuğu', type: 'heart', description: 'Taze ve saf yasemin.' },
    ],
    details: { gender: 'Kadın', family: 'Çiçeksi', concentration: 'Eau de Parfum', releaseYear: 2017, recommendedUse: ['Günlük', 'İlkbahar'], longevity: 'Orta', sillage: 'Orta'},
    reviews: [], relatedProducts: ['1', '6'],
  },
  {
    id: '29',
    name: 'Jean Paul Gaultier La Belle',
    brand: 'Jean Paul Gaultier',
    description: 'Armut, vanilya ve vetiverin baştan çıkarıcı ve bağımlılık yaratan oryantal vanilya karışımı.',
    longDescription: 'Jean Paul Gaultier La Belle, karşı konulmaz bir çekiciliğe sahip, ultra feminen bir kokudur. Yeşil armutun sulu ferahlığı, bergamotun parlaklığı, vanilyanın kremsi tatlılığı ve vetiverin topraksı derinliğiyle karakterizedir.',
    price: 125.00, ratings: { average: 4.8, count: 1300 }, sizes: [{value: '50ml EDP', price: 90, isAvailable: true}, {value: '100ml EDP', price: 125, isAvailable: true}],
    images: ['/images/perfumes/chanel-no5.jpg',
  '/images/perfumes/dior-sauvage.jpg', // Farklı bir resim (test için)
  '/images/perfumes/creed-aventus.jpg'  // Farklı bir resim (test için)
],
    fragranceNotes: [
      { name: 'Yeşil Armut', type: 'top', description: 'Sulu ve taze meyvemsi açılış.' },
      { name: 'Bergamot', type: 'heart', description: 'Canlı ve parlak turunçgil.' },
      { name: 'Vanilya Podu', type: 'base', description: 'Yoğun ve kremsi tatlılık.' },
      { name: 'Vetiver', type: 'base', description: 'Topraksı ve odunsu.' },
    ],
    details: { gender: 'Kadın', family: 'Amber Vanilya', concentration: 'Eau de Parfum', releaseYear: 2019, recommendedUse: ['Akşam', 'Özel Günler'], longevity: 'Uzun', sillage: 'Güçlü'},
    reviews: [], relatedProducts: ['12', '13'],
  },
  // Jean Paul Gaultier Scandal By Night EdP, Jean Paul Gaultier So Scandal EdP - Bunlar için de benzer şekilde veri oluşturulabilir.
  // Şimdilik atlıyorum, istersen ekleyebiliriz.
  {
    id: '30',
    name: 'Prada Paradoxe',
    brand: 'Prada',
    description: 'Neroli, amber ve misk notalarının modern ve çığır açan birleşimiyle çok boyutlu bir çiçeksi amber kokusu.',
    longDescription: 'Prada Paradoxe, Prada kadınının çelişkili doğasını kutlayan bir parfümdür. Neroli tomurcuğu, beyaz amber ve beyaz misk gibi ikonik içeriklerin avangart bir imzayla yeniden keşfedilmesidir.',
    price: 140.00, ratings: { average: 4.6, count: 700 }, sizes: [{value: '50ml EDP', price: 100, isAvailable: true}, {value: '90ml EDP', price: 140, isAvailable: true}],
    images: ['/images/perfumes/prada-paradoxe.jpg'],
    fragranceNotes: [
      { name: 'Neroli Tomurcuğu', type: 'top', description: 'Taze ve ışıltılı portakal çiçeği.' },
      { name: 'Beyaz Amber Akoru', type: 'heart', description: 'Sıcak ve sarmalayıcı amber.' },
      { name: 'Beyaz Misk Akoru', type: 'base', description: 'Temiz ve kalıcı misk.' },
    ],
    details: { gender: 'Kadın', family: 'Amber Çiçeksi', concentration: 'Eau de Parfum', releaseYear: 2022, recommendedUse: ['Günlük', 'Her Mevsim'], longevity: 'Orta', sillage: 'Orta'},
    reviews: [], relatedProducts: ['6', '21'],
  },
  // Amouroud Elixir, Welton London, Maison Lumière Rosa Sublime, Jasmine Noir 2025, Gurme Stüdyo Karamel Rüyası
  // Bu parfümler için daha fazla araştırma yapıp detaylı bilgi (marka, notalar vb.) bulmamız gerekebilir.
  // Şimdilik örnek bir tane ekliyorum:
  {
    id: '31',
    name: 'Welton London Secret Amber', // Welton London'dan bir örnek, sen istediğinle değiştirebilirsin
    brand: 'Welton London',
    description: 'Gizemli ve sıcak amberin, baharatlar ve değerli ağaçlarla zenginleştirilmiş sofistike bir yorumu.',
    longDescription: 'Secret Amber, Welton London\'ın lüks koleksiyonundan, amberin etrafında şekillenen derin ve etkileyici bir parfümdür. Gül, yasemin, safran, paçuli, sandal ağacı ve vanilya gibi notalar içerir.',
    price: 250.00, ratings: { average: 4.7, count: 150 }, sizes: [{value: '100ml EDP', price: 250, isAvailable: true}],
    images: ['/images/perfumes/welton-london-secret-amber.jpg'], // Bu görseli bulman gerekecek
    fragranceNotes: [
      { name: 'Gül', type: 'top', description: 'Zarif çiçeksi açılış.' },
      { name: 'Safran', type: 'heart', description: 'Baharatlı ve lüks bir dokunuş.' },
      { name: 'Amber', type: 'base', description: 'Sıcak ve reçineli temel nota.' },
      { name: 'Sandal Ağacı', type: 'base', description: 'Kremsi odunsuluk.' },
    ],
    details: { gender: 'Unisex', family: 'Amber Baharatlı', concentration: 'Eau de Parfum', releaseYear: 2018, recommendedUse: ['Akşam', 'Kış'], longevity: 'Uzun', sillage: 'Orta'},
    reviews: [], relatedProducts: ['5', '10'],
  },
  // ... (Diğer parfümler için de benzer şekilde tüm alanları ekle) ...
  // ... (Mevcut 20 parfümünü bu yeni yapıya göre güncelle) ...

  // Örnek olarak son parfümü de biraz dolduralım:
  {
    id: '20',
    name: 'Le Labo Santal 33',
    brand: 'Le Labo',
    description: 'Amerikan Batı\'sının özgür ruhunu ve ateşin sıcaklığını çağrıştıran, dumanlı ve derimsi notaların ikonik birleşimi.',
    longDescription: 'Santal 33, hem kadınlar hem de erkekler için tasarlanmış, odunsu aromatik bir kokudur. Kakule, iris, menekşe, ambroksan, sandal ağacı, papirüs, sedir ağacı ve derinin dumanlı ve baharatlı notalarını içerir. Bağımlılık yaratan ve unutulmaz bir imzadır.',
    price: 280.00, ratings: { average: 4.9, count: 950 }, sizes: [{value: '50ml EDP', price: 190, isAvailable: true}, {value: '100ml EDP', price: 280, isAvailable: true}],
    images: ['/images/perfumes/le-labo-santal-33.jpg'],
    fragranceNotes: [
      { name: 'Kakule', type: 'top', description: 'Baharatlı ve ferahlatıcı bir başlangıç.' },
      { name: 'Menekşe Akoru', type: 'top', description: 'Pudramsı ve zarif bir dokunuş.' },
      { name: 'İris', type: 'heart', description: 'Topraksı ve sofistike çiçeksi nota.' },
      { name: 'Ambroksan', type: 'heart', description: 'Misk benzeri, sıcak ve kalıcı.' },
      { name: 'Sandal Ağacı', type: 'base', description: 'Kremsi, zengin ve meditatif odunsu nota.' },
      { name: 'Sedir Ağacı', type: 'base', description: 'Kuru ve temiz odunsu temel.' },
      { name: 'Deri', type: 'base', description: 'Dumanlı ve hayvansal bir derinlik.' }
    ],
    details: { gender: 'Unisex', family: 'Odunsu Aromatik', concentration: 'EDP', releaseYear: 2011, recommendedUse: ['Her zaman', 'İmza Koku'], longevity: 'Çok Uzun', sillage: 'Güçlü'},
    reviews: [], relatedProducts: ['5', '15'],
  }
];