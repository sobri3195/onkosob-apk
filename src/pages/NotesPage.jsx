import { useMemo, useState } from 'react'
import Card from '../components/Card'
import SectionHeader from '../components/SectionHeader'
import EmptyState from '../components/EmptyState'
import BookmarkButton from '../components/BookmarkButton'
import { noteTemplates } from '../data/templates'
import { useBookmarks, useRecentActivity } from '../hooks/useAppData'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { STORAGE_KEYS } from '../utils/storageKeys'

const NotesPage = () => {
  const [notes, setNotes] = useLocalStorage(STORAGE_KEYS.notes, [])
  const [draft, setDraft] = useState({ id: null, title: '', tag: '', body: '' })
  const { toggleBookmark, isBookmarked } = useBookmarks()
  const { addRecent } = useRecentActivity()

  const isEditing = Boolean(draft.id)

  const saveNote = () => {
    if (!draft.title.trim()) return
    if (isEditing) {
      setNotes((prev) => prev.map((item) => (item.id === draft.id ? { ...draft, updatedAt: new Date().toISOString() } : item)))
      addRecent('Updated note', draft.title)
    } else {
      const entry = { ...draft, id: crypto.randomUUID(), createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }
      setNotes((prev) => [entry, ...prev])
      addRecent('Created note', draft.title)
    }
    setDraft({ id: null, title: '', tag: '', body: '' })
  }

  const sortedNotes = useMemo(() => [...notes].sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)), [notes])

  return (
    <div className="page">
      <SectionHeader title="Notes" subtitle="Catatan pribadi dengan autosave lokal di browser." />

      <Card title={isEditing ? 'Edit Note' : 'Create Note'}>
        <label>Title<input className="input" value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })} /></label>
        <label>Tag<input className="input" value={draft.tag} onChange={(e) => setDraft({ ...draft, tag: e.target.value })} placeholder="mis. Prostate, BED, OAR" /></label>
        <label>Body<textarea className="input textarea" value={draft.body} onChange={(e) => setDraft({ ...draft, body: e.target.value })} /></label>
        <div className="chip-row">
          {noteTemplates.map((template) => (
            <button key={template.id} type="button" className="chip" onClick={() => setDraft({ ...draft, body: template.body })}>{template.name}</button>
          ))}
        </div>
        <div className="action-row">
          <button className="btn" onClick={saveNote}>{isEditing ? 'Update note' : 'Save note'}</button>
          <button className="btn btn--ghost" onClick={() => setDraft({ id: null, title: '', tag: '', body: '' })}>Reset</button>
        </div>
      </Card>

      <Card title="My Notes">
        {sortedNotes.length ? (
          <ul className="notes-list">
            {sortedNotes.map((note) => (
              <li key={note.id}>
                <div>
                  <h4>{note.title}</h4>
                  <p>{note.body.slice(0, 140)}{note.body.length > 140 ? '…' : ''}</p>
                  <small>#{note.tag || 'general'} • {new Date(note.updatedAt).toLocaleString('id-ID')}</small>
                </div>
                <div className="action-col">
                  <button className="btn btn--ghost" onClick={() => setDraft(note)}>Edit</button>
                  <button className="btn btn--danger" onClick={() => {
                    setNotes((prev) => prev.filter((item) => item.id !== note.id))
                    addRecent('Deleted note', note.title)
                  }}>Delete</button>
                  <BookmarkButton
                    isBookmarked={isBookmarked({ id: note.id, type: 'note' })}
                    onClick={() => toggleBookmark({ id: note.id, type: 'note', title: note.title })}
                  />
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <EmptyState title="Belum ada catatan" message="Buat catatan pertama untuk merangkum pembelajaran atau kasus." />
        )}
      </Card>
    </div>
  )
}

export default NotesPage
