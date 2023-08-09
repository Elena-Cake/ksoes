
import { combineReducers } from "redux"
import dataSlice from './dataSlice'
import authSlice from './authSlice'
import { configureStore } from '@reduxjs/toolkit'
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux'
import thunkMiddleware, { ThunkAction, ThunkDispatch } from "redux-thunk"
import { Action } from "redux"
import vocabularySlice from "./vocabularySlice"
import appSlice from "./appSlice"

const rootReducer = combineReducers({
    auth: authSlice,
    appSlice: appSlice,
    vocabularySlice: vocabularySlice,
    dataSlice: dataSlice
});

const store = configureStore({ reducer: rootReducer })

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export type TypedDispatch = ThunkDispatch<RootState, any, Action>
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store