// click event --> An interaction when a user clicks on a specific element.
//                 We can respond to clicks by passing a callback to the 'onClick' event handler

function Button(){
    const handleClick = () => console.log("Clicked!!!")
    const handleClick2 = (name) => console.log(`Button clicked by ${name}`)

    let count = 0;
    const handleClick3 = (name) => {
        if(count < 3){
            count++;
            console.log(`${name} you clicked me ${count} time/s`);
        }
        else{
            console.log(`${name} stop clicking me`)
        }
    }

    // const handleClick4 = (e) => console.log(e)
    const handleClick4 = (e) => e.target.textContent = "Owchh 🤕"

    return(
        <>
            {/* Here, 'handleClick' is a callback function */}
            <button onClick={handleClick}>Click me 👍</button>

            {/* Calling a function with arguments */}
            {/* If we write 'handleClick2("Aishik")' directly then it will invike the function right away, so, we have used a arrow function to prevent that. (that arrow function will be called when the button is clicked or when that event will get triggered) */}
            <button onClick={()=>handleClick2("Aishik")}>Click me2 👍</button>

            <button onClick={()=>handleClick3("Aishik")}>Click me3 👍</button>

            {/* The onClick by deafult gives a event parameter which is a object and by which we can access the details of that event */}
            <button onClick={(e)=>handleClick4(e)}>Click me4 👍</button>

            {/* onDoubleClick event handler */}
            <button onDoubleClick={(e)=>handleClick4(e)}>Click me5 👍</button>
        </>
    );
}

export default Button