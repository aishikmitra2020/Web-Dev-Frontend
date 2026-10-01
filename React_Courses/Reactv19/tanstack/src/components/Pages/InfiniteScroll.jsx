import { useInfiniteQuery } from '@tanstack/react-query'
import React, { useEffect } from 'react'
import { fetchUsers } from '../../api/api'

const InfiniteScroll = () => {

    const { data, hasNextPage, fetchNextPage, status, isFetchingNextPage } = useInfiniteQuery({
        queryKey: ['users'],
        queryFn: fetchUsers,

        getNextPageParam: (lastPage, allPages) => {
            console.log(lastPage);
            console.log(allPages);

            // lastPage -> The exact return value of the single most recent fetchUsers call.
            // allPages -> An array of all the return values from the fetchUsers calls that have been made so far.

            return lastPage.length === 10 ? allPages.length + 1 : undefined; // if the last page has 10 items, then return the next page number, else return undefined
        }
    })

    const handleScroll = () => {
        const bottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 1;

        if (bottom && hasNextPage) {
            fetchNextPage();
        }
    }

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [hasNextPage])

    if (status === "pending") return <div>Loading...</div>
    if (status === "error") return <div>Error fetching data</div>

  return (
    <div>
      <h1>Infinite Scroll with React Query</h1>

      {
        data?.pages?.map((page, index) => (
            <ul key={index}>
                {page.map((user) => (
                    <li key={user.id} style={{padding: "10px", border: "1px solid #ccc"}}>
                        <p>{user.login}</p>
                        <img src={user.avatar_url} alt={user.login} width={50} height={50} />
                    </li>
                ))}
            </ul>
        ))
      }

      {isFetchingNextPage && <div>Loading...</div>}
    </div>
  )
}

export default InfiniteScroll
