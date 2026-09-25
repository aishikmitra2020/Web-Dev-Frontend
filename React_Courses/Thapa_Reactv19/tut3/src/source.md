## Looping in JSX
* We don't have loops (for loops, while loops, do while loops) in JSX. So, we have to use 'map()' method of arrays for looping in JSX

* We have to pass unique 'key' to all the list elements. Like - <li key={element.id}>{element}</li>

* Uses of this unique key that is assigned to every list elements:

1. Optimized Re-rendering (Diffing Algorithm):
    *    React compares the old and new lists and efficiently updates only the changed items instead of re-rendering the entire list.

    *   Without a 'key', if the order of the elements changes then react can't keep a track of it and may be it will render the wrong thing

    *   Without a unique key, React may re-render everything, causing performance issues.

2. Preserving Component State:
    *   If a component inside a list (like an input field) has state, React uses the key to track it.

    *   Without keys, React may reset the state when the list updates.

3. Minimizing Unnecessary DOM Changes:
    *   Helps React identify which elements are added, removed, or reordered.

    *   Prevents unnecessary mounting and unmounting.


React Props (Properties)
*   React props (properties) facilitate data transfer from parent to child components.

*   Data flows unidirectionally, ensuring a clear direction of information in React applications.

*   Props are immutable, meaning child components cannot modify the data received from parents.

*   Child components access props through their function parameter

*   You can also pass JSX as props to another component.

*   In React, props are always passed as objects from parent to child components. This means that when you pass a prop, it is accessible as an object inside the child component.



## Styling (Adding CSS)
## Inline Styles
*   Inline styles are applied directly to the HTML elements via the style attribute. This approach uses JavaScript objects to define the CSS properties and values.

1. JavaScript Object Syntax
*   Inline styles in React are specified using JavaScript objects. Property names are written in camelCase instead of the traditional CSS kebab-case.

*   const style = { backgroundColor: 'blue', fontSize: '16px', };

2. Units
*   For most numeric values, you need to specify units as a string (e.g., '16px'). Some properties, like zIndex, can take numeric values directly.

const style = { padding: '10px', zIndex: 1, };

3. Performance Considerations
*   Defining inline styles directly within the JSX can lead to performance issues because a new object is created on every render. To avoid this, define styles outside of the render method or as constants.

*   const buttonStyle = { backgroundColor: 'blue', color: 'white', };

*   function MyButton() { return Click Me; }

## CSS conditional stylings in React js
You can use ternary operators to add conditional stylings to your CSS.

## Applying Padding in Tailwind
*   Here are both approaches:

## Extended Spacing Scale:
*   If you've extended the spacing scale, you can use the custom classes:

*   Content
## Arbitrary Values:
*   You can use arbitrary values directly:


## CSS Modules
*   Every time you import a CSS file in your react component, they are regarded as global CSS.

*   CSS Modules help you keep styles specific to the component they're used in.

*   Each module encapsulates its styles, preventing unintended style conflicts with other modules.

*   The class names in CSS modules are often automatically generated (hashed) reducing the likelihood of naming clashes

*   Every class name gets converted into a unique class name

# CSS Modules - Rules to keep in mind
*   Name your CSS module files with .module.css or .module.scss extension

*   Import the CSS module file in your React component. Access class names as properties of the imported styles object.

*   Access the class names as properties of the imported styles object

*   Combine multiple class names using template literals or the class library

*   Dynamically apply class names based on component state and props

# How CSS Modules Work in React
These CSS modules also gets dynamically injected to the <head> tag of the index.html (root html) as inline css using <style> tag not

CSS Modules allow you to write styles scoped to a specific component, preventing them from affecting other components globally. This is particularly useful in large applications where style conflicts can be a problem.

# How CSS Modules Are Injected in React (with Vite/Webpack)
1.  CSS Modules are dynamically injected as <style> tags inside <head> by the bundler.

*   Vite/Webpack processes the .module.css file and generates scoped class names.

*   The resulting styles are inserted into <head> as inline <style> tags.

2.  No separate CSS file in <link>

*   Unlike global CSS (import './global.css'), CSS Modules are not loaded as separate .css files via <link>.

*   They exist only in JavaScript memory and are injected dynamically when the component mounts.

* Example:
/* styles.module.css */
.button {
  background-color: blue;
  color: white;
}

import styles from "./styles.module.css";

function MyButton() {
  return <button className={styles.button}>Click Me</button>;
}


// index.html
<style>
  .styles_button__3Xyz1 {
    background-color: blue;
    color: white;
  }
</style>

# Note: All these transformation in class names and adding these stuffs are done by the bundler


# How they work?
1.  Create a CSS Module File

Instead of a regular .css file, you create a file with the .module.css extension:

/* styles.module.css */
.button {
background-color: blue;
color: white;
padding: 10px 20px;
border-radius: 5px;
}

2.  Import the Module in Your React Component

import styles from "./styles.module.css";

function MyButton() {
  return <button className={styles.button}>Click Me</button>;
}

export default MyButton;

# Why Styles Are Not Applied Globally?
When you import a CSS Module, React (or your bundler, like Vite or Webpack) transforms the class names into unique, locally scoped identifiers.

For example, .button might be transformed into .styles_button__3Xyz1.

This means that styles defined in one module won't affect elements in other components unless explicitly imported.

# How This Prevents Global Styles:

Unlike traditional CSS where classes are global, CSS Modules scope styles only to the file where they are imported.

This avoids conflicts where multiple components have the same class names but different styles.


## How CSS (not modules) Works in JSX?
# in Webpack (outdated)
1. Importing CSS in a Component
*   import "./Netflix.css";
*   Webpack recognizes this import and processes Netflix.css.

2. Webpack Uses Loaders to Process CSS
Webpack doesn’t understand CSS natively—it only understands JavaScript. So, Webpack uses loaders to handle CSS.

The most common loaders used for processing CSS in Webpack are:
*   style-loader: Injects CSS directly into the <head> of the document.

*   css-loader: Allows JavaScript to import CSS files as modules.

When Webpack sees the CSS import, it:
*   Uses css-loader to read the contents of Netflix.css.

*   Uses style-loader to inject the styles into the DOM by creating a <style> tag.


3.  Webpack Adds CSS to the Global Scope
After processing, Webpack generates a JavaScript bundle that dynamically inserts a <style> tag into the <head> of the HTML file.

const styles = ".card { background-color: red; }";

// Webpack dynamically creates a <style> tag in the <head> of the HTML file
const styleTag = document.createElement("style");
styleTag.innerHTML = styles;
document.head.appendChild(styleTag);

# Note: Webpack and Vite doesn't works in the same way and Vite doesn't have 'style-loader' and 'css-loader' instead Vite processes CSS automatically.

# Vite and Webpack (now outdated) both are React Bundlers

# What are Bundlers?
*   A bundler is a tool that takes multiple files and dependencies in a project (JavaScript, CSS, images, etc.) and combines them into optimized files for better performance and faster loading in a browser.

## Summary:
*   When we import any css file (not modules), that css file gets added as stylesheet using <link> tag in the head of the index.html file (root html file) by the bundler.


