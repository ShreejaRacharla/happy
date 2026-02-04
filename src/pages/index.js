import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { 
  Cake, 
  Gift, 
  PartyPopper, 
  Star, 
  Heart,
  Sparkles as SparkleIcon,
  Music,
  Flower2,
  HeartHandshake
} from 'lucide-react';
import Confetti from '../components/Confetti';
import FloatingHearts from '../components/FloatingHearts';
import Sparkles from '../components/Sparkles';

export default function Home() {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const [showCard, setShowCard] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    setTimeout(() => setShowCard(true), 500);
  }, []);

  const handleContinue = () => {
    router.push('/love');
  };

  const quotes = [
    "May your day be as special as you are! 🌟",
    "Wishing you a day filled with love and laughter! 💖",
    "May all your dreams come true today and always! ✨"
  ];

  const [currentQuote, setCurrentQuote] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center p-4 overflow-hidden">
      <Confetti />
      <FloatingHearts />
      <Sparkles />
      
      {/* Main Card */}
      <div 
        className={`relative z-10 max-w-lg w-full transform transition-all duration-1000 ${
          isVisible ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
        }`}
      >
        {/* Decorative Elements */}
        <div className="absolute -top-8 -left-8 animate-bounce-slow">
          <PartyPopper size={48} className="text-yellow-300" />
        </div>
        <div className="absolute -top-8 -right-8 animate-bounce-slow" style={{ animationDelay: '0.5s' }}>
          <Gift size={48} className="text-pink-300" />
        </div>
        <div className="absolute -bottom-8 -left-8 animate-wiggle">
          <Flower2 size={48} className="text-purple-300" />
        </div>
        <div className="absolute -bottom-8 -right-8 animate-spin-slow">
          <Star size={48} className="text-yellow-200 fill-yellow-200" />
        </div>

        {/* Card Content */}
        <div 
          className={`bg-white/90 backdrop-blur-lg rounded-3xl p-8 card-shadow transform transition-all duration-700 ${
            showCard ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          {/* Cake Icon */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <Cake 
                size={80} 
                className="text-pink-500 animate-float"
              />
              <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                <SparkleIcon size={24} className="text-yellow-400 animate-sparkle" />
              </div>
            </div>
          </div>

          {/* Happy Birthday Text */}
          <h1 className="text-black text-4xl md:text-5xl font-bold text-center mb-4 rainbow-text animate-pulse-slow">
            Happy Birthday My Love!
          </h1>

          {/* Stars decoration */}
          <div className="flex justify-center gap-2 mb-6">
            {[...Array(5)].map((_, i) => (
              <HeartHandshake 
                key={i}
                size={24} 
                className="text-yellow-400 fill-yellow-400 animate-wiggle"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>

          {/* Quote Section */}
          <div className="bg-gradient-to-r from-pink-100 to-purple-100 rounded-2xl p-6 mb-6 relative overflow-hidden">
            <div className="absolute top-2 left-2">
              <Heart size={16} className="text-pink-400 fill-pink-400 animate-heartbeat" />
            </div>
            <div className="absolute bottom-2 right-2">
              <Heart size={16} className="text-pink-400 fill-pink-400 animate-heartbeat" />
            </div>
            <p className="text-center text-lg md:text-xl text-gray-700 font-medium italic transition-all duration-500">
              "{quotes[currentQuote]}"
            </p>
          </div>

          {/* Musical Notes Animation */}
          <div className="flex justify-center gap-4 mb-6">
            <Music size={24} className="text-purple-500 animate-bounce" />
            <Music size={20} className="text-pink-500 animate-bounce" style={{ animationDelay: '0.2s' }} />
            <Music size={28} className="text-indigo-500 animate-bounce" style={{ animationDelay: '0.4s' }} />
          </div>

          {/* Special Message */}
          <div className="text-center mb-6">
            <p className="text-gray-600 text-lg">
              On this special day, I have something to ask you...
            </p>
          </div>

          {/* Continue Button */}
          <button
            onClick={handleContinue}
            className="w-full py-4 px-8 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white font-bold text-xl rounded-full transform hover:scale-105 transition-all duration-300 hover:shadow-xl glow animate-pulse-slow flex items-center justify-center gap-3"
          >
            <Heart className="animate-heartbeat" />
            <span>Click to Continue</span>
            <Heart className="animate-heartbeat" />
          </button>

          {/* Footer Hearts */}
          <div className="flex justify-center gap-2 mt-6">
            {[...Array(7)].map((_, i) => (
              <Heart 
                key={i}
                size={16} 
                className="text-pink-400 fill-pink-400 animate-heartbeat"
                style={{ animationDelay: `${i * 0.15}s` }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}