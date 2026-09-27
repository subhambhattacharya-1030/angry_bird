import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutLore } from './components/AboutLore';
import { GamesShowcase } from './components/GamesShowcase';
import { BirdsRoster } from './components/BirdsRoster';
import { MiniGame } from './components/MiniGame';
import { Community } from './components/Community';
import { Footer } from './components/Footer';
import { sounds } from './utils/audio';

function App() {
  const [crtActive, setCrtActive] = useState<boolean>(true);
  const [soundMuted, setSoundMuted] = useState<boolean>(false);

  useEffect(() => {
    // Sync initial sound state
    sounds.setMuted(soundMuted);
  }, [soundMuted]);

  const toggleCrt = () => {
    setCrtActive((prev) => !prev);
  };

  const toggleSound = () => {
    const isMutedNow = sounds.toggleMute();
    setSoundMuted(isMutedNow);
  };

  return (
    <div className={`min-h-screen bg-[#120b07] text-[#fff7ed] selection:bg-[#e63946] selection:text-white ${
      crtActive ? 'crt-overlay' : ''
    }`}>
      {/* Top Retro Navigation */}
      <Navbar
        crtActive={crtActive}
        onToggleCrt={toggleCrt}
        soundMuted={soundMuted}
        onToggleSound={toggleSound}
      />

      {/* Main Landing Sections */}
      <main>
        {/* 1. Hero with Interactive Slingshot & Stats */}
        <Hero />

        {/* 2. About Us / The Chronicles of Piggy Island */}
        <AboutLore />

        {/* 3. Games Showcase & Features */}
        <GamesShowcase />

        {/* 4. All Birds of Angry Birds & Their Abilities */}
        <BirdsRoster />

        {/* 5. Playable Miniature Angry Bird Game */}
        <MiniGame />

        {/* 6. Join Us Community & Leaderboard */}
        <Community />
      </main>

      {/* 7. Comprehensive Intact Footer */}
      <Footer />
    </div>
  );
}

export default App;
