import { useState, useCallback, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './ValentineProposal.css';

const NO_REACTIONS = [
  "Nope, wrong button! 😘",
  "You sure about that? 🤨",
  "BFFR That button doesn't work! 😂",
  "MOOOOOVEEE MANNN!!!",
  "Jus press the other one now 😭",
];

const YES_REACTIONS = [
  { text: "Wait... you actually said yes?! 😳", btn: "I said YES!" },
  { text: "No way... are you sure? 🤯", btn: "Yes I'm sure!" },
  { text: "Like... really really sure? 🥺", btn: "Really really sure!" },
  { text: "OKAY THAT MEANS I'M FORGIVEN FOR BEING LATE!! 😌", btn: null },
];

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

const HeartParticle = ({ delay }) => {
  const randomX = useMemo(() => Math.random() * 100, []);
  const randomSize = useMemo(() => Math.random() * 18 + 8, []);
  const randomDuration = useMemo(() => Math.random() * 6 + 8, []);
  const randomSway = useMemo(() => (Math.random() - 0.5) * 80, []);

  return (
    <motion.span
      className="heart-particle"
      style={{ left: `${randomX}%`, fontSize: `${randomSize}px` }}
      initial={{ y: '100vh', opacity: 0, rotate: 0 }}
      animate={{
        y: '-10vh',
        opacity: [0, 0.7, 0.7, 0],
        x: [0, randomSway, randomSway * 0.5, randomSway * 1.2],
        rotate: [0, randomSway > 0 ? 45 : -45],
      }}
      transition={{ duration: randomDuration, delay, repeat: Infinity, ease: 'linear' }}
    >
      ♥
    </motion.span>
  );
};

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

const ValentineProposal = ({ onAccept }) => {
  const [noPos, setNoPos] = useState(null);
  const [noAttempts, setNoAttempts] = useState(0);
  const [yesScale, setYesScale] = useState(1);
  const [noReaction, setNoReaction] = useState('');
  const [noGone, setNoGone] = useState(false);
  const [yesStep, setYesStep] = useState(-1);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (yesStep === YES_REACTIONS.length - 1) {
      const timer = setTimeout(() => onAccept(), 1800);
      return () => clearTimeout(timer);
    }
  }, [yesStep, onAccept]);

  const moveNoButton = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    const next = noAttempts + 1;
    setNoAttempts(next);
    setYesScale(Math.min(1.4, 1 + next * 0.08));
    setNoReaction(NO_REACTIONS[next % NO_REACTIONS.length]);
    if (next >= 6) { setNoGone(true); return; }

    const card = document.querySelector('.proposal-card');
    const yesBtn = document.querySelector('.btn-yes');
    const cardRect = card?.getBoundingClientRect();
    const yesRect = yesBtn?.getBoundingClientRect();

    let x, y;
    let attempts = 0;
    const maxAttempts = 50;
    const btnW = 100;
    const btnH = 50;
    const pad = 80;
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    do {
      x = pad + Math.random() * (vw - pad * 2);
      y = pad + Math.random() * (vh - pad * 2);
      attempts++;

      let valid = true;

      // Check card overlap
      if (cardRect) {
        const noCardOverlap =
          x + btnW < cardRect.left - 20 ||
          x - btnW > cardRect.right + 20 ||
          y + btnH < cardRect.top - 20 ||
          y - btnH > cardRect.bottom + 20;
        if (!noCardOverlap) valid = false;
      }

      // Check yes button overlap with generous padding
      if (valid && yesRect) {
        const noYesOverlap =
          x + btnW < yesRect.left - 40 ||
          x - btnW > yesRect.right + 40 ||
          y + btnH < yesRect.top - 40 ||
          y - btnH > yesRect.bottom + 40;
        if (!noYesOverlap) valid = false;
      }

      if (valid) break;
    } while (attempts < maxAttempts);

    setNoPos({ x, y });
  }, [noAttempts]);

  const handleYes = useCallback(() => {
    if (yesStep < YES_REACTIONS.length - 1) setYesStep((s) => s + 1);
  }, [yesStep]);

  const hearts = useMemo(() => Array.from({ length: 40 }, (_, i) => ({ id: i, delay: (i / 40) * 12 })), []);

  const inYesFlow = yesStep >= 0;
  const currentYes = inYesFlow ? YES_REACTIONS[yesStep] : null;

  return (
    <div className="proposal">
      <div className="proposal-bg" />

      {/* Floating hearts */}
      <div className="hearts-layer">
        {hearts.map((h) => (
          <HeartParticle key={h.id} delay={h.delay} />
        ))}
      </div>

      {/* Floating photos — all 9 images */}
      <div className="hearts-layer">
        {BG_PHOTOS.map((src, i) => (
          <FloatingPhoto key={i} src={src} index={i} />
        ))}
      </div>

      <AnimatePresence>
        {showContent && (
          <motion.div
            className="proposal-card"
            initial={{ opacity: 0, y: 60, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.p
              className="proposal-label"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Valentine's Day 2026
            </motion.p>

            <motion.div
              className="proposal-heart-icon"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, type: 'spring', stiffness: 200, damping: 12 }}
            >
              <motion.span
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
              >
                ♥
              </motion.span>
            </motion.div>

            <motion.h1
              className="proposal-title"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              Will you be my
              <br />
              <span className="highlight">Valentine?</span>
            </motion.h1>

            {/* Buttons row */}
            {!inYesFlow && (
              <motion.div
                className="btn-row"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0, duration: 0.5 }}
              >
                <motion.div
                  className="yes-wrap"
                  animate={{ scale: yesScale }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <motion.button
                    className="btn-yes"
                    onClick={handleYes}
                    whileTap={{ scale: 0.92 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    Yes!
                  </motion.button>
                </motion.div>

                <AnimatePresence>
                  {!noGone && !noPos && (
                    <motion.button
                      className="btn-no"
                      onPointerDown={moveNoButton}
                      onTouchStart={moveNoButton}
                      exit={{ opacity: 0, scale: 0, transition: { duration: 0.2 } }}
                      whileTap={{ scale: 0.92 }}
                    >
                      No
                    </motion.button>
                  )}
                </AnimatePresence>
              </motion.div>
            )}

            {/* Reaction area - fixed height so card doesn't jump */}
            <div className="reaction-area">
              {/* Yes reaction flow */}
              <AnimatePresence mode="wait">
                {inYesFlow && currentYes && (
                  <motion.div
                    key={yesStep}
                    className="yes-reaction"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <p className="yes-reaction-text">{currentYes.text}</p>
                    {currentYes.btn && (
                      <motion.button
                        className="btn-yes"
                        onClick={handleYes}
                        whileTap={{ scale: 0.92 }}
                        whileHover={{ scale: 1.05 }}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        {currentYes.btn}
                      </motion.button>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* No-button reaction text */}
              {!inYesFlow && (
                <AnimatePresence mode="wait">
                  {noReaction && !noGone && (
                    <motion.p
                      key={noReaction}
                      className="reaction"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.3 }}
                    >
                      {noReaction}
                    </motion.p>
                  )}
                  {noGone && (
                    <motion.p
                      key="gone"
                      className="reaction gone"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    >
                      That's what I thought! Now tap Yes 💕
                    </motion.p>
                  )}
                </AnimatePresence>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* No button floating */}
      <AnimatePresence>
        {showContent && !noGone && noPos && !inYesFlow && (
          <motion.button
            className="btn-no btn-no-floating"
            onPointerDown={moveNoButton}
            onTouchStart={moveNoButton}
            animate={{
              left: noPos.x, top: noPos.y, opacity: 1,
              scale: Math.max(0.5, 1 - noAttempts * 0.08),
            }}
            exit={{
              opacity: 0, scale: 0, rotate: 720,
              transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
            }}
            transition={{ type: 'spring', stiffness: 400, damping: 25, mass: 0.8 }}
          >
            No
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ValentineProposal;
