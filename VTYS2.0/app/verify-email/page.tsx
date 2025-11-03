'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { onAuthStateChanged, reload, sendEmailVerification } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import { tr } from '@/lib/i18n'
import { Mail, ArrowRight, Loader2, CheckCircle } from 'lucide-react'
import Navbar from '@/app/components/Navbar'

export default function VerifyEmailPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [verified, setVerified] = useState(false)
  const [resendLoading, setResendLoading] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.push('/register')
        return
      }

      await reload(user)
      if (user.emailVerified) {
        setVerified(true)
        setTimeout(() => router.push('/login'), 2000)
      }
    })

    return () => unsubscribe()
  }, [router])

  const handleContinue = async () => {
    setLoading(true)
    try {
      const user = auth.currentUser
      if (user) {
        await reload(user)
        if (user.emailVerified) {
          setVerified(true)
          setTimeout(() => router.push('/login'), 2000)
        }
      }
    } finally {
      setLoading(false)
    }
  }

  const handleResendEmail = async () => {
    setResendLoading(true)
    setMessage('')
    try {
      const user = auth.currentUser
      if (user) {
        await sendEmailVerification(user)
        setMessage('Doğrulama e-postası yeniden gönderildi')
      }
    } catch (err: any) {
      setMessage('E-posta gönderilemedi. Lütfen tekrar deneyin.')
    } finally {
      setResendLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Navbar />
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] px-4">
      <div className="w-full max-w-md">
        <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-8 shadow-2xl">
          {!verified ? (
            <>
              <div className="mb-8 flex justify-center">
                <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center">
                  <Mail className="w-8 h-8 text-blue-400" />
                </div>
              </div>

              <h1 className="text-3xl font-bold text-white mb-2 text-center">
                {tr.verifyEmail.title}
              </h1>
              <p className="text-slate-400 text-center mb-2">
                {tr.verifyEmail.subtitle}
              </p>
              <p className="text-slate-500 text-sm text-center mb-8">
                {tr.verifyEmail.description}
              </p>

              {message && (
                <div className={`mb-6 p-4 rounded-lg border text-sm text-center ${
                  message.includes('yeniden gönderildi')
                    ? 'bg-green-500/10 border-green-500/30 text-green-400'
                    : 'bg-red-500/10 border-red-500/30 text-red-400'
                }`}>
                  {message}
                </div>
              )}

              <div className="bg-slate-700/30 border border-slate-600/50 rounded-lg p-4 mb-6">
                <p className="text-slate-300 text-sm text-center">
                  <span className="font-semibold">{tr.verifyEmail.didntReceive}</span>
                  <br />
                  {tr.verifyEmail.didntReceiveDesc}
                </p>
              </div>

              <button
                onClick={handleResendEmail}
                disabled={resendLoading}
                className="w-full mb-3 bg-slate-700 hover:bg-slate-600 disabled:bg-slate-700/50 disabled:cursor-not-allowed text-white font-semibold py-2 rounded-lg transition duration-200 text-sm"
              >
                {resendLoading ? 'Gönderiliyor...' : 'E-postayı Yeniden Gönder'}
              </button>

              <button
                onClick={handleContinue}
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition duration-200 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    {tr.verifyEmail.verifyingEmail}
                  </>
                ) : (
                  <>
                    {tr.verifyEmail.iVerified}
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>

              <div className="mt-6 pt-6 border-t border-slate-700">
                <p className="text-slate-400 text-center text-sm">
                  {tr.verifyEmail.alreadyVerified}{' '}
                  <button
                    onClick={() => router.push('/login')}
                    className="text-blue-400 hover:text-blue-300 transition"
                  >
                    Giriş Yap
                  </button>
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="mb-8 flex justify-center">
                <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center animate-in">
                  <CheckCircle className="w-8 h-8 text-green-400" />
                </div>
              </div>

              <h1 className="text-3xl font-bold text-white mb-2 text-center">
                {tr.verifyEmail.verified}
              </h1>
              <p className="text-slate-400 text-center">
                {tr.verifyEmail.redirecting}
              </p>

              <div className="mt-8 flex justify-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              </div>
            </>
          )}

          <p className="text-slate-500 text-xs text-center mt-6">
            © 2024 AILearning. Tüm hakları saklıdır.
          </p>
        </div>
      </div>
      </div>
    </div>
  )
}
