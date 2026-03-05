'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Calendar, Clock, MapPin, ArrowRight, Star } from 'lucide-react'
import { api } from '@/lib/api'

const COMMON_CITIES = [
    "São Paulo, SP, Brasil", "Rio de Janeiro, RJ, Brasil", "Belo Horizonte, MG, Brasil",
    "Salvador, BA, Brasil", "Brasília, DF, Brasil", "Curitiba, PR, Brasil",
    "Fortaleza, CE, Brasil", "Recife, PE, Brasil", "Porto Alegre, RS, Brasil",
    "Belém, PA, Brasil", "Goiânia, GO, Brasil", "Campinas, SP, Brasil",
    "Vitória, ES, Brasil", "Natal, RN, Brasil", "Lisboa, Portugal", "Porto, Portugal",
    "Nova York, EUA", "Miami, EUA", "Londres, Reino Unido", "Madri, Espanha"
]

const steps = [
    { id: 'date', title: 'Quando você nasceu?', subtitle: 'As estrelas querem saber o dia do seu primeiro suspiro.', icon: Calendar },
    { id: 'time', title: 'Qual a hora exata?', subtitle: 'Para calcularmos seu ascendente com precisão cósmica.', icon: Clock },
    { id: 'location', title: 'Onde você estava?', subtitle: 'A posição geográfica ajusta o mapa natal.', icon: MapPin },
    { id: 'loading', title: 'Mapeando as Estrelas', subtitle: 'Calculando posições celestes e alinhando constelações...', icon: Star },
]

