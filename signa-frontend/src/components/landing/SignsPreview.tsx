'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

const SIGNS = [
    { slug: 'aries', name: 'Áries', symbol: '♈', element: 'fire', dates: '21 Mar – 19 Abr' },
    { slug: 'taurus', name: 'Touro', symbol: '♉', element: 'earth', dates: '20 Abr – 20 Mai' },
    { slug: 'gemini', name: 'Gêmeos', symbol: '♊', element: 'air', dates: '21 Mai – 20 Jun' },
    { slug: 'cancer', name: 'Câncer', symbol: '♋', element: 'water', dates: '21 Jun – 22 Jul' },
    { slug: 'leo', name: 'Leão', symbol: '♌', element: 'fire', dates: '23 Jul – 22 Ago' },
    { slug: 'virgo', name: 'Virgem', symbol: '♍', element: 'earth', dates: '23 Ago – 22 Set' },
    { slug: 'libra', name: 'Libra', symbol: '♎', element: 'air', dates: '23 Set – 22 Out' },
    { slug: 'scorpio', name: 'Escorpião', symbol: '♏', element: 'water', dates: '23 Out – 21 Nov' },
    { slug: 'sagittarius', name: 'Sagitário', symbol: '♐', element: 'fire', dates: '22 Nov – 21 Dez' },
    { slug: 'capricorn', name: 'Capricórnio', symbol: '♑', element: 'earth', dates: '22 Dez – 19 Jan' },
    { slug: 'aquarius', name: 'Aquário', symbol: '♒', element: 'air', dates: '20 Jan – 18 Fev' },
    { slug: 'pisces', name: 'Peixes', symbol: '♓', element: 'water', dates: '19 Fev – 20 Mar' },
]

const ELEMENT_COLORS: Record<string, string> = {
    fire: 'from-orange-500/20 to-red-500/20 border-orange-500/30 text-orange-300',
    earth: 'from-emerald-500/20 to-green-500/20 border-emerald-500/30 text-emerald-300',
    air: 'from-sky-500/20 to-blue-500/20 border-sky-500/30 text-sky-300',
    water: 'from-blue-500/20 to-indigo-500/20 border-blue-500/30 text-blue-300',
}

export function SignsPreview() {
    return (
        <section className="py-24 px-4 relative">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
                        Os <span className="gradient-text">12 Signos do Zodíaco</span>
                    </h2>
                    <p className="text-cosmic-200/60 text-lg max-w-xl mx-auto">
                        Cada signo carrega uma energia, personalidade e sabedoria cósmica única.
                    </p>
                </motion.div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {SIGNS.map((sign, i) => (
                        <motion.div
                            key={sign.slug}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: i * 0.05 }}
                        >
                            <Link href={`/signs/${sign.slug}`}>
                                <div className={`glass-card-hover relative p-6 text-center cursor-pointer group bg-gradient-to-br ${ELEMENT_COLORS[sign.element]} border overflow-hidden`}>

                                    <div className="relative z-10 flex flex-col items-center">
                                        <div className="w-24 h-24 rounded-full overflow-hidden mb-5 border-2 border-white/10 group-hover:-translate-y-1 group-hover:scale-105 group-hover:border-white/40 group-hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] transition-all duration-300">
                                            <img
                                                src={`/zodiac/${sign.slug}.png`}
                                                alt={sign.name}
                                                className="object-cover w-full h-full"
                                            />
                                        </div>

                                        <div className="font-display font-bold text-xl text-white tracking-wide mb-1 transition-colors group-hover:text-nebula-100">{sign.name}</div>
                                        <div className="text-xs text-white/50 font-medium tracking-widest uppercase transition-colors group-hover:text-white/80">{sign.dates}</div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                <div className="text-center mt-10">
                    <Link href="/signs" className="btn-ghost">
                        Explorar Todos os Signos →
                    </Link>
                </div>
            </div>
        </section >
    )
}
