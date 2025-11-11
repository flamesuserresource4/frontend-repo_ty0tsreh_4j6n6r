import { useEffect, useState } from 'react'

export default function Transactions() {
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [items, setItems] = useState([])

  useEffect(() => {
    const load = async () => {
      const user = JSON.parse(localStorage.getItem('demo_user') || '{}')
      const url = user.id ? `${baseUrl}/api/transactions?user_id=${user.id}` : `${baseUrl}/api/transactions`
      const res = await fetch(url)
      const data = await res.json()
      setItems(data.items || [])
    }
    load()
  }, [baseUrl])

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">Transaksi</h1>
      <div className="space-y-4">
        {items.map((tx) => (
          <div key={tx.id} className="bg-white rounded-xl border p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold">ID: {tx.id}</p>
                <p className="text-sm text-gray-600">Status: <span className={tx.status === 'paid' ? 'text-emerald-600' : 'text-amber-600'}>{tx.status}</span></p>
              </div>
              <div className="text-right">
                <p className="text-gray-600 text-sm">Total</p>
                <p className="text-lg font-semibold">Rp{(tx.total_amount*1000).toLocaleString('id-ID')}</p>
              </div>
            </div>
          </div>
        ))}
        {items.length === 0 && (
          <div className="text-center text-gray-600">Belum ada transaksi.</div>
        )}
      </div>
    </div>
  )
}
