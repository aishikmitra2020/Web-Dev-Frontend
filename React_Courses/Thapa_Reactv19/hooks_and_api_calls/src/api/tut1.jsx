import React, { useState, useEffect } from 'react'

const tut1 = () => {
  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const API = "https://pokeapi.co/api/v2/pokemon/ditto"

  const fetchPokemon = ()=> {
    fetch(API)
      .then((res) => res.json())
      .then((data) => {
        setApiData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setError(error);
        setLoading(false);
      })
  }

  useEffect(() => {
    fetchPokemon();
  }, [])
  console.log(apiData)

  // video 56
  // if (!apiData) {
  //   return <div>Loading...</div>
  // }

  // if (apiData) {code}

  // video 57
  if (loading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    )
  }

  if (error) {
    return (
      <div>
        {/* We cannot dispay the 'error' directly here */}
        <h1>Error: {error.message}</h1>
      </div>
    )
  }

  return (
    <div>
      {apiData.name}
    </div>
  )
}

export default tut1
