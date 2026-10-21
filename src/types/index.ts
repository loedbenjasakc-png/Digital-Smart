export type CategoryId = 'safety' | 'media' | 'privacy' | 'manners' | 'challenge';

export interface Category {
  id: CategoryId;
  title: string;
  titleTh: string;
  tagline: string;
  description: string;
  iconName: string;
  accentColor: string;
  lightBg: string;
  lessonCount: number;
}

export interface LessonSection {
  title: string;
  content: string[];
  tips?: string[];
  warning?: string;
  badge?: string;
}

export interface Lesson {
  id: string;
  categoryId: CategoryId;
  order: number;
  title: string;
  subtitle: string;
  readTime: string;
  realWorldCase: {
    situation: string;
    impact: string;
    solution: string;
  };
  sections: LessonSection[];
  interactiveType?: 'password-checker' | 'url-inspector' | 'privacy-checklist' | 'netiquette-meter';
  keyTakeaways: string[];
}

export interface ScenarioOption {
  id: string;
  text: string;
  isCorrect: boolean;
  score: number;
  feedbackTitle: string;
  feedbackText: string;
  tip: string;
}

export interface Scenario {
  id: string;
  categoryId: CategoryId;
  title: string;
  situation: string;
  mockType: 'sms' | 'social-post' | 'chat' | 'app-permission' | 'email';
  mockContent: {
    sender?: string;
    avatar?: string;
    message?: string;
    timestamp?: string;
    imageCaption?: string;
    linkUrl?: string;
    permissions?: string[];
  };
  question: string;
  options: ScenarioOption[];
}

export interface QuizQuestion {
  id: string;
  categoryId: CategoryId;
  question: string;
  scenarioContext?: string;
  options: {
    id: string;
    text: string;
  }[];
  correctOptionId: string;
  explanation: string;
  keyRule: string;
}

export interface QuizAttempt {
  date: string;
  score: number;
  total: number;
  percentage: number;
  badge: string;
}

export interface UserProgress {
  studentName: string;
  completedLessons: string[];
  completedScenarios: Record<string, string>; // scenarioId -> selectedOptionId
  quizAttempts: QuizAttempt[];
  points: number;
  lastActive: string;
}
