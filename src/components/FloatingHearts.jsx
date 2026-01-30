import { Heart } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function FloatingHearts() {
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    const heartArray = [];
    for (let i = 0; i < 20; i++) {
      heartArray.push({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 5,
        duration: 4 + Math.random() * 4,
        size: 16 + Math.random() * 24,
        opacity: 0.3 + Math.random() * 0.5
      });
    }
    setHearts(heartArray);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute animate-float"
          style={{
            left: `${heart.left}%`,
            bottom: '-50px',
            animationDelay: `${heart.delay}s`,
            animationDuration: `${heart.duration}s`,
            opacity: heart.opacity
          }}
        >
          <Heart 
            size={heart.size} 
            className="text-pink-400 fill-pink-400"
          />
        </div>
      ))}
    </div>
  );
}