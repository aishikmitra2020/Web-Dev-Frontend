import React from 'react'
import { useBioContext } from '.'

const Services = () => {
    const { myName, myAge } = useBioContext();

  return (
    <h1>
      Hii, {myName}. My age is {myAge}. (Services)
    </h1>
  )
}

export default Services
