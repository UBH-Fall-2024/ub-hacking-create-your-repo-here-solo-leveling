'use client';

import { motion } from 'framer-motion';
import { Task } from '@/types';
import { Edit2, Trash2, Clock, Calendar, CheckCircle, Archive } from 'lucide-react';
import { format } from 'date-fns';

interface QuestCardProps {
  task: Task;
  isCompleted?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
  onComplete?: () => void;
  onArchive?: () => void;
}

const difficultyColors = {
  NORMAL: 'from-green-500/30 to-green-600/30 border-green-500/30',
  HARD: 'from-yellow-500/30 to-orange-500/30 border-orange-500/30',
  EPIC: 'from-purple-500/30 to-pink-500/30 border-purple-500/30',
  LEGENDARY: 'from-red-500/30 to-pink-600/30 border-red-500/30',
} as const;

export function QuestCard({ 
  task, 
  isCompleted,
  onEdit, 
  onDelete,
  onComplete,
  onArchive
}: QuestCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      className={`
        relative p-4 rounded-lg border backdrop-blur-sm overflow-hidden
        bg-gradient-to-r ${difficultyColors[task.difficulty]}
      `}
    >
      {/* Content */}
      <div className="space-y-4">
        {/* Header */}
        <div className="flex justify-between items-start gap-4">
          <h3 className="font-medium">{task.title}</h3>
          
          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            {!isCompleted && (
              <>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onEdit}
                  className="p-1 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onDelete}
                  className="p-1 text-muted-foreground hover:text-pink-500 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </motion.button>
              </>
            )}
            {isCompleted ? (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onArchive}
                className="p-1 text-muted-foreground hover:text-purple-500 transition-colors"
              >
                <Archive className="w-4 h-4" />
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onComplete}
                className="p-1 text-muted-foreground hover:text-green-500 transition-colors"
              >
                <CheckCircle className="w-4 h-4" />
              </motion.button>
            )}
          </div>
        </div>

        {/* Description */}
        {task.description && (
          <p className="text-sm text-muted-foreground">
            {task.description}
          </p>
        )}

        {/* Meta Info */}
        <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
          {task.estimatedTime && (
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>{task.estimatedTime}</span>
            </div>
          )}
          {task.deadline && (
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span>{format(new Date(task.deadline), 'MMM dd, yyyy')}</span>
            </div>
          )}
          <div className="flex items-center gap-1">
            <span className="px-2 py-0.5 rounded-full bg-background/50 text-[10px] uppercase">
              {task.type.replace('_', ' ')}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
} 