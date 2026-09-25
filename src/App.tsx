import { Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { Spinner } from './components/ui'

const Home = lazy(() => import('./pages/Home').then((m) => ({ default: m.Home })))
const Properties = lazy(() => import('./pages/Properties').then((m) => ({ default: m.Properties })))
const PropertyDetail = lazy(() => import('./pages/PropertyDetail').then((m) => ({ default: m.PropertyDetail })))
const Agents = lazy(() => import('./pages/Agents').then((m) => ({ default: m.Agents })))
const AgentProfile = lazy(() => import('./pages/Agents').then((m) => ({ default: m.AgentProfile })))
const Calculator = lazy(() => import('./pages/Calculator').then((m) => ({ default: m.Calculator })))
const Saved = lazy(() => import('./pages/Saved').then((m) => ({ default: m.Saved })))
const About = lazy(() => import('./pages/Static').then((m) => ({ default: m.About })))
const Contact = lazy(() => import('./pages/Static').then((m) => ({ default: m.Contact })))
const NotFound = lazy(() => import('./pages/Static').then((m) => ({ default: m.NotFound })))
const AgentDashboard = lazy(() => import('./pages/AgentDashboard').then((m) => ({ default: m.AgentDashboard })))
const AddProperty = lazy(() => import('./pages/AgentDashboard').then((m) => ({ default: m.AddProperty })))

export function App() {
  return (
    <Suspense
      fallback={
        <div className="grid min-h-screen place-items-center bg-paper">
          <Spinner size={26} className="text-moss" />
        </div>
      }
    >
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
          <Route path="/favorites" element={<Saved />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/agent" element={<AgentDashboard />} />
          <Route path="/agent/properties/new" element={<AddProperty />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  )
}
