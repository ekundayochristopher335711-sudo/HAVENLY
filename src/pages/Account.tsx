import { Link, useNavigate } from 'react-router-dom'
import { ArrowUpRight, Heart, LogOut, UserRound } from 'lucide-react'
import { Container, Button, SectionHeading } from '../components/ui'
import { useAuth } from '../contexts/AuthContext'
import { demoProperties } from '../data/demo'
import { PropertyCard } from '../components/PropertyCard'
import { useFavorites } from '../hooks/useFavorites'

export function Account() {
  const { user, profile, signOut } = useAuth()
  const navigate = useNavigate()
  const { favorites } = useFavorites()
  const saved = demoProperties.filter((p) => favorites.includes(p.id))

  if (!user) return <main className="pt-32 pb-24"><Container><SectionHeading title="Your account is waiting." body="Sign in to save homes and manage your property journey." /><Link to="/login"><Button className="mt-8">Sign in</Button></Link></Container></main>

  return <main className="pt-20"><section className="bg-ink py-20 text-white"><Container><p className="text-xs uppercase tracking-[.18em] text-white/40">Account</p><div className="mt-4 flex flex-col justify-between gap-6 sm:flex-row sm:items-end"><div><h1 className="font-display text-6xl">{profile?.full_name || user.email?.split('@')[0]}</h1><p className="mt-3 text-white/45">{user.email}</p></div><Button variant="light" onClick={() => { void signOut(); navigate('/') }}><LogOut size={16} /> Sign out</Button></div></Container></section><section className="py-16"><Container><div className="grid gap-6 sm:grid-cols-3"><div className="rounded-[24px] bg-white p-6 shadow-soft"><Heart className="text-clay" /><p className="mt-8 text-4xl font-bold">{saved.length}</p><p className="mt-1 text-sm text-black/45">Saved homes</p></div><div className="rounded-[24px] bg-white p-6 shadow-soft"><UserRound className="text-moss" /><p className="mt-8 text-4xl font-bold">—</p><p className="mt-1 text-sm text-black/45">Inquiries</p></div><Link to="/properties" className="group rounded-[24px] bg-moss p-6 text-white"><ArrowUpRight className="transition group-hover:translate-x-1 group-hover:-translate-y-1" /><p className="mt-8 font-display text-3xl">Continue exploring.</p></Link></div>{saved.length > 0 && <div className="mt-20"><SectionHeading eyebrow="Saved homes" title="Places you've kept." /><div className="mt-10 grid gap-7 md:grid-cols-3">{saved.map((p) => <PropertyCard key={p.id} property={p} />)}</div></div>}</Container></section></main>
}
