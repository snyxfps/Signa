'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { Sparkles, LogOut, User } from "lucide-react";

export default function Navbar() {
  const { isAuthenticated, logout, user } = useAuthStore()
  const pathname = usePathname()

  const isActive = (path: string) => pathname === path

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-cosmic-50/80 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
        <Link href="/" className="font-display text-2xl font-bold flex items-center gap-2 text-shadow-glow">
          <Sparkles className="w-5 h-5 text-nebula-400" />
          SIGNA
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-cosmic-200">
          <Link href="/signs" className={`transition-colors ${isActive('/signs') ? 'text-white' : 'hover:text-white'}`}>Signos</Link>
          <Link href="/compatibility" className={`transition-colors ${isActive('/compatibility') ? 'text-white' : 'hover:text-white'}`}>Compatibilidade</Link>

          {isAuthenticated && (
            <>
              <Link href="/dashboard" className={`transition-colors border-l border-white/10 pl-6 ${isActive('/dashboard') ? 'text-nebula-300' : 'hover:text-nebula-300'}`}>Dashboard</Link>
              <Link href="/horoscope" className={`transition-colors ${isActive('/horoscope') ? 'text-nebula-300' : 'hover:text-nebula-300'}`}>Horóscopo</Link>
            </>
          )}
        </nav>

        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <Link href="/profile" className="flex items-center gap-2 text-sm text-cosmic-200 hover:text-white transition-colors">
                <div className="w-8 h-8 rounded-full bg-cosmic-600/50 border border-white/10 flex items-center justify-center">
                  <User className="w-4 h-4" />
                </div>
                <span className="hidden sm:block">{user?.full_name?.split(' ')[0] || 'Perfil'}</span>
              </Link>
              <button
                onClick={() => logout()}
                className="text-cosmic-300 hover:text-red-400 transition-colors"
                title="Sair"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link href="/login" className="text-sm font-medium text-cosmic-200 hover:text-white transition-colors">
                Entrar
              </Link>
              <Link href="/register" className="btn-primary text-sm px-5 py-2">
                Criar Conta
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
