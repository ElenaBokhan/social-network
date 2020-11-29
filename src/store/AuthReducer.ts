import { AppStateType } from './redux-store';
import { ThunkAction } from 'redux-thunk';
import { authAPI } from "../api/api";
import { stopSubmit } from "redux-form";
import { setProfileDataThunkCreator, setStatusThunkCreator } from "./ProfileReducer";
import { getUsersThunkCreator } from "./FriendsReducer";

const AUTH_USER = "AUTH-USER";
const REMOVE_USER_DATA = "REMOVE-USER-DATA";
const SET_LOADING_DATA = "SET-LOADING-DATA";


const initialState = {
		authUserId: null as number | null,
		email:null as string | null,	
		login: null as string | null,
		isAuth: false,
		isLoading:false,
};
type initialStateType = typeof initialState
export const AuthReducer = (state = initialState, action: ActionType): initialStateType => {
	switch (action.type) {
		case "AUTH-USER":
			return {...state,
				authUserId: action.id,
				email:action.email,	
				login: action.login,
				isAuth: true,
				};		
		case "REMOVE-USER-DATA":
			return {...state,
				authUserId: null,
				email:null,				
				login: null,
				isAuth: false};
		case "SET-LOADING-DATA":
			return {...state,
				isLoading: action.flag};
		default:
			return state;
	}
}
type ActionType = authUserActionType | removeUserDataActionType | isLoadingActionType

type authUserActionType = {
	type: typeof AUTH_USER
	email: string
	id: number
	login: string
}
export const authUser = (email: string, id: number, login: string): authUserActionType => ({type: AUTH_USER, email, id, login});
type removeUserDataActionType = {
	type: typeof REMOVE_USER_DATA
}
export const removeUserData = (): removeUserDataActionType => ({type: REMOVE_USER_DATA});
export type isLoadingActionType = {
	type: typeof SET_LOADING_DATA
	flag: boolean
}
export const isLoading = (flag: boolean): isLoadingActionType => ({type: SET_LOADING_DATA, flag});

export const authUserThunkCreator = (): ThunkAction<void, AppStateType, unknown, ActionType> => async dispatch => {
	const response = await authAPI.isAuthUser();
	if (response.resultCode === 0){
		const {email, id, login} = response.data;
		dispatch(authUser(email, id, login));		
		dispatch(setProfileDataThunkCreator(id))
		dispatch(setStatusThunkCreator(id))
		dispatch(getUsersThunkCreator(1))
	}		
};
type dataUserType = {
	captcha: boolean
	email: string
	password: string
	rememberMe: boolean
}
export const loginUserThunkCreator = (dataUser: dataUserType): ThunkAction<void, AppStateType, unknown, ActionType> => async dispatch => {
	dispatch(isLoading(true));
	try { const response = await authAPI.loginUser(dataUser);
		if (response.resultCode === 0){			
			dispatch(authUserThunkCreator());
			}
		else if (response.resultCode !== 0){
			const errorMsg = response.messages;
			dispatch(stopSubmit('login', {_error: errorMsg}));
			}
	} catch(error){
		console.log(error);
	}
	dispatch(isLoading(false));
};

export const logoutUserThunkCreator = (): ThunkAction<void, AppStateType, unknown, ActionType> => async dispatch => {	
	const response = await authAPI.logoutUser();
	if (response.resultCode === 0){
		dispatch(removeUserData());
	}	
};