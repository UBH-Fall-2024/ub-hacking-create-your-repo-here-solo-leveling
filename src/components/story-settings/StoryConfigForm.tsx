'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { UniverseSelect } from './UniverseSelect';
import { CharacterSelect } from './CharacterSelect';
import { NarrativeSelect } from './NarrativeSelect';
import { useStoryStore } from '@/store/story';
import { useRouter } from 'next/navigation';

const steps = ['universe', 'character', 'narrative'] as const;
type Step = typeof steps[number];

export function StoryConfigForm() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<Step>('universe');
  const settings = useStoryStore((state) => state.settings);

  const handleNext = () => {
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1]);
    }
  };

  const handleBack = () => {
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1]);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 'universe':
        return settings.universe || settings.customUniverse;
      case 'character':
        return settings.character || settings.customCharacter;
      case 'narrative':
        return settings.narrativeStyle || settings.customNarrativeStyle;
      default:
        return false;
    }
  };

  const isLastStep = currentStep === steps[steps.length - 1];

  const handleComplete = async () => {
    if (isLastStep && canProceed()) {
      // Add completion animation
      await new Promise(resolve => setTimeout(resolve, 500)); // Brief pause
      router.push('/quests?newJourney=true', { scroll: false });
    } else {
      handleNext();
    }
  };

  return (
    <div className="min-h-screen py-20">
      {/* Progress Bar */}
      <div className="container mx-auto mb-12">
        <div className="flex justify-between max-w-md mx-auto">
          {steps.map((step, index) => (
            <div key={step} className="flex items-center">
              <div 
                className={`
                  w-8 h-8 rounded-full flex items-center justify-center
                  ${steps.indexOf(currentStep) >= index 
                    ? 'bg-purple-500 text-white' 
                    : 'bg-gray-700 text-gray-400'}
                `}
              >
                {index + 1}
              </div>
              {index < steps.length - 1 && (
                <div 
                  className={`
                    w-24 h-0.5 mx-2
                    ${steps.indexOf(currentStep) > index 
                      ? 'bg-purple-500' 
                      : 'bg-gray-700'}
                  `}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Form Steps */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {currentStep === 'universe' && <UniverseSelect />}
          {currentStep === 'character' && <CharacterSelect />}
          {currentStep === 'narrative' && <NarrativeSelect />}
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      <div className="container mx-auto mt-12">
        <div className="flex justify-between max-w-md mx-auto">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleBack}
            className={`
              px-6 py-2 rounded-full text-sm font-medium
              ${currentStep === 'universe'
                ? 'opacity-50 cursor-not-allowed bg-gray-700'
                : 'bg-purple-500 hover:bg-purple-600'}
            `}
            disabled={currentStep === 'universe'}
          >
            Back
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleComplete}
            className={`
              px-6 py-2 rounded-full text-sm font-medium
              ${!canProceed()
                ? 'opacity-50 cursor-not-allowed bg-gray-700'
                : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600'}
            `}
            disabled={!canProceed()}
          >
            {isLastStep ? 'Begin Journey' : 'Next'}
          </motion.button>
        </div>
      </div>

      {/* Story settings messaging */}
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
          Forge Your Legend
        </h2>
        <p className="text-muted-foreground">
          Choose the elements that will shape your unique story
        </p>
      </div>
    </div>
  );
}