export default function OnboardingPage() {
    const router = useRouter()

    const [currentStep, setCurrentStep] = useState(0)
    const [formData, setFormData] = useState({
        birth_date: '',
        birth_time: '',
        birth_city: ''
    })

    const handleNext = async () => {
        if (currentStep < steps.length - 2) {
            setCurrentStep(prev => prev + 1)
        } else if (currentStep === steps.length - 2) {
            setCurrentStep(steps.length - 1) // Go to loading step
            try {
                // Formatting data for backend: wait a moment for the amazing animation
                await new Promise(resolve => setTimeout(resolve, 800))

                await api.put('/api/v1/profile/me/', {
                    birth_date: formData.birth_date,
                    birth_time: formData.birth_time ? formData.birth_time : null,
                    birth_city: formData.birth_city
                })

                router.push('/dashboard')
            } catch (err) {
                console.error(err)
                setCurrentStep(prev => prev - 1) // Go back on error
            }
        }
    }

    const { icon: StepIcon, title, subtitle } = steps[currentStep]

    return (
        <div className="min-h-screen bg-cosmic-50 flex items-center justify-center p-4 overflow-hidden relative">
            {/* Cosmic Background */}
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=2094&auto=format&fit=crop')] bg-cover bg-center opacity-20 mix-blend-screen pointer-events-none" />

            {/* Dynamic Nebulas */}
            <motion.div
                animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute w-[600px] h-[600px] bg-nebula-600/20 rounded-full blur-[120px] pointer-events-none"
            />

            <div className="w-full max-w-lg relative z-10">
                {/* Progress Bar */}
                {currentStep < steps.length - 1 && (
                    <div className="flex gap-2 mb-12 justify-center">
                        {[0, 1, 2].map(i => (
                            <div key={i} className={`h-1.5 rounded-full transition-all duration-500 ${i === currentStep ? 'w-12 bg-nebula-400 shadow-[0_0_10px_rgba(168,85,247,0.5)]' : i < currentStep ? 'w-4 bg-nebula-400/50' : 'w-4 bg-white/10'}`} />
                        ))}
                    </div>
                )}

                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentStep}
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 1.05, y: -20 }}
                        transition={{ duration: 0.5, type: 'spring' }}
                        className="glass-card p-10 text-center relative overflow-hidden"
                    >
                        {/* Shimmer Effect */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full animate-shimmer" />

                        <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-br from-cosmic-600/50 to-nebula-500/50 border border-white/10 flex items-center justify-center shadow-[0_0_40px_rgba(168,85,247,0.2)] mb-8">
                            <StepIcon className={`w-10 h-10 ${currentStep === steps.length - 1 ? 'text-nebula-300 animate-spin-slow' : 'text-white'}`} />
                        </div>

                        <h2 className="font-display text-3xl font-bold text-white mb-3 tracking-wide">{title}</h2>
                        <p className="text-cosmic-200/80 mb-10 text-lg leading-relaxed">{subtitle}</p>

                        <div className="space-y-6">
                            {currentStep === 0 && (
                                <motion.input
                                    autoFocus
                                    type="date"
                                    value={formData.birth_date}
                                    onChange={e => setFormData({ ...formData, birth_date: e.target.value })}
                                    className="w-full bg-cosmic-900 border border-white/20 rounded-2xl px-6 py-5 text-white placeholder-cosmic-400 outline-none focus:border-nebula-400 focus:ring-2 focus:ring-nebula-400/20 transition-all font-medium text-xl text-center shadow-inner"
                                />
                            )}

                            {currentStep === 1 && (
                                <motion.input
                                    autoFocus
                                    type="time"
                                    value={formData.birth_time}
                                    onChange={e => setFormData({ ...formData, birth_time: e.target.value })}
                                    className="w-full bg-cosmic-900 border border-white/20 rounded-2xl px-6 py-5 text-white placeholder-cosmic-400 outline-none focus:border-nebula-400 focus:ring-2 focus:ring-nebula-400/20 transition-all font-medium text-xl text-center shadow-inner"
                                />
                            )}

                            {currentStep === 2 && (
                                <>
                                    <motion.input
                                        autoFocus
                                        type="text"
                                        list={formData.birth_city.length >= 2 ? "city-suggestions" : undefined}
                                        placeholder="Ex: São Paulo, SP, Brasil"
                                        value={formData.birth_city}
                                        onChange={e => setFormData({ ...formData, birth_city: e.target.value })}
                                        className="w-full bg-cosmic-900 border border-white/20 rounded-2xl px-6 py-5 text-white placeholder-cosmic-400 outline-none focus:border-nebula-400 focus:ring-2 focus:ring-nebula-400/20 transition-all font-medium text-xl shadow-inner"
                                    />
                                    <datalist id="city-suggestions">
                                        {COMMON_CITIES.map(city => (
                                            <option key={city} value={city} />
                                        ))}
                                    </datalist>
                                </>
                            )}

                            {currentStep === steps.length - 1 && (
                                <div className="py-8">
                                    <div className="relative w-48 h-48 mx-auto">
                                        <div className="absolute inset-0 rounded-full border-t-2 border-nebula-400 animate-spin" />
                                        <div className="absolute inset-2 rounded-full border-r-2 border-cosmic-400 animate-spin-reverse delay-150" />
                                        <div className="absolute inset-4 rounded-full border-b-2 border-purple-400 animate-spin delay-300" />
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <Sparkles className="w-12 h-12 text-nebula-300 animate-pulse" />
                                        </div>
                                    </div>
                                    <p className="mt-8 text-nebula-300 font-medium tracking-widest uppercase animate-pulse">Sintonia Estabelecida</p>
                                </div>
                            )}

                            {currentStep < steps.length - 1 && (
                                <button
                                    onClick={handleNext}
                                    disabled={
                                        (currentStep === 0 && !formData.birth_date) ||
                                        (currentStep === 2 && !formData.birth_city)
                                    }
                                    className="w-full btn-primary px-8 py-5 text-lg rounded-2xl group flex justify-center items-center gap-2 mt-8 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:shadow-[0_0_30px_rgba(168,85,247,0.5)]"
                                >
                                    <span>Continuar</span>
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </button>
                            )}
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    )
}
