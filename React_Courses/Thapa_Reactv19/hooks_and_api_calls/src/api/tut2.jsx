import React, { useState, useEffect } from 'react'

const tut2 = () => {
  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const API = "https://pokeapi.co/api/v2/pokemon/ditto"

  const fetchPokemon = async () => {
    try {
        const res = await fetch(API);
        const data = await res.json();
        setApiData(data);
        setLoading(false);
    } catch (error) {
        console.log(error);
        setError(error);
        setLoading(false);
    }
  }

  useEffect(() => {
    fetchPokemon();
  }, [])

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

export default tut2
