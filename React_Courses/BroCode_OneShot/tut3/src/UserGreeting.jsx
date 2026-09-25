import PropTypes from "prop-types";

// conditional rendering --> allows you to control what gets rendered in your application based on certain conditions (show, hide, or change components)

// Two Ways :-

// function UserGreeting(props){
//     if(props.isLoggedIn){
//         return <h2>Welcome, {props.username}</h2>
//     }
//     return <h2>Please log in to continue</h2>
// }

function UserGreeting(props){
    // Using ternary operators
    const welcomeMessage = <h2 className="welcome-message">Welcome, {props.username}</h2>
    const loginPrompt = <h2 className="login-prompt">Please Login to continue</h2>
    return(
        // props.isLoggedIn ? <h2 className="welcome-message">Welcome, {props.username}</h2> : <h2 className="login-prompt">Please Login to continue</h2>
        
        props.isLoggedIn ? welcomeMessage : loginPrompt
    );
}

UserGreeting.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
    username: PropTypes.string,
};

UserGreeting.defaultProps = {
    isLoggedIn: false,
    username: "Guest",
};


export default UserGreeting