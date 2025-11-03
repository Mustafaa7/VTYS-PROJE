'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import { tr } from '@/lib/i18n'
import { Mail, Lock, ArrowRight, Loader2 } from 'lucide-react'
import Navbar from '@/app/components/Navbar'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const validateForm = () => {
    if (!email.trim()) {
      setError(tr.login.errors.emailRequired)
      return false
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError(tr.login.errors.invalidEmail)
      return false
    }
    if (!password) {
      setError(tr.login.errors.passwordRequired)
      return false
    }
    return true
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!validateForm()) return

    setLoading(true)
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)

      if (!userCredential.user.emailVerified) {
        setError('E-postanız henüz doğrulanmamış. Lütfen e-postanızı doğrulayın.')
        await auth.signOut()
        router.push('/verify-email')
        return
      }

      router.push('/dashboard')
    } catch (err: any) {
      if (err.code === 'auth/user-not-found') {
        setError(tr.login.errors.userNotFound)
      } else if (err.code === 'auth/wrong-password') {
        setError(tr.login.errors.wrongPassword)
      } else if (err.code === 'auth/invalid-email') {
        setError(tr.login.errors.invalidEmail)
      } else if (err.code === 'auth/invalid-credential') {
        setError(tr.login.errors.invalidCredentials)
      } else {
        setError(tr.login.errors.loginFailed)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Navbar />
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] px-4">
      <div className="w-full max-w-md">
        <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-8 shadow-2xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">
              {tr.login.title}
            </h1>
            <p className="text-slate-400">{tr.login.subtitle}</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-200 mb-2">
                {tr.common.email}
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:bg-slate-700 transition"
                  disabled={loading}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-200 mb-2">
                {tr.common.password}
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:bg-slate-700 transition"
                  disabled={loading}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-6 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition duration-200 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  {tr.common.loading}
                </>
              ) : (
                <>
                  {tr.login.signIn}
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-slate-700">
            <p className="text-slate-400 text-center text-sm">
              {tr.login.noAccount}{' '}
              <a href="/register" className="text-blue-400 hover:text-blue-300 transition">
                {tr.login.register}
              </a>
            </p>
          </div>
        </div>

        <p className="text-slate-500 text-xs text-center mt-6">
          © 2024 AILearning. Tüm hakları saklıdır.
        </p>
      </div>
      </div>
    </div>
  )
}
