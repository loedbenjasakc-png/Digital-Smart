import React, { useState } from 'react';
import { MessageSquareHeart, Check, X, ThumbsUp, AlertCircle } from 'lucide-react';

interface SampleComment {
  text: string;
  isAppropriate: boolean;
  thinkScore: {
    t: boolean; // True
    h: boolean; // Helpful
    i: boolean; // Inspiring
    n: boolean; // Necessary
    k: boolean; // Kind
  };
  feedback: string;
}

const SAMPLES: SampleComment[] = [
  {
    text: 'ผลงานชิ้นนี้น่าสนใจมากครับ แต่ผมมองว่าตรงสียังกลืนกับพื้นหลังนิดหน่อย ถ้าเพิ่มคอนทราสต์น่าจะอ่านง่ายขึ้น เป็นกำลังใจให้นะครับ',
    isAppropriate: true,
    thinkScore: { t: true, h: true, i: true, n: true, k: true },
    feedback: 'เป็นการติเพื่อก่ออย่างสุภาพ มีเหตุผล และให้เกียรติผู้สร้างสรรค์'
  },
  {
    text: 'วาดได้แค่นี้อย่าทำเลยดีกว่า ทุเรศตามาก เสียเวลาดู',
    isAppropriate: false,
    thinkScore: { t: false, h: false, i: false, n: false, k: false },
    feedback: 'การใช้ถ้อยคำด้อยค่า เป็น Cyberbullying ไม่ผ่านเกณฑ์ Kind และ Helpful'
  },
  {
    text: 'เห็นด้วยกับแนวคิดนี้นะครับ แต่แอบเสนอแนะเพิ่มเติมว่าควรเพิ่มแหล่งอ้างอิงให้ชัดเจน เพื่อให้ข้อมูลมีน้ำหนักยิ่งขึ้นครับ',
    isAppropriate: true,
    thinkScore: { t: true, h: true, i: true, n: true, k: true },
    feedback: 'ข้อความเชิงสร้างสรรค์ นำเสนอความคิดเห็นต่างอย่างมีวุฒิภาวะ'
  }
];

export function NetiquetteMeter() {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const current = SAMPLES[selectedIdx];

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 my-6">
      <div className="flex items-center gap-2 mb-3">
        <MessageSquareHeart className="w-5 h-5 text-indigo-600 shrink-0" />
        <h4 className="font-semibold text-slate-900 text-base">เครื่องมือทดลอง: ประเมินคอมเมนต์ด้วยหลักคิด T.H.I.N.K.</h4>
      </div>
      <p className="text-xs text-slate-600 mb-4 leading-relaxed">
        ลองเลือกตัวอย่างข้อความคอมเมนต์เพื่อดูว่าสอดคล้องกับหลักมารยาทในโลกดิจิทัลหรือไม่
      </p>

      {/* Select comments */}
      <div className="space-y-2 mb-4">
        {SAMPLES.map((sample, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedIdx(idx)}
            className={`w-full text-left p-3 rounded-xl border text-xs transition-all ${
              selectedIdx === idx
                ? 'bg-indigo-50 border-indigo-300 text-indigo-950 font-medium'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}
          >
            "{sample.text}"
          </button>
        ))}
      </div>

      {/* Analysis card */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-700">การประเมินตามหลัก T.H.I.N.K.</span>
          <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${
            current.isAppropriate ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
          }`}>
            {current.isAppropriate ? 'ข้อความสร้างสรรค์ ✅' : 'ไม่เหมาะสม / ขาดมารยาท ❌'}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs">
          <div className="p-2 bg-slate-50 rounded-lg text-center border border-slate-100">
            <span className="font-bold block text-slate-700">T (True)</span>
            <span className="text-[11px] text-slate-500">จริง</span>
            <div className="mt-1 flex justify-center">
              {current.thinkScore.t ? <Check className="w-4 h-4 text-emerald-600" /> : <X className="w-4 h-4 text-red-500" />}
            </div>
          </div>
          <div className="p-2 bg-slate-50 rounded-lg text-center border border-slate-100">
            <span className="font-bold block text-slate-700">H (Helpful)</span>
            <span className="text-[11px] text-slate-500">มีประโยชน์</span>
            <div className="mt-1 flex justify-center">
              {current.thinkScore.h ? <Check className="w-4 h-4 text-emerald-600" /> : <X className="w-4 h-4 text-red-500" />}
            </div>
          </div>
          <div className="p-2 bg-slate-50 rounded-lg text-center border border-slate-100">
            <span className="font-bold block text-slate-700">I (Inspiring)</span>
            <span className="text-[11px] text-slate-500">สร้างสรรค์</span>
            <div className="mt-1 flex justify-center">
              {current.thinkScore.i ? <Check className="w-4 h-4 text-emerald-600" /> : <X className="w-4 h-4 text-red-500" />}
            </div>
          </div>
          <div className="p-2 bg-slate-50 rounded-lg text-center border border-slate-100">
            <span className="font-bold block text-slate-700">N (Necessary)</span>
            <span className="text-[11px] text-slate-500">จำเป็น</span>
            <div className="mt-1 flex justify-center">
              {current.thinkScore.n ? <Check className="w-4 h-4 text-emerald-600" /> : <X className="w-4 h-4 text-red-500" />}
            </div>
          </div>
          <div className="p-2 bg-slate-50 rounded-lg text-center border border-slate-100 col-span-2 sm:col-span-1">
            <span className="font-bold block text-slate-700">K (Kind)</span>
            <span className="text-[11px] text-slate-500">สุภาพเมตตา</span>
            <div className="mt-1 flex justify-center">
              {current.thinkScore.k ? <Check className="w-4 h-4 text-emerald-600" /> : <X className="w-4 h-4 text-red-500" />}
            </div>
          </div>
        </div>

        <div className={`p-2.5 rounded-lg text-xs ${
          current.isAppropriate ? 'bg-emerald-50 text-emerald-900 border border-emerald-200' : 'bg-red-50 text-red-900 border border-red-200'
        }`}>
          {current.feedback}
        </div>
      </div>
    </div>
  );
}
