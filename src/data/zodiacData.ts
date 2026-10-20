export type ElementType = 'Api' | 'Tanah' | 'Udara' | 'Air';

export interface ConstellationStar {
  x: number;
  y: number;
  r?: number;
  name?: string;
}

export interface ZodiacSign {
  id: string;
  name: string;
  latinName: string;
  symbol: string;
  dates: string;
  element: ElementType;
  rulingPlanet: string;
  stone: string;
  traits: string[];
  styleEssence: string;
  styleAdvice: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  recommendedSilhouette: string;
  recommendedFabric: string;
  constellation: {
    stars: ConstellationStar[];
    lines: [number, number][]; // pairs of indices into stars
  };
  clientOrder: {
    clientName: string;
    title: string;
    avatarEmoji: string;
    occasion: string;
    brief: string;
    requirements: {
      silhouette?: string[];
      fabric?: string[];
      elements?: ElementType[];
      colors?: string[];
      hasEmbroidery?: boolean;
    };
    critiqueQuotes: {
      perfect: string;
      good: string;
      improvable: string;
    };
  };
}

export const ZODIAC_SIGNS: ZodiacSign[] = [
  {
    id: 'aries',
    name: 'Aries',
    latinName: 'Aries (Sang Domba Jantan)',
    symbol: '♈',
    dates: '21 Mar – 19 Apr',
    element: 'Api',
    rulingPlanet: 'Mars',
    stone: 'Berlian & Ruby Api',
    traits: ['Berani', 'Penuh Semangat', 'Inovatif', 'Percaya Diri'],
    styleEssence: 'Siluet Berani & Struktural dengan Aksen Emas Api',
    styleAdvice: 'Pilihlah gaun dengan garis tegas dan warna merah membara untuk menonjolkan aura kepemimpinan alami Anda.',
    primaryColor: '#b91c1c', // Crimson ruby
    secondaryColor: '#f59e0b', // Warm ember
    accentColor: '#fef08a', // Gold sparkle
    recommendedSilhouette: 'siren_slit',
    recommendedFabric: 'midnight_velvet',
    constellation: {
      stars: [
        { x: 30, y: 40, r: 3.5, name: 'Hamal' },
        { x: 50, y: 46, r: 3.0, name: 'Sheratan' },
        { x: 62, y: 55, r: 2.2, name: 'Mesarthim' },
        { x: 74, y: 64, r: 2.0 },
      ],
      lines: [[0, 1], [1, 2], [2, 3]],
    },
    clientOrder: {
      clientName: 'Lady Vivienne Valerius',
      title: 'Duta Besar Red Carpet',
      avatarEmoji: '👑',
      occasion: 'Gala Pemutaran Film Solstice Musim Semi',
      brief: 'Saya ingin gaun yang mencuri semua sorotan kamera! Warna merah atau crimson pekat, potongan belahan tinggi yang dinamis, serta mahkota tanduk emas khas Aries.',
      requirements: {
        silhouette: ['siren_slit', 'asymmetric_astral'],
        fabric: ['midnight_velvet', 'celestial_silk'],
        elements: ['Api'],
        hasEmbroidery: true,
      },
      critiqueQuotes: {
        perfect: 'Magnifikan! Gaun ini memancarkan kobaran api bintang yang tak tertandingi. Saya adalah ratu karpet merah malam ini!',
        good: 'Sangat megah dan berkarakter, meski detail bordir bisa dibuat sedikit lebih membara.',
        improvable: 'Gaun ini terlalu pendiam untuk seorang Aries. Saya membutuhkan kobaran gairah dan ketegasan!',
      },
    },
  },
  {
    id: 'taurus',
    name: 'Taurus',
    latinName: 'Taurus (Sang Banteng Emas)',
    symbol: '♉',
    dates: '20 Apr – 20 Mei',
    element: 'Tanah',
    rulingPlanet: 'Venus',
    stone: 'Zamrud Hijau & Safir Mawar',
    traits: ['Elegan', 'Setia', 'Pencinta Kemewahan', 'Penuh Kedamaian'],
    styleEssence: 'Keanggunan Klasik Abadi dengan Sutra dan Brokat Hijau Zamrud',
    styleAdvice: 'Padukan siluet mewah dengan sentuhan botanical Venusian yang memancarkan kenyamanan ningrat kelas tinggi.',
    primaryColor: '#047857', // Emerald forest
    secondaryColor: '#b45309', // Earth bronze
    accentColor: '#fde047', // Venetian gold
    recommendedSilhouette: 'ballgown',
    recommendedFabric: 'constellation_brocade',
    constellation: {
      stars: [
        { x: 35, y: 35, r: 4.0, name: 'Aldebaran' },
        { x: 45, y: 45, r: 2.5 },
        { x: 55, y: 50, r: 2.5 },
        { x: 65, y: 42, r: 3.0, name: 'Elnath' },
        { x: 50, y: 30, r: 2.2 },
        { x: 25, y: 55, r: 2.5, name: 'Pleiades' },
      ],
      lines: [[0, 1], [1, 2], [2, 3], [0, 4], [0, 5]],
    },
    clientOrder: {
      clientName: 'Baroness Cordelia Green',
      title: 'Kolektor Seni & Botanis Kerajaan',
      avatarEmoji: '🌿',
      occasion: 'Malam Jamuan Musim Panas Taman Venus',
      brief: 'Gaun ballgown mewah berbahan brokat atau beludru hijau zamrud. Harus terasa nyaman, bernuansa bumi yang kaya, serta dihiasi sulaman Aldebaran emas.',
      requirements: {
        silhouette: ['ballgown', 'empire_aline'],
        fabric: ['constellation_brocade', 'midnight_velvet'],
        elements: ['Tanah'],
        hasEmbroidery: true,
      },
      critiqueQuotes: {
        perfect: 'Sempurna! Sentuhan kemewahan organik ini sangat Venusian. Kainnya jatuh dengan bobot ningrat yang luar biasa.',
        good: 'Sangat indah dan menenangkan. Kemewahannya terasa, hanya aksen daun atau bunganya yang bisa dipertegas.',
        improvable: 'Terlalu sederhana dan ringkih. Saya butuh kemewahan tekstur beludru bumi yang sejati.',
      },
    },
  },
  {
    id: 'gemini',
    name: 'Gemini',
    latinName: 'Gemini (Sang Kembar Kosmik)',
    symbol: '♊',
    dates: '21 Mei – 20 Jun',
    element: 'Udara',
    rulingPlanet: 'Merkurius',
    stone: 'Agate & Topaz Kuning',
    traits: ['Cerdas', 'Luwes', 'Ekspresif', 'Menyenangkan'],
    styleEssence: 'Dualitas Ethereal: Lipatan Berlayer & Kilau Kuning Citrine',
    styleAdvice: 'Eksplorasi gaun dua sisi atau lapisan organza transparan yang bergoyang anggun saat melangkah.',
    primaryColor: '#eab308', // Citrine yellow
    secondaryColor: '#93c5fd', // Starlight sky
    accentColor: '#f8fafc', // Ethereal pearl
    recommendedSilhouette: 'tiered_tulle',
    recommendedFabric: 'starlight_organza',
    constellation: {
      stars: [
        { x: 30, y: 25, r: 3.8, name: 'Castor' },
        { x: 42, y: 28, r: 4.0, name: 'Pollux' },
        { x: 32, y: 45, r: 2.5 },
        { x: 45, y: 50, r: 2.5 },
        { x: 35, y: 65, r: 2.6, name: 'Alhena' },
        { x: 50, y: 68, r: 2.4 },
      ],
      lines: [[0, 2], [2, 4], [1, 3], [3, 5], [0, 1], [4, 5]],
    },
    clientOrder: {
      clientName: 'Sora & Celeste Vance',
      title: 'Pianis Kembar Resital Kerajaan',
      avatarEmoji: '✨',
      occasion: 'Konser Simfoni Kosmik Merkurius',
      brief: 'Kami butuh gaun dengan efek dualitas! Lapisan tulle atau organza berayun ringan bernuansa kuning citrine atau perak langit yang memukau.',
      requirements: {
        silhouette: ['tiered_tulle', 'ethereal_column'],
        fabric: ['starlight_organza', 'celestial_silk'],
        elements: ['Udara'],
      },
      critiqueQuotes: {
        perfect: 'Luar biasa memesona! Saat kami memainkan sonata, gaun ini berkilau seolah bintang kembar sedang menari di atas tuts piano.',
        good: 'Konsep dualitas yang cantik. Kami suka ringannya bahan ini di panggung.',
        improvable: 'Gaun ini terlalu kaku untuk gerakan piano kami yang bebas. Kami butuh organza yang lebih melayang!',
      },
    },
  },
  {
    id: 'cancer',
    name: 'Cancer',
    latinName: 'Cancer (Sang Kepiting Rembulan)',
    symbol: '♋',
    dates: '21 Jun – 22 Jul',
    element: 'Air',
    rulingPlanet: 'Bulan',
    stone: 'Mutiara & Moonstone',
    traits: ['Penyayang', 'Intuitif', 'Puitis', 'Melindungi'],
    styleEssence: 'Siluet Moonlit Muse Berkerut Ethereal dengan Mutiara Samudera',
    styleAdvice: 'Nuansa perak mutiara dan biru samudra pucat menciptakan aura kelembutan mistis pelindung jiwa.',
    primaryColor: '#cbd5e1', // Pearlescent silver
    secondaryColor: '#38bdf8', // Lunar ocean blue
    accentColor: '#ffffff', // Moonlight glow
    recommendedSilhouette: 'ethereal_column',
    recommendedFabric: 'iridescent_taffeta',
    constellation: {
      stars: [
        { x: 45, y: 40, r: 3.5, name: 'Tegmine' },
        { x: 38, y: 55, r: 2.8, name: 'Asellus Australis' },
        { x: 55, y: 58, r: 2.8, name: 'Asellus Borealis' },
        { x: 48, y: 72, r: 2.3, name: 'Acubens' },
        { x: 32, y: 70, r: 2.1 },
      ],
      lines: [[0, 1], [0, 2], [1, 3], [1, 4]],
    },
    clientOrder: {
      clientName: 'Princess Selene of Tidecrest',
      title: 'Penyair Pantai Kerajaan',
      avatarEmoji: '🌙',
      occasion: 'Malam Purnawa Samudera di Pesisir Teluk',
      brief: 'Gaun lembut bernuansa perak bulan atau biru pastel samudra. Menggunakan kain taffeta atau sutra berkerlap mutiara, seperti ombak yang mencium pasir.',
      requirements: {
        silhouette: ['ethereal_column', 'mermaid_train'],
        fabric: ['iridescent_taffeta', 'celestial_silk'],
        elements: ['Air'],
        hasEmbroidery: true,
      },
      critiqueQuotes: {
        perfect: 'Meneteskan air mata haru... Gaun ini terasa seperti pelukan rembulan hangat di malam samudra yang sunyi. Mutiara ini magis.',
        good: 'Sangat anggun dan melankolis romantis. Cocok untuk pembacaan puisi purnamaku.',
        improvable: 'Warnanya terlalu keras. Jiwa Cancer membutuhkan keteduhan perak bulan yang murni.',
      },
    },
  },
  {
    id: 'leo',
    name: 'Leo',
    latinName: 'Leo (Sang Singa Surya)',
    symbol: '♌',
    dates: '23 Jul – 22 Agu',
    element: 'Api',
    rulingPlanet: 'Matahari',
    stone: 'Amber, Peridot & Emas Murni',
    traits: ['Megah', 'Dramatis', 'Dermawan', 'Memikat'],
    styleEssence: 'Ballgown Kerajaan Emas Surya dengan Jubah Bintang Memancar',
    styleAdvice: 'Jangan takut tampil maksimal! Mahkota emas dan sulaman surya berkilau adalah hak prerogatif sang pemimpin.',
    primaryColor: '#d97706', // Royal radiant gold
    secondaryColor: '#ea580c', // Solar flare orange
    accentColor: '#fef08a', // Sunlight flare
    recommendedSilhouette: 'ballgown',
    recommendedFabric: 'constellation_brocade',
    constellation: {
      stars: [
        { x: 32, y: 55, r: 4.5, name: 'Regulus' },
        { x: 40, y: 40, r: 3.2, name: 'Algieba' },
        { x: 48, y: 32, r: 2.8 },
        { x: 58, y: 36, r: 2.5 },
        { x: 62, y: 52, r: 3.4, name: 'Zosma' },
        { x: 74, y: 58, r: 3.8, name: 'Denebola' },
      ],
      lines: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [1, 4]],
    },
    clientOrder: {
      clientName: 'Her Majesty Queen Aurelia',
      title: 'Ratu Kekaisaran Surya',
      avatarEmoji: '🦁',
      occasion: 'Penobatan Perayaan Titik Balik Matahari Musim Panas',
      brief: 'Saya menuntut gaun paling megah di seluruh alam semesta! Ballgown emas murni dengan brokat rasi bintang, kerah megah, dan kilau surya tak terpadamkan!',
      requirements: {
        silhouette: ['ballgown'],
        fabric: ['constellation_brocade', 'celestial_silk'],
        elements: ['Api'],
        hasEmbroidery: true,
      },
      critiqueQuotes: {
        perfect: 'SUBLIME! Seluruh hadirin bersujud melihat kemegahan matahari ini! Anda adalah maestro penjahit tak tertandingi di istana!',
        good: 'Sangat berkilau dan berkelas raja. Masih ada sedikit ruang untuk kemewahan sulaman emas di bagian dada.',
        improvable: 'Gaun ini terlalu pucat untuk seorang ratu matahari! Tambahkan emas dan aura kekaisaran!',
      },
    },
  },
  {
    id: 'virgo',
    name: 'Virgo',
    latinName: 'Virgo (Sang Dara Bintang)',
    symbol: '♍',
    dates: '23 Agu – 22 Sep',
    element: 'Tanah',
    rulingPlanet: 'Merkurius',
    stone: 'Safir Biru & Cornelian',
    traits: ['Presisi', 'Murni', 'Cermat', 'Berjiwa Pengabdi'],
    styleEssence: 'Korset Arsitektural Presisi dengan Lipatan Anggun & Sulaman Spica',
    styleAdvice: 'Kecantikan sejati terletak pada kesempurnaan jahitan mikro, jahitan lipit rapi, dan warna gading atau sage.',
    primaryColor: '#475569', // Slate perfection
    secondaryColor: '#10b981', // Botanical sage
    accentColor: '#f1f5f9', // Pure alabaster
    recommendedSilhouette: 'peplum_gown',
    recommendedFabric: 'celestial_silk',
    constellation: {
      stars: [
        { x: 50, y: 65, r: 4.5, name: 'Spica' },
        { x: 38, y: 52, r: 3.2, name: 'Porrima' },
        { x: 30, y: 40, r: 2.8, name: 'Zavijava' },
        { x: 44, y: 35, r: 3.0, name: 'Vindemiatrix' },
        { x: 58, y: 48, r: 2.6, name: 'Heze' },
      ],
      lines: [[0, 1], [1, 2], [1, 3], [0, 4]],
    },
    clientOrder: {
      clientName: 'Chief Astronomer Lyra Thorne',
      title: 'Kepala Observatorium Kerajaan',
      avatarEmoji: '🌾',
      occasion: 'Simposium Akurasi Bintang Internasional',
      brief: 'Saya menolak jahitan yang ceroboh. Saya membutuhkan gaun berpotongan peplum atau kolom dengan lipit simetris sempurna, warna perak gading atau sage, berhiaskan sulaman bintang Spica.',
      requirements: {
        silhouette: ['peplum_gown', 'ethereal_column'],
        fabric: ['celestial_silk'],
        elements: ['Tanah'],
        hasEmbroidery: true,
      },
      critiqueQuotes: {
        perfect: 'Presisi 100%! Tidak ada sehelai benang pun yang menyimpang dari koordinat matematika keindahan. Sangat memuaskan!',
        good: 'Jahitannya rapi dan proporsi bentuknya sangat harmonis dengan postur tubuh.',
        improvable: 'Saya melihat ketidaksimetrisan dan ornamen berlebihan. Virgo menuntut kemurnian fungsi dan garis bersih!',
      },
    },
  },
  {
    id: 'libra',
    name: 'Libra',
    latinName: 'Libra (Sang Neraca Venus)',
    symbol: '♎',
    dates: '23 Sep – 22 Okt',
    element: 'Udara',
    rulingPlanet: 'Venus',
    stone: 'Opal & Rose Quartz',
    traits: ['Harmonis', 'Pencinta Estetika', 'Diplomatis', 'Menawan'],
    styleEssence: 'Keseimbangan Simetris Sempurna dalam Balutan Rose Gold & Sutra Venus',
    styleAdvice: 'Gunakan potongan bahu simetris dan drapery sutra lembut yang menciptakan harmoni visual sempurna di segala sudut.',
    primaryColor: '#f43f5e', // Rose petal
    secondaryColor: '#c084fc', // Soft lilac
    accentColor: '#fef08a', // Champagne shimmer
    recommendedSilhouette: 'ethereal_column',
    recommendedFabric: 'celestial_silk',
    constellation: {
      stars: [
        { x: 35, y: 42, r: 3.5, name: 'Zubeneschamali' },
        { x: 55, y: 45, r: 3.7, name: 'Zubenelgenubi' },
        { x: 30, y: 62, r: 2.6, name: 'Brachium' },
        { x: 60, y: 65, r: 2.8, name: 'Zubenelhakrabi' },
      ],
      lines: [[0, 1], [0, 2], [1, 3], [2, 3]],
    },
    clientOrder: {
      clientName: 'Ambassador Genevieve Rose',
      title: 'Negosiator Damai Dewan Galaksi',
      avatarEmoji: '⚖️',
      occasion: 'Penandatanganan Perjanjian Damai Harmoni',
      brief: 'Gaun harus mencerminkan keseimbangan dan keindahan mutlak. Nuansa rose quartz atau lavender lembut dengan sutra melayang dan sulaman konstelasi neraca yang simetris.',
      requirements: {
        silhouette: ['ethereal_column', 'tiered_tulle'],
        fabric: ['celestial_silk', 'starlight_organza'],
        elements: ['Udara'],
        hasEmbroidery: true,
      },
      critiqueQuotes: {
        perfect: 'Harmoni yang tiada tara! Keseimbangan warna dan potongannya mampu mendamaikan dua faksi yang berseteru. Bravo!',
        good: 'Sangat elok dan memanjakan mata. Sentuhan diplomatik yang elegan.',
        improvable: 'Terlalu asimetris dan kontras tajam. Estetika Libra membutuhkan kelembutan yang menyatu.',
      },
    },
  },
  {
    id: 'scorpio',
    name: 'Scorpio',
    latinName: 'Scorpio (Sang Kalajengking Misteri)',
    symbol: '♏',
    dates: '23 Okt – 21 Nov',
    element: 'Air',
    rulingPlanet: 'Pluto & Mars',
    stone: 'Topaz Mistik & Obsidian Hitam',
    traits: ['Intens', 'Magnetis', 'Misterius', 'Transformatif'],
    styleEssence: 'Mermaid Gaun Beludru Obsidian dengan Ekor Kalajengking Merah Tua',
    styleAdvice: 'Aura magnetis Anda terpancar paling kuat dalam potongan pas badan dramatis berbeludru gelap dan aksen merah delima misterius.',
    primaryColor: '#450a0a', // Deep blood maroon
    secondaryColor: '#09090b', // Obsidian noir
    accentColor: '#dc2626', // Antares red
    recommendedSilhouette: 'mermaid_train',
    recommendedFabric: 'midnight_velvet',
    constellation: {
      stars: [
        { x: 45, y: 42, r: 4.8, name: 'Antares' },
        { x: 35, y: 35, r: 3.0, name: 'Dschubba' },
        { x: 32, y: 25, r: 2.6, name: 'Acrab' },
        { x: 48, y: 56, r: 2.8 },
        { x: 54, y: 68, r: 3.2, name: 'Shaula' },
        { x: 62, y: 64, r: 3.0, name: 'Lesath' },
      ],
      lines: [[2, 1], [1, 0], [0, 3], [3, 4], [4, 5]],
    },
    clientOrder: {
      clientName: 'Contessa Vespera Nightshade',
      title: 'Pemilik Klub Rahasia Shadow Masquerade',
      avatarEmoji: '🦂',
      occasion: 'Pesta Topeng Tengah Malam Bulan Mati',
      brief: 'Gaun siluet mermaid berekor dramatis dengan beludru hitam obsidian dan merah marun. Berikan aura mematikan yang tak mungkin diabaikan siapapun!',
      requirements: {
        silhouette: ['mermaid_train'],
        fabric: ['midnight_velvet'],
        elements: ['Air'],
        hasEmbroidery: true,
      },
      critiqueQuotes: {
        perfect: 'Menghipnotis dan berbahaya... Semua mata di pesta topeng tak berani berkedip. Anda telah menenun intrik sejati ke dalam beludru ini.',
        good: 'Nuansa gelap yang memikat dan ekor mermaid yang sangat tegas.',
        improvable: 'Gaun ini terlalu ceria dan polos. Scorpio membutuhkan kedalaman bayangan dan sensualitas yang membara.',
      },
    },
  },
  {
    id: 'sagittarius',
    name: 'Sagittarius',
    latinName: 'Sagittarius (Sang Pemanah Galaksi)',
    symbol: '♐',
    dates: '22 Nov – 21 Des',
    element: 'Api',
    rulingPlanet: 'Jupiter',
    stone: 'Pirus & Tanzanite Ungu',
    traits: ['Bebas', 'Petualang', 'Filosofis', 'Optimis'],
    styleEssence: 'Siluet Petualang Anggun Berbelahan Tinggi dengan Jubah Bintang Ungu Jupiter',
    styleAdvice: 'Bebaskan langkah dengan belahan dinamis dan jubah melayang yang menangkap angin kebebasan.',
    primaryColor: '#7c3aed', // Jupiter royal purple
    secondaryColor: '#2563eb', // Electric cobalt
    accentColor: '#f59e0b', // Comet gold
    recommendedSilhouette: 'siren_slit',
    recommendedFabric: 'aurora_mesh',
    constellation: {
      stars: [
        { x: 38, y: 55, r: 3.6, name: 'Kaus Australis' },
        { x: 32, y: 45, r: 3.0, name: 'Kaus Media' },
        { x: 42, y: 40, r: 3.2, name: 'Kaus Borealis' },
        { x: 52, y: 48, r: 3.5, name: 'Nunki' },
        { x: 60, y: 42, r: 2.8, name: 'Ascella' },
      ],
      lines: [[1, 2], [2, 3], [3, 4], [0, 1], [0, 3]],
    },
    clientOrder: {
      clientName: 'Captain Kaida Starstrider',
      title: 'Penjelajah Antariksa Sabuk Asteroid',
      avatarEmoji: '🏹',
      occasion: 'Peringatan Peluncuran Ekspedisi Jupiter Baru',
      brief: 'Saya butuh gaun berbelahan tinggi yang bebas untuk bergerak, warna ungu royal Jupiter dengan aksen biru elektrik, dan jubah bintang yang melayang seperti ekor komet!',
      requirements: {
        silhouette: ['siren_slit', 'asymmetric_astral'],
        fabric: ['aurora_mesh', 'starlight_organza'],
        elements: ['Api'],
      },
      critiqueQuotes: {
        perfect: 'Menembus batas cakrawala! Gaun ini terasa seperti terbang melintasi nebula Jupiter tanpa hambatan. Bebas dan gagah!',
        good: 'Sangat dinamis dan energik, warna ungunya sangat hidup.',
        improvable: 'Gaun ini terlalu membatasi ruang gerak. Pemanah kosmik butuh kebebasan melangkah!',
      },
    },
  },
  {
    id: 'capricorn',
    name: 'Capricorn',
    latinName: 'Capricorn (Sang Kambing Laut Saturnus)',
    symbol: '♑',
    dates: '22 Des – 19 Jan',
    element: 'Tanah',
    rulingPlanet: 'Saturnus',
    stone: 'Granit & Onyx Hitam',
    traits: ['Berwibawa', 'Disiplin', 'Penuh Visi', 'Abadi'],
    styleEssence: 'Gaun Berstruktur Kokoh dengan Brokat Hijau Hutan Tua & Emas Antik',
    styleAdvice: 'Pilihlah gaun bergaya arsitektural yang memancarkan otoritas abadi dan martabat ningrat tak lekang waktu.',
    primaryColor: '#1e293b', // Deep charcoal
    secondaryColor: '#14532d', // Pine green
    accentColor: '#d97706', // Antique bronze
    recommendedSilhouette: 'peplum_gown',
    recommendedFabric: 'constellation_brocade',
    constellation: {
      stars: [
        { x: 30, y: 35, r: 3.4, name: 'Algedi' },
        { x: 38, y: 42, r: 3.0, name: 'Dabih' },
        { x: 52, y: 60, r: 3.2 },
        { x: 65, y: 55, r: 3.5, name: 'Deneb Algedi' },
        { x: 58, y: 45, r: 2.8, name: 'Nashira' },
      ],
      lines: [[0, 1], [1, 2], [2, 3], [3, 4], [1, 4]],
    },
    clientOrder: {
      clientName: 'Director Morwenna Vance',
      title: 'Ketua Dewan Senat Saturnus',
      avatarEmoji: '🏔️',
      occasion: 'Rapat Paripurna Tahunan Konfederasi Bintang',
      brief: 'Gaun formal berwibawa tinggi. Siluet peplum berstruktur tegas, warna arang tua atau hijau cemara gelap, dihiasi sulaman Saturnus perunggu antik.',
      requirements: {
        silhouette: ['peplum_gown', 'ballgown'],
        fabric: ['constellation_brocade', 'midnight_velvet'],
        elements: ['Tanah'],
        hasEmbroidery: true,
      },
      critiqueQuotes: {
        perfect: 'Wibawa tak terbantahkan. Tidak ada senator yang berani menyela pidato saya saat saya mengenakan mahakarya arsitektural ini.',
        good: 'Strukturnya solid dan mencerminkan disiplin tinggi.',
        improvable: 'Terlalu banyak kerutan main-main. Seorang pemimpin Saturnus membutuhkan garis lurus yang berwibawa.',
      },
    },
  },
  {
    id: 'aquarius',
    name: 'Aquarius',
    latinName: 'Aquarius (Sang Pembawa Air Langit)',
    symbol: '♒',
    dates: '20 Jan – 18 Feb',
    element: 'Udara',
    rulingPlanet: 'Uranus',
    stone: 'Amethyst & Safir Listrik',
    traits: ['Visioner', 'Inovatif', 'Eksentrik', 'Humanis'],
    styleEssence: 'Siluet Avant-Garde Asimetris dengan Kilau Neon Cyan & Perak Uranus',
    styleAdvice: 'Tolak konvensi biasa! Padukan potongan bahu tak lazim dengan kilau futuristik ombak bintang.',
    primaryColor: '#0284c7', // Electric cyan
    secondaryColor: '#4f46e5', // Deep indigo
    accentColor: '#38bdf8', // Neon starlight
    recommendedSilhouette: 'asymmetric_astral',
    recommendedFabric: 'aurora_mesh',
    constellation: {
      stars: [
        { x: 30, y: 35, r: 3.8, name: 'Sadalmelik' },
        { x: 42, y: 40, r: 3.5, name: 'Sadalsuud' },
        { x: 55, y: 38, r: 3.0, name: 'Sadachbia' },
        { x: 45, y: 55, r: 2.6 },
        { x: 35, y: 68, r: 3.2, name: 'Skat' },
      ],
      lines: [[0, 1], [1, 2], [1, 3], [3, 4]],
    },
    clientOrder: {
      clientName: 'Nova Zephyr',
      title: 'Kurator Seni Metamodern Masa Depan',
      avatarEmoji: '⚡',
      occasion: 'Pameran Seni Hologram Antargalaksi',
      brief: 'Saya ingin gaun yang mendahului zaman 100 tahun ke depan! Potongan asimetris avant-garde, warna cyan neon berpadu nila, dengan aksen gelombang pembawa air langit.',
      requirements: {
        silhouette: ['asymmetric_astral', 'siren_slit'],
        fabric: ['aurora_mesh', 'iridescent_taffeta'],
        elements: ['Udara'],
      },
      critiqueQuotes: {
        perfect: 'Masa depan telah tiba di atelier ini! Gaun ini mematahkan semua hukum fisika mode konvensional. Sangat jenius!',
        good: 'Eksentrik dan berani, garis asimetrisnya sangat memukau.',
        improvable: 'Gaun ini terlihat seperti gaun abad lalu. Saya butuh visi revolusioner Uranus!',
      },
    },
  },
  {
    id: 'pisces',
    name: 'Pisces',
    latinName: 'Pisces (Sang Ikan Mistis Samudera)',
    symbol: '♓',
    dates: '19 Feb – 20 Mar',
    element: 'Air',
    rulingPlanet: 'Neptunus',
    stone: 'Aquamarine & Giok Laut',
    traits: ['Empatis', 'Penuh Mimpi', 'Artistik', 'Mistik'],
    styleEssence: 'Mermaid Ombak Samudera dengan Taffeta Iridescent & Tulle Lautan Bintang',
    styleAdvice: 'Biarkan siluet mermaid dan bahan iridescent membawa Anda menyelami keajaiban palung samudera kosmik.',
    primaryColor: '#0d9488', // Mystic teal
    secondaryColor: '#818cf8', // Dreamy periwrinkle
    accentColor: '#5eead4', // Seafoam shimmer
    recommendedSilhouette: 'mermaid_train',
    recommendedFabric: 'iridescent_taffeta',
    constellation: {
      stars: [
        { x: 32, y: 30, r: 3.0 },
        { x: 40, y: 42, r: 2.8 },
        { x: 48, y: 56, r: 3.6, name: 'Alrescha' },
        { x: 62, y: 50, r: 2.7 },
        { x: 70, y: 38, r: 3.0 },
      ],
      lines: [[0, 1], [1, 2], [2, 3], [3, 4]],
    },
    clientOrder: {
      clientName: 'Melody of the Coral Reef',
      title: 'Penyelam Mistis Palung Bintang',
      avatarEmoji: '🌊',
      occasion: 'Konser Bawah Air Aurora Neptunus',
      brief: 'Gaun mermaid yang tampak seperti sirip ikan koi bercahaya. Bahan berkerlap pelangi (iridescent) bernuansa teal dan ungu lavender dengan sulaman Alrescha.',
      requirements: {
        silhouette: ['mermaid_train', 'tiered_tulle'],
        fabric: ['iridescent_taffeta', 'starlight_organza'],
        elements: ['Air'],
        hasEmbroidery: true,
      },
      critiqueQuotes: {
        perfect: 'Seperti mimpi yang menjadi kenyataan di kedalaman samudra bintang! Efek sirip dan pantulan cahayanya menghanyutkan jiwa.',
        good: 'Sangat mistis dan anggun, efek ombaknya terasa nyata.',
        improvable: 'Kurang unsur melamun dan magis lautan. Pisces butuh riak air iridescent!',
      },
    },
  },
];

