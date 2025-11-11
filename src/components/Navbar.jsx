import { Link, useLocation } from 'react-router-dom'
import { Mountain, Home, ShoppingCart, MessageSquare, User } from 'lucide-react'

const NavItem = ({ to, icon: Icon, label }) => {
  const location = useLocation()
  const active = location.pathname === to
  return (
    <Link
      to={to}
      className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${
        active ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-blue-50'
      }`}
    >
      <Icon size={18} />
      <span className="hidden sm:inline">{label}</span>
    </Link>
  )
}

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-white/70 border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-semibold text-gray-800">
          <Mountain className="text-blue-600" />
          <span>AltoRent</span>
        </Link>
        <nav className="flex items-center gap-2">
          <NavItem to="/" icon={Home} label="Home" />
          <NavItem to="/transactions" icon={ShoppingCart} label="Transaksi" />
          <NavItem to="/messages" icon={MessageSquare} label="Pesan" />
          <NavItem to="/profile" icon={User} label="Profil" />
        </nav>
      </div>
    </header>
  )
}
