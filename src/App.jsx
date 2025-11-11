import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Catalog from './components/Catalog'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-emerald-50">
      <Navbar />
      <Hero />
      <Catalog />
    </div>
  )
}

export default App