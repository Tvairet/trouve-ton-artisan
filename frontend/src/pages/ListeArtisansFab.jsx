import { useState, useEffect } from 'react';



function ListeArtisansFab() {
  const [artisans, setArtisans] = useState([]);
  const categoryID = 3;

  useEffect(() => {
    fetch('http://localhost:5000/artisans').then((response)=>{return response.json();}).then((data)=>{
      const categoryFilter = data.filter(artisan => artisan.categoryId === categoryID);
      setArtisans(categoryFilter);
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

export default ListeArtisansFab
