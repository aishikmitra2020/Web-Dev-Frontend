import React from 'react'

function EventProps(){

    const handleWelcomeUser= (user) => {
        alert(`Welcome ${user}!`);
    }

    const handleHover= () => {
        alert(`Thanks for hovering me!`);
    }

    return (
        <>
        {/* We can use other names in place of 'onClick', 'onMouseEnter'. We have used this for ease of understanding. */}
        <WelcomeUser onClick={() => handleWelcomeUser("vinod")} onMouseEnter={handleHover} />
        </>
    )
}

function WelcomeUser(props){

    const handleGreeting = () => {
        alert("Hello from handleGreeting!");

        // Calling the function (passed as a props) again
        props.onClick();
    }

    return <>
    <button onClick={props.onClick} className='p-5 bg-green-500 m-2'>Click</button>
    <button onMouseEnter={props.onMouseEnter} className='p-5 bg-green-500 m-2'>Hover me</button>
    <button onClick={handleGreeting} className='p-5 bg-green-500 m-2'>Greeting</button>
    </>
}

export default EventProps
