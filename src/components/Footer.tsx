import React from 'react';
import { ArrowUp } from 'lucide-react';
import { PixelRedBird, PixelSlingshot, PixelGoldenEgg } from './PixelSprites';
import { sounds } from '../utils/audio';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    sounds.playSlingshotRelease();
    sounds.playBirdCry('red');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLinkClick = (href: string) => {
    sounds.playBlip(500, 0.05);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#120804] border-t-4 border-black pt-16 pb-12 px-4 md:px-8 text-[#d6c7b2] relative overflow-hidden">
      
      {/* Catapult To Top Launcher */}
      <div className="max-w-7xl mx-auto flex justify-center mb-12">
        <button
          onClick={scrollToTop}
          className="pixel-btn pixel-btn-red text-xs py-3 px-6 group flex items-center gap-2"
        >
          <ArrowUp size={16} className="group-hover:-translate-y-1 transition-transform" />
          <span>CATAPULT TO TOP OF ISLAND</span>
          <PixelRedBird size={20} />
        </button>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12 pb-12 border-b-2 border-black/60">
        
        {/* Brand Column */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-1 bg-[#231208] border-2 border-black">
              <PixelRedBird size={36} />
            </div>
            <div>
              <div className="font-arcade text-base text-[#fff7ed] tracking-wider">
                ANGRY <span className="text-[#e63946]">BIRDS</span>
              </div>
              <div className="font-mono-pixel text-xs text-[#ffd166]">
                16-BIT RETRO PIXEL EDITION
              </div>
            </div>
          </div>

          <p className="font-sans-pixel text-sm text-[#a8a29e] max-w-sm leading-relaxed">
            The premier pixel art tribute to the greatest physics slingshot arcade series. Handcrafted with authentic chiptune frequencies, physics calculations, and unwavering flock fury.
          </p>

          <div className="flex items-center gap-3 font-mono-pixel text-xs text-[#ffd166]">
            <span className="w-2.5 h-2.5 bg-[#22c55e] border border-black inline-block animate-pulse"></span>
            <span>SLINGSHOT CALIBRATION: OPTIMAL (99.8%)</span>
          </div>
        </div>

        {/* Column 1: Arcade & Games */}
        <div>
          <div className="font-arcade text-xs text-[#ffd166] mb-4 flex items-center gap-1.5">
            <PixelSlingshot size={18} />
            <span>ARCADE</span>
          </div>
          <ul className="space-y-2.5 font-sans-pixel text-sm">
            <li>
              <button 
                onClick={() => handleLinkClick('#minigame')} 
                className="hover:text-[#ffd166] transition-colors text-left"
              >
                Slingshot Mini-Game
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleLinkClick('#games')} 
                className="hover:text-[#ffd166] transition-colors text-left"
              >
                1986 Arcade Edition
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleLinkClick('#games')} 
                className="hover:text-[#ffd166] transition-colors text-left"
              >
                Bad Piggies Workshop
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleLinkClick('#games')} 
                className="hover:text-[#ffd166] transition-colors text-left"
              >
                Citadel Siege Raid
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleLinkClick('#games')} 
                className="hover:text-[#ffd166] transition-colors text-left"
              >
                Desert Badlands
              </button>
            </li>
          </ul>
        </div>

        {/* Column 2: The Flock */}
        <div>
          <div className="font-arcade text-xs text-[#e63946] mb-4 flex items-center gap-1.5">
            <PixelRedBird size={18} />
            <span>THE FLOCK</span>
          </div>
          <ul className="space-y-2.5 font-sans-pixel text-sm">
            <li>
              <button 
                onClick={() => handleLinkClick('#flock')} 
                className="hover:text-[#ffd166] transition-colors text-left"
              >
                Red (Shockwave)
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleLinkClick('#flock')} 
                className="hover:text-[#ffd166] transition-colors text-left"
              >
                Chuck (Mach Dash)
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleLinkClick('#flock')} 
                className="hover:text-[#ffd166] transition-colors text-left"
              >
                Bomb (Thermal Kaboom)
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleLinkClick('#flock')} 
                className="hover:text-[#ffd166] transition-colors text-left"
              >
                Matilda (Egg Bomber)
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleLinkClick('#flock')} 
                className="hover:text-[#ffd166] transition-colors text-left"
              >
                Terence, Hal & Bubbles
              </button>
            </li>
          </ul>
        </div>

        {/* Column 3: Lore & Community */}
        <div>
          <div className="font-arcade text-xs text-[#22c55e] mb-4 flex items-center gap-1.5">
            <PixelGoldenEgg size={16} />
            <span>COMMUNITY</span>
          </div>
          <ul className="space-y-2.5 font-sans-pixel text-sm">
            <li>
              <button 
                onClick={() => handleLinkClick('#lore')} 
                className="hover:text-[#ffd166] transition-colors text-left"
              >
                The 4-Act Egg Saga
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleLinkClick('#lore')} 
                className="hover:text-[#ffd166] transition-colors text-left"
              >
                Bad Piggies Dossier
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleLinkClick('#community')} 
                className="hover:text-[#ffd166] transition-colors text-left"
              >
                VIP Feather Pass
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleLinkClick('#community')} 
                className="hover:text-[#ffd166] transition-colors text-left"
              >
                Arcade Hall of Fame
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleLinkClick('#community')} 
                className="hover:text-[#ffd166] transition-colors text-left"
              >
                Chiptune Audio Codex
              </button>
            </li>
          </ul>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 font-mono-pixel text-xs text-[#a8a29e]">
        <div>
          © 1986–2026 ANGRY BIRDS PIXEL ARCADE EDITION. ALL EGGS RESERVED.
        </div>
        <div className="flex items-center gap-4">
          <span>NO TRACKERS</span>
          <span>•</span>
          <span>NO BLUE OR PURPLE</span>
          <span>•</span>
          <span>100% 16-BIT NOSTALGIA</span>
        </div>
      </div>

    </footer>
  );
};
