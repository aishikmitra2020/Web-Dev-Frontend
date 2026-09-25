import React from 'react'
import "./Netflix.css"

// Props destructuring
// const SeriesCard2 = (props) => {}
const SeriesCard2 = ({ elem }) => {
  // Destructuring Props
  // const { elem } = props;
  const { img_url, name, rating, description, genre, cast, watch_url } = elem;

  const btn_style = {
    padding: "1.2rem 2.4rem",
    border: "none",
    fontSize: "1.6rem",
    // backgroundColor: "var(--btn-hover-bg-color)",
    backgroundColor: `${rating >= 8.5 ? "#7dcea0" : "#f7dc6f"}`,
    color: "var(--btn-color)",
    fontWeight: "bold",
    cursor: "pointer"
  }

  const ratingClass = rating >= 8.5 ? "super_hit" : "average"

  // Defining inline styles directly within the JSX can lead to performance issues because a new object is created on every render. To avoid this, define styles outside of the render method or as constants.

  return (
    <li className='card'>
      <div>
        <img src={img_url} alt="k2" width="40%" height="40%" />

        {/* <img src={seriesData[0]['img_url']} alt="k2" width="40%" height="40%" /> */}
      </div>
      <div className='card-content'>
        <h2>Name: {name}</h2>
        {/* <p style={{ margin: "1.2rem 0", fontSize: "2rem", fontWeight: "700" }}>Rating: {rating}</p> */}
        {/* <h3>
          Rating: <span className={`rating ${rating >= 8.5 ? "super_hit" : "average"}`}>{rating}</span>
        </h3> */}
        <h3>
          Rating: <span className={`rating ${ratingClass}`}>{rating}</span>
        </h3>

        {/* The outer {} represents that we are writing JS code and the inner {} represents that we are writing JS Objects */}
        {/* We may or may not surround the object keys with double quotes "" but it is mandatory to surround the object values with "" (not in all the cases, if the value is numeric and doesn't contains any characters then we needn't to surround the value with "") because it is the syntax of JS Objects */}

        {/* <p style={{ margin: "1.2rem 0", zIndex: 1 }}>Summary: {description}</p> */}

        <p>Summary: {description}</p>
        
        {/* <p>Genre: {genre}</p> */}
        {/* <p style={{ margin: "1.2rem 0" }}>Genre: {genre.join(", ")}</p> */}
        <p>Genre: {genre.join(", ")}</p>

        {/* <p>Cast: {cast}</p> */}
        {/* <p style={{ margin: "1.2rem 0" }}>Cast: {cast.join(", ")}</p> */}
        <p>Cast: {cast.join(", ")}</p>

        <a href={watch_url} target="_blank">
          {/* <button style={{padding: "1.2rem 2.4rem", border: "none", fontSize: "1.6rem", backgroundColor: "var(--btn-hover-bg-color)", color: "var(--bg-color)", cursor: "pointer"}}>Watch Now</button> */}
          <button style={btn_style}>Watch Now</button>
        </a>
      </div>
    </li>
  );
};

export default SeriesCard2