export interface SilhouetteOption {
  id: string;
  name: string;
  desc: string;
  category: 'ballgown' | 'mermaid' | 'column' | 'slit' | 'peplum' | 'asymmetric' | 'tiered';
}

export const SILHOUETTES: SilhouetteOption[] = [
  { id: 'ballgown', name: 'Royal Ballgown', desc: 'Rok mengembang megah khas pesta istana raya', category: 'ballgown' },
  { id: 'mermaid_train', name: 'Mermaid Siren Train', desc: 'Siluet pas badan dengan ekor sirip duyung dramatis', category: 'mermaid' },
  { id: 'ethereal_column', name: 'Ethereal Column', desc: 'Gaun lurus ramping menjuntai dengan lipatan sutra melayang', category: 'column' },
  { id: 'siren_slit', name: 'High-Slit Starfall', desc: 'Belahan paha tinggi berani yang dinamis dan anggun', category: 'slit' },
  { id: 'peplum_gown', name: 'Architectural Peplum', desc: 'Garis pinggang berstruktur tegas dengan rok lurus kokoh', category: 'peplum' },
  { id: 'asymmetric_astral', name: 'Avant-Garde Wave', desc: 'Potongan asimetris modern pembias cahaya bintang', category: 'asymmetric' },
  { id: 'tiered_tulle', name: 'Stardust Tiered Tulle', desc: 'Tiga lapis rok bervolume ringan melayang seperti awan nebula', category: 'tiered' },
];

