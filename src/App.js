import React, { useEffect, useState, useRef } from 'react';
import './App.css';

const App = () => {
  const canvasRef = useRef(null);
  const [currentLyric, setCurrentLyric] = useState('');
  const [displayedLyric, setDisplayedLyric] = useState('');
  const startTimeRef = useRef(Date.now());

  const lyrics = [
    { time: 2, text: 'A face-on lover' },
    { time: 4, text: 'With a fire in his heart' },
    { time: 7, text: 'A man undercover' },
    { time: 9, text: 'But you tore me apart' },
    { time: 12, text: '' },
    { time: 13, text: 'Ooh-ooh' },
    { time: 16, text: "Now I've found a real love" },
    { time: 19, text: "You'll never fool me again" },
  ];

  const colors = [
    '#FF5050', '#5050FF', '#FFFF64', '#FF50FF', 
    '#50FFFF', '#FFFFFF', '#FFB464', '#FF96C8', '#64FF96'
  ];

  // Typewriter effect
  useEffect(() => {
    if (currentLyric === '') {
      setDisplayedLyric('');
      return;
    }

    let charIndex = 0;
    setDisplayedLyric('');

    const interval = setInterval(() => {
      if (charIndex < currentLyric.length) {
        setDisplayedLyric(currentLyric.substring(0, charIndex + 1));
        charIndex++;
      } else {
        clearInterval(interval);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [currentLyric]);

  // Lyrics timing
  useEffect(() => {
    const interval = setInterval(() => {
      const elapsed = (Date.now() - startTimeRef.current) / 1000;
      
      for (let i = lyrics.length - 1; i >= 0; i--) {
        if (elapsed >= lyrics[i].time) {
          if (currentLyric !== lyrics[i].text) {
            setCurrentLyric(lyrics[i].text);
          }
          break;
        }
      }
    }, 100);

    return () => clearInterval(interval);
  }, [currentLyric]);

  // Canvas animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Snowflakes
    class Snowflake {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height - canvas.height;
        this.speed = Math.random() * 1.5 + 0.5;
        this.size = Math.random() * 2 + 1;
        this.drift = Math.random() * 0.6 - 0.3;
      }

      fall() {
        this.y += this.speed;
        this.x += this.drift;
        if (this.y > canvas.height) {
          this.y = -10;
          this.x = Math.random() * canvas.width;
        }
      }

      draw() {
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.5})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Star ornament
    class StarOrnament {
      constructor(x, y, row) {
        this.x = x;
        this.y = y;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.blinkTimer = Math.random() * 120;
        this.brightness = 1;
        this.row = row;
      }

      update() {
        this.blinkTimer += 1;
        this.brightness = 0.6 + 0.4 * Math.abs(((this.blinkTimer % 120) - 60) / 60);

        if (this.blinkTimer > 180 && Math.random() < 0.01) {
          this.color = colors[Math.floor(Math.random() * colors.length)];
          this.blinkTimer = 0;
        }
      }

      draw() {
        const rgb = this.hexToRgb(this.color);
        const r = Math.floor(rgb.r * this.brightness);
        const g = Math.floor(rgb.g * this.brightness);
        const b = Math.floor(rgb.b * this.brightness);

        ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 4, 0, Math.PI * 2);
        ctx.fill();
      }

      hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16)
        } : { r: 255, g: 255, b: 255 };
      }
    }

    // Create tree
    const createTree = () => {
      const ornaments = [];
      const treeX = canvas.width / 2;
      const treeTop = 100;

      // Star on top
      ornaments.push(new StarOrnament(treeX, treeTop, 0));

      // Tree structure
      const structure = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 11, 12, 13, 14, 15];
      let yPos = treeTop + 20;
      const spacingY = 17;
      const spacingX = 11;

      structure.forEach((numStars, rowNum) => {
        for (let i = 0; i < numStars; i++) {
          const x = treeX + (i - numStars / 2 + 0.5) * spacingX;
          ornaments.push(new StarOrnament(x, yPos, rowNum));
        }
        yPos += spacingY;
      });

      // Trunk
      for (let row = 0; row < 3; row++) {
        for (let i = 0; i < 3; i++) {
          const x = treeX + (i - 1) * spacingX;
          const y = yPos + row * spacingY;
          ornaments.push(new StarOrnament(x, y, structure.length + row));
        }
      }

      return ornaments;
    };

    const snowflakes = Array.from({ length: 150 }, () => new Snowflake());
    const ornaments = createTree();

    // Animation loop
    const animate = () => {
      ctx.fillStyle = 'rgb(10, 10, 15)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw snowflakes
      snowflakes.forEach(snowflake => {
        snowflake.fall();
        snowflake.draw();
      });

      // Draw tree
      ornaments.forEach(ornament => {
        ornament.update();
        ornament.draw();
      });

      requestAnimationFrame(animate);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="app">
      <canvas ref={canvasRef} className="canvas"></canvas>
      <div className="lyrics-container">
        <p className="lyrics">{displayedLyric}</p>
      </div>
    </div>
  );
};

export default App;
