import { useEffect, useState } from 'react';

export default function Confetti({ intensity = 'normal' }) {
  const [confetti, setConfetti] = useState([]);

  useEffect(() => {
    const colors = [
      '#ff6b6b', '#feca57', '#48dbfb', '#ff9ff3', 
      '#54a0ff', '#5f27cd', '#00d2d3', '#ff9f43',
      '#ee5a24', '#0abde3', '#10ac84', '#f368e0'
    ];
    
    const count = intensity === 'intense' ? 80 : intensity === 'light' ? 30 : 50;
    
    const pieces = [];
    for (let i = 0; i < count; i++) {
      pieces.push({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 5,
        duration: 3 + Math.random() * 5,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: 6 + Math.random() * 14,
        shape: Math.random() > 0.6 ? 'circle' : Math.random() > 0.3 ? 'square' : 'star',
        rotateSpeed: Math.random() * 360
      });
    }
    setConfetti(pieces);
  }, [intensity]);

  const getShape = (shape, color, size) => {
    if (shape === 'star') {
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
          <polygon points="12,2 15,9 22,9 17,14 19,21 12,17 5,21 7,14 2,9 9,9" />
        </svg>
      );
    }
    return null;
  };

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {confetti.map((piece) => (
        <div
          key={piece.id}
          className="absolute"
          style={{
            left: `${piece.left}%`,
            top: '-30px',
            animation: `confetti ${piece.duration}s linear ${piece.delay}s infinite`,
          }}
        >
          {piece.shape === 'star' ? (
            getShape('star', piece.color, piece.size)
          ) : (
            <div
              style={{
                width: `${piece.size}px`,
                height: `${piece.size}px`,
                backgroundColor: piece.color,
                borderRadius: piece.shape === 'circle' ? '50%' : '3px',
                boxShadow: `0 0 ${piece.size / 2}px ${piece.color}40`
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
}