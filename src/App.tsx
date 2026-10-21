/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar, ActiveTab } from './components/Navbar';
import { HomeView } from './components/views/HomeView';
import { LearningHubView } from './components/views/LearningHubView';
import { ScenarioLabView } from './components/views/ScenarioLabView';
import { QuizView } from './components/views/QuizView';
import { ProgressView } from './components/views/ProgressView';
import { Footer } from './components/Footer';
import { useDigitalSmartProgress } from './hooks/useDigitalSmartProgress';
import { CategoryId } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [targetCategory, setTargetCategory] = useState<CategoryId | undefined>(undefined);

  const {
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
    categoryStats
  } = useDigitalSmartProgress();

  // Scroll to top whenever tab changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  const handleNavigate = (tab: ActiveTab, categoryId?: CategoryId) => {
    if (categoryId) {
      setTargetCategory(categoryId);
    } else {
      setTargetCategory(undefined);
    }
    setActiveTab(tab);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 antialiased selection:bg-blue-500/20 selection:text-blue-900">
      {/* 3-zone Header */}
      <Navbar
        activeTab={activeTab}
        onSelectTab={(tab) => handleNavigate(tab)}
        points={progress.points}
        completedLessonsCount={completedLessonsCount}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {activeTab === 'home' && (
          <HomeView
            onNavigate={handleNavigate}
            points={progress.points}
            completedLessonsCount={completedLessonsCount}
            totalLessons={totalLessons}
            lessonProgressPercent={lessonProgressPercent}
            completedScenariosCount={completedScenariosCount}
            totalScenarios={totalScenarios}
            latestQuizScore={latestQuiz ? { score: latestQuiz.score, total: latestQuiz.total, percentage: latestQuiz.percentage } : null}
          />
        )}

        {activeTab === 'lessons' && (
          <LearningHubView
            onNavigate={(tab) => handleNavigate(tab)}
            completedLessons={progress.completedLessons}
            onMarkComplete={markLessonComplete}
            initialCategory={targetCategory}
          />
        )}

        {activeTab === 'scenarios' && (
          <ScenarioLabView
            onNavigate={(tab) => handleNavigate(tab)}
            completedScenarios={progress.completedScenarios}
            onRecordAnswer={recordScenarioAnswer}
          />
        )}

        {activeTab === 'quiz' && (
          <QuizView
            onNavigate={(tab) => handleNavigate(tab)}
            onRecordQuizAttempt={recordQuizAttempt}
          />
        )}

        {activeTab === 'progress' && (
          <ProgressView
            onNavigate={(tab) => handleNavigate(tab)}
            progress={progress}
            totalLessons={totalLessons}
            completedLessonsCount={completedLessonsCount}
            lessonProgressPercent={lessonProgressPercent}
            totalScenarios={totalScenarios}
            completedScenariosCount={completedScenariosCount}
            scenarioProgressPercent={scenarioProgressPercent}
            latestQuiz={latestQuiz}
            bestQuizScore={bestQuizScore}
            overallPercent={overallPercent}
            levelTitle={levelTitle}
            categoryStats={categoryStats}
            onSetStudentName={setStudentName}
            onResetProgress={resetProgress}
          />
        )}
      </main>

      {/* Footer */}
      <Footer onNavigate={(tab) => handleNavigate(tab)} />
    </div>
  );
}
