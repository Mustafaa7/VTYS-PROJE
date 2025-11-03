'use client'

import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/hooks/useAuth'
import Navbar from '@/app/components/Navbar'
import { tr } from '@/lib/i18n'
import { ArrowRight, Zap, Loader2 } from 'lucide-react'

export default function Home() {
  const router = useRouter()
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-blue-500 animate-spin mx-auto mb-4" />
          <p className="text-slate-400">{tr.common.loading}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 py-20">
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            {tr.home.title.split(' ')[0]}{' '}
            <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              {tr.home.title.split(' ')[1]}
            </span>
          </h1>
          <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
            {tr.home.subtitle}
          </p>

          {!user ? (
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => router.push('/register')}
                className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-200 flex items-center gap-2"
              >
                {tr.home.getStarted}
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => router.push('/dashboard')}
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-200 inline-flex items-center gap-2"
            >
              {tr.home.goToDashboard}
              <ArrowRight className="w-5 h-5" />
            </button>
          )}
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-20">
          <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm hover:border-slate-600/50 transition">
            <Zap className="w-8 h-8 text-blue-500 mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">{tr.home.features.personalized}</h3>
            <p className="text-slate-400">
              {tr.home.features.personalizedDesc}
            </p>
          </div>

          <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm hover:border-slate-600/50 transition">
            <Zap className="w-8 h-8 text-blue-500 mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">{tr.home.features.interactive}</h3>
            <p className="text-slate-400">
              {tr.home.features.interactiveDesc}
            </p>
          </div>

          <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm hover:border-slate-600/50 transition">
            <Zap className="w-8 h-8 text-blue-500 mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">{tr.home.features.progress}</h3>
            <p className="text-slate-400">
              {tr.home.features.progressDesc}
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
