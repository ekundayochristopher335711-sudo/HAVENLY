import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { Plus, ArrowUpRight, Home, MessageCircle, Eye, type LucideIcon } from 'lucide-react'
import { Container, Button, ButtonLink } from '../components/ui'
import { demoProperties } from '../data/demo'
import { imgAt } from '../lib/image'
import { usePageMeta } from '../hooks/usePageMeta'

const stats: Array<{ value: string; label: string; Icon: LucideIcon }> = [
  { value: '12', label: 'Active listings', Icon: Home },
  { value: '38', label: 'New inquiries', Icon: MessageCircle },
  { value: '2.4k', label: 'Property views', Icon: Eye },
]

export function AgentDashboard() {
  usePageMeta('Agent workspace — HAVENLY', 'Manage your listings and see how your properties are performing.')
  return (
    <main className="pt-20">
      <Container>
        <div className="flex flex-col justify-between gap-5 border-b border-black/10 py-10 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[.18em] text-moss">Agent workspace</p>
            <h1 className="mt-3 font-display text-5xl sm:text-6xl">Good morning, Amara.</h1>
          </div>
          <ButtonLink to="/agent/properties/new"><Plus size={17} aria-hidden="true" /> Add property</ButtonLink>
        </div>

        <div className="grid gap-4 py-8 sm:grid-cols-3">
          {stats.map(({ value, label, Icon }) => (
            <div key={label} className="rounded-[28px] bg-white p-6 shadow-soft">
              <Icon size={19} className="text-moss" aria-hidden="true" />
              <p className="mt-8 text-4xl font-bold">{value}</p>
              <p className="mt-1 text-sm text-black/55">{label}</p>
            </div>
          ))}
        </div>

        <section className="py-8">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Recent listings</h2>
            <Link to="/agent" className="text-sm font-semibold underline-offset-4 hover:underline">View all</Link>
          </div>
          <div className="mt-5 overflow-hidden rounded-[28px] border border-black/10 bg-white">
            {demoProperties.slice(0, 4).map((property) => (
              <div key={property.id} className="flex items-center gap-4 border-b border-black/5 p-4 last:border-0">
                <img src={imgAt(property.image, 160)} className="size-16 rounded-xl object-cover" alt="" loading="lazy" />
                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold">{property.title}</p>
                  <p className="text-xs text-black/55">{property.city} · {property.listing_type === 'sale' ? 'For sale' : 'For rent'}</p>
                </div>
                <span className="hidden rounded-full bg-moss/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-moss sm:block">Published</span>
                <ArrowUpRight size={17} aria-hidden="true" />
              </div>
            ))}
          </div>
        </section>
      </Container>
    </main>
  )
}

export function AddProperty() {
  usePageMeta('Add a property — HAVENLY', 'Create a new listing draft for your agency on HAVENLY.')
  const [submitted, setSubmitted] = useState(false)

  function submit(e: FormEvent) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <main className="pt-20">
      <Container>
        <div className="max-w-3xl py-12">
          <p className="text-xs font-bold uppercase tracking-[.18em] text-moss">Agent workspace</p>
          <h1 className="mt-3 font-display text-5xl sm:text-6xl">Add a property.</h1>
          <p className="mt-4 text-black/60">Create a listing draft. Drafts stay private until they are published.</p>

          {submitted ? (
            <div className="mt-10 rounded-[28px] border border-moss/20 bg-white p-6 shadow-soft sm:p-9">
              <h2 className="font-display text-3xl">Draft saved.</h2>
              <p className="mt-3 text-black/65">Your listing has been added as a draft — this demo keeps it in the current session only.</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button type="button" onClick={() => setSubmitted(false)}>Add another property</Button>
                <ButtonLink to="/agent" variant="outline">Back to workspace</ButtonLink>
              </div>
            </div>
          ) : (
            <form onSubmit={submit} className="mt-10 space-y-7 rounded-[28px] border border-black/10 bg-white p-6 shadow-soft sm:p-9">
              <Field label="Property title" name="title" placeholder="e.g. The Palm Court Residence" required />
              <Field label="Description" name="description" placeholder="Tell people what makes this home special." textarea required />
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Price (₦)" name="price" placeholder="185000000" type="number" required />
                <Field label="Bedrooms" name="bedrooms" placeholder="4" type="number" required />
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="City" name="city" placeholder="Lagos" required />
                <Field label="Property type" name="type" placeholder="Villa" required />
              </div>
              <div>
                <span className="text-sm font-semibold">Images</span>
                <label htmlFor="listing-images" className="mt-2 block cursor-pointer rounded-2xl border-2 border-dashed border-black/15 p-10 text-center text-sm text-black/55 transition hover:border-moss hover:text-ink">
                  Click to choose listing photos
                  <input id="listing-images" name="images" type="file" accept="image/*" multiple className="sr-only" />
                </label>
              </div>
              <Button type="submit">Save listing draft</Button>
            </form>
          )}
        </div>
      </Container>
    </main>
  )
}

function Field({ label, name, placeholder, type = 'text', textarea = false, required = false }: {
  label: string
  name: string
  placeholder: string
  type?: string
  textarea?: boolean
  required?: boolean
}) {
  const id = `field-${name}`
  return (
    <label htmlFor={id} className="block text-sm font-semibold">
      {label}
      {textarea ? (
        <textarea id={id} name={name} placeholder={placeholder} required={required} className="mt-2 h-32 w-full rounded-2xl border border-black/10 p-4 font-normal outline-none transition focus:border-moss focus:ring-4 focus:ring-moss/10" />
      ) : (
        <input id={id} name={name} type={type} placeholder={placeholder} required={required} className="mt-2 h-12 w-full rounded-2xl border border-black/10 px-4 font-normal outline-none transition focus:border-moss focus:ring-4 focus:ring-moss/10" />
      )}
    </label>
  )
}