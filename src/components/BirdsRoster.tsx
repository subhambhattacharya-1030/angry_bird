import React, { useState } from 'react';
import { Zap, Volume2, Crosshair, Award } from 'lucide-react';
import { 
  PixelRedBird, 
  PixelChuckBird, 
  PixelBombBird, 
  PixelMatildaBird
} from './PixelSprites';
import { sounds } from '../utils/audio';

interface BirdProfile {
  id: string;
  name: string;
  title: string;
  species: string;
  abilityName: string;
  abilityDesc: string;
  audioKey: string;
  stats: {
    damage: number;
    speed: number;
    mass: number;
    penetration: number;
  };
  bestTarget: string;
  quote: string;
  colorHex: string;
  accentHex: string;
  avatarComponent: React.ReactNode;
}

export const BirdsRoster: React.FC = () => {
  const [selectedBirdId, setSelectedBirdId] = useState<string>('red');
  const [abilityPlaying, setAbilityPlaying] = useState<string | null>(null);

  const birds: BirdProfile[] = [
    {
      id: 'red',
      name: 'RED',
      title: 'THE FEARLESS COMMANDER',
      species: 'Northern Cardinal',
      abilityName: 'BATTLE CRY SHOCKWAVE',
      abilityDesc: 'Unleashes a deafening ultrasonic battle cry that destabilizes heavy stone blocks and topples precarious towers.',
      audioKey: 'red',
      stats: { damage: 85, speed: 70, mass: 75, penetration: 80 },
      bestTarget: 'Fortress foundations & Stone watchtowers',
      quote: '"We will not rest until every single egg is returned to the nest!"',
      colorHex: '#e63946',
      accentHex: '#991b1b',
      avatarComponent: <PixelRedBird size={64} />
    },
    {
      id: 'chuck',
      name: 'CHUCK',
      title: 'THE MACH SPEEDSTER',
      species: 'Canary / Swift',
      abilityName: 'SUPERSONIC MACH DASH',
      abilityDesc: 'Instantly accelerates to 400% flight velocity in mid-air, piercing straight through multiple layers of dense timber.',
      audioKey: 'chuck',
      stats: { damage: 78, speed: 100, mass: 50, penetration: 95 },
      bestTarget: 'Thick wooden barricades & Scaffold towers',
      quote: '"Did you see that? I already hit that pig three times before you blinked!"',
      colorHex: '#ffd166',
      accentHex: '#b45309',
      avatarComponent: <PixelChuckBird size={64} />
    },
    {
      id: 'bomb',
      name: 'BOMB',
      title: 'THE MASTER DEMOLITIONIST',
      species: 'Greater Antillean Bullfinch',
      abilityName: 'THERMAL CONCUSSIVE KABOOM',
      abilityDesc: 'Ignites internal fury to detonate in a massive 360-degree fireball upon tap or collision, pulverizing reinforced iron and stone.',
      audioKey: 'bomb',
      stats: { damage: 100, speed: 55, mass: 90, penetration: 100 },
      bestTarget: 'Reinforced bunkers, TNT caches & Stone vaults',
      quote: '"Careful around my fuse... I have a very short temper."',
      colorHex: '#262626',
      accentHex: '#ea580c',
      avatarComponent: <PixelBombBird size={64} />
    },
    {
      id: 'matilda',
      name: 'MATILDA',
      title: 'THE AERIAL BOMBARDIER',
      species: 'Chicken',
      abilityName: 'HIGH-YIELD EGG DROP',
      abilityDesc: 'Drops a heavy explosive egg vertically onto targets below while using the rocket recoil to launch herself upward into secondary towers.',
      audioKey: 'matilda',
      stats: { damage: 92, speed: 65, mass: 70, penetration: 85 },
      bestTarget: 'Vertical trenches, pig bunkers & low ceilings',
      quote: '"Peace and harmony through overwhelming vertical payload delivery."',
      colorHex: '#f8fafc',
      accentHex: '#fb7185',
      avatarComponent: <PixelMatildaBird size={64} />
    },
    {
      id: 'terence',
      name: 'TERENCE',
      title: 'THE COLOSSAL WRECKING BALL',
      species: 'Giant Cardinal',
      abilityName: 'ABSOLUTE CRUSHING MASS',
      abilityDesc: 'His sheer astronomical weight and density lets him bulldoze through entire multi-story fortresses without slowing down.',
      audioKey: 'red',
      stats: { damage: 100, speed: 40, mass: 100, penetration: 100 },
      bestTarget: 'Any structure. Nothing withstands Terence.',
      quote: '"... *low ominous growl* ..."',
      colorHex: '#7f1d1d',
      accentHex: '#450a0a',
      avatarComponent: <PixelRedBird size={76} className="filter brightness-75 contrast-125" />
    },
    {
      id: 'hal',
      name: 'HAL',
      title: 'THE BOOMERANG SNIPER',
      species: 'Emerald Toucanet',
      abilityName: 'REVERSE TRAJECTORY SWOOP',
      abilityDesc: 'Opens his massive beak to perform an aerodynamic 180-degree U-turn, striking pigs hiding behind invincible shield walls.',
      audioKey: 'hal',
      stats: { damage: 75, speed: 80, mass: 65, penetration: 75 },
      bestTarget: 'Shielded rear pigs & reverse-angled structures',
      quote: '"You thought hiding behind that iron slab would save your bacon?"',
      colorHex: '#15803d',
      accentHex: '#166534',
      avatarComponent: (
        <div className="relative">
          <PixelChuckBird size={64} className="filter hue-rotate-60" />
        </div>
      )
    },
    {
      id: 'bubbles',
      name: 'BUBBLES',
      title: 'THE INFLATABLE TITAN',
      species: 'Jamaican Oriole',
      abilityName: '10X BALLOON EXPANSION',
      abilityDesc: 'Inflates instantaneously into a gargantuan rubber sphere, pushing aside thousands of tons of structural blocks like toy bricks.',
      audioKey: 'matilda',
      stats: { damage: 88, speed: 75, mass: 95, penetration: 90 },
      bestTarget: 'Enclosed spaces & confined basement pits',
      quote: '"Candy? No, I eat PIGGY FORTRESSES for breakfast!"',
      colorHex: '#f97316',
      accentHex: '#c2410c',
      avatarComponent: <PixelRedBird size={64} className="filter sepia hue-rotate-15" />
    },
    {
      id: 'stella',
      name: 'STELLA',
      title: 'ANTI-GRAVITY SORCERESS',
      species: 'Galah (Coral Salmon Tone)',
      abilityName: 'BUBBLE VORTEX TRAP',
      abilityDesc: 'Encapsulates surroundings in anti-gravity force spheres, floating pigs and heavy stones into the air before slamming them down.',
      audioKey: 'chuck',
      stats: { damage: 80, speed: 85, mass: 60, penetration: 70 },
      bestTarget: 'Loose debris & crowded pig squadrons',
      quote: '"Let us lift your spirits... and drop your fortress!"',
      colorHex: '#fb7185',
      accentHex: '#e11d48',
      avatarComponent: <PixelMatildaBird size={64} className="filter sepia hue-rotate-300" />
    },
    {
      id: 'the-blues',
      name: 'THE BLUES (JAY, JAKE & JIM)',
      title: 'THE TRIPLE TROUBLE',
      species: 'Mountain Bluebirds (Amber/Emerald Arcade Tint)',
      abilityName: 'TRIO SPLINTER SHUTTLE',
      abilityDesc: 'Divides into three separate high-velocity projectiles upon tap, shattering glass and crystal barriers on impact.',
      audioKey: 'hal',
      stats: { damage: 70, speed: 90, mass: 45, penetration: 95 },
      bestTarget: 'Glass domes, ice shields & split targets',
      quote: '"Three beaks are far better than one!"',
      colorHex: '#10b981',
      accentHex: '#047857',
      avatarComponent: (
        <div className="flex -space-x-4">
          <PixelRedBird size={36} className="filter hue-rotate-90" />
          <PixelRedBird size={36} className="filter hue-rotate-90" />
          <PixelRedBird size={36} className="filter hue-rotate-90" />
        </div>
      )
    }
  ];

  const currentBird = birds.find((b) => b.id === selectedBirdId) || birds[0];

  const handleAuditionCry = (bird: BirdProfile) => {
    sounds.playBirdCry(bird.audioKey);
    setAbilityPlaying(bird.id);
    setTimeout(() => {
      setAbilityPlaying(null);
    }, 800);
  };

  return (
    <section id="flock" className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#231208] border-2 border-black mb-3">
          <Zap size={14} className="text-[#e63946]" />
          <span className="font-arcade text-[10px] text-[#e63946]">HERO ROSTER</span>
        </div>
        <h2 className="font-arcade text-2xl md:text-4xl text-[#fff7ed] mb-3">
          THE <span className="text-[#e63946]">FLOCK</span> & THEIR ABILITIES
        </h2>
        <p className="font-sans-pixel text-base md:text-lg text-[#d6c7b2]">
          Every feathered warrior brings unique destruction physics to the battlefield. Select a bird to test their combat ability.
        </p>
      </div>

      {/* Roster Character Select Banner */}
      <div className="pixel-border-red mb-10 overflow-hidden bg-black shadow-[6px_6px_0_#000]">
        <div className="relative aspect-[21/9] max-h-[360px] w-full overflow-hidden">
          <img
            src="/assets/flock-select.jpg"
            alt="Angry Birds 16-Bit Character Select Screen"
            className="w-full h-full object-cover select-none"
          />
          <div className="absolute bottom-3 left-4 md:left-6 font-arcade text-xs md:text-sm text-[#ffd166] bg-black/85 border-2 border-black px-3 py-1.5 shadow-[2px_2px_0_#000]">
            SELECT YOUR HERO // FLOCK ARCHIVE
          </div>
        </div>
      </div>

      {/* Interactive Bird Inspector & Selector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: 9 Bird Selector Grid */}
        <div className="lg:col-span-6 grid grid-cols-3 gap-3">
          {birds.map((bird) => {
            const isSelected = bird.id === selectedBirdId;
            return (
              <button
                key={bird.id}
                onClick={() => {
                  sounds.playBlip(500, 0.04);
                  setSelectedBirdId(bird.id);
                }}
                className={`p-3 border-3 border-black text-center flex flex-col items-center justify-between transition-all relative ${
                  isSelected
                    ? 'bg-[#2b160b] shadow-[4px_4px_0_#e63946] -translate-y-1'
                    : 'bg-[#1a0f09] hover:bg-[#26150c] shadow-[2px_2px_0_#000]'
                }`}
                style={{
                  borderTopColor: isSelected ? bird.colorHex : '#000',
                  borderTopWidth: isSelected ? '4px' : '3px',
                }}
              >
                {/* Active Indicator */}
                {isSelected && (
                  <div className="absolute top-1 right-1 w-2 h-2 bg-[#ffd166] border border-black animate-ping" />
                )}

                <div className="my-2 transform hover:scale-110 transition-transform">
                  {bird.avatarComponent}
                </div>

                <div className="font-arcade text-[10px] md:text-xs text-[#fff7ed] mt-1 font-bold">
                  {bird.name}
                </div>

                <div className="font-mono-pixel text-[11px] text-[#ffd166] truncate w-full">
                  {bird.abilityName.split(' ')[0]}
                </div>
              </button>
            );
          })}
        </div>

        {/* Right: Detailed Bird Dossier Card */}
        <div className="lg:col-span-6 pixel-border-gold p-6 md:p-8 bg-[#201209] shadow-[8px_8px_0_#000]">
          
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b-2 border-black/60 mb-6">
            <div className="flex items-center gap-4">
              <div 
                className={`p-3 bg-[#140a05] border-3 border-black shadow-[4px_4px_0_#000] cursor-pointer hover:scale-105 transition-transform ${
                  abilityPlaying === currentBird.id ? 'shake-hit' : ''
                }`}
                onClick={() => handleAuditionCry(currentBird)}
                title="Click to audition ability sound!"
              >
                {currentBird.avatarComponent}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-arcade text-lg md:text-xl text-[#fff7ed]">
                    {currentBird.name}
                  </h3>
                  <span className="pixel-badge badge-red">{currentBird.species}</span>
                </div>
                <div className="font-mono-pixel text-sm text-[#ffd166]">
                  {currentBird.title}
                </div>
              </div>
            </div>

            {/* Test Ability Sound Button */}
            <button
              onClick={() => handleAuditionCry(currentBird)}
              className="pixel-btn pixel-btn-red text-[11px] py-2 px-3 flex items-center gap-1.5 whitespace-nowrap"
            >
              <Volume2 size={15} />
              <span>TEST BATTLE CRY!</span>
            </button>
          </div>

          {/* Ability Highlight Box */}
          <div className="bg-[#140b07] border-2 border-black p-4 mb-6 relative">
            <div className="flex items-center gap-2 mb-1.5">
              <Zap size={16} className="text-[#ffd166] fill-[#ffd166]" />
              <div className="font-arcade text-xs md:text-sm text-[#ffd166]">
                SIGNATURE ABILITY: {currentBird.abilityName}
              </div>
            </div>
            <p className="font-sans-pixel text-sm text-[#d6c7b2] leading-relaxed">
              {currentBird.abilityDesc}
            </p>
          </div>

          {/* Combat Stats Bars */}
          <div className="space-y-3 mb-6">
            <div className="font-arcade text-[10px] text-[#fff7ed] flex items-center justify-between">
              <span>COMBAT METRICS</span>
              <span className="text-[#f59e0b]">SPECIFICATIONS</span>
            </div>

            {/* Damage */}
            <div>
              <div className="flex justify-between font-mono-pixel text-xs text-[#d6c7b2] mb-1">
                <span>IMPACT DAMAGE</span>
                <span className="text-[#e63946] font-bold">{currentBird.stats.damage}%</span>
              </div>
              <div className="w-full h-3 bg-[#120804] border border-black p-0.5">
                <div 
                  className="h-full bg-[#e63946] transition-all duration-500" 
                  style={{ width: `${currentBird.stats.damage}%` }}
                />
              </div>
            </div>

            {/* Speed */}
            <div>
              <div className="flex justify-between font-mono-pixel text-xs text-[#d6c7b2] mb-1">
                <span>FLIGHT SPEED</span>
                <span className="text-[#ffd166] font-bold">{currentBird.stats.speed}%</span>
              </div>
              <div className="w-full h-3 bg-[#120804] border border-black p-0.5">
                <div 
                  className="h-full bg-[#ffd166] transition-all duration-500" 
                  style={{ width: `${currentBird.stats.speed}%` }}
                />
              </div>
            </div>

            {/* Mass */}
            <div>
              <div className="flex justify-between font-mono-pixel text-xs text-[#d6c7b2] mb-1">
                <span>BALLISTIC MASS</span>
                <span className="text-[#f59e0b] font-bold">{currentBird.stats.mass}%</span>
              </div>
              <div className="w-full h-3 bg-[#120804] border border-black p-0.5">
                <div 
                  className="h-full bg-[#f59e0b] transition-all duration-500" 
                  style={{ width: `${currentBird.stats.mass}%` }}
                />
              </div>
            </div>

            {/* Armor Penetration */}
            <div>
              <div className="flex justify-between font-mono-pixel text-xs text-[#d6c7b2] mb-1">
                <span>STRUCTURE PENETRATION</span>
                <span className="text-[#22c55e] font-bold">{currentBird.stats.penetration}%</span>
              </div>
              <div className="w-full h-3 bg-[#120804] border border-black p-0.5">
                <div 
                  className="h-full bg-[#22c55e] transition-all duration-500" 
                  style={{ width: `${currentBird.stats.penetration}%` }}
                />
              </div>
            </div>
          </div>

          {/* Tactical Target Guidance */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
            <div className="bg-[#170a05] border border-black p-3">
              <div className="font-arcade text-[9px] text-[#22c55e] mb-1 flex items-center gap-1">
                <Crosshair size={12} />
                <span>OPTIMAL TARGET</span>
              </div>
              <div className="font-sans-pixel text-xs text-[#fff7ed]">
                {currentBird.bestTarget}
              </div>
            </div>

            <div className="bg-[#170a05] border border-black p-3">
              <div className="font-arcade text-[9px] text-[#ffd166] mb-1 flex items-center gap-1">
                <Award size={12} />
                <span>BATTLE MOTTO</span>
              </div>
              <div className="font-sans-pixel text-xs text-[#ffd166] italic">
                {currentBird.quote}
              </div>
            </div>
          </div>

        </div>

      </div>

    </section>
  );
};
