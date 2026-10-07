import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Header from './components/Header'
import Footer from './components/Footer'
import Page404 from './pages/Page404'
import ListeArtisansCategorie from './pages/ListeArtisansCategorie'
import './styles/components/header.scss'
import './styles/components/footer.scss'

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/categorie/:slug" element={<ListeArtisansCategorie />} />
          <Route path='*' element={<Page404 />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  )
}

export default App