import React, { useState } from 'react'

const DerivedState = () => {
    const [users, setUsers] = useState([
        { name: "Alice", age:25 },
        { name: "Bob", age:30 },
        { name: "Charlie", age:35 },
    ]);

    // Derived State in React.js - dependent on other state or props.
    const userCount = users.length;
    const averageAge = users.reduce((acc, user) => acc + user.age, 0)/users.length;

  return (
    <div>
      {users.map((user, index) => (
        <li key={index}>
            {user.name} - {user.age} years old
        </li>
      ))}

      <h3>Average Age of all the users is : {averageAge.toFixed(2)}</h3>
      {/* toFixed() method helps us to limit the decimal places. */}

      <h2>Total Users - {userCount}</h2>
    </div>
  )
}

export default DerivedState
