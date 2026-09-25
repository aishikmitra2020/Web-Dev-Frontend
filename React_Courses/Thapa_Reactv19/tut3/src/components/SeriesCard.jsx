import React from "react";

// Generally, we call it 'props' but we can name whatever we want
const SeriesCard = (props) => {
  // console.log(props);
  return (
    <li>
      <div>
        <img src={props.elem.img_url} alt="k2" width="40%" height="40%" />

        {/* <img src={seriesData[0]['img_url']} alt="k2" width="40%" height="40%" /> */}
      </div>
      <h2>Name: {props.elem.name}</h2>
      <p>Rating: {props.elem.rating}</p>
      <p>Summary: {props.elem.description}</p>
      
      {/* <p>Genre: {props.elem.genre}</p> */}
      <p>Genre: {props.elem.genre.join(", ")}</p>

      {/* <p>Cast: {props.elem.cast}</p> */}
      <p>Cast: {props.elem.cast.join(", ")}</p>

      <a href={props.elem.watch_url} target="_blank">
        <button>Watch Now</button>
      </a>
    </li>
  );
};

export default SeriesCard;
