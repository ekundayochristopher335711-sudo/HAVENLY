import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { Button, Input } from '../components/ui'
import { useAuth } from '../contexts/AuthContext'
import { isSupabaseConfigured } from '../lib/supabase'

export function Auth({ mode = 'login' }: { mode?: 'login' | 'register' }) {
  const navigate = useNavigate()
  const location = useLocation()
  const { signIn, signUp } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setBusy(true); setError('')
    const result = mode === 'login' ? await signIn(email, password) : await signUp(email, password, name)
    setBusy(false)
    if (result.error) setError(result.error.message)
    else navigate((location.state as { from?: string } | null)?.from ?? '/account')
  }

  return <main className="grid min-h-screen bg-paper lg:grid-cols-2"><div className="relative hidden overflow-hidden bg-ink lg:block"><img src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=90" className="h-full w-full object-cover opacity-70" alt="" /><div className="absolute inset-0 bg-gradient-to-t from-ink to-transparent" /><div className="absolute bottom-12 left-12 right-12 text-white"><p className="text-xs font-bold uppercase tracking-[.2em] text-white/50">HAVENLY</p><p className="mt-5 max-w-lg font-display text-5xl leading-none">A better way to find where you belong.</p></div></div><div className="flex items-center justify-center p-6 sm:p-10"><div className="w-full max-w-md"><Link to="/" className="mb-16 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.15em] text-black/45"><ArrowLeft size={14} /> Back home</Link><p className="text-[11px] font-bold uppercase tracking-[.2em] text-moss">Welcome to HAVENLY</p><h1 className="mt-4 font-display text-5xl">{mode === 'login' ? 'Welcome back.' : 'Create your account.'}</h1>{!isSupabaseConfigured && <div className="mt-5 rounded-2xl bg-clay/10 p-4 text-sm leading-6 text-clay">Supabase is not configured yet. Add the values in <code>.env</code> to activate real authentication.</div>}<form onSubmit={submit} className="mt-9 space-y-4">{mode === 'register' && <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" required />}{error && <div className="rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</div>}<Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email address" required /><Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" minLength={6} required /><Button disabled={busy} className="w-full">{busy ? 'Please wait…' : mode === 'login' ? 'Sign in' : 'Create account'}</Button></form><p className="mt-7 text-center text-sm text-black/45">{mode === 'login' ? <>New to HAVENLY? <Link className="font-semibold text-ink" to="/register">Create an account</Link></> : <>Already have an account? <Link className="font-semibold text-ink" to="/login">Sign in</Link></>}</p></div></div></main>
}