export interface BodiceOption {
  id: string;
  name: string;
  desc: string;
}

export const BODICES: BodiceOption[] = [
  { id: 'sweetheart', name: 'Sweetheart Corset', desc: 'Korset bentuk hati klasik penopang pinggang anggun' },
  { id: 'plunging_v', name: 'Plunging Astral V', desc: 'Kerah V tajam dramatis dengan aksen garis permata' },
  { id: 'off_shoulder', name: 'Bardot Off-Shoulder', desc: 'Jatuh di pundak mengekspos tulang selangka dengan kelembutan ningrat' },
  { id: 'high_neck', name: 'Royal High-Neck Collar', desc: 'Kerah tinggi aristokrat dengan rajutan renda bintang halus' },
  { id: 'one_shoulder', name: 'One-Shoulder Drape', desc: 'Siluet asimetris tunggal terinspirasi dewi Yunani kuno' },
  { id: 'sheer_illusion', name: 'Sheer Nebula Illusion', desc: 'Kain transparan bertabur partikel bintang ilusionis' },
];

export interface SleeveOption {
  id: string;
  name: string;
  desc: string;
}

export const SLEEVES: SleeveOption[] = [
  { id: 'sleeveless', name: 'Tanpa Lengan (Clean)', desc: 'Ekspos lengan anggun dengan aksen bahu halus' },
  { id: 'angel_wings', name: 'Sayap Malaikat Melayang', desc: 'Kain sifon jatuh lembut dari bahu hingga ke lantai' },
  { id: 'bishop_puff', name: 'Bishop Royal Puff', desc: 'Lengan gelembung bervolume dengan manset kancing permata' },
  { id: 'fitted_astral', name: 'Lengan Ketat Bintang', desc: 'Lengan panjang pas badan bertabur kristal mikroskopis' },
  { id: 'cape_straps', name: 'Jubah Bintang Astral', desc: 'Jubah lebar transparan membentang di punggung' },
];

