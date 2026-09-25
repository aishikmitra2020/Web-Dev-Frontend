// In jsx imports the extension is opional
import UserGreeting from "./userGreeting";
import List from "./List";
import List2 from "./List2.jsx";

function App() {
  const fruits = [{id: 1, name: "apple", calories: 95},
                  {id: 2, name: "orange", calories: 45},
                  {id: 3, name: "banana", calories: 105},
                  {id: 4, name: "coconut", calories: 159},
                  {id: 5, name: "pineapple", calories: 37}];

  const vegetables = [{id: 1, name: "potatoes", calories: 110},
                      {id: 2, name: "celery", calories: 15},
                      {id: 3, name: "carrots", calories: 25},
                      {id: 4, name: "corn", calories: 63},
                      {id: 5, name: "broccoli", calories: 50}];
  return(
    // Directly inside the return statement, we can write JS code directly. But inside the fragment <></> or any html tag we have to use {} curly braces to write JS
    // Using JSX fragments
    <>
      <UserGreeting isLoggedIn={true} username="BroCode" />
      <UserGreeting isLoggedIn={true} />

      <List />

      {/* <List2 items={fruits} category="Fruits" />
      <List2 items={vegetables} category="Vegetables" /> */}


      {/* Using Turnary operators for Conditional Rendering */}
      {/* {fruits.length > 0 ? <List2 items={fruits} category="Fruits" /> : null}
      
      {vegetables.length > 0 ? <List2 items={vegetables} category="Vegetables" /> : null} */}

      {/* Shorthand for Turnary Operators (using &&). This method is also known as short-circuiting */}
      {/* It will render if the given condiion is true unless it will do nothing */}
      {fruits.length > 0 && <List2 items={fruits} category="Fruits" />}
      {vegetables.length > 0 && <List2 items={vegetables} category="Vegetables" />}
    </>
  );
}

export default App
