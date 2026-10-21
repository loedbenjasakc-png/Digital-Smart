import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  CheckCircle2,
  Clock,
  ArrowRight,
  ArrowLeft,
  ShieldAlert,
  AlertTriangle,
  Lightbulb,
  Award,
  ChevronRight,
  Sparkles,
  FileText,
  BookmarkCheck,
  Compass,
  Check,
  Zap,
  ShieldCheck,
  FileSearch,
  LockKeyhole,
  HeartHandshake
} from 'lucide-react';
import { CATEGORIES, LESSONS } from '../../data/digitalLiteracyData';
import { Lesson, CategoryId } from '../../types';
import { ActiveTab } from '../Navbar';
import { PasswordChecker } from '../interactive/PasswordChecker';
import { UrlInspector } from '../interactive/UrlInspector';
import { PrivacyChecklist } from '../interactive/PrivacyChecklist';
import { NetiquetteMeter } from '../interactive/NetiquetteMeter';

interface LearningHubViewProps {
  onNavigate: (tab: ActiveTab) => void;
  completedLessons: string[];
  onMarkComplete: (lessonId: string) => boolean;
  initialCategory?: CategoryId;
}

export function LearningHubView({
  onNavigate,
  completedLessons,
  onMarkComplete,
  initialCategory
}: LearningHubViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<CategoryId | 'all'>(
    initialCategory && initialCategory !== 'challenge' ? initialCategory : 'all'
  );
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    if (initialCategory && initialCategory !== 'challenge') {
      setSelectedCategory(initialCategory);
    }
  }, [initialCategory]);

  const filteredLessons = selectedCategory === 'all'
    ? LESSONS
    : LESSONS.filter((l) => l.categoryId === selectedCategory);

  const handleCompleteClick = (lesson: Lesson) => {
    const isNew = onMarkComplete(lesson.id);
    if (isNew) {
      setToastMessage(`🎉 ยินดีด้วย! คุณเรียนจบ "${lesson.title}" ได้รับ +25 XP สะสม`);
    } else {
      setToastMessage(`คุณได้สำเร็จบทเรียนนี้แล้ว`);
    }
    setTimeout(() => setToastMessage(null), 4000);
  };

  const getCategoryTheme = (catId: CategoryId) => {
    switch (catId) {
      case 'safety':
        return {
          title: 'Digital Safety',
          titleTh: 'ความปลอดภัยดิจิทัล',
          gradient: 'from-blue-600 to-cyan-600',
          badgeBg: 'bg-blue-100 text-blue-800',
          borderActive: 'border-blue-500',
          icon: ShieldCheck
        };
      case 'media':
        return {
          title: 'Media Check',
          titleTh: 'การตรวจสอบสื่อ',
          gradient: 'from-purple-600 to-pink-600',
          badgeBg: 'bg-purple-100 text-purple-800',
          borderActive: 'border-purple-500',
          icon: FileSearch
        };
      case 'privacy':
        return {
          title: 'Privacy Guard',
          titleTh: 'การปกป้องข้อมูลส่วนตัว',
          gradient: 'from-emerald-600 to-teal-600',
          badgeBg: 'bg-emerald-100 text-emerald-800',
          borderActive: 'border-emerald-500',
          icon: LockKeyhole
        };
      case 'manners':
        return {
          title: 'Digital Manners',
          titleTh: 'มารยาทออนไลน์',
          gradient: 'from-indigo-600 to-rose-600',
          badgeBg: 'bg-indigo-100 text-indigo-800',
          borderActive: 'border-indigo-500',
          icon: HeartHandshake
        };
      default:
        return {
          title: 'Digital Smart',
          titleTh: 'ฉลาดใช้ชีวิตดิจิทัล',
          gradient: 'from-blue-600 to-purple-600',
          badgeBg: 'bg-slate-100 text-slate-800',
          borderActive: 'border-slate-500',
          icon: BookOpen
        };
    }
  };

  const renderInteractiveWidget = (type?: string) => {
    switch (type) {
      case 'password-checker':
        return <PasswordChecker />;
      case 'url-inspector':
        return <UrlInspector />;
      case 'privacy-checklist':
        return <PrivacyChecklist />;
      case 'netiquette-meter':
        return <NetiquetteMeter />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 border border-slate-700 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-400 to-orange-500 flex items-center justify-center text-slate-950 font-bold shrink-0">
            ★
          </div>
          <span className="text-xs sm:text-sm font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Main View: Lesson detail reading mode */}
      {activeLesson ? (
        <div className="bg-white rounded-[2rem] border border-slate-200/90 shadow-xl p-6 sm:p-10 md:p-12 space-y-8 relative overflow-hidden">
          {/* Subtle top ambient glow based on category */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600" />

          {/* Top Bar inside Lesson */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <button
              onClick={() => setActiveLesson(null)}
              className="inline-flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-slate-950 bg-slate-100 hover:bg-slate-200 px-4 py-2.5 rounded-xl transition-all hover:-translate-x-0.5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>กลับสู่รายการบทเรียน</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={() => onNavigate('quiz')}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-700 bg-purple-50 hover:bg-purple-100 border border-purple-200 px-3.5 py-2 rounded-xl transition-colors"
              >
                <Award className="w-4 h-4 text-purple-600" />
                <span>ทำแบบทดสอบ</span>
              </button>
              <button
                onClick={() => onNavigate('home')}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 border border-slate-200 px-3.5 py-2 rounded-xl transition-colors"
              >
                <Compass className="w-4 h-4 text-slate-400" />
                <span>กลับหน้าหลัก</span>
              </button>
            </div>
          </div>

          {/* Lesson Title Header */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold">
              <span className={`px-2.5 py-0.5 rounded-full ${getCategoryTheme(activeLesson.categoryId).badgeBg}`}>
                {getCategoryTheme(activeLesson.categoryId).titleTh}
              </span>
              <span className="text-slate-400">·</span>
              <span className="flex items-center gap-1 text-slate-500 font-medium">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                ใช้เวลาอ่าน {activeLesson.readTime}
              </span>
              {completedLessons.includes(activeLesson.id) && (
                <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full font-bold text-xs border border-emerald-200">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  สำเร็จบทเรียนแล้ว
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-snug">
              {activeLesson.title}
            </h1>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-3xl">
              {activeLesson.subtitle}
            </p>
          </div>

          {/* Real World Case Box with Eye-Catching Styling */}
          <div className="bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-amber-500/15 border-2 border-amber-300/80 rounded-2xl p-6 space-y-4 shadow-xs">
            <div className="flex items-center gap-2 text-amber-900 font-extrabold text-sm sm:text-base">
              <div className="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-xs">
                <Lightbulb className="w-5 h-5" />
              </div>
              <span>กรณีศึกษาจากเหตุการณ์จริง (Real-World Case Study)</span>
            </div>
            
            <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-semibold bg-white/80 p-4 rounded-xl border border-amber-200/80">
              "{activeLesson.realWorldCase.situation}"
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div className="p-4 bg-red-50/80 rounded-xl border border-red-200">
                <span className="font-bold text-red-800 block mb-1 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-red-600" />
                  ผลกระทบและความเสียหาย:
                </span>
                <span className="text-red-950 font-normal leading-relaxed">{activeLesson.realWorldCase.impact}</span>
              </div>
              <div className="p-4 bg-emerald-50/80 rounded-xl border border-emerald-200">
                <span className="font-bold text-emerald-800 block mb-1 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-600" />
                  วิธีรับมือและแนวทางที่ถูกต้อง:
                </span>
                <span className="text-emerald-950 font-normal leading-relaxed">{activeLesson.realWorldCase.solution}</span>
              </div>
            </div>
          </div>

          {/* Core Content Sections */}
          <div className="space-y-8 pt-4">
            {activeLesson.sections.map((section, sIdx) => (
              <div key={sIdx} className="space-y-4">
                <h3 className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white text-xs font-bold font-mono flex items-center justify-center shrink-0 shadow-sm">
                    {sIdx + 1}
                  </span>
                  <span>{section.title}</span>
                </h3>

                <div className="space-y-3 text-sm text-slate-700 leading-relaxed pl-11">
                  {section.content.map((p, pIdx) => (
                    <p key={pIdx} className="font-normal">{p}</p>
                  ))}
                </div>

                {section.warning && (
                  <div className="ml-11 p-4 rounded-xl bg-red-50 border border-red-200 text-xs sm:text-sm text-red-900 flex items-start gap-3 shadow-xs">
                    <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                    <span className="font-medium leading-relaxed">{section.warning}</span>
                  </div>
                )}

                {section.tips && (
                  <div className="ml-11 p-4 rounded-xl bg-blue-50/80 border border-blue-200 text-xs sm:text-sm text-blue-950 space-y-2">
                    <span className="font-bold block text-blue-800 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-blue-600" />
                      เคล็ดลับเพิ่มเติมสำหรับนักเรียน:
                    </span>
                    <ul className="list-disc list-inside space-y-1 text-blue-900">
                      {section.tips.map((tip, tIdx) => (
                        <li key={tIdx}>{tip}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Interactive Widget if available */}
          {activeLesson.interactiveType && (
            <div className="pt-2">
              {renderInteractiveWidget(activeLesson.interactiveType)}
            </div>
          )}

          {/* Key Takeaways Box */}
          <div className="bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 space-y-4 shadow-lg border border-indigo-700/50">
            <div className="flex items-center gap-2 text-cyan-300 font-black text-base">
              <BookmarkCheck className="w-6 h-6 text-cyan-400" />
              <span>สรุปสิ่งที่ต้องจำให้ขึ้นใจ (Key Takeaways)</span>
            </div>
            <ul className="space-y-3">
              {activeLesson.keyTakeaways.map((takeaway, tIdx) => (
                <li key={tIdx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-200 font-medium leading-relaxed">
                  <div className="w-5 h-5 rounded-full bg-cyan-400/20 text-cyan-300 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>{takeaway}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Bottom Action Footer */}
          <div className="pt-8 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
            <button
              onClick={() => handleCompleteClick(activeLesson)}
              className={`flex items-center gap-2 px-6 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all shadow-sm ${
                completedLessons.includes(activeLesson.id)
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                  : 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-emerald-500/20 hover:-translate-y-0.5'
              }`}
            >
              <CheckCircle2 className="w-5 h-5" />
              <span>
                {completedLessons.includes(activeLesson.id)
                  ? 'สำเร็จบทเรียนนี้แล้ว (บันทึกแล้ว)'
                  : 'ทำเครื่องหมายว่าเรียนจบแล้ว (+25 XP)'}
              </span>
            </button>

            <div className="flex items-center gap-3">
              <button
                onClick={() => onNavigate('scenarios')}
                className="flex items-center gap-2 px-5 py-3 text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-xl transition-all hover:-translate-y-0.5"
              >
                <span>ไปฝึกสถานการณ์จำลอง</span>
                <ChevronRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => onNavigate('quiz')}
                className="flex items-center gap-2 px-5 py-3 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-all shadow-md hover:-translate-y-0.5"
              >
                <span>ทดสอบ Smart Quiz</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Lessons Grid Hub */
        <div className="space-y-8">
          {/* Header Banner */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-extrabold text-blue-600 uppercase tracking-wider">
                <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                <span>คลังบทเรียนดิจิทัล (Learning Hub)</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
                4 หมวดบทเรียนสำคัญเพื่อชีวิตดิจิทัลที่ปลอดภัย
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                เนื้อหากระชับ ออกแบบมาเพื่อให้นำไปปรับใช้ได้ทันที พร้อมเครื่องมือจำลองในบทเรียน
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

          {/* Category Tabs with vibrant pills */}
          <div className="flex flex-wrap items-center gap-2 p-1.5 bg-slate-100 rounded-2xl border border-slate-200">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedCategory === 'all'
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-950 hover:bg-white/60'
              }`}
            >
              ทั้งหมด ({LESSONS.length})
            </button>

            {CATEGORIES.filter((c) => c.id !== 'challenge').map((cat) => {
              const count = LESSONS.filter((l) => l.categoryId === cat.id).length;
              const isSelected = selectedCategory === cat.id;
              const theme = getCategoryTheme(cat.id);

              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                    isSelected
                      ? `bg-gradient-to-r ${theme.gradient} text-white shadow-md`
                      : 'text-slate-600 hover:text-slate-950 hover:bg-white/60'
                  }`}
                >
                  <span>{cat.title}</span>
                  <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-md ${isSelected ? 'bg-white/20' : 'bg-slate-200'}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Lessons Grid Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredLessons.map((lesson) => {
              const theme = getCategoryTheme(lesson.categoryId);
              const isCompleted = completedLessons.includes(lesson.id);

              return (
                <div
                  key={lesson.id}
                  className="bg-white rounded-3xl border border-slate-200/90 hover:border-blue-400 p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group cursor-pointer hover:-translate-y-1.5"
                  onClick={() => setActiveLesson(lesson)}
                >
                  <div className="space-y-3.5">
                    {/* Top pill bar */}
                    <div className="flex items-center justify-between text-xs">
                      <span className={`px-2.5 py-0.5 rounded-full font-bold text-[11px] ${theme.badgeBg}`}>
                        {theme.titleTh}
                      </span>
                      <div className="flex items-center gap-1.5 text-slate-400 font-medium text-[11px]">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{lesson.readTime}</span>
                      </div>
                    </div>

                    <h3 className="text-base font-extrabold text-slate-900 group-hover:text-blue-700 transition-colors leading-snug">
                      {lesson.title}
                    </h3>

                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed font-normal">
                      {lesson.subtitle}
                    </p>

                    <div className="text-[11px] text-slate-700 bg-amber-50/70 p-3 rounded-2xl border border-amber-200/60 flex items-start gap-2">
                      <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <span className="line-clamp-2"><strong>เคสจริง:</strong> {lesson.realWorldCase.impact}</span>
                    </div>
                  </div>

                  <div className="pt-5 mt-5 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      {isCompleted ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          เรียนแล้ว (+25 XP)
                        </span>
                      ) : (
                        <span className="text-[11px] text-slate-400 font-medium">ยังไม่ได้อ่าน</span>
                      )}
                    </div>

                    <div className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 group-hover:translate-x-1 transition-transform">
                      <span>อ่านบทเรียน</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
