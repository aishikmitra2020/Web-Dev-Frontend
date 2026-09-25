// A Component is a function that returns JSX
import React from "react";
import seriesData from "../api/seriesData.json";
import SeriesCard from "./SeriesCard";
import SeriesCard2 from "./SeriesCard2";

const NetflixSeries = () => {
  return (
    // We don't have loops (for loops, while loops, do while loops) in JSX. So, we have to use 'map()' method to loop over an array in JSX
    // Using inline css. (we use js objects with camelCase names)
    <ul className="grid grid-three--cols" style={{ listStyle: "none" }}>
      {seriesData.map((elem) => (
        // We may also use index as the key as it is also unique. but we majorly use ids as keys

        // <li key={elem.id}>
        //   <div>
        //     <img src={elem.img_url} alt="k2" width="40%" height="40%" />

        //     {/* <img src={seriesData[0]['img_url']} alt="k2" width="40%" height="40%" /> */}
        //   </div>
        //   <h2>Name: {elem.name}</h2>
        //   <p>Rating: {elem.rating}</p>
        //   <p>Summary: {elem.description}</p>

        //   {/* <p>Genre: {elem.genre}</p> */}
        //   <p>Genre: {elem.genre.join(", ")}</p>

        //   {/* <p>Cast: {elem.cast}</p> */}
        //   <p>Cast: {elem.cast.join(", ")}</p>

        //   <a href={elem.watch_url} target="_blank">
        //     <button>Watch Now</button>
        //   </a>
        // </li>

        // Props
        // These attributes (in which the values are passed) is known as 'Props'
        // In React, props are passed as an object
        // <SeriesCard props={elem} />

        // <SeriesCard key={elem.id} elem={elem} />
        <SeriesCard2 key={elem.id} elem={elem} />
      ))}
    </ul>
  );

  //  manual (without using loops)
  //   return (
  //     <>
  //     <div>
  //         <div>
  //             <img src={seriesData[0].img_url} alt="k2" width="40%" height="40%" />

  //             {/* <img src={seriesData[0]['img_url']} alt="k2" width="40%" height="40%" /> */}
  //         </div>
  //         <h2>Name: {seriesData[0].name}</h2>
  //         <p>Rating: {seriesData[0].rating}</p>
  //         <p>Summary: {seriesData[0].description}</p>
  //         <p>Genre: {seriesData[0].genre}</p>
  //         <p>Cast: {seriesData[0].cast}</p>
  //         <a href={seriesData[0].watch_url} target='_blank'>
  //             <button>Watch Now</button>
  //         </a>
  //     </div>
  //     </>
  //   );
};

export default NetflixSeries;
