import { PhotosReducer } from "./PhotosReducer";

const { createStore, combineReducers } = require("redux");

const reducers = {
	PhotosReducer: PhotosReducer
}

export const store = createStore(combineReducers(reducers))