'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Sparkles, Users, Compass, Rocket, Brain, Smartphone, Wand2 } from 'lucide-react';

const features = [
  {
    icon: Users,
    title: 'Squad Mode',
    description: 'Tackle quests with friends—because every hero needs a party.'
  },
  {
    icon: Compass,
    title: 'New Universes',
    description: 'From classic shonen adventures to eerie cosmic horrors, more universes are on their way.'
  },
  {
    icon: Brain,
    title: 'Voice Commands',
    description: 'Stay in character without breaking the flow, even when typing feels like a drag.'
  },
  {
    icon: Rocket,
    title: 'Branching Stories',
    description: 'Your choices matter. Let your productivity arcs adapt to your actions.'
  },
  {
    icon: Smartphone,
    title: 'Mobile Version',
    description: 'Your hero\'s journey shouldn\'t be confined to your desk. A mobile app is in the works.'
  },
  {
    icon: Wand2,
    title: 'Custom Universes',
    description: 'Craft your own world, tell your own story. Because no one understands your ideal quest better than you do.'
  }
];

export default function AboutPage() {
  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4 space-y-20">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto text-center space-y-6"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
            Level Up Your Daily Life
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            SoloLevel is not just another productivity tool; it's your gateway to making daily life as epic as an anime battle or a fantasy quest.
          </p>
        </motion.section>

        {/* How It Works */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="max-w-4xl mx-auto space-y-8"
        >
          <h2 className="text-3xl font-bold text-center">How It Works</h2>
          <div className="space-y-6">
            <div className="p-6 rounded-lg border border-purple-500/20 bg-background/50 backdrop-blur-sm space-y-4">
              <h3 className="text-xl font-semibold">Choose Your Archetype</h3>
              <p className="text-muted-foreground">
                Are you an overpowered mentor, a determined underdog, or maybe a chaotic antihero? Your character shapes how your tasks transform.
              </p>
            </div>
            <div className="p-6 rounded-lg border border-purple-500/20 bg-background/50 backdrop-blur-sm space-y-4">
              <h3 className="text-xl font-semibold">Pick Your Universe</h3>
              <p className="text-muted-foreground">
                Love shonen anime? Prefer a magical academy? Or maybe you're into cyberpunk dystopias? The choice is yours, and SoloLevel adapts accordingly.
              </p>
            </div>
            <div className="p-6 rounded-lg border border-purple-500/20 bg-background/50 backdrop-blur-sm space-y-4">
              <h3 className="text-xl font-semibold">Start Your Journey</h3>
              <p className="text-muted-foreground">
                Once your settings are locked in, SoloLevel uses GPT-4 to turn your daily tasks into personalized story arcs. Cleaning your room? You're fortifying your base before the next big battle. Writing an email? You're delivering a crucial message to allies.
              </p>
            </div>
          </div>
        </motion.section>

        {/* Why SoloLevel */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="max-w-4xl mx-auto space-y-8"
        >
          <h2 className="text-3xl font-bold text-center">Why SoloLevel?</h2>
          <p className="text-center text-muted-foreground">
            We've all struggled with motivation at some point—especially those of us with ADHD brains that crave novelty and excitement. Traditional productivity tools demand that we fit into their mold. SoloLevel flips that notion, allowing you to fit productivity into the fantastical mold that inspires you most.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-lg border border-purple-500/20 bg-background/50 backdrop-blur-sm space-y-4">
              <h3 className="text-xl font-semibold">It Speaks Your Language</h3>
              <p className="text-muted-foreground">
                Instead of forcing yourself to complete bland tasks, you're narrating an epic story—your story. You're the main character, and each task brings you closer to your next level-up.
              </p>
            </div>
            <div className="p-6 rounded-lg border border-purple-500/20 bg-background/50 backdrop-blur-sm space-y-4">
              <h3 className="text-xl font-semibold">Hyperfocus Meets Fantasy</h3>
              <p className="text-muted-foreground">
                Built with tools like Next.js 14, TypeScript, and Tailwind CSS, SoloLevel keeps everything seamless and visually striking. It's designed to not only work well but feel immersive—hyperfocus, meet your new best friend.
              </p>
            </div>
          </div>
        </motion.section>

        {/* Features */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="max-w-4xl mx-auto space-y-8"
        >
          <h2 className="text-3xl font-bold text-center">What's Next?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 * index }}
                  className="p-6 rounded-lg border border-purple-500/20 bg-background/50 backdrop-blur-sm space-y-4"
                >
                  <Icon className="w-6 h-6 text-purple-500" />
                  <h3 className="text-lg font-semibold">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* CTA */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="max-w-2xl mx-auto text-center space-y-6"
        >
          <h2 className="text-3xl font-bold">Ready to Solo Level Up?</h2>
          <p className="text-muted-foreground">
            Let's stop treating productivity like a chore and start treating it like the epic, main-character journey it deserves to be.
          </p>
          <Link href="/story-settings">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium text-lg hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg hover:shadow-purple-500/25 flex items-center gap-2 mx-auto"
            >
              <Sparkles className="w-5 h-5" />
              Begin Your Journey
            </motion.button>
          </Link>
        </motion.section>
      </div>
    </div>
  );
} 