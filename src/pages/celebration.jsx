import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { 
  Heart, 
  Sparkles, 
  PartyPopper, 
  Stars,
  Crown,
  Music,
  Gift,
  Cake
} from 'lucide-react';
import Confetti from '../components/Confetti';
import FloatingHearts from '../components/FloatingHearts';

export default function CelebrationPage() {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const [showElements, setShowElements] = useState([]);

  useEffect(() => {
    setIsVisible(true);
    
    // Stagger animation for elements
    const elements = ['crown', 'title', 'hearts', 'message', 'button'];
    elements.forEach((element, index) => {
      setTimeout(() => {
        setShowElements((prev) => [...prev, element]);
      }, index * 400);
    });
  }, []);

  const loveMessages = [
    "You've made my heart so happy! 💕",
    "I knew you'd say yes! 💖",
    "We're meant to be together! 💑",
    "Forever and always! 💞",
    "You're the best! 🌟"
  ];

  const [currentMessage, setCurrentMessage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % loveMessages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-600 flex items-center justify-center p-4 overflow-hidden relative">
      <Confetti />
      <FloatingHearts />

      {/* Extra celebration confetti */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <PartyPopper
            key={i}
            size={32}
            className="absolute text-yellow-300 animate-confetti"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Sparkles everywhere */}
      {[...Array(30)].map((_, i) => (
        <Sparkles
          key={i}
          size={24}
          className="absolute text-yellow-200 animate-sparkle"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2}s`
          }}
        />
      ))}

      {/* Main Content */}
      <div 
        className={`relative z-10 max-w-lg w-full transform transition-all duration-1000 ${
          isVisible ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
        }`}
      >
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-8 card-shadow relative overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500 to-purple-500" />
          </div>

          {/* Crown */}
          <div 
            className={`flex justify-center mb-4 transform transition-all duration-700 ${
              showElements.includes('crown') ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'
            }`}
          >
            <Crown 
              size={80} 
              className="text-yellow-500 fill-yellow-400 animate-bounce-slow drop-shadow-lg"
            />
          </div>

          {/* Title */}
          <div 
            className={`transform transition-all duration-700 ${
              showElements.includes('title') ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
              <span className="rainbow-text">Yay! 🎉</span>
            </h1>
            <h2 className="text-2xl md:text-3xl font-bold text-center text-pink-500 mb-4 animate-pulse">
              You Love Me! 💖
            </h2>
          </div>

          {/* Animated Hearts */}
          <div 
            className={`flex justify-center gap-4 mb-6 transform transition-all duration-700 ${
              showElements.includes('hearts') ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
            }`}
          >
            {[...Array(7)].map((_, i) => (
              <Heart
                key={i}
                size={32}
                className="text-red-500 fill-red-500 animate-heartbeat"
                style={{ animationDelay: `${i * 0.15}s` }}
              />
            ))}
          </div>

          {/* Rotating Message */}
          <div 
            className={`bg-gradient-to-r from-pink-100 via-purple-100 to-pink-100 rounded-2xl p-6 mb-6 transform transition-all duration-700 ${
              showElements.includes('message') ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            <p className="text-center text-xl md:text-2xl text-purple-700 font-medium transition-all duration-500">
              {loveMessages[currentMessage]}
            </p>
          </div>

          {/* Celebration Icons */}
          <div className="flex justify-center gap-6 mb-6">
            <Gift size={36} className="text-pink-500 animate-wiggle" />
            <Cake size={36} className="text-purple-500 animate-float" />
            <Music size={36} className="text-indigo-500 animate-bounce" />
            <Stars size={36} className="text-yellow-500 animate-spin-slow" />
          </div>

          {/* Special Message */}
          <div className="text-center mb-6">
            <p className="text-lg text-gray-600">
              Thank you for saying YES! 🥰
            </p>
            <p className="text-lg text-gray-600 mt-2">
              You've made this the best day ever! ✨
            </p>
          </div>

          {/* Start Over Button */}
          <button
            onClick={() => router.push('/')}
            className={`w-full py-4 px-8 bg-gradient-to-r from-pink-500 via-red-500 to-pink-500 text-white font-bold text-xl rounded-full transform hover:scale-105 transition-all duration-300 glow flex items-center justify-center gap-3 ${
              showElements.includes('button') ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            <Heart className="animate-heartbeat fill-white" />
            <span>Celebrate Again!</span>
            <Heart className="animate-heartbeat fill-white" />
          </button>

          {/* Footer decoration */}
          <div className="flex justify-center gap-2 mt-6">
            {['💕', '💖', '💗', '💓', '💞', '💝', '💘'].map((emoji, i) => (
              <span 
                key={i}
                className="text-2xl animate-bounce"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                {emoji}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}