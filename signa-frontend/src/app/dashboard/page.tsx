'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import Navbar from '@/components/layout/Navbar'
import ProtectedRoute from '@/components/layout/ProtectedRoute'
import { api } from '@/lib/api'
import { Sun, Moon, ArrowUpRight, Lock, Star, Heart, Briefcase, Activity, Sparkles } from 'lucide-react'

const SIGN_SYMBOLS: Record<string, string> = {
    aries: '♈', taurus: '♉', gemini: '♊', cancer: '♋', leo: '♌', virgo: '♍',
    libra: '♎', scorpio: '♏', sagittarius: '♐', capricorn: '♑', aquarius: '♒', pisces: '♓',
}

function SignCard({
    type, slug, locked = false
}: { type: string; slug?: string; locked?: boolean }) {
    const icons: Record<string, any> = { sun: Sun, moon: Moon, rising: ArrowUpRight }
    const Icon = icons[type] ?? Star
    const label = type.charAt(0).toUpperCase() + type.slice(1) + ' Sign'

    return (
        <div className={`glass-card p-6 relative overflow-hidden ${locked ? 'opacity-60' : ''}`}>
            {locked && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-stardust/70 backdrop-blur-sm z-10 gap-3">
                    <Lock className="w-6 h-6 text-cosmic-400" />
                    <span className="text-sm text-cosmic-300">Premium feature</span>
                    <button className="btn-primary text-xs px-4 py-2">Unlock</button>
                </div>
            )}
            <div className="flex items-center gap-2 text-cosmic-400 text-sm mb-4">
                <Icon className="w-4 h-4" /> {label}
            </div>
            <div className="text-6xl mb-3">{slug ? SIGN_SYMBOLS[slug] ?? '★' : '?'}</div>
            <div className="font-display text-2xl font-bold text-white capitalize">{slug ?? '—'}</div>
        </div>
    )
}



