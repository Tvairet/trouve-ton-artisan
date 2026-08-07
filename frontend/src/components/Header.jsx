import { NavLink, Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import logoUrl from "../assets/logo.png";
import ListeArtisans from "../pages/ListeArtisans";
import logoSearch from "../assets/recherche.png";


const navLinkClass = ({ isActive }) => `nav-link${isActive ? " active" : ""}`;

function Header(){  
return (
<nav className="navbar navbar-expand-lg ">
  <div className="container-fluid">
    <a className="navbar-brand" href="/">
    <img src={logoUrl} alt="Trouve ton atisan" height="100" width="250"></img>
    </a>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav mx-lg-auto mb-2 mb-lg-0 text-center">
        <li className="nav-item">
          <NavLink end className={navLinkClass} to="/">
                Accueil
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink end className={navLinkClass} to="ListeArtisans">
                Bâtiment
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink end className={navLinkClass} to="#">
                Service
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink end className={navLinkClass} to="#">
                Fabrication
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink end className={navLinkClass} to="#">
                Alimentation
          </NavLink>
        </li>
      </ul>
      <form className="d-flex" role="search">
      <input className="form-control me-2" type="search" placeholder="Rechercher un artisan" aria-label="Search"/>
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