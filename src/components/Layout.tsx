import { Outlet } from 'react-router-dom'
import { Header } from './Header'
import { Footer } from './Footer'

export function Layout() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}
