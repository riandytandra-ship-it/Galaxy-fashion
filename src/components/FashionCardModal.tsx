import React from 'react';
import { ModelLook, ZODIAC_SIGNS } from '../data/zodiacData';
import { MannequinCanvas } from './MannequinCanvas';
import { Sparkles, X, Download, Share2 } from 'lucide-react';
import { playShutterSound } from '../utils/audio';

interface FashionCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  look: ModelLook;
  designName: string;
}

export const FashionCardModal: React.FC<FashionCardModalProps> = ({
  isOpen,
  onClose,
  look,
  designName,
}) => {
  if (!isOpen) return null;

  const currentZodiac = ZODIAC_SIGNS.find((z) => z.id === look.zodiacSignId) || ZODIAC_SIGNS[4];

  const handleDownload = () => {
    playShutterSound();
    // Create simple printable window / text snapshot or notify user
    const printContent = `ATELIER ASTRA - HAUTE COUTURE\nRancangan: ${designName}\nZodiak: ${currentZodiac.name} (${currentZodiac.symbol})\nElemen: ${currentZodiac.element}\nSiluet: ${look.silhouette}\nBahan: ${look.fabric}`;
    const blob = new Blob([printContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Atelier-Astra-${currentZodiac.name}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-slate-900 border border-amber-500/40 rounded-2xl shadow-2xl flex flex-col overflow-hidden max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-white/10 bg-slate-950/80">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <h3 className="text-sm font-semibold text-white font-cinzel">
              Kartu Koleksi Haute Couture
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Fashion Card Body */}
        <div className="p-5 overflow-y-auto space-y-4">
          <div className="relative p-4 rounded-xl bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border border-amber-500/30 shadow-inner space-y-4 text-center">
            {/* Brand Watermark */}
            <div className="space-y-0.5">
              <span className="text-[10px] tracking-widest uppercase text-amber-400 font-cinzel">
                L'Atelier Astrologique · Paris & Kosmos
              </span>
              <h2 className="text-xl font-bold text-white font-cinzel tracking-wide">
                {designName || `Rancangan ${currentZodiac.name}`}
              </h2>
              <div className="flex items-center justify-center gap-2 text-xs text-slate-400">
                <span>{currentZodiac.latinName}</span>
                <span aria-hidden="true">·</span>
                <span>Elemen {currentZodiac.element}</span>
              </div>
            </div>

            {/* Canvas Preview Frame */}
            <div className="w-full h-80 rounded-xl overflow-hidden border border-white/10 shadow-lg">
              <MannequinCanvas look={look} lightingMode="spotlight" interactive={false} />
            </div>

            {/* Design Specifications Grid */}
            <div className="grid grid-cols-2 gap-2 text-left text-xs pt-1">
              <div className="p-2.5 rounded-lg bg-slate-900/80 border border-white/5">
                <span className="text-[10px] text-slate-400 uppercase block">Siluet Gaun</span>
                <span className="font-semibold text-amber-200">{look.silhouette.replace('_', ' ')}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900/80 border border-white/5">
                <span className="text-[10px] text-slate-400 uppercase block">Kain Utama</span>
                <span className="font-semibold text-amber-200">{look.fabric.replace('_', ' ')}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900/80 border border-white/5">
                <span className="text-[10px] text-slate-400 uppercase block">Bordir Bintang</span>
                <span className="font-semibold text-amber-200">
                  {look.hasConstellationEmbroidery ? `Rasi ${currentZodiac.name}` : 'Polos'}
                </span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900/80 border border-white/5">
                <span className="text-[10px] text-slate-400 uppercase block">Mahkota</span>
                <span className="font-semibold text-amber-200">
                  {look.headpiece !== 'none' ? look.headpiece.replace(/_/g, ' ') : 'Natural'}
                </span>
              </div>
            </div>

            {/* Astrological seal quote */}
            <p className="text-xs text-amber-200/90 font-serif italic pt-1">
              "{currentZodiac.styleEssence}"
            </p>
          </div>
        </div>

        {/* Card Footer Actions */}
        <div className="flex items-center justify-between px-5 py-3 border-t border-white/10 bg-slate-950/80">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white transition-colors"
          >
            Tutup
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-colors shadow-md"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Unduh Spesifikasi</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
