import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { 
  Heart, 
  HeartCrack,
  Sparkles,
  Stars
} from 'lucide-react';
import FloatingHearts from '../components/FloatingHearts';
import Confetti from '../components/Confetti';

export default function LovePage() {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [noButtonScale, setNoButtonScale] = useState(1);
  const [yesButtonSize, setYesButtonSize] = useState(1);
  const [noHoverCount, setNoHoverCount] = useState(0);
  const [showMessage, setShowMessage] = useState('');
  const [isNoRunning, setIsNoRunning] = useState(false);
  const [noButtonVisible, setNoButtonVisible] = useState(true);
  const containerRef = useRef(null);

  const funnyMessages = [
    "Haha, nice try! 😜",
    "You can't catch me! 🏃‍♂️",
    "Are you sure? Think again! 💭",
    "Oops! Wrong button! 😅",
    "The answer should be YES! 💕",
    "Come on, you know you love me! 😘",
    "Try the other button! 💖",
    "I'm too fast for you! ⚡",
    "Just click YES already! 🥺",
    "You're making this hard! 😤"
  ];

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const moveNoButton = () => {
    if (!containerRef.current) return;

    const container = containerRef.current.getBoundingClientRect();
    const buttonWidth = 150;
    const buttonHeight = 60;
    
    const maxX = container.width - buttonWidth - 20;
    const maxY = container.height - buttonHeight - 20;
    
    const newX = Math.random() * maxX - maxX / 2;
    const newY = Math.random() * maxY - maxY / 2;

    setNoButtonPosition({ x: newX, y: newY });
    setNoHoverCount((prev) => prev + 1);
    setYesButtonSize((prev) => Math.min(prev + 0.15, 2.5));
    setNoButtonScale((prev) => Math.max(prev - 0.1, 0.3));
    setIsNoRunning(true);
    setShowMessage(funnyMessages[Math.floor(Math.random() * funnyMessages.length)]);

    setTimeout(() => setIsNoRunning(false), 300);
    setTimeout(() => setShowMessage(''), 2000);

    // Hide No button after many attempts
    if (noHoverCount >= 8) {
      setNoButtonVisible(false);
      setShowMessage("Fine, I'll just disappear! Click YES! 👻");
    }
  };

  const handleYesClick = () => {
    router.push('/celebration');
  };

  const handleNoClick = () => {
    moveNoButton();
  };

  return (
    <div 
      ref={containerRef}
      className="min-h-screen gradient-bg flex items-center justify-center p-4 overflow-hidden relative"
    >
      <FloatingHearts />
      <Confetti />

      {/* Floating Sparkles */}
      <div className="absolute top-10 left-10 animate-sparkle">
        <Sparkles size={40} className="text-yellow-300" />
      </div>
      <div className="absolute top-10 right-10 animate-sparkle" style={{ animationDelay: '1s' }}>
        <Stars size={40} className="text-pink-300" />
      </div>
      <div className="absolute bottom-10 left-10 animate-sparkle" style={{ animationDelay: '0.5s' }}>
        <Stars size={40} className="text-purple-300" />
      </div>
      <div className="absolute bottom-10 right-10 animate-sparkle" style={{ animationDelay: '1.5s' }}>
        <Sparkles size={40} className="text-yellow-300" />
      </div>

      {/* Main Card */}
      <div 
        className={`relative z-10 max-w-md w-full transform transition-all duration-1000 ${
          isVisible ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
        }`}
      >
        <div className="bg-white/95 backdrop-blur-lg rounded-3xl p-8 card-shadow">
          {/* Heart Icon */}
          <div className="flex justify-center mb-6">
            <Heart 
              size={100} 
              className="text-red-500 fill-red-500 animate-heartbeat drop-shadow-lg"
            />
          </div>

          {/* Question */}
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-2 text-glow">
            <span className="text-black rainbow-text">Do You Love Me?</span>
          </h1>

          {/* Subtitle */}
          <p className="text-center text-gray-500 mb-8 text-lg">
            Please answer honestly... 🥺
          </p>

          {/* Funny Message */}
          {showMessage && (
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-pink-500 text-white px-6 py-3 rounded-full animate-bounce shadow-lg z-50">
              <p className="font-bold text-lg">{showMessage}</p>
            </div>
          )}

          {/* Buttons Container */}
          <div className="relative h-40 flex items-center justify-center">
            {/* YES Button */}
            <button
              onClick={handleYesClick}
              className="absolute left-1/4 transform -translate-x-1/2 py-4 px-12 bg-gradient-to-r from-green-400 to-emerald-500 text-white font-bold text-xl rounded-full transition-all duration-300 hover:shadow-2xl button-glow flex items-center gap-2 z-20"
              style={{ 
                transform: `scale(${yesButtonSize})`,
                transition: 'transform 0.3s ease'
              }}
            >
              <Heart className="animate-heartbeat fill-white" size={24} />
              YES
              <Heart className="animate-heartbeat fill-white" size={24} />
            </button>

            {/* NO Button */}
            {noButtonVisible && (
              <button
                onMouseEnter={moveNoButton}
                onClick={handleNoClick}
                onTouchStart={moveNoButton}
                className={`absolute right-1/4 py-3 px-8 bg-gradient-to-r from-red-400 to-rose-500 text-white font-bold text-lg rounded-full transition-all duration-200 no-button-glow flex items-center gap-2 z-10 ${
                  isNoRunning ? 'animate-shake' : ''
                }`}
                style={{ 
                  transform: `translate(${noButtonPosition.x}px, ${noButtonPosition.y}px) scale(${noButtonScale})`,
                  transition: 'transform 0.2s ease-out'
                }}
              >
                <HeartCrack size={20} />
                No
              </button>
            )}
          </div>

          {/* Hover Count Display */}
          {noHoverCount > 0 && (
            <div className="text-center mt-4">
              <p className="text-pink-500 font-medium animate-pulse">
                {noHoverCount >= 5 
                  ? "Just give up and click YES! 💕" 
                  : `Attempts to click No: ${noHoverCount} 😏`
                }
              </p>
            </div>
          )}

          {/* Hidden message after no button disappears */}
          {!noButtonVisible && (
            <div className="text-center mt-4 animate-bounce">
              <p className="text-purple-600 font-bold text-lg">
                The No button ran away! 🏃‍♂️💨
              </p>
              <p className="text-pink-500 mt-2">
                Looks like YES is your only option now! 💖
              </p>
            </div>
          )}

          {/* Hearts decoration */}
          <div className="flex justify-center gap-3 mt-8">
            {[...Array(5)].map((_, i) => (
              <Heart 
                key={i}
                size={20} 
                className="text-pink-400 fill-pink-400 animate-heartbeat"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}