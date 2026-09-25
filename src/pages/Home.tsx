import { ArrowRight, ArrowUpRight, Compass, KeyRound, Sparkles, type LucideIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Container, SectionHeading, ButtonLink } from '../components/ui'
import { SearchPanel } from '../components/SearchPanel'
import { PropertyCard } from '../components/PropertyCard'
import { demoProperties } from '../data/demo'
import { usePageMeta } from '../hooks/usePageMeta'
import type { PropertyType } from '../types'

const categories: Array<{ name: string; type: PropertyType; image: string }> = [
  { name: 'Apartments', type: 'apartment', image: 'https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=900&q=85' },
  { name: 'Villas', type: 'villa', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=85' },
  { name: 'Penthouses', type: 'penthouse', image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=900&q=85' },
]

const features: Array<{ Icon: LucideIcon; title: string; text: string }> = [
  { Icon: Compass, title: 'Curated', text: 'A focused collection instead of endless scrolling.' },
  { Icon: KeyRound, title: 'Clear', text: 'The details you need, presented without clutter.' },
  { Icon: Sparkles, title: 'Human', text: 'Real agents when you want a conversation.' },
]

export function Home() {
  usePageMeta('HAVENLY — Find a place that feels like home.', 'Discover curated homes, apartments and residences for sale and rent across Nigeria.')
  return (
    <>
      <section className="relative min-h-[760px] overflow-hidden bg-ink text-white sm:min-h-[850px]">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=2200&q=90" className="h-full w-full object-cover opacity-65" alt="Contemporary home interior" fetchPriority="high" decoding="async" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/65 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/30" />
        </div>
        <Container className="relative flex min-h-[760px] items-end pb-14 pt-32 sm:min-h-[850px] sm:pb-20 sm:pt-40 lg:items-center lg:pb-0">
          <div className="max-w-3xl">
            <p className="mb-7 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[.24em] text-white/60"><Sparkles size={14} aria-hidden="true" /> Curated property discovery</p>
            <h1 className="font-display text-[3.4rem] leading-[.86] tracking-[-.055em] text-white/95 sm:text-[6rem] lg:text-[9.5rem]">Find a place that feels like home.</h1>
            <p className="mt-8 max-w-xl text-base leading-7 text-white/75 sm:text-lg">Thoughtfully selected homes, apartments and spaces for the way you actually live.</p>
            <div className="mt-9 max-w-4xl text-ink"><SearchPanel /></div>
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container>
          <div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-end">
            <SectionHeading eyebrow="01 / Featured homes" title="Spaces with a story worth coming home to." body="A considered collection of residences selected for architecture, atmosphere and everyday livability." />
            <Link to="/properties" className="inline-flex shrink-0 items-center gap-2 text-sm font-bold">View all properties <ArrowRight size={17} /></Link>
          </div>
          <div className="mt-12 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
            {demoProperties.slice(0, 3).map((property) => <PropertyCard key={property.id} property={property} />)}
          </div>
        </Container>
      </section>

      <section className="bg-[#e9e7de] py-20 sm:py-28">
        <Container>
          <div className="grid items-end gap-12 lg:grid-cols-[.8fr_1.2fr]">
            <SectionHeading eyebrow="02 / Browse by feeling" title="Start with the kind of space you're drawn to." />
            <div className="grid gap-4 sm:grid-cols-3">
              {categories.map((category, index) => (
                <Link to={`/properties?type=${category.type}`} key={category.name} className="group relative aspect-[.82] overflow-hidden rounded-[28px]">
                  <img src={category.image} alt={category.name} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" loading="lazy" decoding="async" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" aria-hidden="true" />
                  <div className="absolute bottom-5 left-5 text-white">
                    <span className="text-xs text-white/70">0{index + 1}</span>
                    <h3 className="mt-1 font-display text-2xl">{category.name}</h3>
                    <p className="mt-1 text-xs text-white/70">View homes</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[.85fr_1.15fr]">
            <div className="relative min-h-[520px] overflow-hidden rounded-[28px]">
              <img src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=88" className="h-full w-full object-cover" alt="Warm modern living room" loading="lazy" decoding="async" />
              <div className="absolute bottom-5 left-5 rounded-2xl bg-white/90 p-4 backdrop-blur">
                <p className="text-[10px] font-bold uppercase tracking-[.16em] text-black/40">The HAVENLY approach</p>
                <p className="mt-1 text-sm font-semibold">Less noise. Better homes.</p>
              </div>
            </div>
            <div className="flex flex-col justify-center">
              <SectionHeading eyebrow="03 / Why HAVENLY" title="Property search, without the noise." body="We bring discovery, trusted listings and human guidance together in one calm experience." />
              <div className="mt-10 grid gap-7 sm:grid-cols-3">
                {features.map(({ Icon, title, text }) => (
                  <div key={title}>
                    <Icon size={22} className="text-moss" aria-hidden="true" />
                    <h3 className="mt-4 font-semibold">{title}</h3>
                    <p className="mt-2 text-sm leading-6 text-black/60">{text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-moss py-20 text-white sm:py-28">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[.2em] text-white/45">04 / For agents</p>
              <h2 className="mt-5 max-w-3xl font-display text-5xl leading-[.95] tracking-[-.035em] sm:text-7xl">Your listings deserve a better stage.</h2>
            </div>
            <ButtonLink to="/agent/properties/new" variant="light">List your property <ArrowUpRight size={17} aria-hidden="true" /></ButtonLink>
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container>
          <SectionHeading eyebrow="05 / Latest" title="Just added." />
          <div className="mt-12 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
            {demoProperties.slice(3).map((property) => <PropertyCard key={property.id} property={property} />)}
          </div>
        </Container>
      </section>
    </>
  )
}
