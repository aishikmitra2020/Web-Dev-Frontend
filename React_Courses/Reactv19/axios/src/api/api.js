import axios from 'axios';

export const api = axios.create({
    baseURL: 'https://data.jujutsukaisenapi.site/api/v1/characters/',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
})

export const getMovie = () => {
    return api.get(""); // deafult -> base url
}