import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import ValentineProposal from './components/ValentineProposal';
import RomanticMessages from './components/RomanticMessages';
import Schedule from './components/Schedule';
import './App.css';

function App() {
  const accepted = localStorage.getItem('valentine-accepted') === 'true';
  const [stage, setStage] = useState(accepted ? 'schedule' : 'proposal');

  const handleAccept = () => {
    localStorage.setItem('valentine-accepted', 'true');
    setStage('messages');
  };

  return (
    <div className="app">
      <AnimatePresence mode="wait">
        {stage === 'proposal' && (
          <motion.div
            key="proposal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <ValentineProposal onAccept={handleAccept} />
          </motion.div>
        )}

        {stage === 'messages' && (
          <motion.div
            key="messages"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <RomanticMessages onComplete={() => setStage('schedule')} />
          </motion.div>
        )}

        {stage === 'schedule' && (
          <motion.div
            key="schedule"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <Schedule />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
