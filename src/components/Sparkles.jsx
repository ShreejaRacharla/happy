import { Sparkles as SparkleIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Sparkles() {
  const [sparkles, setSparkles] = useState([]);

  useEffect(() => {
    const sparkleArray = [];
    for (let i = 0; i < 30; i++) {
      sparkleArray.push({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * 3,
        size: 12 + Math.random() * 20
      });
    }
    setSparkles(sparkleArray);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {sparkles.map((sparkle) => (
        <div
          key={sparkle.id}
          className="absolute animate-sparkle"
          style={{
            left: `${sparkle.left}%`,
            top: `${sparkle.top}%`,
            animationDelay: `${sparkle.delay}s`
          }}
        >
          <SparkleIcon 
            size={sparkle.size} 
            className="text-yellow-300"
          />
        </div>
      ))}
    </div>
  );
}