'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Navbar from '@/components/layout/Navbar'
import ProtectedRoute from '@/components/layout/ProtectedRoute'
import { api } from '@/lib/api'
import { User, MapPin, Calendar, Clock, Star, Edit3, Settings, Save, X, Loader2 } from 'lucide-react'
import { useAuthStore } from '@/store/authStore'

const COMMON_CITIES = [
    "São Paulo, SP, Brasil", "Rio de Janeiro, RJ, Brasil", "Belo Horizonte, MG, Brasil",
    "Salvador, BA, Brasil", "Brasília, DF, Brasil", "Curitiba, PR, Brasil",
    "Fortaleza, CE, Brasil", "Recife, PE, Brasil", "Porto Alegre, RS, Brasil",
    "Belém, PA, Brasil", "Goiânia, GO, Brasil", "Campinas, SP, Brasil",
    "Vitória, ES, Brasil", "Natal, RN, Brasil", "Lisboa, Portugal", "Porto, Portugal",
    "Nova York, EUA", "Miami, EUA", "Londres, Reino Unido", "Madri, Espanha"
]

export default function ProfilePage() {
    const { user } = useAuthStore()
    const [profile, setProfile] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    const [isEditing, setIsEditing] = useState(false)
    const [isSaving, setIsSaving] = useState(false)
    const [editForm, setEditForm] = useState({
        avatar_url: '',
        birth_date: '',
        birth_time: '',
        birth_city: ''
    })

    const handleEditToggle = () => {
        if (!isEditing) {
            setEditForm({
                avatar_url: profile?.avatar_url || '',
                birth_date: profile?.birth_date || '',
                birth_time: profile?.birth_time || '',
                birth_city: profile?.birth_city || ''
            })
            setIsEditing(true)
        } else {
            setIsEditing(false)
        }
    }

    const handleSave = async () => {
        setIsSaving(true)
        try {
            // Se o avatar for uma string vazia, não envia para não quebrar a validação de URL do Django
            const payload: any = {
                birth_date: editForm.birth_date,
                birth_city: editForm.birth_city,
                birth_time: editForm.birth_time || null,
            }
            if (editForm.avatar_url) {
                payload.avatar_url = editForm.avatar_url
            }

            const res = await api.put('/api/v1/profile/me/', payload)
            setProfile(res.data)
            setIsEditing(false)
        } catch (e: any) {
            console.error(e.response?.data || e.message)
            alert('Não foi possível salvar: ' + JSON.stringify(e.response?.data || 'Erro desconhecido'))
        } finally {
            setIsSaving(false)
        }
    }

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await api.get('/api/v1/profile/me/')
                setProfile(res.data)
            } catch (e) {
                console.error(e)
            } finally {
                setLoading(false)
            }
        }
        fetchProfile()
    }, [])

    return (
        <ProtectedRoute>
            <Navbar />
            <main className="min-h-screen pt-32 pb-16 px-4 relative overflow-hidden">
                {/* Background Details */}
                <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=2094&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-screen pointer-events-none" />
                <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-nebula-600/15 rounded-full blur-[150px] pointer-events-none" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-cosmic-600/15 rounded-full blur-[150px] pointer-events-none" />

                <div className="max-w-3xl mx-auto relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-12 flex justify-between items-end"
                    >
                        <div>
                            <h1 className="font-display text-5xl font-bold text-shadow-glow mb-2">
                                Meu <span className="gradient-text">Espaço Cósmico</span>
                            </h1>
                            <p className="text-cosmic-200/80 text-lg">
                                Suas coordenadas no universo e configurações de conta.
                            </p>
                        </div>
                        <button className="btn-secondary flex items-center gap-2 p-3 text-sm">
                            <Settings className="w-4 h-4" /> Ajustes
                        </button>
                    </motion.div>

                    {loading ? (
                        <div className="glass-card h-96 animate-pulse bg-white/5" />
                    ) : (
                        <div className="space-y-6">
                            {/* Profile Header Card */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="glass-card p-10 flex flex-col md:flex-row gap-8 items-center md:items-start relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 w-64 h-64 bg-nebula-500/10 rounded-full blur-[60px]" />

                                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white/10 shrink-0 bg-cosmic-800 flex items-center justify-center relative group">
                                    {profile?.avatar_url ? (
                                        <img src={profile.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
                                    ) : (
                                        <User className="w-16 h-16 text-cosmic-400" />
                                    )}
                                    <button onClick={handleEditToggle} className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm cursor-pointer">
                                        <Edit3 className="w-6 h-6 text-white" />
                                    </button>
                                </div>

                                <div className="flex-1 text-center md:text-left">
                                    <h2 className="font-display text-3xl font-bold text-white mb-2">{user?.full_name}</h2>
                                    <p className="text-cosmic-300 font-mono text-sm mb-6">{user?.email}</p>

                                    <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                                        <span className={`badge-primary flex items-center gap-2 ${profile?.is_premium ? 'from-amber-500 to-orange-400' : ''}`}>
                                            <Star className="w-4 h-4" />
                                            {profile?.is_premium ? 'Plano Premium' : 'Plano Estelar (Grátis)'}
                                        </span>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Birth Details Card */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.1 }}
                                className="glass-card p-10"
                            >
                                <div className="flex justify-between items-center mb-8 pb-4 border-b border-white/10">
                                    <h3 className="font-display text-2xl font-bold">Origem Astral</h3>

                                    {!isEditing ? (
                                        <button onClick={handleEditToggle} className="text-sm text-nebula-400 hover:text-white transition-colors flex items-center gap-2">
                                            <Edit3 className="w-4 h-4" /> Alterar Dados
                                        </button>
                                    ) : (
                                        <div className="flex items-center gap-3">
                                            <button onClick={handleEditToggle} disabled={isSaving} className="text-sm text-cosmic-300 hover:text-white transition-colors flex items-center gap-1 disabled:opacity-50">
                                                <X className="w-4 h-4" /> Cancelar
                                            </button>
                                            <button onClick={handleSave} disabled={isSaving} className="btn-primary py-2 px-4 text-sm flex items-center gap-2 disabled:opacity-50">
                                                {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                                                Salvar
                                            </button>
                                        </div>
                                    )}
                                </div>

                                {isEditing ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2 md:col-span-2">
                                            <label className="text-sm font-semibold text-cosmic-200 ml-1">Url da Foto de Perfil (Avatar)</label>
                                            <input
                                                type="url"
                                                value={editForm.avatar_url}
                                                onChange={e => setEditForm({ ...editForm, avatar_url: e.target.value })}
                                                placeholder="https://..."
                                                className="w-full bg-cosmic-900 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-cosmic-400/50 outline-none focus:border-nebula-400 transition-all font-medium"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-semibold text-cosmic-200 ml-1">Data de Nascimento</label>
                                            <input
                                                type="date"
                                                value={editForm.birth_date}
                                                onChange={e => setEditForm({ ...editForm, birth_date: e.target.value })}
                                                className="w-full bg-cosmic-900 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-cosmic-400/50 outline-none focus:border-nebula-400 transition-all font-medium"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-semibold text-cosmic-200 ml-1">Hora de Nascimento (Opcional)</label>
                                            <input
                                                type="time"
                                                value={editForm.birth_time?.substring(0, 5) || ''}
                                                onChange={e => setEditForm({ ...editForm, birth_time: e.target.value })}
                                                className="w-full bg-cosmic-900 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-cosmic-400/50 outline-none focus:border-nebula-400 transition-all font-medium"
                                            />
                                        </div>
                                        <div className="space-y-2 md:col-span-2">
                                            <label className="text-sm font-semibold text-cosmic-200 ml-1">Cidade de Nascimento</label>
                                            <input
                                                type="text"
                                                list={editForm.birth_city.length >= 2 ? "city-suggestions-profile" : undefined}
                                                value={editForm.birth_city}
                                                onChange={e => setEditForm({ ...editForm, birth_city: e.target.value })}
                                                placeholder="Ex: São Paulo, SP, Brasil"
                                                className="w-full bg-cosmic-900 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-cosmic-400/50 outline-none focus:border-nebula-400 transition-all font-medium"
                                            />
                                            <datalist id="city-suggestions-profile">
                                                {COMMON_CITIES.map(city => (
                                                    <option key={city} value={city} />
                                                ))}
                                            </datalist>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2 text-cosmic-400/80 mb-1">
                                                <Calendar className="w-4 h-4" />
                                                <span className="text-sm font-medium uppercase tracking-wider">Data de Nasc.</span>
                                            </div>
                                            <div className="text-xl font-medium text-white">
                                                {profile?.birth_date ? new Date(profile.birth_date).toLocaleDateString('pt-BR', { timeZone: 'UTC' }) : 'Não informado'}
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2 text-cosmic-400/80 mb-1">
                                                <Clock className="w-4 h-4" />
                                                <span className="text-sm font-medium uppercase tracking-wider">Hora Exata</span>
                                            </div>
                                            <div className="text-xl font-medium text-white">
                                                {profile?.birth_time ? profile.birth_time.substring(0, 5) : 'Desconhecida'}
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2 text-cosmic-400/80 mb-1">
                                                <MapPin className="w-4 h-4" />
                                                <span className="text-sm font-medium uppercase tracking-wider">Local</span>
                                            </div>
                                            <div className="text-xl font-medium text-white truncate" title={profile?.birth_city}>
                                                {profile?.birth_city || 'Não informado'}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        </div>
                    )}
                </div>
            </main>
        </ProtectedRoute>
    )
}
