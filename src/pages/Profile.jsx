import { useEffect, useState } from 'react'

export default function Profile() {
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [user, setUser] = useState(null)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  useEffect(() => {
    const u = JSON.parse(localStorage.getItem('demo_user') || '{}')
    if (u.id) {
      setUser(u)
      setName(u.name || 'Pengguna Demo')
      setEmail(u.email || 'demo@mail.com')
    }
  }, [])

  const save = async () => {
    // for demo: just save locally, create user if not exists
    let u = JSON.parse(localStorage.getItem('demo_user') || '{}')
    if (!u.id) {
      const ures = await fetch(`${baseUrl}/api/users`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name, email }) })
      const ud = await ures.json()
      u = { id: ud.id, name, email }
    } else {
      u = { ...u, name, email }
    }
    localStorage.setItem('demo_user', JSON.stringify(u))
    setUser(u)
    alert('Profil tersimpan!')
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">Profil</h1>
      <div className="bg-white border rounded-2xl p-6 space-y-4">
        <div>
          <label className="text-sm text-gray-600">Nama</label>
          <input value={name} onChange={e=>setName(e.target.value)} className="w-full px-4 py-3 rounded-xl border mt-1" />
        </div>
        <div>
          <label className="text-sm text-gray-600">Email</label>
          <input value={email} onChange={e=>setEmail(e.target.value)} className="w-full px-4 py-3 rounded-xl border mt-1" />
        </div>
        <button onClick={save} className="px-5 py-3 rounded-xl bg-blue-600 text-white">Simpan</button>
      </div>
    </div>
  )
}
