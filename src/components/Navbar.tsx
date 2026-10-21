import React, { useState } from 'react';
import { Shield, Sparkles, BookOpen, Compass, Award, BarChart3, Menu, X } from 'lucide-react';

export type ActiveTab = 'home' | 'lessons' | 'scenarios' | 'quiz' | 'progress';

interface NavbarProps {
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  points: number;
  completedLessonsCount: number;
}

export function Navbar({ activeTab, onSelectTab, points, completedLessonsCount }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Compute learner rank
  let rankLabel = 'Lv.1 Newbie';
  let rankBadgeColor = 'from-blue-500 to-cyan-500';
  if (points >= 150) {
    rankLabel = 'Lv.4 Master';
    rankBadgeColor = 'from-purple-600 via-pink-500 to-amber-400';
  } else if (points >= 80) {
    rankLabel = 'Lv.3 Sentinel';
    rankBadgeColor = 'from-indigo-500 to-purple-600';
  } else if (points >= 30) {
    rankLabel = 'Lv.2 Explorer';
    rankBadgeColor = 'from-blue-600 to-indigo-600';
  }

  const navLinks = [
    { id: 'home' as ActiveTab, label: 'หน้าหลัก', icon: Compass },
    { id: 'lessons' as ActiveTab, label: 'บทเรียน', icon: BookOpen },
    { id: 'scenarios' as ActiveTab, label: 'ฝึกสถานการณ์', icon: Shield },
    { id: 'quiz' as ActiveTab, label: 'แบบทดสอบ', icon: Award },
    { id: 'progress' as ActiveTab, label: 'ความก้าวหน้า', icon: BarChart3 }
  ];

  const handleNavClick = (tab: ActiveTab) => {
    onSelectTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Zone 1: Wordmark */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 text-left shrink-0 group focus:outline-none"
          >
            <div className="relative">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-violet-600 flex items-center justify-center text-white shadow-md shadow-blue-500/25 group-hover:scale-105 group-hover:shadow-blue-500/40 transition-all">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center text-[9px] text-white font-bold">
                ✓
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-extrabold tracking-tight bg-gradient-to-r from-blue-700 via-indigo-700 to-violet-700 bg-clip-text text-transparent group-hover:opacity-90 transition-opacity">
                  Digital Smart
                </span>
                <span className={`text-[10px] font-extrabold px-1.5 py-0.2 rounded-md text-white bg-gradient-to-r ${rankBadgeColor} shadow-xs font-mono`}>
                  {rankLabel}
                </span>
              </div>
              <span className="text-[11px] text-slate-500 hidden sm:block whitespace-nowrap font-medium">
                ฉลาดใช้ชีวิตในโลกดิจิทัล
              </span>
            </div>
          </button>

          {/* Zone 2: Nav Links */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-100/80 p-1 rounded-2xl border border-slate-200/60">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-xl transition-all whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'text-white bg-gradient-to-r from-blue-600 to-indigo-600 shadow-sm shadow-blue-500/25'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/80'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-blue-100' : 'text-slate-400'}`} />
                  <span>{link.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Primary Action / Points Badge */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button
              onClick={() => handleNavClick('progress')}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-300/80 rounded-xl text-amber-800 text-xs font-bold hover:bg-amber-100/60 transition-all shadow-xs group"
              title="คะแนนสะสมของคุณ"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500 group-hover:rotate-12 transition-transform" />
              <span className="tabular-nums font-mono text-amber-900">{points}</span>
              <span className="text-[10px] text-amber-700 font-sans font-medium">XP</span>
            </button>

            <button
              onClick={() => handleNavClick('lessons')}
              className="hidden lg:inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 rounded-xl hover:from-blue-700 hover:to-violet-700 shadow-md shadow-blue-500/25 hover:shadow-blue-500/35 hover:-translate-y-0.5 transition-all whitespace-nowrap"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>เริ่มเรียนรู้</span>
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl focus:outline-none transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-5 space-y-1 shadow-lg">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = activeTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`flex items-center gap-3 w-full px-4 py-2.5 text-sm font-medium rounded-xl text-left transition-colors ${
                  isActive
                    ? 'text-blue-700 bg-blue-50 font-semibold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                <span>{link.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
}
