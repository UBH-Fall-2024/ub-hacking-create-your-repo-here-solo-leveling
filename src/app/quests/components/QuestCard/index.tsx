'use client';

import { motion } from 'framer-motion';
import { Task } from '@/types';
import { Edit2, Trash2, Clock, Calendar, Sword, Archive, Check } from 'lucide-react';
import { format } from 'date-fns';

interface QuestCardProps {
  task: Task;
  onEdit?: () => void;
  onDelete?: () => void;
  onComplete?: () => void;
  onArchive?: () => void;
  isCompleted?: boolean;
  isArchived?: boolean;
}

const difficultyColors = {
  NORMAL: 'from-green-500/30 to-green-600/30 border-green-500/30',
  HARD: 'from-yellow-500/30 to-orange-500/30 border-orange-500/30',
  EPIC: 'from-purple-500/30 to-pink-500/30 border-purple-500/30',
  LEGENDARY: 'from-red-500/30 to-pink-600/30 border-red-500/30',
} as const;

export function QuestCard({ 
  task, 
  onEdit, 
  onDelete, 
  onComplete,
  onArchive,
  isCompleted,
  isArchived 
}: QuestCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      className={`
        relative p-4 rounded-lg border bg-gradient-to-br backdrop-blur-sm
        ${difficultyColors[task.difficulty]}
      `}
    >
      {/* Quest Content */}
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <h3 className="font-medium">{task.title}</h3>
            {task.description && (
              <p className="text-sm text-muted-foreground">
                {task.description}
              </p>
            )}
          </div>
          
          {/* Action Buttons */}
          {!isCompleted && !isArchived && (
            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onEdit}
                className="p-1 hover:text-purple-500 transition-colors"
              >
                <Edit2 className="w-4 h-4" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onDelete}
                className="p-1 hover:text-pink-500 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </motion.button>
            </div>
          )}
          
          {isCompleted && !isArchived && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onArchive}
              className="p-1 hover:text-purple-500 transition-colors"
              title="Archive quest"
            >
              <Archive className="w-4 h-4" />
            </motion.button>
          )}
        </div>

        {/* Quest Details */}
        <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
          {/* Quest Type */}
          <div className="flex items-center gap-1">
            <Sword className="w-3 h-3" />
            <span>{task.type.replace('_', ' ')}</span>
          </div>

          {/* Estimated Time */}
          {task.estimatedTime && (
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>{task.estimatedTime}</span>
            </div>
          )}

          {/* Deadline */}
          {task.deadline && (
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span>{format(new Date(task.deadline), 'MMM dd, yyyy')}</span>
            </div>
          )}
        </div>

        {/* Complete Button */}
        {!isCompleted && !isArchived && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onComplete}
            className="w-full mt-2 px-3 py-1 rounded-md bg-purple-500/10 hover:bg-purple-500/20 text-sm font-medium flex items-center justify-center gap-2 transition-colors"
          >
            <Check className="w-4 h-4" />
            Complete Quest
          </motion.button>
        )}
      </div>
    </motion.div>
  );
} 