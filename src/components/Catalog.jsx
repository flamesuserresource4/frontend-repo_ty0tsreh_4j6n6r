import { useEffect, useState, useMemo } from 'react'

const categories = [
  { key: 'tenda', label: 'Tenda' },
  { key: 'tracking pole', label: 'Tracking Pole' },
  { key: 'sleeping bag', label: 'Sleeping Bag' },
  { key: 'kompor', label: 'Kompor Portabel' },
  { key: 'carrier', label: 'Carrier' },
]

function CategoryTabs({ active, onChange }) {
  return (
    <div className="flex gap-2 flex-wrap">
      {categories.map((c) => (
        <button
          key={c.key}
          onClick={() => onChange(c.key)}
          className={`px-4 py-2 rounded-full border transition-all ${
            active === c.key ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 hover:border-blue-300'
          }`}
        >
          {c.label}
        </button>
      ))}
    </div>
  )
}

function GearCard({ gear, onAdd }) {
  return (
    <div className="group bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-all">
      <div className="aspect-[4/3] overflow-hidden">
        <img src={gear.image_url || 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop'} alt={gear.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-gray-900">{gear.title}</h3>
          <span className="text-blue-600 font-semibold">Rp{(gear.price_per_day*1000).toLocaleString('id-ID')}/hari</span>
        </div>
        <p className="text-sm text-gray-600 mt-1 capitalize">{gear.category}</p>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-xs text-gray-500">Stock: {gear.stock ?? 1}</span>
          <button onClick={() => onAdd(gear)} className="px-3 py-1.5 rounded-full bg-gray-900 text-white text-sm hover:bg-gray-800">Sewa</button>
        </div>
      </div>
    </div>
  )
}

export default function Catalog() {
  const [active, setActive] = useState(categories[0].key)
  const [items, setItems] = useState([])
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const filtered = useMemo(() => items.filter(i => i.category === active), [items, active])

  useEffect(() => {
    const load = async () => {
      const res = await fetch(`${baseUrl}/api/gear`)
      const data = await res.json()
      setItems(data.items || [])
    }
    load()
  }, [baseUrl])

  const onAdd = async (gear) => {
    // For demo, create a faux transaction with 1 day
    const user = JSON.parse(localStorage.getItem('demo_user') || '{}')
    if (!user.id) {
      // create demo user
      const ures = await fetch(`${baseUrl}/api/users`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: 'Pengguna Demo', email: `demo${Date.now()}@mail.com` }) })
      const ud = await ures.json()
      user.id = ud.id
      localStorage.setItem('demo_user', JSON.stringify(user))
    }

    await fetch(`${baseUrl}/api/transactions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: user.id, items: [{ gear_id: gear.id || gear._id, quantity: 1, days: 1 }] })
    })
    alert('Ditambahkan ke transaksi! Cek halaman Transaksi.')
  }

  return (
    <section id="catalog" className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Katalog</h2>
        <CategoryTabs active={active} onChange={setActive} />
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((gear) => (
          <GearCard key={gear.id} gear={gear} onAdd={onAdd} />
        ))}
      </div>
    </section>
  )
}
