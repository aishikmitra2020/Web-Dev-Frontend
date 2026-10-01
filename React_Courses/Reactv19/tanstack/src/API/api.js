import axios from "axios";

const api = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com"
})

// GET data
// export const getPosts = () => {
//     const res = api.get('/posts');

//     return res;
// }

// export const fetchPosts = async () => {
//     try {
//         const res = await api.get('/posts');
//         return res.status === 200 ? res.data : [];
//     } catch (error) {
//         console.error("Error fetching posts:", error);
//     }
// }

export const fetchIndvPost = async (id) => {
    try{
        const res = await api.get(`/posts/${id}`);
        return res.status === 200 ? res.data : [];
    } catch (err) {
        console.log(err)
    }
}

// Pagination
export const fetchPosts = async (pageNumber) => {
    try {
        const res = await api.get(`/posts?_start=${pageNumber}&_limit=3`);
        return res.status === 200 ? res.data : [];
    } catch (error) {
        console.error("Error fetching posts:", error);
    }
}

// useMuatation; del a post
export const deletePost = (id) => {
    console.log("hello")
    return api.delete(`/posts/${id}`)
}

// update a post
export const updatePost = (id) => {
    return api.patch(`/posts/${id}`, {title: "I have updated"});
}


// Infinite Scrolling
export const fetchUsers = async ({ pageParam = 1 }) => {
    try {
        const res = await axios.get(
            `https://api.github.com/users?per_page=10&page=${pageParam}`
        )

        return res.data;
    } catch(error) {
        console.log(error);
    }

}