import React from 'react'

const Character = ({currCharacter}) => {
    const {image, name} = currCharacter;

  return (
    <div>
        <img src={image} alt={name} />
      <h1>{name}</h1>
    </div>
  )
}

export default Character
