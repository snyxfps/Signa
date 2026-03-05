import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { api } from '@/lib/api'

export interface User {
    id: string
    email: string
    full_name: string
    email_verified: boolean
}

interface AuthState {
    user: User | null
    accessToken: string | null
    refreshToken: string | null
    isAuthenticated: boolean
    plan: 'free' | 'premium' | 'annual'
    login: (email: string, password: string) => Promise<void>
    logout: () => void
    setUser: (user: User) => void
    hydrate: () => Promise<void>
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            user: null,
            accessToken: null,
            refreshToken: null,
            isAuthenticated: false,
            plan: 'free',

            login: async (email, password) => {
                const res = await api.post('/api/v1/auth/login/', { email, password })
                const { access, refresh } = res.data
                api.defaults.headers.common['Authorization'] = `Bearer ${access}`
                set({ accessToken: access, refreshToken: refresh, isAuthenticated: true })
                // Fetch user profile
                const me = await api.get('/api/v1/auth/me/')
                set({ user: me.data })
            },

            logout: () => {
                delete api.defaults.headers.common['Authorization']
                set({ user: null, accessToken: null, refreshToken: null, isAuthenticated: false, plan: 'free' })
            },

            setUser: (user) => set({ user }),

            hydrate: async () => {
                const { accessToken, isAuthenticated } = get()
                if (accessToken && isAuthenticated) {
                    api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
                    try {
                        const me = await api.get('/api/v1/auth/me/')
                        set({ user: me.data })
                    } catch { /* token expired — interceptor handles refresh */ }
                }
            },
        }),
        {
            name: 'signa-auth',
            partialize: (state) => ({
                accessToken: state.accessToken,
                refreshToken: state.refreshToken,
                isAuthenticated: state.isAuthenticated,
                plan: state.plan,
            }),
        }
    )
)
