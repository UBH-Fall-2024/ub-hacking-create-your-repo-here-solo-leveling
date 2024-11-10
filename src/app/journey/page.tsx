'use client';

import { motion } from 'framer-motion';
import { useStoryStore } from '@/store/story';
import { Trophy, Target, Star, Award, Calendar } from 'lucide-react';
import { format, parseISO, startOfMonth, endOfMonth, eachMonthOfInterval, subMonths, eachWeekOfInterval, eachDayOfInterval, isSameDay, isToday, startOfWeek, addDays } from 'date-fns';

export default function JourneyPage() {
  const { tasks } = useStoryStore();

  // Calculate accurate stats
  const activeQuests = tasks.filter(t => t.status === 'active');
  const completedQuests = tasks.filter(t => t.status === 'completed');
  const archivedQuests = tasks.filter(t => t.status === 'archived');

  const stats = {
    active: {
      total: activeQuests.length,
      daily: activeQuests.filter(t => t.type === 'DAILY').length,
      main: activeQuests.filter(t => t.type === 'MAIN_QUEST').length,
      side: activeQuests.filter(t => t.type === 'SIDE_QUEST').length,
    },
    completed: completedQuests.length,
    archived: archivedQuests.length,
    byDifficulty: {
      normal: tasks.filter(t => t.difficulty === 'NORMAL').length,
      hard: tasks.filter(t => t.difficulty === 'HARD').length,
      epic: tasks.filter(t => t.difficulty === 'EPIC').length,
      legendary: tasks.filter(t => t.difficulty === 'LEGENDARY').length,
    }
  };

  // Calculate completion rate
  const totalQuests = tasks.length;
  const completionRate = totalQuests > 0 
    ? Math.round(((stats.completed + stats.archived) / totalQuests) * 100) 
    : 0;

  // Generate activity data for the last 12 months
  const endDate = new Date();
  const startDate = subMonths(endDate, 11);
  const weekDays = ['Mon', 'Wed', 'Fri'];

  // Create activity heatmap data in a 7x52 grid (GitHub style)
  const weeks = eachWeekOfInterval({ start: startDate, end: endDate });
  const heatmapData = Array.from({ length: 7 }, (_, dayIndex) => 
    Array.from({ length: 52 }, (_, weekIndex) => {
      const date = addDays(startDate, weekIndex * 7 + dayIndex);
      const dayTasks = tasks.filter(task => 
        task.completedAt && isSameDay(new Date(task.completedAt), date)
      );

      return {
        date,
        count: dayTasks.length,
        tasks: dayTasks,
      };
    })
  );

  // Get max activity for scaling
  const maxActivity = Math.max(
    ...heatmapData.flat().map(d => d.count),
    1
  );

  // Function to get activity color based on count
  const getActivityColor = (count: number) => {
    if (count === 0) return 'bg-purple-950/20';
    const intensity = count / maxActivity;
    if (intensity < 0.25) return 'bg-purple-800/40';
    if (intensity < 0.5) return 'bg-purple-600/60';
    if (intensity < 0.75) return 'bg-purple-400/80';
    return 'bg-purple-300';
  };

  return (
    <div className="container mx-auto px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto space-y-12"
      >
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Quest Progress */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="p-6 rounded-lg border border-purple-500/20 bg-background/50 backdrop-blur-sm space-y-4"
          >
            <div className="flex items-center justify-between">
              <Trophy className="w-5 h-5 text-purple-500" />
              <span className="text-2xl font-bold">{completionRate}%</span>
            </div>
            <div className="space-y-1">
              <h3 className="font-medium">Quest Progress</h3>
              <p className="text-sm text-muted-foreground">
                {stats.completed + stats.archived} of {totalQuests} completed
              </p>
            </div>
          </motion.div>

          {/* Active Quests */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="p-6 rounded-lg border border-purple-500/20 bg-background/50 backdrop-blur-sm space-y-4"
          >
            <div className="flex items-center justify-between">
              <Target className="w-5 h-5 text-purple-500" />
              <span className="text-2xl font-bold">{stats.active.total}</span>
            </div>
            <div className="space-y-1">
              <h3 className="font-medium">Active Quests</h3>
              <p className="text-sm text-muted-foreground">
                {stats.active.main} main · {stats.active.daily} daily · {stats.active.side} side
              </p>
            </div>
          </motion.div>

          {/* Quest Types */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="p-6 rounded-lg border border-purple-500/20 bg-background/50 backdrop-blur-sm space-y-4"
          >
            <div className="flex items-center justify-between">
              <Star className="w-5 h-5 text-purple-500" />
              <span className="text-2xl font-bold">{stats.byDifficulty.legendary}</span>
            </div>
            <div className="space-y-1">
              <h3 className="font-medium">Quest Types</h3>
              <p className="text-sm text-muted-foreground">
                {stats.byDifficulty.normal} normal · {stats.byDifficulty.hard} hard · {stats.byDifficulty.epic} epic · {stats.byDifficulty.legendary} legendary
              </p>
            </div>
          </motion.div>
        </div>

        {/* Activity Heatmap */}
        <section className="space-y-6">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Calendar className="w-5 h-5 text-purple-500" />
            Quest Activity
          </h2>
          <div className="p-6 rounded-lg border border-purple-500/20 bg-background/50 backdrop-blur-sm">
            <div className="flex flex-col">
              {/* Month Labels */}
              <div className="flex mb-2">
                <div className="w-8" /> {/* Spacer for day labels */}
                <div className="flex-1 flex">
                  {eachMonthOfInterval({ start: startDate, end: endDate }).map((date) => (
                    <div 
                      key={date.toISOString()} 
                      className="flex-1 text-xs text-muted-foreground"
                      style={{ 
                        textAlign: 'start',
                        paddingLeft: format(date, 'd') === '1' ? '0' : undefined 
                      }}
                    >
                      {format(date, 'MMM')}
                    </div>
                  ))}
                </div>
              </div>

              {/* Activity Grid */}
              <div className="flex">
                {/* Day Labels */}
                <div className="w-8 flex flex-col gap-[2px] pt-[2px]">
                  {weekDays.map((day, index) => (
                    <div 
                      key={day} 
                      className="h-[10px] text-[10px] text-muted-foreground"
                      style={{ marginTop: index === 0 ? 0 : index * 11 }}
                    >
                      {day}
                    </div>
                  ))}
                </div>

                {/* Activity Squares */}
                <div className="flex gap-[2px]">
                  {Array.from({ length: 52 }).map((_, weekIndex) => (
                    <div key={weekIndex} className="flex flex-col gap-[2px]">
                      {Array.from({ length: 7 }).map((_, dayIndex) => {
                        const data = heatmapData[dayIndex][weekIndex];
                        return (
                          <motion.div
                            key={`${weekIndex}-${dayIndex}`}
                            whileHover={{ scale: 1.2, zIndex: 50 }}
                            className="relative group"
                          >
                            <div 
                              className={`
                                w-[10px] h-[10px] rounded-sm 
                                ${getActivityColor(data.count)}
                                ${isToday(data.date) ? 'ring-1 ring-purple-500' : ''}
                              `}
                            />
                            
                            {data.count > 0 && (
                              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 hidden group-hover:block z-[100]">
                                <div className="bg-background/95 border border-purple-500/20 rounded-lg p-2 text-xs shadow-lg">
                                  <p className="font-medium">{format(data.date, 'MMMM d, yyyy')}</p>
                                  <p className="text-muted-foreground">{data.count} quests completed</p>
                                  <div className="mt-1 space-y-1">
                                    {data.tasks.map(task => (
                                      <p key={task.id} className="truncate text-purple-400">
                                        • {task.title}
                                      </p>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            )}
                          </motion.div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>

              {/* Legend */}
              <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
                <span>Less</span>
                {['bg-purple-950/20', 'bg-purple-800/40', 'bg-purple-600/60', 'bg-purple-400/80', 'bg-purple-300'].map(color => (
                  <div key={color} className={`w-[10px] h-[10px] rounded-sm ${color}`} />
                ))}
                <span>More</span>
              </div>
            </div>
          </div>
        </section>

        {/* Recent Achievements */}
        <section className="space-y-6">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Award className="w-5 h-5 text-purple-500" />
            Recent Achievements
          </h2>
          <div className="space-y-4">
            {tasks
              .filter(task => task.status === 'completed' || task.status === 'archived')
              .sort((a, b) => new Date(b.completedAt!).getTime() - new Date(a.completedAt!).getTime())
              .slice(0, 5)
              .map(task => (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="p-4 rounded-lg border border-purple-500/20 bg-background/50 backdrop-blur-sm"
                >
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <h3 className="font-medium">{task.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {task.description}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-muted-foreground">
                        {format(new Date(task.completedAt!), 'MMM dd, yyyy')}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
          </div>
        </section>
      </motion.div>
    </div>
  );
} 