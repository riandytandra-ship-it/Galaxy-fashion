import React from 'react';
import {
  BODICES,
  COLOR_SWATCHES,
  FABRICS,
  HEADPIECES,
  ModelLook,
  SILHOUETTES,
  SLEEVES,
  ZODIAC_SIGNS,
} from '../data/zodiacData';
import { playConstellationChime, playShearsSound } from '../utils/audio';
import { Sparkles, Scissors, Crown, Compass, Palette } from 'lucide-react';

interface AtelierControlsProps {
  look: ModelLook;
  onChange: (updated: Partial<ModelLook>) => void;
  activeTab: 'zodiac' | 'silhouette' | 'fabric' | 'embroidery' | 'styling';
  onTabChange: (tab: 'zodiac' | 'silhouette' | 'fabric' | 'embroidery' | 'styling') => void;
}

export const AtelierControls: React.FC<AtelierControlsProps> = ({
  look,
  onChange,
  activeTab,
  onTabChange,
}) => {
  const currentZodiac = ZODIAC_SIGNS.find((z) => z.id === look.zodiacSignId) || ZODIAC_SIGNS[4];

  // Helper when user selects a zodiac sign to apply smart couture defaults
  const handleZodiacSelect = (signId: string) => {
    playConstellationChime();
    const sign = ZODIAC_SIGNS.find((z) => z.id === signId);
    if (!sign) return;

    // Matching headpiece if available
    const matchedHeadpiece = HEADPIECES.find((h) => h.zodiacSign === signId)?.id || look.headpiece;

    onChange({
      zodiacSignId: sign.id,
      primaryColor: sign.primaryColor,
      secondaryColor: sign.secondaryColor,
      accentColor: sign.accentColor,
      silhouette: sign.recommendedSilhouette,
      fabric: sign.recommendedFabric,
      headpiece: matchedHeadpiece,
      hasConstellationEmbroidery: true,
    });
  };

  return (
    <div className="flex flex-col h-full bg-slate-900/90 backdrop-blur-md rounded-2xl border border-amber-500/20 shadow-xl overflow-hidden">
      {/* Workshop Navigation Tabs */}
      <div className="flex items-center gap-1 p-2 bg-slate-950/80 border-b border-amber-500/20 overflow-x-auto no-scrollbar">
        <button
          onClick={() => onTabChange('zodiac')}
          className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
            activeTab === 'zodiac'
              ? 'bg-amber-500 text-slate-950 font-semibold shadow-md'
              : 'text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Compass className="w-3.5 h-3.5" />
          <span>1. Zodiak Muse</span>
        </button>

        <button
          onClick={() => onTabChange('silhouette')}
          className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
            activeTab === 'silhouette'
              ? 'bg-amber-500 text-slate-950 font-semibold shadow-md'
              : 'text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Scissors className="w-3.5 h-3.5" />
          <span>2. Pola & Siluet</span>
        </button>

        <button
          onClick={() => onTabChange('fabric')}
          className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
            activeTab === 'fabric'
              ? 'bg-amber-500 text-slate-950 font-semibold shadow-md'
              : 'text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Palette className="w-3.5 h-3.5" />
          <span>3. Kain & Warna</span>
        </button>

        <button
          onClick={() => onTabChange('embroidery')}
          className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
            activeTab === 'embroidery'
              ? 'bg-amber-500 text-slate-950 font-semibold shadow-md'
              : 'text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>4. Bordir Kosmik</span>
        </button>

        <button
          onClick={() => onTabChange('styling')}
          className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
            activeTab === 'styling'
              ? 'bg-amber-500 text-slate-950 font-semibold shadow-md'
              : 'text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Crown className="w-3.5 h-3.5" />
          <span>5. Mahkota & Rambut</span>
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-4 overflow-y-auto space-y-5 text-sm">
        {/* TAB 1: ZODIAC SELECTION */}
        {activeTab === 'zodiac' && (
          <div className="space-y-4">
            <div className="border-b border-white/10 pb-3">
              <h3 className="text-base font-semibold text-amber-200 font-cinzel">Pilih Zodiak Inspirasi</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Setiap tanda zodiak memiliki elemen alam, rona warna kosmik, dan siluet khas tersendiri.
              </p>
            </div>

            {/* Current Selected Zodiac Card */}
            <div className="p-3.5 rounded-xl bg-gradient-to-r from-amber-950/40 via-slate-900 to-indigo-950/40 border border-amber-500/30 flex items-start gap-3">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/40 flex items-center justify-center text-2xl text-amber-300 shrink-0 font-cinzel">
                {currentZodiac.symbol}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold text-white font-cinzel text-base">{currentZodiac.latinName}</h4>
                  <span className="text-xs text-amber-400">· {currentZodiac.dates}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                  <span>Elemen: {currentZodiac.element}</span>
                  <span aria-hidden="true">·</span>
                  <span>Planet: {currentZodiac.rulingPlanet}</span>
                  <span aria-hidden="true">·</span>
                  <span>Batu: {currentZodiac.stone}</span>
                </div>
                <p className="text-xs text-amber-100/90 mt-2 italic font-serif">
                  "{currentZodiac.styleAdvice}"
                </p>
              </div>
            </div>

            {/* 12 Zodiac Signs Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1">
              {ZODIAC_SIGNS.map((sign) => {
                const isSelected = sign.id === look.zodiacSignId;
                return (
                  <button
                    key={sign.id}
                    onClick={() => handleZodiacSelect(sign.id)}
                    className={`flex items-center gap-2.5 p-2.5 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'bg-amber-500/20 border-amber-400 text-white shadow-sm ring-1 ring-amber-400'
                        : 'bg-slate-950/60 border-white/5 hover:border-amber-500/30 text-slate-300 hover:text-white'
                    }`}
                  >
                    <span className="text-lg font-cinzel text-amber-300">{sign.symbol}</span>
                    <div className="truncate">
                      <div className="font-medium text-xs truncate">{sign.name}</div>
                      <div className="text-[10px] text-slate-400 flex items-center gap-1">
                        <span>{sign.element}</span>
                        <span aria-hidden="true">·</span>
                        <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: sign.primaryColor }} />
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 2: SILHOUETTE & CUT */}
        {activeTab === 'silhouette' && (
          <div className="space-y-5">
            {/* Siluet Rok / Bawah */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold text-amber-200 uppercase tracking-wider font-cinzel">
                  Siluet Gaun Utama (Skirt & Train)
                </label>
                <span className="text-[11px] text-slate-400">Pola potongan bawah</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {SILHOUETTES.map((sil) => {
                  const isSelected = look.silhouette === sil.id;
                  return (
                    <button
                      key={sil.id}
                      onClick={() => {
                        playShearsSound();
                        onChange({ silhouette: sil.id });
                      }}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        isSelected
                          ? 'bg-amber-500/20 border-amber-400 text-white ring-1 ring-amber-400'
                          : 'bg-slate-950/60 border-white/5 hover:border-amber-500/30 text-slate-300'
                      }`}
                    >
                      <div className="font-semibold text-xs text-amber-200 font-cinzel">{sil.name}</div>
                      <div className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">{sil.desc}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Pola Korset / Bodice */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold text-amber-200 uppercase tracking-wider font-cinzel">
                  Potongan Dada & Korset (Bodice)
                </label>
                <span className="text-[11px] text-slate-400">Garis leher & pinggang</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {BODICES.map((bod) => {
                  const isSelected = look.bodice === bod.id;
                  return (
                    <button
                      key={bod.id}
                      onClick={() => {
                        playShearsSound();
                        onChange({ bodice: bod.id });
                      }}
                      className={`p-2.5 rounded-xl border text-left transition-all ${
                        isSelected
                          ? 'bg-amber-500/20 border-amber-400 text-white ring-1 ring-amber-400'
                          : 'bg-slate-950/60 border-white/5 hover:border-amber-500/30 text-slate-300'
                      }`}
                    >
                      <div className="font-medium text-xs text-slate-200">{bod.name}</div>
                      <div className="text-[10px] text-slate-400 mt-0.5 line-clamp-1">{bod.desc}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Lengan / Sleeves & Cape */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold text-amber-200 uppercase tracking-wider font-cinzel">
                  Lengan & Jubah (Sleeves & Cape)
                </label>
                <span className="text-[11px] text-slate-400">Aksen bahu</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {SLEEVES.map((slv) => {
                  const isSelected = look.sleeves === slv.id;
                  return (
                    <button
                      key={slv.id}
                      onClick={() => {
                        playShearsSound();
                        onChange({ sleeves: slv.id });
                      }}
                      className={`p-2.5 rounded-xl border text-left transition-all ${
                        isSelected
                          ? 'bg-amber-500/20 border-amber-400 text-white ring-1 ring-amber-400'
                          : 'bg-slate-950/60 border-white/5 hover:border-amber-500/30 text-slate-300'
                      }`}
                    >
                      <div className="font-medium text-xs text-slate-200">{slv.name}</div>
                      <div className="text-[10px] text-slate-400 mt-0.5 line-clamp-1">{slv.desc}</div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: FABRIC & COLOR */}
        {activeTab === 'fabric' && (
          <div className="space-y-5">
            {/* Tekstur Kain */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold text-amber-200 uppercase tracking-wider font-cinzel">
                  Tekstur & Jenis Kain Sutra
                </label>
                <span className="text-[11px] text-slate-400">Karakter bahan</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {FABRICS.map((fab) => {
                  const isSelected = look.fabric === fab.id;
                  return (
                    <button
                      key={fab.id}
                      onClick={() => {
                        playShearsSound();
                        onChange({ fabric: fab.id });
                      }}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        isSelected
                          ? 'bg-amber-500/20 border-amber-400 text-white ring-1 ring-amber-400'
                          : 'bg-slate-950/60 border-white/5 hover:border-amber-500/30 text-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-xs text-amber-200 font-cinzel">{fab.name}</span>
                        <span className="text-[10px] text-amber-400/80 font-mono">{fab.sheen}</span>
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5">{fab.desc}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Palet Warna Kosmik */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold text-amber-200 uppercase tracking-wider font-cinzel">
                  Pilihan Warna Utama (Rona Dominan)
                </label>
                <span className="text-[11px] text-slate-400">16 warna elemen zodiak</span>
              </div>
              <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                {COLOR_SWATCHES.map((swatch) => {
                  const isSelected = look.primaryColor.toLowerCase() === swatch.hex.toLowerCase();
                  return (
                    <button
                      key={swatch.name}
                      onClick={() => {
                        onChange({ primaryColor: swatch.hex });
                      }}
                      title={`${swatch.name} (${swatch.element})`}
                      className={`h-10 rounded-xl border flex items-center justify-center transition-all ${
                        isSelected
                          ? 'border-white scale-110 shadow-lg ring-2 ring-amber-400'
                          : 'border-white/20 hover:border-white/50 hover:scale-105'
                      }`}
                      style={{ backgroundColor: swatch.hex }}
                    >
                      {isSelected && <span className="w-2 h-2 rounded-full bg-white shadow-sm" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Kustomisasi Rona Sekunder & Aksen */}
            <div className="grid grid-cols-2 gap-3 pt-2 border-t border-white/10">
              <div className="p-2.5 rounded-xl bg-slate-950/60 border border-white/5">
                <label className="block text-[11px] font-medium text-slate-300 mb-1.5">
                  Gradasi Sekunder (Shadow / Folds)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={look.secondaryColor}
                    onChange={(e) => onChange({ secondaryColor: e.target.value })}
                    className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0"
                  />
                  <span className="text-xs font-mono text-slate-400">{look.secondaryColor}</span>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-950/60 border border-white/5">
                <label className="block text-[11px] font-medium text-slate-300 mb-1.5">
                  Aksen Berkilau (Highlights & Gems)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={look.accentColor}
                    onChange={(e) => onChange({ accentColor: e.target.value })}
                    className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0"
                  />
                  <span className="text-xs font-mono text-slate-400">{look.accentColor}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: EMBROIDERY & ORNAMENTS */}
        {activeTab === 'embroidery' && (
          <div className="space-y-4">
            <div className="border-b border-white/10 pb-3">
              <h3 className="text-base font-semibold text-amber-200 font-cinzel">Bordir & Sulaman Rasi Bintang</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Benang emas astrologi yang menyulam pola konstelasi nyata bintang di langit malam.
              </p>
            </div>

            {/* Toggle Sulaman Rasi Bintang */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/60 border border-white/5">
              <div>
                <div className="font-semibold text-xs text-white">Sulaman Rasi Bintang ({currentZodiac.name})</div>
                <div className="text-[11px] text-slate-400">Peta koordinat bintang pada rok gaun</div>
              </div>
              <button
                onClick={() => {
                  playConstellationChime();
                  onChange({ hasConstellationEmbroidery: !look.hasConstellationEmbroidery });
                }}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                  look.hasConstellationEmbroidery
                    ? 'bg-amber-500 text-slate-950 font-semibold'
                    : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {look.hasConstellationEmbroidery ? 'Aktif' : 'Nonaktif'}
              </button>
            </div>

            {/* Warna Benang Sulam */}
            {look.hasConstellationEmbroidery && (
              <div className="p-3 rounded-xl bg-slate-950/60 border border-white/5 space-y-2">
                <label className="text-xs font-semibold text-amber-200 font-cinzel">Pilihan Benang Logam Mulia</label>
                <div className="grid grid-cols-3 gap-2">
                  {(
                    [
                      { id: 'gold', name: 'Benang Emas 24K', hex: '#fbbf24' },
                      { id: 'silver', name: 'Perak Bintang', hex: '#e2e8f0' },
                      { id: 'rose_gold', name: 'Rose Gold Venus', hex: '#fda4af' },
                    ] as const
                  ).map((thread) => (
                    <button
                      key={thread.id}
                      onClick={() => {
                        playConstellationChime();
                        onChange({ embroideryColor: thread.id });
                      }}
                      className={`p-2 rounded-lg border text-xs text-center transition-all ${
                        look.embroideryColor === thread.id
                          ? 'border-amber-400 bg-amber-500/20 text-white ring-1 ring-amber-400'
                          : 'border-white/5 bg-slate-900 text-slate-400 hover:text-white'
                      }`}
                    >
                      <span className="w-2.5 h-2.5 rounded-full inline-block mr-1.5" style={{ backgroundColor: thread.hex }} />
                      {thread.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Sabuk Lambang Zodiak */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/60 border border-white/5">
              <div>
                <div className="font-semibold text-xs text-white">Gesper Medallion Glif Zodiak ({currentZodiac.symbol})</div>
                <div className="text-[11px] text-slate-400">Sabuk ukiran logam mulia di pinggang</div>
              </div>
              <button
                onClick={() => {
                  onChange({ showBeltGlyph: !look.showBeltGlyph });
                }}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                  look.showBeltGlyph
                    ? 'bg-amber-500 text-slate-950 font-semibold'
                    : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {look.showBeltGlyph ? 'Tampil' : 'Sembunyi'}
              </button>
            </div>

            {/* Taburan Debu Bintang di Ujung Rok */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/60 border border-white/5">
              <div>
                <div className="font-semibold text-xs text-white">Kilauan Debu Bintang Keliling Rok (Stardust Hem)</div>
                <div className="text-[11px] text-slate-400">Taburan intan mikroskopis bercahaya</div>
              </div>
              <button
                onClick={() => {
                  onChange({ showStardustHem: !look.showStardustHem });
                }}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                  look.showStardustHem
                    ? 'bg-amber-500 text-slate-950 font-semibold'
                    : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {look.showStardustHem ? 'Tampil' : 'Sembunyi'}
              </button>
            </div>

            {/* Intensitas Kilau Slider */}
            <div className="p-3 rounded-xl bg-slate-950/60 border border-white/5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-amber-200">Intensitas Efek Kilauan Bintang</span>
                <span className="text-xs font-mono text-amber-400 tabular-nums">{look.sparkleIntensity}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                value={look.sparkleIntensity}
                onChange={(e) => onChange({ sparkleIntensity: Number(e.target.value) })}
                className="w-full accent-amber-400 cursor-pointer"
              />
            </div>
          </div>
        )}

        {/* TAB 5: HEADPIECES & STYLING */}
        {activeTab === 'styling' && (
          <div className="space-y-5">
            {/* Mahkota / Tiara Zodiak */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold text-amber-200 uppercase tracking-wider font-cinzel">
                  Mahkota & Tiara Zodiak (Headpieces)
                </label>
                <span className="text-[11px] text-slate-400">Aksen kepala bangsawan</span>
              </div>
              <div className="grid grid-cols-1 gap-2">
                {HEADPIECES.map((hp) => {
                  const isSelected = look.headpiece === hp.id;
                  return (
                    <button
                      key={hp.id}
                      onClick={() => {
                        playConstellationChime();
                        onChange({ headpiece: hp.id });
                      }}
                      className={`p-2.5 rounded-xl border text-left transition-all ${
                        isSelected
                          ? 'bg-amber-500/20 border-amber-400 text-white ring-1 ring-amber-400'
                          : 'bg-slate-950/60 border-white/5 hover:border-amber-500/30 text-slate-300'
                      }`}
                    >
                      <div className="font-semibold text-xs text-amber-200 font-cinzel">{hp.name}</div>
                      <div className="text-[11px] text-slate-400 mt-0.5">{hp.desc}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Tatanan Rambut */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold text-amber-200 uppercase tracking-wider font-cinzel">
                  Gaya Rambut Model (Hairstyle)
                </label>
                <span className="text-[11px] text-slate-400">Tatanan haute couture</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'starlight_waves', name: 'Gelombang Ombak Bintang' },
                  { id: 'high_celestial_bun', name: 'Sanggul Kerajaan Tinggi' },
                  { id: 'cosmic_bob', name: 'Bob Geometris Sleek' },
                  { id: 'braided_crown', name: 'Jalinan Kepang Mahkota' },
                ].map((hair) => (
                  <button
                    key={hair.id}
                    onClick={() => onChange({ hairStyle: hair.id })}
                    className={`p-2 rounded-xl border text-xs font-medium text-left transition-all ${
                      look.hairStyle === hair.id
                        ? 'bg-amber-500/20 border-amber-400 text-white ring-1 ring-amber-400'
                        : 'bg-slate-950/60 border-white/5 hover:border-amber-500/30 text-slate-300'
                    }`}
                  >
                    {hair.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Warna Rambut & Warna Kulit */}
            <div className="grid grid-cols-2 gap-3 pt-2 border-t border-white/10">
              <div className="p-2.5 rounded-xl bg-slate-950/60 border border-white/5">
                <label className="block text-[11px] font-medium text-slate-300 mb-1.5">
                  Rona Rambut Model
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={look.hairColor}
                    onChange={(e) => onChange({ hairColor: e.target.value })}
                    className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0"
                  />
                  <span className="text-xs font-mono text-slate-400">{look.hairColor}</span>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-950/60 border border-white/5">
                <label className="block text-[11px] font-medium text-slate-300 mb-1.5">
                  Warna Kulit Manekin
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={look.skinTone}
                    onChange={(e) => onChange({ skinTone: e.target.value })}
                    className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0"
                  />
                  <span className="text-xs font-mono text-slate-400">{look.skinTone}</span>
                </div>
              </div>
            </div>

            {/* Pilihan Panggung / Runway Backdrop */}
            <div className="pt-2 border-t border-white/10">
              <label className="block text-xs font-semibold text-amber-200 font-cinzel mb-2">
                Latar Panggung Peragaan Busana
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'runway', name: 'Runway Kaca Langit' },
                  { id: 'atelier', name: 'Meja Jahit Atelier' },
                  { id: 'moodboard', name: 'Moodboard Galaksi' },
                ].map((bg) => (
                  <button
                    key={bg.id}
                    onClick={() => onChange({ backdrop: bg.id as ModelLook['backdrop'] })}
                    className={`p-2 rounded-lg border text-xs text-center transition-all ${
                      look.backdrop === bg.id
                        ? 'bg-amber-500/20 border-amber-400 text-white ring-1 ring-amber-400'
                        : 'bg-slate-950/60 border-white/5 hover:border-amber-500/30 text-slate-400'
                    }`}
                  >
                    {bg.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
