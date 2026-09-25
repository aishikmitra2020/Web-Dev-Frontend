function List(){
    const fruits = ["apple", "orange", "banana", "coconut", "pineapple"]

    const fruits2 = [{id: 1, name: "apple", calories: 95},
                    {id: 2, name: "orange", calories: 45},
                    {id: 3, name: "banana", calories: 105},
                    {id: 4, name: "coconut", calories: 159},
                    {id: 5, name: "pineapple", calories: 37}];
    
    // Lexicographic Order. (it means alphabetical order)
    // Custon sorting that will sort alphabetically
    // fruits2.sort((a, b)=>a.name.localeCompare(b.name))

    // Reverse Sorting
    fruits2.sort((a, b)=>b.name.localeCompare(a.name))

    // Numeric Sorting
    // fruits2.sort((a, b) => a.calories - b.calories)

    // Reverse Numeric Sorting
    fruits2.sort((a,b) => b.calories - a.calories)

    // Filtering out the fruits of calories below 100
    const lowCalFruits = fruits2.filter(fruit => fruit.calories < 100)

    // Filtering the fruits whose calories is above 100
    const highCalFruits = fruits2.filter(fruit => fruit.calories >= 100)

    // This sort method helps us in sorting all the elements letter wise. It doesn't work with integers
    // fruits.sort();

    // const listItems = fruits.map(fruit => <li>{fruit}</li>)
    
    // In react, each listitem should have its own unique key
    // Keys tell React which array item each component corresponds to, so that it can match them up later. This becomes important if your array items can move (e.g. due to sorting), get inserted, or get deleted. A well-chosen key helps React infer what exactly has happened, and make the correct updates to the DOM tree.

    const listItems2 = fruits2.map((fruit) => <li key={fruit.id}>{fruit.name}: &nbsp; <b>{fruit.calories}</b></li>)
    // How does it work?
    // React compares the old and new list using key.
    // If a key matches, React updates that item.
    // If a key changes, React removes the old item and adds a new one.

    // return(fruits); // All the listitems will be cluttered

    return(
        <>
            {/* {fruits} */}

            {/* <ol>
                {listItems}
            </ol> */}

            <ul>
                {lowCalFruits.map(lowCalFruit => (
                    <li key={lowCalFruit.id}>{lowCalFruit.name}: &nbsp; <b>{lowCalFruit.calories}</b></li>
                ))}
            </ul>

            <ul>
                {highCalFruits.map(highCalFruit => <li key={highCalFruit.id}>{highCalFruit.name}: &nbsp; <b>{highCalFruit.calories}</b></li>)}
            </ul>

            <ol>
                {listItems2}
            </ol>
        </>
    );
}

export default List