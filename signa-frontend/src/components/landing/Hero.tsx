'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Sparkles, Star, Moon } from 'lucide-react'

export function Hero() {
    return (
        <section className="relative min-h-screen flex items-center justify-center px-4 pt-20">
            <div className="max-w-5xl mx-auto text-center">
                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cosmic-500/30 bg-cosmic-500/10 text-cosmic-300 text-sm font-medium mb-8"
                >
                    <Sparkles className="w-4 h-4" />
                    <span>Sua jornada cósmica começa aqui</span>
                </motion.div>

                {/* Headline */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.1 }}
                    className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-6"
                >
                    Descubra Seu{' '}
                    <span className="gradient-text text-shadow-glow">
                        Mapa Cósmico
                    </span>
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-xl md:text-2xl text-cosmic-200/70 max-w-2xl mx-auto mb-12 leading-relaxed"
                >
                    Insights astrológicos personalizados baseados nos dados do seu nascimento.
                    Signo solar, lunar e ascendente — tudo revelado.
                </motion.p>

                {/* CTAs */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                >
                    <Link href="/register" className="btn-primary text-lg px-8 py-4">
                        <Star className="w-5 h-5" />
                        Explore Seu Signo
                    </Link>
                    <Link href="/signs" className="btn-ghost text-lg px-8 py-4">
                        <Moon className="w-5 h-5" />
                        Navegar Pelos Signos
                    </Link>
                </motion.div>

                {/* Stats */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="mt-20 grid grid-cols-3 gap-8 max-w-lg mx-auto"
                >
                    {[
                        { value: '12', label: 'Signos do Zodíaco' },
                        { value: '144', label: 'Pares de Combinação' },
                        { value: '∞', label: 'Insights Cósmicos' },
                    ].map((stat) => (
                        <div key={stat.label} className="text-center">
                            <div className="text-3xl font-display font-bold gradient-text">{stat.value}</div>
                            <div className="text-sm text-cosmic-300/60 mt-1">{stat.label}</div>
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* Decorative floating elements */}
            <div className="absolute top-1/4 left-8 text-4xl animate-float opacity-20" style={{ animationDelay: '0s' }}>♈</div>
            <div className="absolute top-1/3 right-12 text-3xl animate-float opacity-20" style={{ animationDelay: '1s' }}>♌</div>
            <div className="absolute bottom-1/4 left-16 text-3xl animate-float opacity-20" style={{ animationDelay: '2s' }}>♎</div>
            <div className="absolute bottom-1/3 right-8 text-4xl animate-float opacity-20" style={{ animationDelay: '0.5s' }}>♓</div>
        </section>
    )
}
