import React from 'react';
import { ModelLook, ZODIAC_SIGNS } from '../data/zodiacData';

// Static image imports
import runwayImg from '../assets/images/zodiac_fashion_runway_1792495028347.jpg';
import atelierImg from '../assets/images/zodiac_atelier_workshop_1792495029049.jpg';
import moodboardImg from '../assets/images/zodiac_couture_moodboard_1792495028679.jpg';

interface MannequinCanvasProps {
  look: ModelLook;
  lightingMode?: 'spotlight' | 'astral' | 'atelier';
  interactive?: boolean;
}

export const MannequinCanvas: React.FC<MannequinCanvasProps> = ({
  look,
  lightingMode = 'spotlight',
}) => {
  const currentZodiac = ZODIAC_SIGNS.find((z) => z.id === look.zodiacSignId) || ZODIAC_SIGNS[4]; // Leo default

  // Get backdrop image source
  const getBackdropSrc = () => {
    switch (look.backdrop) {
      case 'atelier':
        return atelierImg;
      case 'moodboard':
        return moodboardImg;
      case 'observatory':
      case 'runway':
      default:
        return runwayImg;
    }
  };

  // Embroidery stroke & glow colors
  const getEmbroideryColors = () => {
    switch (look.embroideryColor) {
      case 'silver':
        return { stroke: '#e2e8f0', glow: '#94a3b8', dot: '#ffffff' };
      case 'rose_gold':
        return { stroke: '#fda4af', glow: '#f43f5e', dot: '#ffe4e6' };
      case 'gold':
      default:
        return { stroke: '#fbbf24', glow: '#d97706', dot: '#fef08a' };
    }
  };

  const embColors = getEmbroideryColors();

  return (
    <div className="relative w-full h-full min-h-[540px] max-h-[760px] flex items-center justify-center overflow-hidden rounded-2xl border border-amber-500/20 bg-slate-950 select-none shadow-2xl">
      {/* Background Image with Ambient Fallback */}
      <div className="absolute inset-0">
        <img
          src={getBackdropSrc()}
          alt="Backdrop Atelier Zodiak"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-opacity duration-700 opacity-40 scale-105"
        />
        {/* Soft radial scrim for fashion focus */}
        <div
          className={`absolute inset-0 transition-colors duration-500 ${
            lightingMode === 'astral'
              ? 'bg-radial-at-c from-indigo-950/40 via-slate-950/80 to-slate-950'
              : lightingMode === 'atelier'
              ? 'bg-radial-at-c from-amber-950/30 via-slate-950/75 to-slate-950'
              : 'bg-radial-at-c from-amber-500/10 via-slate-950/80 to-slate-950'
          }`}
        />
        {/* Subtle grid of starlight particles */}
        <div className="absolute inset-0 bg-[radial-gradient(#fbbf24_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" />
      </div>

      {/* Runway Floor Shadow / Reflection Base */}
      <div className="absolute bottom-6 w-72 h-14 bg-gradient-to-t from-black/80 to-transparent rounded-full blur-xl pointer-events-none" />
      <div className="absolute bottom-12 w-48 h-6 bg-amber-400/10 rounded-full blur-md pointer-events-none" />

      {/* SVG Fashion Mannequin & Haute Couture Gown */}
      <svg
        viewBox="0 0 400 700"
        className="relative z-10 w-full h-full max-h-[700px] drop-shadow-[0_15px_35px_rgba(0,0,0,0.8)]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Gradients */}
          <linearGradient id="skinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={look.skinTone} />
            <stop offset="100%" stopColor="#c28b5e" />
          </linearGradient>

          <linearGradient id="gownPrimaryGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={look.primaryColor} />
            <stop offset="60%" stopColor={look.secondaryColor} />
            <stop offset="100%" stopColor={look.primaryColor} />
          </linearGradient>

          <linearGradient id="shimmerOverlay" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4" />
            <stop offset="35%" stopColor={look.accentColor} stopOpacity="0.15" />
            <stop offset="70%" stopColor="#000000" stopOpacity="0.3" />
            <stop offset="100%" stopColor={look.accentColor} stopOpacity="0.35" />
          </linearGradient>

          <linearGradient id="iridescentGrad" x1="0%" y1="0%" x2="100%" y2="80%">
            <stop offset="0%" stopColor={look.primaryColor} />
            <stop offset="35%" stopColor={look.accentColor} />
            <stop offset="70%" stopColor={look.secondaryColor} />
            <stop offset="100%" stopColor="#38bdf8" />
          </linearGradient>

          <linearGradient id="hairGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={look.hairColor} />
            <stop offset="100%" stopColor="#1e1b4b" stopOpacity="0.8" />
          </linearGradient>

          {/* Brocade pattern */}
          <pattern id="brocadeGrid" width="16" height="16" patternUnits="userSpaceOnUse">
            <path
              d="M 8,0 L 16,8 L 8,16 L 0,8 Z"
              fill="none"
              stroke={look.accentColor}
              strokeWidth="0.6"
              strokeOpacity="0.35"
            />
            <circle cx="8" cy="8" r="1.2" fill={look.accentColor} fillOpacity="0.4" />
          </pattern>

          {/* Stardust texture */}
          <pattern id="stardustPattern" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="4" cy="5" r="0.6" fill="#ffffff" fillOpacity="0.5" />
            <circle cx="14" cy="12" r="0.9" fill="#fef08a" fillOpacity="0.7" />
            <circle cx="18" cy="4" r="0.5" fill="#38bdf8" fillOpacity="0.6" />
          </pattern>

          {/* Glow filter */}
          <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* 1. BACK SLEEVES / CAPE (Layered behind model) */}
        {look.sleeves === 'cape_straps' && (
          <g opacity="0.85">
            <path
              d="M 160 215 C 100 280, 70 460, 60 620 C 130 635, 270 635, 340 620 C 330 460, 300 280, 240 215 Z"
              fill={look.fabric === 'aurora_mesh' ? 'url(#iridescentGrad)' : 'url(#gownPrimaryGrad)'}
              opacity="0.4"
            />
            <path
              d="M 160 215 C 100 280, 70 460, 60 620 C 130 635, 270 635, 340 620 C 330 460, 300 280, 240 215 Z"
              fill="url(#stardustPattern)"
            />
          </g>
        )}

        {look.sleeves === 'angel_wings' && (
          <g opacity="0.75">
            <path
              d="M 155 210 C 90 230, 45 320, 75 480 C 105 470, 130 430, 150 350 Z"
              fill={look.primaryColor}
              opacity="0.5"
            />
            <path
              d="M 245 210 C 310 230, 355 320, 325 480 C 295 470, 270 430, 250 350 Z"
              fill={look.primaryColor}
              opacity="0.5"
            />
          </g>
        )}

        {/* 2. MODEL BODY (Mannequin Silhouette) */}
        <g id="model-body">
          {/* Legs (Visible under high-slit or column) */}
          <path
            d="M 188 340 L 186 580 C 186 600, 189 620, 192 630 L 195 630 C 197 615, 198 580, 198 340 Z"
            fill="url(#skinGrad)"
          />
          <path
            d="M 202 340 L 202 580 C 202 615, 204 630, 207 630 L 210 630 C 213 620, 215 600, 214 340 Z"
            fill="url(#skinGrad)"
          />

          {/* Haute Couture Shoes */}
          <path d="M 188 625 L 194 635 L 190 642 L 186 642 Z" fill={look.accentColor} />
          <path d="M 205 625 L 211 635 L 215 642 L 211 642 Z" fill={look.accentColor} />

          {/* Torso & Ribcage */}
          <path
            d="M 175 185 C 165 215, 168 260, 182 285 C 183 295, 182 325, 180 345 L 220 345 C 218 325, 217 295, 218 285 C 232 260, 235 215, 225 185 Z"
            fill="url(#skinGrad)"
          />

          {/* Collarbone / Neck */}
          <path
            d="M 193 145 L 193 178 C 193 182, 182 188, 175 190 L 225 190 C 218 188, 207 182, 207 145 Z"
            fill="url(#skinGrad)"
          />
          {/* Subtle clavicle shadow */}
          <path
            d="M 182 188 Q 200 193 218 188"
            stroke="#b45309"
            strokeWidth="0.8"
            fill="none"
            opacity="0.3"
          />

          {/* Mannequin Head & Face Silhouette */}
          <ellipse cx="200" cy="120" rx="19" ry="26" fill="url(#skinGrad)" />
          {/* Delicate lips */}
          <path
            d="M 197 132 Q 200 135 203 132"
            stroke="#be185d"
            strokeWidth="1.2"
            strokeLinecap="round"
            fill="none"
          />

          {/* Arms */}
          {/* Left Arm */}
          <path
            d="M 168 190 C 150 230, 142 275, 146 330 C 147 340, 145 365, 147 375 L 152 375 C 151 360, 155 330, 157 280 C 160 250, 168 220, 175 198 Z"
            fill="url(#skinGrad)"
          />
          {/* Right Arm */}
          <path
            d="M 232 190 C 250 230, 258 275, 254 330 C 253 340, 255 365, 253 375 L 248 375 C 249 360, 245 330, 243 280 C 240 250, 232 220, 225 198 Z"
            fill="url(#skinGrad)"
          />
        </g>

        {/* 3. DRESS SKIRT & SILHOUETTE (Bottom Layer) */}
        <g id="dress-skirt">
          {/* BALLGOWN */}
          {look.silhouette === 'ballgown' && (
            <g>
              <path
                d="M 179 285 C 170 330, 90 440, 80 610 C 150 635, 250 635, 320 610 C 310 440, 230 330, 221 285 Z"
                fill={look.fabric === 'iridescent_taffeta' ? 'url(#iridescentGrad)' : 'url(#gownPrimaryGrad)'}
              />
              {/* Ballgown Fold Shadows */}
              <path
                d="M 185 288 C 175 360, 130 520, 125 618 C 145 625, 170 628, 195 628 C 190 520, 185 360, 188 288 Z"
                fill={look.secondaryColor}
                opacity="0.4"
              />
              <path
                d="M 215 288 C 225 360, 270 520, 275 618 C 255 625, 230 628, 205 628 C 210 520, 215 360, 212 288 Z"
                fill={look.secondaryColor}
                opacity="0.4"
              />
            </g>
          )}

          {/* MERMAID SIREN TRAIN */}
          {look.silhouette === 'mermaid_train' && (
            <g>
              <path
                d="M 180 285 C 178 330, 184 410, 172 470 C 155 520, 100 580, 85 625 C 150 638, 250 638, 315 625 C 300 580, 245 520, 228 470 C 216 410, 222 330, 220 285 Z"
                fill={look.fabric === 'iridescent_taffeta' ? 'url(#iridescentGrad)' : 'url(#gownPrimaryGrad)'}
              />
              {/* Mermaid Flounce folds */}
              <path
                d="M 172 470 C 140 530, 95 580, 88 625 C 120 632, 170 634, 200 634 C 185 570, 178 510, 172 470 Z"
                fill={look.secondaryColor}
                opacity="0.4"
              />
              <path
                d="M 228 470 C 260 530, 305 580, 312 625 C 280 632, 230 634, 200 634 C 215 570, 222 510, 228 470 Z"
                fill={look.secondaryColor}
                opacity="0.4"
              />
            </g>
          )}

          {/* ETHEREAL COLUMN */}
          {look.silhouette === 'ethereal_column' && (
            <g>
              <path
                d="M 180 285 C 178 330, 175 420, 172 620 C 190 626, 210 626, 228 620 C 225 420, 222 330, 220 285 Z"
                fill={look.fabric === 'iridescent_taffeta' ? 'url(#iridescentGrad)' : 'url(#gownPrimaryGrad)'}
              />
              {/* Vertical Fluted Pleat Highlights */}
              <path d="M 188 290 L 186 622" stroke={look.accentColor} strokeWidth="1" opacity="0.4" />
              <path d="M 197 290 L 198 623" stroke="#ffffff" strokeWidth="1" opacity="0.3" />
              <path d="M 205 290 L 204 623" stroke={look.accentColor} strokeWidth="1" opacity="0.4" />
              <path d="M 213 290 L 214 622" stroke={look.secondaryColor} strokeWidth="1.2" opacity="0.5" />
            </g>
          )}

          {/* SIREN SLIT (High Slit) */}
          {look.silhouette === 'siren_slit' && (
            <g>
              {/* Back / inner slit shadow */}
              <path
                d="M 180 285 C 178 330, 174 440, 170 620 C 185 625, 200 626, 202 626 L 200 370 C 190 350, 185 315, 180 285 Z"
                fill={look.secondaryColor}
                opacity="0.6"
              />
              {/* Cascading side sweep */}
              <path
                d="M 195 285 C 205 320, 220 370, 226 440 C 235 520, 265 590, 280 620 C 255 625, 225 625, 204 625 L 202 360 C 200 320, 198 300, 195 285 Z"
                fill={look.fabric === 'iridescent_taffeta' ? 'url(#iridescentGrad)' : 'url(#gownPrimaryGrad)'}
              />
            </g>
          )}

          {/* ARCHITECTURAL PEPLUM */}
          {look.silhouette === 'peplum_gown' && (
            <g>
              {/* Base straight pencil skirt */}
              <path
                d="M 180 285 L 176 615 C 192 622, 208 622, 224 615 L 220 285 Z"
                fill={look.fabric === 'iridescent_taffeta' ? 'url(#iridescentGrad)' : 'url(#gownPrimaryGrad)'}
              />
              {/* Flared Architectural Peplum Waist */}
              <path
                d="M 178 280 C 160 300, 150 335, 160 355 C 185 365, 215 365, 240 355 C 250 335, 240 300, 222 280 Z"
                fill={look.primaryColor}
                stroke={look.accentColor}
                strokeWidth="1"
              />
            </g>
          )}

          {/* AVANT-GARDE WAVE (Asymmetric) */}
          {look.silhouette === 'asymmetric_astral' && (
            <g>
              <path
                d="M 180 285 C 168 340, 150 430, 140 520 C 160 550, 210 590, 260 625 C 265 530, 245 420, 225 330 L 220 285 Z"
                fill={look.fabric === 'aurora_mesh' ? 'url(#iridescentGrad)' : 'url(#gownPrimaryGrad)'}
              />
              <path
                d="M 180 285 Q 220 380 150 510 C 190 530, 230 500, 255 460 Q 225 360 220 285 Z"
                fill={look.accentColor}
                opacity="0.3"
              />
            </g>
          )}

          {/* TIERED TULLE */}
          {look.silhouette === 'tiered_tulle' && (
            <g>
              {/* Tier 1 */}
              <path
                d="M 180 285 C 170 330, 155 375, 150 395 C 180 405, 220 405, 250 395 C 245 375, 230 330, 220 285 Z"
                fill={look.primaryColor}
                opacity="0.85"
              />
              {/* Tier 2 */}
              <path
                d="M 160 385 C 145 435, 130 490, 125 510 C 170 525, 230 525, 275 510 C 270 490, 255 435, 240 385 Z"
                fill={look.secondaryColor}
                opacity="0.85"
              />
              {/* Tier 3 */}
              <path
                d="M 135 500 C 115 550, 95 595, 90 620 C 150 635, 250 635, 310 620 C 305 595, 285 550, 265 500 Z"
                fill={look.primaryColor}
                opacity="0.9"
              />
            </g>
          )}

          {/* Texture Overlays on Skirt */}
          {look.fabric === 'constellation_brocade' && (
            <rect x="70" y="285" width="260" height="345" fill="url(#brocadeGrid)" />
          )}

          {look.fabric === 'starlight_organza' && (
            <rect x="70" y="285" width="260" height="345" fill="url(#stardustPattern)" opacity="0.6" />
          )}

          {/* Shimmer Highlight Wave */}
          <path
            d="M 180 285 Q 200 450 185 625 Q 215 625 210 450 Q 205 320 220 285 Z"
            fill="url(#shimmerOverlay)"
            opacity={look.sparkleIntensity / 100}
          />
        </g>

        {/* 4. DRESS BODICE / CORSET (Top Layer) */}
        <g id="dress-bodice">
          {/* SWEETHEART CORSET */}
          {look.bodice === 'sweetheart' && (
            <g>
              <path
                d="M 175 220 C 180 210, 195 210, 200 220 C 205 210, 220 210, 225 220 C 224 250, 218 280, 216 288 L 184 288 C 182 280, 176 250, 175 220 Z"
                fill={look.fabric === 'iridescent_taffeta' ? 'url(#iridescentGrad)' : 'url(#gownPrimaryGrad)'}
                stroke={look.accentColor}
                strokeWidth="0.8"
              />
              {/* Corset Boning lines */}
              <path d="M 192 216 L 194 288" stroke={look.accentColor} strokeWidth="0.6" opacity="0.5" />
              <path d="M 208 216 L 206 288" stroke={look.accentColor} strokeWidth="0.6" opacity="0.5" />
            </g>
          )}

          {/* PLUNGING V-NECK */}
          {look.bodice === 'plunging_v' && (
            <g>
              <path
                d="M 170 195 L 182 210 L 200 255 L 218 210 L 230 195 C 226 240, 218 275, 216 288 L 184 288 C 182 275, 174 240, 170 195 Z"
                fill={look.fabric === 'iridescent_taffeta' ? 'url(#iridescentGrad)' : 'url(#gownPrimaryGrad)'}
                stroke={look.accentColor}
                strokeWidth="0.8"
              />
              {/* Deep plunge border */}
              <path
                d="M 182 210 L 200 255 L 218 210"
                stroke={look.accentColor}
                strokeWidth="1.2"
                fill="none"
              />
            </g>
          )}

          {/* OFF-SHOULDER BARDOT */}
          {look.bodice === 'off_shoulder' && (
            <g>
              {/* Dropped shoulder drape band */}
              <path
                d="M 152 212 C 180 220, 220 220, 248 212 C 248 225, 225 235, 200 235 C 175 235, 152 225, 152 212 Z"
                fill={look.primaryColor}
                stroke={look.accentColor}
                strokeWidth="0.8"
              />
              {/* Main bodice */}
              <path
                d="M 174 225 C 180 230, 220 230, 226 225 C 224 250, 218 278, 216 288 L 184 288 C 182 278, 176 250, 174 225 Z"
                fill={look.fabric === 'iridescent_taffeta' ? 'url(#iridescentGrad)' : 'url(#gownPrimaryGrad)'}
              />
            </g>
          )}

          {/* HIGH ROYAL COLLAR */}
          {look.bodice === 'high_neck' && (
            <g>
              <path
                d="M 191 160 L 191 180 L 175 195 C 172 235, 180 270, 184 288 L 216 288 C 220 270, 228 235, 225 195 L 209 180 L 209 160 Z"
                fill={look.fabric === 'iridescent_taffeta' ? 'url(#iridescentGrad)' : 'url(#gownPrimaryGrad)'}
                stroke={look.accentColor}
                strokeWidth="0.8"
              />
              <path d="M 191 170 L 209 170" stroke={look.accentColor} strokeWidth="1" />
            </g>
          )}

          {/* ONE-SHOULDER ASYMMETRIC */}
          {look.bodice === 'one_shoulder' && (
            <g>
              <path
                d="M 172 195 L 182 210 L 225 235 C 222 260, 218 278, 216 288 L 184 288 C 180 260, 175 225, 172 195 Z"
                fill={look.fabric === 'iridescent_taffeta' ? 'url(#iridescentGrad)' : 'url(#gownPrimaryGrad)'}
                stroke={look.accentColor}
                strokeWidth="0.8"
              />
              {/* Diagonal sash wrap */}
              <path
                d="M 172 195 Q 200 240 220 286"
                stroke={look.accentColor}
                strokeWidth="1.5"
                fill="none"
              />
            </g>
          )}

          {/* SHEER NEBULA ILLUSION */}
          {look.bodice === 'sheer_illusion' && (
            <g>
              {/* Sheer upper layer */}
              <path
                d="M 175 190 L 225 190 C 228 230, 220 270, 216 288 L 184 288 C 180 270, 172 230, 175 190 Z"
                fill={look.primaryColor}
                opacity="0.3"
              />
              {/* Inner bra/cups */}
              <path
                d="M 178 235 C 185 220, 195 220, 198 245 C 195 260, 185 265, 178 250 Z"
                fill={look.primaryColor}
              />
              <path
                d="M 222 235 C 215 220, 205 220, 202 245 C 205 260, 215 265, 222 250 Z"
                fill={look.primaryColor}
              />
            </g>
          )}
        </g>

        {/* 5. FRONT SLEEVES */}
        {look.sleeves === 'bishop_puff' && (
          <g>
            <ellipse cx="156" cy="235" rx="15" ry="24" fill={look.primaryColor} stroke={look.accentColor} strokeWidth="0.8" />
            <ellipse cx="244" cy="235" rx="15" ry="24" fill={look.primaryColor} stroke={look.accentColor} strokeWidth="0.8" />
          </g>
        )}

        {look.sleeves === 'fitted_astral' && (
          <g>
            <path
              d="M 166 195 L 148 340 L 153 340 L 172 215 Z"
              fill={look.primaryColor}
              stroke={look.accentColor}
              strokeWidth="0.6"
            />
            <path
              d="M 234 195 L 252 340 L 247 340 L 228 215 Z"
              fill={look.primaryColor}
              stroke={look.accentColor}
              strokeWidth="0.6"
            />
          </g>
        )}

        {/* 6. ZODIAC CONSTELLATION EMBROIDERY (Authentic astronomical star map on skirt) */}
        {look.hasConstellationEmbroidery && currentZodiac.constellation && (
          <g id="constellation-embroidery" transform="translate(140, 340) scale(1.2)" filter="url(#goldGlow)">
            {/* Constellation Connecting Lines */}
            {currentZodiac.constellation.lines.map(([idxA, idxB], i) => {
              const starA = currentZodiac.constellation.stars[idxA];
              const starB = currentZodiac.constellation.stars[idxB];
              if (!starA || !starB) return null;
              return (
                <line
                  key={`line-${i}`}
                  x1={starA.x}
                  y1={starA.y}
                  x2={starB.x}
                  y2={starB.y}
                  stroke={embColors.stroke}
                  strokeWidth="1.2"
                  strokeDasharray="2,2"
                  opacity="0.85"
                />
              );
            })}

            {/* Constellation Star Bursts */}
            {currentZodiac.constellation.stars.map((star, i) => (
              <g key={`star-${i}`} transform={`translate(${star.x}, ${star.y})`}>
                {/* 4-point Diamond Starburst */}
                <path
                  d="M 0 -5 L 1.2 -1.2 L 5 0 L 1.2 1.2 L 0 5 L -1.2 1.2 L -5 0 L -1.2 -1.2 Z"
                  fill={embColors.dot}
                />
                <circle cx="0" cy="0" r={star.r ? star.r * 0.7 : 1.5} fill={embColors.dot} />
                <circle cx="0" cy="0" r={star.r ? star.r * 1.5 : 3.5} fill={embColors.glow} opacity="0.35" />
              </g>
            ))}
          </g>
        )}

        {/* 7. WAISTBAND & ZODIAC GLYPH BROOCH */}
        {look.showBeltGlyph && (
          <g id="waistband-ornament">
            {/* Elegant metal belt */}
            <path
              d="M 183 285 Q 200 290 217 285"
              stroke={look.accentColor}
              strokeWidth="2.5"
              fill="none"
            />
            {/* Celestial Medallion */}
            <circle cx="200" cy="288" r="9" fill="#0f172a" stroke={look.accentColor} strokeWidth="1.5" />
            <text
              x="200"
              y="292"
              textAnchor="middle"
              fill={look.accentColor}
              fontSize="11"
              fontWeight="bold"
              fontFamily="Cinzel, serif"
            >
              {currentZodiac.symbol}
            </text>
          </g>
        )}

        {/* 8. STARDUST HEMLINE (Sparkles & Celestial dust at bottom) */}
        {look.showStardustHem && (
          <g id="stardust-hem" opacity={look.sparkleIntensity / 100}>
            {[80, 110, 140, 170, 200, 230, 260, 290, 320].map((x, i) => {
              const y = 618 + Math.sin(i * 1.5) * 8;
              return (
                <g key={`hem-sparkle-${i}`} transform={`translate(${x}, ${y})`}>
                  <path
                    d="M 0 -4 L 1 -1 L 4 0 L 1 1 L 0 4 L -1 1 L -4 0 L -1 -1 Z"
                    fill={look.accentColor}
                  />
                  <circle cx="0" cy="0" r="1.5" fill="#ffffff" />
                </g>
              );
            })}
          </g>
        )}

        {/* 9. MODEL HAIR */}
        <g id="model-hair">
          {look.hairStyle === 'starlight_waves' && (
            <g>
              {/* Back hair waves */}
              <path
                d="M 184 110 C 160 140, 155 200, 158 260 C 170 240, 175 190, 180 150 Z"
                fill="url(#hairGrad)"
              />
              <path
                d="M 216 110 C 240 140, 245 200, 242 260 C 230 240, 225 190, 220 150 Z"
                fill="url(#hairGrad)"
              />
              {/* Crown waves */}
              <path
                d="M 180 115 C 180 85, 220 85, 220 115 C 215 100, 185 100, 180 115 Z"
                fill="url(#hairGrad)"
              />
            </g>
          )}

          {look.hairStyle === 'high_celestial_bun' && (
            <g>
              {/* Top royal bun */}
              <ellipse cx="200" cy="85" rx="16" ry="14" fill="url(#hairGrad)" />
              <circle cx="200" cy="85" r="10" fill="none" stroke={look.accentColor} strokeWidth="1" />
              {/* Sleek pulled back crown */}
              <path
                d="M 182 115 C 182 95, 218 95, 218 115 C 210 105, 190 105, 182 115 Z"
                fill="url(#hairGrad)"
              />
            </g>
          )}

          {look.hairStyle === 'cosmic_bob' && (
            <path
              d="M 180 115 C 175 135, 172 165, 182 180 C 185 170, 183 140, 185 125 C 190 100, 210 100, 215 125 C 217 140, 215 170, 218 180 C 228 165, 225 135, 220 115 Z"
              fill="url(#hairGrad)"
            />
          )}

          {look.hairStyle === 'braided_crown' && (
            <g>
              <ellipse cx="200" cy="98" rx="18" ry="8" fill="none" stroke="url(#hairGrad)" strokeWidth="6" />
              <path
                d="M 181 115 C 181 95, 219 95, 219 115 C 215 105, 185 105, 181 115 Z"
                fill="url(#hairGrad)"
              />
            </g>
          )}
        </g>

        {/* 10. CELESTIAL HEADPIECES & CROWNS */}
        {look.headpiece !== 'none' && (
          <g id="headpiece" filter="url(#goldGlow)">
            {/* SOLAR HALO (Leo / Aries) */}
            {look.headpiece === 'solar_halo' && (
              <g transform="translate(200, 100)">
                {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
                  <line
                    key={deg}
                    x1={Math.cos((deg * Math.PI) / 180) * 26}
                    y1={Math.sin((deg * Math.PI) / 180) * 26}
                    x2={Math.cos((deg * Math.PI) / 180) * 38}
                    y2={Math.sin((deg * Math.PI) / 180) * 38}
                    stroke="#fbbf24"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                ))}
                <circle cx="0" cy="0" r="26" fill="none" stroke="#f59e0b" strokeWidth="1.5" />
              </g>
            )}

            {/* RAM HORNS TIARA (Aries) */}
            {look.headpiece === 'ram_horns_tiara' && (
              <g transform="translate(200, 95)">
                {/* Left golden horn curve */}
                <path
                  d="M -10 5 C -25 -5, -35 15, -28 25 C -22 28, -20 18, -25 12 C -28 5, -20 0, -10 5 Z"
                  fill="#f59e0b"
                  stroke="#fbbf24"
                  strokeWidth="0.8"
                />
                {/* Right golden horn curve */}
                <path
                  d="M 10 5 C 25 -5, 35 15, 28 25 C 22 28, 20 18, 25 12 C 28 5, 20 0, 10 5 Z"
                  fill="#f59e0b"
                  stroke="#fbbf24"
                  strokeWidth="0.8"
                />
                {/* Forehead ruby gem */}
                <circle cx="0" cy="8" r="3" fill="#dc2626" stroke="#fbbf24" strokeWidth="1" />
              </g>
            )}

            {/* VENUS ROSE LAUREL (Taurus / Libra) */}
            {look.headpiece === 'venus_rose_laurel' && (
              <g transform="translate(200, 98)">
                <path
                  d="M -22 5 Q 0 -5 22 5"
                  stroke="#10b981"
                  strokeWidth="2"
                  fill="none"
                />
                <circle cx="-14" cy="2" r="3" fill="#fb7185" />
                <circle cx="0" cy="-3" r="3.5" fill="#f43f5e" />
                <circle cx="14" cy="2" r="3" fill="#fb7185" />
              </g>
            )}

            {/* PEARL MOON CIRCLET (Cancer) */}
            {look.headpiece === 'pearl_moon_circlet' && (
              <g transform="translate(200, 95)">
                <path
                  d="M -8 10 C -12 2, -2 -6, 0 -6 C 2 -6, 12 2, 8 10"
                  stroke="#cbd5e1"
                  strokeWidth="1.5"
                  fill="none"
                />
                {/* Crescent Moon */}
                <path
                  d="M 0 0 C 4 0, 6 6, 4 10 C 2 7, 0 6, -2 6 C 0 3, 0 0, 0 0 Z"
                  fill="#ffffff"
                />
                <circle cx="0" cy="14" r="2.5" fill="#ffffff" />
              </g>
            )}

            {/* MAIDEN STAR LAUREL (Virgo) */}
            {look.headpiece === 'maiden_star_laurel' && (
              <g transform="translate(200, 96)">
                <path d="M -20 8 Q 0 -2 20 8" stroke="#cbd5e1" strokeWidth="1.2" fill="none" />
                <path d="M 0 -2 L 0 -10" stroke="#fef08a" strokeWidth="1.5" />
                <circle cx="0" cy="-11" r="2" fill="#ffffff" />
              </g>
            )}

            {/* SCORPION STING CREST (Scorpio) */}
            {look.headpiece === 'scorpion_sting_crest' && (
              <g transform="translate(200, 95)">
                <path
                  d="M -16 6 L -6 -6 L 0 -12 L 6 -6 L 16 6 Z"
                  fill="#09090b"
                  stroke="#dc2626"
                  strokeWidth="1.2"
                />
                <circle cx="0" cy="-2" r="2.5" fill="#dc2626" />
              </g>
            )}

            {/* CENTAUR ARCHER CROWN (Sagittarius) */}
            {look.headpiece === 'centaur_archer_crown' && (
              <g transform="translate(200, 95)">
                <path d="M -18 6 L -10 -8 L 0 -16 L 10 -8 L 18 6" stroke="#fbbf24" strokeWidth="1.5" fill="none" />
                <circle cx="0" cy="-16" r="2.5" fill="#7c3aed" />
              </g>
            )}

            {/* SATURN RING CORONET (Capricorn) */}
            {look.headpiece === 'saturn_ring_coronet' && (
              <g transform="translate(200, 95)">
                <ellipse cx="0" cy="0" rx="26" ry="6" fill="none" stroke="#d97706" strokeWidth="1.5" />
                <circle cx="0" cy="6" r="3" fill="#1e293b" stroke="#d97706" strokeWidth="1" />
              </g>
            )}

            {/* URANUS WAVE DIADEM (Aquarius) */}
            {look.headpiece === 'uranus_wave_diadem' && (
              <g transform="translate(200, 95)">
                <path
                  d="M -18 4 L -12 -4 L -6 4 L 0 -4 L 6 4 L 12 -4 L 18 4"
                  stroke="#38bdf8"
                  strokeWidth="1.8"
                  fill="none"
                />
              </g>
            )}

            {/* PISCES KOI CIRCLET (Pisces) */}
            {look.headpiece === 'pisces_koi_circlet' && (
              <g transform="translate(200, 96)">
                <path d="M -15 2 C -5 -6, 5 -6, 15 2" stroke="#5eead4" strokeWidth="1.5" fill="none" />
                <circle cx="-12" cy="0" r="2" fill="#0d9488" />
                <circle cx="12" cy="0" r="2" fill="#0d9488" />
                <circle cx="0" cy="-7" r="2.5" fill="#5eead4" />
              </g>
            )}
          </g>
        )}
      </svg>

      {/* Floating Card Footer Info (Clean unboxed metadata) */}
      <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-slate-400 bg-slate-900/60 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/5">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-amber-300 font-cinzel">
            {currentZodiac.symbol} {currentZodiac.name}
          </span>
          <span aria-hidden="true">·</span>
          <span>{currentZodiac.element}</span>
          <span aria-hidden="true">·</span>
          <span className="text-slate-300">{currentZodiac.rulingPlanet}</span>
        </div>
        <div className="text-right text-[11px] text-amber-200/80 font-mono">
          Haute Couture 2026
        </div>
      </div>
    </div>
  );
};
