import React, { useState } from 'react';
import { Gamepad2, Star, Sparkles, X, Play } from 'lucide-react';
import { sounds } from '../utils/audio';

interface GameItem {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  genre: string;
  category: 'slingshot' | 'sandbox' | 'rpg';
  year: string;
  platform: string;
  stars: number;
  features: string[];
  description: string;
  cheatCode?: string;
}

export const GamesShowcase: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'slingshot' | 'sandbox' | 'rpg'>('all');
  const [selectedGame, setSelectedGame] = useState<GameItem | null>(null);

  const games: GameItem[] = [
    {
      id: 'arcade-1986',
      title: 'ANGRY BIRDS ARCADE',
      subtitle: '1986 CLASSIC EDITION',
      image: '/assets/game-arcade.jpg',
      genre: 'Physics Slingshot Arcade',
      category: 'slingshot',
      year: '1986',
      platform: '16-Bit Arcade & SNES',
      stars: 5,
      features: [
        '120 Handcrafted Pixel Stages',
        'Pure 8-Bit Chiptune Synthesizer Audio',
        'Wood, Glass & Stone Breakage Mechanics',
        'Global Arcade Cabinet Leaderboard'
      ],
      description: 'The definitive 16-bit arcade release that ignited the slingshot revolution. Fling Red, Chuck, and Bomb across intricate piggy towers with millimeter precision physics.',
      cheatCode: 'UP, UP, DOWN, DOWN, LEFT, RIGHT, B, A (Unlocks Mighty Eagle)'
    },
    {
      id: 'bad-piggies-workshop',
      title: 'BAD PIGGIES WORKSHOP',
      subtitle: 'CONSTRUCTION CHAOS',
      image: '/assets/game-piggies.jpg',
      genre: 'Creative Physics Sandbox',
      category: 'sandbox',
      year: '1992',
      platform: 'Sega Genesis / SNES',
      stars: 5,
      features: [
        '64 Modular Machine Crafting Parts',
        'TNT Boosters, Bellows & Propellers',
        'Gravity-Defying Downhill Courses',
        'Sandbox Mode with Unlimited Scraps'
      ],
      description: 'Turn the tables and pilot makeshift contraptions as the mischievous Bad Piggies! Assemble bizarre wooden gliders, rocket carts, and catapults to steer safely toward the eggs without detonating.',
      cheatCode: 'HOLD L+R AND PRESS START AT TITLE (Infinite TNT)'
    },
    {
      id: 'citadel-siege',
      title: 'CITADEL SIEGE',
      subtitle: 'THE GOLDEN EGG RAID',
      image: '/assets/pig-citadel.jpg',
      genre: 'Castle Siege & Boss Raid',
      category: 'slingshot',
      year: '1995',
      platform: 'Super Famicom / Arcade',
      stars: 5,
      features: [
        'Multi-Phase King Pig Boss Battle',
        'Reinforced Iron & Stone Fortresses',
        'Tactical Bomb Squad Night Drops',
        'Hidden Golden Egg Secret Vaults'
      ],
      description: 'Infiltrate King Pig’s royal castle fortress. Navigate searchlights, heavy stone portcullises, and helmet guards to retrieve the royal eggs before breakfast is served.',
      cheatCode: 'SELECT KING LEVEL, PRESS SELECT 5 TIMES'
    },
    {
      id: 'desert-badlands',
      title: 'DESERT BADLANDS',
      subtitle: 'WIND & CACTUS FURY',
      image: '/assets/hero-pixel.jpg',
      genre: 'Environmental Wind Slingshot',
      category: 'slingshot',
      year: '1998',
      platform: 'GameBoy Color / Arcade',
      stars: 4,
      features: [
        'Dynamic Crosswinds & Dust Devil Physics',
        'Explosive Desert Cacti Hazards',
        'Hal’s Reverse Boomerang Masterclass',
        'Quickdraw 30-Second Rush Challenges'
      ],
      description: 'Battle through scorching dunes and whistling crosswinds. Adjust your trajectory in real-time as desert gusts deflect flight arcs, and trigger explosive prickly cactus chain reactions.',
      cheatCode: 'PRESS B AT SUNRISE FOR FEATHER STORM'
    },
    {
      id: 'feathered-epic',
      title: 'FEATHERED LEGENDS RPG',
      subtitle: '16-BIT TURN-BASED ODYSSEY',
      image: '/assets/flock-select.jpg',
      genre: 'Turn-Based Pixel RPG',
      category: 'rpg',
      year: '1999',
      platform: '16-Bit Cartridge RPG',
      stars: 5,
      features: [
        'Flock Turn-Based Combat & Skill Trees',
        'Craftable Wooden, Stone & Iron Helmets',
        'Team Ultimate Combo Attacks',
        'Pig Guild Arena Tournament Mode'
      ],
      description: 'A sprawling 16-bit role-playing saga where you equip the flock with knightly helmets, wizard staffs, and volcanic slingshots to free Piggy Island from royal tyranny.',
      cheatCode: 'MAX FLOCK MANA: PRESS START, X, Y, A'
    }
  ];

  const filteredGames = filter === 'all' ? games : games.filter((g) => g.category === filter);

  const handleLaunchGame = () => {
    sounds.playBlip(700, 0.08);
    setSelectedGame(null);
    const el = document.getElementById('minigame');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="games" className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#231208] border-2 border-black mb-3">
          <Gamepad2 size={14} className="text-[#ffd166]" />
          <span className="font-arcade text-[10px] text-[#ffd166]">RETRO CARTRIDGE VAULT</span>
        </div>
        <h2 className="font-arcade text-2xl md:text-4xl text-[#fff7ed] mb-3">
          LEGENDARY <span className="text-[#ffd166]">GAMES</span> & FEATURES
        </h2>
        <p className="font-sans-pixel text-base md:text-lg text-[#d6c7b2]">
          Explore the official retro releases, featuring revolutionary physics simulations and pixel destruction.
        </p>

        {/* Filter Pills */}
        <div className="flex flex-wrap justify-center gap-2 mt-6">
          {[
            { id: 'all', label: 'ALL GAMES' },
            { id: 'slingshot', label: 'SLINGSHOT CLASSICS' },
            { id: 'sandbox', label: 'PHYSICS SANDBOX' },
            { id: 'rpg', label: 'RPG & SIEGE' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => {
                sounds.playBlip(480, 0.05);
                setFilter(item.id as typeof filter);
              }}
              className={`pixel-btn text-[10px] py-1.5 px-3.5 ${
                filter === item.id ? 'pixel-btn-gold' : 'pixel-btn-wood'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Game Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGames.map((game) => (
          <div
            key={game.id}
            className="pixel-border bg-[#20120a] hover:bg-[#2b170e] transition-all flex flex-col justify-between group overflow-hidden"
          >
            {/* Box Art Thumbnail */}
            <div className="relative aspect-square w-full overflow-hidden bg-black border-b-4 border-black">
              <img
                src={game.image}
                alt={game.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-2 left-2 pixel-badge badge-gold">
                {game.year}
              </div>
              <div className="absolute top-2 right-2 pixel-badge badge-red">
                {game.platform}
              </div>
            </div>

            {/* Content Body */}
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono-pixel text-xs text-[#ffd166] tracking-wider uppercase">
                    {game.genre}
                  </span>
                  <div className="flex items-center gap-0.5 text-[#f59e0b]">
                    {Array.from({ length: game.stars }).map((_, i) => (
                      <Star key={i} size={13} className="fill-[#f59e0b]" />
                    ))}
                  </div>
                </div>

                <h3 className="font-arcade text-sm md:text-base text-[#fff7ed] group-hover:text-[#ffd166] transition-colors mb-1">
                  {game.title}
                </h3>
                <div className="font-mono-pixel text-xs text-[#e63946] mb-3">
                  {game.subtitle}
                </div>

                <p className="font-sans-pixel text-xs md:text-sm text-[#d6c7b2] line-clamp-2 mb-4">
                  {game.description}
                </p>

                {/* Features List */}
                <div className="bg-[#150a05] border border-black p-3 mb-4 space-y-1.5">
                  <div className="font-arcade text-[9px] text-[#22c55e] mb-1">KEY FEATURES:</div>
                  {game.features.map((feat, i) => (
                    <div key={i} className="flex items-center gap-1.5 font-sans-pixel text-xs text-[#fff7ed]">
                      <span className="text-[#ffd166] font-bold">▸</span>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Action */}
              <div className="pt-2 flex items-center gap-2">
                <button
                  onClick={() => {
                    sounds.playBlip(550, 0.05);
                    setSelectedGame(game);
                  }}
                  className="flex-1 pixel-btn pixel-btn-wood text-[10px] py-2"
                >
                  <Sparkles size={12} />
                  <span>INSPECT SPECS</span>
                </button>
                <button
                  onClick={handleLaunchGame}
                  className="pixel-btn pixel-btn-red text-[10px] py-2 px-3"
                  title="Play Mini-Game Demo"
                >
                  <Play size={12} className="fill-white" />
                </button>
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* Cartridge Modal */}
      {selectedGame && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="pixel-border-gold bg-[#22120a] max-w-xl w-full p-6 md:p-8 max-h-[90vh] overflow-y-auto relative animate-in fade-in zoom-in-95">
            
            {/* Close Button */}
            <button
              onClick={() => {
                sounds.playBlip(300, 0.05);
                setSelectedGame(null);
              }}
              className="absolute top-4 right-4 p-1.5 bg-[#e63946] border-2 border-black text-white hover:bg-[#ff4b5c]"
              aria-label="Close Modal"
            >
              <X size={18} />
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-4 mb-4 pb-4 border-b-2 border-black">
              <img
                src={selectedGame.image}
                alt={selectedGame.title}
                className="w-20 h-20 object-cover border-2 border-black"
              />
              <div>
                <span className="pixel-badge badge-gold mb-1">{selectedGame.year} CARTRIDGE</span>
                <h3 className="font-arcade text-base md:text-lg text-[#fff7ed]">
                  {selectedGame.title}
                </h3>
                <div className="font-mono-pixel text-sm text-[#ffd166]">
                  {selectedGame.subtitle}
                </div>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <div className="font-arcade text-[10px] text-[#ffd166] mb-1">SYNOPSIS</div>
                <p className="font-sans-pixel text-sm text-[#d6c7b2] leading-relaxed">
                  {selectedGame.description}
                </p>
              </div>

              <div>
                <div className="font-arcade text-[10px] text-[#22c55e] mb-2">COMPLETE FEATURE SET</div>
                <div className="grid grid-cols-1 gap-2">
                  {selectedGame.features.map((f, idx) => (
                    <div key={idx} className="bg-[#140b07] border border-black p-2 font-sans-pixel text-xs text-[#fff7ed] flex items-center gap-2">
                      <span className="text-[#ffd166] font-bold">★</span>
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              {selectedGame.cheatCode && (
                <div className="bg-[#170a05] border-2 border-black p-3">
                  <div className="font-arcade text-[9px] text-[#e63946] mb-1">SECRET ARCADE CHEAT CODE:</div>
                  <code className="font-arcade text-xs text-[#ffd166] block select-all">
                    {selectedGame.cheatCode}
                  </code>
                </div>
              )}
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleLaunchGame}
                className="flex-1 pixel-btn pixel-btn-red text-xs py-3"
              >
                <Play size={14} className="fill-white" />
                <span>LAUNCH ARCADE DEMO</span>
              </button>
              <button
                onClick={() => setSelectedGame(null)}
                className="pixel-btn pixel-btn-wood text-xs py-3 px-4"
              >
                CLOSE
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
