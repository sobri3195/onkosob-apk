import { useLocalStorage } from '../hooks/useLocalStorage'

const AppHeader = () => {
  const [theme, setTheme] = useLocalStorage('onkosob_theme', 'light')

  return (
    <header className="app-header">
      <div className="brand">
        <img src="/logo.svg" alt="OnkoSob logo" className="brand__logo" />
        <div>
          <h1>OnkoSob</h1>
          <p>Smart oncology pocket companion</p>
        </div>
      </div>
      <button
        type="button"
        className="chip"
        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      >
        {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
      </button>
    </header>
  )
}

export default AppHeader
