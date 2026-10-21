import React, { useState } from 'react';
import {
  Award,
  CheckCircle2,
  XCircle,
  HelpCircle,
  RotateCcw,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  BarChart3,
  Compass,
  Check,
  X,
  Flame,
  Zap,
  Star
} from 'lucide-react';
import { QUIZ_QUESTIONS } from '../../data/digitalLiteracyData';
import { QuizQuestion, QuizAttempt } from '../../types';
import { ActiveTab } from '../Navbar';

interface QuizViewProps {
  onNavigate: (tab: ActiveTab) => void;
  onRecordQuizAttempt: (score: number, total: number) => QuizAttempt;
}

export function QuizView({ onNavigate, onRecordQuizAttempt }: QuizViewProps) {
  const [questions, setQuestions] = useState<QuizQuestion[]>(() => {
    return [...QUIZ_QUESTIONS].sort(() => Math.random() - 0.5);
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [lastAttempt, setLastAttempt] = useState<QuizAttempt | null>(null);

  const currentQ = questions[currentIndex];
  const selectedOptionId = currentQ ? selectedAnswers[currentQ.id] : null;

  const handleSelectOption = (optId: string) => {
    if (isAnswerChecked) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQ.id]: optId
    }));
  };

  const handleCheckAnswer = () => {
    if (!selectedOptionId) return;
    setIsAnswerChecked(true);
  };

  const handleNextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsAnswerChecked(false);
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = () => {
    let score = 0;
    questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctOptionId) {
        score += 1;
      }
    });

    const attempt = onRecordQuizAttempt(score, questions.length);
    setLastAttempt(attempt);
    setIsQuizFinished(true);
  };

  const handleRetakeQuiz = () => {
    setQuestions([...QUIZ_QUESTIONS].sort(() => Math.random() - 0.5));
    setCurrentIndex(0);
    setSelectedAnswers({});
    setIsAnswerChecked(false);
    setIsQuizFinished(false);
    setLastAttempt(null);
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-extrabold text-amber-600 uppercase tracking-wider">
            <Award className="w-3.5 h-3.5 text-amber-500" />
            <span>แบบทดสอบมาตรฐาน (Smart Quiz Arena)</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
            วัดระดับความรู้ Digital Literacy 10 ข้อ
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            ทดสอบความเข้าใจและทักษะการตัดสินใจในโลกดิจิทัล สุ่มข้อสอบใหม่ทุกครั้ง
          </p>
        </div>

        <button
          onClick={() => onNavigate('home')}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-slate-950 bg-white border border-slate-200 px-4 py-2.5 rounded-xl transition-colors self-start sm:self-auto shadow-xs"
        >
          <Compass className="w-4 h-4 text-slate-400" />
          <span>กลับหน้าหลัก</span>
        </button>
      </div>

      {/* Finished Summary Screen */}
      {isQuizFinished && lastAttempt ? (
        <div className="bg-white rounded-[2.5rem] border border-slate-200/90 p-6 sm:p-12 shadow-xl space-y-10 relative overflow-hidden">
          {/* Confetti Glow Header */}
          <div className="text-center max-w-xl mx-auto space-y-5">
            <div className="relative inline-block">
              <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-amber-400 via-orange-500 to-amber-500 flex items-center justify-center mx-auto shadow-xl shadow-amber-500/30 text-white animate-float">
                <Award className="w-12 h-12 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 bg-purple-600 text-white text-[11px] font-black px-2.5 py-0.5 rounded-full shadow-md font-mono">
                {lastAttempt.percentage}%
              </div>
            </div>

            <div>
              <span className="text-xs font-extrabold text-blue-600 uppercase tracking-wider block">
                ผลการประเมินทักษะของคุณ
              </span>
              <h3 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight mt-1">
                {lastAttempt.score} <span className="text-2xl sm:text-3xl font-normal text-slate-400">/ 10</span> คะแนน
              </h3>
            </div>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-sm font-bold shadow-xs">
              <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
              <span>{lastAttempt.badge}</span>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              {lastAttempt.percentage >= 80
                ? 'ยอดเยี่ยมระดับสูงสุด! คุณเป็นพลเมืองดิจิทัลที่มีทักษะความปลอดภัยรอบด้าน มีภูมิคุ้มกันไซเบอร์เข้มแข็ง'
                : lastAttempt.percentage >= 50
                ? 'ทำได้ดีมาก! คุณมีความเข้าใจพื้นฐานที่ดี สามารถทบทวนบทเรียนเพื่อก้าวสู่ระดับ Digital Master'
                : 'ควรระมัดระวัง! ภัยคุกคามในโลกออนไลน์มีหลากหลาย แนะนำให้อ่านบทเรียนใน Learning Hub อีกครั้งแล้วมาทดสอบใหม่'}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
              <button
                onClick={handleRetakeQuiz}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-blue-500/25 transition-all hover:-translate-y-0.5"
              >
                <RotateCcw className="w-4 h-4" />
                <span>ทำแบบทดสอบอีกครั้ง (สุ่มข้อใหม่)</span>
              </button>

              <button
                onClick={() => onNavigate('progress')}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs sm:text-sm transition-all hover:-translate-y-0.5"
              >
                <BarChart3 className="w-4 h-4 text-slate-600" />
                <span>ดูความก้าวหน้าและเกียรติบัตร</span>
              </button>
            </div>
          </div>

          {/* Detailed Question Review List */}
          <div className="pt-10 border-t border-slate-100 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-xl font-black text-slate-900">
                  เฉลยละเอียดและคำอธิบายครบทั้ง 10 ข้อ
                </h4>
                <span className="text-xs text-slate-500">
                  วิเคราะห์เหตุผลและหลักคิดในแต่ละข้อ
                </span>
              </div>
              <span className="text-xs font-mono font-bold px-3 py-1 bg-slate-100 rounded-full text-slate-700">
                ตอบถูก {lastAttempt.score}/10 ข้อ
              </span>
            </div>

            <div className="space-y-4">
              {questions.map((q, idx) => {
                const userChoice = selectedAnswers[q.id];
                const isCorrect = userChoice === q.correctOptionId;
                const correctOpt = q.options.find((o) => o.id === q.correctOptionId);
                const userOpt = q.options.find((o) => o.id === userChoice);

                return (
                  <div
                    key={q.id}
                    className={`p-6 rounded-3xl border-2 text-xs sm:text-sm space-y-3.5 ${
                      isCorrect
                        ? 'bg-emerald-50/40 border-emerald-300'
                        : 'bg-red-50/40 border-red-300'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <span className="font-extrabold text-slate-900 leading-snug text-sm sm:text-base">
                        ข้อ {idx + 1}. {q.question}
                      </span>
                      <div className="shrink-0 mt-0.5">
                        {isCorrect ? (
                          <span className="inline-flex items-center gap-1 text-emerald-800 font-bold text-xs bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300">
                            <Check className="w-3.5 h-3.5" />
                            ตอบถูก
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-red-800 font-bold text-xs bg-red-100 px-3 py-1 rounded-full border border-red-300">
                            <X className="w-3.5 h-3.5" />
                            ตอบผิด
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                      <div className="p-3 rounded-2xl bg-white border border-slate-200">
                        <span className="text-slate-400 block mb-0.5 font-medium">คำตอบที่คุณเลือก:</span>
                        <span className={`font-bold ${isCorrect ? 'text-emerald-700' : 'text-red-700'}`}>
                          {userOpt?.text || 'ไม่ได้เลือกคำตอบ'}
                        </span>
                      </div>
                      <div className="p-3 rounded-2xl bg-white border border-slate-200">
                        <span className="text-slate-400 block mb-0.5 font-medium">คำตอบที่ถูกต้อง:</span>
                        <span className="font-bold text-emerald-800">
                          {correctOpt?.text}
                        </span>
                      </div>
                    </div>

                    <div className="text-xs text-slate-800 leading-relaxed bg-white/90 p-4 rounded-2xl border border-slate-200/80">
                      <span className="font-bold text-slate-900 block mb-1">💡 คำอธิบายเชิงวิชาการ:</span>
                      {q.explanation}
                      <div className="pt-2 text-indigo-700 font-semibold">
                        📌 กฎทอง: {q.keyRule}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        /* Active Quiz Screen */
        <div className="bg-white rounded-[2.5rem] border border-slate-200/90 p-6 sm:p-10 md:p-12 shadow-xl space-y-8">
          {/* Progress Header */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-600">
              <span className="font-extrabold text-blue-700 uppercase tracking-wide">
                คำถามข้อที่ {currentIndex + 1} จาก {questions.length}
              </span>
              <span className="tabular-nums font-mono font-bold text-slate-500">
                {Math.round(((currentIndex) / questions.length) * 100)}% ทำแล้ว
              </span>
            </div>

            {/* Glowing Progress bar */}
            <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden p-0.5">
              <div
                className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 h-full rounded-full transition-all duration-300 shadow-sm"
                style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
              />
            </div>

            {/* 10 Dots Navigation Strip */}
            <div className="flex items-center gap-2 pt-2 overflow-x-auto">
              {questions.map((q, idx) => {
                const isCurrent = idx === currentIndex;
                const isAnswered = Boolean(selectedAnswers[q.id]);

                return (
                  <button
                    key={q.id}
                    onClick={() => {
                      setCurrentIndex(idx);
                      setIsAnswerChecked(false);
                    }}
                    className={`w-8 h-8 rounded-xl text-xs font-mono font-bold transition-all shrink-0 ${
                      isCurrent
                        ? 'bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/30 scale-105'
                        : isAnswered
                        ? 'bg-slate-200 text-slate-800'
                        : 'bg-slate-100 text-slate-400 hover:bg-slate-200'
                    }`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Question Text */}
          <div className="py-2">
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug">
              {currentQ.question}
            </h3>
          </div>

          {/* 4 Choices */}
          <div className="space-y-3.5">
            {currentQ.options.map((option) => {
              const isSelected = selectedOptionId === option.id;
              const isCorrect = option.id === currentQ.correctOptionId;

              let style = 'bg-white border-slate-200 hover:border-blue-400 hover:bg-slate-50 text-slate-800';

              if (isAnswerChecked) {
                if (isCorrect) {
                  style = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold shadow-md shadow-emerald-500/10';
                } else if (isSelected && !isCorrect) {
                  style = 'bg-red-50 border-red-500 text-red-950 shadow-md shadow-red-500/10';
                } else {
                  style = 'bg-slate-50/60 border-slate-200 text-slate-400';
                }
              } else if (isSelected) {
                style = 'bg-blue-50/90 border-blue-600 text-blue-950 font-bold shadow-md shadow-blue-500/10';
              }

              return (
                <button
                  key={option.id}
                  onClick={() => handleSelectOption(option.id)}
                  disabled={isAnswerChecked}
                  className={`w-full text-left p-4 sm:p-5 rounded-2xl border-2 text-xs sm:text-sm transition-all flex items-start gap-3.5 ${style}`}
                >
                  <div
                    className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 mt-0.5 text-xs font-black ${
                      isAnswerChecked
                        ? isCorrect
                          ? 'bg-emerald-600 text-white'
                          : isSelected
                          ? 'bg-red-600 text-white'
                          : 'bg-slate-200 text-slate-500'
                        : isSelected
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {option.id.toUpperCase()}
                  </div>
                  <span className="leading-relaxed font-semibold">{option.text}</span>
                </button>
              );
            })}
          </div>

          {/* Checked Answer Explanation Box */}
          {isAnswerChecked && (
            <div
              className={`p-6 rounded-3xl border-2 text-xs sm:text-sm space-y-2.5 animate-in fade-in duration-200 ${
                selectedOptionId === currentQ.correctOptionId
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                  : 'bg-red-50 border-red-300 text-red-950'
              }`}
            >
              <div className="flex items-center gap-2 font-black text-sm sm:text-base">
                {selectedOptionId === currentQ.correctOptionId ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span>ตอบถูกต้องยอดเยี่ยม! 🎉</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-5 h-5 text-red-600" />
                    <span>ยังไม่ถูกต้อง ลองดูคำอธิบายด้านล่าง</span>
                  </>
                )}
              </div>
              <p className="text-slate-800 leading-relaxed font-normal">{currentQ.explanation}</p>
              <div className="pt-2 text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <span>📌 หัวใจสำคัญ:</span>
                <span className="text-blue-700">{currentQ.keyRule}</span>
              </div>
            </div>
          )}

          {/* Bottom Action Footer */}
          <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
            <button
              onClick={() => {
                if (currentIndex > 0) {
                  setCurrentIndex(currentIndex - 1);
                  setIsAnswerChecked(false);
                }
              }}
              disabled={currentIndex === 0}
              className="text-xs font-bold px-4 py-2.5 rounded-xl text-slate-600 hover:text-slate-950 disabled:opacity-30 disabled:pointer-events-none transition-colors"
            >
              ← ข้อก่อนหน้า
            </button>

            <div className="flex items-center gap-3">
              {!isAnswerChecked ? (
                <button
                  onClick={handleCheckAnswer}
                  disabled={!selectedOptionId}
                  className="px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm transition-all disabled:opacity-40 disabled:pointer-events-none shadow-md shadow-blue-500/20 hover:-translate-y-0.5"
                >
                  ตรวจคำตอบ
                </button>
              ) : (
                <button
                  onClick={handleNextQuestion}
                  className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-xs sm:text-sm transition-all shadow-md shadow-emerald-500/20 hover:-translate-y-0.5"
                >
                  <span>{currentIndex === questions.length - 1 ? 'ดูสรุปผลคะแนน' : 'ข้อถัดไป'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
