import React, { useState } from 'react';
import { ModelLook, ZodiacSign, ZODIAC_SIGNS } from '../data/zodiacData';
import { playShearsSound, playSuccessSound } from '../utils/audio';
import { Star, Award, X, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';

interface ClientOrdersModalProps {
  isOpen: boolean;
  onClose: () => void;
  look: ModelLook;
  activeSignId: string;
  onAcceptOrder: (sign: ZodiacSign) => void;
}

export interface EvaluationResult {
  clientName: string;
  zodiacName: string;
  score: number;
  stars: number;
  verdict: 'PERFECT' | 'GREAT' | 'IMPROVABLE';
  feedbackQuote: string;
  breakdown: {
    silhouetteMatch: boolean;
    elementMatch: boolean;
    fabricMatch: boolean;
    embroideryMatch: boolean;
  };
}

export const ClientOrdersModal: React.FC<ClientOrdersModalProps> = ({
  isOpen,
  onClose,
  look,
  activeSignId,
  onAcceptOrder,
}) => {
  const [selectedClientSign, setSelectedClientSign] = useState<ZodiacSign>(
    ZODIAC_SIGNS.find((z) => z.id === activeSignId) || ZODIAC_SIGNS[0]
  );
  const [evaluation, setEvaluation] = useState<EvaluationResult | null>(null);

  if (!isOpen) return null;

  // Evaluate current look against chosen client order
  const handleEvaluate = (sign: ZodiacSign) => {
    const order = sign.clientOrder;
    const reqs = order.requirements;

    // Checks
    const silhouetteMatch = reqs.silhouette ? reqs.silhouette.includes(look.silhouette) : true;
    const fabricMatch = reqs.fabric ? reqs.fabric.includes(look.fabric) : true;
    const elementMatch = reqs.elements ? reqs.elements.includes(sign.element) : true;
    const embroideryMatch = reqs.hasEmbroidery ? look.hasConstellationEmbroidery : true;
    const zodiacMatch = look.zodiacSignId === sign.id;

    let points = 50; // base score
    if (silhouetteMatch) points += 15;
    if (fabricMatch) points += 15;
    if (embroideryMatch) points += 10;
    if (zodiacMatch) points += 10;

    let verdict: EvaluationResult['verdict'] = 'GREAT';
    let feedbackQuote = order.critiqueQuotes.good;
    let stars = 4;

    if (points >= 90) {
      verdict = 'PERFECT';
      feedbackQuote = order.critiqueQuotes.perfect;
      stars = 5;
      playSuccessSound();
    } else if (points < 75) {
      verdict = 'IMPROVABLE';
      feedbackQuote = order.critiqueQuotes.improvable;
      stars = 3;
      playShearsSound();
    } else {
      playSuccessSound();
    }

    setEvaluation({
      clientName: order.clientName,
      zodiacName: sign.name,
      score: points,
      stars,
      verdict,
      feedbackQuote,
      breakdown: {
        silhouetteMatch,
        elementMatch,
        fabricMatch,
        embroideryMatch,
      },
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-slate-900 border border-amber-500/30 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-slate-950/80">
          <div>
            <h2 className="text-xl font-semibold text-white font-cinzel flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-400" />
              Pesanan Klien Kosmik (Zodiac Commissions)
            </h2>
            <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
              <span>12 Permintaan Haute Couture</span>
              <span aria-hidden="true">·</span>
              <span>Penuhi brief busana untuk meraih reputasi maestro</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Evaluation Result Banner / Modal View */}
        {evaluation ? (
          <div className="p-6 overflow-y-auto space-y-6">
            <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-950/60 via-slate-900 to-indigo-950/60 border border-amber-500/40 text-center space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-500/20 border border-amber-400 text-3xl">
                {selectedClientSign.clientOrder.avatarEmoji}
              </div>

              <div>
                <h3 className="text-2xl font-bold text-white font-cinzel">
                  Ulasan Busana dari {evaluation.clientName}
                </h3>
                <div className="flex items-center justify-center gap-1.5 mt-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-6 h-6 ${
                        i < evaluation.stars
                          ? 'text-amber-400 fill-amber-400'
                          : 'text-slate-600'
                      }`}
                    />
                  ))}
                  <span className="ml-2 font-mono text-xl font-bold text-amber-300">
                    {evaluation.score}/100
                  </span>
                </div>
              </div>

              <blockquote className="p-4 rounded-xl bg-slate-950/70 border border-white/10 text-amber-100 font-serif italic text-base max-w-xl mx-auto">
                "{evaluation.feedbackQuote}"
              </blockquote>

              {/* Requirement Checklist */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto pt-2 text-xs">
                <div className="p-3 rounded-lg bg-slate-950/60 border border-white/5 flex items-center gap-2">
                  {evaluation.breakdown.silhouetteMatch ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
                  )}
                  <span>Siluet Cocok</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-950/60 border border-white/5 flex items-center gap-2">
                  {evaluation.breakdown.fabricMatch ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
                  )}
                  <span>Karakter Kain</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-950/60 border border-white/5 flex items-center gap-2">
                  {evaluation.breakdown.embroideryMatch ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
                  )}
                  <span>Bordir Bintang</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-950/60 border border-white/5 flex items-center gap-2">
                  {look.zodiacSignId === selectedClientSign.id ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
                  )}
                  <span>Afinitas Zodiak</span>
                </div>
              </div>

              <div className="flex items-center justify-center gap-3 pt-3">
                <button
                  onClick={() => setEvaluation(null)}
                  className="px-5 py-2 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 rounded-lg transition-colors"
                >
                  Kembali ke Daftar Klien
                </button>
                <button
                  onClick={onClose}
                  className="px-5 py-2 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors shadow-md"
                >
                  Lanjut Merancang di Atelier
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Client List & Detail View */
          <div className="flex-1 grid grid-cols-1 md:grid-cols-3 overflow-hidden">
            {/* Left Column: Client List */}
            <div className="md:col-span-1 border-r border-white/10 overflow-y-auto p-3 space-y-2 bg-slate-950/40">
              {ZODIAC_SIGNS.map((sign) => {
                const isSelected = sign.id === selectedClientSign.id;
                const order = sign.clientOrder;
                return (
                  <button
                    key={sign.id}
                    onClick={() => setSelectedClientSign(sign)}
                    className={`w-full p-3 rounded-xl border text-left transition-all flex items-start gap-3 ${
                      isSelected
                        ? 'bg-amber-500/20 border-amber-400 text-white ring-1 ring-amber-400'
                        : 'bg-slate-900/60 border-white/5 hover:border-amber-500/20 text-slate-300'
                    }`}
                  >
                    <span className="text-2xl shrink-0 mt-0.5">{order.avatarEmoji}</span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-xs text-amber-200 font-cinzel truncate">
                          {order.clientName}
                        </span>
                        <span className="text-xs text-amber-400 font-cinzel ml-1">{sign.symbol}</span>
                      </div>
                      <div className="text-[11px] text-slate-400 truncate mt-0.5">{order.title}</div>
                      <div className="text-[10px] text-amber-300/80 mt-1 flex items-center gap-1.5">
                        <span>{sign.name}</span>
                        <span aria-hidden="true">·</span>
                        <span>{sign.element}</span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Right Column: Selected Client Detailed Brief */}
            <div className="md:col-span-2 p-6 overflow-y-auto space-y-5 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/40 flex items-center justify-center text-3xl shrink-0">
                    {selectedClientSign.clientOrder.avatarEmoji}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white font-cinzel">
                      {selectedClientSign.clientOrder.clientName}
                    </h3>
                    <div className="text-xs text-amber-300 font-medium">
                      {selectedClientSign.clientOrder.title} · {selectedClientSign.latinName}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
                      <span>Acara: {selectedClientSign.clientOrder.occasion}</span>
                    </div>
                  </div>
                </div>

                {/* Brief Letter */}
                <div className="p-4 rounded-xl bg-slate-950/70 border border-amber-500/20 space-y-2">
                  <div className="text-xs font-semibold uppercase tracking-wider text-amber-400 font-cinzel">
                    Surat Permintaan Gaun (Couture Brief)
                  </div>
                  <p className="text-sm text-slate-200 leading-relaxed font-serif italic">
                    "{selectedClientSign.clientOrder.brief}"
                  </p>
                </div>

                {/* Requirements breakdown */}
                <div className="space-y-2">
                  <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider font-cinzel">
                    Spesifikasi yang Diharapkan Klien:
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-2.5 rounded-lg bg-slate-950/50 border border-white/5">
                      <span className="text-slate-400 block text-[10px]">Siluet Idaman:</span>
                      <span className="font-medium text-amber-200">
                        {selectedClientSign.recommendedSilhouette.replace('_', ' ')}
                      </span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-slate-950/50 border border-white/5">
                      <span className="text-slate-400 block text-[10px]">Tekstur Bahan:</span>
                      <span className="font-medium text-amber-200">
                        {selectedClientSign.recommendedFabric.replace('_', ' ')}
                      </span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-slate-950/50 border border-white/5">
                      <span className="text-slate-400 block text-[10px]">Aura Elemen:</span>
                      <span className="font-medium text-amber-200">{selectedClientSign.element}</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-slate-950/50 border border-white/5">
                      <span className="text-slate-400 block text-[10px]">Bordir Konstelasi:</span>
                      <span className="font-medium text-amber-200">Wajib Aktif (Gold/Silver)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-white/10 gap-3">
                <button
                  onClick={() => {
                    onAcceptOrder(selectedClientSign);
                    onClose();
                  }}
                  className="px-4 py-2.5 text-xs font-medium text-amber-300 border border-amber-500/40 rounded-xl hover:bg-amber-500/10 transition-colors"
                >
                  Muat Konsep Klien ke Manekin
                </button>

                <button
                  onClick={() => handleEvaluate(selectedClientSign)}
                  className="flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-colors shadow-lg"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Nilai Gaun Saat Ini</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
