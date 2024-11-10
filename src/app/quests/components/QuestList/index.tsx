'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useStoryStore } from '@/store/story';
import { Edit2, Trash2, Clock, Calendar, Flag, Sword, Scroll } from 'lucide-react';
import { QuestDialog } from '../QuestDialog';
import { QuestForm } from '../QuestForm';
import { useState } from 'react';
import type { Task } from '@/types';

const difficultyColors = {
  NORMAL: 'from-green-500/30 to-green-600/30 border-green-500/30',
  HARD: 'from-yellow-500/30 to-orange-500/30 border-orange-500/30',
  EPIC: 'from-purple-500/30 to-pink-500/30 border-purple-500/30',
  LEGENDARY: 'from-red-500/30 to-pink-600/30 border-red-500/30',
} as const;

const difficultyGlow = {
  NORMAL: 'hover:shadow-green-500/25',
  HARD: 'hover:shadow-orange-500/25',
  EPIC: 'hover:shadow-purple-500/25',
  LEGENDARY: 'hover:shadow-red-500/25',
} as const;

// Define column order
const columnOrder: Record<string, number> = {
  'DAILY': 0,
  'MAIN_QUEST': 1,
  'SIDE_QUEST': 2,
};

export function QuestList() {
  const { tasks, setTasks } = useStoryStore();
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleEditComplete = () => {
    setEditingTask(null);
    setIsDialogOpen(false);
  };

  // Group tasks by type
  const groupedTasks = tasks.reduce((acc, task) => {
    const type = task.type || 'MAIN_QUEST';
    if (!acc[type]) acc[type] = [];
    acc[type].push(task);
    return acc;
  }, {} as Record<string, Task[]>);

  // Sort quest types by defined order
  const sortedQuestTypes = Object.entries(groupedTasks).sort(
    ([a], [b]) => (columnOrder[a] ?? 999) - (columnOrder[b] ?? 999)
  );

  if (tasks.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-12 space-y-4"
      >
        <Scroll className="w-12 h-12 mx-auto text-purple-500/50" />
        <p className="text-lg text-muted-foreground">
          Your quest log awaits its first entry
        </p>
        <p className="text-sm text-muted-foreground">
          Begin your journey by adding your first quest above
        </p>
      </motion.div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Quest Count & Generate Story */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
          Active Quests ({tasks.length})
        </h2>
        {tasks.length >= 3 && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-6 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-medium shadow-lg hover:shadow-purple-500/25"
          >
            Generate Epic Tale
          </motion.button>
        )}
      </div>

      {/* Quest Scroll Layout */}
      <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8">
        {sortedQuestTypes.map(([type, typeTasks]) => (
          <motion.div
            key={type}
            layout
            className="relative"
          >
            {/* Quest Type Header */}
            <motion.div 
              className="relative mb-6 overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="relative p-4 bg-background/30 border border-purple-500/20 rounded-lg backdrop-blur-sm">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-transparent to-purple-500/5"
                  animate={{ 
                    backgroundPosition: ['0% 0%', '100% 100%'],
                  }}
                  transition={{ 
                    duration: 10,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                  style={{ backgroundSize: '200% 200%' }}
                />
                <div className="relative flex items-center gap-3">
                  {/* Icon based on quest type */}
                  <motion.div
                    animate={type === 'MAIN_QUEST' 
                      ? { scale: [1, 1.2, 1] }
                      : type === 'DAILY' 
                        ? { rotate: 360 }
                        : { opacity: [1, 0.5, 1] }
                    }
                    transition={{ duration: 2, repeat: Infinity }}
                    className={`w-3 h-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 ${
                      type === 'SIDE_QUEST' ? 'rotate-45' : ''
                    }`}
                  />
                  <h3 className="text-lg font-semibold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                    {type.replace('_', ' ')}
                  </h3>
                </div>
              </div>
            </motion.div>

            {/* Quest Cards */}
            <div className="space-y-6">
              {typeTasks.map((task) => (
                <motion.div
                  key={task.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className={`
                    relative overflow-hidden rounded-lg
                    backdrop-blur-md group transition-all
                    hover:shadow-lg bg-background/80
                  `}
                >
                  {/* Scroll Background Effect */}
                  <div className={`
                    absolute inset-0 bg-gradient-to-br ${difficultyColors[task.difficulty]}
                    opacity-80
                  `} />
                  
                  {/* Magical Border Effect */}
                  <div className="absolute inset-0 border border-purple-500/20 rounded-lg" />
                  
                  {/* Content */}
                  <div className="relative p-4 space-y-3">
                    {/* Header */}
                    <div className="flex justify-between items-start">
                      <h4 className="text-lg font-semibold">{task.title}</h4>
                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleEdit(task)}
                          className="p-1 hover:text-purple-500 transition-colors"
                        >
                          <Edit2 className="w-4 h-4" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleDelete(task.id)}
                          className="p-1 hover:text-pink-500 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </div>

                    {/* Description */}
                    {task.description && (
                      <p className="text-sm text-muted-foreground">
                        {task.description}
                      </p>
                    )}

                    {/* Metadata */}
                    <div className="flex flex-wrap gap-3 text-sm text-muted-foreground pt-2 border-t border-purple-500/10">
                      <div className="flex items-center gap-1">
                        <Sword className="w-4 h-4" />
                        <span>{task.difficulty}</span>
                      </div>
                      {task.estimatedTime && (
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{task.estimatedTime}</span>
                        </div>
                      )}
                      {task.deadline && (
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>
                            {new Date(task.deadline).toLocaleDateString()}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Edit Dialog */}
      <QuestDialog
        isOpen={isDialogOpen}
        onClose={handleEditComplete}
      >
        <QuestForm
          onClose={handleEditComplete}
          editingTask={editingTask}
        />
      </QuestDialog>
    </div>
  );
} 