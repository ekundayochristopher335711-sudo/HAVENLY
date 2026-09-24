import { forwardRef, type ButtonHTMLAttributes, type InputHTMLAttributes, type ReactNode } from 'react'
import { Loader2 } from 'lucide-react'

export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ')
}

export function Container({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={cn('mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12', className)}>{children}</div>
}

export const Button = forwardRef<HTMLButtonElement, ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'dark' | 'light' | 'outline' | 'ghost' }>(
  function Button({ className, variant = 'dark', children, disabled, ...props }, ref) {
    const styles = {
      dark: 'bg-ink text-white hover:bg-moss',
      light: 'bg-paper text-ink hover:bg-white',
      outline: 'border border-black/15 bg-white/40 text-ink hover:bg-white',
      ghost: 'text-ink hover:bg-black/5',
    }
    return (
      <button ref={ref} disabled={disabled} className={cn('inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold transition duration-300 disabled:cursor-not-allowed disabled:opacity-50', styles[variant], className)} {...props}>
        {children}
      </button>
    )
  }
)

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(function Input({ className, ...props }, ref) {
  return <input ref={ref} className={cn('h-12 w-full rounded-2xl border border-black/10 bg-white px-4 text-sm text-ink outline-none transition placeholder:text-black/35 focus:border-moss focus:ring-4 focus:ring-moss/10', className)} {...props} />
})

export function Badge({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <span className={cn('inline-flex items-center rounded-full border border-black/10 bg-white/80 px-3 py-1 text-[11px] font-bold uppercase tracking-[.13em] text-ink backdrop-blur', className)}>{children}</span>
}

export function SectionHeading({ eyebrow, title, body, className = '' }: { eyebrow?: string; title: string; body?: string; className?: string }) {
  return (
    <div className={cn('max-w-3xl', className)}>
      {eyebrow && <p className="mb-4 text-[11px] font-bold uppercase tracking-[.2em] text-moss">{eyebrow}</p>}
      <h2 className="font-display text-4xl leading-[.98] tracking-[-.03em] text-ink sm:text-5xl lg:text-6xl">{title}</h2>
      {body && <p className="mt-6 max-w-2xl text-base leading-7 text-black/55 sm:text-lg">{body}</p>}
    </div>
  )
}

export function Spinner() {
  return <Loader2 className="animate-spin" size={18} />
}
