import React, { useState } from 'react';
import { Volume2, VolumeX, Monitor, Menu, X, Play } from 'lucide-react';
import { PixelRedBird } from './PixelSprites';
import { sounds } from '../utils/audio';

interface NavbarProps {
  crtActive: boolean;
  onToggleCrt: () => void;
  soundMuted: boolean;
  onToggleSound: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  crtActive,
  onToggleCrt,
  soundMuted,
  onToggleSound,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (href: string) => {
    sounds.playBlip(520, 0.05);
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navLinks = [
    { label: 'HERO', href: '#hero' },
    { label: 'LORE', href: '#lore' },
    { label: 'GAMES', href: '#games' },
    { label: 'THE FLOCK', href: '#flock' },
    { label: 'MINI-GAME', href: '#minigame', highlight: true },
    { label: 'COMMUNITY', href: '#community' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#160c08]/95 border-b-4 border-black backdrop-blur-md px-4 py-3 shadow-[0_6px_0_#000]">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Brand Logo */}
        <a 
          href="#hero" 
          onClick={(e) => { e.preventDefault(); handleNavClick('#hero'); }}
          className="flex items-center gap-3 group text-decoration-none"
        >
          <div className="relative p-1 bg-[#2a1309] border-2 border-black group-hover:scale-105 transition-transform">
            <PixelRedBird size={36} />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#22c55e] border border-black animate-ping" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#22c55e] border border-black" />
          </div>
          <div>
            <div className="font-arcade text-sm md:text-base text-[#fff7ed] tracking-wider flex items-center gap-1.5">
              <span>ANGRY</span>
              <span className="text-[#e63946]">BIRDS</span>
            </div>
            <div className="font-mono-pixel text-xs text-[#f59e0b] tracking-widest flex items-center gap-1">
              <span>16-BIT ARCADE</span>
              <span className="text-[#22c55e] animate-pulse">● LIVE</span>
            </div>
          </div>
        </a>

        {/* Desktop Nav Items */}
        <div className="hidden lg:flex items-center gap-2 xl:gap-3">
          {navLinks.map((item) => (
            <button
              key={item.label}
              onClick={() => handleNavClick(item.href)}
              className={`font-arcade text-[10px] xl:text-[11px] px-3 py-2 border-2 border-transparent transition-all uppercase ${
                item.highlight
                  ? 'bg-[#e63946] text-white border-black shadow-[2px_2px_0_#000] hover:bg-[#ff4b5c] hover:-translate-y-0.5'
                  : 'text-[#d6c7b2] hover:text-[#ffd166] hover:border-black hover:bg-[#27150c] hover:shadow-[2px_2px_0_#000]'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Control Badges & CTA */}
        <div className="hidden md:flex items-center gap-2">
          {/* CRT Toggle */}
          <button
            onClick={() => {
              sounds.playBlip(480, 0.05);
              onToggleCrt();
            }}
            title={crtActive ? "Disable CRT Scanlines" : "Enable CRT Scanlines"}
            className={`pixel-btn px-2.5 py-1.5 text-[9px] border-2 border-black flex items-center gap-1.5 transition-all ${
              crtActive
                ? 'bg-[#22c55e] text-black font-bold shadow-[2px_2px_0_#000]'
                : 'bg-[#27150c] text-[#d6c7b2] hover:text-white shadow-[2px_2px_0_#000]'
            }`}
          >
            <Monitor size={14} />
            <span>CRT {crtActive ? 'ON' : 'OFF'}</span>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={() => {
              onToggleSound();
            }}
            title={soundMuted ? "Unmute 8-Bit Audio" : "Mute 8-Bit Audio"}
            className={`pixel-btn px-2.5 py-1.5 text-[9px] border-2 border-black flex items-center gap-1.5 transition-all ${
              !soundMuted
                ? 'bg-[#f59e0b] text-black font-bold shadow-[2px_2px_0_#000]'
                : 'bg-[#27150c] text-[#78716c] hover:text-white shadow-[2px_2px_0_#000]'
            }`}
          >
            {soundMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
            <span>{soundMuted ? 'MUTED' : 'AUDIO'}</span>
          </button>

          {/* Play Now Mini-Game CTA */}
          <button
            onClick={() => handleNavClick('#minigame')}
            className="pixel-btn pixel-btn-red text-[10px] py-2 px-3"
          >
            <Play size={13} className="fill-white" />
            <span>PLAY NOW</span>
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={onToggleSound}
            className="p-2 border-2 border-black bg-[#27150c] text-[#f59e0b]"
            aria-label="Toggle Sound"
          >
            {soundMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>
          
          <button
            onClick={() => {
              sounds.playBlip(400, 0.05);
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="p-2 border-2 border-black bg-[#e63946] text-white shadow-[2px_2px_0_#000]"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 pt-3 border-t-2 border-black bg-[#1f100a] p-4 flex flex-col gap-3 shadow-[0_8px_0_#000]">
          {navLinks.map((item) => (
            <button
              key={item.label}
              onClick={() => handleNavClick(item.href)}
              className={`font-arcade text-xs text-left px-3 py-2.5 border-2 border-black uppercase ${
                item.highlight
                  ? 'bg-[#e63946] text-white shadow-[3px_3px_0_#000]'
                  : 'bg-[#2d180e] text-[#ffd166]'
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="flex items-center gap-2 pt-2 border-t border-black/60">
            <button
              onClick={onToggleCrt}
              className={`flex-1 py-2 text-[10px] font-arcade border-2 border-black ${
                crtActive ? 'bg-[#22c55e] text-black font-bold' : 'bg-[#27150c] text-[#d6c7b2]'
              }`}
            >
              CRT {crtActive ? 'ENABLED' : 'DISABLED'}
            </button>
            <button
              onClick={() => handleNavClick('#minigame')}
              className="flex-1 py-2 text-[10px] font-arcade border-2 border-black bg-[#f59e0b] text-black font-bold"
            >
              LAUNCH GAME
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
