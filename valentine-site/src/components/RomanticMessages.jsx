import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './RomanticMessages.css';

const BG_PHOTOS = [
  '/images/background images/15E3F85D-DE13-438F-A143-88B46616C46E_1_105_c.jpeg',
  '/images/background images/2B73CF6C-F543-4C4E-8242-589934E684F6_1_102_o.jpeg',
  '/images/background images/51B32F3A-5438-48FE-ADED-46D59D56B5BD_1_105_c.jpeg',
  '/images/background images/79080D78-04F3-49AD-ACF4-8C468B654F76_1_105_c.jpeg',
  '/images/background images/860ED376-B135-4CF5-AD77-845991FE7BC1_1_102_o.jpeg',
  '/images/background images/97E23DC2-F92E-4028-A9A0-0DEC854A07FD_1_105_c.jpeg',
  '/images/background images/B21DA736-6BC1-4920-926F-A08D5EFFD8CD_1_105_c.jpeg',
  '/images/background images/C5092D9C-9881-4B09-9EE5-5DD070149B6F_1_102_o.jpeg',
  '/images/background images/FB1BCD46-8C28-46DE-B3C5-077C342091F6_1_102_o.jpeg',
];

const messages = [
  {
    title: "I knew you'd say yes",
    text: "Was there every any doubt😌",
    bg: ['#fce4ec', '#f8bbd0'],
    accent: '#ec4899',
    image: BG_PHOTOS[0],
  },
  {
    title: "THANK YOU",
    text: "Valentines day is a celebration of LOVE. Thank you for being who you are",
    bg: ['#fce4ec', '#f3e5f5'],
    accent: '#db2777',
    image: BG_PHOTOS[2],
  },
  {
    title: "Our Third Valentines...",
    text: "I've planned something special just for us...",
    bg: ['#fdf2f8', '#fce7f3'],
    accent: '#be185d',
    image: BG_PHOTOS[5],
  },
  {
    title: "Get ready",
    text: "For an unforgettable weekend together",
    bg: ['#fff1f2', '#ffe4e6'],
    accent: '#f43f5e',
    image: BG_PHOTOS[7],
  },
];

const Sparkle = ({ style }) => (
  <motion.span
    className="sparkle"
    style={style}
    initial={{ opacity: 0, scale: 0 }}
    animate={{
      opacity: [0, 1, 0],
      scale: [0, 1, 0],
      rotate: [0, 180],
    }}
    transition={{
      duration: 2,
      repeat: Infinity,
      delay: Math.random() * 3,
      ease: 'easeInOut',
    }}
  >
    +
  </motion.span>
);

const FloatingPhoto = ({ src, index }) => {
  const x = useMemo(() => 5 + Math.random() * 85, []);
  const y = useMemo(() => 5 + Math.random() * 85, []);
  const size = useMemo(() => 50 + Math.random() * 40, []);
  const dur = useMemo(() => 8 + Math.random() * 6, []);
  const del = useMemo(() => index * 1.2, [index]);

  return (
    <motion.div
      className="floating-photo"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: `${size}px`,
        height: `${size}px`,
        backgroundImage: `url("${src}")`,
      }}
      animate={{
        y: [0, -20, 0],
        rotate: [0, 5, -5, 0],
        opacity: [0.12, 0.22, 0.12],
      }}
      transition={{ duration: dur, delay: del, repeat: Infinity, ease: 'easeInOut' }}
    />
  );
};

const RomanticMessages = ({ onComplete }) => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const sparkles = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 90 + 5}%`,
        top: `${Math.random() * 90 + 5}%`,
        size: `${Math.random() * 16 + 10}px`,
      })),
    []
  );

  const msg = messages[current];
  const isLast = current === messages.length - 1;

  const handleNext = () => {
    if (isLast) {
      onComplete();
    } else {
      setDirection(1);
      setCurrent((prev) => prev + 1);
    }
  };

  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? 80 : -80,
      opacity: 0,
      scale: 0.96,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (dir) => ({
      x: dir > 0 ? -80 : 80,
      opacity: 0,
      scale: 0.96,
    }),
  };

  return (
    <div
      className="messages"
      style={{
        background: `linear-gradient(160deg, ${msg.bg[0]}, ${msg.bg[1]})`,
      }}
    >
      {/* Sparkles */}
      <div className="sparkles-layer">
        {sparkles.map((s) => (
          <Sparkle
            key={s.id}
            style={{ left: s.left, top: s.top, fontSize: s.size, color: msg.accent }}
          />
        ))}
      </div>

      {/* Floating photos — all 9 images */}
      <div className="sparkles-layer">
        {BG_PHOTOS.map((src, i) => (
          <FloatingPhoto key={i} src={src} index={i} />
        ))}
      </div>

      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={current}
          className="msg-card"
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <motion.div
            className="msg-number"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, type: 'spring', stiffness: 300, damping: 20 }}
            style={{ color: msg.accent }}
          >
            {String(current + 1).padStart(2, '0')}
          </motion.div>

          {/* Photo inside the card */}
          {msg.image && (
            <motion.div
              className="msg-photo"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.05, type: 'spring', stiffness: 200, damping: 18 }}
            >
              <img src={msg.image} alt="" />
            </motion.div>
          )}

          <motion.h1
            className="msg-title"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            {msg.title}
          </motion.h1>

          <motion.div
            className="msg-divider"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.25, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            style={{ background: msg.accent }}
          />

          <motion.p
            className="msg-text"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            {msg.text}
          </motion.p>

          <motion.button
            className="msg-btn"
            onClick={handleNext}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.4 }}
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.03 }}
            style={{
              background: `linear-gradient(135deg, ${msg.accent}, ${msg.accent}dd)`,
            }}
          >
            {isLast ? "Show me the plan" : "Continue"}
            <motion.span
              className="btn-arrow"
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              {isLast ? ' ♥' : ' \u2192'}
            </motion.span>
          </motion.button>

          {/* Progress bar */}
          <div className="msg-progress">
            {messages.map((_, i) => (
              <motion.div
                key={i}
                className="progress-bar"
                animate={{
                  background: i <= current ? msg.accent : '#e0e0e0',
                  scaleX: i < current ? 1 : i === current ? 1 : 0.6,
                }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
              />
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default RomanticMessages;
