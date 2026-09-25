// Video 8 - 11

import React, { Fragment } from "react";

// What is a ReactJS Component?
// In React, a component is essentially a JavaScript function or class that returns JSX (JavaScript XML), a syntax extension that allows you to write HTML-like code inside JavaScript. Components are the building blocks of any React application, allowing for the creation of complex and interactive user interfaces through the assembly of isolated, reusable pieces/code.

// Two ways to craete components in ReactJS:
//    Class Based Components
//    Functional Components  (recomended)

const App = () => {
  // A component cannot return multiple elements

  // Why can't we return multiple elements at the same time without a wrapper div or Fragment?
  // As after JSX is compiled it is converted to normal JavaScript Object, you can't return muliple JavaScript Object at the same time
  // JavsScript doesn't allow functions to return multiple values

  // We can also write the below code to return multiple elements:
  // We shall pass keys to list elements in JSX.

  // return [<NetflixSeries key="1" />, <NetflixSeries key="2" />, <NetflixSeries key="3" />];
  
  // OR
  // We generally use Fragments <></>. We can write these Fragments in the following ways:
  // 1.   <></>  --> This is the shorthand and we use this mostly. It is called the 'Syntactical Sugar Format'
  // 2.   <React.Fragment></React.Fragment>
  // 3.   <Fragment></Fragment>

  return (
    <>
      <NetflixSeries />
      <NetflixSeries />
      <NetflixSeries />
    </>
  );
};


// For normal functions we use camelCase but for Components we use PascalCase or kebab-case naming convention

// Creating a Component. So we have used PascalCase naming convention. We can also use kebab-case for Components
const NetflixSeries = () => {
  const name = "Queen Of Tears";
  const rating = "8.5";
  const summary = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Non nisi iure quia soluta in quo officia aliquam tenetur repudiandae. Officiis, esse magni optio dolor qui dolore eligendi laboriosam quas, labore eum laudantium, assumenda aspernatur. Aut!";

  // We can also use arrow functions too
  function returnGenre(){
    const genre = "RomCom";
    return genre;
  }

  return (
    <div>
      <div>
        {/* If any file is present in the 'public' folder then we can directly access it like below: */}
        <img src="everest.jpg" alt="mount everest" width="40%" height="40%" />
      </div>

      {/* hahaha!!! Bit confusing right??? */}
      {/* <h2>Name: {(() => <p>Queen of Tears</p>)()}</h2> */}

      <h2>Name: {name}</h2>
      <h3>Rating (Variables): {rating}</h3>

      {/* Writing JavaScript expressions */}
      {/* JavaScript Expressions - A JavaScript expression is any valid piece of code that produces a value when evaluated. Expressions can be used in assignments, function calls, JSX, conditions, and more. */}
      {/* We can write any type of expresssions here */}
      <h3>Rating (Expressions): {2+5.5}</h3>
      <p>
        <b>Summary: </b> {summary}
      </p>
      <p>
        {/* Using Function Calls to show dynamic values */}
      <b>Genre: </b> {returnGenre()}
      </p>
    </div>
  );
};


export default App

