import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import MainLayout from './components/Layouts/MainLayout'
import Home from './components/Pages/Home'
import FetchOld from './components/Pages/FetchOld'
import FetchRQ from './components/Pages/FetchRQ'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// create a router
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/trad",
        element: <FetchOld />
      },
      {
        path: "/rq",
        element: <FetchRQ />
      }
    ]
  },
])

const App = () => {

  const queryClient = new QueryClient();

  return (
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router}></RouterProvider>
  </QueryClientProvider>
  );
}

export default App
