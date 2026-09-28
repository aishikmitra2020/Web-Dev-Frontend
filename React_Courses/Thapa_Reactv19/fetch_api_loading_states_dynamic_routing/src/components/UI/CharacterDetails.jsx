import React from 'react'
import { useLoaderData, useParams } from 'react-router-dom'

const CharacterDetails = () => {

  // from react components we can access it using useParams hook
  const params = useParams();
  
  const movieData = useLoaderData();
  console.log(movieData)

  const { image, name, birthday, animeDebut, gender, grade } = movieData;

  return (
    <div>
      <img src={image} alt={name} />
      <h1>This is {name}</h1>
      <p>{animeDebut}</p>
      <p>{gender.name}</p>
      <p>{grade.name}</p>
    </div>
  )
}

export default CharacterDetails
