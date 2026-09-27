import React, { useState } from 'react';
import { Shield, Skull, Sword, Scroll, Info } from 'lucide-react';
import { PixelPig, PixelGoldenEgg, PixelSlingshot } from './PixelSprites';
import { sounds } from '../utils/audio';

export const AboutLore: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'lore' | 'enemies'>('lore');
  const [selectedPig, setSelectedPig] = useState<number>(0);
  const [pigsPoked, setPigsPoked] = useState<{ [key: number]: boolean }>({});

  const storyActs = [
    {
      act: 'ACT I',
      title: 'THE MIDNIGHT EGG HEIST',
      desc: 'Deep within the lush canopy of Piggy Island, the flock guarded their sacred golden eggs. Under cover of twilight darkness, King Pig’s royal gluttony demanded a golden omelette, dispatching his green minions on a dastardly stealth heist.',
      icon: <PixelGoldenEgg size={24} />,
      year: 'THE INCIDENT'
    },
    {
      act: 'ACT II',
      title: 'THE FORGE OF JUSTICE',
      desc: 'Awakening to an empty nest, Red rallied the distraught flock. Using ancient enchanted oak and high-elastic vulcanized cords, they erected the Legendary Slingshot — a precision ballistic weapon built to launch feathered heroes directly into enemy walls.',
      icon: <PixelSlingshot size={28} />,
      year: 'THE RESPONSE'
    },
    {
      act: 'ACT III',
      title: 'CRACKING THE CITADEL',
      desc: 'From rickety wooden scaffolding to impenetrable stone fortresses, no piggy bastion can withstand the combined might of Red’s battle cries, Chuck’s supersonic dashes, and Bomb’s concussive detonations.',
      icon: <Sword size={24} className="text-[#ffd166]" />,
      year: 'THE CRUSADE'
    },
    {
      act: 'ACT IV',
      title: 'THE 16-BIT REMASTER',
      desc: 'Reimagined with handcrafted pixel art, authentic chiptune frequencies, and strict adherence to arcade physics, the eternal struggle between bird and pig reaches its ultimate retro form.',
      icon: <Scroll size={24} className="text-[#22c55e]" />,
      year: 'THE LEGACY'
    }
  ];

  const enemyRoster = [
    {
      name: 'MINION PIG',
      role: 'Cannon Fodder / Lazy Lookout',
      hp: '50 HP',
      armor: 'None (Pure Blubber)',
      weakness: 'Direct hit by any bird or falling stick',
      quote: '"Oink? Did you hear angry chirping just now...?"',
      helmet: false,
      king: false,
    },
    {
      name: 'CORPORAL HELMET PIG',
      role: 'Fortress Infantry',
      hp: '160 HP',
      armor: 'Scrap Metal Bucket Helmet',
      weakness: 'Heavy impact from Terence or Matilda’s egg bomb',
      quote: '"I am invulnerable! Except from above. And direct TNT explosions."',
      helmet: true,
      king: false,
    },
    {
      name: 'FOREMAN MUSTACHE PIG',
      role: 'Chief Construction Saboteur',
      hp: '280 HP',
      armor: 'Industrial Scaffolding Mastery',
      weakness: 'Chuck’s Mach-speed wood piercing dash',
      quote: '"More wood! More stone! The King demands 10-story towers!"',
      helmet: false,
      king: false,
    },
    {
      name: 'KING PIG SMOOTH CHEEKS',
      role: 'Royal Egg Devourer & Supreme Ruler',
      hp: '600 HP',
      armor: 'Crown of Gluttony + Thick Royal Layers',
      weakness: 'Massive chain reactions, Bomb thermal kaboom',
      quote: '"My eggs! I mean... MY ROYAL SUNNY-SIDE-UP DREAMS!"',
      helmet: false,
      king: true,
    }
  ];

  const handlePokePig = (idx: number) => {
    sounds.playPigPop();
    setPigsPoked((prev) => ({ ...prev, [idx]: true }));
    setTimeout(() => {
      setPigsPoked((prev) => ({ ...prev, [idx]: false }));
    }, 600);
  };

  return (
    <section id="lore" className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#231208] border-2 border-black mb-3">
          <Scroll size={14} className="text-[#f59e0b]" />
          <span className="font-arcade text-[10px] text-[#f59e0b]">OFFICIAL ISLAND ARCHIVES</span>
        </div>
        <h2 className="font-arcade text-2xl md:text-4xl text-[#fff7ed] mb-3">
          THE <span className="text-[#e63946]">LORE</span> & <span className="text-[#22c55e]">PIGGY</span> SAGA
        </h2>
        <p className="font-sans-pixel text-base md:text-lg text-[#d6c7b2]">
          Discover the dramatic origins of the greatest slingshot conflict in gaming history.
        </p>

        {/* Tab Toggle */}
        <div className="flex justify-center gap-3 mt-6">
          <button
            onClick={() => {
              sounds.playBlip(500, 0.05);
              setActiveTab('lore');
            }}
            className={`pixel-btn text-xs py-2 px-5 ${
              activeTab === 'lore' ? 'pixel-btn-gold' : 'pixel-btn-wood'
            }`}
          >
            <span>📜 THE 4-ACT SAGA</span>
          </button>
          <button
            onClick={() => {
              sounds.playBlip(500, 0.05);
              setActiveTab('enemies');
            }}
            className={`pixel-btn text-xs py-2 px-5 ${
              activeTab === 'enemies' ? 'pixel-btn-green' : 'pixel-btn-wood'
            }`}
          >
            <span>🐷 ENEMY DOSSIER</span>
          </button>
        </div>
      </div>

      {/* Citadel Banner Feature */}
      <div className="pixel-border-gold mb-12 overflow-hidden bg-[#1f1008] relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
          <div className="lg:col-span-7 h-[260px] md:h-[340px] overflow-hidden">
            <img
              src="/assets/pig-citadel.jpg"
              alt="King Pig Citadel and Stolen Golden Eggs"
              className="w-full h-full object-cover object-center"
            />
          </div>
          <div className="lg:col-span-5 p-6 md:p-8 flex flex-col justify-between">
            <div>
              <div className="font-arcade text-[11px] text-[#ffd166] mb-2 flex items-center gap-2">
                <PixelGoldenEgg size={18} />
                <span>PRIMARY TARGET // GOLDEN EGGS</span>
              </div>
              <h3 className="font-arcade text-lg md:text-xl text-[#fff7ed] mb-3 leading-snug">
                FORTRESS OF THE KING PIG
              </h3>
              <p className="font-sans-pixel text-sm md:text-base text-[#d6c7b2] mb-4 leading-relaxed">
                Guarded by rows of spiked battlements and greedy minion guards, the Citadel holds the sacred Golden Eggs atop the royal alter. Every level in your journey brings you one launch closer to total reclaimed honor.
              </p>
            </div>

            <div className="flex items-center gap-3 pt-4 border-t-2 border-black/40 font-mono-pixel text-xs text-[#f59e0b]">
              <Info size={16} />
              <span>VULNERABILITY: UNSTABLE WOODEN SUPPORTS AT THE BASE</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tab 1: 4-Act Story Cards */}
      {activeTab === 'lore' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {storyActs.map((act, index) => (
            <div
              key={act.act}
              className="pixel-border bg-[#22120a] p-6 hover:bg-[#2c170d] transition-colors relative group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#170a05] border-2 border-black">
                    {act.icon}
                  </div>
                  <div>
                    <span className="font-arcade text-[10px] text-[#e63946]">{act.act}</span>
                    <h4 className="font-arcade text-xs md:text-sm text-[#fff7ed] group-hover:text-[#ffd166] transition-colors">
                      {act.title}
                    </h4>
                  </div>
                </div>
                <span className="font-mono-pixel text-xs text-[#a8a29e] border border-black px-2 py-0.5 bg-[#170a05]">
                  0{index + 1}
                </span>
              </div>

              <p className="font-sans-pixel text-sm md:text-base text-[#d6c7b2] leading-relaxed">
                {act.desc}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Tab 2: Enemy Dossier (Interactive Bad Piggies) */}
      {activeTab === 'enemies' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Enemy Select List */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            {enemyRoster.map((enemy, idx) => (
              <button
                key={enemy.name}
                onClick={() => {
                  sounds.playBlip(440 + idx * 50, 0.05);
                  setSelectedPig(idx);
                }}
                className={`w-full text-left p-4 border-2 border-black flex items-center justify-between transition-all ${
                  selectedPig === idx
                    ? 'bg-[#22c55e] text-black shadow-[4px_4px_0_#000] translate-x-1'
                    : 'bg-[#1e1009] text-[#fff7ed] hover:bg-[#2b170d]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <PixelPig size={32} helmet={enemy.helmet} king={enemy.king} />
                  <div>
                    <div className="font-arcade text-xs font-bold">{enemy.name}</div>
                    <div className={`font-mono-pixel text-xs ${selectedPig === idx ? 'text-[#06240d]' : 'text-[#f59e0b]'}`}>
                      {enemy.role}
                    </div>
                  </div>
                </div>
                <span className="font-arcade text-[10px] font-bold">{enemy.hp}</span>
              </button>
            ))}
          </div>

          {/* Detailed Selected Enemy Inspector */}
          <div className="lg:col-span-7 pixel-border-green p-6 md:p-8 bg-[#152419]">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b-2 border-black/50 mb-6">
              <div className="flex items-center gap-4">
                <div 
                  className={`p-3 bg-[#0d1710] border-3 border-black shadow-[4px_4px_0_#000] cursor-pointer hover:scale-105 transition-transform ${
                    pigsPoked[selectedPig] ? 'shake-hit' : ''
                  }`}
                  onClick={() => handlePokePig(selectedPig)}
                  title="Click to Poke Pig!"
                >
                  <PixelPig 
                    size={72} 
                    helmet={enemyRoster[selectedPig].helmet} 
                    king={enemyRoster[selectedPig].king} 
                  />
                </div>
                <div>
                  <div className="font-arcade text-sm md:text-base text-[#4ade80]">
                    {enemyRoster[selectedPig].name}
                  </div>
                  <div className="font-mono-pixel text-sm text-[#ffd166]">
                    {enemyRoster[selectedPig].role}
                  </div>
                  <div className="font-arcade text-xs text-[#fff7ed] mt-1">
                    HEALTH: {enemyRoster[selectedPig].hp}
                  </div>
                </div>
              </div>

              {/* Poke pig button */}
              <button
                onClick={() => handlePokePig(selectedPig)}
                className="pixel-btn pixel-btn-red text-[10px] py-2 px-3 whitespace-nowrap"
              >
                <span>POKE PIG! 🐽</span>
              </button>
            </div>

            {/* Stats Breakdown */}
            <div className="space-y-4 mb-6">
              <div>
                <div className="font-arcade text-[10px] text-[#4ade80] mb-1 flex items-center gap-1.5">
                  <Shield size={12} />
                  <span>ARMOR RATING</span>
                </div>
                <div className="font-sans-pixel text-sm text-[#fff7ed] bg-[#0c160f] p-2 border border-black">
                  {enemyRoster[selectedPig].armor}
                </div>
              </div>

              <div>
                <div className="font-arcade text-[10px] text-[#e63946] mb-1 flex items-center gap-1.5">
                  <Skull size={12} />
                  <span>CRITICAL WEAKNESS</span>
                </div>
                <div className="font-sans-pixel text-sm text-[#fff7ed] bg-[#0c160f] p-2 border border-black">
                  {enemyRoster[selectedPig].weakness}
                </div>
              </div>

              <div>
                <div className="font-arcade text-[10px] text-[#ffd166] mb-1">
                  <span>LAST WORDS / INTERCEPTED COMMUNICATON</span>
                </div>
                <div className="font-mono-pixel text-base text-[#ffd166] bg-[#0c160f] p-3 border border-black italic">
                  {enemyRoster[selectedPig].quote}
                </div>
              </div>
            </div>

            <div className="font-mono-pixel text-xs text-[#86efac] text-center">
              TIP: CLICK THE PIG AVATAR TO AUDITION RETRO OINK SOUND EFFECT!
            </div>
          </div>

        </div>
      )}

    </section>
  );
};
