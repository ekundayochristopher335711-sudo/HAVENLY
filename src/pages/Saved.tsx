import { Link } from 'react-router-dom'
import { Heart } from 'lucide-react'
import { Container } from '../components/ui'
import { PropertyCard } from '../components/PropertyCard'
import { demoProperties } from '../data/demo'
import { useFavorites } from '../hooks/useFavorites'
import { usePageMeta } from '../hooks/usePageMeta'

export function Saved() {
  usePageMeta('Saved homes — HAVENLY', 'Homes you have saved on HAVENLY. Tap the heart on any property to keep it here.')
  const { favorites } = useFavorites()
  const saved = demoProperties.filter((property) => favorites.includes(property.id))

  return (
    <main className="pt-20">
      <section className="bg-ink py-14 text-white sm:py-20">
        <Container>
          <p className="text-[11px] font-bold uppercase tracking-[.2em] text-white/45">Saved homes</p>
          <div className="mt-5 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <h1 className="font-display text-5xl leading-[.95] tracking-[-.035em] sm:text-7xl">Places you've kept.</h1>
            <span className="inline-flex items-center self-start rounded-full border border-white/15 bg-white/10 px-4 py-2 text-[11px] font-bold uppercase tracking-[.13em] sm:self-auto">
              {saved.length} saved
            </span>
          </div>
        </Container>
      </section>

      <section className="py-14 sm:py-20">
        <Container>
          {saved.length > 0 ? (
            <div className="grid gap-7 sm:grid-cols-2 xl:grid-cols-3">
              {saved.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          ) : (
            <div className="mx-auto max-w-md py-12 text-center">
              <span className="mx-auto grid size-14 place-items-center rounded-full bg-clay/10 text-clay">
                <Heart size={22} aria-hidden="true" />
              </span>
              <h2 className="mt-6 font-display text-3xl sm:text-4xl">No saved homes yet.</h2>
              <p className="mt-3 leading-7 text-black/55">Tap the heart on any property and it will wait for you here.</p>
              <Link
                to="/properties"
                className="mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-ink px-6 text-sm font-semibold text-white transition duration-300 hover:bg-moss"
              >
                Explore properties
              </Link>
            </div>
          )}
        </Container>
      </section>
    </main>
  )
}