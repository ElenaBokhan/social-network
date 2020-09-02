import { authAPI } from "../api/api";
import { stopSubmit } from "redux-form";

const AUTH_USER = "AUTH-USER";
const SET_USER_ID = "SET-USER-ID";
const REMOVE_USER_DATA = "REMOVE-USER-DATA";
const SET_LOADING_DATA = "SET-LOADING-DATA";


const initialState = {
		authUserId: null,
		email:null,	
		login: null,
		isAuth: false,
		isLoading:false,
};

export const AuthReducer = (state = initialState, action) => {
	switch (action.type) {
		case "AUTH-USER":
			return {...state,
				authUserId: action.id,
				email:action.email,	
				login: action.login,
				isAuth: true,
				};
		case "SET-USER-ID":
			return {...state,
				authUserId:action.id,
				};
		case "REMOVE-USER-DATA":
			return {...state,
				authUserId: null,
				email:null,				
				login: null,
				isAuth: false};
		case "SET-LOADING-DATA":
			return {...state,
				isLoading: action.boolean};
		default:
			return state;
	}
}

export const authUser = (email, id, login) => ({type: AUTH_USER, email, id, login});
export const setUserId = id => ({type: SET_USER_ID, id});
export const removeUserData = () => ({type: REMOVE_USER_DATA});
export const isLoading = (boolean) => ({type: SET_LOADING_DATA, boolean});

export const authUserThunkCreator = () => async dispatch => {
	const response = await authAPI.isAuthUser();
	if (response.resultCode === 0){
		 const {email, id, login} = response.data;
		 dispatch(authUser(email, id, login));
	}	
};

export const loginUserThunkCreator = (dataUser) => async dispatch => {
	dispatch(isLoading(true));
	try { const response = await authAPI.loginUser(dataUser);
		if (response.resultCode === 0){
			dispatch(setUserId(response.data.userId));
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

export const logoutUserThunkCreator = () => async dispatch => {	
	const response = await authAPI.logoutUser();
	if (response.resultCode === 0){
		dispatch(removeUserData());
	}	
};