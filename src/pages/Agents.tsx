import { ArrowUpRight, CheckCircle2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Container, SectionHeading, Badge } from '../components/ui'
import { demoAgents } from '../data/demo'
import { demoProperties } from '../data/demo'

export function Agents() {
  return (
    <main className="pt-20">
      <section className="bg-ink py-24 text-white sm:py-32"><Container><p className="text-[11px] font-bold uppercase tracking-[.2em] text-white/40">The people behind the homes</p><h1 className="mt-6 max-w-4xl font-display text-6xl leading-[.9] tracking-[-.04em] sm:text-8xl">Meet the people<br /><i className="text-white/60">who know the place.</i></h1></Container></section>
      <section className="py-20 sm:py-28"><Container><SectionHeading eyebrow="01 / Our network" title="Local knowledge, human conversations." body="Connect with agents who know their neighbourhoods and the details that don't fit neatly into a listing card." /><div className="mt-14 grid gap-7 md:grid-cols-2">{demoAgents.map((agent) => <Link to={`/agents/${agent.id}`} key={agent.id} className="group rounded-[28px] border border-black/10 bg-white p-4 transition hover:-translate-y-1 hover:shadow-soft sm:p-5"><div className="aspect-[1.4] overflow-hidden rounded-[22px]"><img src={agent.avatar} className="h-full w-full object-cover grayscale transition duration-700 group-hover:scale-105 group-hover:grayscale-0" alt={agent.name} /></div><div className="flex items-start justify-between px-1 pb-2 pt-5"><div><div className="flex items-center gap-2"><h2 className="text-xl font-semibold">{agent.name}</h2>{agent.verified && <CheckCircle2 size={16} className="text-moss" />}</div><p className="mt-1 text-sm text-black/45">{agent.company} · {agent.location}</p></div><span className="grid size-10 place-items-center rounded-full bg-paper transition group-hover:rotate-45"><ArrowUpRight size={17} /></span></div></Link>)}</div></Container></section>
      <section className="bg-[#e9e7de] py-20"><Container><div className="grid gap-8 md:grid-cols-3">{demoAgents.map((agent) => <div key={agent.id} className="rounded-[24px] bg-white p-6"><Badge>{agent.listings} listings</Badge><h3 className="mt-8 font-display text-3xl">{agent.name}</h3><p className="mt-3 text-sm leading-6 text-black/50">{agent.bio}</p><div className="mt-7 text-xs font-semibold text-moss">{agent.experience}+ years experience</div></div>)}</div></Container></section>
    </main>
  )
}

export function AgentProfile() {
  const id = location.pathname.split('/').pop()
  const agent = demoAgents.find((a) => a.id === id) ?? demoAgents[0]
  const listings = demoProperties.filter((p) => p.agent?.id === agent.id)
  return <main className="pt-20"><section className="bg-ink py-20 text-white sm:py-28"><Container><div className="grid items-center gap-10 md:grid-cols-[220px_1fr]"><img src={agent.avatar} className="size-52 rounded-[28px] object-cover" alt={agent.name} /><div><div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[.15em] text-white/45">{agent.company}{agent.verified && <CheckCircle2 size={15} />}</div><h1 className="mt-4 font-display text-6xl tracking-[-.04em] sm:text-8xl">{agent.name}</h1><p className="mt-5 max-w-xl text-white/55">{agent.bio}</p></div></div></Container></section><section className="py-20"><Container><SectionHeading eyebrow="Listings" title="Homes represented." /><div className="mt-12 grid gap-7 md:grid-cols-3">{listings.map((p) => <PropertyCard key={p.id} property={p} />)}</div></Container></section></main>
}