export default function DashboardPage() {
    const router = useRouter()
    const [profile, setProfile] = useState<any>(null)
    const [horoscope, setHoroscope] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    const [greeting, setGreeting] = useState('Olá')

    useEffect(() => {
        const hour = new Date().getHours()
        if (hour < 12) setGreeting('Bom dia')
        else if (hour < 18) setGreeting('Boa tarde')
        else setGreeting('Boa noite')
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const profRes = await api.get('/api/v1/profile/me/')
                if (profRes.data.birth_date === '2000-01-01') {
                    router.push('/onboarding')
                    return
                }
                setProfile(profRes.data)

                try {
                    const horoRes = await api.get('/api/v1/horoscope/today/')
                    setHoroscope(horoRes.data)
                } catch (e) {
                    console.log('Horoscope might not be available yet.')
                }
            } catch (e) {
                // If profile fails, redirect to auth
                router.push('/login')
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [router])

    const isPremium = profile?.is_premium ?? false

    return (
        <ProtectedRoute>
            <Navbar />
            <main className="min-h-screen pt-32 pb-16 px-4 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=2094&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-screen pointer-events-none" />
                <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-nebula-600/15 rounded-full blur-[150px] pointer-events-none" />

                <div className="max-w-6xl mx-auto relative z-10">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6"
                    >
                        <div>
                            <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-2">
                                {greeting}, viajante das estrelas.
                            </h1>
                            <p className="text-cosmic-200/80 text-lg">
                                O universo reorganizou-se para revelar os seus mistérios diários.
                            </p>
                        </div>
                        {profile && (
                            <div className="glass-card px-6 py-3 flex items-center gap-3 w-fit">
                                <div className="w-10 h-10 rounded-full bg-nebula-500/20 flex items-center justify-center border border-nebula-400/30">
                                    <Sun className="w-5 h-5 text-nebula-300" />
                                </div>
                                <div>
                                    <div className="text-xs text-cosmic-300 font-medium uppercase tracking-widest">Signo Solar</div>
                                    <div className="text-white font-bold capitalize">{profile.sun_sign || 'Calculando...'}</div>
                                </div>
                            </div>
                        )}
                    </motion.div>

                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="glass-card p-6 h-48 animate-pulse bg-white/5" />
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                            {/* Left Column (Trindade & Horoscope) */}
                            <div className="lg:col-span-2 space-y-8">
                                {/* Sign Trinity */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 }}
                                >
                                    <h2 className="font-display text-2xl font-bold text-white mb-6 flex items-center gap-2">
                                        <Star className="w-5 h-5 text-nebula-400" />
                                        Sua Trindade Cósmica
                                    </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <SignCard type="sun" slug={profile?.sun_sign} />
                                        <SignCard type="moon" slug={profile?.moon_sign} locked={!isPremium} />
                                        <SignCard type="rising" slug={profile?.rising_sign} locked={!isPremium} />
                                    </div>
                                </motion.div>

                                {/* Mini Horoscope Snippet */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="glass-card p-8 bg-gradient-to-r from-cosmic-900/40 to-transparent border border-white/5 relative overflow-hidden group hover:border-nebula-500/30 transition-colors"
                                    onClick={() => router.push('/horoscope')}
                                    role="button"
                                    tabIndex={0}
                                >
                                    <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-nebula-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <div className="flex justify-between items-start mb-4">
                                        <h3 className="font-display text-xl font-bold text-white flex items-center gap-2">
                                            <Sparkles className="w-5 h-5 text-amber-300" />
                                            Horóscopo de Hoje
                                        </h3>
                                        <ArrowUpRight className="w-5 h-5 text-cosmic-400 group-hover:text-white transition-colors" />
                                    </div>
                                    <p className="text-cosmic-200/80 leading-relaxed mb-6 line-clamp-2">
                                        {horoscope?.content || "As estrelas estão alinhando sua mensagem. Clique para ver seu destino completo."}
                                    </p>

                                    {horoscope && (
                                        <div className="flex gap-6 text-sm">
                                            <div className="flex items-center gap-2 text-rose-300">
                                                <Heart className="w-4 h-4" /> Amor: {horoscope.love_score}/10
                                            </div>
                                            <div className="flex items-center gap-2 text-emerald-300">
                                                <Briefcase className="w-4 h-4" /> Foco: {horoscope.work_score}/10
                                            </div>
                                        </div>
                                    )}
                                </motion.div>
                            </div>

                            {/* Right Column (Premium Upsell / User Actions) */}
                            <div className="space-y-8">
                                {!isPremium ? (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.3 }}
                                        className="glass-card p-8 text-center bg-gradient-to-b from-cosmic-800/80 to-cosmic-900 border border-nebula-500/30 relative overflow-hidden"
                                    >
                                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-nebula-400 via-purple-500 to-nebula-400" />
                                        <div className="w-16 h-16 mx-auto bg-gradient-to-br from-nebula-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-nebula-500/20 mb-6">
                                            <Lock className="w-8 h-8 text-white" />
                                        </div>
                                        <h3 className="font-display text-2xl font-bold text-white mb-3">Revelação Completa</h3>
                                        <p className="text-cosmic-200/80 text-sm mb-8 leading-relaxed">
                                            Desbloqueie seu Mapa Astral completo, descubra as posições da sua Lua, Ascendente e receba análises incrivelmente profundas com a assinatura Premium.
                                        </p>
                                        <button className="w-full btn-primary px-6 py-4 rounded-xl flex items-center justify-center gap-2">
                                            <Star className="w-5 h-5" /> Iniciar Jornada Premium
                                        </button>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.3 }}
                                        className="glass-card p-8 bg-gradient-to-br from-amber-500/10 to-orange-500/5 border border-amber-500/20"
                                    >
                                        <h3 className="font-display text-xl font-bold text-amber-400 mb-4 flex items-center gap-2">
                                            <Star className="w-5 h-5" /> Você é Premium
                                        </h3>
                                        <p className="text-cosmic-200/80 text-sm">Seu mapa astral completo está sendo atualizado com as configurações cósmicas de hoje.</p>
                                    </motion.div>
                                )}
                            </div>

                        </div>
                    )}
                </div>
            </main>
        </ProtectedRoute>
    )
}
