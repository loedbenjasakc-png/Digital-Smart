import React, { useState } from 'react';
import { CheckCircle2, Circle, ShieldCheck, Lock } from 'lucide-react';

interface CheckItem {
  id: string;
  label: string;
  desc: string;
}

const CHECKLIST_ITEMS: CheckItem[] = [
  {
    id: 'c1',
    label: 'เปิดใช้งานการยืนยันตัวตน 2 ขั้นตอน (2FA)',
    desc: 'สำหรับบัญชี Google, Apple ID และโซเชียลมีเดียหลัก'
  },
  {
    id: 'c2',
    label: 'ตั้งค่าโพสต์ส่วนตัวเป็น "เพื่อนเท่านั้น (Friends Only)"',
    desc: 'ไม่เปิดข้อมูลไลฟ์สไตล์ส่วนตัวเป็นสาธารณะแก่คนแปลกหน้า'
  },
  {
    id: 'c3',
    label: 'ปิดการระบุตำแหน่งอัตโนมัติ (Location Tagging)',
    desc: 'ป้องกันการแชร์พิกัดบ้านหรือโรงเรียนโดยไม่ได้ตั้งใจ'
  },
  {
    id: 'c4',
    label: 'เปิดระบบตรวจสอบการแท็กรูปภาพ (Tag Review)',
    desc: 'ต้องอนุมัติก่อนรูปที่เพื่อนแท็กจะแสดงบนโปรไฟล์ของเรา'
  },
  {
    id: 'c5',
    label: 'ไม่โพสต์ภาพที่มีเลขบัตรประชาชน หรือบัตรโดยสารที่มีบาร์โค้ด',
    desc: 'ป้องกันการสวมสิทธิ์และเปิดบัญชีม้า'
  }
];

export function PrivacyChecklist() {
  const [checkedIds, setCheckedIds] = useState<string[]>(['c1']);

  const toggle = (id: string) => {
    setCheckedIds(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const percentage = Math.round((checkedIds.length / CHECKLIST_ITEMS.length) * 100);

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 my-6">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Lock className="w-5 h-5 text-sky-600 shrink-0" />
          <h4 className="font-semibold text-slate-900 text-base">เช็กลิสต์: ความเป็นส่วนตัวของตัวคุณในวันนี้</h4>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 bg-sky-100 text-sky-800 rounded-full">
          {percentage}% ปลอดภัย
        </span>
      </div>

      <p className="text-xs text-slate-600 mb-4 leading-relaxed">
        คลิกทำเครื่องหมายสิ่งที่คุณได้ดำเนินการในชีวิตจริงแล้ว เพื่อประเมินระดับเกราะป้องกันความเป็นส่วนตัวของคุณ
      </p>

      <div className="space-y-2 mb-4">
        {CHECKLIST_ITEMS.map((item) => {
          const isDone = checkedIds.includes(item.id);
          return (
            <div
              key={item.id}
              onClick={() => toggle(item.id)}
              className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                isDone
                  ? 'bg-sky-50/70 border-sky-200 text-slate-900'
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100/50'
              }`}
            >
              <button
                type="button"
                className="mt-0.5 shrink-0 focus:outline-none"
                aria-label={item.label}
              >
                {isDone ? (
                  <CheckCircle2 className="w-5 h-5 text-sky-600" />
                ) : (
                  <Circle className="w-5 h-5 text-slate-300" />
                )}
              </button>
              <div className="text-xs">
                <span className={`font-medium block ${isDone ? 'text-sky-950 font-semibold' : 'text-slate-800'}`}>
                  {item.label}
                </span>
                <span className="text-slate-500 mt-0.5 block">{item.desc}</span>
              </div>
            </div>
          );
        })}
      </div>

      {percentage === 100 ? (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2 text-xs text-emerald-800">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span className="font-medium">ยอดเยี่ยมมาก! คุณมีมาตรการรักษาความเป็นส่วนตัวที่แข็งแกร่งระดับแนวหน้า</span>
        </div>
      ) : (
        <p className="text-xs text-slate-500 italic">
          💡 เคล็ดลับ: ทำเครื่องหมายให้ครบทั้ง 5 ข้อเพื่อความปลอดภัยสูงสุดของข้อมูลส่วนบุคคล
        </p>
      )}
    </div>
  );
}
