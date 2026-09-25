import React from 'react'

// When we import css modules, they are imported as objects
// Here, 'styles' is just the object name, we can name it whatever we want
import styles from './Netflix.module.css'

// These class names are changed into unique names to prevent the class name conflicts

// Props destructuring
// const SeriesCard2 = (props) => {}
export const SeriesCard = ({ elem }) => {
  const { img_url, name, rating, description, genre, cast, watch_url } = elem;

  const btn_style = {
    padding: "1.2rem 2.4rem",
    border: "none",
    fontSize: "1.6rem",
    backgroundColor: `${rating >= 8.5 ? "#7dcea0" : "#f7dc6f"}`,
    color: "var(--btn-color)",
    fontWeight: "bold",
    cursor: "pointer"
  }

  const ratingClass = rating >= 8.5 ? styles.super_hit : styles.average;

  // There are two notations to access the properties of objects:
  //    i) Dot Notaion (obj.name) - expects a valid JS identifier (it doesn't includes those hyphens)
  //   ii) Bracket Notaion (obj["name"])

  return (
    // When we are using css modules, we have to treat the class names as properies of an object
    // Like we hv done below: <li className={styles.card}>
    // Using Dot Notation for accessing the properties of the objects
    <li className={styles.card}>
      <div>
        <img src={img_url} alt="k2" width="40%" height="40%" />
      </div>
      {/* If the class names have have any hyphens or special characters means if they are not continous, we generally use bracket notation for those class names like: <div className={styles["card-content"]}> */}
      <div className={styles["card-content"]}>
        <h2>Name: {name}</h2>
        <h3>
          Rating: <span className={`${styles.rating} ${ratingClass}`}>{rating}</span>
        </h3>
        <p>Summary: {description}</p>
        <p>Genre: {genre.join(", ")}</p>
        <p>Cast: {cast.join(", ")}</p>

        <a href={watch_url} target="_blank">
          <button style={btn_style}>Watch Now</button>
        </a>
      </div>
    </li>
  );
};
