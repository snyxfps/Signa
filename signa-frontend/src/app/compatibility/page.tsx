"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { api } from "@/lib/api";
import { Briefcase, Heart, LoaderCircle, Share2, Users } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const SIGNS = [
  { slug: "aries", name: "Áries", symbol: "♈" },
  { slug: "taurus", name: "Touro", symbol: "♉" },
  { slug: "gemini", name: "Gêmeos", symbol: "♊" },
  { slug: "cancer", name: "Câncer", symbol: "♋" },
  { slug: "leo", name: "Leão", symbol: "♌" },
  { slug: "virgo", name: "Virgem", symbol: "♍" },
  { slug: "libra", name: "Libra", symbol: "♎" },
  { slug: "scorpio", name: "Escorpião", symbol: "♏" },
  { slug: "sagittarius", name: "Sagitário", symbol: "♐" },
  { slug: "capricorn", name: "Capricórnio", symbol: "♑" },
  { slug: "aquarius", name: "Aquário", symbol: "♒" },
  { slug: "pisces", name: "Peixes", symbol: "♓" },
];

function ScoreBar({ value, label, icon: Icon }: { value: number; label: string; icon: any }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2 text-sm text-white/70">
          <Icon className="w-4 h-4" /> {label}
        </div>
        <span className="text-white font-bold text-sm">{value}/100</span>
      </div>
      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="score-bar-fill h-full"
        />
      </div>
    </div>
  );
}

function SignSelector({ value, onChange, label }: { value: string; onChange: (v: string) => void; label: string }) {
  return (
    <div className="flex-1">
      <label className="block text-sm text-white/60 mb-2">{label}</label>
      <div className="grid grid-cols-4 gap-2">
        {SIGNS.map((s) => (
          <button
            key={s.slug}
            onClick={() => onChange(s.slug)}
            className={`rounded-xl border px-3 py-2 text-sm transition ${
              value === s.slug ? "border-white/40 bg-white/10" : "border-white/10 bg-white/5 hover:bg-white/10"
            }`}
          >
            <div className="text-lg">{s.symbol}</div>
            <div className="text-xs text-white/80">{s.name}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default function CompatibilityPage() {
  const [signA, setSignA] = useState("");
  const [signB, setSignB] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCheck = async () => {
    if (!signA || !signB) return;
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const { data } = await api.get(`/api/v1/compatibility/?signA=${signA}&signB=${signB}`);
      setResult(data);
    } catch (e: any) {
      setError(e?.response?.data?.error ?? "Algo deu errado. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleShare = async () => {
    if (!result) return;
    const url = `${window.location.origin}/compatibility?signA=${signA}&signB=${signB}`;
    await navigator.clipboard.writeText(url);
    alert("Link copiado!");
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-16 px-4">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-10">
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-3">
              Compatibilidade <span className="gradient-text">Cósmica</span>
            </h1>
            <p className="text-white/70 text-lg">Descubra como dois signos se conectam no amor, amizade e trabalho.</p>
          </div>

          <div className="glass-card mb-8">
            <div className="flex flex-col lg:flex-row gap-6">
              <SignSelector value={signA} onChange={setSignA} label="Primeiro signo" />
              <div className="flex items-center justify-center text-3xl text-white/60 font-bold lg:pt-8">+</div>
              <SignSelector value={signB} onChange={setSignB} label="Segundo signo" />
            </div>

            <div className="mt-6 text-center">
              <button
                onClick={handleCheck}
                disabled={!signA || !signB || loading}
                className="btn-primary text-lg px-10 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? <LoaderCircle className="w-5 h-5 animate-spin" /> : "Verificar compatibilidade"}
              </button>
              {error && <p className="text-rose-400 mt-4 text-sm">{error}</p>}
            </div>
          </div>

          <AnimatePresence>
            {result && (
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div className="glass-card text-center bg-gradient-to-br from-white/10 to-white/5">
                  <div className="text-xs text-white/60 uppercase tracking-widest mb-2">Compatibilidade geral</div>
                  <div className="font-display text-7xl font-bold gradient-text mb-1">{result.overall_score}</div>
                  <div className="text-white/60 text-sm">de 100</div>

                  <div className="flex items-center justify-center gap-4 mt-6 text-2xl">
                    <span>{SIGNS.find((s) => s.slug === signA)?.symbol}</span>
                    <span className="text-cosmic-300">+</span>
                    <span>{SIGNS.find((s) => s.slug === signB)?.symbol}</span>
                  </div>
                </div>

                <div className="glass-card space-y-5">
                  <h3 className="font-display text-xl font-bold">Pontuações</h3>
                  <ScoreBar value={result.love_score} label="Amor" icon={Heart} />
                  <ScoreBar value={result.work_score} label="Trabalho" icon={Briefcase} />
                  <ScoreBar value={result.friendship_score} label="Amizade" icon={Users} />
                </div>

                {(["strengths", "conflicts", "advice"] as const).map((k) =>
                  result[k] ? (
                    <div key={k} className="glass-card">
                      <h3 className="font-display text-xl font-bold mb-3 capitalize">
                        {k === "strengths" ? "💫 Pontos fortes" : k === "conflicts" ? "⚠️ Conflitos" : "🌙 Conselho cósmico"}
                      </h3>
                      <p className="text-white/75 leading-relaxed">{result[k]}</p>
                    </div>
                  ) : null
                )}

                <div className="text-center">
                  <button onClick={handleShare} className="btn-ghost gap-2">
                    <Share2 className="w-4 h-4" /> Compartilhar
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
      <Footer />
    </>
  );
}
