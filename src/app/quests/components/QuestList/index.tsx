'use client';

import { motion } from 'framer-motion';
import { useStoryStore } from '@/store/story';
import { Edit2, Trash2, Clock, Calendar, Sword, Scroll } from 'lucide-react';
import { QuestDialog } from '../QuestDialog';
import { QuestForm } from '../QuestForm';
import { useState } from 'react';
import type { Task, QuestStatus } from '@/types';
import { StoryGenerator } from '../StoryGenerator';
import { QuestCard } from '../QuestCard';

const difficultyColors = {
  NORMAL: 'from-green-500/30 to-green-600/30 border-green-500/30',
  HARD: 'from-yellow-500/30 to-orange-500/30 border-orange-500/30',
  EPIC: 'from-purple-500/30 to-pink-500/30 border-purple-500/30',
  LEGENDARY: 'from-red-500/30 to-pink-600/30 border-red-500/30',
} as const;

// Define column order
const columnOrder: Record<string, number> = {
  'DAILY': 0,
  'MAIN_QUEST': 1,
  'SIDE_QUEST': 2,
};

export function QuestList() {
  const { tasks, updateTask, removeTask } = useStoryStore();
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    removeTask(id);
  };

  const handleComplete = (id: string) => {
    updateTask(id, { 
      status: 'completed', 
      completedAt: new Date() 
    });
  };

  const handleArchive = (id: string) => {
    updateTask(id, { 
      status: 'archived' 
    });
  };

  const handleEditComplete = () => {
    setEditingTask(null);
    setIsDialogOpen(false);
  };

  // Group tasks by status and type
  const groupedTasks = tasks.reduce((acc, task) => {
    const status = task.status || 'active';
    const type = task.type;
    
    if (!acc[status]) acc[status] = {};
    if (!acc[status][type]) acc[status][type] = [];
    
    acc[status][type].push(task);
    return acc;
  }, {} as Record<string, Record<string, Task[]>>);

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
      {/* Story Generator */}
      <StoryGenerator />

      {/* Active Quests */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Daily Quests */}
        <section>
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full" />
            Daily Quests
          </h2>
          <div className="space-y-4">
            {groupedTasks.active?.DAILY?.map(task => (
              <QuestCard 
                key={task.id} 
                task={task}
                onEdit={() => handleEdit(task)}
                onDelete={() => handleDelete(task.id)}
                onComplete={() => handleComplete(task.id)}
              />
            ))}
          </div>
        </section>

        {/* Main Quests */}
        <section>
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <span className="w-2 h-2 bg-purple-500 rounded-full" />
            Main Quests
          </h2>
          <div className="space-y-4">
            {groupedTasks.active?.MAIN_QUEST?.map(task => (
              <QuestCard 
                key={task.id} 
                task={task}
                onEdit={() => handleEdit(task)}
                onDelete={() => handleDelete(task.id)}
                onComplete={() => handleComplete(task.id)}
              />
            ))}
          </div>
        </section>

        {/* Side Quests */}
        <section>
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <span className="w-2 h-2 bg-pink-500 rounded-full" />
            Side Quests
          </h2>
          <div className="space-y-4">
            {groupedTasks.active?.SIDE_QUEST?.map(task => (
              <QuestCard 
                key={task.id} 
                task={task}
                onEdit={() => handleEdit(task)}
                onDelete={() => handleDelete(task.id)}
                onComplete={() => handleComplete(task.id)}
              />
            ))}
          </div>
        </section>
      </div>

      {/* Completed Quests */}
      {groupedTasks.completed && Object.keys(groupedTasks.completed).length > 0 && (
        <section className="mt-12">
          <h2 className="text-xl font-bold mb-4 text-muted-foreground">
            Completed Quests
          </h2>
          <div className="grid gap-4 opacity-60">
            {Object.entries(groupedTasks.completed).map(([type, tasks]) =>
              tasks.map(task => (
                <QuestCard 
                  key={task.id} 
                  task={task}
                  isCompleted
                  onArchive={() => handleArchive(task.id)}
                />
              ))
            )}
          </div>
        </section>
      )}

      {/* Archived Quests */}
      {groupedTasks.archived && Object.keys(groupedTasks.archived).length > 0 && (
        <section className="mt-12">
          <h2 className="text-xl font-bold mb-4 text-muted-foreground">
            Quest Archive
          </h2>
          <div className="grid gap-4 opacity-40">
            {Object.entries(groupedTasks.archived).map(([type, tasks]) =>
              tasks.map(task => (
                <QuestCard 
                  key={task.id} 
                  task={task}
                  isArchived
                />
              ))
            )}
          </div>
        </section>
      )}

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