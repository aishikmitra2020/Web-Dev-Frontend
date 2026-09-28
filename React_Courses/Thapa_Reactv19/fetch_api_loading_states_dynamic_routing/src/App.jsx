import React from 'react'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Contact, { contactData } from './pages/Contact'
import Characters from './pages/Characters'
import AppLayout from './components/layout/AppLayout'
import ErrorPage from './pages/ErrorPage'
import NotFound from './pages/NotFound'
import { getMoviesData } from './api/GetAPIData'
import Loader from './components/layout/Loader'
import CharacterDetails from './components/UI/CharacterDetails'
import { getCharacterDetails } from './api/GetCharacterDetails'

const App = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <AppLayout />,
      errorElement: <ErrorPage />,

      children: [
        {
          path: "/",
          element: <Home />
        },
        {
          path: '/about',
          element: <About />
        },
        {
          path: '/characters',
          element: <Characters />,

          // loader
          // HydrateFallback: ()=> <Loader />, // takes a Component Function 
          // OR
          hydrateFallbackElement: <Loader />, // takes a JSX element

          loader: getMoviesData,
        },
        {
          path: '/characters/:characterId',
          element: <CharacterDetails />,
          hydrateFallbackElement: <Loader />,
          loader: getCharacterDetails,
        },
        {
          path: '/contact',
          element: <Contact />,
          action: contactData,
        },
        // {
        //   path: '*',
        //   element: <NotFound />
        // },

      ]
    },
  ]);

  return <RouterProvider router={router} />
}

export default App
