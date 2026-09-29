import React, { useEffect, useState } from 'react'
import { deletePost, getPost } from '../api/PostAPI';
import Form from './Form';

const Posts = () => {

    const [data, setData] = useState([]);
    const [updateDataApi, setUpdateDataApi] = useState({});

    const getPostData = async () => {
        const res = await getPost();
        console.log(res.data)
        setData(res.data);
    }

    useEffect(() => {
        getPostData();
    }, [])

    // function to delete Post
    const handleDeletePost = async (id) => {
        try {
            const res = await deletePost(id);
            console.log(res)

            // updating state variable
            if (res.status === 200) {
                const newUpdatedPosts = data.filter((currPost) => {
                    return currPost.id != id;
                })
                setData(newUpdatedPosts)
            } else {
                console.log("Failed to delete post, ", res.status)
            }

        } catch (err) {
            console.log(err)
        }
    }

    // function to update post
    const handleUpdatePost = (currElem) => setUpdateDataApi(currElem);

    return (
        <>
        <section>
            <Form data={data} setData={setData} updateDataApi={updateDataApi} setUpdateDataApi={setUpdateDataApi} />
        </section>
        <section>
            <ul>
                {
                    data.map((currElem, index) => {
                        const { id, body, title } = currElem;
                        return <li key={id}>
                            <p>{title}</p>
                            <p>{body}</p>
                            <button onClick={() => handleUpdatePost(currElem)}>Edit</button>
                            <button onClick={() => handleDeletePost(id)}>Delete</button>
                        </li>
                    })
                }
            </ul>
        </section>
        </>
    )
}

export default Posts
