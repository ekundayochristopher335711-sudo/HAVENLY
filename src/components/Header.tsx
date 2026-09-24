import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, Search, X, Heart, UserRound } from 'lucide-react'
import { Container, Button, cn } from './ui'
import { useAuth } from '../contexts/AuthContext'

const links = [
  ['Discover', '/properties'],
  ['Buy', '/buy'],
  ['Rent', '/rent'],
  ['Agents', '/agents'],
]

export function Header() {
  const [open, setOpen] = useState(false)
  const { user, profile } = useAuth()

  return (
    <header className="absolute left-0 right-0 top-0 z-50">
      <Container>
        <div className="flex h-20 items-center justify-between border-b border-white/15 text-white">
          <Link to="/" className="text-lg font-black tracking-[.22em]">HAVENLY</Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {links.map(([label, href]) => (
              <NavLink key={href} to={href} className={({ isActive }) => cn('text-sm font-medium text-white/75 transition hover:text-white', isActive && 'text-white')}>
                {label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            <Link to="/favorites" className="grid size-11 place-items-center rounded-full hover:bg-white/10"><Heart size={18} /></Link>
            {user ? (
              <Link to={profile?.role === 'admin' ? '/admin' : profile?.role === 'agent' ? '/agent' : '/account'} className="grid size-11 place-items-center rounded-full hover:bg-white/10"><UserRound size={18} /></Link>
            ) : (
              <Link to="/login"><Button variant="light">Sign in</Button></Link>
            )}
            <Link to="/agent/properties/new"><Button variant="light">List a property</Button></Link>
          </div>

          <div className="flex items-center gap-1 lg:hidden">
            <Link to="/properties" className="grid size-10 place-items-center rounded-full hover:bg-white/10"><Search size={19} /></Link>
            <button onClick={() => setOpen(true)} className="grid size-10 place-items-center rounded-full hover:bg-white/10" aria-label="Open menu"><Menu size={21} /></button>
          </div>
        </div>
      </Container>

      {open && (
        <div className="fixed inset-0 bg-ink text-white lg:hidden">
          <Container className="h-full">
            <div className="flex h-20 items-center justify-between border-b border-white/10">
              <span className="text-lg font-black tracking-[.22em]">HAVENLY</span>
              <button onClick={() => setOpen(false)} className="grid size-11 place-items-center rounded-full bg-white/10" aria-label="Close menu"><X /></button>
            </div>
            <nav className="flex flex-col py-12">
              {links.map(([label, href]) => (
                <Link onClick={() => setOpen(false)} key={href} to={href} className="border-b border-white/10 py-6 font-display text-4xl">{label}</Link>
              ))}
              <Link onClick={() => setOpen(false)} to="/favorites" className="border-b border-white/10 py-6 font-display text-4xl">Saved homes</Link>
              <Link onClick={() => setOpen(false)} to={user ? '/account' : '/login'} className="border-b border-white/10 py-6 font-display text-4xl">{user ? 'Account' : 'Sign in'}</Link>
            </nav>
          </Container>
        </div>
      )}
    </header>
  )
}
