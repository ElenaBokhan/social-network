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

const rootReducer = combineReducers({
	AppReducer: AppReducer,
	PostReducer: PostReducer,
	PhotosReducer: PhotosReducer,
	ProfileReducer: ProfileReducer,
	AuthReducer: AuthReducer,
	FriendsReducer: FriendsReducer,
	DialogsReducer: DialogsReducer,
	form:formReducer
})
type rootReducerType = typeof rootReducer
export type AppStateType = ReturnType<rootReducerType>

//@ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
//@ts-ignore
window.store = store.getState();