import { useLocalStorage } from './useLocalStorage'
import { STORAGE_KEYS } from '../utils/storageKeys'

export const useBookmarks = () => {
  const [bookmarks, setBookmarks] = useLocalStorage(STORAGE_KEYS.bookmarks, [])

  const toggleBookmark = (item) => {
    setBookmarks((prev) => {
      const exists = prev.find((bookmark) => bookmark.id === item.id && bookmark.type === item.type)
      if (exists) {
        return prev.filter((bookmark) => !(bookmark.id === item.id && bookmark.type === item.type))
      }
      return [item, ...prev]
    })
  }

  const isBookmarked = (item) => bookmarks.some((bookmark) => bookmark.id === item.id && bookmark.type === item.type)

  return { bookmarks, toggleBookmark, isBookmarked }
}

export const useCalculatorHistory = () => {
  const [history, setHistory] = useLocalStorage(STORAGE_KEYS.calcHistory, [])

  const addHistory = (entry) => {
    setHistory((prev) => [{ ...entry, createdAt: new Date().toISOString() }, ...prev].slice(0, 20))
  }

  return { history, addHistory }
}

export const useRecentActivity = () => {
  const [recent, setRecent] = useLocalStorage(STORAGE_KEYS.recent, [])

  const addRecent = (action, label) => {
    setRecent((prev) => [{ action, label, at: new Date().toISOString() }, ...prev].slice(0, 10))
  }

  return { recent, addRecent }
}
