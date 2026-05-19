import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import LandingPage from './pages/LandingPage'
import AppPage from './pages/AppPage'
import LoginPage from './pages/LoginPage'
import HistoriaPage from './pages/HistoriaPage'

function App() {
  return (
    <BrowserRouter>
      <div className="bg-white dark:bg-black text-black dark:text-white transition-colors duration-500">
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/app" element={<AppPage />} />
            <Route path="/historia" element={<HistoriaPage />} />
          </Route>
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App