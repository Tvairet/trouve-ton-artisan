import { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Router } from 'react-router-dom';
import { Link } from 'react-router-dom';
//import { getFeaturedArtisans } from './data/artisansData';

function RatingStars({ value }) {
  return (
    <div className="rating" aria-label={`Note ${value} sur 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className={`star ${i < value ? "filled" : "empty"}`}>★</span>
      ))}
    </div>
  );
}

export default function App() {
  
  //const featured = getFeaturedArtisans(3);
  
  return (
    <>
    <section className='explicationListe'>
      <h1>Comment trouver mon artisan ?</h1>
      <ol class="list-group list-group-numbered">
        <li class="list-group-item">Choisir la catégorie d'artisanat dans le menu</li>
        <li class="list-group-item">Choisir un artisan</li>
        <li class="list-group-item">Le contacter via le formulaire de contact</li>
        <li class="list-group-item">Une réponse sera apportée sous 48H</li>
      </ol>
    </section>
    

     
    </>
  );
}
