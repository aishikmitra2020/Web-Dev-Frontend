// HOW TO STYLE REACT COMPONENTS WITH CSS (NOT INCLUDING EXTERNAL FRAMEWORKS AND PREPROCESSORS)
// -----------------------------------------
// 1. EXTERNAL -- index.css (global css) --> small projects
// 2. MODULES --> Individual componenets with unique styles
// 3. INLINE --> Small componenets with minimal styling

// props -->  read-only properties that are shared between components.
//            A parent  component can send the data to a child component.
//            A data is sent and recieved in form of objects.
//            <Component key==value />

// proptypes --> a mechanism that ensures that the passed value is of the correct datatype
// Ex- age: PropTypes.number


import Card from "./Card"
import Button from "./Button/Button";
import Student from "./Student.jsx";

function App() {
  return(
    <>
      {/* <Card /> */}
      {/* <Button /> */}

      {/* Here, 'name' is the key and the "Spongebob" is the value */}
      {/* If the value is string, we needn't use any surrounding curly braces {} but if it is integer, object or any Non-String data type, we have to enclode it within the {} */}
      <Student name="Spongebob" age="28" isStudent={true} />
      <Student name="Bro Code" age={30} isStudent={false} />
      <Student name="Aishik" age={16} isStudent={true} />
      <Student name="Mosh" age={42} isStudent={false} />
      <Student />

      {/* The above components are the parent componenst and the components in the files are the child components */}
    </>
  );
}

export default App
