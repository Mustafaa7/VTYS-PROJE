'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/hooks/useAuth'
import Navbar from '@/app/components/Navbar'
import { BookOpen, Loader2 } from 'lucide-react'

export default function DashboardPage() {
  const router = useRouter()
  const { user, loading } = useAuth()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }

    if (!loading && user && !user.emailVerified) {
      router.push('/verify-email')
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <Navbar />
        <div className="flex items-center justify-center min-h-[calc(100vh-80px)]">
          <div className="text-center">
            <Loader2 className="w-12 h-12 text-blue-500 animate-spin mx-auto mb-4" />
            <p className="text-slate-400">Yükleniyor...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-2">
            Hoşgeldin, {user.email?.split('@')[0]}!
          </h1>
          <p className="text-slate-400">
            Öğrenme yolculuğuna başlamaya hazır mısın?
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="p-8 rounded-2xl bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm hover:border-slate-600/50 transition">
            <div className="mb-4 w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-blue-500" />
            </div>
            <h2 className="text-2xl font-semibold text-white mb-3">Taslaklar</h2>
            <p className="text-slate-400 mb-6">
              Hazırladığın soruları düzenle ve onaylaya hazır hale getir.
            </p>
            <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition">
              Taslakları Görüntüle
            </button>
          </div>

          <div className="p-8 rounded-2xl bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm hover:border-slate-600/50 transition">
            <div className="mb-4 w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-green-500" />
            </div>
            <h2 className="text-2xl font-semibold text-white mb-3">Onaylı Sorular</h2>
            <p className="text-slate-400 mb-6">
              Yayımladığın soruları görüntüle ve paylaş.
            </p>
            <button className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition">
              Onaylı Soruları Görüntüle
            </button>
          </div>
        </div>

        <div className="mt-12 p-8 rounded-2xl bg-slate-800/30 border border-slate-700/50 backdrop-blur-sm">
          <h2 className="text-xl font-semibold text-white mb-4">Temel Bilgiler</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="text-slate-500 text-sm mb-1">E-posta</p>
              <p className="text-white font-medium">{user.email}</p>
            </div>
            <div>
              <p className="text-slate-500 text-sm mb-1">Durum</p>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <p className="text-white font-medium">Etkin</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
