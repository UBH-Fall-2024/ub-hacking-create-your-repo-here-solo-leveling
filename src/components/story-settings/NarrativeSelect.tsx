'use client';

import { motion } from 'framer-motion';
import { useStoryStore } from '@/store/story';
import { NARRATIVE_STYLES } from '@/types/constants';
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

export function NarrativeSelect() {
  const { settings, setSettings, setCustomSetting } = useStoryStore();
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [customValue, setCustomValue] = useState(settings.customNarrativeStyle || '');

  useEffect(() => {
    if (settings.narrativeStyle === 'custom' && settings.customNarrativeStyle) {
      setShowCustomInput(true);
      setCustomValue(settings.customNarrativeStyle);
    }
  }, [settings.narrativeStyle, settings.customNarrativeStyle]);

  const handleSelect = (type: keyof typeof NARRATIVE_STYLES | 'custom') => {
    if (type === 'custom') {
      setShowCustomInput(true);
    } else {
      setSettings({ 
        narrativeStyle: type,
        customNarrativeStyle: undefined
      });
      setShowCustomInput(false);
      setCustomValue('');
    }
  };

  const handleCustomSubmit = () => {
    if (customValue.trim()) {
      setCustomSetting('narrativeStyle', customValue);
      
      // Show confirmation animation
      const card = document.querySelector(`[data-custom-narrative-card]`);
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
            Choose Your Story Style
          </motion.h2>
          <p className="text-muted-foreground">
            Select how your epic tale will be told
          </p>
        </div>

        <motion.div 
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {Object.entries(NARRATIVE_STYLES).map(([key, style]) => (
            <motion.div
              key={key}
              variants={cardVariants}
              whileHover="hover"
              onClick={() => handleSelect(key as keyof typeof NARRATIVE_STYLES)}
              className={`
                relative p-6 rounded-lg border cursor-pointer
                ${settings.narrativeStyle === key 
                  ? 'border-purple-500 bg-purple-500/10' 
                  : 'border-border hover:border-purple-500/50 bg-background/50'}
                backdrop-blur-sm transition-colors
              `}
            >
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">{style.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {style.tone}
                </p>
                <div className="flex flex-wrap gap-2">
                  {style.elements.map((element) => (
                    <span
                      key={element}
                      className="px-2 py-1 rounded-full bg-purple-500/10 text-xs font-medium"
                    >
                      {element}
                    </span>
                  ))}
                </div>
              </div>
              {settings.narrativeStyle === key && (
                <motion.div
                  layoutId="selection"
                  className="absolute inset-0 border-2 border-purple-500 rounded-lg"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </motion.div>
          ))}

          {/* Custom Style Option */}
          <motion.div
            data-custom-narrative-card
            variants={cardVariants}
            whileHover="hover"
            onClick={() => handleSelect('custom')}
            className={`
              relative p-6 rounded-lg border cursor-pointer transition-all duration-300
              ${settings.narrativeStyle === 'custom'
                ? 'border-purple-500 bg-purple-500/10' 
                : 'border-border hover:border-purple-500/50 bg-background/50'}
              ${showCustomInput ? 'border-purple-500 bg-purple-500/10' : ''}
              backdrop-blur-sm
            `}
          >
            {!showCustomInput ? (
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Custom Style</h3>
                {settings.customNarrativeStyle ? (
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Current Style:</p>
                    <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                      <p className="text-sm break-words whitespace-pre-wrap max-w-full">
                        {settings.customNarrativeStyle}
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
                            narrativeStyle: undefined,
                            customNarrativeStyle: undefined 
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
                    Create your own unique narrative style
                  </p>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                <input
                  type="text"
                  value={customValue}
                  onChange={(e) => setCustomValue(e.target.value)}
                  placeholder="Describe your narrative style..."
                  className="w-full bg-background/50 border border-purple-500/20 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500/50 overflow-hidden text-ellipsis"
                  onKeyDown={(e) => e.key === 'Enter' && handleCustomSubmit()}
                  autoFocus
                />
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => setShowCustomInput(false)}
                    className="px-3 py-1 text-sm text-muted-foreground hover:text-foreground"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleCustomSubmit}
                    className="px-3 py-1 text-sm bg-purple-500 text-white rounded-md hover:bg-purple-600"
                  >
                    Confirm
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
