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