export interface FabricOption {
  id: string;
  name: string;
  desc: string;
  sheen: string;
  patternType: 'solid' | 'shimmer' | 'brocade' | 'tulle' | 'velvet' | 'iridescent';
}

export const FABRICS: FabricOption[] = [
  { id: 'celestial_silk', name: 'Sutra Samudera Kosmik', desc: 'Kain sutra satin super halus dengan kilau cair lembut', sheen: 'Satin High-Gloss', patternType: 'solid' },
  { id: 'midnight_velvet', name: 'Beludru Tengah Malam', desc: 'Beludru pekat tebal penyerap cahaya dengan bayangan mewah', sheen: 'Plush Matte Glow', patternType: 'velvet' },
  { id: 'starlight_organza', name: 'Organza Kabut Bintang', desc: 'Kain semi-transparan berkerlap serpihan mikroskopis intan', sheen: 'Glitter Shimmer', patternType: 'shimmer' },
  { id: 'constellation_brocade', name: 'Brokat Emas Astrologi', desc: 'Tenunan jacquard timbul dengan benang emas & perak murni', sheen: 'Metallic Thread', patternType: 'brocade' },
  { id: 'iridescent_taffeta', name: 'Taffeta Pelangi Samudera', desc: 'Kain dua warna yang berubah rona saat bergerak tertimpa cahaya', sheen: 'Duochrome Shift', patternType: 'iridescent' },
  { id: 'aurora_mesh', name: 'Mesh Cahaya Aurora', desc: 'Jaring halus bermotif degradasi warna kutub utara', sheen: 'Ethereal Ombre', patternType: 'tulle' },
];

