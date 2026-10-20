import React from 'react';
import { ModelLook, ZODIAC_SIGNS } from '../data/zodiacData';
import { playShearsSound, playConstellationChime } from '../utils/audio';
import { BookOpen, X, Trash2, ArrowUpRight, Sparkles } from 'lucide-react';

export interface SavedCoutureDesign {
  id: string;
  name: string;
  timestamp: string;
  zodiacSignId: string;
  look: ModelLook;
}

interface LookbookModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedDesigns: SavedCoutureDesign[];
  onLoadDesign: (design: SavedCoutureDesign) => void;
  onDeleteDesign: (id: string) => void;
}

export const LookbookModal: React.FC<LookbookModalProps> = ({
  isOpen,
  onClose,
  savedDesigns,
  onLoadDesign,
  onDeleteDesign,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-amber-500/30 rounded-2xl shadow-2xl flex flex-col overflow-hidden max-h-[85vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-slate-950/80">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/40 flex items-center justify-center text-amber-300">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white font-cinzel">
                Portofolio Koleksi Gaun (Lookbook)
              </h2>
              <p className="text-xs text-slate-400">
                Arsip mahakarya haute couture zodiak yang telah Anda simpan
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
        <div className="p-6 overflow-y-auto space-y-4">
          {savedDesigns.length === 0 ? (
            <div className="p-12 text-center space-y-3 rounded-2xl bg-slate-950/40 border border-white/5">
              <Sparkles className="w-8 h-8 text-amber-400/50 mx-auto" />
              <h3 className="text-base font-semibold text-slate-300 font-cinzel">
                Belum Ada Gaun Tersimpan
              </h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Rancang busana impian Anda di Atelier dan klik tombol "Simpan ke Lookbook" untuk mengabadikan karya dalam portofolio perancang.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {savedDesigns.map((design) => {
                const zodiac = ZODIAC_SIGNS.find((z) => z.id === design.zodiacSignId) || ZODIAC_SIGNS[0];
                return (
                  <div
                    key={design.id}
                    className="p-4 rounded-xl bg-slate-950/70 border border-amber-500/20 hover:border-amber-500/40 transition-all space-y-3 group"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xl font-cinzel text-amber-300">{zodiac.symbol}</span>
                          <h4 className="font-semibold text-white font-cinzel text-sm">{design.name}</h4>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
                          <span>{zodiac.name}</span>
                          <span aria-hidden="true">·</span>
                          <span>{design.timestamp}</span>
                        </div>
                      </div>

                      {/* Swatch preview dots */}
                      <div className="flex items-center gap-1">
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-white/20"
                          style={{ backgroundColor: design.look.primaryColor }}
                        />
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-white/20"
                          style={{ backgroundColor: design.look.secondaryColor }}
                        />
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-white/20"
                          style={{ backgroundColor: design.look.accentColor }}
                        />
                      </div>
                    </div>

                    {/* Metadata tags */}
                    <div className="p-2.5 rounded-lg bg-slate-900/60 border border-white/5 text-[11px] text-slate-300 space-y-1">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Siluet:</span>
                        <span className="text-amber-200">{design.look.silhouette.replace('_', ' ')}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Bahan:</span>
                        <span className="text-amber-200">{design.look.fabric.replace('_', ' ')}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Korset:</span>
                        <span className="text-amber-200">{design.look.bodice.replace('_', ' ')}</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between pt-1">
                      <button
                        onClick={() => {
                          playShearsSound();
                          onDeleteDesign(design.id);
                        }}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-950/30 transition-colors text-xs flex items-center gap-1"
                        title="Hapus rancangan ini"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Hapus</span>
                      </button>

                      <button
                        onClick={() => {
                          playConstellationChime();
                          onLoadDesign(design);
                          onClose();
                        }}
                        className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors shadow-sm"
                      >
                        <span>Terapkan ke Manekin</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-3.5 border-t border-white/10 bg-slate-950/80 text-xs text-slate-400">
          <span>{savedDesigns.length} Gaun dalam portofolio Anda</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 font-medium text-slate-300 hover:text-white transition-colors"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
