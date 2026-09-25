import React, { useId } from 'react'

// const tut1 = () => {
//   const usernameId = useId();
//   const emailId = useId();

//   return (
//     <form>
//       <div>
//         <label htmlFor={usernameId}>username</label>
//         <input type="text" id={usernameId} name="username" />
//       </div>
//       <div>
//         <label htmlFor={emailId}>email</label>
//         <input type="email" id={emailId} name="email" />
//       </div>
//       <button type="submit">Submit</button>
//     </form>
//   )
// }


// Applying DRY Principle( Do not Repeat Yourself )
// This lets you avoid calling useId for every single element that needs a unique ID.
const tut1 = () => {
  const id = useId();

  return (
    <form>
      <div>
        <label htmlFor={id + "username"}>username</label>
        <input type="text" id={id + "username"} name="username" />
      </div>
      <div>
        <label htmlFor={id + "email"}>email</label>
        <input type="email" id={id + "email"} name="email" />
      </div>
      <button type="submit">Submit</button>
    </form>
  )
}



export default tut1
