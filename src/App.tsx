import { Route, Routes } from 'react-router-dom'
import type { ReactNode } from 'react'
import { Layout } from './components/Layout'
import { Home } from './pages/Home'
import { Properties } from './pages/Properties'
import { PropertyDetail } from './pages/PropertyDetail'
import { Agents, AgentProfile } from './pages/Agents'
import { Calculator } from './pages/Calculator'
import { Auth } from './pages/Auth'
import { Account } from './pages/Account'
import { About, Contact, NotFound } from './pages/Static'
import { AgentDashboard, AddProperty } from './pages/AgentDashboard'
import { AdminDashboard } from './pages/AdminDashboard'

function Protected({ children }: { children: ReactNode }) {
  return children
}

export function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/properties" element={<Properties />} />
        <Route path="/buy" element={<Properties forcedListing="sale" />} />
        <Route path="/rent" element={<Properties forcedListing="rent" />} />
        <Route path="/properties/:slug" element={<PropertyDetail />} />
        <Route path="/agents" element={<Agents />} />
        <Route path="/agents/:id" element={<AgentProfile />} />
        <Route path="/calculator" element={<Calculator />} />
        <Route path="/favorites" element={<Account />} />
        <Route path="/account" element={<Protected><Account /></Protected>} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/agent" element={<AgentDashboard />} />
        <Route path="/agent/properties/new" element={<AddProperty />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="*" element={<NotFound />} />
      </Route>
      <Route path="/login" element={<Auth mode="login" />} />
      <Route path="/register" element={<Auth mode="register" />} />
    </Routes>
  )
}
