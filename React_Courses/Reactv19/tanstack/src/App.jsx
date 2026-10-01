import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import MainLayout from './components/Layouts/MainLayout'
import Home from './components/Pages/Home'
import FetchOld from './components/Pages/FetchOld'
import FetchRQ from './components/Pages/FetchRQ'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import FetchIndv from './components/UI/FetchIndv'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import InfiniteScroll from './components/Pages/InfiniteScroll'
import InfiniteScroll2 from './components/Pages/InfiniteScroll2'

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
      },
      {
        path: '/rq/:id',
        element: <FetchIndv />
      },
      {
        path: '/infinite',

        // element: <InfiniteScroll />, // traditional infinite scroll using window scroll event listener

        element: <InfiniteScroll2 />, // infinite scroll using 'react-intersection-observer'
      }
    ]
  },
])

const App = () => {

  const queryClient = new QueryClient();

  return (
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router}></RouterProvider>
    <ReactQueryDevtools initialIsOpen={true} />
  </QueryClientProvider>
  );
}

export default App
