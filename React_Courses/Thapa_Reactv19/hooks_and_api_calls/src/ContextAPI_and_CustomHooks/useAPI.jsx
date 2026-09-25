import React, { use } from 'react'
import { BioContext } from '.'

const useAPI = () => {
    // const {myName, myAge} = use(BioContext);
    
    // in conditionals
    // - here useContext will not work...
    const newHook = true;
    let myName, myAge;

    if (newHook) {
        ({myName, myAge} = use(BioContext));
    }

  return (
    <div>
      <h1>use API</h1>
      <h3>Hii, {myName}. My age is {myAge}</h3>
    </div>
  )
}

export default useAPI
