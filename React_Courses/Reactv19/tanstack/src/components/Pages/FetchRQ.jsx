import React, { useState } from 'react'
import { deletePost, fetchPosts, updatePost } from '../../api/api'
import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { NavLink } from 'react-router-dom';

const FetchRQ = () => {

  const [pageNumber, setPageNumber] = useState(0);
  const queryClient = useQueryClient();

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
    // queryKey: ['posts'],
    // Pagination
    queryKey: ['posts', pageNumber],

    // queryFn: getPostsData,
    // queryFn: fetchPosts,

    // Pagination
    queryFn: () => fetchPosts(pageNumber),
    placeholderData: keepPreviousData, // this will prevent the loading screen while changing pages... It will keep the previous data intact even after changing pages, and once the fresh data is loaded, it will replace the old ones

    // gcTime: 1000, // ms; default -> 5 min
    // staleTime: 5000, // ms; default -> 0

    // Polling
    // refetchInterval: 1000, // 1000ms = 1s
    // refetchIntervalInBackground: true, // default -> false

    // when we visit other tab or when the component is unmounted, it stops sending requests... To make sure, it doesn't stops sending requests even when the component is unmounted we use 'refetchIntervalInBackground: true'
  })

  // Mutation function to delete post
  const deleteMutation = useMutation({
    mutationFn: (id) => deletePost(id),

    // delete from local cache
    onSuccess: (data, id) => {
      queryClient.setQueryData(['posts', pageNumber], (currElem) => {
        return currElem?.filter((post) => post.id != id);
      })
    },
  })

  // Mutation function to update post
  const updateMutation = useMutation({
    mutationFn: (id) => updatePost(id),

    // update in local cache
    // apiData -> response that 'updatePost(id)' returned
    // postId -> argument(s) we passed while calling this mutation function using '.mutate()'
    onSuccess: (apiData, postId) => {
      // postsData -> whole data in the cache with 'queryFn: ['posts', pageNumber]'
      queryClient.setQueryData(['posts', pageNumber], (postsData) => {
        return postsData?.map((currPost) => {
          return currPost.id === postId ? {...currPost, title: apiData.data.title} : currPost;
        })
      })
    },
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
              <NavLink to={`/rq/${id}`}>
                <p>{id}</p>
                <h2>{title}</h2>
                <p>{body}</p>
              </NavLink>
              <button onClick={() => deleteMutation.mutate(id)}>Delete</button>
              <button onClick={() => updateMutation.mutate(id)}>Update</button>
            </li>
          })
        }
      </ul>

      <div>
        <button disabled={pageNumber === 0} onClick={() => setPageNumber((prev) => prev - 3)}>Prev</button>

        {pageNumber/3 + 1}

        <button disabled={!data || data.length < 3} onClick={() => setPageNumber((prev) => prev + 3)}>Next</button>

        {/* 
        data.length < 3: If the current API response returns fewer items than the page limit (e.g., 1 or 2 items on the last page, or 0 items), it means there are no more posts available, so the button is disabled.

        !data: Prevents runtime errors if data is still undefined or null.
        */}
      </div>
    </div>
  )
}

export default FetchRQ
