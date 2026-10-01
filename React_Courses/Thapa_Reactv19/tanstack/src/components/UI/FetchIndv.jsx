import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { fetchIndvPost } from '../../api/api';

const FetchIndv = () => {

    const { id } = useParams();

    const { data, isPending, isError, error } = useQuery({
        queryKey: ["post", id], // the queryFn will also be called when 'id' changes
        queryFn: () => fetchIndvPost(id),
    })

    if (isPending) return <p>Loading...</p>
    if (isError) return <p>Error: {error.message || "Something went wrong!"}</p>

  return (
    <div>
      <p>{data.id}</p>
      <h2>{data.title}</h2>
      <h2>{data.body}</h2>

      <NavLink to='/rq'>
        <button>
            Go Back
        </button>
      </NavLink>
    </div>
  )
}

export default FetchIndv
