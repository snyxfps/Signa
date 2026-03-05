'use client'

import { motion } from 'framer-motion'
import { User, Sun, Moon, ArrowUpRight, Star, Heart, Briefcase } from 'lucide-react'

const FEATURES = [
    {
        icon: User,
        title: 'Perfil Astro Pessoal',
        description: 'Decodifique seus signos solar, lunar e ascendente com insights profundos da sua personalidade.',
        gradient: 'from-cosmic-500/20 to-nebula-500/20',
    },
    {
        icon: Sun,
        title: 'Horóscopo Diário',
        description: 'Orientação cósmica fresca todos os dias para os 12 signos, incluindo amor, trabalho e saúde.',
        gradient: 'from-amber-500/20 to-orange-500/20',
    },
    {
        icon: Heart,
        title: 'Motor de Compatibilidade',
        description: 'Descubra seu par cósmico. Veja a compatibilidade de amor, amizade e trabalho de qualquer dupla.',
        gradient: 'from-rose-500/20 to-pink-500/20',
    },
    {
        icon: Moon,
        title: 'Insights do Signo Lunar',
        description: 'Desbloqueie a camada emocional do seu mapa. Seu signo lunar revela o mundo interior. (Premium)',
        gradient: 'from-blue-500/20 to-indigo-500/20',
        premium: true,
    },
    {
        icon: ArrowUpRight,
        title: 'Signo Ascendente',
        description: 'Como o mundo te vê. O ascendente define a sua visão exterior e as primeiras impressões. (Premium)',
        gradient: 'from-emerald-500/20 to-teal-500/20',
        premium: true,
    },
    {
        icon: Star,
        title: 'Enciclopédia do Zodíaco',
        description: 'Hub de conhecimento para os 12 signos — personalidade, estilo no amor, estilo no trabalho.',
        gradient: 'from-violet-500/20 to-purple-500/20',
    },
]

export function FeaturesSection() {
    return (
        <section className="py-24 px-4 relative">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
                        Tudo o que Você Precisa para{' '}
                        <span className="gradient-text">Ler as Estrelas</span>
                    </h2>
                    <p className="text-cosmic-200/60 text-lg max-w-xl mx-auto">
                        Do horóscopo diário à análise natal profunda — O SIGNA tem de tudo.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {FEATURES.map((feat, i) => {
                        const Icon = feat.icon
                        return (
                            <motion.div
                                key={feat.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                className={`glass-card-hover p-6 bg-gradient-to-br ${feat.gradient} relative overflow-hidden group`}
                            >
                                {feat.premium && (
                                    <span className="absolute top-4 right-4 px-2 py-0.5 text-xs font-semibold bg-amber-500/20 border border-amber-500/30 text-amber-400 rounded-full">
                                        Premium
                                    </span>
                                )}
                                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <Icon className="w-6 h-6 text-cosmic-300" />
                                </div>
                                <h3 className="font-display text-xl font-semibold text-white mb-2">{feat.title}</h3>
                                <p className="text-cosmic-200/60 text-sm leading-relaxed">{feat.description}</p>
                            </motion.div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
