import { useState, type FormEvent } from 'react'
import { Container, SectionHeading, Button, ButtonLink, Input, TextArea } from '../components/ui'
import { usePageMeta } from '../hooks/usePageMeta'

export function About() {
  usePageMeta('About — HAVENLY', 'HAVENLY was imagined as a calmer way to discover property: beautiful enough to inspire you and detailed enough to help you decide.')
  return (
    <main className="pt-20">
      <section className="bg-ink py-24 text-white sm:py-32">
        <Container>
          <p className="text-[11px] font-bold uppercase tracking-[.2em] text-white/45">About HAVENLY</p>
          <h1 className="mt-6 max-w-5xl font-display text-6xl leading-[.88] sm:text-9xl">The search for home<br /><i className="text-white/55">can feel better.</i></h1>
        </Container>
      </section>
      <section className="py-20 sm:py-32">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2">
            <SectionHeading eyebrow="01 / Our idea" title="Less noise. More confidence." />
            <div className="text-base leading-8 text-black/65">
              <p>HAVENLY was imagined as a calmer way to discover property: beautiful enough to inspire you, detailed enough to help you decide, and human enough to know when you want a conversation.</p>
              <p className="mt-6">We bring listings, trusted agents and useful tools together without making the experience feel like a spreadsheet.</p>
            </div>
          </div>
        </Container>
      </section>
    </main>
  )
}

export function Contact() {
  usePageMeta('Contact — HAVENLY', 'Questions about a listing or partnerships? Get in touch with the HAVENLY team.')
  const [sent, setSent] = useState(false)

  function submit(e: FormEvent) {
    e.preventDefault()
    setSent(true)
  }

  return (
    <main className="pt-20">
      <section className="py-24 sm:py-32">
        <Container>
          <div className="max-w-3xl">
            <p className="text-[11px] font-bold uppercase tracking-[.2em] text-moss">Get in touch</p>
            <h1 className="mt-5 font-display text-4xl leading-[1.02] tracking-[-.03em] sm:text-6xl">Let's talk about where you're going next.</h1>
            <p className="mt-6 max-w-2xl leading-7 text-black/60">Questions about a listing, joining HAVENLY, or partnerships? Send us a note.</p>
          </div>

          {sent ? (
            <div className="mt-12 max-w-2xl rounded-[28px] border border-moss/20 bg-white p-8 shadow-soft">
              <h2 className="font-display text-3xl">Message sent.</h2>
              <p className="mt-3 text-black/65">Thanks for reaching out — we usually reply within a day.</p>
              <Button type="button" variant="outline" className="mt-6" onClick={() => setSent(false)}>Send another message</Button>
            </div>
          ) : (
            <form onSubmit={submit} className="mt-12 max-w-2xl space-y-5 rounded-[28px] border border-black/10 bg-white p-6 shadow-soft sm:p-9">
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block text-sm font-semibold" htmlFor="contact-name">
                  Your name
                  <Input id="contact-name" name="name" placeholder="Amara Okafor" required autoComplete="name" className="mt-2" />
                </label>
                <label className="block text-sm font-semibold" htmlFor="contact-email">
                  Email address
                  <Input id="contact-email" name="email" type="email" placeholder="you@example.com" required autoComplete="email" className="mt-2" />
                </label>
              </div>
              <label className="block text-sm font-semibold" htmlFor="contact-message">
                How can we help?
                <TextArea id="contact-message" name="message" placeholder="Tell us a little more…" required className="mt-2 h-36" />
              </label>
              <Button type="submit">Send message</Button>
            </form>
          )}
        </Container>
      </section>
    </main>
  )
}

export function NotFound() {
  usePageMeta('Page not found — HAVENLY')
  return (
    <main className="pt-20">
      <div className="flex min-h-[70vh] items-center py-24">
        <Container>
          <p className="text-xs font-bold uppercase tracking-[.2em] text-moss">404 / Not found</p>
          <h1 className="mt-5 max-w-3xl font-display text-7xl leading-[.9] sm:text-9xl">Looks like this place doesn't exist.</h1>
          <p className="mt-5 text-black/60">The page you're after may have moved — try browsing the listings instead.</p>
          <ButtonLink to="/properties" className="mt-10">Explore properties</ButtonLink>
        </Container>
      </div>
    </main>
  )
}
