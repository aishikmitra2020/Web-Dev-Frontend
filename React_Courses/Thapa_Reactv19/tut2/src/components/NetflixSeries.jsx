// A Component is a function that returns JSX
import React from 'react'

const NetflixSeries = () => {
  const name = "Mount Kanchenjunga";
  const summary = "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quo, maxime expedita! Mollitia rem recusandae, est adipisci";
  
  let age = 18;

  const returnGenre = () => {
    const genre = "RomCom";
    return genre;
  }


  return (
    <div>
      <div>
        <img src="k2.jpg" alt="k2" width="40%" height="40%" />
      </div>
      <h2>Name: {name}</h2>
      <p>Rating: {2.5+5}</p>
      <p>Summary: {summary}</p>
      <p>Genre: {returnGenre()}</p>
      <button>{age >= 18 ? "Watch Now" : "This show is unavailable"}</button>
    </div>
  )
}

// export default NetflixSeries; // Default Export

// Named Exports. It can be done in two ways:
// Way 1
// export { NetflixSeries };
// Way 2
// export const Footer = () => {};

// Combined Import and Export
export default NetflixSeries; // Default Export

// Named Export
export const Header = () => {
    return <p>This is a header</p>;
};

// Named Export
export const Footer = () => {
    return <p>Copyright @Aishik Mitra</p>;
};

// We can slo use this way:
// export { Header, Footer };
