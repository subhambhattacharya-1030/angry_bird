import React, { useState } from 'react';
import { Play, Sparkles, Target, Zap, RotateCcw } from 'lucide-react';
import { PixelRedBird, PixelPig, PixelTNTBox, PixelGoldenEgg } from './PixelSprites';
import { sounds } from '../utils/audio';

export const Hero: React.FC = () => {
  const [birdLaunched, setBirdLaunched] = useState(false);
  const [pigPopped, setPigPopped] = useState(false);
  const [scoreEffect, setScoreEffect] = useState<number | null>(null);

  const handleLaunchRed = () => {
    if (birdLaunched) return;
    setBirdLaunched(true);
    setPigPopped(false);
    sounds.playSlingshotPull(0.8);

    setTimeout(() => {
      sounds.playSlingshotRelease();
      sounds.playBirdCry('red');
    }, 200);

    // Hit pig after flight duration
    setTimeout(() => {
      sounds.playHit('wood');
      sounds.playPigPop();
      setPigPopped(true);
      setScoreEffect(5000);
      sounds.playBlip(880, 0.1);
    }, 900);
  };

  const resetLauncher = () => {
    sounds.playBlip(350, 0.05);
    setBirdLaunched(false);
    setPigPopped(false);
    setScoreEffect(null);
  };

  const scrollToMinigame = () => {
    sounds.playBlip(600, 0.08);
    const el = document.getElementById('minigame');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToFlock = () => {
    sounds.playBlip(500, 0.08);
    const el = document.getElementById('flock');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative pt-24 pb-16 px-4 md:px-8 max-w-7xl mx-auto overflow-hidden">
      
      {/* Decorative Pixel Stars / Sparks */}
      <div className="absolute top-16 left-6 text-[#ffd166] animate-pulse text-xs font-arcade select-none">★ 1986 ARCADE ★</div>
      <div className="absolute top-20 right-8 text-[#ea580c] animate-pulse text-xs font-arcade select-none">HOT FLING! 🔥</div>

      <div className="text-center max-w-3xl mx-auto mb-8">
        
        {/* Retro Header Tagline */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#2b160b] border-2 border-black shadow-[3px_3px_0_#000] mb-4">
          <Zap size={14} className="text-[#ffd166] fill-[#ffd166]" />
          <span className="font-arcade text-[10px] md:text-xs text-[#ffd166] tracking-wider">
            OFFICIAL 16-BIT PIXEL TRIBUTE
          </span>
          <Zap size={14} className="text-[#ffd166] fill-[#ffd166]" />
        </div>

        {/* Big Impact Title */}
        <h1 className="font-arcade text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-[#fff7ed] leading-tight mb-4 drop-shadow-[0_4px_0_#000]">
          FLING INTO <br />
          <span className="text-[#e63946] inline-block hover:scale-105 transition-transform">RETRO</span>{' '}
          <span className="text-[#ffd166]">PIXEL</span>{' '}
          <span className="text-[#22c55e]">CHAOS!</span>
        </h1>

        <p className="font-sans-pixel text-lg md:text-xl text-[#d6c7b2] max-w-2xl mx-auto leading-relaxed mb-6">
          King Pig has snatched the Golden Eggs once more! Lock your slingshot, unleash the flock’s legendary elemental abilities, and demolish fortified pig fortresses in authentic 16-bit glory.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
          <button
            onClick={scrollToMinigame}
            className="pixel-btn pixel-btn-red text-xs md:text-sm py-3.5 px-6 group"
          >
            <Play size={18} className="fill-white group-hover:scale-110 transition-transform" />
            <span>PLAY MINI-GAME</span>
          </button>

          <button
            onClick={scrollToFlock}
            className="pixel-btn pixel-btn-gold text-xs md:text-sm py-3.5 px-6"
          >
            <Sparkles size={18} />
            <span>MEET THE FLOCK</span>
          </button>
        </div>
      </div>

      {/* Main Pixel Hero Scene Canvas / Frame */}
      <div className="pixel-border-red rounded-none overflow-hidden max-w-5xl mx-auto bg-[#170c07] mb-10 shadow-[8px_8px_0_#000]">
        
        {/* Retro Header Bar */}
        <div className="bg-[#2a1309] border-b-4 border-black px-4 py-2 flex items-center justify-between font-arcade text-[10px] md:text-xs">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-[#e63946] border border-black inline-block"></span>
            <span className="w-3 h-3 bg-[#ffd166] border border-black inline-block"></span>
            <span className="w-3 h-3 bg-[#22c55e] border border-black inline-block"></span>
            <span className="text-[#fff7ed] ml-2">WORLD 1-1 // PIGGY BADLANDS</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[#f59e0b]">SCORE: 994,200</span>
            <span className="text-[#22c55e]">HIGH: 1,500,000</span>
          </div>
        </div>

        {/* Interactive Hero Visual Showcase */}
        <div className="relative aspect-video max-h-[500px] w-full overflow-hidden bg-black">
          <img
            src="/assets/hero-pixel.jpg"
            alt="Angry Birds 16-Bit Pixel Art Slingshot Action"
            className="w-full h-full object-cover select-none pointer-events-none"
          />

          {/* Interactive Quick-Fling Overlay Element */}
          <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-4 md:p-6">
            
            {/* Top Info overlay */}
            <div className="flex justify-between items-start">
              <div className="bg-[#1c0e07]/90 border-2 border-black p-2 font-mono-pixel text-xs text-[#ffd166]">
                <div>WIND: 0.0 m/s</div>
                <div>GRAVITY: 9.8 m/s²</div>
              </div>

              {/* Quick Launch Control */}
              <div className="pointer-events-auto">
                {!birdLaunched ? (
                  <button
                    onClick={handleLaunchRed}
                    className="pixel-btn pixel-btn-red text-[10px] md:text-xs py-2 px-3 animate-bounce shadow-[3px_3px_0_#000]"
                  >
                    <Target size={14} />
                    <span>TEST SLINGSHOT!</span>
                  </button>
                ) : (
                  <button
                    onClick={resetLauncher}
                    className="pixel-btn pixel-btn-wood text-[10px] md:text-xs py-2 px-3"
                  >
                    <RotateCcw size={14} />
                    <span>RELOAD BIRD</span>
                  </button>
                )}
              </div>
            </div>

            {/* Simulated In-Screen Bird Flight Animation */}
            {birdLaunched && (
              <div 
                className="absolute z-30 transition-all duration-700 ease-out"
                style={{
                  left: pigPopped ? '72%' : '20%',
                  bottom: pigPopped ? '38%' : '35%',
                  transform: pigPopped ? 'rotate(360deg) scale(1.1)' : 'rotate(-25deg)',
                }}
              >
                <PixelRedBird size={52} />
              </div>
            )}

            {/* Target Pig (Pop FX when hit) */}
            <div 
              className={`absolute right-[22%] bottom-[32%] z-20 transition-all ${
                pigPopped ? 'scale-0 opacity-0' : 'scale-100 opacity-100'
              }`}
            >
              <PixelPig size={50} helmet={true} />
            </div>

            {/* Score Float upon popping */}
            {scoreEffect && (
              <div className="absolute right-[22%] bottom-[45%] font-arcade text-lg md:text-xl text-[#ffd166] drop-shadow-[0_2px_0_#000] animate-bounce z-40">
                +{scoreEffect}! PIG POPPED!
              </div>
            )}

            {/* Bottom In-Game Status */}
            <div className="flex justify-between items-end">
              <div className="flex items-center gap-2 bg-[#1c0e07]/90 border-2 border-black px-3 py-1 font-arcade text-[10px] text-[#fff7ed]">
                <span>BIRDS REMAINING:</span>
                <PixelRedBird size={20} />
                <PixelRedBird size={20} />
                <PixelRedBird size={20} />
              </div>

              <div className="font-mono-pixel text-xs text-[#fef08a] bg-[#1c0e07]/90 border-2 border-black px-2 py-1">
                TAP ANYWHERE ON SCREEN OR CLICK TEST SLINGSHOT
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Retro Arcade Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
        
        <div className="pixel-border bg-[#22120a] p-4 text-center">
          <div className="font-arcade text-xl md:text-2xl text-[#e63946] mb-1">1.42B+</div>
          <div className="font-mono-pixel text-sm md:text-base text-[#d6c7b2] flex items-center justify-center gap-1">
            <PixelPig size={18} />
            <span>PIGS POPPED</span>
          </div>
        </div>

        <div className="pixel-border bg-[#22120a] p-4 text-center">
          <div className="font-arcade text-xl md:text-2xl text-[#ffd166] mb-1">850M+</div>
          <div className="font-mono-pixel text-sm md:text-base text-[#d6c7b2] flex items-center justify-center gap-1">
            <PixelGoldenEgg size={16} />
            <span>EGGS RESCUED</span>
          </div>
        </div>

        <div className="pixel-border bg-[#22120a] p-4 text-center">
          <div className="font-arcade text-xl md:text-2xl text-[#f59e0b] mb-1">9 HEROES</div>
          <div className="font-mono-pixel text-sm md:text-base text-[#d6c7b2] flex items-center justify-center gap-1">
            <PixelRedBird size={16} />
            <span>UNIQUE ABILITIES</span>
          </div>
        </div>

        <div className="pixel-border bg-[#22120a] p-4 text-center">
          <div className="font-arcade text-xl md:text-2xl text-[#22c55e] mb-1">100%</div>
          <div className="font-mono-pixel text-sm md:text-base text-[#d6c7b2] flex items-center justify-center gap-1">
            <PixelTNTBox size={16} />
            <span>TNT DESTRUCTION</span>
          </div>
        </div>

      </div>

    </section>
  );
};
