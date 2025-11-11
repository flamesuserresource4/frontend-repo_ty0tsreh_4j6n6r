export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-emerald-50" />
      <div className="max-w-6xl mx-auto px-4 py-12 sm:py-16 relative">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm mb-4">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
              Sewa alat pendakian dengan mudah
            </div>
            <h1 className="text-3xl sm:text-5xl font-bold text-gray-900 leading-tight">
              Semua perlengkapan gunung dalam satu tempat
            </h1>
            <p className="mt-4 text-gray-600">
              Pilih tenda, carrier, kompor portabel, sleeping bag, tracking pole dan lainnya. Proses cepat, pembayaran aman.
            </p>
            <div className="mt-6 flex gap-3">
              <a href="#catalog" className="px-5 py-3 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors">
                Lihat Katalog
              </a>
              <a href="/transactions" className="px-5 py-3 rounded-full bg-gray-900 text-white hover:bg-gray-800 transition-colors">
                Cek Transaksi
              </a>
            </div>
          </div>
          <div className="md:justify-self-end">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-tr from-blue-200/60 to-emerald-200/60 blur-2xl rounded-3xl" />
              <img src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop" alt="mountain" className="relative rounded-3xl shadow-xl border border-white/60" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