export interface ColorSwatch {
  name: string;
  hex: string;
  element: ElementType;
}

export const COLOR_SWATCHES: ColorSwatch[] = [
  { name: 'Ruby Mars', hex: '#b91c1c', element: 'Api' },
  { name: 'Crimson Sun', hex: '#e11d48', element: 'Api' },
  { name: 'Amber Solstice', hex: '#d97706', element: 'Api' },
  { name: 'Gold Kekaisaran', hex: '#eab308', element: 'Api' },
  { name: 'Emerald Venus', hex: '#047857', element: 'Tanah' },
  { name: 'Forest Shadow', hex: '#14532d', element: 'Tanah' },
  { name: 'Sage Botanik', hex: '#10b981', element: 'Tanah' },
  { name: 'Obsidian Earth', hex: '#334155', element: 'Tanah' },
  { name: 'Perak Merkurius', hex: '#cbd5e1', element: 'Udara' },
  { name: 'Electric Cyan', hex: '#0284c7', element: 'Udara' },
  { name: 'Lavender Nebula', hex: '#a855f7', element: 'Udara' },
  { name: 'Rose Quartz', hex: '#fb7185', element: 'Udara' },
  { name: 'Midnight Ocean', hex: '#0f172a', element: 'Air' },
  { name: 'Deep Sapphire', hex: '#1d4ed8', element: 'Air' },
  { name: 'Aquamarine Mist', hex: '#0d9488', element: 'Air' },
  { name: 'Pearl Luminescence', hex: '#f8fafc', element: 'Air' },
];

