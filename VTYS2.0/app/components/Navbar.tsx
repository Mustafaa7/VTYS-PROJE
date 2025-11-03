'use client'

import { useRouter } from 'next/navigation'
import { signOut } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import { useAuth } from '@/lib/hooks/useAuth'
import { BookOpen, LogOut, LogIn, UserPlus, Loader2 } from 'lucide-react'
import { useState } from 'react'

export default function Navbar() {
  const router = useRouter()
  const { user, loading } = useAuth()
  const [logoutLoading, setLogoutLoading] = useState(false)

  const handleLogout = async () => {
    setLogoutLoading(true)
    try {
      await signOut(auth)
      router.push('/')
    } catch (err) {
      console.error('Logout failed:', err)
    } finally {
      setLogoutLoading(false)
    }
  }

  return (
    <header className="border-b border-slate-700/50 backdrop-blur-xl bg-slate-900/50">
      <nav className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => router.push('/')}>
          <BookOpen className="w-8 h-8 text-blue-500" />
          <span className="text-xl font-bold text-white">AILearning</span>
        </div>

        <div className="flex items-center gap-4">
          {loading ? (
            <Loader2 className="w-5 h-5 text-slate-400 animate-spin" />
          ) : user ? (
            <>
              <div className="flex items-center gap-3">
                <span className="text-slate-400 text-sm hidden sm:inline">{user.email}</span>
                <button
                  onClick={() => router.push('/dashboard')}
                  className="px-4 py-2 text-slate-300 hover:text-white transition"
                >
                  Dashboard
                </button>
                <button
                  onClick={handleLogout}
                  disabled={logoutLoading}
                  className="px-4 py-2 text-slate-300 hover:text-white transition flex items-center gap-2 disabled:opacity-50"
                >
                  {logoutLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <LogOut className="w-4 h-4" />
                  )}
                  <span className="hidden sm:inline">Çıkış</span>
                </button>
              </div>
            </>
          ) : (
            <>
              <button
                onClick={() => router.push('/login')}
                className="px-4 py-2 text-slate-300 hover:text-white transition flex items-center gap-2"
              >
                <LogIn className="w-4 h-4" />
                <span className="hidden sm:inline">Giriş</span>
              </button>
              <button
                onClick={() => router.push('/register')}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition flex items-center gap-2"
              >
                <UserPlus className="w-4 h-4" />
                <span className="hidden sm:inline">Kayıt</span>
              </button>
            </>
          )}
        </div>
      </nav>
    </header>
  )
}
