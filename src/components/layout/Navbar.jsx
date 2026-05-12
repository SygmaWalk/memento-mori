import { useTheme } from '../../context/ThemeContext'

function Navbar() {
  const { isDark, toggleTheme } = useTheme()

  return (
    <nav className="w-full border-b border-black dark:border-white px-6 py-4 flex items-center justify-between">
      <span style={{ fontFamily: "'Playfair Display', serif" }} className="text-xl font-bold tracking-tight">
        Memento Mori
      </span>

      <button
        onClick={toggleTheme}
        className="text-xs border border-black dark:border-white px-4 py-1.5 tracking-widest uppercase hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors duration-200"
      >
        {isDark ? '☀️ Modo claro' : '🌙 Modo oscuro'}
      </button>
    </nav>
  )
}

export default Navbar