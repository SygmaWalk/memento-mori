import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import LandingPage from './pages/LandingPage'
import AppPage from './pages/AppPage'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen w-full bg-white dark:bg-black text-black dark:text-white transition-colors duration-500">
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/app" element={<AppPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App