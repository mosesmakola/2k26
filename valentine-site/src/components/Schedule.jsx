import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Schedule.css';

const EVENT1_IMAGES = [
  '/images/event 1 images/sneakpeak1.png',
  '/images/event 1 images/sneakpeak2.jpg',
  '/images/event 1 images/Candlelight_concert.jpg',
  '/images/event 1 images/NUUUSCsY.jpeg',
  '/images/event 1 images/18181LSP_SiB3_LSP6349.jpg.avif',
  '/images/event 1 images/Screenshot 2026-02-11 at 03.26.52.png',
  '/images/event 1 images/Screenshot 2026-02-11 at 03.27.09.png',
  '/images/event 1 images/Screenshot 2026-02-11 at 03.28.01.png',
  '/images/event 1 images/Screenshot 2026-02-11 at 03.28.20.png',
  '/images/event 1 images/Screenshot 2026-02-11 at 03.28.46.png',
  '/images/event 1 images/Screenshot 2026-02-11 at 03.29.21.png',
];

const EVENT1_SNEAK = [
  '/images/event 1 images/sneakpeak1.png',
  '/images/event 1 images/sneakpeak2.jpg',
];

const EVENT2_IMAGES = [
  '/images/event 2 images/sneakpeak1.jpg',
  '/images/event 2 images/sneakpeak2.jpg',
  '/images/event 2 images/park-chinois-bar-cocktails-lounge-496x300.png',
  '/images/event 2 images/https---www.humphreymunson.co.uk-app-uploads-2023-10-Park-Chinois-Humphrey-Munson-Blog-3.jpg.webp',
  '/images/event 2 images/Screenshot 2026-02-11 at 03.31.58.png',
  '/images/event 2 images/Screenshot 2026-02-11 at 03.32.10.png',
  '/images/event 2 images/Screenshot 2026-02-11 at 03.32.21.png',
  '/images/event 2 images/Screenshot 2026-02-11 at 03.33.00.png',
  '/images/event 2 images/Screenshot 2026-02-11 at 03.33.25.png',
];

