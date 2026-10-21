import { useState, useEffect } from 'react';
import { UserProgress, QuizAttempt } from '../types';
import { LESSONS, SCENARIOS } from '../data/digitalLiteracyData';

const STORAGE_KEY = 'digital_smart_progress_v1';

const defaultProgress: UserProgress = {
  studentName: '',
  completedLessons: [],
  completedScenarios: {},
  quizAttempts: [],
  points: 0,
  lastActive: new Date().toISOString()
};

export function useDigitalSmartProgress() {
  const [progress, setProgress] = useState<UserProgress>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Failed to parse localStorage progress:', e);
    }
    return defaultProgress;
  });

  // Save to localStorage whenever progress changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (e) {
      console.error('Failed to save progress to localStorage:', e);
    }
  }, [progress]);

  const setStudentName = (name: string) => {
    setProgress(prev => ({
      ...prev,
      studentName: name,
      lastActive: new Date().toISOString()
    }));
  };

  const markLessonComplete = (lessonId: string): boolean => {
    let newlyCompleted = false;
    setProgress(prev => {
      const alreadyCompleted = prev.completedLessons.includes(lessonId);
      if (alreadyCompleted) {
        return prev;
      }
      newlyCompleted = true;
      const newCompleted = [...prev.completedLessons, lessonId];
      // Reward 25 points for completing a lesson
      return {
        ...prev,
        completedLessons: newCompleted,
        points: prev.points + 25,
        lastActive: new Date().toISOString()
      };
    });
    return newlyCompleted;
  };

  const recordScenarioAnswer = (scenarioId: string, optionId: string, score: number) => {
    setProgress(prev => {
      const wasAnswered = Boolean(prev.completedScenarios[scenarioId]);
      const addedPoints = wasAnswered ? 0 : score;
      return {
        ...prev,
        completedScenarios: {
          ...prev.completedScenarios,
          [scenarioId]: optionId
        },
        points: prev.points + addedPoints,
        lastActive: new Date().toISOString()
      };
    });
  };

  const recordQuizAttempt = (score: number, total: number) => {
    const percentage = Math.round((score / total) * 100);
    let badge = 'ผู้เริ่มต้นดิจิทัล';
    if (percentage >= 90) badge = 'ผู้เชี่ยวชาญดิจิทัล (Digital Master)';
    else if (percentage >= 70) badge = 'พลเมืองดิจิทัลรอบรู้ (Digital Explorer)';
    else if (percentage >= 50) badge = 'ผู้พัฒนาทักษะ (Digital Apprentice)';

    const newAttempt: QuizAttempt = {
      date: new Date().toLocaleDateString('th-TH', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      score,
      total,
      percentage,
      badge
    };

    setProgress(prev => {
      // Award 5 points per correct quiz answer
      const quizPoints = score * 5;
      return {
        ...prev,
        quizAttempts: [newAttempt, ...prev.quizAttempts.slice(0, 9)], // keep last 10
        points: prev.points + quizPoints,
        lastActive: new Date().toISOString()
      };
    });

    return newAttempt;
  };

  const resetProgress = () => {
    setProgress({
      studentName: '',
      completedLessons: [],
      completedScenarios: {},
      quizAttempts: [],
      points: 0,
      lastActive: new Date().toISOString()
    });
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.error(e);
    }
  };

  // Computations
  const totalLessons = LESSONS.length;
  const completedLessonsCount = progress.completedLessons.length;
  const lessonProgressPercent = Math.min(100, Math.round((completedLessonsCount / totalLessons) * 100));

  const totalScenarios = SCENARIOS.length;
  const completedScenariosCount = Object.keys(progress.completedScenarios).length;
  const scenarioProgressPercent = Math.min(100, Math.round((completedScenariosCount / totalScenarios) * 100));

  const latestQuiz = progress.quizAttempts[0] || null;
  const bestQuizScore = progress.quizAttempts.length > 0
    ? Math.max(...progress.quizAttempts.map(a => a.score))
    : 0;

  // Calculate Overall Literacy Level
  let levelTitle = 'ผู้เริ่มต้นเรียนรู้ดิจิทัล (Digital Starter)';
  let levelColor = 'text-blue-600 bg-blue-50 border-blue-200';
  let overallPercent = Math.round((lessonProgressPercent * 0.4) + (scenarioProgressPercent * 0.3) + ((latestQuiz ? latestQuiz.percentage : 0) * 0.3));

  if (overallPercent >= 85) {
    levelTitle = 'พลเมืองดิจิทัลยอดเยี่ยม (Digital Master)';
    levelColor = 'text-violet-700 bg-violet-50 border-violet-200';
  } else if (overallPercent >= 60) {
    levelTitle = 'รู้เท่าทันไซเบอร์ (Digital Explorer)';
    levelColor = 'text-blue-700 bg-blue-50 border-blue-200';
  } else if (overallPercent >= 30) {
    levelTitle = 'กำลังฝึกฝนทักษะ (Digital Apprentice)';
    levelColor = 'text-amber-700 bg-amber-50 border-amber-200';
  }

  // Category specific lesson completion
  const categoryStats = {
    safety: {
      total: LESSONS.filter(l => l.categoryId === 'safety').length,
      done: LESSONS.filter(l => l.categoryId === 'safety' && progress.completedLessons.includes(l.id)).length
    },
    media: {
      total: LESSONS.filter(l => l.categoryId === 'media').length,
      done: LESSONS.filter(l => l.categoryId === 'media' && progress.completedLessons.includes(l.id)).length
    },
    privacy: {
      total: LESSONS.filter(l => l.categoryId === 'privacy').length,
      done: LESSONS.filter(l => l.categoryId === 'privacy' && progress.completedLessons.includes(l.id)).length
    },
    manners: {
      total: LESSONS.filter(l => l.categoryId === 'manners').length,
      done: LESSONS.filter(l => l.categoryId === 'manners' && progress.completedLessons.includes(l.id)).length
    }
  };

  return {
    progress,
    setStudentName,
    markLessonComplete,
    recordScenarioAnswer,
    recordQuizAttempt,
    resetProgress,
    totalLessons,
    completedLessonsCount,
    lessonProgressPercent,
    totalScenarios,
    completedScenariosCount,
    scenarioProgressPercent,
    latestQuiz,
    bestQuizScore,
    overallPercent,
    levelTitle,
    levelColor,
    categoryStats
  };
}
