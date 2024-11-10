'use client';

import { motion } from 'framer-motion';
import { useStoryStore } from '@/store/story';
import { UNIVERSE_SETTINGS } from '@/types/constants';
import { useState, useEffect } from 'react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const cardVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
  hover: { 
    y: -5,
    scale: 1.02,
    transition: { type: 'spring', stiffness: 300 }
  }
};

export function UniverseSelect() {
  const { settings, setSettings, setCustomSetting } = useStoryStore();
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [customValue, setCustomValue] = useState(settings.customUniverse || '');

  useEffect(() => {
    // Show custom input if there's a custom value
    if (settings.universe === 'custom' && settings.customUniverse) {
      setShowCustomInput(true);
      setCustomValue(settings.customUniverse);
    }
  }, [settings.universe, settings.customUniverse]);

  const handleSelect = (type: keyof typeof UNIVERSE_SETTINGS | 'custom') => {
    if (type === 'custom') {
      setShowCustomInput(true);
    } else {
      setSettings({ 
        universe: type,
        customUniverse: undefined // Clear custom value when selecting preset
      });
      setShowCustomInput(false);
      setCustomValue('');
    }
  };

  const handleCustomSubmit = () => {
    if (customValue.trim()) {
      setCustomSetting('universe', customValue);
      
      // Show confirmation animation
      const card = document.querySelector(`[data-custom-card]`);
      card?.classList.add('ring-2', 'ring-green-500', 'bg-green-500/10');
      
      // Transition to preview state
      setTimeout(() => {
        card?.classList.remove('ring-2', 'ring-green-500', 'bg-green-500/10');
        setShowCustomInput(false);
      }, 1000);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="space-y-8"
      >
        <div className="text-center space-y-4">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent"
          >
            Choose Your Universe
          </motion.h2>
          <p className="text-muted-foreground">
            Select the world where your story takes place
          </p>
        </div>

        <motion.div 
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {Object.entries(UNIVERSE_SETTINGS).map(([key, universe]) => (
            <motion.div
              key={key}
              variants={cardVariants}
              whileHover="hover"
              onClick={() => handleSelect(key as keyof typeof UNIVERSE_SETTINGS)}
              className={`
                relative p-6 rounded-lg border cursor-pointer
                ${settings.universe === key 
                  ? 'border-purple-500 bg-purple-500/10' 
                  : 'border-border hover:border-purple-500/50 bg-background/50'}
                backdrop-blur-sm transition-colors
              `}
            >
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">{universe.name}</h3>
                <div className="flex flex-wrap gap-2">
                  {universe.variants.map((variant) => (
                    <span
                      key={variant}
                      className="px-2 py-1 rounded-full bg-purple-500/10 text-xs font-medium"
                    >
                      {variant}
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2">
                  {universe.elements.map((element) => (
                    <span
                      key={element}
                      className="px-2 py-1 rounded-full bg-pink-500/10 text-xs font-medium"
                    >
                      {element}
                    </span>
                  ))}
                </div>
              </div>
              {settings.universe === key && (
                <motion.div
                  layoutId="selection"
                  className="absolute inset-0 border-2 border-purple-500 rounded-lg"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </motion.div>
          ))}

          {/* Custom Universe Option */}
          <motion.div
            data-custom-card
            variants={cardVariants}
            whileHover="hover"
            onClick={() => handleSelect('custom')}
            className={`
              relative p-6 rounded-lg border cursor-pointer transition-all duration-300
              ${settings.universe === 'custom'
                ? 'border-purple-500 bg-purple-500/10' 
                : 'border-border hover:border-purple-500/50 bg-background/50'}
              ${showCustomInput ? 'border-purple-500 bg-purple-500/10' : ''}
              backdrop-blur-sm
            `}
          >
            {!showCustomInput ? (
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Custom Universe</h3>
                {settings.customUniverse ? (
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Current Setting:</p>
                    <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                      <p className="text-sm break-words whitespace-pre-wrap max-w-full">
                        {settings.customUniverse}
                      </p>
                    </div>
                    <div className="flex gap-2 justify-end">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setShowCustomInput(true)}
                        className="text-sm text-muted-foreground hover:text-purple-500 transition-colors"
                      >
                        Edit
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          setSettings({ 
                            universe: undefined,
                            customUniverse: undefined 
                          });
                          setCustomValue('');
                        }}
                        className="text-sm text-muted-foreground hover:text-pink-500 transition-colors"
                      >
                        Remove
                      </motion.button>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    Create your own unique world setting
                  </p>
                )}
              </div>
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-4"
              >
                <input
                  type="text"
                  value={customValue}
                  onChange={(e) => setCustomValue(e.target.value)}
                  placeholder="Describe your universe..."
                  className="w-full bg-background/50 border border-purple-500/20 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500/50 overflow-hidden text-ellipsis"
                  onKeyDown={(e) => e.key === 'Enter' && handleCustomSubmit()}
                  autoFocus
                />
                <div className="flex justify-end gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={() => {
                      setShowCustomInput(false);
                      setCustomValue('');
                    }}
                    className="px-3 py-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleCustomSubmit}
                    disabled={!customValue.trim()}
                    className="px-3 py-1 text-sm bg-purple-500 text-white rounded-md hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
                  >
                    Confirm
                  </motion.button>
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
