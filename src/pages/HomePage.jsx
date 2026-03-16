import { Link } from 'react-router-dom'
import { useMemo, useState } from 'react'
import Card from '../components/Card'
import SectionHeader from '../components/SectionHeader'
import EmptyState from '../components/EmptyState'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { STORAGE_KEYS } from '../utils/storageKeys'

const tips = [
  'Gunakan EQD2 untuk membandingkan regimen dengan fraksinasi berbeda.',
  'Verifikasi OAR constraints dengan guideline terbaru sebelum keputusan klinis.',
  'Catat asumsi perhitungan agar review kasus lebih cepat.',
  'Bookmark disease site yang paling sering Anda pelajari minggu ini.',
]

const quickLinks = [
  { label: 'BED / EQD2 Calculators', to: '/calculators' },
  { label: 'Reference Library', to: '/references' },
  { label: 'Atlas Disease Site', to: '/references#atlas' },
  { label: 'Personal Notes', to: '/notes' },
  { label: 'Pasien & Masyarakat', to: '/pasien' },
  { label: 'Bookmarks', to: '/bookmarks' },
  { label: 'About & Disclaimer', to: '/about' },
]

const HomePage = () => {
  const [recent] = useLocalStorage(STORAGE_KEYS.recent, [])
  const [bookmarks] = useLocalStorage(STORAGE_KEYS.bookmarks, [])
  const [history] = useLocalStorage(STORAGE_KEYS.calcHistory, [])
  const [notes] = useLocalStorage(STORAGE_KEYS.notes, [])
  const [goals, setGoals] = useLocalStorage(STORAGE_KEYS.studyGoals, [
    { id: 1, text: 'Review 2 konsep radiobiologi', done: false },
    { id: 2, text: 'Buat 1 ringkasan case note', done: false },
    { id: 3, text: 'Simpan 3 referensi penting', done: false },
  ])
  const [search, setSearch] = useState('')

  const filteredLinks = useMemo(
    () => quickLinks.filter((item) => item.label.toLowerCase().includes(search.toLowerCase())),
    [search],
  )

  const tip = tips[new Date().getDate() % tips.length]

  return (
    <div className="page">
      <SectionHeader title="Selamat datang di OnkoSob" subtitle="Lebih cepat, lebih modern, dan lebih personal untuk belajar onkologi radiasi." />

      <Card title="Insight Ringkas" subtitle="Statistik personal hari ini">
        <div className="stats-grid">
          <div className="stat-box"><strong>{notes.length}</strong><span>Notes</span></div>
          <div className="stat-box"><strong>{bookmarks.length}</strong><span>Bookmarks</span></div>
          <div className="stat-box"><strong>{history.length}</strong><span>Calc History</span></div>
          <div className="stat-box"><strong>{recent.length}</strong><span>Aktivitas</span></div>
        </div>
      </Card>

      <Card title="Quick Action Finder" subtitle="Cari menu lebih cepat">
        <input className="input" placeholder="Contoh: calculator, notes, atlas..." value={search} onChange={(e) => setSearch(e.target.value)} />
        <div className="shortcut-grid">
          {filteredLinks.map((item) => (
            <Link key={item.to} className="shortcut" to={item.to}>{item.label}</Link>
          ))}
        </div>
      </Card>

      <Card title="Daily Clinical Tip">
        <p className="hint">💡 {tip}</p>
      </Card>

      <Card title="Learning Checklist" subtitle="Target belajar mingguan">
        <ul className="list">
          {goals.map((goal) => (
            <li key={goal.id}>
              <label className="check-item">
                <input
                  type="checkbox"
                  checked={goal.done}
                  onChange={() => setGoals((prev) => prev.map((item) => item.id === goal.id ? { ...item, done: !item.done } : item))}
                />
                <span>{goal.text}</span>
              </label>
              <small>{goal.done ? 'Selesai' : 'Belum'}</small>
            </li>
          ))}
        </ul>
      </Card>

      <Card title="Recent Activity">
        {recent.length ? (
          <ul className="list">
            {recent.slice(0, 5).map((item, idx) => (
              <li key={`${item.at}-${idx}`}>
                <span>{item.action}</span>
                <small>{item.label}</small>
              </li>
            ))}
          </ul>
        ) : (
          <EmptyState title="Belum ada aktivitas" message="Aktivitas dari kalkulator, referensi, dan notes akan muncul di sini." />
        )}
      </Card>

      <Card title="Bookmarked Items" rightAction={<Link to="/bookmarks">Lihat semua</Link>}>
        {bookmarks.length ? (
          <ul className="list">
            {bookmarks.slice(0, 5).map((item) => (
              <li key={`${item.type}-${item.id}`}>
                <span>{item.title}</span>
                <small>{item.type}</small>
              </li>
            ))}
          </ul>
        ) : (
          <EmptyState title="Belum ada bookmark" message="Simpan item favorit dari halaman calculators, references, atlas, atau notes." />
        )}
      </Card>
    </div>
  )
}

export default HomePage
