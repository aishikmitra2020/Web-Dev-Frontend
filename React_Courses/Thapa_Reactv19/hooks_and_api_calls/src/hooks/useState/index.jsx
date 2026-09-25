import React, { useState } from 'react'

const index = () => {
    const [count, setCount] = useState(0);
    const [user, setUser] = useState({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      phoneNumber: ""
    });

    const handleIncrement = (e) => {
        console.log(e); // get the event details

        // Usage of 'prev'
        // React batching means that React groups multiple state updates together and performs only one re-render instead of re-rendering after every single update.

        // Thus if we do
        // setCount(count + 1);
        // setCount(count + 1);
        // setCount(count + 1);
        // count will be 1

        // instead we have to do
        setCount(prev => prev + 1);
        setCount(prev => prev + 1);
        setCount(prev => prev + 1);
        // then the count will be 3
    }

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      // [name] is imp, without it new property will be created and named 'name' rather than dynamically updating the existing properties
      setUser((prev)=> ({... prev, [name]: value}));
    }

    const handleFormSubmit = (e) => {
      e.preventDefault();
      console.log(user); // logging the data from the state variable
    }

  return (
    <div>
      <h2>Count: {count}</h2>

      {/* <button onClick={setCount(count+1)}>Increment</button> */}
      <button onClick={handleIncrement}>Increment</button>

      <form onSubmit={handleFormSubmit}>
        <input type="text" name="firstName" placeholder='Enter firstName' value={user.firstName} onChange={handleInputChange} />

        <input type="text" name="lastName" placeholder='Enter lastName' value={user.lastName} onChange={handleInputChange} />

        <input type="text" name="email" placeholder='Enter email' value={user.email} onChange={handleInputChange} />

        <input type="text" name="password" placeholder='Enter password' value={user.password} onChange={handleInputChange} />

        <input type="text" name="phoneNumber" placeholder='Enter phoneNumber' value={user.phoneNumber} onChange={handleInputChange} />
        
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default index
