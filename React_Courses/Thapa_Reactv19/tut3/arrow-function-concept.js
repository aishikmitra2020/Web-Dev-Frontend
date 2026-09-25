
// Without using any parenthesis of curly braces to surrond the return statement means it will return that statement by default.
// Only one line of code is accepted
const greet = () => 8*5
console.log(greet())

// When we are using {} we have to explicitly use return keyword
const add = (a,b) => {
    return a + b
}
console.log(add(4,5));

// not using () arround the parameters (accepted if there is only one parameter)
const greetName = name => `hey, ${name}`
console.log(greetName());

// Using () to return things. It is hugely used in JSX with map. Unlike {}, we do not need using return keyword here (whiel using ()), it returns by default
// Here also we cannot return multiple elements but it can be of multiple lines.
// For example, we can return a single <li> tag but not multiple elements, but yes we can use any elements inside that single <li> element. That means, all the elements should be enclosed in a single parent or a Fragment <></>
const printHello = () => (
    "Hello"
)
console.log(printHello());