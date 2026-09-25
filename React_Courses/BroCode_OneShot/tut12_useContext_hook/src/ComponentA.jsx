import { useState, createContext, use } from "react"
import ComponentB from "./ComponentB.jsx"

export const UserContext = createContext();

// In this example, this ComponentA is the PROVIDER COMPONENT

function ComponentA() {
  const [user, setUser] = useState("BroCode");

  return (
    <div className='box'>
      <h1>ComponentA</h1>
      <h2>{`Hello ${user}`}</h2>

      <UserContext.Provider value={user}>
        <ComponentB />
      </UserContext.Provider>
      
    </div>
  )
}

export default ComponentA
