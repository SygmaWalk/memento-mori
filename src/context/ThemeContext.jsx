import { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext()

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(() => {
    // Recordar la preferencia del usuario entre sesiones
    const saved = localStorage.getItem('theme')
    if (saved) return saved === 'dark'
    // Si no hay preferencia guardada, usar la del sistema operativo
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  useEffect(() => {
    // Aplicar la clase 'dark' al <html> para que Tailwind la detecte
    document.documentElement.classList.toggle('dark', isDark)
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
  }, [isDark])

  const toggleTheme = () => setIsDark(prev => !prev)

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

// Hook personalizado para usar el contexto fácilmente
export function useTheme() {
  return useContext(ThemeContext)
}