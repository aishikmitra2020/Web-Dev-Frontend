import React from 'react'

// We are using traditional function, because, it supports hoisting

function Profile() {
  return (
    <div>
      <h1>Profile Card Challenge</h1>

      {/* We can only pass strings without curly braces. For any other data type except string, we have to use curly braces {} */}
      <ProfileCard
      name="Alice"
      age={30}
      greeting={
        <div>
            <strong>Hi Alice, have a wonderful day!</strong>
        </div>
      }
      >
        {/* These below html elements is known as 'children' and we can access these elements using 'props.children', it is discussed below! */}
        <p>Hobbies: Reading, Hiking</p>
        <button>Contact</button>
      </ProfileCard>

      <ProfileCard
      name="Bob"
      age={25}
      greeting={
        <div>
            <strong>Good Job Bob, Keep it up!</strong>
        </div>
      }
      >
        {/* These below html elements is known as 'children' and we can access these elements using 'props.children', it is discussed below! */}
        <p>Hobbies: Cooking, Cricket</p>
        <button>Contact</button>
      </ProfileCard>
    </div>
  )
}

export default Profile

// function ProfileCard({ name, age, greeting, children }){}
// function ProfileCard(props){}

// Passing Default Prop values
function ProfileCard({ name="John Doe", age=0, greeting="Hi", children }){

    // const { name, age, greeting, children } = props;

    // Note: The name 'children' is fixed and we can use it with that name only, we cannot use other name in place of it.
    return (
        <>
        <h2>Name: {name}</h2>
        <p>Age: {age}</p>
        <h2>{greeting}</h2>

        {/* Note: The name 'children' is fixed and we can use it with that name only, we cannot use other name in place of it. */}

        {/* <div>{props.children}</div> */}
        <div>{children}</div>
        </>
    )
}
