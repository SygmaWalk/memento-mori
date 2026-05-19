import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useTheme } from '../../context/ThemeContext'

function Navbar() {
  const { isDark, toggleTheme } = useTheme()
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  const handleComoFunciona = () => {
    setMenuOpen(false)
    if (location.pathname === '/') {
      document.getElementById('como-funciona')?.scrollIntoView({ behavior: 'smooth' })
    } else {
      navigate('/')
      setTimeout(() => {
        document.getElementById('como-funciona')?.scrollIntoView({ behavior: 'smooth' })
      }, 150)
    }
  }

  const close = () => setMenuOpen(false)

  return (
    <nav className="w-full border-b border-black dark:border-white bg-white dark:bg-black relative z-50">
      <div className="px-6 py-4 flex items-center justify-between">

        <Link
          to="/"
          onClick={close}
          style={{ fontFamily: "'Playfair Display', serif" }}
          className="text-xl font-bold tracking-tight"
        >
          Memento Mori
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-xs tracking-widest uppercase opacity-50 hover:opacity-100 transition-opacity duration-200">
            Inicio
          </Link>
          <button
            onClick={handleComoFunciona}
            className="text-xs tracking-widest uppercase opacity-50 hover:opacity-100 transition-opacity duration-200"
          >
            ¿Cómo funciona?
          </button>
          <Link to="/historia" className="text-xs tracking-widest uppercase opacity-50 hover:opacity-100 transition-opacity duration-200">
            Historia
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-6">
          <button
            onClick={toggleTheme}
            className="text-xs tracking-widest uppercase opacity-50 hover:opacity-100 transition-opacity duration-200"
          >
            {isDark ? 'Modo claro' : 'Modo oscuro'}
          </button>
          <Link to="/login" className="text-xs tracking-widest uppercase opacity-50 hover:opacity-100 transition-opacity duration-200">
            Iniciar sesión
          </Link>
          <Link
            to="/login"
            className="border border-black dark:border-white px-4 py-1.5 text-xs tracking-widest uppercase hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors duration-200"
          >
            Registrarse
          </Link>
        </div>

        <button
          className="md:hidden"
          onClick={() => setMenuOpen(p => !p)}
          aria-label="Menú"
        >
          {menuOpen ? (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <path d="M15 5L5 15M5 5l10 10" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <path d="M3 5h14M3 10h14M3 15h14" />
            </svg>
          )}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-black dark:border-white px-6 py-6 flex flex-col gap-5">
          <Link to="/" onClick={close} className="text-xs tracking-widest uppercase opacity-60 hover:opacity-100 transition-opacity">
            Inicio
          </Link>
          <button onClick={handleComoFunciona} className="text-xs tracking-widest uppercase opacity-60 hover:opacity-100 transition-opacity text-left">
            ¿Cómo funciona?
          </button>
          <Link to="/historia" onClick={close} className="text-xs tracking-widest uppercase opacity-60 hover:opacity-100 transition-opacity">
            Historia
          </Link>

          <div className="h-px bg-black dark:bg-white opacity-15" />

          <Link to="/login" onClick={close} className="text-xs tracking-widest uppercase opacity-60 hover:opacity-100 transition-opacity">
            Iniciar sesión
          </Link>
          <Link
            to="/login"
            onClick={close}
            className="border border-black dark:border-white px-4 py-2.5 text-xs tracking-widest uppercase text-center hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors duration-200"
          >
            Registrarse
          </Link>

          <div className="h-px bg-black dark:bg-white opacity-15" />

          <button
            onClick={() => { toggleTheme(); close() }}
            className="text-xs tracking-widest uppercase opacity-40 hover:opacity-70 transition-opacity text-left"
          >
            {isDark ? 'Modo claro' : 'Modo oscuro'}
          </button>
        </div>
      )}
    </nav>
  )
}

export default Navbar