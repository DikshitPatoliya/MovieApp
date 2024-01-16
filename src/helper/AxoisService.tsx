import axios from "axios"

const BASE_URL = 'https://api.themoviedb.org/3/'
export const IMAGE_URL = 'https://image.tmdb.org/t/p/w500'

const gptAxiosClient = axios.create({
    headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzM2M2ZGM2ZjdlNTdiOGE1ZGViOTliMjY2M2U5MDVkYiIsInN1YiI6IjY1YTYzYjYxYTZkZGNiMDEyYWMwYzZiNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7MYNqwbBFnupc1HBG1fP5xaVWTgak0Jya7b1QkfHyGQ',
        'Content-Type': 'application/json',
    },
});


export const getMovieList = async (endpoint: string) => {
    try {
        const res = await gptAxiosClient.get(BASE_URL + endpoint)
        return res?.data;
    } catch (err: any) {
        return err;
    }
}