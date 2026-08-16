import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './styles/main.scss'
import App from './App.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header.jsx'
import Footer from './components/footer.jsx'
import ListeArtisans from './pages/ListeArtisans.jsx'
import Page404 from './pages/Page404.jsx'
//import FicheArtisans from './pages/FicheArtisans.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Header/>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/ListeArtisans' element={<ListeArtisans />} />
        
        <Route path='*' element={<Page404 />} />
      </Routes>
      <Footer/>
    </Router>
    
  </StrictMode>,
)
