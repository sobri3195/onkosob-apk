import { useMemo, useState } from 'react'
import Card from '../components/Card'
import SectionHeader from '../components/SectionHeader'
import SearchFilterBar from '../components/SearchFilterBar'
import EmptyState from '../components/EmptyState'
import BookmarkButton from '../components/BookmarkButton'
import { references, referenceCategories } from '../data/references'
import { atlasItems } from '../data/atlas'
import { useBookmarks, useRecentActivity } from '../hooks/useAppData'

const ReferencesPage = () => {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')
  const { toggleBookmark, isBookmarked } = useBookmarks()
  const { addRecent } = useRecentActivity()

  const filteredReferences = useMemo(() => {
    return references.filter((item) => {
      const categoryMatch = category === 'All' || item.category === category
      const queryMatch = `${item.title} ${item.content}`.toLowerCase().includes(query.toLowerCase())
      return categoryMatch && queryMatch
    })
  }, [category, query])

  const filteredAtlas = useMemo(() => {
    return atlasItems.filter((item) => `${item.site} ${item.overview} ${item.related.join(' ')}`.toLowerCase().includes(query.toLowerCase()))
  }, [query])

  const bookmarkRef = (item) => {
    toggleBookmark({ id: item.id, type: 'reference', title: item.title })
    addRecent('Updated bookmark', item.title)
  }

  const bookmarkAtlas = (item) => {
    toggleBookmark({ id: item.id, type: 'atlas', title: `Atlas ${item.site}` })
    addRecent('Updated bookmark', `Atlas ${item.site}`)
  }

  return (
    <div className="page">
      <SectionHeader title="References & Atlas" subtitle="Koleksi ringkas konsep radiobiologi, istilah penting, dan disease site overview." />
      <SearchFilterBar
        query={query}
        onQueryChange={setQuery}
        categories={referenceCategories}
        activeCategory={category}
        onCategoryChange={setCategory}
      />

      <div className="stack">
        {filteredReferences.length ? filteredReferences.map((item) => (
          <Card key={item.id} title={item.title} subtitle={item.category} rightAction={
            <BookmarkButton
              isBookmarked={isBookmarked({ id: item.id, type: 'reference' })}
              onClick={() => bookmarkRef(item)}
            />
          }>
            <p>{item.content}</p>
          </Card>
        )) : <EmptyState title="Referensi tidak ditemukan" message="Coba kata kunci atau kategori lain." />}
      </div>

      <SectionHeader title="Atlas" subtitle="Disease site overview edukatif." />
      <div className="stack" id="atlas">
        {filteredAtlas.length ? filteredAtlas.map((item) => (
          <Card key={item.id} title={item.site} rightAction={
            <BookmarkButton
              isBookmarked={isBookmarked({ id: item.id, type: 'atlas' })}
              onClick={() => bookmarkAtlas(item)}
            />
          }>
            <p>{item.overview}</p>
            <p><strong>OAR umum:</strong> {item.oars.join(', ')}</p>
            <p><strong>Related concepts:</strong> {item.related.join(', ')}</p>
          </Card>
        )) : <EmptyState title="Atlas tidak ditemukan" message="Tidak ada disease site yang cocok dengan pencarian." />}
      </div>
    </div>
  )
}

export default ReferencesPage
