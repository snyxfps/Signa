'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Sparkles, Moon, Loader2 } from 'lucide-react'
import { api } from '@/lib/api'

export default function RegisterPage() {
    const router = useRouter()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setSuccess('')
        setIsLoading(true)

        try {
            await api.post('/api/v1/auth/register/', {
                full_name: name,
                email,
                password,
                password2: password
            })

            setSuccess('Conta cósmica criada com sucesso! Redirecionando para o login...')
            setTimeout(() => {
                router.push('/login')
            }, 800)

        } catch (err: any) {
            const data = err.response?.data
            if (data) {
                const firstErrorKey = Object.keys(data)[0]
                setError(data[firstErrorKey]?.[0] || 'Erro ao criar conta. Tente novamente.')
            } else {
                setError('Erro de conexão. Tente novamente mais tarde.')
            }
        } finally {
            setIsLoading(false)
        }
    }
    return (
        <div className="min-h-screen flex text-white bg-cosmic-50">
            {/* Left side - Visual/Cosmic Branding */}
            <div className="hidden lg:flex w-1/2 relative overflow-hidden bg-cosmic-100 flex-col justify-between p-12 lg:p-24 border-r border-white/5">
                <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=2094&auto=format&fit=crop')] bg-cover bg-center opacity-20 mix-blend-screen pointer-events-none" />
                <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-nebula-600/30 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-cosmic-600/30 rounded-full blur-[120px] pointer-events-none" />

                <div className="relative z-10">
                    <Link href="/" className="inline-flex items-center gap-2 text-cosmic-300 hover:text-white transition-colors mb-12">
                        <ArrowLeft className="w-5 h-5" />
                        <span>Voltar ao início</span>
                    </Link>
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cosmic-500 to-nebula-500 flex items-center justify-center">
                            <Moon className="w-5 h-5 text-white" />
                        </div>
                        <span className="font-display text-2xl font-bold tracking-widest text-shadow-glow">SIGNA</span>
                    </div>
                </div>

                <div className="relative z-10 max-w-md">
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}>
                        <h2 className="font-display text-5xl font-bold mb-6 leading-tight">
                            Desvende os Segredos do <span className="gradient-text">Universo</span>
                        </h2>
                        <p className="text-cosmic-200/80 text-lg leading-relaxed">
                            Crie sua conta para gerar seu mapa natal, receber interpretações personalizadas do seu horóscopo e entender sua energia cósmica.
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Right side - Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-24 relative overflow-hidden">
                <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-cosmic-600/20 rounded-full blur-3xl pointer-events-none lg:hidden" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-nebula-600/20 rounded-full blur-3xl pointer-events-none lg:hidden" />

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="w-full max-w-md relative z-10"
                >
                    <div className="lg:hidden mb-10 flex items-center justify-center relative">
                        <Link href="/" className="absolute left-0 top-1/2 -translate-y-1/2 text-cosmic-300 hover:text-white">
                            <ArrowLeft className="w-6 h-6" />
                        </Link>
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cosmic-500 to-nebula-500 flex items-center justify-center shadow-[0_0_30px_rgba(168,85,247,0.3)]">
                            <Moon className="w-8 h-8 text-white" />
                        </div>
                    </div>

                    <div className="mb-10 lg:mb-12 text-center lg:text-left">
                        <h1 className="font-display text-4xl font-bold mb-3 text-white">Criar sua Conta</h1>
                        <p className="text-cosmic-300 text-lg">Sua jornada cósmica grátis começa agora.</p>
                    </div>

                    {error && (
                        <div className="mb-6 bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl text-sm font-medium">
                            {error}
                        </div>
                    )}

                    {success && (
                        <div className="mb-6 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-4 rounded-xl text-sm font-medium">
                            {success}
                        </div>
                    )}

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-cosmic-200 ml-1" htmlFor="name">
                                Nome Completo
                            </label>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Seu nome"
                                className="w-full bg-cosmic-100/50 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder-cosmic-400/40 outline-none focus:border-nebula-400 focus:ring-2 focus:ring-nebula-400/20 transition-all font-medium"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-cosmic-200 ml-1" htmlFor="email">
                                E-mail
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="astrologia@signa.app"
                                className="w-full bg-cosmic-100/50 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder-cosmic-400/40 outline-none focus:border-nebula-400 focus:ring-2 focus:ring-nebula-400/20 transition-all font-medium"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-cosmic-200 ml-1" htmlFor="password">
                                Senha Cósmica
                            </label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full bg-cosmic-100/50 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder-cosmic-400/40 outline-none focus:border-nebula-400 focus:ring-2 focus:ring-nebula-400/20 transition-all font-medium tracking-widest text-lg"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading || !!success}
                            className="w-full relative group overflow-hidden rounded-2xl p-[1px] mt-8 shadow-cosmic-lg disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            <span className="absolute inset-0 bg-gradient-to-r from-cosmic-400 via-nebula-500 to-cosmic-400 rounded-2xl transition-all duration-500 group-hover:bg-[length:200%_auto] bg-[length:100%_auto]" />
                            <div className="relative bg-cosmic-50 border border-white/10 group-hover:bg-opacity-0 transition-colors duration-300 rounded-2xl px-8 py-4 flex items-center justify-center gap-2">
                                {isLoading ? (
                                    <Loader2 className="w-5 h-5 text-white animate-spin" />
                                ) : (
                                    <>
                                        <span className="font-bold text-lg text-white">Descobrir Meu Mapa</span>
                                        <Sparkles className="w-5 h-5" />
                                    </>
                                )}
                            </div>
                        </button>
                    </form>

                    <p className="mt-10 text-center text-cosmic-300/80">
                        Já tem um mapa?{' '}
                        <Link href="/login" className="text-white hover:text-nebula-400 font-semibold transition-colors border-b border-white/20 hover:border-nebula-400 pb-0.5">
                            Faça login
                        </Link>
                    </p>
                </motion.div>
            </div>
        </div>
    )
}
