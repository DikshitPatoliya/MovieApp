import AsyncStorage from "@react-native-async-storage/async-storage"
import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { persistReducer, persistStore } from 'redux-persist'
import logger from 'redux-logger'
import movieListSlice from "./slice/movieListSlice"

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
}

const rootReducers = combineReducers({
    movieReducers: movieListSlice
})

const persistedReducer = persistReducer(persistConfig, rootReducers)
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware: any) => __DEV__ ?
        getDefaultMiddleware({
            serializableCheck: false
        }).concat(logger) : getDefaultMiddleware()
})
export const persistor = persistStore(store)
export type RootState = ReturnType<typeof store.getState>;
