/**
 * Atelier Astra: Zodiac Dressmaker Game
 * Haute Couture Astrological Fashion Atelier
 */

import React, { useState, useEffect } from 'react';
import {
  INITIAL_LOOK,
  ModelLook,
  ZODIAC_SIGNS,
  ZodiacSign,
  HEADPIECES,
} from './data/zodiacData';
import { MannequinCanvas } from './components/MannequinCanvas';
import { AtelierControls } from './components/AtelierControls';
import { ClientOrdersModal } from './components/ClientOrdersModal';
import { HoroscopeOracleModal } from './components/HoroscopeOracleModal';
import { LookbookModal, SavedCoutureDesign } from './components/LookbookModal';
import { FashionCardModal } from './components/FashionCardModal';
import {
  getSoundEnabled,
  setSoundEnabled,
  playConstellationChime,
  playShearsSound,
  playShutterSound,
} from './utils/audio';
import {
  Sparkles,
  Camera,
  Volume2,
  VolumeX,
  RotateCcw,
  Wand2,
  BookOpen,
  Award,
  Compass,
  Info,
  Check,
} from 'lucide-react';

export default function App() {
  const [look, setLook] = useState<ModelLook>(INITIAL_LOOK);
  const [designName, setDesignName] = useState('Gaun Kemegahan Surya');
  const [lightingMode, setLightingMode] = useState<'spotlight' | 'astral' | 'atelier'>('spotlight');
  const [activeTab, setActiveTab] = useState<'zodiac' | 'silhouette' | 'fabric' | 'embroidery' | 'styling'>('zodiac');

  // Sound state
  const [soundOn, setSoundOn] = useState(true);

  // Modals
  const [isClientModalOpen, setIsClientModalOpen] = useState(false);
  const [isOracleModalOpen, setIsOracleModalOpen] = useState(false);
  const [isLookbookOpen, setIsLookbookOpen] = useState(false);
  const [isCardModalOpen, setIsCardModalOpen] = useState(false);
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [saveSuccessNotice, setSaveSuccessNotice] = useState(false);

  // Saved Designs Lookbook
  const [savedDesigns, setSavedDesigns] = useState<SavedCoutureDesign[]>([]);

  // Active Client Order highlight if accepted
  const [activeClientOrder, setActiveClientOrder] = useState<ZodiacSign | null>(null);

  // Load saved designs and audio preference on mount
  useEffect(() => {
    setSoundOn(getSoundEnabled());
    try {
      const stored = localStorage.getItem('atelier_saved_designs');
      if (stored) {
        setSavedDesigns(JSON.parse(stored));
      }
    } catch {
      // ignore JSON parse error
    }
  }, []);

  const handleSoundToggle = () => {
    const nextState = !soundOn;
    setSoundOn(nextState);
    setSoundEnabled(nextState);
    if (nextState) {
      playConstellationChime();
    }
  };

  const handleUpdateLook = (updated: Partial<ModelLook>) => {
    setLook((prev) => ({ ...prev, ...updated }));
  };

  // Quick Random Cosmic Inspiration
  const handleRandomize = () => {
    playConstellationChime();
    const randomZodiac = ZODIAC_SIGNS[Math.floor(Math.random() * ZODIAC_SIGNS.length)];
    const matchingHeadpiece =
      HEADPIECES.find((h) => h.zodiacSign === randomZodiac.id)?.id || 'solar_halo';

    setLook({
      ...look,
      zodiacSignId: randomZodiac.id,
      silhouette: randomZodiac.recommendedSilhouette,
      fabric: randomZodiac.recommendedFabric,
      primaryColor: randomZodiac.primaryColor,
      secondaryColor: randomZodiac.secondaryColor,
      accentColor: randomZodiac.accentColor,
      headpiece: matchingHeadpiece,
      hasConstellationEmbroidery: true,
      sparkleIntensity: 80,
    });
    setDesignName(`Kreasi Astral ${randomZodiac.name}`);
  };

  // Reset to default look
  const handleReset = () => {
    playShearsSound();
    setLook(INITIAL_LOOK);
    setDesignName('Gaun Kemegahan Surya');
    setActiveClientOrder(null);
  };

  // Save creation to Lookbook
  const handleSaveToLookbook = () => {
    playShutterSound();
    const newDesign: SavedCoutureDesign = {
      id: `couture_${Date.now()}`,
      name: designName || `Gaun ${look.zodiacSignId}`,
      timestamp: new Date().toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }),
      zodiacSignId: look.zodiacSignId,
      look: { ...look },
    };

    const updated = [newDesign, ...savedDesigns];
    setSavedDesigns(updated);
    try {
      localStorage.setItem('atelier_saved_designs', JSON.stringify(updated));
    } catch {}

    setSaveSuccessNotice(true);
    setTimeout(() => setSaveSuccessNotice(false), 2500);
  };

  const handleDeleteSavedDesign = (id: string) => {
    const updated = savedDesigns.filter((d) => d.id !== id);
    setSavedDesigns(updated);
    try {
      localStorage.setItem('atelier_saved_designs', JSON.stringify(updated));
    } catch {}
  };

  const handleLoadSavedDesign = (design: SavedCoutureDesign) => {
    setLook(design.look);
    setDesignName(design.name);
  };

  // When client order is accepted
  const handleAcceptClientOrder = (sign: ZodiacSign) => {
    playConstellationChime();
    setActiveClientOrder(sign);
    const matchedHeadpiece =
      HEADPIECES.find((h) => h.zodiacSign === sign.id)?.id || 'solar_halo';

    setLook({
      ...look,
      zodiacSignId: sign.id,
      silhouette: sign.recommendedSilhouette,
      fabric: sign.recommendedFabric,
      primaryColor: sign.primaryColor,
      secondaryColor: sign.secondaryColor,
      accentColor: sign.accentColor,
      headpiece: matchedHeadpiece,
      hasConstellationEmbroidery: true,
    });
    setDesignName(`Gaun Pesanan ${sign.clientOrder.clientName}`);
  };

  const currentZodiac = ZODIAC_SIGNS.find((z) => z.id === look.zodiacSignId) || ZODIAC_SIGNS[4];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-400/20">
      {/* 1. TOP BAR CONTRACT: 3 Zones separated by gap-8 */}
      <header className="flex items-center justify-between gap-8 px-6 py-3.5 border-b border-amber-500/20 bg-slate-950/90 backdrop-blur-md sticky top-0 z-40">
        {/* Zone 1: Brand Wordmark (Single text element in display face) */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            handleReset();
          }}
          className="text-lg font-bold tracking-wider text-amber-300 font-cinzel whitespace-nowrap shrink-0 flex items-center gap-2"
        >
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Atelier Astra</span>
        </a>

        {/* Zone 2: 4-5 Clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-slate-300">
          <button
            onClick={() => {
              setActiveClientOrder(null);
            }}
            className="hover:text-amber-300 transition-colors whitespace-nowrap shrink-0"
          >
            Studio Desain
          </button>
          <button
            onClick={() => setIsClientModalOpen(true)}
            className="hover:text-amber-300 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5"
          >
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span>Pesanan Klien Zodiak</span>
          </button>
          <button
            onClick={() => setIsOracleModalOpen(true)}
            className="hover:text-amber-300 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5"
          >
            <Compass className="w-3.5 h-3.5 text-amber-400" />
            <span>Ramalan Gaya Zodiak</span>
          </button>
          <button
            onClick={() => setIsLookbookOpen(true)}
            className="hover:text-amber-300 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5"
          >
            <BookOpen className="w-3.5 h-3.5 text-amber-400" />
            <span>Koleksi Lookbook ({savedDesigns.length})</span>
          </button>
          <button
            onClick={() => setIsGuideOpen(true)}
            className="hover:text-amber-300 transition-colors whitespace-nowrap shrink-0"
          >
            Panduan Astrologi
          </button>
        </nav>

        {/* Zone 3: 1 Primary Action */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleSoundToggle}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900 border border-white/5 transition-colors"
            title={soundOn ? 'Matikan Suara Audio' : 'Aktifkan Suara Audio'}
            aria-label="Sound Toggle"
          >
            {soundOn ? <Volume2 className="w-4 h-4 text-amber-400" /> : <VolumeX className="w-4 h-4" />}
          </button>

          <button
            onClick={handleSaveToLookbook}
            className="px-4 py-2 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-md flex items-center gap-1.5"
          >
            {saveSuccessNotice ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-950" />
                <span>Tersimpan!</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5 text-amber-950" />
                <span>Simpan Karya</span>
              </>
            )}
          </button>
        </div>
      </header>

      {/* Active Commission Banner (If currently styling for a client) */}
      {activeClientOrder && (
        <div className="bg-gradient-to-r from-amber-950/70 via-slate-900 to-indigo-950/70 border-b border-amber-500/30 px-6 py-2 flex items-center justify-between text-xs">
          <div className="flex items-center gap-3">
            <span className="text-xl">{activeClientOrder.clientOrder.avatarEmoji}</span>
            <div>
              <span className="font-semibold text-amber-300 font-cinzel">
                Pesanan Aktif: {activeClientOrder.clientOrder.clientName}
              </span>
              <span className="text-slate-400 ml-2">({activeClientOrder.clientOrder.occasion})</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsClientModalOpen(true)}
              className="px-3 py-1 rounded bg-amber-500 text-slate-950 font-semibold text-xs hover:bg-amber-400 transition-colors"
            >
              Nilai Busana
            </button>
            <button
              onClick={() => setActiveClientOrder(null)}
              className="text-slate-400 hover:text-white text-xs px-2 py-1"
            >
              Batal
            </button>
          </div>
        </div>
      )}

      {/* Main Workspace Layout */}
      <main className="flex-1 max-w-[1440px] w-full mx-auto px-4 sm:px-6 py-4 flex flex-col gap-4">
        {/* Workspace Top Toolbar: Title input & lighting modes */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900/60 p-3 rounded-2xl border border-white/5">
          <div className="flex items-center gap-3 flex-1 min-w-[280px]">
            <span className="text-xl font-cinzel text-amber-400">{currentZodiac.symbol}</span>
            <input
              type="text"
              value={designName}
              onChange={(e) => setDesignName(e.target.value)}
              className="bg-transparent border-b border-white/10 hover:border-amber-400/50 focus:border-amber-400 text-sm font-semibold text-white px-1 py-0.5 outline-none transition-colors w-full max-w-sm font-cinzel"
              placeholder="Beri Nama Karya Busana Anda..."
            />
          </div>

          {/* Quick Action Strip */}
          <div className="flex items-center gap-2">
            {/* Lighting Modes */}
            <div className="flex items-center gap-1 p-1 bg-slate-950/80 rounded-lg border border-white/5 text-xs">
              <button
                onClick={() => setLightingMode('spotlight')}
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  lightingMode === 'spotlight'
                    ? 'bg-amber-500 text-slate-950 font-semibold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Sorot Runway
              </button>
              <button
                onClick={() => setLightingMode('astral')}
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  lightingMode === 'astral'
                    ? 'bg-amber-500 text-slate-950 font-semibold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Malam Astral
              </button>
              <button
                onClick={() => setLightingMode('atelier')}
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  lightingMode === 'atelier'
                    ? 'bg-amber-500 text-slate-950 font-semibold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Studio Hangat
              </button>
            </div>

            {/* Random Inspiration */}
            <button
              onClick={handleRandomize}
              className="p-2 rounded-lg text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-850 border border-white/5 transition-colors text-xs flex items-center gap-1.5"
              title="Acak Inspirasi Zodiak"
            >
              <Wand2 className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Inspirasi Acak</span>
            </button>

            {/* Snapshot Card */}
            <button
              onClick={() => {
                playShutterSound();
                setIsCardModalOpen(true);
              }}
              className="p-2 rounded-lg text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-850 border border-white/5 transition-colors text-xs flex items-center gap-1.5"
              title="Lihat Kartu Mode Haute Couture"
            >
              <Camera className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Kartu Mode</span>
            </button>

            {/* Reset */}
            <button
              onClick={handleReset}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 border border-white/5 transition-colors"
              title="Reset ke Awal"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Studio Workspace Split: 2 Balanced Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch min-h-[620px]">
          {/* LEFT: Interactive Mannequin Canvas (7 cols) */}
          <div className="lg:col-span-6 xl:col-span-7 flex flex-col h-full min-h-[500px]">
            <MannequinCanvas look={look} lightingMode={lightingMode} interactive={true} />

            {/* Zodiac Quick Wheel Strip (Under Mannequin) */}
            <div className="mt-3 p-2 bg-slate-900/60 rounded-xl border border-white/5 flex items-center justify-between gap-1 overflow-x-auto no-scrollbar">
              {ZODIAC_SIGNS.map((sign) => {
                const isSelected = sign.id === look.zodiacSignId;
                return (
                  <button
                    key={sign.id}
                    onClick={() => {
                      playConstellationChime();
                      const matchedHeadpiece =
                        HEADPIECES.find((h) => h.zodiacSign === sign.id)?.id || look.headpiece;
                      handleUpdateLook({
                        zodiacSignId: sign.id,
                        primaryColor: sign.primaryColor,
                        secondaryColor: sign.secondaryColor,
                        accentColor: sign.accentColor,
                        silhouette: sign.recommendedSilhouette,
                        fabric: sign.recommendedFabric,
                        headpiece: matchedHeadpiece,
                        hasConstellationEmbroidery: true,
                      });
                    }}
                    title={`${sign.name} (${sign.dates})`}
                    className={`flex flex-col items-center justify-center min-w-[50px] p-1.5 rounded-lg transition-all ${
                      isSelected
                        ? 'bg-amber-500/20 border border-amber-400 text-amber-300 ring-1 ring-amber-400'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                    }`}
                  >
                    <span className="text-base font-cinzel leading-none">{sign.symbol}</span>
                    <span className="text-[10px] mt-1 font-medium truncate">{sign.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* RIGHT: Atelier Workshop Controls (5 cols) */}
          <div className="lg:col-span-6 xl:col-span-5 flex flex-col h-full min-h-[500px]">
            <AtelierControls
              look={look}
              onChange={handleUpdateLook}
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />
          </div>
        </div>

        {/* Astrological Feature Highlights (Editorial Adjacency) */}
        <section className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div
            onClick={() => setIsClientModalOpen(true)}
            className="p-4 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-amber-500/20 hover:border-amber-500/50 cursor-pointer transition-all space-y-2 group"
          >
            <div className="flex items-center justify-between">
              <span className="text-amber-400 font-cinzel text-xs font-semibold uppercase tracking-wider">
                Tantangan Klien Kosmik
              </span>
              <Award className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
            </div>
            <h3 className="text-sm font-semibold text-white font-cinzel">
              12 Permintaan Busana Pesta Bintang
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Jahit busana untuk Ratu Aurelia (Leo), Selene sang Penyair Rembulan (Cancer), hingga Contessa Nightshade (Scorpio). Raih ulasan sempurna 5 bintang!
            </p>
          </div>

          <div
            onClick={() => setIsOracleModalOpen(true)}
            className="p-4 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-amber-500/20 hover:border-amber-500/50 cursor-pointer transition-all space-y-2 group"
          >
            <div className="flex items-center justify-between">
              <span className="text-amber-400 font-cinzel text-xs font-semibold uppercase tracking-wider">
                Oracle Astrologi
              </span>
              <Compass className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
            </div>
            <h3 className="text-sm font-semibold text-white font-cinzel">
              Ramalan Gaya & Aura Zodiak Harian
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Dengarkan bisikan transit planet hari ini. Temukan warna keberuntungan, siluet pembawa karisma, dan terapkan langsung ke manekin dengan satu sentuhan.
            </p>
          </div>

          <div
            onClick={() => setIsLookbookOpen(true)}
            className="p-4 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-amber-500/20 hover:border-amber-500/50 cursor-pointer transition-all space-y-2 group"
          >
            <div className="flex items-center justify-between">
              <span className="text-amber-400 font-cinzel text-xs font-semibold uppercase tracking-wider">
                Portofolio Haute Couture
              </span>
              <BookOpen className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
            </div>
            <h3 className="text-sm font-semibold text-white font-cinzel">
              {savedDesigns.length} Mahakarya Tersimpan
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Buka arsip rancangan gaun Anda, modifikasi pola jahitannya kapan saja, atau cetak Kartu Spesifikasi Mode untuk dibagikan ke sesama pencinta tata busana.
            </p>
          </div>
        </section>
      </main>

      {/* Subtle Editorial Footer */}
      <footer className="mt-8 border-t border-white/10 bg-slate-950/80 px-6 py-4 text-xs text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-amber-300 font-cinzel">Atelier Astra</span>
          <span aria-hidden="true">·</span>
          <span>Game Perancang Busana Haute Couture Zodiak</span>
          <span aria-hidden="true">·</span>
          <span>12 Rasi Bintang Astrologi</span>
        </div>
        <div className="text-[11px] text-slate-400">
          Ditenagai Visi Mode & Astrologi Elemen
        </div>
      </footer>

      {/* MODALS */}
      <ClientOrdersModal
        isOpen={isClientModalOpen}
        onClose={() => setIsClientModalOpen(false)}
        look={look}
        activeSignId={look.zodiacSignId}
        onAcceptOrder={handleAcceptClientOrder}
      />

      <HoroscopeOracleModal
        isOpen={isOracleModalOpen}
        onClose={() => setIsOracleModalOpen(false)}
        onApplyStyle={handleUpdateLook}
      />

      <LookbookModal
        isOpen={isLookbookOpen}
        onClose={() => setIsLookbookOpen(false)}
        savedDesigns={savedDesigns}
        onLoadDesign={handleLoadSavedDesign}
        onDeleteDesign={handleDeleteSavedDesign}
      />

      <FashionCardModal
        isOpen={isCardModalOpen}
        onClose={() => setIsCardModalOpen(false)}
        look={look}
        designName={designName}
      />

      {/* Guide Drawer / Modal */}
      {isGuideOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-2xl bg-slate-900 border border-amber-500/30 rounded-2xl p-6 space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h2 className="text-lg font-semibold text-white font-cinzel flex items-center gap-2">
                <Info className="w-5 h-5 text-amber-400" />
                Panduan Perancang Busana Zodiak
              </h2>
              <button
                onClick={() => setIsGuideOpen(false)}
                className="text-slate-400 hover:text-white text-xs px-2 py-1 rounded bg-slate-800"
              >
                Tutup
              </button>
            </div>

            <div className="space-y-4 text-xs text-slate-300 leading-relaxed">
              <div>
                <h4 className="font-semibold text-amber-300 text-sm font-cinzel mb-1">
                  1. Empat Elemen Astrologi dalam Tata Busana
                </h4>
                <ul className="list-disc list-inside space-y-1 text-slate-400">
                  <li><strong className="text-red-400">Api (Aries, Leo, Sagittarius):</strong> Mengutamakan siluet dramatis, warna merah-emas cerah, dan belahan berani.</li>
                  <li><strong className="text-emerald-400">Tanah (Taurus, Virgo, Capricorn):</strong> Menekankan kemewahan abadi, jahitan presisi mikro, brokat, dan warna bumi.</li>
                  <li><strong className="text-amber-300">Udara (Gemini, Libra, Aquarius):</strong> Mengutamakan kain melayang ringan, organza berkerlap, dan potongan asimetris modern.</li>
                  <li><strong className="text-cyan-400">Air (Cancer, Scorpio, Pisces):</strong> Mengusung siluet mermaid ombak samudra, bahan taffeta pelangi (iridescent), dan mutiara mistis.</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-amber-300 text-sm font-cinzel mb-1">
                  2. Cara Memainkan Mode Pesanan Klien
                </h4>
                <p className="text-slate-400">
                  Buka menu <strong>"Pesanan Klien Zodiak"</strong> di bilah atas. Pilih salah satu dari 12 klien ternama, pelajari brief acaranya, sesuaikan gaun dengan siluet dan bahan yang diminta, lalu klik <strong>"Nilai Gaun Saat Ini"</strong> untuk memperoleh rating dan ulasan dari sang klien.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-amber-300 text-sm font-cinzel mb-1">
                  3. Simpan dan Kartu Mode
                </h4>
                <p className="text-slate-400">
                  Setiap gaun dapat disimpan ke arsip <strong>Lookbook</strong> pribadi Anda di browser. Anda juga bisa mengklik tombol <strong>"Kartu Mode"</strong> dengan ikon kamera untuk melihat kartu koleksi bergaya editorial majalah mode Paris.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
