import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getMovieList } from "../../helper/AxoisService"

interface movieType {
    isLoading: boolean
    movieList: {
        results: {
            backdrop_path: string
            id: string
            title: string
            vote_average: number
            overview: string
        }[]
        total_pages: number
    }
    movieDetails: {
        backdrop_path: string
        poster_path: string
        vote_average: number | any
        original_title: string
        release_date: string
        overview: string
        spoken_languages: []
        production_companies: []
        genres: []
    } | null
    isLoadingMoreData: boolean
}

const initialState: movieType = {
    isLoading: false,
    movieList: { results: [], total_pages: 0 },
    movieDetails: null,
    isLoadingMoreData: false,
}

const MOVIE = "MOVIE"

export const requestGetMovieList = createAsyncThunk(MOVIE + "/requestGetMovieList",
    async (params: any, { rejectWithValue }) => {
        try {
            const responsee = await getMovieList(`movie/popular?language=en-IN&page=${params}`)
            return responsee
        } catch (e: any) {
            return rejectWithValue(e?.responsee)
        }
    }
)

export const requestGetMovieDetails = createAsyncThunk(MOVIE + "/requestGetMovieDetails",
    async (params: any, { rejectWithValue }) => {
        try {
            const responsee = await getMovieList(`movie/${params}?language=en-US`)
            return responsee
        } catch (e: any) {
            return rejectWithValue(e?.responsee)
        }
    }
)

export const movieListSlice = createSlice({
    name: MOVIE,
    initialState,
    reducers: {
        resetAuthReducer: (state) => {
            state.movieList = { results: [], total_pages: 0 }
            state.isLoading = false
            state.movieDetails = null
        }
    },

    extraReducers: (builder) => {
        builder.addCase(requestGetMovieList.pending, (state, action) => {
            if(action?.meta?.arg > 1){
                state.isLoadingMoreData = true
            }else{
                state.isLoading = true
            }
        })
        builder.addCase(requestGetMovieList.fulfilled, (state, action) => {
            state.isLoading = false
            state.movieList = action?.meta?.arg > 1 ?  {
                ...state.movieList,
                results: [
                   ...state.movieList.results,
                   ...action.payload.results
                ]
            } : action.payload
            state.isLoadingMoreData = false

        })
        builder.addCase(requestGetMovieList.rejected, (state) => {
            state.isLoading = false
            state.movieList = { results: [], total_pages: 0 }
            state.isLoadingMoreData = false
        })

        builder.addCase(requestGetMovieDetails.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(requestGetMovieDetails.fulfilled, (state, action) => {
            state.isLoading = false
            state.movieDetails = action.payload

        })
        builder.addCase(requestGetMovieDetails.rejected, (state) => {
            state.isLoading = false
            state.movieDetails = null
        })
    }
})

export const { resetAuthReducer } = movieListSlice.actions
export default movieListSlice.reducer