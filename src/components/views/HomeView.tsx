import React, { useState } from 'react';
import {
  ShieldCheck,
  FileSearch,
  LockKeyhole,
  HeartHandshake,
  Flame,
  ArrowRight,
  Sparkles,
  BookOpen,
  Award,
  CheckCircle2,
  HelpCircle,
  RefreshCw,
  Lightbulb,
  Zap,
  TrendingUp,
  Shield,
  Eye,
  Check
} from 'lucide-react';
import { CATEGORIES, DAILY_TIPS } from '../../data/digitalLiteracyData';
import { ActiveTab } from '../Navbar';
import { CategoryId } from '../../types';

interface HomeViewProps {
  onNavigate: (tab: ActiveTab, categoryId?: CategoryId) => void;
  points: number;
  completedLessonsCount: number;
  totalLessons: number;
  lessonProgressPercent: number;
  completedScenariosCount: number;
  totalScenarios: number;
  latestQuizScore: { score: number; total: number; percentage: number } | null;
}

export function HomeView({
  onNavigate,
  points,
  completedLessonsCount,
  totalLessons,
  lessonProgressPercent,
  completedScenariosCount,
  totalScenarios,
  latestQuizScore
}: HomeViewProps) {
  const [tipIndex, setTipIndex] = useState(0);

  const rotateTip = () => {
    setTipIndex((prev) => (prev + 1) % DAILY_TIPS.length);
  };

  const getCategoryStyles = (id: CategoryId) => {
    switch (id) {
      case 'safety':
        return {
          icon: ShieldCheck,
          gradient: 'from-blue-600 to-cyan-500',
          lightBg: 'bg-gradient-to-br from-blue-50/80 to-cyan-50/40',
          borderHover: 'hover:border-blue-400 hover:shadow-blue-500/15',
          accentText: 'text-blue-600',
          badge: 'เกราะป้องกันภัยไซเบอร์',
          tag: 'สำคัญมาก'
        };
      case 'media':
        return {
          icon: FileSearch,
          gradient: 'from-purple-600 to-pink-500',
          lightBg: 'bg-gradient-to-br from-purple-50/80 to-pink-50/40',
          borderHover: 'hover:border-purple-400 hover:shadow-purple-500/15',
          accentText: 'text-purple-600',
          badge: 'ตรวจจับ AI & ข่าวลวง',
          tag: 'ยอดนิยม'
        };
      case 'privacy':
        return {
          icon: LockKeyhole,
          gradient: 'from-emerald-600 to-teal-500',
          lightBg: 'bg-gradient-to-br from-emerald-50/80 to-teal-50/40',
          borderHover: 'hover:border-emerald-400 hover:shadow-emerald-500/15',
          accentText: 'text-emerald-600',
          badge: 'พิทักษ์ข้อมูลส่วนบุคคล',
          tag: 'จำเป็น'
        };
      case 'manners':
        return {
          icon: HeartHandshake,
          gradient: 'from-indigo-600 to-rose-500',
          lightBg: 'bg-gradient-to-br from-indigo-50/80 to-rose-50/40',
          borderHover: 'hover:border-indigo-400 hover:shadow-indigo-500/15',
          accentText: 'text-indigo-600',
          badge: 'สังคมออนไลน์สร้างสรรค์',
          tag: 'แนะนำ'
        };
      case 'challenge':
      default:
        return {
          icon: Flame,
          gradient: 'from-amber-500 via-orange-500 to-red-500',
          lightBg: 'bg-gradient-to-br from-amber-50/80 to-orange-50/40',
          borderHover: 'hover:border-amber-400 hover:shadow-amber-500/15',
          accentText: 'text-amber-600',
          badge: 'ท้าทายไหวพริบสถานการณ์จริง',
          tag: 'ฝึกด่วน'
        };
    }
  };

  return (
    <div className="space-y-12 pb-20">
      {/* Hero Section with Vibrant Mesh & Cyber Glow */}
      <section className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white shadow-2xl shadow-indigo-950/20 border border-white/10">
        {/* Ambient Glow Orbs */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-500/20 rounded-full animate-glow pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-purple-500/25 rounded-full animate-glow pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[36rem] h-[36rem] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-10 md:p-14">
          {/* Left Column: Hero Copy & Actions */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs text-cyan-300 shadow-inner">
              <Sparkles className="w-4 h-4 text-cyan-300 animate-spin-slow" />
              <span className="font-semibold tracking-wide">แพลตฟอร์ม Digital Literacy ยุค AI สำหรับเยาวชน</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-[3.25rem] font-black tracking-tight leading-[1.15] text-white text-balance">
              Digital Smart <br />
              <span className="bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300 bg-clip-text text-transparent">
                ฉลาดใช้ชีวิตในโลกดิจิทัล
              </span>
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl font-normal">
              เสริมเกราะป้องกันภัยไซเบอร์ รู้ทันกลลวงและข่าวปลอม ปกป้องความเป็นส่วนตัว และร่วมสร้างมารยาทการสื่อสารที่ปลอดภัยในโลกออนไลน์
            </p>

            {/* Quick Metrics Strip on Hero */}
            <div className="grid grid-cols-3 gap-3 py-1 max-w-lg">
              <div className="p-3 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 text-center">
                <span className="text-xl sm:text-2xl font-black text-cyan-300 font-mono tabular-nums block">
                  12
                </span>
                <span className="text-[11px] text-slate-300">บทเรียนเจาะลึก</span>
              </div>
              <div className="p-3 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 text-center">
                <span className="text-xl sm:text-2xl font-black text-purple-300 font-mono tabular-nums block">
                  6
                </span>
                <span className="text-[11px] text-slate-300">สถานการณ์จำลอง</span>
              </div>
              <div className="p-3 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 text-center">
                <span className="text-xl sm:text-2xl font-black text-amber-300 font-mono tabular-nums block">
                  100%
                </span>
                <span className="text-[11px] text-slate-300">เกียรติบัตรรับรอง</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <button
                onClick={() => onNavigate('lessons')}
                className="flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 hover:from-blue-600 hover:via-indigo-600 hover:to-purple-700 text-white font-bold text-sm shadow-xl shadow-blue-500/30 hover:shadow-blue-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all"
              >
                <BookOpen className="w-4 h-4" />
                <span>เริ่มเรียนรู้บทเรียน</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate('scenarios')}
                className="flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-white/10 hover:bg-white/15 backdrop-blur-md border border-white/20 text-white font-semibold text-sm transition-all hover:-translate-y-0.5"
              >
                <Zap className="w-4 h-4 text-amber-400" />
                <span>ฝึกสถานการณ์ (Lab)</span>
              </button>

              <button
                onClick={() => onNavigate('quiz')}
                className="flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-white/10 hover:bg-white/15 backdrop-blur-md border border-white/20 text-white font-semibold text-sm transition-all hover:-translate-y-0.5"
              >
                <Award className="w-4 h-4 text-emerald-400" />
                <span>ทำแบบทดสอบ 10 ข้อ</span>
              </button>
            </div>
          </div>

          {/* Right Column: Hero Visual Graphic */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border-2 border-white/20 shadow-2xl group">
              <img
                src="/src/assets/images/hero_digital_smart_1792601339070.jpg"
                alt="Digital Smart Learning for Students"
                className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent pointer-events-none" />
              
              {/* Floating Live Badge */}
              <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md border border-white/20 text-[11px] font-semibold text-emerald-400 flex items-center gap-1.5 shadow-md">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>พร้อมใช้งาน 100%</span>
              </div>

              <div className="absolute bottom-4 left-4 right-4 text-xs text-white">
                <span className="font-bold block text-sm text-cyan-200">
                  เรียนสนุก เข้าใจง่าย ป้องกันตัวได้จริง
                </span>
                <span className="text-slate-300 text-[11px]">
                  ผ่านการคัดสรรเนื้อหาให้เข้ากับสถานการณ์ดิจิทัลปัจจุบัน
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gamified Progress & Stats Strip */}
      <section className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block">
                ความคืบหน้าในการเรียนรู้ของคุณ
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800">
                Auto-saved
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5">
              ติดตามทักษะดิจิทัลและคะแนนสะสม
            </h3>
          </div>

          <button
            onClick={() => onNavigate('progress')}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 transition-all self-start md:self-auto hover:-translate-y-0.5 shadow-xs"
          >
            <span>ดูรายงานและออกเกียรติบัตร</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 pt-6">
          {/* Card 1: Lessons Progress */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-blue-50/60 via-white to-blue-50/30 border border-blue-100/80 shadow-xs space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-600">
              <span className="flex items-center gap-2 font-bold text-slate-800">
                <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center">
                  <BookOpen className="w-4 h-4" />
                </div>
                บทเรียนที่สำเร็จ
              </span>
              <span className="font-extrabold text-blue-900 font-mono text-sm">{completedLessonsCount}/{totalLessons}</span>
            </div>
            <div className="w-full bg-slate-200/80 h-2.5 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-blue-600 to-cyan-500 h-full rounded-full transition-all duration-700 shadow-sm"
                style={{ width: `${lessonProgressPercent}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-[11px] text-slate-500">
              <span>ความคืบหน้า</span>
              <span className="font-bold text-blue-700">{lessonProgressPercent}%</span>
            </div>
          </div>

          {/* Card 2: Scenarios Practiced */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-50/60 via-white to-emerald-50/30 border border-emerald-100/80 shadow-xs space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-600">
              <span className="flex items-center gap-2 font-bold text-slate-800">
                <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                สถานการณ์จำลอง
              </span>
              <span className="font-extrabold text-emerald-900 font-mono text-sm">{completedScenariosCount}/{totalScenarios}</span>
            </div>
            <div className="w-full bg-slate-200/80 h-2.5 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-emerald-500 to-teal-500 h-full rounded-full transition-all duration-700 shadow-sm"
                style={{ width: `${Math.round((completedScenariosCount / totalScenarios) * 100)}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-[11px] text-slate-500">
              <span>ตัดสินใจแล้ว</span>
              <span className="font-bold text-emerald-700">{Math.round((completedScenariosCount / totalScenarios) * 100)}%</span>
            </div>
          </div>

          {/* Card 3: Quiz Score */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-purple-50/60 via-white to-purple-50/30 border border-purple-100/80 shadow-xs space-y-2">
            <span className="flex items-center gap-2 text-xs font-bold text-slate-800">
              <div className="w-7 h-7 rounded-lg bg-purple-600 text-white flex items-center justify-center">
                <Award className="w-4 h-4" />
              </div>
              คะแนน Smart Quiz
            </span>
            <div className="flex items-baseline gap-2 pt-1">
              <span className="text-2xl font-black text-purple-900 font-mono tabular-nums">
                {latestQuizScore ? `${latestQuizScore.score}/10` : '—'}
              </span>
              <span className="text-xs text-purple-700 font-semibold">
                {latestQuizScore ? `(${latestQuizScore.percentage}%)` : 'ยังไม่ได้ทดสอบ'}
              </span>
            </div>
            <button
              onClick={() => onNavigate('quiz')}
              className="text-[11px] font-bold text-purple-700 hover:text-purple-800 flex items-center gap-1 block pt-1"
            >
              <span>{latestQuizScore ? 'ทดสอบซ้ำพัฒนาคะแนน' : 'เริ่มทำแบบทดสอบ →'}</span>
            </button>
          </div>

          {/* Card 4: Total Points & XP */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-500/10 via-orange-500/10 to-amber-500/5 border border-amber-300/80 shadow-xs space-y-2">
            <span className="flex items-center gap-2 text-xs font-bold text-amber-900">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-amber-500 to-orange-500 text-white flex items-center justify-center shadow-xs">
                <Sparkles className="w-4 h-4" />
              </div>
              คะแนนสะสม (Digital XP)
            </span>
            <div className="flex items-baseline gap-2 pt-1">
              <span className="text-2xl font-black text-amber-950 font-mono tabular-nums">{points}</span>
              <span className="text-xs text-amber-800 font-bold">XP</span>
            </div>
            <span className="text-[11px] text-amber-800/90 block">
              รับ +25 XP ต่อบทเรียน และ +10 XP ต่อสถานการณ์
            </span>
          </div>
        </div>
      </section>

      {/* 5 Core Modules Section with Elevated Aesthetic */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-extrabold text-indigo-600 uppercase tracking-wider">
              <span>5 เสาหลักแห่งความฉลาดทางดิจิทัล</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
              สำรวจเนื้อหาและสนามทดลอง
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-xl">
              เลือกบทเรียนที่คุณสนใจ พร้อมกรณีศึกษาจริงและเครื่องมือ Interactive ภายในตัว
            </p>
          </div>

          <button
            onClick={() => onNavigate('lessons')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 hover:text-blue-800 transition-colors self-start sm:self-auto"
          >
            <span>ดูบทเรียนทั้งหมด (12 บทเรียน)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map((cat, index) => {
            const styles = getCategoryStyles(cat.id);
            const Icon = styles.icon;
            const isChallenge = cat.id === 'challenge';

            return (
              <div
                key={cat.id}
                className={`rounded-3xl border border-slate-200/90 p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group ${styles.lightBg} ${styles.borderHover} hover:-translate-y-1.5`}
              >
                <div className="space-y-4">
                  {/* Card Header */}
                  <div className="flex items-start justify-between">
                    <div
                      className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${styles.gradient} flex items-center justify-center text-white shadow-md transition-transform group-hover:scale-110 group-hover:rotate-3 duration-300`}
                    >
                      <Icon className="w-7 h-7" />
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className="text-[11px] font-mono font-bold text-slate-400">
                        0{index + 1}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white text-slate-700 border border-slate-200/80 shadow-xs">
                        {styles.tag}
                      </span>
                    </div>
                  </div>

                  {/* Title & Tagline */}
                  <div>
                    <h3 className="text-xl font-black text-slate-900 group-hover:text-blue-700 transition-colors">
                      {cat.title}
                    </h3>
                    <span className="text-xs font-bold text-slate-600 block mt-0.5">
                      {cat.titleTh}
                    </span>
                    <span className="text-[11px] font-medium text-slate-500 block mt-1">
                      {styles.badge}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                {/* Card Footer */}
                <div className="pt-5 mt-5 border-t border-slate-200/60 flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-500">
                    {isChallenge ? '6 สถานการณ์ + ควิซ' : `${cat.lessonCount} บทเรียนเจาะลึก`}
                  </span>

                  <button
                    onClick={() => {
                      if (isChallenge) {
                        onNavigate('scenarios');
                      } else {
                        onNavigate('lessons', cat.id);
                      }
                    }}
                    className={`inline-flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-xl text-white bg-gradient-to-r ${styles.gradient} shadow-sm group-hover:shadow-md transition-all group-hover:translate-x-0.5`}
                  >
                    <span>{isChallenge ? 'เข้าสู่สนามฝึก' : 'เข้าสู่บทเรียน'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Cyber Tips & Quick Action Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Daily Tip with Neon Accent */}
        <div className="lg:col-span-6 bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-indigo-700/40 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-violet-500/10 rounded-full blur-2xl pointer-events-none" />

          <div className="space-y-4 relative z-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-cyan-300 font-bold text-sm">
                <Lightbulb className="w-5 h-5 text-amber-400" />
                <span>เกร็ดความรู้ดิจิทัลประจำวัน (Daily Digital Tip)</span>
              </div>
              <button
                onClick={rotateTip}
                className="px-2.5 py-1 text-xs text-cyan-200 hover:text-white bg-white/10 hover:bg-white/20 rounded-xl transition-colors flex items-center gap-1 border border-white/10"
                title="สุ่มเกร็ดข้อถัดไป"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>สุ่มทิปใหม่</span>
              </button>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/15">
              <p className="text-white text-sm sm:text-base leading-relaxed font-medium">
                "{DAILY_TIPS[tipIndex]}"
              </p>
            </div>
          </div>

          <div className="pt-4 text-xs text-slate-400 flex items-center justify-between relative z-10">
            <span>💡 ทิปที่ {tipIndex + 1} จาก {DAILY_TIPS.length} ข้อมูลความปลอดภัยสำหรับคนรุ่นใหม่</span>
            <span className="text-cyan-300 font-bold cursor-pointer hover:underline" onClick={rotateTip}>
              กดเปลี่ยนข้อ →
            </span>
          </div>
        </div>

        {/* Quick Challenge Banner with Fiery Gradient */}
        <div className="lg:col-span-6 bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-blue-700/40 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/15 rounded-full blur-2xl pointer-events-none" />

          <div className="space-y-4 relative z-10">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
              <Flame className="w-5 h-5 text-amber-400 animate-bounce" />
              <span>ท้าทายตนเอง: ทำแบบทดสอบและรับเกียรติบัตร</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-white">
              พร้อมพิสูจน์ความรอบรู้หรือยัง?
            </h3>

            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              ตอบคำถาม 10 ข้อ วัดระดับความฉลาดในการใช้ชีวิตดิจิทัล พร้อมดาวน์โหลดและพิมพ์เกียรติบัตรรับรองทักษะ Digital Smart ประจำตัวคุณ
            </p>
          </div>

          <div className="pt-5 flex flex-wrap items-center gap-3 relative z-10">
            <button
              onClick={() => onNavigate('quiz')}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 hover:from-amber-500 hover:to-red-600 text-slate-950 font-bold text-xs shadow-lg shadow-orange-500/25 transition-all hover:-translate-y-0.5"
            >
              <Award className="w-4 h-4" />
              <span>เริ่มทำแบบทดสอบ 10 ข้อ</span>
            </button>
            <button
              onClick={() => onNavigate('scenarios')}
              className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-xs transition-colors"
            >
              <Zap className="w-4 h-4 text-cyan-300" />
              <span>แก้สถานการณ์จำลอง (6 ข้อ)</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
