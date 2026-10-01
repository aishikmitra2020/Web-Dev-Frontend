import React from 'react'

// Interview Question

const Practices = () => {
    const students = [];

    return (
        <>
        {/* Output of the below code */}
        <p>{students.length && "No students found"}</p>

        {/*
        Output - 0. Reason:
        
        If all the operand is true then it will return the value of the last operand, but here:
        students.length is 0 and 0 means false. Thus, it returns 0

        If the first operand becomes false, then it will not even check the other operands

        React does not render `false`, `null`, `undefined`, or `NaN` in the DOM. These values, when used in JSX, will result in nothing being displayed.

        However, `0` and empty strings ('""') are exceptions (means these will be displayed):
        */}

        {/* Solution for this problem */}
        {/* 1st */}
        <p>{students.length === 0 && "No students found"}</p>
        {/* If 'students.length === 0' is true then it will return "No students found" otherwise it will do nothing */}

        {/* 2nd */}
        <p>{!students.length && "No students found"}</p>

        {/* 3rd */}
        <p>{!Boolean(students.length) && "No students found"}</p>
        {/* <p>{Boolean(!students.length) && "No students found"}</p> */}

        {/* 4th */}
        <p>{students.length || "No students found"}</p>
        {/* It will return the length of the array if it is not 0 */}

        <p>Number of students: {students.length}</p>
        </>
    );
};

export default Practices
