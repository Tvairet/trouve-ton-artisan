import { Link } from 'react-router-dom'
import ('./Header.css')
import Logo from '../assets/logo.png'
function Header() {
    return (
        <header>
            <Link to="/">
                <img src={Logo} alt="Logo de la région Auvergne-Rhônes-Alpes" />
            </Link>
            
            <nav>
                <ul>
                    <li>
                        <Link to="/">Accueil</Link>
                    </li>
                    <li>
                        <Link to="/alimentation">Alimentation</Link>
                    </li>
                    <li>
                        <Link to="batiment">Bâtiment</Link>
                    </li>
                    <li>
                        <Link to="fabrication">Fabrication</Link>
                    </li>
                    <li>
                        <Link to="services">Services</Link>
                    </li>
                </ul>
            </nav>
            <input type="search" name="search-artisan" />
        </header>
    )
}

export default Header