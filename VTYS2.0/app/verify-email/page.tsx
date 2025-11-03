'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { tr } from '@/lib/i18n'
import { Mail, ArrowRight, Loader2, CheckCircle } from 'lucide-react'

export default function VerifyEmailPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [verified, setVerified] = useState(false)

  const handleContinue = async () => {
    setLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    setVerified(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    router.push('/login')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-4">
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

              <div className="bg-slate-700/30 border border-slate-600/50 rounded-lg p-4 mb-6">
                <p className="text-slate-300 text-sm text-center">
                  <span className="font-semibold">{tr.verifyEmail.didntReceive}</span>
                  <br />
                  {tr.verifyEmail.didntReceiveDesc}
                </p>
              </div>

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
  )
}