export interface HeadpieceOption {
  id: string;
  name: string;
  zodiacSign?: string;
  desc: string;
}

export const HEADPIECES: HeadpieceOption[] = [
  { id: 'none', name: 'Tanpa Mahkota', desc: 'Tatanan rambut polos natural' },
  { id: 'solar_halo', name: 'Mahkota Sinar Surya (Leo/Aries)', zodiacSign: 'leo', desc: 'Sinar-sinar emas memancar melingkar bagai matahari perkasa' },
  { id: 'ram_horns_tiara', name: 'Tiara Tanduk Emas (Aries)', zodiacSign: 'aries', desc: 'Tiara anggun dengan lekukan tanduk domba emas bertatah ruby' },
  { id: 'venus_rose_laurel', name: 'Karangan Bunga Venus (Taurus/Libra)', zodiacSign: 'taurus', desc: 'Jalinan daun zaitun berhiaskan kuncup mawar rose gold' },
  { id: 'pearl_moon_circlet', name: 'Tiara Mutiara Purnawa (Cancer)', zodiacSign: 'cancer', desc: 'Bulan sabit perak dengan mutiara samudra bergelantungan di dahi' },
  { id: 'maiden_star_laurel', name: 'Mahkota Gandum Spica (Virgo)', zodiacSign: 'virgo', desc: 'Tangkai gandum perak halus simbol kemurnian panen langit' },
  { id: 'scorpion_sting_crest', name: 'Diadem Obsidian Kalajengking (Scorpio)', zodiacSign: 'scorpio', desc: 'Batu obsidian tajam dengan aksen permata merah Antares' },
  { id: 'centaur_archer_crown', name: 'Mahkota Panah Komet (Sagittarius)', zodiacSign: 'sagittarius', desc: 'Sayap bulu emas berujung kristal ungu pemanah' },
  { id: 'saturn_ring_coronet', name: 'Koronet Cincin Saturnus (Capricorn)', zodiacSign: 'capricorn', desc: 'Cincin ganda perunggu melingkari kepala dengan batu onyx' },
  { id: 'uranus_wave_diadem', name: 'Diadem Gelombang Uranus (Aquarius)', zodiacSign: 'aquarius', desc: 'Bentuk geometris prisma futuristik dengan cahaya cyan' },
  { id: 'pisces_koi_circlet', name: 'Sirklet Ikan Laut Mistik (Pisces)', zodiacSign: 'pisces', desc: 'Dua ikan perak berenang membentuk lingkaran dengan tetesan aquamarine' },
];

