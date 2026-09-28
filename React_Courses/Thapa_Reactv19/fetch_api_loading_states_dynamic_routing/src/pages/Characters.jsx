import React from 'react'
import { useLoaderData } from 'react-router-dom'
import Card from '../components/UI/Card'

const Characters = () => {

  const charactersData = useLoaderData();
  const charactersArray = charactersData.data;

  return (
    <>
    <ul>
      <li>
        {charactersArray && charactersArray.map((currCharacter) => {
          return <Card key={currCharacter.id} currCharacter={currCharacter} />
        })}
      </li>
    </ul>
    </>
  )
}

export default Characters
