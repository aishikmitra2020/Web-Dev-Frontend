import React from 'react'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Movie from './pages/Movie'
import AppLayout from './components/layout/AppLayout'
import ErrorPage from './pages/ErrorPage'
import NotFound from './pages/NotFound'

const App = () => {

  // Latest Metod
  // const router = createBrowserRouter([
  //   {
  //     path: '/',
  //     element: <Home />
  //   },
  //   {
  //     path: '/about',
  //     element: <About />
  //   },
  //   {
  //     path: '/movie',
  //     element: <Movie />
  //   },
  //   {
  //     path: '/contact',
  //     element: <Contact />
  //   },
  // ]);

  // Old Method; createRoutesfromElements
  // const router = createBrowserRouter(
  //   createRoutesFromElements(
  //     <Route> // we may also use <></> here
  //       <Route path='/' element={<Home />} />
  //       <Route path='/about' element={<About />} />
  //       <Route path='/movie' element={<Movie />} />
  //       <Route path='/contact' element={<Contact />} />
  //     </Route>
  //   )
  // )

  const router = createBrowserRouter([
    {
      path: '/',
      element: <AppLayout />,

      // Method 1
      // When error is due to - loaders(asynchronous function attached to a route in createBrowser Router), actions(forms; createBrowserRouter) or issue while rendering the component, route rendering errors.
      // It does not catches fetch api errors in useEffect
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
          path: '/movie',
          element: <Movie />
        },
        {
          path: '/contact',
          element: <Contact />
        },

        // Method 2
        // Here the layout is maintained.
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
