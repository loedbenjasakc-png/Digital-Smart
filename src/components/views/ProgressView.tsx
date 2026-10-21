import React, { useState } from 'react';
import {
  Award,
  BookOpen,
  CheckCircle2,
  Sparkles,
  BarChart3,
  RotateCcw,
  Printer,
  ShieldCheck,
  Compass,
  ArrowRight,
  TrendingUp,
  AlertCircle,
  Zap,
  Check,
  Shield
} from 'lucide-react';
import { ActiveTab } from '../Navbar';
import { QuizAttempt, UserProgress } from '../../types';

interface ProgressViewProps {
  onNavigate: (tab: ActiveTab) => void;
  progress: UserProgress;
  totalLessons: number;
  completedLessonsCount: number;
  lessonProgressPercent: number;
  totalScenarios: number;
  completedScenariosCount: number;
  scenarioProgressPercent: number;
  latestQuiz: QuizAttempt | null;
  bestQuizScore: number;
  overallPercent: number;
  levelTitle: string;
  categoryStats: Record<string, { total: number; done: number }>;
  onSetStudentName: (name: string) => void;
  onResetProgress: () => void;
}

export function ProgressView({
  onNavigate,
  progress,
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
  categoryStats,
  onSetStudentName,
  onResetProgress
}: ProgressViewProps) {
  const [nameInput, setNameInput] = useState(progress.studentName || '');
  const [isSavedName, setIsSavedName] = useState(Boolean(progress.studentName));
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const handleSaveName = (e: React.FormEvent) => {
    e.preventDefault();
    if (nameInput.trim()) {
      onSetStudentName(nameInput.trim());
      setIsSavedName(true);
    }
  };

  const handlePrintCertificate = () => {
    window.print();
  };

  const recommendations: string[] = [];
  if (categoryStats.safety.done < categoryStats.safety.total) {
    recommendations.push('ทบทวนบทเรียน Digital Safety เรื่องการตั้งรหัสผ่านแบบ Passphrase และวิธีสังเกตโดเมนฟิชชิง');
  }
  if (categoryStats.media.done < categoryStats.media.total) {
    recommendations.push('ฝึกใช้หลัก CRAAP Test และ Lateral Reading ในหมวด Media Check เพื่อจับโป๊ะภาพ AI Deepfake');
  }
  if (categoryStats.privacy.done < categoryStats.privacy.total) {
    recommendations.push('ศึกษาหมวด Privacy Guard เพื่อปิดสิทธิ์แอปที่เข้าถึงข้อมูลเกินจำเป็น และระวังการแชร์บาร์โค้ดตั๋ว');
  }
  if (categoryStats.manners.done < categoryStats.manners.total) {
    recommendations.push('เรียนรู้หลัก T.H.I.N.K. และวิธีรับมือ Cyberbullying ด้วยคาถา 4 ส. (หยุด-บันทึก-บล็อก-บอก)');
  }
  if (!latestQuiz || latestQuiz.percentage < 80) {
    recommendations.push('ทดสอบทำ Smart Quiz 10 ข้อ อีกครั้ง เพื่อพัฒนาคะแนนและรับเหรียญเกียรติยศระดับ Digital Master');
  }
  if (recommendations.length === 0) {
    recommendations.push('ยอดเยี่ยมที่สุด! คุณเรียนรู้ครบทุกเนื้อหาแล้ว หมั่นนำความรู้และสติไปใช้จริงในชีวิตประจำวันออนไลน์');
  }

  // Ranks milestone
  const ranks = [
    { title: 'Digital Starter', req: '0%', desc: 'เริ่มต้นการเรียนรู้', active: overallPercent >= 0 },
    { title: 'Digital Apprentice', req: '30%', desc: 'เข้าใจพื้นฐานความปลอดภัย', active: overallPercent >= 30 },
    { title: 'Digital Explorer', req: '60%', desc: 'รู้ทันสื่อและปกป้องข้อมูล', active: overallPercent >= 60 },
    { title: 'Digital Master', req: '85%', desc: 'เชี่ยวชาญชีวิตดิจิทัลรอบด้าน', active: overallPercent >= 85 }
  ];

  return (
    <div className="space-y-10 pb-20">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-extrabold text-blue-600 uppercase tracking-wider">
            <BarChart3 className="w-3.5 h-3.5 text-blue-600" />
            <span>สรุปผลการประเมินและการเติบโต (Progress & Analytics)</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
            เส้นทางการพัฒนาทักษะ Digital Literacy ของคุณ
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            ข้อมูลทั้งหมดถูกบันทึกอัตโนมัติบนอุปกรณ์ของคุณ (Local Storage)
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

      {/* Main KPI Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="p-6 rounded-3xl bg-gradient-to-br from-violet-50/80 via-white to-violet-50/40 border border-violet-200/80 shadow-xs space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="font-bold text-violet-900">ระดับความเชี่ยวชาญ</span>
            <Sparkles className="w-4 h-4 text-violet-500" />
          </div>
          <div className="text-base font-black text-slate-900 leading-snug">
            {levelTitle}
          </div>
          <div className="w-full bg-slate-200/70 h-2.5 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-violet-600 to-indigo-600 h-full rounded-full transition-all duration-700"
              style={{ width: `${overallPercent}%` }}
            />
          </div>
          <span className="text-[11px] text-slate-500 block text-right font-mono font-bold">{overallPercent}% ความสำเร็จรวม</span>
        </div>

        <div className="p-6 rounded-3xl bg-gradient-to-br from-blue-50/80 via-white to-blue-50/40 border border-blue-200/80 shadow-xs space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="font-bold text-blue-900">บทเรียนที่สำเร็จ</span>
            <BookOpen className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-3xl font-black text-slate-900 font-mono tabular-nums">
            {completedLessonsCount} <span className="text-base text-slate-400 font-normal">/ {totalLessons}</span>
          </div>
          <div className="w-full bg-slate-200/70 h-2.5 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-blue-600 to-cyan-500 h-full rounded-full transition-all duration-700"
              style={{ width: `${lessonProgressPercent}%` }}
            />
          </div>
          <span className="text-[11px] text-slate-500 block text-right font-mono font-bold">{lessonProgressPercent}% สำเร็จ</span>
        </div>

        <div className="p-6 rounded-3xl bg-gradient-to-br from-emerald-50/80 via-white to-emerald-50/40 border border-emerald-200/80 shadow-xs space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="font-bold text-emerald-900">สถานการณ์ที่ฝึกฝน</span>
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-3xl font-black text-slate-900 font-mono tabular-nums">
            {completedScenariosCount} <span className="text-base text-slate-400 font-normal">/ {totalScenarios}</span>
          </div>
          <div className="w-full bg-slate-200/70 h-2.5 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-emerald-500 to-teal-500 h-full rounded-full transition-all duration-700"
              style={{ width: `${scenarioProgressPercent}%` }}
            />
          </div>
          <span className="text-[11px] text-slate-500 block text-right font-mono font-bold">{scenarioProgressPercent}% สำเร็จ</span>
        </div>

        <div className="p-6 rounded-3xl bg-gradient-to-br from-amber-50/80 via-white to-orange-50/40 border border-amber-200/80 shadow-xs space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="font-bold text-amber-900">คะแนน Smart Quiz</span>
            <Award className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-3xl font-black text-slate-900 font-mono tabular-nums">
            {latestQuiz ? `${latestQuiz.score}` : '—'} <span className="text-base text-slate-400 font-normal">/ 10</span>
          </div>
          <span className="text-[11px] text-slate-500 block">
            {latestQuiz ? `คะแนนสูงสุดที่ทำได้: ${bestQuizScore}/10 (${Math.round((bestQuizScore/10)*100)}%)` : 'ยังไม่ได้ทดสอบ'}
          </span>
          <button
            onClick={() => onNavigate('quiz')}
            className="text-xs font-bold text-blue-600 hover:text-blue-700 block text-left"
          >
            {latestQuiz ? 'ทำแบบทดสอบอีกครั้ง →' : 'เข้าทำแบบทดสอบ →'}
          </button>
        </div>
      </div>

      {/* Rank Roadmap Strip */}
      <div className="bg-white rounded-[2rem] border border-slate-200/90 p-6 sm:p-8 shadow-sm space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-black text-slate-900">
              เส้นทางลำดับยศทางดิจิทัล (Mastery Roadmap)
            </h3>
            <span className="text-xs text-slate-500">
              ปลดล็อกตามคะแนนความก้าวหน้ารวมของคุณ
            </span>
          </div>
          <div className="text-xs font-bold text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200 font-mono">
            {progress.points} XP รวม
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {ranks.map((r, i) => (
            <div
              key={i}
              className={`p-4 rounded-2xl border-2 transition-all ${
                r.active
                  ? 'bg-gradient-to-br from-blue-50/90 to-indigo-50/60 border-blue-500 shadow-sm'
                  : 'bg-slate-50/60 border-slate-200 opacity-60'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded-md ${r.active ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-600'}`}>
                  {r.req}
                </span>
                {r.active && <CheckCircle2 className="w-4 h-4 text-blue-600" />}
              </div>
              <h5 className="font-black text-slate-900 text-sm">{r.title}</h5>
              <p className="text-xs text-slate-500 mt-1">{r.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Category Mastery Breakdown & Tailored Advice */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: 4 Domain Bars */}
        <div className="lg:col-span-6 bg-white rounded-[2rem] p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-black text-slate-900">
              ความก้าวหน้าใน 4 หมวดทักษะ
            </h3>
            <span className="text-xs text-slate-500">บทเรียนที่สำเร็จ</span>
          </div>

          <div className="space-y-4">
            {/* Safety */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-blue-900">1. Digital Safety (ความปลอดภัย)</span>
                <span className="font-mono text-slate-700 font-bold tabular-nums">
                  {categoryStats.safety.done}/{categoryStats.safety.total}
                </span>
              </div>
              <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden p-0.5">
                <div
                  className="bg-gradient-to-r from-blue-600 to-cyan-500 h-full rounded-full transition-all duration-700"
                  style={{ width: `${(categoryStats.safety.done / categoryStats.safety.total) * 100}%` }}
                />
              </div>
            </div>

            {/* Media */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-purple-900">2. Media Check (ตรวจสอบข่าว & AI)</span>
                <span className="font-mono text-slate-700 font-bold tabular-nums">
                  {categoryStats.media.done}/{categoryStats.media.total}
                </span>
              </div>
              <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden p-0.5">
                <div
                  className="bg-gradient-to-r from-purple-600 to-pink-500 h-full rounded-full transition-all duration-700"
                  style={{ width: `${(categoryStats.media.done / categoryStats.media.total) * 100}%` }}
                />
              </div>
            </div>

            {/* Privacy */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-emerald-900">3. Privacy Guard (ปกป้องข้อมูล)</span>
                <span className="font-mono text-slate-700 font-bold tabular-nums">
                  {categoryStats.privacy.done}/{categoryStats.privacy.total}
                </span>
              </div>
              <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden p-0.5">
                <div
                  className="bg-gradient-to-r from-emerald-500 to-teal-500 h-full rounded-full transition-all duration-700"
                  style={{ width: `${(categoryStats.privacy.done / categoryStats.privacy.total) * 100}%` }}
                />
              </div>
            </div>

            {/* Manners */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-indigo-900">4. Digital Manners (มารยาทออนไลน์)</span>
                <span className="font-mono text-slate-700 font-bold tabular-nums">
                  {categoryStats.manners.done}/{categoryStats.manners.total}
                </span>
              </div>
              <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden p-0.5">
                <div
                  className="bg-gradient-to-r from-indigo-600 to-rose-500 h-full rounded-full transition-all duration-700"
                  style={{ width: `${(categoryStats.manners.done / categoryStats.manners.total) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right: Personalized Recommendations */}
        <div className="lg:col-span-6 bg-gradient-to-br from-slate-50 via-blue-50/50 to-indigo-50/40 rounded-[2rem] p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-slate-900 font-black text-lg">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            <span>คำแนะนำเฉพาะบุคคลตามผลการเรียน</span>
          </div>

          <div className="space-y-3">
            {recommendations.map((rec, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-white border border-slate-200 text-xs sm:text-sm text-slate-800 leading-relaxed flex items-start gap-3 shadow-xs"
              >
                <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                  {idx + 1}
                </div>
                <span>{rec}</span>
              </div>
            ))}
          </div>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigate('lessons')}
              className="text-xs font-bold px-4 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors shadow-sm"
            >
              ไปยังคลังบทเรียน
            </button>
            <button
              onClick={() => onNavigate('scenarios')}
              className="text-xs font-bold px-4 py-2.5 bg-white text-slate-800 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors"
            >
              ฝึกสถานการณ์จำลอง
            </button>
          </div>
        </div>
      </div>

      {/* Official Certificate Section with Golden Hologram Aesthetics */}
      <div className="bg-white rounded-[2.5rem] border border-slate-200/90 p-6 sm:p-12 shadow-xl space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-extrabold text-amber-600 uppercase tracking-wider">
              <Award className="w-4 h-4 text-amber-500" />
              <span>เกียรติบัตรอิเล็กทรอนิกส์มาตรฐาน (Digital Certificate)</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
              เกียรติบัตรผู้ผ่านการเรียนรู้ Digital Smart
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              พิมพ์ชื่อ-นามสกุลของคุณ เพื่อสร้างและบันทึกเกียรติบัตรรับรองทักษะ
            </p>
          </div>

          <button
            onClick={handlePrintCertificate}
            className="inline-flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-slate-900 to-indigo-950 hover:from-slate-800 hover:to-indigo-900 text-white rounded-2xl text-xs font-bold shadow-md shadow-slate-900/20 transition-all hover:-translate-y-0.5"
          >
            <Printer className="w-4 h-4 text-amber-400" />
            <span>พิมพ์ / บันทึกเกียรติบัตร (PDF)</span>
          </button>
        </div>

        {/* Name input form */}
        <form onSubmit={handleSaveName} className="flex flex-wrap items-center gap-3 max-w-lg bg-slate-50 p-2 rounded-2xl border border-slate-200">
          <input
            type="text"
            value={nameInput}
            onChange={(e) => {
              setNameInput(e.target.value);
              setIsSavedName(false);
            }}
            placeholder="พิมพ์ชื่อ - นามสกุลของคุณ เช่น ด.ช. สมาร์ท รักเรียน"
            className="flex-1 px-4 py-2 text-xs sm:text-sm bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
          <button
            type="submit"
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-colors shadow-sm"
          >
            บันทึกชื่อลงเกียรติบัตร
          </button>
        </form>

        {/* Certificate Canvas Box */}
        <div
          id="certificate-print-area"
          className="relative bg-gradient-to-br from-amber-50/50 via-white to-blue-50/50 border-8 border-double border-amber-400/90 rounded-[2.5rem] p-8 sm:p-14 text-center space-y-7 shadow-2xl max-w-3xl mx-auto overflow-hidden print:m-0 print:border-4 print:shadow-none"
        >
          {/* Decorative Corner Ornaments */}
          <div className="absolute top-4 left-5 text-amber-500/40 text-3xl font-serif">✦</div>
          <div className="absolute top-4 right-5 text-amber-500/40 text-3xl font-serif">✦</div>
          <div className="absolute bottom-4 left-5 text-amber-500/40 text-3xl font-serif">✦</div>
          <div className="absolute bottom-4 right-5 text-amber-500/40 text-3xl font-serif">✦</div>

          {/* Trophy Header Seal */}
          <div className="w-20 h-20 rounded-full overflow-hidden mx-auto shadow-xl border-3 border-amber-400">
            <img
              src="/src/assets/images/achievement_trophy_1792601338918.jpg"
              alt="Digital Literacy Achievement Seal"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="space-y-1">
            <span className="text-xs tracking-widest uppercase font-black text-blue-700 block font-mono">
              DIGITAL LITERACY EXCELLENCE CERTIFICATE
            </span>
            <h4 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              เกียรติบัตรการเรียนรู้ชีวิตในโลกดิจิทัล
            </h4>
            <span className="text-xs text-slate-500 block pt-1 font-medium">
              มอบให้เพื่อแสดงว่า
            </span>
          </div>

          {/* Recipient Name */}
          <div className="py-2 border-b-2 border-slate-900/15 max-w-md mx-auto">
            <span className="text-2xl sm:text-4xl font-extrabold text-blue-950 tracking-tight font-serif">
              {progress.studentName || 'ผู้เรียนรู้ดิจิทัล'}
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed max-w-xl mx-auto font-normal">
            ได้ผ่านการศึกษาและฝึกฝนทักษะการใช้งานอินเทอร์เน็ตอย่างปลอดภัย รู้เท่าทันสื่อและข่าวสาร ปกป้องข้อมูลส่วนบุคคล และมีมารยาทในการสื่อสารออนไลน์ ตามหลักสูตร
            <br />
            <strong className="text-slate-900 font-extrabold text-sm sm:text-base">Digital Smart — ฉลาดใช้ชีวิตในโลกดิจิทัล</strong>
          </p>

          {/* Metric Badges */}
          <div className="flex flex-wrap justify-center gap-3 text-xs">
            <div className="p-2.5 px-4 bg-white/90 rounded-2xl border border-amber-200/80 shadow-xs">
              <span className="text-slate-500 block text-[10px]">ระดับทักษะ:</span>
              <span className="font-extrabold text-slate-900">{levelTitle}</span>
            </div>
            <div className="p-2.5 px-4 bg-white/90 rounded-2xl border border-amber-200/80 shadow-xs">
              <span className="text-slate-500 block text-[10px]">บทเรียนที่สำเร็จ:</span>
              <span className="font-extrabold text-slate-900">{completedLessonsCount}/{totalLessons} บทเรียน</span>
            </div>
            {latestQuiz && (
              <div className="p-2.5 px-4 bg-white/90 rounded-2xl border border-amber-200/80 shadow-xs">
                <span className="text-slate-500 block text-[10px]">ผลคะแนน Smart Quiz:</span>
                <span className="font-extrabold text-emerald-700">{latestQuiz.score}/{latestQuiz.total} ({latestQuiz.percentage}%)</span>
              </div>
            )}
          </div>

          {/* Date & Signature */}
          <div className="grid grid-cols-2 gap-8 pt-8 border-t border-slate-200/80 max-w-md mx-auto text-xs text-slate-600">
            <div>
              <div className="font-serif italic font-bold text-slate-900 text-sm mb-1">
                Digital Smart Academy
              </div>
              <div className="border-t border-slate-300 pt-1 text-[11px] text-slate-500 font-medium">
                คณะกรรมการส่งเสริมทักษะดิจิทัล
              </div>
            </div>
            <div>
              <div className="font-mono font-bold text-slate-900 text-sm mb-1">
                {new Date().toLocaleDateString('th-TH', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
              <div className="border-t border-slate-300 pt-1 text-[11px] text-slate-500 font-medium">
                วันที่ออกเกียรติบัตร
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reset Progress Confirmation */}
      <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h4 className="text-xs sm:text-sm font-bold text-slate-800">
            ต้องการเริ่มต้นใหม่ทั้งหมดหรือไม่?
          </h4>
          <p className="text-xs text-slate-500 mt-0.5">
            รีเซ็ตบทเรียน คะแนน และประวัติการทำแบบทดสอบเพื่อเริ่มต้นใหม่อีกครั้ง
          </p>
        </div>

        {showResetConfirm ? (
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onResetProgress();
                setShowResetConfirm(false);
              }}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold transition-colors shadow-sm"
            >
              ยืนยันการรีเซ็ต
            </button>
            <button
              onClick={() => setShowResetConfirm(false)}
              className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-xl text-xs font-bold transition-colors"
            >
              ยกเลิก
            </button>
          </div>
        ) : (
          <button
            onClick={() => setShowResetConfirm(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-red-600 hover:text-red-700 hover:bg-red-50 border border-red-200 rounded-xl transition-colors self-start sm:self-auto"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>รีเซ็ตข้อมูลความก้าวหน้า</span>
          </button>
        )}
      </div>
    </div>
  );
}