export interface ModelLook {
  skinTone: string;
  hairStyle: string;
  hairColor: string;
  silhouette: string;
  bodice: string;
  sleeves: string;
  fabric: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  zodiacSignId: string;
  hasConstellationEmbroidery: boolean;
  embroideryColor: 'gold' | 'silver' | 'rose_gold';
  headpiece: string;
  showBeltGlyph: boolean;
  showStardustHem: boolean;
  sparkleIntensity: number; // 0 to 100
  backdrop: 'runway' | 'atelier' | 'moodboard' | 'observatory';
}

export const INITIAL_LOOK: ModelLook = {
  skinTone: '#fcd34d', // Warm golden ivory
  hairStyle: 'starlight_waves',
  hairColor: '#451a03',
  silhouette: 'ballgown',
  bodice: 'sweetheart',
  sleeves: 'cape_straps',
  fabric: 'constellation_brocade',
  primaryColor: '#d97706',
  secondaryColor: '#b45309',
  accentColor: '#fef08a',
  zodiacSignId: 'leo',
  hasConstellationEmbroidery: true,
  embroideryColor: 'gold',
  headpiece: 'solar_halo',
  showBeltGlyph: true,
  showStardustHem: true,
  sparkleIntensity: 75,
  backdrop: 'runway',
};
