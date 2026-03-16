import Card from '../components/Card'
import EmptyState from '../components/EmptyState'
import SectionHeader from '../components/SectionHeader'
import { useBookmarks } from '../hooks/useAppData'

const BookmarksPage = () => {
  const { bookmarks, toggleBookmark } = useBookmarks()

  return (
    <div className="page">
      <SectionHeader title="Bookmarks" subtitle="Semua item favorit dari calculators, references, atlas, dan notes." />
      <Card>
        {bookmarks.length ? (
          <ul className="list">
            {bookmarks.map((item) => (
              <li key={`${item.type}-${item.id}`}>
                <span>{item.title}</span>
                <div className="action-col-inline">
                  <small>{item.type}</small>
                  <button type="button" className="btn btn--ghost" onClick={() => toggleBookmark(item)}>Hapus</button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <EmptyState title="Bookmark kosong" message="Simpan item yang sering dipakai agar akses lebih cepat." />
        )}
      </Card>
    </div>
  )
}

export default BookmarksPage
