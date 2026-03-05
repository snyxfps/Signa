'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Check, Star, Zap } from 'lucide-react'

const PLANS = [
    {
        name: 'Grátis',
        price: 'R$ 0',
        period: 'para sempre',
        description: 'Comece sem custos sua jornada cósmica.',
        cta: 'Comece Grátis',
        href: '/auth/register',
        featured: false,
        features: [
            'Horóscopo diário (básico)',
            'Perfil do signo solar',
            'Compatibilidade (3/dia)',
            'Acesso à enciclopédia dos signos',
        ],
    },
    {
        name: 'Premium',
        price: 'R$ 19,90',
        period: 'por mês',
        description: 'Desbloqueie todo o mapa cósmico.',
        cta: 'Assine o Premium',
        href: '/auth/register?plan=premium',
        featured: true,
        features: [
            'Tudo do Grátis',
            'Insights do signo lunar',
            'Análise do signo ascendente',
            'Compatibilidade ilimitada',
            'Horóscopo semanal & mensal',
            'Relatório completo de personalidade',
            'Insights do mapa natal',
        ],
    },
    {
        name: 'Anual',
        price: 'R$ 179',
        period: 'por ano',
        description: '2 meses grátis. Melhor custo-benefício.',
        cta: 'Assinar Plano Anual',
        href: '/auth/register?plan=annual',
        featured: false,
        badge: 'Economize 25%',
        features: [
            'Tudo do Premium',
            'Relatório do mapa astral em PDF',
            'Suporte prioritário',
            'Acesso antecipado a funções',
        ],
    },
]

export function PricingSection() {
    return (
        <section id="pricing" className="py-24 px-4">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
                        Simples, <span className="gradient-text">Preços Transparentes</span>
                    </h2>
                    <p className="text-cosmic-200/60 text-lg">Comece grátis. Evolua quando estiver pronto para insights profundos.</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                    {PLANS.map((plan, i) => (
                        <motion.div
                            key={plan.name}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className={`relative rounded-3xl p-8 ${plan.featured
                                ? 'bg-gradient-to-br from-cosmic-600/30 to-nebula-600/20 border-2 border-cosmic-400/50 shadow-cosmic-lg scale-105'
                                : 'glass-card'
                                }`}
                        >
                            {plan.featured && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-cosmic-500 to-nebula-500 rounded-full text-sm font-semibold text-white flex items-center gap-1">
                                    <Star className="w-3 h-3" /> Mais Popular
                                </div>
                            )}
                            {plan.badge && (
                                <span className="absolute top-4 right-4 px-2 py-0.5 text-xs font-bold bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 rounded-full">
                                    {plan.badge}
                                </span>
                            )}

                            <h3 className="font-display text-xl font-bold text-white mb-1">{plan.name}</h3>
                            <p className="text-cosmic-300/60 text-sm mb-6">{plan.description}</p>

                            <div className="mb-8">
                                <span className="font-display text-4xl font-bold text-white">{plan.price}</span>
                                <span className="text-cosmic-300/50 text-sm ml-1">/{plan.period}</span>
                            </div>

                            <ul className="space-y-3 mb-8">
                                {plan.features.map((f) => (
                                    <li key={f} className="flex items-start gap-3 text-sm text-cosmic-200/80">
                                        <Check className="w-4 h-4 text-cosmic-400 shrink-0 mt-0.5" />
                                        {f}
                                    </li>
                                ))}
                            </ul>

                            <Link
                                href={plan.href}
                                className={plan.featured ? 'btn-primary w-full justify-center' : 'btn-ghost w-full justify-center'}
                            >
                                {plan.featured && <Zap className="w-4 h-4" />}
                                {plan.cta}
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
