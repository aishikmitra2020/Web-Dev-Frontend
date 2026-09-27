import React from 'react'
import { NavLink, useNavigate, useRouteError } from 'react-router-dom'

const ErrorPage = () => {
    const navigate = useNavigate();

    // get the details of the error
    const error = useRouteError();
    console.log(error);

    const handleGoBack = () => {
        navigate(-1); // redirect to the prev route

        // useNavigate('/about'); // redirect to a specific route
    }

    if(error.status === 404) {
        return (
            <section>
                <h1>404 Not Found</h1>
                <p>{error.error.message}</p>

                {/* <NavLink to="/">Go back to home</NavLink> */}
                <button onClick={handleGoBack}>
                    Go Back
                </button>

            </section>
        );
    };

  return (
    <div>
      <h1>{error.status}</h1>
      <p>{error.error.message}</p>
    </div>
  )
}

export default ErrorPage
