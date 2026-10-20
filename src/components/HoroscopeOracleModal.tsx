import React, { useState } from 'react';
import { ModelLook, ZodiacSign, ZODIAC_SIGNS } from '../data/zodiacData';
import { playConstellationChime } from '../utils/audio';
import { Sparkles, X, Compass, Wand2, Star } from 'lucide-react';

interface HoroscopeOracleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyStyle: (updates: Partial<ModelLook>) => void;
}

export const HoroscopeOracleModal: React.FC<HoroscopeOracleModalProps> = ({
  isOpen,
  onClose,
  onApplyStyle,
}) => {
  const [selectedSign, setSelectedSign] = useState<ZodiacSign>(ZODIAC_SIGNS[0]);

  if (!isOpen) return null;

  const handleApplyOracleGown = () => {
    playConstellationChime();
    onApplyStyle({
      zodiacSignId: selectedSign.id,
      silhouette: selectedSign.recommendedSilhouette,
      fabric: selectedSign.recommendedFabric,
      primaryColor: selectedSign.primaryColor,
      secondaryColor: selectedSign.secondaryColor,
      accentColor: selectedSign.accentColor,
      hasConstellationEmbroidery: true,
      embroideryColor: 'gold',
      showBeltGlyph: true,
      showStardustHem: true,
      sparkleIntensity: 85,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-amber-500/30 rounded-2xl shadow-2xl flex flex-col overflow-hidden max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-slate-950/80">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/40 flex items-center justify-center text-amber-300">
              <Compass className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white font-cinzel">
                Ramalan Gaya Busana Zodiak
              </h2>
              <p className="text-xs text-slate-400">
                Penyelarasan mode kosmik & ramalan pesona haute couture
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-5 text-sm">
          {/* Sign picker */}
          <div>
            <label className="block text-xs font-semibold text-amber-200 font-cinzel uppercase tracking-wider mb-2">
              Pilih Rasi Bintang Zodiak Anda:
            </label>
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
              {ZODIAC_SIGNS.map((sign) => {
                const isSelected = sign.id === selectedSign.id;
                return (
                  <button
                    key={sign.id}
                    onClick={() => {
                      playConstellationChime();
                      setSelectedSign(sign);
                    }}
                    className={`p-2 rounded-xl border text-center transition-all ${
                      isSelected
                        ? 'bg-amber-500/20 border-amber-400 text-white ring-1 ring-amber-400'
                        : 'bg-slate-950/60 border-white/5 hover:border-amber-500/30 text-slate-300'
                    }`}
                  >
                    <div className="text-xl font-cinzel text-amber-300">{sign.symbol}</div>
                    <div className="text-[11px] font-medium truncate mt-0.5">{sign.name}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Reading Card */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-950/50 via-slate-950 to-amber-950/40 border border-amber-500/30 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-3">
                <span className="text-3xl font-cinzel text-amber-300">{selectedSign.symbol}</span>
                <div>
                  <h3 className="text-base font-bold text-white font-cinzel">{selectedSign.latinName}</h3>
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <span>{selectedSign.dates}</span>
                    <span aria-hidden="true">·</span>
                    <span>Elemen {selectedSign.element}</span>
                    <span aria-hidden="true">·</span>
                    <span>Planet {selectedSign.rulingPlanet}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[11px] text-amber-400 font-medium block">Batu Pelindung:</span>
                <span className="text-xs text-slate-200 font-serif italic">{selectedSign.stone}</span>
              </div>
            </div>

            {/* Oracle Prose */}
            <div className="space-y-2">
              <h4 className="text-xs font-semibold text-amber-300 uppercase tracking-wider font-cinzel flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Aura & Ramalan Gaya Kosmik
              </h4>
              <p className="text-sm text-slate-200 font-serif leading-relaxed italic">
                "{selectedSign.styleAdvice}"
              </p>
            </div>

            {/* Recommendations Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2 text-xs">
              <div className="p-3 rounded-xl bg-slate-900/80 border border-white/5 space-y-1">
                <span className="text-[10px] text-slate-400 uppercase tracking-wide block">Siluet Terbaik</span>
                <span className="font-semibold text-amber-200 block">
                  {selectedSign.recommendedSilhouette.replace('_', ' ').toUpperCase()}
                </span>
                <span className="text-[11px] text-slate-400">Harmonis dengan energi {selectedSign.element}</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/80 border border-white/5 space-y-1">
                <span className="text-[10px] text-slate-400 uppercase tracking-wide block">Kain Pembawa Aura</span>
                <span className="font-semibold text-amber-200 block">
                  {selectedSign.recommendedFabric.replace('_', ' ').toUpperCase()}
                </span>
                <span className="text-[11px] text-slate-400">Menenun kenyamanan martabat</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/80 border border-white/5 space-y-1">
                <span className="text-[10px] text-slate-400 uppercase tracking-wide block">Warna Keberuntungan</span>
                <div className="flex items-center gap-1.5 mt-1">
                  <span
                    className="w-4 h-4 rounded-full border border-white/40 shadow-sm"
                    style={{ backgroundColor: selectedSign.primaryColor }}
                  />
                  <span
                    className="w-4 h-4 rounded-full border border-white/40 shadow-sm"
                    style={{ backgroundColor: selectedSign.secondaryColor }}
                  />
                  <span
                    className="w-4 h-4 rounded-full border border-white/40 shadow-sm"
                    style={{ backgroundColor: selectedSign.accentColor }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Sifat Karakter Zodiak */}
          <div className="flex items-center gap-2 text-xs text-slate-300">
            <span className="text-slate-400">Karakter Busana:</span>
            {selectedSign.traits.map((t, idx) => (
              <React.Fragment key={t}>
                {idx > 0 && <span aria-hidden="true" className="text-slate-600">·</span>}
                <span className="text-amber-200">{t}</span>
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-white/10 bg-slate-950/80">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white transition-colors"
          >
            Tutup
          </button>
          <button
            onClick={handleApplyOracleGown}
            className="flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-colors shadow-lg"
          >
            <Wand2 className="w-4 h-4" />
            <span>Terapkan Gaun Zodiak Ini ke Manekin</span>
          </button>
        </div>
      </div>
    </div>
  );
};
