import { Outlet, useLocation } from 'react-router-dom'
import { Header } from './Header'
import { Footer } from './Footer'

export function Layout() {
  const location = useLocation()
  const isDarkHeaderPage = location.pathname === '/' || location.pathname.startsWith('/about')

  return (
    <div className="min-h-screen bg-paper text-ink">
      <div className={isDarkHeaderPage ? 'bg-ink' : 'bg-ink'}>
        <Header />
      </div>
      <Outlet />
      <Footer />
    </div>
  )
}
