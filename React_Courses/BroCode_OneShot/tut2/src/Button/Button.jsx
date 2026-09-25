import styles from './Button.module.css'

function Button(){
    // Adding inline styles
    // we use camelCase naming convention
    const styles1= {
        backgroundColor: "hsl(200, 100%, 50%)",
        color: "white",
        padding: "10px 20px",
        borderRadius: "5px",
        border: "none",
        cursor: "pointer",
    }

    return(
        // <button className="button">Click me!</button>

        // Webpack automatically transforms the class names into unique, hashed names, preventing conflicts.
        // <button className={styles.button}>Click me!</button>

        <button style={styles1}>
            <span>Click </span>
            {/* The outer {} tells JSX that we’re writing JavaScript.
            The inner {} contains the actual JavaScript object with styles.

            The first {} → Signals JavaScript expression inside JSX
            The second {} → Represents the actual JavaScript object containing the styles.
            */}
            <span style={{color: "yellow"}}>me!</span>
        </button>
    );
}

export default Button