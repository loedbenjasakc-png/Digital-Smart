import React, { useState } from 'react';
import {
  ShieldAlert,
  ShieldCheck,
  Smartphone,
  MessageCircle,
  Mail,
  AlertCircle,
  CheckCircle2,
  XCircle,
  HelpCircle,
  RotateCcw,
  ArrowRight,
  Sparkles,
  Award,
  Compass,
  Wifi,
  Battery,
  Flame,
  Zap,
  Info
} from 'lucide-react';
import { SCENARIOS } from '../../data/digitalLiteracyData';
import { Scenario, ScenarioOption } from '../../types';
import { ActiveTab } from '../Navbar';

interface ScenarioLabViewProps {
  onNavigate: (tab: ActiveTab) => void;
  completedScenarios: Record<string, string>;
  onRecordAnswer: (scenarioId: string, optionId: string, score: number) => void;
}

export function ScenarioLabView({
  onNavigate,
  completedScenarios,
  onRecordAnswer
}: ScenarioLabViewProps) {
  const [activeScenarioIdx, setActiveScenarioIdx] = useState(0);
  const currentScenario = SCENARIOS[activeScenarioIdx];

  const selectedOptionId = completedScenarios[currentScenario.id] || null;
  const selectedOption = currentScenario.options.find(
    (opt) => opt.id === selectedOptionId
  );

  const handleSelectOption = (option: ScenarioOption) => {
    onRecordAnswer(currentScenario.id, option.id, option.score);
  };

  const handleNext = () => {
    if (activeScenarioIdx < SCENARIOS.length - 1) {
      setActiveScenarioIdx(activeScenarioIdx + 1);
    }
  };

  const handlePrev = () => {
    if (activeScenarioIdx > 0) {
      setActiveScenarioIdx(activeScenarioIdx - 1);
    }
  };

  // Render mock UI inside a smartphone / device container
  const renderDeviceMock = (scenario: Scenario) => {
    const { mockType, mockContent } = scenario;

    return (
      <div className="bg-slate-950 text-white rounded-[2.5rem] p-4 shadow-2xl border-4 border-slate-800 max-w-sm mx-auto relative overflow-hidden">
        {/* Device Speaker & Camera Notch */}
        <div className="flex items-center justify-between px-4 pb-3 pt-1 text-[11px] text-slate-400 font-mono border-b border-slate-900">
          <span>09:41</span>
          <div className="w-16 h-3.5 bg-black rounded-full" />
          <div className="flex items-center gap-1.5">
            <Wifi className="w-3 h-3 text-slate-400" />
            <Battery className="w-3.5 h-3.5 text-slate-400" />
          </div>
        </div>

        {/* Screen Content */}
        <div className="py-4 space-y-3 min-h-[260px] flex flex-col justify-center">
          {mockType === 'sms' && (
            <div className="space-y-2">
              <div className="text-center text-[11px] text-slate-400">
                SMS วันนี้ 14:20 น.
              </div>
              <div className="bg-gradient-to-r from-blue-900/80 to-indigo-900/80 border border-blue-500/30 p-4 rounded-2xl text-xs text-white leading-relaxed space-y-2 shadow-lg">
                <div className="flex items-center gap-1.5 text-cyan-300 font-bold text-[11px]">
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>{mockContent.sender}</span>
                </div>
                <p className="font-sans text-[12px] text-slate-100">{mockContent.message}</p>
              </div>
            </div>
          )}

          {mockType === 'social-post' && (
            <div className="bg-slate-900 rounded-2xl p-3.5 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-red-600/20 text-red-400 font-bold flex items-center justify-center text-xs border border-red-500/30">
                  🚨
                </div>
                <div>
                  <span className="font-bold text-xs text-white block">{mockContent.sender}</span>
                  <span className="text-[10px] text-slate-400">{mockContent.timestamp} · โพสต์สาธารณะ</span>
                </div>
              </div>
              <p className="text-xs text-slate-200 leading-relaxed font-sans">{mockContent.message}</p>
              <div className="bg-slate-950/80 border border-slate-800 rounded-xl h-24 flex items-center justify-center text-[11px] text-slate-400">
                <span>📷 {mockContent.imageCaption}</span>
              </div>
            </div>
          )}

          {mockType === 'chat' && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
                <div className="w-7 h-7 rounded-full bg-purple-600 flex items-center justify-center text-xs font-bold">
                  🎮
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-200 block">{mockContent.sender}</span>
                  <span className="text-[10px] text-emerald-400">กำลังใช้งาน</span>
                </div>
              </div>
              <div className="bg-slate-800/90 border border-slate-700/60 p-3.5 rounded-2xl rounded-tl-sm text-xs text-slate-100 leading-relaxed font-sans max-w-[90%] shadow-md">
                {mockContent.message}
              </div>
              <div className="text-[10px] text-slate-500 text-right pr-2">{mockContent.timestamp}</div>
            </div>
          )}

          {mockType === 'app-permission' && (
            <div className="bg-slate-900 rounded-2xl p-4 border border-slate-800 space-y-3">
              <div className="text-center pb-2 border-b border-slate-800">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-500 to-pink-500 text-white flex items-center justify-center mx-auto mb-1.5 shadow-md">
                  🎨
                </div>
                <h5 className="font-bold text-xs text-white">{mockContent.sender}</h5>
                <span className="text-[10px] text-slate-400">{mockContent.message}</span>
              </div>
              <div className="space-y-1.5">
                {mockContent.permissions?.map((p, idx) => (
                  <div key={idx} className="p-2 rounded-xl bg-slate-800/80 border border-slate-700 text-[11px] text-slate-300">
                    {p}
                  </div>
                ))}
              </div>
            </div>
          )}

          {mockType === 'email' && (
            <div className="bg-slate-900 rounded-2xl p-3.5 border border-slate-800 space-y-2.5">
              <div className="border-b border-slate-800 pb-2 text-[11px] space-y-0.5">
                <span className="text-blue-400 font-bold block truncate">จาก: {mockContent.sender}</span>
                <span className="text-slate-500 block text-[10px]">{mockContent.timestamp}</span>
              </div>
              <p className="text-xs text-slate-200 leading-relaxed font-sans">{mockContent.message}</p>
            </div>
          )}
        </div>

        {/* Home Indicator bar */}
        <div className="w-28 h-1 bg-slate-700 rounded-full mx-auto mt-2" />
      </div>
    );
  };

  const totalAnswered = Object.keys(completedScenarios).length;

  return (
    <div className="space-y-8 pb-16">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-extrabold text-emerald-600 uppercase tracking-wider">
            <Zap className="w-3.5 h-3.5 text-emerald-600" />
            <span>ห้องทดลองตัดสินใจ (Scenario Lab)</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
            เผชิญหน้าและฝึกรับมือสถานการณ์ดิจิทัลจริง
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            จำลองหน้าจอและเหตุการณ์ที่พบบ่อย ให้คุณเลือกวิธีรับมือ พร้อมเฉลยและเหตุผลประกอบทันที
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

      {/* Scenario Step Nodes */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {SCENARIOS.map((sc, idx) => {
          const isDone = Boolean(completedScenarios[sc.id]);
          const isActive = idx === activeScenarioIdx;

          return (
            <button
              key={sc.id}
              onClick={() => setActiveScenarioIdx(idx)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all border ${
                isActive
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-blue-600 shadow-md shadow-blue-500/25 -translate-y-0.5'
                  : isDone
                  ? 'bg-emerald-50 text-emerald-900 border-emerald-300 hover:bg-emerald-100/70'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <span>เคส {idx + 1}</span>
              {isDone ? (
                <CheckCircle2 className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-emerald-600'}`} />
              ) : (
                <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-cyan-300' : 'bg-slate-300'}`} />
              )}
            </button>
          );
        })}
      </div>

      {/* Main Interactive Stage Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Simulated Device Stage */}
        <div className="lg:col-span-5 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 rounded-[2.5rem] p-6 sm:p-8 text-white shadow-xl border border-slate-800 space-y-5">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-bold text-cyan-400 uppercase tracking-wide">
              สถานการณ์ที่ {activeScenarioIdx + 1} จาก {SCENARIOS.length}
            </span>
            <span className="font-mono bg-white/10 px-2.5 py-0.5 rounded-full text-slate-300">
              ฝึกแล้ว {totalAnswered}/{SCENARIOS.length}
            </span>
          </div>

          <div>
            <h3 className="text-xl font-black text-white leading-snug">
              {currentScenario.title}
            </h3>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              {currentScenario.situation}
            </p>
          </div>

          {/* Device Mockup */}
          <div className="py-2">
            {renderDeviceMock(currentScenario)}
          </div>
        </div>

        {/* Right Column: Decisions & Instant Feedback */}
        <div className="lg:col-span-7 bg-white rounded-[2.5rem] p-6 sm:p-10 border border-slate-200/90 shadow-sm space-y-6">
          <div>
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider block mb-1">
              คำถามเพื่อการตัดสินใจ
            </span>
            <h4 className="text-lg sm:text-xl font-black text-slate-900 leading-relaxed">
              {currentScenario.question}
            </h4>
          </div>

          {/* Options */}
          <div className="space-y-3">
            {currentScenario.options.map((option) => {
              const isSelected = selectedOptionId === option.id;

              return (
                <button
                  key={option.id}
                  onClick={() => handleSelectOption(option)}
                  className={`w-full text-left p-4 sm:p-5 rounded-2xl border-2 text-xs sm:text-sm transition-all flex items-start gap-3.5 ${
                    isSelected
                      ? option.isCorrect
                        ? 'bg-emerald-50/90 border-emerald-500 text-slate-950 shadow-md shadow-emerald-500/10'
                        : 'bg-red-50/90 border-red-500 text-slate-950 shadow-md shadow-red-500/10'
                      : 'bg-white border-slate-200 hover:border-blue-400 hover:bg-slate-50/80 text-slate-800'
                  }`}
                >
                  <div
                    className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 mt-0.5 text-xs font-black ${
                      isSelected
                        ? option.isCorrect
                          ? 'bg-emerald-600 text-white'
                          : 'bg-red-600 text-white'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {isSelected ? (
                      option.isCorrect ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />
                    ) : (
                      option.id.slice(-1).toUpperCase()
                    )}
                  </div>
                  <span className="leading-relaxed font-semibold">{option.text}</span>
                </button>
              );
            })}
          </div>

          {/* Instant Dynamic Feedback upon choosing */}
          {selectedOption && (
            <div
              className={`p-6 rounded-3xl border-2 animate-in fade-in duration-300 space-y-3 ${
                selectedOption.isCorrect
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                  : 'bg-red-50 border-red-300 text-red-950'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-black text-base sm:text-lg flex items-center gap-2">
                  {selectedOption.isCorrect ? (
                    <ShieldCheck className="w-6 h-6 text-emerald-600 shrink-0" />
                  ) : (
                    <ShieldAlert className="w-6 h-6 text-red-600 shrink-0" />
                  )}
                  {selectedOption.feedbackTitle}
                </span>

                {selectedOption.score > 0 && (
                  <span className="text-xs font-black px-3 py-1 rounded-full bg-emerald-200 text-emerald-900 font-mono shadow-xs">
                    +{selectedOption.score} XP
                  </span>
                )}
              </div>

              <p className="text-xs sm:text-sm leading-relaxed text-slate-800 font-medium">
                {selectedOption.feedbackText}
              </p>

              <div className="pt-3 border-t border-slate-200/80 text-xs text-slate-700 flex items-start gap-2">
                <div className="w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                  💡
                </div>
                <span><strong>แนวทางที่ถูกต้อง:</strong> {selectedOption.tip}</span>
              </div>
            </div>
          )}

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <button
              onClick={handlePrev}
              disabled={activeScenarioIdx === 0}
              className="text-xs font-bold px-4 py-2 rounded-xl text-slate-600 hover:text-slate-950 disabled:opacity-30 disabled:pointer-events-none transition-colors"
            >
              ← เคสก่อนหน้า
            </button>

            {activeScenarioIdx < SCENARIOS.length - 1 ? (
              <button
                onClick={handleNext}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-md shadow-blue-500/20"
              >
                <span>เคสถัดไป</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => onNavigate('quiz')}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 transition-all shadow-md shadow-purple-500/20"
              >
                <Award className="w-4 h-4 text-amber-300" />
                <span>ไปทำ Smart Quiz 10 ข้อ</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
