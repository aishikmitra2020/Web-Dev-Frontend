import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { api, getMovie } from '../api/api'
import Character from '../components/Character';

const Characters = () => {
    const [data, setData] = useState([]);

    const API = "https://data.jujutsukaisenapi.site/api/v1/characters/";

    // using axios directly
    // const getMovieData = async () => {
    //     try {
    //         const res = await axios.get(API);
    //         console.log(res.data.data)
    //         setData(res.data.data);
    //     } catch (err) {
    //         console.log("Error message", err.message)
    //         console.log("Error status", err.response.status)
    //         console.log("Error data", err.response.data)
    //     }
    // }

    // using instance of axios(api)
    const getMovieData = async () => {
        try {
            const res = await getMovie();
            console.log(res.data)
            setData(res.data.data);
        } catch (err) {
            console.log("Error message", err.message)
            console.log("Error status", err.response.status)
            console.log("Error data", err.response.data)
        }
    }

    useEffect(()=> {
        getMovieData();
    }, [])

  return (
    <ul>
      {
        data.map((currElem) => {
            return <Character key={currElem.id} currCharacter={currElem} />
        })
      }
    </ul>
  )
}

export default Characters
