import { NavLink, Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import logoUrl from "../assets/logo.png";
import ListeArtisans from "../pages/ListeArtisansBat";
import logoSearch from "../assets/recherche.png";
import artisansData from "../data/artisans.json";


const navLinkClass = ({ isActive }) => `nav-link${isActive ? " active" : ""}`;

function Header(){ 
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const handleSearch = (e) => {
    e.preventDefault();
    const query = search.trim().toLowerCase();
    if (!query) return;

    const artisanTrouve = artisansData.find(
      (artisan) => artisan.name.toLowerCase().includes(query)
    );
    if (artisanTrouve) {
      navigate(`/artisan/${artisanTrouve.id}`);
    } else {
      navigate("/Page404");
    }
  };

return (
<nav className="navbar navbar-expand-lg ">
  <div className="container-fluid">
    <a className="navbar-brand" href="/">
    <img src={logoUrl} alt="Trouve ton atisan" height="100" width="250"></img>
    </a>

    <button
      className="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon"></span>
    </button>

    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav mx-lg-auto mb-2 mb-lg-0 text-center">
        <li className="nav-item">
          <NavLink end className={navLinkClass} to="/">
                Accueil
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink end className={navLinkClass} to="ListeArtisansBat">
                Bâtiment
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink end className={navLinkClass} to="ListeArtisansServ">
                Service
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink end className={navLinkClass} to="ListeArtisansFab">
                Fabrication
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink end className={navLinkClass} to="ListeArtisansAlim">
                Alimentation
          </NavLink>
        </li>
      </ul>
      <form className="d-flex" role="search" onSubmit={handleSearch}>
      <input className="form-control me-2" type="search" placeholder="Rechercher un artisan" aria-label="Search" value={search} onChange={(e) => setSearch(e.target.value)}/>
      <button className="btn btn-outline-black" type="submit">
        <img src={logoSearch} alt="rechercher"/>
      </button>
    </form>
    </div>
  </div>
</nav>
   );
}

export default Header