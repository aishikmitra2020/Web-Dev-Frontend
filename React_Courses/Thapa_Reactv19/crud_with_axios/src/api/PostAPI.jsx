import axios from "axios";

const api = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com",
})

// GET Method
export const getPost = () => {
    const res = api.get('/posts'); // returns a promise. we don't need to add await here

    return res;
}

// DELETE Method
export const deletePost = (id) => {
    return api.delete(`/posts/${id}`);
}

// POST Method
export const postData = (post) => {
    return api.post("/posts", post)
}

// PUT Method; update
export const updateData = (id, post) => {
    return api.put(`/posts/${id}`, post);
}