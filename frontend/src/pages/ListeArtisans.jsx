import { useState, useEffect } from 'react';



function ListeArtisans() {
  const [artisans, setArtisans] = useState([])

  useEffect(() => {
    fetch('http://localhost:5000/artisans').then((response)=>{return response.json();}).then((data)=>{
      setArtisans(data);
    });
  },[]);

  return (
    <>
      <section id="center">
        {artisans.map((artisan)=>(
         <table>
          <thead>
            <tr>
              <th>Nom</th>
              <th>Note</th>
              <th>specialité</th>
              <th>Localisation</th>
            </tr>
          </thead>
          <tbody>
            <td>{artisan.name}</td>
            <td>{artisan.grade}</td>
            <td>{artisan.speciality}</td>
            <td>{artisan.city}</td>
          </tbody>
          
         </table> 
        ))}
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default ListeArtisans
