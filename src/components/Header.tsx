import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, Search, X, Heart } from 'lucide-react'
import { Container, ButtonLink } from './ui'
import { cn } from '../lib/cn'

const links: Array<[label: string, href: string]> = [
  ['Discover', '/properties'],
  ['Buy', '/buy'],
  ['Rent', '/rent'],
  ['Agents', '/agents'],
]

export function Header() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  return (
    <header className="fixed inset-x-0 top-0 z-50 text-white">
      <div className="bg-ink/90 backdrop-blur-md">
        <Container>
          <div className="flex h-20 items-center justify-between border-b border-white/10">
            <Link to="/" className="text-lg font-black tracking-[.22em]">HAVENLY</Link>

            <nav aria-label="Main navigation" className="hidden items-center gap-8 lg:flex">
              {links.map(([label, href]) => (
                <NavLink key={href} to={href} className={({ isActive }) => cn('text-sm font-medium text-white/75 transition hover:text-white', isActive && 'text-white')}>
                  {label}
                </NavLink>
              ))}
            </nav>

            <div className="hidden items-center gap-3 lg:flex">
              <Link to="/favorites" className="grid size-11 place-items-center rounded-full transition hover:bg-white/10" aria-label="Saved homes">
                <Heart size={18} aria-hidden="true" />
              </Link>
              <ButtonLink to="/agent/properties/new" variant="light">List a property</ButtonLink>
            </div>

            <div className="flex items-center gap-1 lg:hidden">
              <Link to="/properties" className="grid size-10 place-items-center rounded-full transition hover:bg-white/10" aria-label="Search properties">
                <Search size={19} aria-hidden="true" />
              </Link>
              <button type="button" onClick={() => setOpen(true)} className="grid size-10 place-items-center rounded-full transition hover:bg-white/10" aria-label="Open menu" aria-expanded={open}>
                <Menu size={21} aria-hidden="true" />
              </button>
            </div>
          </div>
        </Container>
      </div>

      {open && (
        <div className="fixed inset-0 z-[60] overflow-y-auto bg-ink text-white lg:hidden">
          <Container>
            <div className="flex h-20 items-center justify-between border-b border-white/10">
              <span className="text-lg font-black tracking-[.22em]">HAVENLY</span>
              <button type="button" onClick={() => setOpen(false)} className="grid size-11 place-items-center rounded-full bg-white/10" aria-label="Close menu">
                <X aria-hidden="true" />
              </button>
            </div>
            <nav aria-label="Mobile navigation" className="flex flex-col py-8">
              {links.map(([label, href]) => (
                <Link key={href} to={href} onClick={() => setOpen(false)} className="border-b border-white/10 py-5 font-display text-4xl">{label}</Link>
              ))}
              <Link to="/favorites" onClick={() => setOpen(false)} className="border-b border-white/10 py-5 font-display text-4xl">Saved homes</Link>
              <div className="py-8">
                <ButtonLink to="/agent/properties/new" variant="light" className="w-full" onClick={() => setOpen(false)}>List a property</ButtonLink>
              </div>
            </nav>
          </Container>
        </div>
      )}
    </header>
  )
}
