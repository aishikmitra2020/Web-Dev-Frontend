// proptypes --> a mechanism that ensures that the passed value is of the correct datatype
// Ex- age: PropTypes.number

// defaultProps --> default values for props in case they are nor passed from the parent component
// Ex- name: "Guest"

import PropTypes from 'prop-types'

function Student(props){
    return(
        // In jsx, we use 'className' instead of 'class' to set any class to a html element because class is a reserved keyword
        <div className="student">
            <p>Name: {props.name}</p>
            <p>Age: {props.age}</p>
            {/* Booleans (true / false) are valid JavaScript values, but React ignores them when rendering. They do not get converted to "true" or "false" (string) automatically. */}
            {/* Boolean is not a string so its not directly getting displayed. There are several ways to get is displayed: */}
            {/* <p>Student: {props.isStudent.toString()}</p> */}
            <p>Student: {props.isStudent ? "Yes" : "No"}</p>
        </div>
    );
}

// It will issue a warning in the console if the props are not of the given types. It helps in debugging. It won't stop our application from running
// We can set the data type of the props, can define any field is required or not and many more
Student.propTypes = {
    name: PropTypes.string,
    age: PropTypes.number,
    isStudent: PropTypes.bool.isRequired,
}

Student.defaultProps = {
    name: "Guest",
    age: 0,
    isStudent: false,
}

export default Student