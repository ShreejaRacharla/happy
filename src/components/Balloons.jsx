import { motion } from 'framer-motion';

const balloonColors = [
  'from-pink-400 to-pink-600',
  'from-purple-400 to-purple-600',
  'from-blue-400 to-blue-600',
  'from-red-400 to-red-600',
  'from-yellow-400 to-yellow-600',
  'from-green-400 to-green-600',
];

export default function Balloons({ count = 8 }) {
  const balloons = Array.from({ length: count }, (_, i) => ({
    id: i,
    x: 5 + (i * 12),
    delay: i * 0.3,
    color: balloonColors[i % balloonColors.length],
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {balloons.map((balloon) => (
        <motion.div
          key={balloon.id}
          className="absolute bottom-0"
          style={{ left: `${balloon.x}%` }}
          initial={{ y: 200, opacity: 0 }}
          animate={{
            y: [-50, -80, -50],
            opacity: 1,
          }}
          transition={{
            y: {
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            },
            opacity: {
              duration: 0.5,
              delay: balloon.delay,
            },
          }}
        >
          <div className="relative">
            {/* Balloon */}
            <motion.div
              className={`w-12 h-16 rounded-full bg-gradient-to-b ${balloon.color} shadow-lg relative`}
              animate={{ rotate: [-5, 5, -5] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              {/* Shine effect */}
              <div className="absolute top-2 left-2 w-3 h-4 bg-white/40 rounded-full blur-sm" />
              {/* Knot */}
              <div className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gradient-to-b ${balloon.color} rounded-full`} />
            </motion.div>
            {/* String */}
            <svg className="absolute top-full left-1/2 -translate-x-1/2" width="20" height="80">
              <motion.path
                d="M10 0 Q 15 40 10 80"
                stroke="#d1d5db"
                strokeWidth="1.5"
                fill="none"
                animate={{
                  d: [
                    'M10 0 Q 15 40 10 80',
                    'M10 0 Q 5 40 10 80',
                    'M10 0 Q 15 40 10 80',
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              />
            </svg>
          </div>
        </motion.div>
      ))}
    </div>
  );
}