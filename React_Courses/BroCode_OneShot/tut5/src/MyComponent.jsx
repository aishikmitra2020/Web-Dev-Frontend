import {useState} from "react" // It uses object destructuring to only take out the 'useState' from the whole React library

function MyComponent(){
    // 'useState()' function returns an array with two elements. First, the stateful variable and another is the setter function that helps in setting the value of that stateful variable
    // '[]' helps in array destructuring and taking out those two variables.
    const [name, setName] = useState();
    // 'name' name is the stateful variable and the 'setName' is the setter function that helps in setting the value of 'name' variable
    // When we use setter function of a stateful variable to set the value of the varible it triggers a re-render in the Virtual DOM. But Normal Variables don't and that's why we cannot see the updated values of those variables in the DOM or in the UI

    // Our component re-renders due to some changes in the state and the props

    // With this useState hook, we can pass a initial state
    const [x, setX] = useState("Guest");

    const [age, setAge] = useState(0); // We have set the iinitial value to be 0

    const [isEmployed, setIsEmployed] = useState(false); // seting the initial value to be false

    const upddateName = () => {
        setName("songebob");
        setX("songebob");
    }

    const incrementAge = () => {
        setAge(age + 2);
    }

    const toggleEmployedStatus = () => {
        setIsEmployed(!isEmployed)
    }

    return(
        <div>
            <p>Name: {name}</p>
            <p>Designation: {x}</p>
            <button onClick={upddateName}>Set Name</button>

            <p>Age: {age}</p>
            <button onClick={incrementAge}>Increment Age</button>

            <p>Is employed: {isEmployed ? "Yes" : "No"}</p>
            <button onClick={toggleEmployedStatus}>Toggle Status</button>
        </div>
    );

}

export default MyComponent