import { Link } from 'react-router-dom'
import Card from '../components/Card'
import SectionHeader from '../components/SectionHeader'
import EmptyState from '../components/EmptyState'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { STORAGE_KEYS } from '../utils/storageKeys'

const HomePage = () => {
  const [recent] = useLocalStorage(STORAGE_KEYS.recent, [])
  const [bookmarks] = useLocalStorage(STORAGE_KEYS.bookmarks, [])

  return (
    <div className="page">
      <SectionHeader title="Selamat datang di OnkoSob" subtitle="Edukasi dan referensi cepat onkologi radiasi, mobile-first." />

      <Card title="Dashboard" subtitle="Shortcut fitur utama">
        <div className="shortcut-grid">
          <Link className="shortcut" to="/calculators">BED / EQD2 Calculators</Link>
          <Link className="shortcut" to="/references">Reference Library</Link>
          <Link className="shortcut" to="/references#atlas">Atlas Disease Site</Link>
          <Link className="shortcut" to="/notes">Personal Notes</Link>
          <Link className="shortcut" to="/bookmarks">Bookmarks</Link>
        </div>
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
