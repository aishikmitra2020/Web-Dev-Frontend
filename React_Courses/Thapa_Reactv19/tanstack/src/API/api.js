import axios from "axios";

const api = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com"
})

// GET data
// export const getPosts = () => {
//     const res = api.get('/posts');

//     return res;
// }

export const fetchPosts = async () => {
    try {
        const res = await api.get('/posts');
        return res.status === 200 ? res.data : [];
    } catch (error) {
        console.error("Error fetching posts:", error);
    }
}