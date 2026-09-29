import React from 'react'
import { fetchPosts } from '../../api/api'
import { useQuery } from '@tanstack/react-query';

const FetchRQ = () => {

  // const getPostsData = async () => {
  //   try {
  //     const res = await getPosts();
  //     return res.status === 200 ? res.data : [];
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  // previously -> isLoading. Now -> isPending
  const { data, isPending, isError, error } = useQuery({
    queryKey: ['posts'],
    // queryFn: getPostsData,
    queryFn: fetchPosts,
    // gcTime: 1000, // ms; default -> 5 min
    staleTime: 5000, // ms; default -> 0
  })

  if (isPending) return <p>Loading...</p>
  if (isError) return <p>Error: {error.message || "Something went wrong!"}</p>

  return (
    <div>
      <ul>
        {
          data?.map((currElem) => {
            const {title, body, id} = currElem
            return <li key={id}>
              <h2>{title}</h2>
              <p>{body}</p>
            </li>
          })
        }
      </ul>
    </div>
  )
}

export default FetchRQ
