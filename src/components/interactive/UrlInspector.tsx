import React, { useState } from 'react';
import { Search, ShieldAlert, ShieldCheck, AlertTriangle, ExternalLink } from 'lucide-react';

interface SampleUrl {
  url: string;
  isPhishing: boolean;
  rootDomain: string;
  tld: string;
  riskReasons: string[];
  verdict: string;
}

const SAMPLE_URLS: SampleUrl[] = [
  {
    url: 'https://security-verify.scb-update.xyz/login',
    isPhishing: true,
    rootDomain: 'scb-update.xyz',
    tld: '.xyz (High scam frequency)',
    riskReasons: [
      'โดเมนหลักคือ "scb-update.xyz" ไม่ใช่ "scb.co.th" ของธนาคารจริง',
      'ใช้ Subdomain คำว่า "security-verify" เพื่อหลอกตาให้ดูน่าเชื่อถือ',
      'นามสกุล .xyz มักถูกมิจฉาชีพจดใช้เนื่องจากราคาถูกและไม่เข้มงวด'
    ],
    verdict: 'ฟิชชิง 100% หลอกขโมยข้อมูลบัญชีธนาคาร'
  },
  {
    url: 'https://www.facebook.com/login/identify',
    isPhishing: false,
    rootDomain: 'facebook.com',
    tld: '.com (Verified Official)',
    riskReasons: [],
    verdict: 'เว็บไซต์ทางการของ Facebook ปลอดภัย'
  },
  {
    url: 'http://claim-free-iphone16.online/reward',
    isPhishing: true,
    rootDomain: 'claim-free-iphone16.online',
    tld: '.online',
    riskReasons: [
      'ใช้โปรโตคอล http:// แบบไม่เข้ารหัส (ไม่มีกุญแจเขียว)',
      'ตั้งชื่อโดเมนเป็นคำว่าแจกของฟรี (claim-free-iphone16)',
      'ไม่มีบริษัท Apple หรือตัวแทนจำหน่ายใดแจกรางวัลผ่านโดเมนประเภทนี้'
    ],
    verdict: 'เว็บหลอกลวงดูดข้อมูลและหลอกให้โอนค่าส่งของ'
  },
  {
    url: 'https://reg.chula.ac.th/curriculum',
    isPhishing: false,
    rootDomain: 'chula.ac.th',
    tld: '.ac.th (Academic Institution Thailand)',
    riskReasons: [],
    verdict: 'โดเมนสถาบันการศึกษาทางการของไทย (.ac.th) มีการรับรองตัวตน'
  }
];

export function UrlInspector() {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const current = SAMPLE_URLS[selectedIdx];

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 my-6">
      <div className="flex items-center gap-2 mb-3">
        <Search className="w-5 h-5 text-indigo-600 shrink-0" />
        <h4 className="font-semibold text-slate-900 text-base">เครื่องมือทดลอง: วิเคราะห์ความน่าเชื่อถือของลิงก์ URL</h4>
      </div>
      <p className="text-xs text-slate-600 mb-4 leading-relaxed">
        คลิกเลือกตัวอย่าง URL ด้านล่างเพื่อเรียนรู้วิธีผ่าโครงสร้าง แยกแยะโดเมนแท้และโดเมนลวง
      </p>

      {/* Select sample */}
      <div className="flex flex-wrap gap-2 mb-4">
        {SAMPLE_URLS.map((item, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedIdx(idx)}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all text-left truncate max-w-xs ${
              selectedIdx === idx
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}
          >
            {item.url.replace('https://', '').replace('http://', '').slice(0, 32)}...
          </button>
        ))}
      </div>

      {/* Inspection Box */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-3">
        <div className="font-mono text-xs p-2.5 bg-slate-900 text-slate-100 rounded-lg break-all flex items-center justify-between gap-2">
          <span>{current.url}</span>
          <span className={`px-2 py-0.5 rounded text-xs shrink-0 font-sans font-medium ${
            current.isPhishing ? 'bg-red-500 text-white' : 'bg-emerald-600 text-white'
          }`}>
            {current.isPhishing ? 'อันตราย / ฟิชชิง' : 'ปลอดภัย'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100">
            <span className="text-slate-500 block">โดเมนหลักที่แท้จริง (Root Domain):</span>
            <span className="font-mono font-semibold text-indigo-700 text-sm">{current.rootDomain}</span>
          </div>
          <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100">
            <span className="text-slate-500 block">นามสกุลโดเมน (TLD):</span>
            <span className="font-mono font-semibold text-slate-800 text-sm">{current.tld}</span>
          </div>
        </div>

        {current.isPhishing ? (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center gap-1.5 text-red-800 font-medium text-xs mb-2">
              <ShieldAlert className="w-4 h-4 text-red-600 shrink-0" />
              <span>จุดจับโป๊ะที่สังเกตได้ ({current.riskReasons.length} จุด):</span>
            </div>
            <ul className="space-y-1 text-xs text-red-700 list-disc list-inside">
              {current.riskReasons.map((reason, i) => (
                <li key={i}>{reason}</li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
            <div className="flex items-center gap-1.5 text-emerald-800 font-medium text-xs">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{current.verdict}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
