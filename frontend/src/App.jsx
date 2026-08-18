import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Header from './components/Header'
import Footer from './components/footer'
import Page404 from './pages/Page404'
import ListeArtisansBat from './pages/ListeArtisansBat'
import ListeArtisansAlim from './pages/ListeArtisansAlim'
import ListeArtisansFab from './pages/ListeArtisansFab'
import ListeArtisansServ from './pages/ListeArtisansServ'


function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ListeArtisansBat" element={<ListeArtisansBat />} />
        <Route path='/ListeArtisansAlim' element={<ListeArtisansAlim />} />
        <Route path='/ListeArtisansFab' element={<ListeArtisansFab />} />
        <Route path='/ListeArtisansServ' element={<ListeArtisansServ />} />
        <Route path='*' element={<Page404 />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App