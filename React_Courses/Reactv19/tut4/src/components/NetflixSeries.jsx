// A Component is a function that returns JSX
import React from "react";
import seriesData from "../api/seriesData.json";
import { SeriesCard } from "./SeriesCard";

const NetflixSeries = () => {
  return (
    <ul className="grid grid-three--cols" style={{ listStyle: "none" }}>
      {seriesData.map((elem) => (
        <SeriesCard key={elem.id} elem={elem} />
      ))}
    </ul>
  );
};

export default NetflixSeries;
