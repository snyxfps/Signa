'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Navbar from '@/components/layout/Navbar'
import ProtectedRoute from '@/components/layout/ProtectedRoute'
import { api } from '@/lib/api'
import { Heart, Briefcase, Activity, Sparkles, Star, CalendarDays } from 'lucide-react'

export default function HoroscopePage() {
    const [horoscope, setHoroscope] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchHoroscope = async () => {
            try {
                const res = await api.get('/api/v1/horoscope/today/')
                setHoroscope(res.data)
            } catch (e) {
                console.error(e)
            } finally {
                setLoading(false)
            }
        }
        fetchHoroscope()
    }, [])

    return (
        <ProtectedRoute>
            <Navbar />
            <main className="min-h-screen pt-32 pb-16 px-4 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=2094&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-screen pointer-events-none" />
                <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-nebula-600/10 rounded-full blur-[150px] pointer-events-none" />

                <div className="max-w-4xl mx-auto relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-12 text-center"
                    >
                        <h1 className="font-display text-5xl font-bold text-shadow-glow mb-4">
                            Seu <span className="gradient-text">Horóscopo Diário</span>
                        </h1>
                        <p className="text-cosmic-200/80 text-xl max-w-2xl mx-auto">
                            As estrelas sussurraram segredos sobre o seu dia. Veja o que o cosmos preparou para você.
                        </p>
                    </motion.div>

                    {loading ? (
                        <div className="glass-card p-10 h-96 animate-pulse bg-white/5 flex items-center justify-center">
                            <Sparkles className="w-10 h-10 text-nebula-400 animate-spin-slow" />
                        </div>
                    ) : horoscope ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="glass-card p-8 md:p-12 bg-gradient-to-br from-cosmic-900/40 to-transparent border border-white/10"
                        >
                            <div className="flex items-center gap-3 mb-8 text-nebula-300">
                                <CalendarDays className="w-6 h-6" />
                                <span className="font-medium tracking-widest uppercase">
                                    {new Date(horoscope.date).toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: 'long' })}
                                </span>
                            </div>

                            <p className="text-xl md:text-2xl text-cosmic-50 leading-relaxed mb-12 font-medium">
                                "{horoscope.content}"
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 pt-10 border-t border-white/5">
                                {[
                                    { label: 'Energia no Amor', value: horoscope.love_score, icon: Heart, color: 'text-rose-400', bg: 'bg-rose-500/10' },
                                    { label: 'Foco no Trabalho', value: horoscope.work_score, icon: Briefcase, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
                                    { label: 'Vitalidade', value: horoscope.health_score, icon: Activity, color: 'text-blue-400', bg: 'bg-blue-500/10' },
                                ].map(({ label, value, icon: Icon, color, bg }) => (
                                    <div key={label} className={`rounded-3xl p-6 ${bg} border border-white/5 flex flex-col items-center justify-center text-center`}>
                                        <Icon className={`w-8 h-8 ${color} mb-3`} />
                                        <div className="text-sm font-medium text-cosmic-200/80 mb-2">{label}</div>
                                        <div className="text-3xl font-display font-bold text-white">{value}<span className="text-lg text-white/40">/10</span></div>
                                    </div>
                                ))}
                            </div>

                            <div className="flex flex-wrap items-center justify-center gap-6 pt-8 border-t border-white/5">
                                <div className="badge-primary text-lg py-2 px-6">
                                    ✨ Número da Sorte: <strong className="ml-2 font-display text-2xl">{horoscope.lucky_number}</strong>
                                </div>
                                <div className="badge-secondary text-lg py-2 px-6">
                                    🎨 Cor do Dia: <strong className="ml-2 capitalize">{horoscope.lucky_color}</strong>
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        <div className="glass-card p-12 text-center">
                            <Star className="w-12 h-12 text-cosmic-400 mx-auto mb-4 opacity-50" />
                            <h3 className="text-2xl font-bold text-white mb-2">As estrelas estão silenciosas</h3>
                            <p className="text-cosmic-200">Não conseguimos sintonizar seu horóscopo hoje. Tente novamente mais tarde.</p>
                        </div>
                    )}
                </div>
            </main>
        </ProtectedRoute>
    )
}
