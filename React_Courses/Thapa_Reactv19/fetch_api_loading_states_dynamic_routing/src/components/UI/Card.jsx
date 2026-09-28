import React from 'react'
import { NavLink } from 'react-router-dom';

const Card = ({ currCharacter }) => {

    const { image, name, id } = currCharacter;

  return (
    <div>
      <div>
        <img loading='lazy' src={image} alt={name} style={{height: "160px"}} />
      </div>
      <h2>{name}</h2>
      <NavLink to={`/characters/${currCharacter.id}`}>
        <button>View</button>
      </NavLink>
      <hr />
    </div>
  )
}

export default Card
