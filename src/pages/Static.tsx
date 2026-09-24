import { Container, SectionHeading, Button } from '../components/ui'
import { Link } from 'react-router-dom'

export function About() {
  return <main className="pt-20"><section className="bg-ink py-24 text-white sm:py-32"><Container><p className="text-[11px] font-bold uppercase tracking-[.2em] text-white/40">About HAVENLY</p><h1 className="mt-6 max-w-5xl font-display text-6xl leading-[.88] sm:text-9xl">The search for home<br /><i className="text-white/50">can feel better.</i></h1></Container></section><section className="py-20 sm:py-32"><Container><div className="grid gap-12 lg:grid-cols-2"><SectionHeading eyebrow="01 / Our idea" title="Less noise. More confidence." /><div className="text-base leading-8 text-black/55"><p>HAVENLY was imagined as a calmer way to discover property: beautiful enough to inspire you, detailed enough to help you decide, and human enough to know when you want a conversation.</p><p className="mt-6">We bring listings, trusted agents and useful tools together without making the experience feel like a spreadsheet.</p></div></div></Container></section></main>
}

export function Contact() {
  return <main className="pt-20"><section className="py-24 sm:py-32"><Container><SectionHeading eyebrow="Get in touch" title="Let's talk about where you're going next." body="Questions about a listing, joining HAVENLY, or partnerships? Send us a note." /><form className="mt-12 max-w-2xl space-y-4"><input className="h-14 w-full rounded-2xl border border-black/10 bg-white px-4" placeholder="Your name" /><input className="h-14 w-full rounded-2xl border border-black/10 bg-white px-4" placeholder="Email address" type="email" /><textarea className="h-36 w-full rounded-2xl border border-black/10 bg-white p-4" placeholder="How can we help?" /><Button type="button">Send message</Button></form></Container></section></main>
}

export function NotFound() {
  return <main className="flex min-h-[70vh] items-center py-24"><Container><p className="text-xs font-bold uppercase tracking-[.2em] text-moss">404 / Not found</p><h1 className="mt-5 max-w-3xl font-display text-7xl leading-[.9] sm:text-9xl">Looks like this place doesn't exist.</h1><Link to="/properties"><Button className="mt-10">Explore properties</Button></Link></Container></main>
}
