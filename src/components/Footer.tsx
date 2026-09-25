import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { Container } from './ui'

export function Footer() {
  return (
    <footer className="bg-ink text-white">
      <Container>
        <div className="grid gap-14 py-16 md:grid-cols-[1.5fr_1fr_1fr] md:py-24">
          <div>
            <div className="text-xl font-black tracking-[.22em]">HAVENLY</div>
            <h2 className="mt-7 max-w-xl font-display text-4xl leading-tight text-white sm:text-5xl">Find a place that feels like home.</h2>
            <Link to="/properties" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-white/70 hover:text-white">Explore homes <ArrowUpRight size={16} aria-hidden="true" /></Link>
          </div>
          <div>
            <p className="mb-5 text-[10px] font-bold uppercase tracking-[.2em] text-white/45">Discover</p>
            <div className="grid gap-3 text-sm text-white/70">
              <Link to="/properties">All properties</Link><Link to="/buy">Buy</Link><Link to="/rent">Rent</Link><Link to="/agents">Agents</Link><Link to="/calculator">Affordability</Link>
            </div>
          </div>
          <div>
            <p className="mb-5 text-[10px] font-bold uppercase tracking-[.2em] text-white/45">Company</p>
            <div className="grid gap-3 text-sm text-white/70">
              <Link to="/about">About HAVENLY</Link><Link to="/contact">Contact</Link><Link to="/agent/properties/new">List a property</Link><Link to="/favorites">Saved homes</Link>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-between gap-3 border-t border-white/10 py-6 text-xs text-white/45 sm:flex-row">
          <span>© {new Date().getFullYear()} HAVENLY. All rights reserved.</span>
          <span>Built around the way people live.</span>
        </div>
      </Container>
    </footer>
  )
}
