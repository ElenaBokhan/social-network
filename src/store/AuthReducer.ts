import { AppStateType, ActionsType } from './redux-store';
import { ThunkAction } from 'redux-thunk';
import { stopSubmit } from "redux-form";
import { setProfileDataThunkCreator, setStatusThunkCreator } from "./ProfileReducer";
import { getUsersThunkCreator } from "./FriendsReducer";
import { dataUserType } from '../types/types';
import { authAPI, resoultCodeEnum } from "../api/api";
import { actions } from './Actions';

const initialState = {
		authUserId: null as number | null,
		email:null as string | null,	
		login: null as string | null,
		isAuth: false,
		isLoading:false,
};
type initialStateType = typeof initialState
export const AuthReducer = (state = initialState, action: AuthActionType): initialStateType => {
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
export type AuthActionType = ReturnType<ActionsType<typeof actions>>

export const authUserThunkCreator = (): ThunkAction<void, AppStateType, unknown, AuthActionType> => async dispatch => {
	const response = await authAPI.isAuthUser();
	if (response.resultCode === 0){
		const {email, id, login} = response.data;
		dispatch(actions.authUser(email, id, login));		
		dispatch(setProfileDataThunkCreator(id))
		dispatch(setStatusThunkCreator(id))
		dispatch(getUsersThunkCreator(1))
	}		
};

export const loginUserThunkCreator = (dataUser: dataUserType): ThunkAction<void, AppStateType, unknown, AuthActionType> => async dispatch => {
	dispatch(actions.isLoading(true));
	try { const response = await authAPI.loginUser(dataUser);
		if (response.resultCode === resoultCodeEnum.success){			
			dispatch(authUserThunkCreator());
			}
		else if (response.resultCode === resoultCodeEnum.error){
			const errorMsg = response.messages;
			dispatch(stopSubmit('login', {_error: errorMsg}));
			}
	} catch(error){
		console.log(error);
	}
	dispatch(actions.isLoading(false));
};

export const logoutUserThunkCreator = (): ThunkAction<void, AppStateType, unknown, AuthActionType> => async dispatch => {	
	const response = await authAPI.logoutUser();
	if (response.resultCode === resoultCodeEnum.success){
		dispatch(actions.removeUserData());
	}	
};