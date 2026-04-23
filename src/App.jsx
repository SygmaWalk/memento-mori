import { useTheme } from './context/ThemeContext'
import Navbar from './components/layout/Navbar'
import LandingPage from './pages/LandingPage'

function App() {
  const { isDark, toggleTheme } = useTheme()

  return (
    <div className="min-h-screen w-full bg-white dark:bg-black text-black dark:text-white transition-colors duration-500">
      <Navbar />
      <LandingPage />
    </div>
  )
}

export default App