const EVENT2_SNEAK = [
  '/images/event 2 images/sneakpeak1.jpg',
  '/images/event 2 images/sneakpeak2.jpg',
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

const CountdownUnit = ({ value, label }) => (
  <div className="cd-unit">
    <AnimatePresence mode="wait">
      <motion.span
        key={value}
        className="cd-value"
        initial={{ y: 8, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -8, opacity: 0 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
      >
        {String(value).padStart(2, '0')}
      </motion.span>
    </AnimatePresence>
    <span className="cd-label">{label}</span>
  </div>
);

const ImageGallery = ({ images, onImageClick }) => (
  <div className="img-gallery">
    {images.map((src, i) => (
      <motion.div
        key={i}
        className="gallery-thumb"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: i * 0.05, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        onClick={() => onImageClick(src)}
        whileTap={{ scale: 0.95 }}
      >
        <img src={src} alt="" loading="lazy" />
      </motion.div>
    ))}
  </div>
);

const LockedCard = ({ countdown, teaser, preRevealText, sneakImages }) => (
  <div className="locked">
    <motion.div
      className="lock-visual"
      animate={{ y: [0, -4, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
    >
      <motion.div
        className="lock-circle"
        initial={{ scale: 0, rotate: -20 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.2 }}
      >
        <span className="lock-emoji">&#128274;</span>
      </motion.div>
    </motion.div>

    {countdown && (
      <motion.div
        className="countdown"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="cd-heading">Reveals in</p>
        <div className="cd-row">
          {countdown.days > 0 && <CountdownUnit value={countdown.days} label="days" />}
          <CountdownUnit value={countdown.hours} label="hrs" />
          <CountdownUnit value={countdown.minutes} label="min" />
          <CountdownUnit value={countdown.seconds} label="sec" />
        </div>
      </motion.div>
    )}

    <motion.p
      className="locked-teaser"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.6 }}
    >
      {teaser}
    </motion.p>

    {preRevealText && (
      <motion.div
        className="pre-reveal-text"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <p>{preRevealText}</p>
      </motion.div>
    )}

    {sneakImages && sneakImages.length > 0 && (
      <motion.div
        className="locked-gallery"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="gallery-label">A little sneak peek...</p>
        <div className="sneak-gallery">
          {sneakImages.map((src, i) => (
            <motion.div
              key={i}
              className="sneak-thumb"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.9 + i * 0.15, duration: 0.4 }}
              whileHover={{ scale: 1.05 }}
            >
              <img src={src} alt="" loading="lazy" />
            </motion.div>
          ))}
        </div>
      </motion.div>
    )}

  </div>
);

const ImageLightbox = ({ src, onClose }) => (
  <AnimatePresence>
    {src && (
      <motion.div
        className="lightbox-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={onClose}
      >
        <motion.div
          className="lightbox-content"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          onClick={(e) => e.stopPropagation()}
        >
          <button className="lightbox-close" onClick={onClose}>✕</button>
          <img src={src} alt="" />
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

const ChangedMindDialog = ({ open, onClose }) => (
  <AnimatePresence>
    {open && (
      <motion.div
        className="dialog-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={onClose}
      >
        <motion.div
          className="dialog-card"
          initial={{ opacity: 0, scale: 0.85, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.85, y: 30 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="dialog-emoji">💔</div>
          <h3 className="dialog-title">Changed your mind?</h3>
          <p className="dialog-text">
            It's okay... I can handle the rejection.
            <br />
            I'll just be over here... crying... alone...
          </p>
          <motion.button
            className="dialog-btn"
            onClick={onClose}
            whileTap={{ scale: 0.95 }}
          >
            No, I was just joking! 😘
          </motion.button>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

const Schedule = () => {
  const [now, setNow] = useState(new Date());
  const [showDialog, setShowDialog] = useState(false);
  const [lightboxImg, setLightboxImg] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const forceVisible = localStorage.getItem('itinerary-visible') === 'true';

  const satReveal = useMemo(() => new Date('2026-02-14T13:00:00'), []);
  const sunReveal = useMemo(() => new Date('2026-02-15T17:00:00'), []);
  const sunSneakReveal = useMemo(() => new Date('2026-02-14T23:59:00'), []);

  const satRevealed = forceVisible || now >= satReveal;
  const sunRevealed = forceVisible || now >= sunReveal;
  const sunSneakRevealed = forceVisible || now >= sunSneakReveal;

  const getCountdown = (target) => {
    const diff = target - now;
    if (diff <= 0) return null;
    return {
      days: Math.floor(diff / 86400000),
      hours: Math.floor((diff % 86400000) / 3600000),
      minutes: Math.floor((diff % 3600000) / 60000),
      seconds: Math.floor((diff % 60000) / 1000),
    };
  };

  const stagger = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
  };
  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <div className="schedule">
      <div className="schedule-bg" />

      {/* Changed your mind button - top right */}
      <motion.button
        className="changed-mind-btn-top"
        onClick={() => setShowDialog(true)}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        Changed your mind?
      </motion.button>

      {/* Floating hearts */}
      <div className="sched-deco">
        {[...Array(20)].map((_, i) => (
          <motion.span
            key={i}
            className="sched-heart"
            style={{
              left: `${5 + Math.random() * 90}%`,
              top: `${5 + Math.random() * 90}%`,
              fontSize: `${Math.random() * 16 + 8}px`,
            }}
            animate={{ y: [0, -18, 0], opacity: [0.12, 0.28, 0.12] }}
            transition={{
              duration: Math.random() * 4 + 4,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: 'easeInOut',
            }}
          >
            &#9829;
          </motion.span>
        ))}
      </div>

      {/* Floating couple photos in background */}
      <div className="sched-deco">
        {BG_PHOTOS.map((src, i) => (
          <motion.div
            key={`photo-${i}`}
            className="sched-floating-photo"
            style={{
              left: `${5 + (i % 5) * 20}%`,
              top: `${10 + Math.floor(i / 5) * 40 + (i % 2 === 0 ? 0 : 20)}%`,
              backgroundImage: `url("${src}")`,
            }}
            animate={{ y: [0, -15, 0], rotate: [0, 3, -3, 0], opacity: [0.08, 0.15, 0.08] }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              delay: i * 1.2,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      <motion.header
        className="sched-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.p
          className="sched-label"
          initial={{ opacity: 0, letterSpacing: '0.3em' }}
          animate={{ opacity: 1, letterSpacing: '0.15em' }}
          transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          Your Weekend
        </motion.p>
        <motion.h1
          className="sched-title"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          Valentine's Itinerary
        </motion.h1>
        <motion.div
          className="sched-title-line"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.6, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        />
      </motion.header>

      <motion.div className="sched-cards" variants={stagger} initial="hidden" animate="show">
        {/* Saturday */}
        <motion.section className="day" variants={fadeUp}>
          <motion.div
            className="day-badge"
            whileHover={{ scale: 1.08, rotate: -3 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 15 }}
          >
            <span className="day-badge-num">14</span>
            <span className="day-badge-month">FEB</span>
          </motion.div>
          <div className="day-content">
            <motion.h2
              className="day-name"
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              Saturday
            </motion.h2>
            {satRevealed ? (
              <motion.div className="timeline" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                <motion.div
                  className="tl-item"
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="tl-dot" />
                  <div className="tl-info">
                    <span className="tl-tag">Dinner</span>
                    <h3 className="tl-place">Bond Street Station</h3>
                    <p className="tl-detail">Casual but not too casual</p>
                  </div>
                </motion.div>
                <motion.div
                  className="tl-connector"
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ delay: 0.3, duration: 0.4, ease: 'easeOut' }}
                  style={{ transformOrigin: 'top' }}
                />
                <motion.div
                  className="tl-item"
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="tl-dot accent" />
                  <div className="tl-info">
                    <span className="tl-tag special-tag">Special Event</span>
                    <h3 className="tl-place">Piccadilly</h3>
                    <p className="tl-detail">A surprise awaits...</p>
                  </div>
                </motion.div>
                <ImageGallery images={EVENT1_IMAGES} onImageClick={setLightboxImg} />
              </motion.div>
            ) : (
              <LockedCard
                countdown={getCountdown(satReveal)}
                teaser="Something exciting is planned..."
                preRevealText="Be ready to leave by 4pm. You will meet me at the location yet to be revealed."
                sneakImages={EVENT1_SNEAK}
              />
            )}
          </div>
        </motion.section>

        {/* Sunday */}
        <motion.section className="day" variants={fadeUp}>
          <motion.div
            className="day-badge sunday-badge"
            whileHover={{ scale: 1.08, rotate: 3 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 15 }}
          >
            <span className="day-badge-num">15</span>
            <span className="day-badge-month">FEB</span>
          </motion.div>
          <div className="day-content">
            <motion.h2
              className="day-name"
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              Sunday
            </motion.h2>
            {sunRevealed ? (
              <motion.div className="timeline" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                <motion.div
                  className="tl-item special"
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="tl-dot accent" />
                  <div className="tl-info">
                    <span className="tl-tag special-tag">Dinner Date</span>
                    <h3 className="tl-place">Location: Shh... <span className="shh">&#129323;</span></h3>
                    <p className="tl-detail chauffeur-text">Chauffeur provided &#8212; just look pretty</p>
                    <p className="tl-detail dress-text">Dress code: Night out</p>
                  </div>
                </motion.div>
                <ImageGallery images={EVENT2_IMAGES} onImageClick={setLightboxImg} />
              </motion.div>
            ) : (
              <LockedCard
                countdown={getCountdown(sunReveal)}
                teaser="This one's a special surprise..."
                preRevealText="Your chauffeur will be ready to collect you from 7pm. Be on time!"
                sneakImages={sunSneakRevealed ? EVENT2_SNEAK : null}
              />
            )}
          </div>
        </motion.section>
      </motion.div>

      <ChangedMindDialog open={showDialog} onClose={() => setShowDialog(false)} />
      <ImageLightbox src={lightboxImg} onClose={() => setLightboxImg(null)} />
    </div>
  );
};

export default Schedule;
