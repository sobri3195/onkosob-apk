import { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import BottomNav from './components/BottomNav'
import HomePage from './pages/HomePage'
import CalculatorsPage from './pages/CalculatorsPage'
import ReferencesPage from './pages/ReferencesPage'
import NotesPage from './pages/NotesPage'
import AboutPage from './pages/AboutPage'
import BookmarksPage from './pages/BookmarksPage'
import PatientCommunityPage from './pages/PatientCommunityPage'
import AppHeader from './components/AppHeader'
import { useLocalStorage } from './hooks/useLocalStorage'

const App = () => {
  const [theme] = useLocalStorage('onkosob_theme', 'light')

  useEffect(() => {
    document.body.dataset.theme = theme
  }, [theme])

  return (
    <div className="app-shell">
      <main className="app-main">
        <AppHeader />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/calculators" element={<CalculatorsPage />} />
          <Route path="/references" element={<ReferencesPage />} />
          <Route path="/notes" element={<NotesPage />} />
          <Route path="/pasien" element={<PatientCommunityPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/bookmarks" element={<BookmarksPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <BottomNav />
    </div>
  )
}

export default App
