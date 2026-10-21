import React from 'react';
import { Shield, Phone, ExternalLink, Heart } from 'lucide-react';
import { ActiveTab } from './Navbar';

interface FooterProps {
  onNavigate: (tab: ActiveTab) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white">
                <Shield className="w-4 h-4" />
              </div>
              <span className="text-base font-bold text-white tracking-tight">
                Digital Smart
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              ฉลาดใช้ชีวิตในโลกดิจิทัล — โครงการเสริมสร้างทักษะ Digital Literacy สำหรับนักเรียนและนักศึกษาไทย เพื่อการใช้อินเทอร์เน็ตอย่างปลอดภัยและสร้างสรรค์
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">
              หมวดการเรียนรู้
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('lessons')}
                  className="hover:text-white transition-colors"
                >
                  1. Digital Safety (ความปลอดภัย)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('lessons')}
                  className="hover:text-white transition-colors"
                >
                  2. Media Check (ตรวจสอบข่าว)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('lessons')}
                  className="hover:text-white transition-colors"
                >
                  3. Privacy Guard (ปกป้องข้อมูล)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('lessons')}
                  className="hover:text-white transition-colors"
                >
                  4. Digital Manners (มารยาทออนไลน์)
                </button>
              </li>
            </ul>
          </div>

          {/* Interactive Modes */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">
              กิจกรรมและประเมินผล
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('scenarios')}
                  className="hover:text-white transition-colors"
                >
                  สนามฝึกสถานการณ์จำลอง (Scenario Lab)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('quiz')}
                  className="hover:text-white transition-colors"
                >
                  แบบทดสอบ Smart Quiz 10 ข้อ
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('progress')}
                  className="hover:text-white transition-colors"
                >
                  ความก้าวหน้าและเกียรติบัตร
                </button>
              </li>
            </ul>
          </div>

          {/* Emergency Hotlines Thailand */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-blue-400" />
              <span>เบอร์สายด่วนรับมือภัยไซเบอร์</span>
            </h4>
            <div className="space-y-2 text-xs">
              <div className="p-2 rounded-lg bg-slate-800/80 border border-slate-700/60">
                <span className="text-blue-400 font-bold block">โทร 1441</span>
                <span className="text-[11px] text-slate-400">ตำรวจไซเบอร์ (บช.สอท.) แจ้งภัยออนไลน์</span>
              </div>
              <div className="p-2 rounded-lg bg-slate-800/80 border border-slate-700/60">
                <span className="text-violet-400 font-bold block">โทร 1111</span>
                <span className="text-[11px] text-slate-400">ศูนย์ต่อต้านข่าวปลอม ประเทศไทย</span>
              </div>
              <div className="p-2 rounded-lg bg-slate-800/80 border border-slate-700/60">
                <span className="text-emerald-400 font-bold block">โทร 1323</span>
                <span className="text-[11px] text-slate-400">สายด่วนสุขภาพจิต ปรึกษา Cyberbullying 24 ชม.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <span>
            © {new Date().getFullYear()} Digital Smart — ฉลาดใช้ชีวิตในโลกดิจิทัล. สื่อเพื่อการศึกษาไม่มีค่าใช้จ่าย
          </span>
          <span className="flex items-center gap-1">
            สร้างสรรค์เพื่อเยาวชนไทย ปลอดภัย รู้เท่าทัน และมีสติในโลกไซเบอร์
          </span>
        </div>
      </div>
    </footer>
  );
}
