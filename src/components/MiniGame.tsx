import React, { useRef, useEffect, useState, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { 
  RotateCcw, 
  Trophy, 
  Star, 
  Zap, 
  Flame, 
  ChevronRight, 
  Sparkles
} from 'lucide-react';
import { sounds } from '../utils/audio';

interface Block {
  x: number;
  y: number;
  w: number;
  h: number;
  vx: number;
  vy: number;
  hp: number;
  maxHp: number;
  type: 'wood' | 'stone' | 'tnt';
  exploded?: boolean;
}

interface Pig {
  x: number;
  y: number;
  radius: number;
  vx: number;
  vy: number;
  hp: number;
  maxHp: number;
  type: 'minion' | 'helmet' | 'king';
  alive: boolean;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
  size: number;
}

interface FloatingText {
  x: number;
  y: number;
  text: string;
  color: string;
  life: number;
}

export const MiniGame: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Game UI State
  const [level, setLevel] = useState<number>(1);
  const [score, setScore] = useState<number>(0);
  const [highScore, setHighScore] = useState<number>(() => {
    return parseInt(localStorage.getItem('ab_pixel_highscore') || '12500', 10);
  });
  const [selectedBird, setSelectedBird] = useState<'red' | 'chuck' | 'bomb'>('red');
  const [gameWon, setGameWon] = useState<boolean>(false);
  const [gameLost, setGameLost] = useState<boolean>(false);
  const [stars, setStars] = useState<number>(0);
  const [birdsLeft, setBirdsLeft] = useState<number>(3);
  const [abilityUsed, setAbilityUsed] = useState<boolean>(false);

  // Internal Game Engine References
  const gameStateRef = useRef({
    bird: {
      x: 140,
      y: 310,
      vx: 0,
      vy: 0,
      radius: 16,
      state: 'slingshot' as 'slingshot' | 'dragging' | 'flying' | 'landed',
      type: 'red' as 'red' | 'chuck' | 'bomb',
      trail: [] as { x: number; y: number }[],
    },
    slingAnchor: { x: 140, y: 310 },
    dragPos: { x: 140, y: 310 },
    blocks: [] as Block[],
    pigs: [] as Pig[],
    particles: [] as Particle[],
    floatingTexts: [] as FloatingText[],
    shake: 0,
    isDragging: false,
    gravity: 0.38,
    groundY: 410,
  });

  // Level Loader
  const loadLevel = useCallback((lvl: number) => {
    const s = gameStateRef.current;
    s.bird = {
      x: 140,
      y: 310,
      vx: 0,
      vy: 0,
      radius: selectedBird === 'bomb' ? 18 : selectedBird === 'chuck' ? 15 : 16,
      state: 'slingshot',
      type: selectedBird,
      trail: [],
    };
    s.particles = [];
    s.floatingTexts = [];
    s.shake = 0;
    s.isDragging = false;
    setGameWon(false);
    setGameLost(false);
    setStars(0);
    setAbilityUsed(false);
    setBirdsLeft(3);

    if (lvl === 1) {
      // Level 1: Piggy Watchtower
      s.blocks = [
        // Base foundation
        { x: 520, y: 370, w: 20, h: 40, vx: 0, vy: 0, hp: 50, maxHp: 50, type: 'wood' },
        { x: 600, y: 370, w: 20, h: 40, vx: 0, vy: 0, hp: 50, maxHp: 50, type: 'wood' },
        // Beam
        { x: 510, y: 350, w: 120, h: 20, vx: 0, vy: 0, hp: 40, maxHp: 40, type: 'wood' },
        // Middle level with TNT
        { x: 555, y: 315, w: 30, h: 35, vx: 0, vy: 0, hp: 10, maxHp: 10, type: 'tnt' },
        // Upper pillars
        { x: 520, y: 290, w: 20, h: 60, vx: 0, vy: 0, hp: 50, maxHp: 50, type: 'wood' },
        { x: 600, y: 290, w: 20, h: 60, vx: 0, vy: 0, hp: 50, maxHp: 50, type: 'wood' },
        // Roof
        { x: 505, y: 270, w: 130, h: 20, vx: 0, vy: 0, hp: 40, maxHp: 40, type: 'wood' },
      ];
      s.pigs = [
        { x: 565, y: 390, radius: 18, vx: 0, vy: 0, hp: 30, maxHp: 30, type: 'minion', alive: true },
        { x: 565, y: 250, radius: 18, vx: 0, vy: 0, hp: 30, maxHp: 30, type: 'minion', alive: true },
      ];
    } else if (lvl === 2) {
      // Level 2: TNT Redoubt
      s.blocks = [
        // Heavy stone base
        { x: 480, y: 360, w: 30, h: 50, vx: 0, vy: 0, hp: 120, maxHp: 120, type: 'stone' },
        { x: 550, y: 360, w: 30, h: 50, vx: 0, vy: 0, hp: 10, maxHp: 10, type: 'tnt' },
        { x: 620, y: 360, w: 30, h: 50, vx: 0, vy: 0, hp: 120, maxHp: 120, type: 'stone' },
        // Long beam
        { x: 470, y: 340, w: 190, h: 20, vx: 0, vy: 0, hp: 50, maxHp: 50, type: 'wood' },
        // Second tier TNT
        { x: 510, y: 290, w: 30, h: 50, vx: 0, vy: 0, hp: 50, maxHp: 50, type: 'wood' },
        { x: 555, y: 305, w: 30, h: 35, vx: 0, vy: 0, hp: 10, maxHp: 10, type: 'tnt' },
        { x: 600, y: 290, w: 30, h: 50, vx: 0, vy: 0, hp: 50, maxHp: 50, type: 'wood' },
        // Top beam
        { x: 495, y: 270, w: 145, h: 20, vx: 0, vy: 0, hp: 40, maxHp: 40, type: 'wood' },
      ];
      s.pigs = [
        { x: 515, y: 390, radius: 18, vx: 0, vy: 0, hp: 30, maxHp: 30, type: 'minion', alive: true },
        { x: 570, y: 250, radius: 20, vx: 0, vy: 0, hp: 60, maxHp: 60, type: 'helmet', alive: true },
        { x: 670, y: 390, radius: 18, vx: 0, vy: 0, hp: 30, maxHp: 30, type: 'minion', alive: true },
      ];
    } else {
      // Level 3: King Pig Citadel
      s.blocks = [
        // Tier 1 Stone
        { x: 460, y: 350, w: 35, h: 60, vx: 0, vy: 0, hp: 140, maxHp: 140, type: 'stone' },
        { x: 540, y: 375, w: 30, h: 35, vx: 0, vy: 0, hp: 10, maxHp: 10, type: 'tnt' },
        { x: 620, y: 350, w: 35, h: 60, vx: 0, vy: 0, hp: 140, maxHp: 140, type: 'stone' },
        // Tier 1 Platform
        { x: 450, y: 330, w: 220, h: 20, vx: 0, vy: 0, hp: 60, maxHp: 60, type: 'wood' },
        // Tier 2 Columns
        { x: 490, y: 260, w: 25, h: 70, vx: 0, vy: 0, hp: 60, maxHp: 60, type: 'wood' },
        { x: 600, y: 260, w: 25, h: 70, vx: 0, vy: 0, hp: 60, maxHp: 60, type: 'wood' },
        // Tier 2 Platform
        { x: 480, y: 240, w: 160, h: 20, vx: 0, vy: 0, hp: 50, maxHp: 50, type: 'wood' },
        // Top Shrine Pillars
        { x: 520, y: 190, w: 20, h: 50, vx: 0, vy: 0, hp: 70, maxHp: 70, type: 'stone' },
        { x: 580, y: 190, w: 20, h: 50, vx: 0, vy: 0, hp: 70, maxHp: 70, type: 'stone' },
        // Crown Roof
        { x: 505, y: 170, w: 110, h: 20, vx: 0, vy: 0, hp: 40, maxHp: 40, type: 'wood' },
      ];
      s.pigs = [
        { x: 480, y: 310, radius: 18, vx: 0, vy: 0, hp: 30, maxHp: 30, type: 'minion', alive: true },
        { x: 615, y: 310, radius: 20, vx: 0, vy: 0, hp: 60, maxHp: 60, type: 'helmet', alive: true },
        { x: 555, y: 145, radius: 25, vx: 0, vy: 0, hp: 120, maxHp: 120, type: 'king', alive: true },
      ];
    }
  }, [selectedBird]);

  useEffect(() => {
    loadLevel(level);
  }, [level, loadLevel]);

  // Special Bird Ability Trigger (Mid-Air)
  const triggerMidAirAbility = useCallback(() => {
    const s = gameStateRef.current;
    if (s.bird.state !== 'flying' || abilityUsed) return;

    if (s.bird.type === 'chuck') {
      // Chuck Supersonic Boost
      s.bird.vx *= 2.4;
      s.bird.vy *= 0.5;
      sounds.playBirdCry('chuck');
      setAbilityUsed(true);
      // Spawn yellow sparks
      for (let i = 0; i < 20; i++) {
        s.particles.push({
          x: s.bird.x,
          y: s.bird.y,
          vx: (Math.random() - 0.5) * 6,
          vy: (Math.random() - 0.5) * 6,
          life: 25,
          maxLife: 25,
          color: '#ffd166',
          size: Math.random() * 5 + 3,
        });
      }
    } else if (s.bird.type === 'bomb') {
      // Bomb Thermal Explode immediately
      explodeBomb(s.bird.x, s.bird.y);
      setAbilityUsed(true);
    }
  }, [abilityUsed]);

  // TNT & Bomb Explosion Physics
  const explodeBomb = (ex: number, ey: number) => {
    const s = gameStateRef.current;
    sounds.playTntExplosion();
    s.shake = 18;

    // Push blocks away
    s.blocks.forEach((b) => {
      const dx = (b.x + b.w / 2) - ex;
      const dy = (b.y + b.h / 2) - ey;
      const dist = Math.hypot(dx, dy);
      if (dist < 140) {
        const force = (140 - dist) * 0.16;
        b.vx += (dx / (dist || 1)) * force;
        b.vy += (dy / (dist || 1)) * force - 3;
        b.hp -= 90;
        if (b.type === 'tnt' && !b.exploded) {
          b.exploded = true;
          setTimeout(() => explodeBomb(b.x + b.w / 2, b.y + b.h / 2), 100);
        }
      }
    });

    // Damage & launch pigs
    s.pigs.forEach((pig) => {
      if (!pig.alive) return;
      const dx = pig.x - ex;
      const dy = pig.y - ey;
      const dist = Math.hypot(dx, dy);
      if (dist < 150) {
        const force = (150 - dist) * 0.18;
        pig.vx += (dx / (dist || 1)) * force;
        pig.vy += (dy / (dist || 1)) * force - 4;
        pig.hp -= 120;
        if (pig.hp <= 0) {
          popPig(pig);
        }
      }
    });

    // Particle Fireball
    for (let i = 0; i < 40; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 8 + 2;
      s.particles.push({
        x: ex,
        y: ey,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 30,
        maxLife: 30,
        color: i % 2 === 0 ? '#ff5400' : '#ffd166',
        size: Math.random() * 6 + 3,
      });
    }

    s.floatingTexts.push({
      x: ex,
      y: ey - 10,
      text: 'BOOOOM!',
      color: '#ffd166',
      life: 40,
    });
  };

  // Pop Pig Animation & Score
  const popPig = (pig: Pig) => {
    pig.alive = false;
    sounds.playPigPop();
    const s = gameStateRef.current;

    const points = pig.type === 'king' ? 10000 : pig.type === 'helmet' ? 6000 : 3000;
    setScore((prev) => {
      const next = prev + points;
      if (next > highScore) {
        setHighScore(next);
        localStorage.setItem('ab_pixel_highscore', next.toString());
      }
      return next;
    });

    // Floating text
    s.floatingTexts.push({
      x: pig.x,
      y: pig.y - 10,
      text: `+${points}`,
      color: '#ffd166',
      life: 45,
    });

    // Smoke & Feather particles (Green & White)
    for (let i = 0; i < 25; i++) {
      s.particles.push({
        x: pig.x,
        y: pig.y,
        vx: (Math.random() - 0.5) * 6,
        vy: (Math.random() - 0.5) * 6 - 2,
        life: 35,
        maxLife: 35,
        color: i % 2 === 0 ? '#22c55e' : '#fff7ed',
        size: Math.random() * 5 + 3,
      });
    }

    // Check if all pigs cleared
    const remainingPigs = s.pigs.filter((p) => p.alive);
    if (remainingPigs.length === 0) {
      setTimeout(() => {
        sounds.playVictoryFanfare();
        setGameWon(true);
        const earnedStars = birdsLeft >= 2 ? 3 : birdsLeft === 1 ? 2 : 1;
        setStars(earnedStars);
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#e63946', '#ffd166', '#f59e0b', '#22c55e']
        });
      }, 500);
    }
  };

  // Main Canvas Render & Physics Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const render = () => {
      const s = gameStateRef.current;

      // Screen shake decay
      if (s.shake > 0) {
        ctx.save();
        const dx = (Math.random() - 0.5) * s.shake;
        const dy = (Math.random() - 0.5) * s.shake;
        ctx.translate(dx, dy);
        s.shake *= 0.88;
        if (s.shake < 0.5) s.shake = 0;
      }

      // 1. Draw Retro Sunset Sky (Golden Amber, Warm Terracotta, Strictly NO BLUE, NO PURPLE)
      const skyGrad = ctx.createLinearGradient(0, 0, 0, canvas.height);
      skyGrad.addColorStop(0, '#541c0d');
      skyGrad.addColorStop(0.35, '#923c10');
      skyGrad.addColorStop(0.7, '#d97706');
      skyGrad.addColorStop(0.92, '#f59e0b');
      skyGrad.addColorStop(1, '#ffd166');
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Distant warm mountains & sun
      ctx.fillStyle = '#fef08a';
      ctx.beginPath();
      ctx.arc(380, 260, 45, 0, Math.PI * 2);
      ctx.fill();

      // Mountain silhouettes (Dark earthy amber)
      ctx.fillStyle = '#421a0c';
      ctx.beginPath();
      ctx.moveTo(0, 410);
      ctx.lineTo(120, 280);
      ctx.lineTo(260, 410);
      ctx.lineTo(440, 260);
      ctx.lineTo(600, 410);
      ctx.lineTo(720, 300);
      ctx.lineTo(800, 410);
      ctx.closePath();
      ctx.fill();

      // Foreground Hills
      ctx.fillStyle = '#261408';
      ctx.beginPath();
      ctx.ellipse(200, 430, 280, 80, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(600, 430, 320, 90, 0, 0, Math.PI * 2);
      ctx.fill();

      // Grassy Ground (Warm retro green with pixel border)
      ctx.fillStyle = '#15803d';
      ctx.fillRect(0, s.groundY, canvas.width, canvas.height - s.groundY);
      ctx.fillStyle = '#22c55e';
      ctx.fillRect(0, s.groundY, canvas.width, 8);
      ctx.fillStyle = '#14532d';
      ctx.fillRect(0, s.groundY + 8, canvas.width, 4);

      // 2. Draw Trajectory Path if Dragging
      if (s.bird.state === 'dragging') {
        const pullX = s.slingAnchor.x - s.dragPos.x;
        const pullY = s.slingAnchor.y - s.dragPos.y;
        let simX = s.dragPos.x;
        let simY = s.dragPos.y;
        let simVx = pullX * 0.16;
        let simVy = pullY * 0.16;

        ctx.fillStyle = '#ffd166';
        for (let i = 0; i < 28; i++) {
          simX += simVx;
          simY += simVy;
          simVy += s.gravity;
          if (simY > s.groundY) break;
          if (i % 2 === 0) {
            ctx.beginPath();
            ctx.arc(simX, simY, 3, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      // 3. Draw Slingshot Back Band
      ctx.strokeStyle = '#78350f';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(s.slingAnchor.x - 12, s.slingAnchor.y - 18);
      ctx.lineTo(s.bird.x, s.bird.y);
      ctx.stroke();

      // 4. Draw Slingshot Wood Fork
      ctx.fillStyle = '#854d0e';
      ctx.fillRect(s.slingAnchor.x - 6, s.slingAnchor.y, 12, 100);
      ctx.fillStyle = '#b45309';
      ctx.fillRect(s.slingAnchor.x - 4, s.slingAnchor.y + 2, 4, 96);

      // Slingshot Prongs
      ctx.fillStyle = '#854d0e';
      ctx.fillRect(s.slingAnchor.x - 16, s.slingAnchor.y - 25, 8, 25);
      ctx.fillRect(s.slingAnchor.x + 8, s.slingAnchor.y - 25, 8, 25);

      // 5. Draw Flight Trail
      if (s.bird.trail.length > 1) {
        ctx.strokeStyle = 'rgba(254, 240, 138, 0.4)';
        ctx.lineWidth = 3;
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.moveTo(s.bird.trail[0].x, s.bird.trail[0].y);
        for (let i = 1; i < s.bird.trail.length; i++) {
          ctx.lineTo(s.bird.trail[i].x, s.bird.trail[i].y);
        }
        ctx.stroke();
        ctx.setLineDash([]);
      }

      // 6. Draw The Bird
      ctx.save();
      ctx.translate(s.bird.x, s.bird.y);
      if (s.bird.state === 'flying') {
        const angle = Math.atan2(s.bird.vy, s.bird.vx);
        ctx.rotate(angle);
      }

      // Pixel Bird Render
      if (s.bird.type === 'chuck') {
        // Chuck (Yellow Triangle)
        ctx.fillStyle = '#ffd166';
        ctx.beginPath();
        ctx.moveTo(s.bird.radius + 4, 0);
        ctx.lineTo(-s.bird.radius, -s.bird.radius);
        ctx.lineTo(-s.bird.radius, s.bird.radius);
        ctx.closePath();
        ctx.fill();
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Eye & Beak
        ctx.fillStyle = '#fff';
        ctx.fillRect(2, -6, 5, 5);
        ctx.fillStyle = '#000';
        ctx.fillRect(4, -5, 2, 3);
        ctx.fillStyle = '#f97316';
        ctx.fillRect(8, -2, 7, 4);
      } else if (s.bird.type === 'bomb') {
        // Bomb (Black Ball with Fuse)
        ctx.fillStyle = '#18181b';
        ctx.beginPath();
        ctx.arc(0, 0, s.bird.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 2;
        ctx.stroke();

        // White dot on forehead
        ctx.fillStyle = '#fff';
        ctx.fillRect(-2, -10, 4, 3);
        // Fuse spark
        ctx.fillStyle = '#f59e0b';
        ctx.fillRect(-2, -16, 4, 4);
        ctx.fillStyle = '#ef4444';
        ctx.fillRect(0, -18, 2, 2);

        // Eyes & Beak
        ctx.fillStyle = '#ea580c';
        ctx.fillRect(0, -5, 6, 2);
        ctx.fillStyle = '#fff';
        ctx.fillRect(2, -3, 4, 4);
        ctx.fillStyle = '#dc2626';
        ctx.fillRect(4, -2, 2, 2);
        ctx.fillStyle = '#f59e0b';
        ctx.fillRect(6, 0, 5, 4);
      } else {
        // Red Bird (Cardinal)
        ctx.fillStyle = '#e63946';
        ctx.beginPath();
        ctx.arc(0, 0, s.bird.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Cream belly
        ctx.fillStyle = '#fef08a';
        ctx.beginPath();
        ctx.arc(0, 4, s.bird.radius * 0.65, 0, Math.PI);
        ctx.fill();

        // Black Brows & Eyes
        ctx.fillStyle = '#000';
        ctx.fillRect(-4, -8, 12, 3);
        ctx.fillStyle = '#fff';
        ctx.fillRect(-2, -5, 5, 5);
        ctx.fillRect(4, -5, 5, 5);
        ctx.fillStyle = '#000';
        ctx.fillRect(1, -4, 2, 3);
        ctx.fillStyle = '#f59e0b';
        ctx.fillRect(4, 0, 7, 5);
      }
      ctx.restore();

      // 7. Draw Slingshot Front Band
      ctx.strokeStyle = '#b45309';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(s.slingAnchor.x + 12, s.slingAnchor.y - 18);
      ctx.lineTo(s.bird.x, s.bird.y);
      ctx.stroke();

      // 8. Draw Blocks (Wood, Stone, TNT)
      s.blocks.forEach((b) => {
        if (b.hp <= 0) return;

        ctx.save();
        ctx.translate(b.x, b.y);

        if (b.type === 'tnt') {
          // TNT Block
          ctx.fillStyle = '#dc2626';
          ctx.fillRect(0, 0, b.w, b.h);
          ctx.strokeStyle = '#000';
          ctx.lineWidth = 2;
          ctx.strokeRect(0, 0, b.w, b.h);

          // TNT Label
          ctx.fillStyle = '#fef08a';
          ctx.fillRect(2, b.h / 2 - 6, b.w - 4, 12);
          ctx.fillStyle = '#000';
          ctx.font = 'bold 9px monospace';
          ctx.textAlign = 'center';
          ctx.fillText('TNT', b.w / 2, b.h / 2 + 3);
        } else if (b.type === 'stone') {
          // Stone Block
          ctx.fillStyle = '#78716c';
          ctx.fillRect(0, 0, b.w, b.h);
          ctx.strokeStyle = '#292524';
          ctx.lineWidth = 2;
          ctx.strokeRect(0, 0, b.w, b.h);
          // Highlight
          ctx.fillStyle = '#a8a29e';
          ctx.fillRect(2, 2, b.w - 4, 3);
        } else {
          // Wood Block
          ctx.fillStyle = '#b45309';
          ctx.fillRect(0, 0, b.w, b.h);
          ctx.strokeStyle = '#592e0e';
          ctx.lineWidth = 2;
          ctx.strokeRect(0, 0, b.w, b.h);
          // Wood grain line
          ctx.fillStyle = '#78350f';
          ctx.fillRect(4, b.h / 2, b.w - 8, 2);
        }

        // Damage cracks
        if (b.hp < b.maxHp * 0.6) {
          ctx.strokeStyle = '#000';
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(2, 2);
          ctx.lineTo(b.w / 2, b.h / 2);
          ctx.lineTo(b.w - 2, b.h - 2);
          ctx.stroke();
        }

        ctx.restore();
      });

      // 9. Draw Pigs
      s.pigs.forEach((pig) => {
        if (!pig.alive) return;

        ctx.save();
        ctx.translate(pig.x, pig.y);

        // Body (Emerald Green)
        ctx.fillStyle = '#22c55e';
        ctx.beginPath();
        ctx.arc(0, 0, pig.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#15803d';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Ears
        ctx.fillStyle = '#15803d';
        ctx.fillRect(-pig.radius + 2, -pig.radius - 2, 5, 5);
        ctx.fillRect(pig.radius - 7, -pig.radius - 2, 5, 5);

        // Eyes (Track the bird!)
        const dx = s.bird.x - pig.x;
        const dy = s.bird.y - pig.y;
        const dist = Math.hypot(dx, dy);
        const lookX = dist > 0 ? (dx / dist) * 2 : 0;
        const lookY = dist > 0 ? (dy / dist) * 2 : 0;

        // Eye whites
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.arc(-pig.radius * 0.35, -pig.radius * 0.2, pig.radius * 0.28, 0, Math.PI * 2);
        ctx.arc(pig.radius * 0.35, -pig.radius * 0.2, pig.radius * 0.28, 0, Math.PI * 2);
        ctx.fill();

        // Pupils
        ctx.fillStyle = '#000';
        ctx.beginPath();
        ctx.arc(-pig.radius * 0.35 + lookX, -pig.radius * 0.2 + lookY, pig.radius * 0.12, 0, Math.PI * 2);
        ctx.arc(pig.radius * 0.35 + lookX, -pig.radius * 0.2 + lookY, pig.radius * 0.12, 0, Math.PI * 2);
        ctx.fill();

        // Snout
        ctx.fillStyle = '#16a34a';
        ctx.beginPath();
        ctx.ellipse(0, pig.radius * 0.25, pig.radius * 0.45, pig.radius * 0.3, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#14532d';
        ctx.fillRect(-4, pig.radius * 0.2, 2, 3);
        ctx.fillRect(2, pig.radius * 0.2, 2, 3);

        // Helmet or King Crown
        if (pig.type === 'helmet') {
          ctx.fillStyle = '#78716c';
          ctx.beginPath();
          ctx.arc(0, -pig.radius * 0.5, pig.radius * 0.9, Math.PI, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = '#57534e';
          ctx.fillRect(-pig.radius * 0.9, -pig.radius * 0.5, pig.radius * 1.8, 4);
        } else if (pig.type === 'king') {
          ctx.fillStyle = '#f59e0b';
          ctx.beginPath();
          ctx.moveTo(-12, -pig.radius);
          ctx.lineTo(-8, -pig.radius - 10);
          ctx.lineTo(-2, -pig.radius - 4);
          ctx.lineTo(2, -pig.radius - 12);
          ctx.lineTo(8, -pig.radius - 4);
          ctx.lineTo(12, -pig.radius);
          ctx.closePath();
          ctx.fill();
          ctx.strokeStyle = '#b45309';
          ctx.stroke();
        }

        ctx.restore();
      });

      // 10. Draw Particles
      for (let i = s.particles.length - 1; i >= 0; i--) {
        const p = s.particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.15; // gravity
        p.life--;

        if (p.life <= 0) {
          s.particles.splice(i, 1);
          continue;
        }

        ctx.fillStyle = p.color;
        ctx.fillRect(p.x, p.y, p.size, p.size);
      }

      // 11. Draw Floating Score Text
      for (let i = s.floatingTexts.length - 1; i >= 0; i--) {
        const ft = s.floatingTexts[i];
        ft.y -= 0.8;
        ft.life--;

        if (ft.life <= 0) {
          s.floatingTexts.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.font = 'bold 14px "Press Start 2P", monospace';
        ctx.fillStyle = ft.color;
        ctx.shadowColor = '#000';
        ctx.shadowBlur = 4;
        ctx.fillText(ft.text, ft.x, ft.y);
        ctx.restore();
      }

      // 12. Physics Integration for Bird Flight & Collisions
      if (s.bird.state === 'flying') {
        s.bird.x += s.bird.vx;
        s.bird.y += s.bird.vy;
        s.bird.vy += s.gravity;

        // Record trail
        if (Math.random() > 0.4) {
          s.bird.trail.push({ x: s.bird.x, y: s.bird.y });
          if (s.bird.trail.length > 25) s.bird.trail.shift();
        }

        // Check ground collision
        if (s.bird.y + s.bird.radius >= s.groundY) {
          s.bird.y = s.groundY - s.bird.radius;
          s.bird.vy = -s.bird.vy * 0.3;
          s.bird.vx *= 0.6;
          sounds.playHit('wood');

          if (s.bird.type === 'bomb') {
            explodeBomb(s.bird.x, s.bird.y);
            handleBirdDone();
          } else if (Math.hypot(s.bird.vx, s.bird.vy) < 0.8) {
            handleBirdDone();
          }
        }

        // Check right boundary
        if (s.bird.x > canvas.width + 40) {
          handleBirdDone();
        }

        // Check collision with blocks
        s.blocks.forEach((b) => {
          if (b.hp <= 0) return;
          if (
            s.bird.x + s.bird.radius > b.x &&
            s.bird.x - s.bird.radius < b.x + b.w &&
            s.bird.y + s.bird.radius > b.y &&
            s.bird.y - s.bird.radius < b.y + b.h
          ) {
            const impactSpeed = Math.hypot(s.bird.vx, s.bird.vy);
            sounds.playHit(b.type === 'stone' ? 'stone' : 'wood');

            // Apply impact to block
            b.hp -= impactSpeed * 8;
            b.vx += s.bird.vx * 0.4;
            b.vy += s.bird.vy * 0.4;

            // Deflect bird
            s.bird.vx *= 0.4;
            s.bird.vy *= -0.3;

            // Trigger Bomb detonation or TNT
            if (s.bird.type === 'bomb') {
              explodeBomb(s.bird.x, s.bird.y);
              handleBirdDone();
            } else if (b.type === 'tnt' && !b.exploded) {
              b.exploded = true;
              explodeBomb(b.x + b.w / 2, b.y + b.h / 2);
            }

            // Spawn splinter particles
            for (let i = 0; i < 8; i++) {
              s.particles.push({
                x: s.bird.x,
                y: s.bird.y,
                vx: (Math.random() - 0.5) * 5,
                vy: (Math.random() - 0.5) * 5,
                life: 20,
                maxLife: 20,
                color: b.type === 'stone' ? '#78716c' : '#b45309',
                size: 3,
              });
            }
          }
        });

        // Check collision with pigs
        s.pigs.forEach((pig) => {
          if (!pig.alive) return;
          const dx = s.bird.x - pig.x;
          const dy = s.bird.y - pig.y;
          const dist = Math.hypot(dx, dy);

          if (dist < s.bird.radius + pig.radius) {
            const impactSpeed = Math.hypot(s.bird.vx, s.bird.vy);
            pig.hp -= impactSpeed * 10;
            pig.vx += s.bird.vx * 0.5;
            pig.vy += s.bird.vy * 0.5;

            if (s.bird.type === 'bomb') {
              explodeBomb(s.bird.x, s.bird.y);
              handleBirdDone();
            } else if (pig.hp <= 0) {
              popPig(pig);
            }
          }
        });
      }

      // 13. Physics for Blocks & Pigs
      s.blocks.forEach((b) => {
        if (b.hp <= 0) return;
        b.x += b.vx;
        b.y += b.vy;
        b.vx *= 0.88;
        if (b.y + b.h < s.groundY) {
          b.vy += 0.25;
        } else {
          b.y = s.groundY - b.h;
          b.vy = 0;
        }
      });

      s.pigs.forEach((pig) => {
        if (!pig.alive) return;
        pig.x += pig.vx;
        pig.y += pig.vy;
        pig.vx *= 0.9;
        if (pig.y + pig.radius < s.groundY) {
          pig.vy += 0.25;
        } else {
          pig.y = s.groundY - pig.radius;
          pig.vy = 0;
        }
      });

      if (s.shake > 0) {
        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, []);

  // When a bird completes flight
  const handleBirdDone = () => {
    const s = gameStateRef.current;
    s.bird.state = 'landed';

    setTimeout(() => {
      setBirdsLeft((prev) => {
        const remaining = prev - 1;
        if (remaining <= 0) {
          // Check if any pig still alive
          const anyPigAlive = s.pigs.some((p) => p.alive);
          if (anyPigAlive) {
            setGameLost(true);
            sounds.playBlip(200, 0.2, 'sawtooth');
          }
        } else {
          // Reload next bird
          s.bird = {
            x: s.slingAnchor.x,
            y: s.slingAnchor.y,
            vx: 0,
            vy: 0,
            radius: selectedBird === 'bomb' ? 18 : selectedBird === 'chuck' ? 15 : 16,
            state: 'slingshot',
            type: selectedBird,
            trail: [],
          };
          setAbilityUsed(false);
        }
        return remaining;
      });
    }, 700);
  };

  // Slingshot Mouse/Touch Drag Controls
  const getCanvasCoords = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    if ('touches' in e) {
      return {
        x: (e.touches[0].clientX - rect.left) * scaleX,
        y: (e.touches[0].clientY - rect.top) * scaleY,
      };
    }
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  };

  const handlePointerDown = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const s = gameStateRef.current;
    if (s.bird.state === 'flying') {
      // Tap in mid-air activates ability!
      triggerMidAirAbility();
      return;
    }
    if (s.bird.state !== 'slingshot') return;

    const { x, y } = getCanvasCoords(e);
    const dist = Math.hypot(x - s.slingAnchor.x, y - s.slingAnchor.y);

    if (dist < 55) {
      s.isDragging = true;
      s.bird.state = 'dragging';
      sounds.playSlingshotPull(0.5);
    }
  };

  const handlePointerMove = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const s = gameStateRef.current;
    if (!s.isDragging || s.bird.state !== 'dragging') return;

    const { x, y } = getCanvasCoords(e);
    // Limit max pull radius
    const maxPull = 90;
    const dx = x - s.slingAnchor.x;
    const dy = y - s.slingAnchor.y;
    const dist = Math.hypot(dx, dy);

    if (dist > maxPull) {
      s.dragPos.x = s.slingAnchor.x + (dx / dist) * maxPull;
      s.dragPos.y = s.slingAnchor.y + (dy / dist) * maxPull;
    } else {
      s.dragPos.x = x;
      s.dragPos.y = y;
    }

    s.bird.x = s.dragPos.x;
    s.bird.y = s.dragPos.y;
  };

  const handlePointerUp = () => {
    const s = gameStateRef.current;
    if (!s.isDragging || s.bird.state !== 'dragging') return;
    s.isDragging = false;

    const pullX = s.slingAnchor.x - s.dragPos.x;
    const pullY = s.slingAnchor.y - s.dragPos.y;
    const pullDist = Math.hypot(pullX, pullY);

    if (pullDist > 15) {
      s.bird.state = 'flying';
      s.bird.vx = pullX * 0.18;
      s.bird.vy = pullY * 0.18;
      sounds.playSlingshotRelease();
      sounds.playBirdCry(s.bird.type);
    } else {
      // Cancel pull
      s.bird.state = 'slingshot';
      s.bird.x = s.slingAnchor.x;
      s.bird.y = s.slingAnchor.y;
    }
  };

  const switchBird = (type: 'red' | 'chuck' | 'bomb') => {
    sounds.playBlip(500, 0.05);
    setSelectedBird(type);
    const s = gameStateRef.current;
    s.bird.type = type;
    s.bird.radius = type === 'bomb' ? 18 : type === 'chuck' ? 15 : 16;
  };

  return (
    <section id="minigame" className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#231208] border-2 border-black mb-3">
          <Sparkles size={14} className="text-[#ffd166]" />
          <span className="font-arcade text-[10px] text-[#ffd166]">PLAYABLE 16-BIT MINI-GAME</span>
        </div>
        <h2 className="font-arcade text-2xl md:text-4xl text-[#fff7ed] mb-2">
          ARCADE <span className="text-[#e63946]">SLINGSHOT</span> MINI-GAME
        </h2>
        <p className="font-sans-pixel text-base md:text-lg text-[#d6c7b2]">
          Pull back the slingshot band, aim for weak structural supports, and release to topple the fortress!
        </p>
      </div>

      {/* Arcade Cabinet Frame */}
      <div className="pixel-border-gold bg-[#211108] p-3 md:p-6 shadow-[10px_10px_0_#000] max-w-5xl mx-auto">
        
        {/* Game HUD Bar */}
        <div className="bg-[#150a04] border-4 border-black p-3 mb-4 flex flex-wrap items-center justify-between gap-3">
          
          {/* Level Indicator */}
          <div className="flex items-center gap-2">
            <span className="pixel-badge badge-gold">LEVEL {level}</span>
            <div className="font-arcade text-xs text-[#fff7ed]">
              {level === 1 ? 'WATCHTOWER' : level === 2 ? 'TNT REDOUBT' : 'KING CITADEL'}
            </div>
          </div>

          {/* Scores */}
          <div className="flex items-center gap-4 font-arcade text-xs">
            <div>
              <span className="text-[#d6c7b2] mr-2">SCORE:</span>
              <span className="text-[#ffd166]">{score}</span>
            </div>
            <div>
              <span className="text-[#d6c7b2] mr-2">HIGH:</span>
              <span className="text-[#22c55e]">{highScore}</span>
            </div>
          </div>

          {/* Birds in Sling Queue */}
          <div className="flex items-center gap-2 font-arcade text-xs text-[#fff7ed]">
            <span>SHOTS:</span>
            <div className="flex items-center gap-1">
              {Array.from({ length: birdsLeft }).map((_, i) => (
                <div key={i} className="w-3.5 h-3.5 bg-[#e63946] border border-black" />
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                sounds.playBlip(300, 0.05);
                loadLevel(level);
              }}
              className="pixel-btn pixel-btn-wood text-[9px] py-1 px-2.5"
              title="Reset current level"
            >
              <RotateCcw size={12} />
              <span>RESTART</span>
            </button>
          </div>

        </div>

        {/* Canvas Display */}
        <div className="relative border-4 border-black bg-black rounded-none overflow-hidden aspect-[16/9] w-full">
          <canvas
            ref={canvasRef}
            width={800}
            height={450}
            className="w-full h-full cursor-crosshair select-none block"
            onMouseDown={handlePointerDown}
            onMouseMove={handlePointerMove}
            onMouseUp={handlePointerUp}
            onTouchStart={handlePointerDown}
            onTouchMove={handlePointerMove}
            onTouchEnd={handlePointerUp}
          />

          {/* Ability Hint Overlay */}
          {gameStateRef.current.bird.state === 'flying' && !abilityUsed && (
            <div className="absolute top-4 left-1/2 -translate-x-1/2 font-arcade text-[10px] md:text-xs text-[#ffd166] bg-black/85 border-2 border-black px-3 py-1.5 animate-bounce">
              ⚡ TAP ANYWHERE TO ACTIVATE {selectedBird.toUpperCase()} ABILITY!
            </div>
          )}

          {/* Victory Modal */}
          {gameWon && (
            <div className="absolute inset-0 bg-black/85 flex flex-col items-center justify-center p-6 text-center animate-in fade-in">
              <div className="pixel-border-gold bg-[#24130a] p-6 max-w-sm w-full">
                <Trophy size={48} className="text-[#ffd166] mx-auto mb-2 animate-bounce" />
                <h3 className="font-arcade text-lg md:text-xl text-[#ffd166] mb-2">LEVEL CLEARED!</h3>
                <p className="font-sans-pixel text-sm text-[#fff7ed] mb-4">
                  All greedy piggies have been annihilated!
                </p>

                {/* Stars Rating */}
                <div className="flex justify-center gap-2 text-[#f59e0b] mb-4">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <Star
                      key={i}
                      size={28}
                      className={i < stars ? 'fill-[#ffd166] text-[#ffd166]' : 'text-neutral-700'}
                    />
                  ))}
                </div>

                <div className="font-arcade text-xs text-[#fff7ed] mb-6">
                  FINAL SCORE: <span className="text-[#ffd166]">{score}</span>
                </div>

                <div className="flex flex-col gap-2">
                  {level < 3 ? (
                    <button
                      onClick={() => {
                        sounds.playBlip(700, 0.08);
                        setLevel(level + 1);
                      }}
                      className="pixel-btn pixel-btn-gold text-xs py-2.5"
                    >
                      <span>NEXT LEVEL</span>
                      <ChevronRight size={14} />
                    </button>
                  ) : (
                    <div className="font-arcade text-xs text-[#22c55e] py-2">
                      👑 ALL CITADELS CRUSHED! YOU ARE THE SLINGSHOT MASTER!
                    </div>
                  )}

                  <button
                    onClick={() => loadLevel(level)}
                    className="pixel-btn pixel-btn-wood text-xs py-2"
                  >
                    REPLAY LEVEL
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Defeat / Out of Birds Modal */}
          {gameLost && (
            <div className="absolute inset-0 bg-black/85 flex flex-col items-center justify-center p-6 text-center animate-in fade-in">
              <div className="pixel-border-red bg-[#24130a] p-6 max-w-sm w-full">
                <div className="font-arcade text-3xl mb-2">🐽</div>
                <h3 className="font-arcade text-lg text-[#e63946] mb-2">LEVEL FAILED!</h3>
                <p className="font-sans-pixel text-sm text-[#d6c7b2] mb-4">
                  The piggies snickered and kept the golden eggs!
                </p>

                <button
                  onClick={() => loadLevel(level)}
                  className="pixel-btn pixel-btn-red text-xs py-2.5 w-full"
                >
                  <RotateCcw size={14} />
                  <span>TRY AGAIN</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Bird Arsenal Switcher & Level Bar */}
        <div className="mt-4 pt-4 border-t-2 border-black flex flex-wrap items-center justify-between gap-4">
          
          {/* Bird Switcher */}
          <div className="flex items-center gap-2">
            <span className="font-arcade text-[10px] text-[#d6c7b2]">ACTIVE BIRD:</span>
            
            <button
              onClick={() => switchBird('red')}
              className={`pixel-btn text-[10px] py-1.5 px-3 ${
                selectedBird === 'red' ? 'pixel-btn-red' : 'pixel-btn-wood'
              }`}
            >
              <span>RED</span>
            </button>

            <button
              onClick={() => switchBird('chuck')}
              className={`pixel-btn text-[10px] py-1.5 px-3 ${
                selectedBird === 'chuck' ? 'pixel-btn-gold' : 'pixel-btn-wood'
              }`}
            >
              <Zap size={11} />
              <span>CHUCK (SPEED)</span>
            </button>

            <button
              onClick={() => switchBird('bomb')}
              className={`pixel-btn text-[10px] py-1.5 px-3 ${
                selectedBird === 'bomb' ? 'bg-[#18181b] text-white border-2 border-black shadow-[2px_2px_0_#000]' : 'pixel-btn-wood'
              }`}
            >
              <Flame size={11} className="text-[#ea580c]" />
              <span>BOMB (KABOOM)</span>
            </button>
          </div>

          {/* Level Switcher */}
          <div className="flex items-center gap-2">
            <span className="font-arcade text-[10px] text-[#d6c7b2]">SELECT LEVEL:</span>
            {[1, 2, 3].map((lvl) => (
              <button
                key={lvl}
                onClick={() => {
                  sounds.playBlip(400 + lvl * 80, 0.05);
                  setLevel(lvl);
                }}
                className={`font-arcade text-xs w-8 h-8 border-2 border-black flex items-center justify-center transition-all ${
                  level === lvl
                    ? 'bg-[#ffd166] text-black font-bold shadow-[2px_2px_0_#000]'
                    : 'bg-[#27150c] text-[#d6c7b2] hover:text-white'
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>

        </div>

      </div>

    </section>
  );
};
