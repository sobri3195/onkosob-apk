import { NavLink } from 'react-router-dom'

const tabs = [
  { to: '/', icon: '⌂', label: 'Home' },
  { to: '/calculators', icon: '∑', label: 'Calc' },
  { to: '/references', icon: '⌕', label: 'Ref' },
  { to: '/pasien', icon: '♥', label: 'Pasien' },
  { to: '/notes', icon: '✎', label: 'Notes' },
  { to: '/about', icon: 'ℹ', label: 'About' },
]

const BottomNav = () => (
  <nav className="bottom-nav">
    {tabs.map((tab) => (
      <NavLink key={tab.to} to={tab.to} className={({ isActive }) => `bottom-nav__item ${isActive ? 'active' : ''}`}>
        <span className="bottom-nav__icon">{tab.icon}</span>
        <span className="bottom-nav__label">{tab.label}</span>
      </NavLink>
    ))}
  </nav>
)

export default BottomNav
