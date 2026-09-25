import { useState } from "react";

// How to update the state of objects in React

function MyComponent(){
    const [car, setCar] = useState({year: new Date().getFullYear(),
                                    make: "Ford",
                                    model: "Mustang"});

    function handleYearChange(event){
        // What it does?
        // It will set a object. At first it will spread add the items in the car object due to the spread operator '...car' and then it will add the year property to the object. We know that JS doesn't allow duplicate keys in a object. So, as the 'year' property is written after the '...car' thus it will overwrite the previous year property
        // setCar({...car, year: event.target.value});

        // It is always a good practice to use updater function
        // It ensures that we are working with the previous state not the current state
        setCar(c => ({...c, year: event.target.value}));
    }
    function handleMakeChange(event){
        setCar(c => ({...c, make: event.target.value}));
    }
    function handleModelChange(event){
        setCar(c => ({...c, model: event.target.value}));
    }

    return(
        <div>
            <p>Your favourite car is: {car.year} {car.make} {car.model}</p>

            {/* The event object is provided to us by the onChange event handler */}
            <input type="number" value={car.year} onChange={handleYearChange} /> <br/>
            <input type="text" value={car.make} onChange={handleMakeChange} /> <br/>
            <input type="text" value={car.model} onChange={handleModelChange} /> <br/>
        </div>
    );
}

export default MyComponent;