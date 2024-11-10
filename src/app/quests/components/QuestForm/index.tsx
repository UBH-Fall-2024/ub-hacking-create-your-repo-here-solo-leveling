'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { useStoryStore } from '@/store/story';
import { v4 as uuidv4 } from 'uuid';
import type { QuestType, QuestDifficulty, Task } from '@/types';
import { Calendar, Clock, Sword, Flag } from 'lucide-react';
import { DatePicker } from '@/components/ui/DatePicker';

interface QuestFormData {
  title: string;
  description: string;
  type: QuestType;
  difficulty: QuestDifficulty;
  estimatedTime: string;
  deadline?: Date;
}

interface QuestFormProps {
  onClose: () => void;
  editingTask?: Task | null;
  isNewQuest?: boolean;
}

export function QuestForm({ onClose, editingTask, isNewQuest = false }: QuestFormProps) {
  const { addTask, updateTask } = useStoryStore();
  const [formData, setFormData] = useState<QuestFormData>({
    title: editingTask?.title || '',
    description: editingTask?.description || '',
    type: editingTask?.type || 'MAIN_QUEST',
    difficulty: editingTask?.difficulty || 'NORMAL',
    estimatedTime: editingTask?.estimatedTime || '',
    deadline: editingTask?.deadline,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    if (editingTask) {
      // Update existing task
      updateTask(editingTask.id, formData);
    } else {
      // Create new task
      const newTask: Task = {
        id: uuidv4(),
        ...formData,
        status: 'active',
        createdAt: new Date(),
      };
      addTask(newTask);
    }
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
          {isNewQuest ? 'Begin New Quest' : editingTask ? 'Edit Quest' : 'Forge Your Quest'}
        </h2>
        <p className="text-sm text-muted-foreground">
          {isNewQuest 
            ? 'Start your next epic challenge'
            : editingTask 
              ? 'Modify your quest details'
              : 'Define your next epic challenge'
          }
        </p>
      </div>

      {/* Quest Title */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Quest Title</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full bg-background/50 border border-purple-500/20 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
          placeholder="What challenge awaits?"
          autoFocus
        />
      </div>

      {/* Quest Description */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Quest Details</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full bg-background/50 border border-purple-500/20 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500/50 min-h-[100px]"
          placeholder="Describe your quest..."
        />
      </div>

      {/* Quest Type & Difficulty */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center gap-2">
            <Flag className="w-4 h-4" />
            Quest Type
          </label>
          <select
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value as QuestType })}
            className="w-full bg-background/50 border border-purple-500/20 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
          >
            <option value="MAIN_QUEST">Main Quest</option>
            <option value="SIDE_QUEST">Side Quest</option>
            <option value="DAILY">Daily</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center gap-2">
            <Sword className="w-4 h-4" />
            Difficulty
          </label>
          <select
            value={formData.difficulty}
            onChange={(e) => setFormData({ ...formData, difficulty: e.target.value as QuestDifficulty })}
            className="w-full bg-background/50 border border-purple-500/20 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
          >
            <option value="NORMAL">Normal</option>
            <option value="HARD">Hard</option>
            <option value="EPIC">Epic</option>
            <option value="LEGENDARY">Legendary</option>
          </select>
        </div>
      </div>

      {/* Time Estimates & Deadline */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Estimated Time
          </label>
          <input
            type="text"
            value={formData.estimatedTime}
            onChange={(e) => setFormData({ ...formData, estimatedTime: e.target.value })}
            className="w-full bg-background/50 border border-purple-500/20 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
            placeholder="e.g., 2 hours"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Deadline
          </label>
          <DatePicker
            value={formData.deadline}
            onChange={(date) => setFormData({ ...formData, deadline: date })}
            placeholder="Select deadline..."
          />
        </div>
      </div>

      {/* Submit Buttons */}
      <div className="flex justify-end gap-3 pt-4">
        <motion.button
          type="button"
          onClick={onClose}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-4 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          Cancel
        </motion.button>
        <motion.button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-6 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium hover:from-purple-600 hover:to-pink-600 transition-all"
        >
          {editingTask ? 'Update Quest' : 'Create Quest'}
        </motion.button>
      </div>
    </form>
  );
} 