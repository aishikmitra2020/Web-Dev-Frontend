// Video 11 - 13 (including 11 and 13)

import React from 'react'

// Default Export
// import NetflixSeries from './components/NetflixSeries';

// Named Export
// Since named exports act as properties of an object, we must use destructuring syntax (curly braces {}) when importing:
// For more info chk 'source.md'
// import { NetflixSeries } from './components/NetflixSeries';

// Mixed Import Export
// While importing default exports we do not need 'NetflixSeries'. So it is the default export and others are named export which we are importing here
import NetflixSeries, { Header, Footer } from './components/NetflixSeries';

const App = () => {
  {/*    
      Conditionals in JSX (JavaScript XML)
      We cannot write if else statements directly inside the JSX
      So, we have to use the either of the followin ways:
      1.     Ternery Operators
      2.     Short-Circuit Evaluation (using &&)
      3.     Short-Circuit Evaluation (using ||)
      4.     Wrap the whole return statement inside if else block - this violates DRY (Do Not Repeat Yourself) principle
  */}

  let age = 52;
  let canWatch = "Not Available";

  if (age >= 18) canWatch = "Watch Now";

  const canWatch2 = () => {
    if (age >= 18) return "Watch Now";
    return "Not Available";
  }
  
  // Wrapping the whole return statement inside if else block (violates DRY principle)

  // if (age < 18){
  //   return <h1>You are not 18. You cannot vote</h1>;
  // }
  // // We can also use a else statement
  // return <h1>You are 18 or above. So, you can vote</h1>
  
  return (
    <>
      {/* TERNERY OPERATOR */}
      <button>{age >= 18 ? "Watch Now" : "Not available"}</button>

      <button>{canWatch}</button>
      <button>{canWatch2()}</button>

      {/* Short-Circuit Evaluation (using &&) */}
      <button>{age >= 18 && "You can vote"}</button>
      
      <Header />
      <NetflixSeries />
      <NetflixSeries />
      <NetflixSeries />
      <NetflixSeries />
      <Footer />
    </>
  )
}

export default App
