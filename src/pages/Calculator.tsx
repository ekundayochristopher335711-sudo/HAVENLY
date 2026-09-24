import { useMemo, useState } from 'react'
import { Calculator as CalculatorIcon } from 'lucide-react'
import { Container, SectionHeading, Input, Badge } from '../components/ui'
import { formatPrice } from '../lib/format'

export function Calculator() {
  const [price, setPrice] = useState(100000000)
  const [down, setDown] = useState(20000000)
  const [rate, setRate] = useState(18)
  const [years, setYears] = useState(15)

  const result = useMemo(() => {
    const principal = Math.max(price - down, 0)
    const monthlyRate = rate / 100 / 12
    const months = years * 12
    const payment = monthlyRate === 0 ? principal / months : principal * monthlyRate * Math.pow(1 + monthlyRate, months) / (Math.pow(1 + monthlyRate, months) - 1)
    return { principal, payment, total: payment * months, interest: payment * months - principal }
  }, [price, down, rate, years])

  return <main className="pt-20"><section className="bg-ink py-24 text-white"><Container><Badge className="border-white/10 bg-white/10 text-white">Affordability tool</Badge><h1 className="mt-6 max-w-4xl font-display text-6xl leading-[.9] sm:text-8xl">Make the numbers<br /><i className="text-white/55">feel clearer.</i></h1><p className="mt-7 max-w-xl text-white/55">Explore an estimated monthly payment before you take the next step.</p></Container></section><section className="py-20"><Container><div className="grid gap-12 lg:grid-cols-[1fr_420px]"><div><SectionHeading eyebrow="01 / Estimate" title="Your home, on paper." body="Adjust the inputs to see an indicative mortgage payment. This is an estimate, not financial advice." /><div className="mt-10 grid gap-5 sm:grid-cols-2"><label className="text-sm font-semibold">Property price<Input type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} className="mt-2" /></label><label className="text-sm font-semibold">Down payment<Input type="number" value={down} onChange={(e) => setDown(Number(e.target.value))} className="mt-2" /></label><label className="text-sm font-semibold">Interest rate (%)<Input type="number" step=".1" value={rate} onChange={(e) => setRate(Number(e.target.value))} className="mt-2" /></label><label className="text-sm font-semibold">Loan term (years)<Input type="number" value={years} onChange={(e) => setYears(Number(e.target.value))} className="mt-2" /></label></div></div><div className="rounded-[30px] bg-moss p-7 text-white sm:p-9"><CalculatorIcon size={24} /><p className="mt-10 text-xs uppercase tracking-[.17em] text-white/45">Estimated monthly</p><p className="mt-2 font-display text-5xl sm:text-6xl">{formatPrice(Math.round(result.payment))}</p><div className="mt-10 space-y-4 border-t border-white/10 pt-6 text-sm"><div className="flex justify-between"><span className="text-white/45">Loan amount</span><span>{formatPrice(result.principal)}</span></div><div className="flex justify-between"><span className="text-white/45">Estimated interest</span><span>{formatPrice(Math.round(result.interest))}</span></div><div className="flex justify-between"><span className="text-white/45">Total payments</span><span>{formatPrice(Math.round(result.total))}</span></div></div></div></div></Container></section></main>
}
