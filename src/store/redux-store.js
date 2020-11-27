import { reducer as formReducer } from 'redux-form';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { ProfileReducer } from './ProfileReducer';
import { PostReducer } from './PostReducer';
import { PhotosReducer } from './PhotosReducer';
import { FriendsReducer } from './FriendsReducer';
import { AuthReducer } from './AuthReducer';
import { DialogsReducer } from './DialogsReducer';
import { AppReducer } from './AppReducer';

const reducers = {
	AppReducer: AppReducer,
	PostReducer: PostReducer,
	PhotosReducer: PhotosReducer,
	ProfileReducer: ProfileReducer,
	AuthReducer: AuthReducer,
	FriendsReducer: FriendsReducer,
	DialogsReducer: DialogsReducer,
	form:formReducer
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(combineReducers(reducers), composeEnhancers(applyMiddleware(thunk)));
window.store = store.getState();