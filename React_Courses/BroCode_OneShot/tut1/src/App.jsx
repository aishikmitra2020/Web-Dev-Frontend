import React from 'react';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
// We may or not write the extension of jsx(.jsx) in import statement.
import Food from './Food';

function App() {
  return(
    // React can return a single element only. But it can have numerous child components.
    // But to render multiple components we use <></>. This is known as fragment.
    // We can also give this fragment a name using React.Fragment like <React.Fragment></React.Fragment>
    <>
      {/* Using our components - two methods */}
      {/* <Header></Header> */}
      
      {/* It is the shorthand for the above line */}
      <Header/>
      <Food/>
      <Food/>
      <Footer/>
    </>
  );
}

export default App
