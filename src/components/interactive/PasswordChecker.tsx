import React, { useState } from 'react';
import { ShieldCheck, ShieldAlert, KeyRound, Sparkles, Check, X } from 'lucide-react';

export function PasswordChecker() {
  const [password, setPassword] = useState('');

  // Password analysis
  const hasMinLength = password.length >= 12;
  const hasLower = /[a-z]/.test(password);
  const hasUpper = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[^A-Za-z0-9]/.test(password);
  const isPassphrase = password.split(/[\s#@!_-]+/).filter(w => w.length >= 3).length >= 3;

  let score = 0;
  if (password.length > 0) {
    if (password.length >= 8) score += 1;
    if (password.length >= 12) score += 2;
    if (hasLower && hasUpper) score += 1;
    if (hasNumber) score += 1;
    if (hasSpecial) score += 1;
    if (isPassphrase) score += 1;
  }

  let strengthLabel = 'ยังไม่ได้กรอกรหัสผ่าน';
  let strengthColor = 'bg-slate-200 text-slate-600';
  let crackTimeEstimate = '—';

  if (password.length > 0) {
    if (score <= 2) {
      strengthLabel = 'อ่อนแอมาก (อันตราย)';
      strengthColor = 'bg-red-500 text-white';
      crackTimeEstimate = 'ถูกแฮกได้ทันที (เสี้ยววินาที)';
    } else if (score <= 4) {
      strengthLabel = 'ปานกลาง (พอใช้ได้ แต่ยังไม่ปลอดภัยพอ)';
      strengthColor = 'bg-amber-500 text-white';
      crackTimeEstimate = 'ประมาณ 2-8 ชั่วโมง';
    } else if (score <= 5) {
      strengthLabel = 'แข็งแกร่ง (ปลอดภัยดี)';
      strengthColor = 'bg-blue-600 text-white';
      crackTimeEstimate = 'ประมาณ 30-200 ปี';
    } else {
      strengthLabel = 'ยอดเยี่ยมระดับสูงสุด (Passphrase แนะนำ)';
      strengthColor = 'bg-emerald-600 text-white';
      crackTimeEstimate = 'หลายล้านปี (แฮกเกอร์ถอดใจ)';
    }
  }

  const samplePassphrases = [
    'Mango#Coffee@Sky99!',
    'Panda*Runs$Fast2026',
    'BlueBook&CatSmile#77'
  ];

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 my-6">
      <div className="flex items-center gap-2 mb-3">
        <KeyRound className="w-5 h-5 text-blue-600 shrink-0" />
        <h4 className="font-semibold text-slate-900 text-base">เครื่องมือทดลอง: ตรวจสอบความแข็งแกร่งของรหัสผ่าน</h4>
      </div>
      <p className="text-xs text-slate-600 mb-4 leading-relaxed">
        ทดลองพิมพ์รหัสผ่านที่คุณมักจะใช้ หรือทดลองสร้างรหัสผ่านใหม่ เพื่อดูว่าแฮกเกอร์ใช้เวลานานแค่ไหนในการสุ่มรหัสนี้ (ข้อมูลจะไม่ถูกส่งไปที่ใดทั้งสิ้น)
      </p>

      <div className="relative mb-3">
        <input
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="พิมพ์รหัสผ่านเพื่อทดสอบ เช่น BlueMango#Runs99!"
          className="w-full px-4 py-2.5 text-sm bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-mono"
        />
        {password && (
          <button
            onClick={() => setPassword('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
          >
            ล้าง
          </button>
        )}
      </div>

      {/* Strength indicator */}
      {password.length > 0 && (
        <div className="space-y-3 mb-4">
          <div className="flex items-center justify-between text-xs">
            <span className="font-medium text-slate-700">ระดับความปลอดภัย:</span>
            <span className={`px-2.5 py-0.5 rounded-full font-medium text-xs ${strengthColor}`}>
              {strengthLabel}
            </span>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-300 ${
                score <= 2 ? 'bg-red-500' : score <= 4 ? 'bg-amber-500' : score <= 5 ? 'bg-blue-600' : 'bg-emerald-600'
              }`}
              style={{ width: `${Math.min(100, (score / 6) * 100)}%` }}
            />
          </div>

          <div className="bg-white p-3 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
            <span className="text-slate-600">เวลาโดยประมาณที่แฮกเกอร์ใช้เจาะ:</span>
            <span className="font-semibold text-slate-900 font-mono">{crackTimeEstimate}</span>
          </div>
        </div>
      )}

      {/* Checklist criteria */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600 mb-4">
        <div className="flex items-center gap-1.5">
          {hasMinLength ? <Check className="w-4 h-4 text-emerald-600 shrink-0" /> : <X className="w-4 h-4 text-slate-400 shrink-0" />}
          <span>ความยาวอย่างน้อย 12 ตัวอักษร ({password.length}/12)</span>
        </div>
        <div className="flex items-center gap-1.5">
          {hasLower && hasUpper ? <Check className="w-4 h-4 text-emerald-600 shrink-0" /> : <X className="w-4 h-4 text-slate-400 shrink-0" />}
          <span>มีทั้งตัวพิมพ์เล็กและตัวพิมพ์ใหญ่ (a-z, A-Z)</span>
        </div>
        <div className="flex items-center gap-1.5">
          {hasNumber ? <Check className="w-4 h-4 text-emerald-600 shrink-0" /> : <X className="w-4 h-4 text-slate-400 shrink-0" />}
          <span>มีตัวเลขอย่างน้อย 1 ตัว (0-9)</span>
        </div>
        <div className="flex items-center gap-1.5">
          {hasSpecial ? <Check className="w-4 h-4 text-emerald-600 shrink-0" /> : <X className="w-4 h-4 text-slate-400 shrink-0" />}
          <span>มีอักขระพิเศษ (!, @, #, $, %)</span>
        </div>
      </div>

      {/* Quick samples */}
      <div className="border-t border-slate-200 pt-3">
        <span className="text-xs text-slate-500 block mb-2">💡 ตัวอย่าง Passphrase ปลอดภัยสูง (คลิกเพื่อลอง):</span>
        <div className="flex flex-wrap gap-2">
          {samplePassphrases.map((sample, idx) => (
            <button
              key={idx}
              onClick={() => setPassword(sample)}
              className="text-xs font-mono bg-white hover:bg-blue-50 hover:text-blue-700 text-slate-700 px-2.5 py-1 rounded-lg border border-slate-200 transition-colors"
            >
              {sample}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
