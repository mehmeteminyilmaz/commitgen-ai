'use client';

import { useState } from 'react';
import { Terminal, Send, Copy, Check, Code2 } from 'lucide-react';

export default function CommitGenPage() {
  const [diff, setDiff] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const generateCommit = async () => {
    if (!diff) return;
    setLoading(true);
    setResult(''); // Önceki sonucu temizle
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ diff }),
      });
      const data = await response.json();
      if (data.message) {
        setResult(data.message);
      } else {
        setResult('Hata: Mesaj oluşturulamadı.');
      }
    } catch (error) {
      setResult('Bağlantı hatası oluştu.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 p-8 font-mono">
      <div className="max-w-4xl mx-auto space-y-8">
        <header className="border-b border-slate-800 pb-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-indigo-400">CommitGen AI</h1>
            <p className="text-slate-500 text-sm mt-2">Profesyonel ve Türkçe Commit Asistanı</p>
          </div>
          <Code2 className="text-indigo-500 w-10 h-10 opacity-50" />
        </header>

        <div className="grid gap-8">
          <section className="space-y-3">
            <label className="text-xs uppercase tracking-tighter text-slate-500 flex items-center gap-2">
              <Terminal size={14} /> KOD DEĞİŞİKLİKLERİ (GIT DIFF)
            </label>
            <textarea
              className="w-full h-64 bg-slate-900/50 border border-slate-800 rounded-xl p-6 focus:ring-2 focus:ring-indigo-500 outline-none text-emerald-400 text-sm leading-relaxed transition-all"
              placeholder="Git diff içeriğini buraya yapıştırın..."
              value={diff}
              onChange={(e) => setDiff(e.target.value)}
            />
          </section>

          <button
            onClick={generateCommit}
            disabled={loading || !diff}
            className="w-full py-5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-30 rounded-xl font-black text-lg flex items-center justify-center gap-3 transition-all"
          >
            {loading ? "ANALİZ EDİLİYOR..." : "TÜRKÇE MESAJ OLUŞTUR"}
          </button>

          <section className="space-y-3">
            <label className="text-xs uppercase tracking-tighter text-slate-500">ÖNERİLEN COMMİT MESAJI</label>
            <div className="relative group">
              <div className="w-full bg-indigo-950/20 border-2 border-indigo-500/30 border-dashed rounded-xl p-8 text-xl font-bold text-indigo-300 min-h-[100px] flex items-center">
                {result || (loading ? "AI düşünüyor..." : "Mesaj burada görünecek...")}
              </div>
              {result && (
                <button
                  onClick={() => { navigator.clipboard.writeText(result); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-indigo-500/20 hover:bg-indigo-500/40 rounded-lg text-indigo-400"
                >
                  {copied ? <Check size={24} className="text-emerald-400" /> : <Copy size={24} />}
                </button>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}