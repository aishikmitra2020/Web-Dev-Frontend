import { useState } from "react";

// How to update the state of an Array in React

function MyComponent2(){
    // Using Array destructuring
    // Here, foods is the state variable
    const [foods, setFoods] = useState(["Apple", "Orange", "Banana"]);

    function handleAddFood(){
        const newFood = document.getElementById("foodInput").value;
        document.getElementById("foodInput").value = "";

        // setFoods([...foods, newFood]);

        setFoods(c => [...c, newFood]);
    }

    function handleRemoveFood(index){
        // We generally use '_' to ignore such variables or parameters. This convention is also in python
        setFoods(foods.filter((_, i) => i !== index));
    }

    return(
        <div>
            <h2>List of Food</h2>
            <ul>
                {foods.map((food, index) => <li onClick={()=>handleRemoveFood(index)} key={index}>{food}</li>)}
            </ul>
            <input type="text" id="foodInput" placeholder="Enter food name" />
            <button onClick={handleAddFood}>Add Food</button>
        </div>
    );
}

export default MyComponent2;