import { useEffect, useState } from 'react'

export default function Messages() {
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [items, setItems] = useState([])
  const [content, setContent] = useState('')

  const load = async () => {
    const user = JSON.parse(localStorage.getItem('demo_user') || '{}')
    const url = user.id ? `${baseUrl}/api/messages?user_id=${user.id}` : `${baseUrl}/api/messages`
    const res = await fetch(url)
    const data = await res.json()
    setItems(data.items || [])
  }

  useEffect(() => { load() }, [])

  const send = async (e) => {
    e.preventDefault()
    const user = JSON.parse(localStorage.getItem('demo_user') || '{}')
    if (!user.id) {
      const ures = await fetch(`${baseUrl}/api/users`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: 'Pengguna Demo', email: `demo${Date.now()}@mail.com` }) })
      const ud = await ures.json()
      user.id = ud.id
      localStorage.setItem('demo_user', JSON.stringify(user))
    }
    await fetch(`${baseUrl}/api/messages`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ user_id: user.id, content }) })
    setContent('')
    load()
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">Pesan ke Admin</h1>
      <form onSubmit={send} className="flex gap-2 mb-6">
        <input value={content} onChange={e => setContent(e.target.value)} className="flex-1 px-4 py-3 rounded-xl border" placeholder="Tulis pesan..." />
        <button className="px-5 py-3 rounded-xl bg-blue-600 text-white">Kirim</button>
      </form>
      <div className="space-y-3">
        {items.map((m) => (
          <div key={m.id} className="bg-white border rounded-xl p-4">
            <p className="text-gray-800">{m.content}</p>
            <p className="text-xs text-gray-500 mt-1">{new Date(m.created_at).toLocaleString('id-ID')}</p>
          </div>
        ))}
        {items.length === 0 && <div className="text-center text-gray-600">Belum ada pesan.</div>}
      </div>
    </div>
  )
}
