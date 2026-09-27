import React, { useState } from 'react';
import { Users, Send, CheckCircle2, Trophy } from 'lucide-react';
import { PixelGoldenEgg } from './PixelSprites';
import { sounds } from '../utils/audio';

export const Community: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    sounds.playVictoryFanfare();
    setSubscribed(true);
  };

  const topSlingers = [
    { rank: 1, name: 'RedSlinger_99', score: '1,984,200', bird: 'Red', badge: 'GOLD' },
    { rank: 2, name: 'ChuckMachMaster', score: '1,842,100', bird: 'Chuck', badge: 'SILVER' },
    { rank: 3, name: 'BombasticTNT', score: '1,760,400', bird: 'Bomb', badge: 'BRONZE' },
    { rank: 4, name: 'EggDropper88', score: '1,590,000', bird: 'Matilda', badge: 'HONOR' },
    { rank: 5, name: 'BaconBuster_X', score: '1,480,200', bird: 'Terence', badge: 'HONOR' },
  ];

  const socialLinks = [
    {
      name: 'DISCORD ARCADE',
      members: '128K SLINGERS',
      desc: 'Strategy chats, speedruns & level sharing',
      btnText: 'JOIN DISCORD',
      color: '#e63946',
    },
    {
      name: 'PIGGY REPOSITORY',
      members: '85K SUBSCRIBERS',
      desc: 'Reddit community memes & fortress breakdowns',
      btnText: 'VISIT SUBREDDIT',
      color: '#f59e0b',
    },
    {
      name: 'FEATHER WIRE',
      members: '340K FOLLOWERS',
      desc: 'Live patch notes, tournaments & egg alerts',
      btnText: 'FOLLOW WIRE',
      color: '#22c55e',
    },
    {
      name: 'RETRO STREAM',
      members: '45K VIEWERS',
      desc: 'Live chiptune music & boss fight raids',
      btnText: 'WATCH STREAM',
      color: '#d97706',
    },
  ];

  return (
    <section id="community" className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#231208] border-2 border-black mb-3">
          <Users size={14} className="text-[#ffd166]" />
          <span className="font-arcade text-[10px] text-[#ffd166]">FEATHERED COMRADES</span>
        </div>
        <h2 className="font-arcade text-2xl md:text-4xl text-[#fff7ed] mb-3">
          JOIN THE <span className="text-[#e63946]">FLOCK</span> COMMUNITY
        </h2>
        <p className="font-sans-pixel text-base md:text-lg text-[#d6c7b2]">
          Enlist in the world’s most passionate slingshot coalition. Share high scores, discuss fortress tactics, and claim exclusive VIP egg rewards.
        </p>
      </div>

      {/* VIP Feather Pass & Newsletter Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        
        {/* VIP Golden Egg Pass Card */}
        <div className="lg:col-span-7 pixel-border-gold bg-[#221208] p-6 md:p-8 flex flex-col justify-between shadow-[6px_6px_0_#000]">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="pixel-badge badge-gold flex items-center gap-1.5">
                <PixelGoldenEgg size={16} />
                <span>GOLDEN EGG CLUB // VIP PASS</span>
              </span>
              <span className="font-mono-pixel text-xs text-[#ffd166] bg-[#140b05] border border-black px-2 py-0.5">
                SEASON 1986
              </span>
            </div>

            <h3 className="font-arcade text-lg md:text-2xl text-[#fff7ed] mb-3 leading-snug">
              GET THE WEEKLY SLINGSHOT DISPATCH
            </h3>
            <p className="font-sans-pixel text-sm md:text-base text-[#d6c7b2] mb-6 leading-relaxed">
              Subscribers receive early access to new pixel stages, secret cartridge cheat codes, developer chiptune drops, and printable 16-bit poster art.
            </p>

            {/* Newsletter Input Form */}
            {!subscribed ? (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 mb-4">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ENTER YOUR ARCADE EMAIL..."
                  className="flex-1 bg-[#140b07] border-3 border-black text-[#fff7ed] px-4 py-3 font-mono-pixel text-base placeholder-[#78716c] focus:outline-none focus:border-[#ffd166]"
                />
                <button
                  type="submit"
                  className="pixel-btn pixel-btn-red text-xs py-3 px-5 flex items-center justify-center gap-2"
                >
                  <Send size={14} />
                  <span>JOIN FLOCK</span>
                </button>
              </form>
            ) : (
              <div className="bg-[#122215] border-2 border-black p-4 mb-4 flex items-center gap-3 animate-in zoom-in-95">
                <CheckCircle2 size={24} className="text-[#22c55e]" />
                <div>
                  <div className="font-arcade text-xs text-[#22c55e]">WELCOME TO THE FLOCK, SLINGER!</div>
                  <div className="font-mono-pixel text-sm text-[#d6c7b2]">
                    Check your inbox for your 16-bit golden ticket & secret cheat codes.
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Guarantee Note */}
          <div className="font-mono-pixel text-xs text-[#f59e0b] pt-4 border-t border-black/40 flex items-center gap-2">
            <span>🛡️ NO SPAM GUARANTEE. WE ONLY DELIVER MAXIMUM PIGGY POPPING INTEL.</span>
          </div>
        </div>

        {/* Live Arcade Leaderboard */}
        <div className="lg:col-span-5 pixel-border-red bg-[#22100a] p-6 shadow-[6px_6px_0_#000]">
          <div className="flex items-center justify-between mb-4 pb-2 border-b-2 border-black">
            <div className="flex items-center gap-2">
              <Trophy size={18} className="text-[#ffd166]" />
              <h3 className="font-arcade text-xs md:text-sm text-[#fff7ed]">
                HALL OF FAME
              </h3>
            </div>
            <span className="font-mono-pixel text-xs text-[#22c55e] animate-pulse">
              ● REALTIME
            </span>
          </div>

          <div className="space-y-2.5">
            {topSlingers.map((slinger) => (
              <div
                key={slinger.rank}
                className="bg-[#170a05] border border-black p-2.5 flex items-center justify-between hover:bg-[#261309] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className={`font-arcade text-xs w-5 text-center font-bold ${
                    slinger.rank === 1 ? 'text-[#ffd166]' : slinger.rank === 2 ? 'text-[#e2e8f0]' : slinger.rank === 3 ? 'text-[#ea580c]' : 'text-[#78716c]'
                  }`}>
                    #{slinger.rank}
                  </span>
                  <div>
                    <div className="font-arcade text-[11px] text-[#fff7ed]">{slinger.name}</div>
                    <div className="font-mono-pixel text-xs text-[#d6c7b2]">Main: {slinger.bird}</div>
                  </div>
                </div>

                <div className="font-mono-pixel text-sm text-[#ffd166] font-bold">
                  {slinger.score}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-3 border-t border-black text-center font-mono-pixel text-xs text-[#d6c7b2]">
            WANT TO CLAIM THE #1 SPOT? PLAY THE MINI-GAME ABOVE!
          </div>
        </div>

      </div>

      {/* Social Hub Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {socialLinks.map((item) => (
          <div
            key={item.name}
            className="pixel-border bg-[#1f1008] p-5 hover:bg-[#2b160b] transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono-pixel text-xs text-[#ffd166]">{item.members}</span>
                <span className="w-2 h-2 rounded-none bg-[#22c55e] border border-black"></span>
              </div>
              <h4 className="font-arcade text-xs md:text-sm text-[#fff7ed] group-hover:text-[#ffd166] transition-colors mb-2">
                {item.name}
              </h4>
              <p className="font-sans-pixel text-xs text-[#d6c7b2] mb-4">
                {item.desc}
              </p>
            </div>

            <button
              onClick={() => sounds.playBlip(550, 0.05)}
              className="w-full pixel-btn pixel-btn-wood text-[10px] py-2"
            >
              <span>{item.btnText}</span>
            </button>
          </div>
        ))}
      </div>

    </section>
  );
};
