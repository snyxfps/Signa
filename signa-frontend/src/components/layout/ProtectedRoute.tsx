'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useAuthStore } from '@/store/authStore'
import { Sparkles, Loader2 } from 'lucide-react'

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const router = useRouter()
    const pathname = usePathname()
    const { isAuthenticated, hydrate } = useAuthStore()
    const [isChecking, setIsChecking] = useState(true)

    useEffect(() => {
        const checkAuth = async () => {
            await hydrate()
            // Delay slightly to avoid flash of loading state if state is readily available
            setIsChecking(false)
        }
        checkAuth()
    }, [hydrate])

    useEffect(() => {
        if (!isChecking && !isAuthenticated) {
            router.push(`/login?redirect=${pathname}`)
        }
    }, [isChecking, isAuthenticated, router, pathname])

    if (isChecking || !isAuthenticated) {
        return (
            <div className="min-h-screen bg-cosmic-50 flex flex-col items-center justify-center p-4">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-cosmic-500/20 to-nebula-500/20 flex items-center justify-center shadow-[0_0_30px_rgba(168,85,247,0.15)] mb-8 animate-pulse">
                    <Sparkles className="w-10 h-10 text-nebula-400" />
                </div>
                <div className="flex items-center gap-3 text-cosmic-200">
                    <Loader2 className="w-5 h-5 animate-spin text-nebula-400" />
                    <span className="font-medium tracking-widest text-sm uppercase">Sincronizando com as estrelas...</span>
                </div>
            </div>
        )
    }

    return <>{children}</>
}
