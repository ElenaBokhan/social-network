import { AppStateType } from './redux-store';
import { ThunkAction } from 'redux-thunk';
import { allUsersItemType } from './../types/types';
import { usersAPI } from "../api/api";
import { isLoading, isLoadingActionType } from './AuthReducer';

const SET_USERS = "SET-USERS";
const SET_TOTAL_USERS_COUNT = "SET-TOTAL-USERS-COUNT";
const SET_NOT_FOUND = "SET-NOT-FOUND";
const SET_TOGGLE_USER = "SET-TOGGLE-USER";
const SET_PAGE = "SET-PAGE";
const RESET_PAGE = "RESET-PAGE";
const ADD_USERS_TO_ARRAY = "ADD-USERS-TO-ARRAY";



const initialState = {
	page:1,
	countUsersOnPage:9,
	totalUsers:null as number | null,
	allUsers:[] as Array<allUsersItemType>,
	isNotFound: false,
	toggleUsersId:null as number | null
};
type initialStateType = typeof initialState
export const FriendsReducer = (state = initialState, action: ActionType): initialStateType => {
	switch (action.type) {		
		case "SET-USERS":
			return {...state,
				allUsers:[...action.usersArray]
				};
		case "ADD-USERS-TO-ARRAY":
			return {...state,
				allUsers:[...state.allUsers,...action.usersArray]
				};
		case "SET-TOTAL-USERS-COUNT":
			return {...state,
				countUsersOnPage:action.count
				};	
		case "SET-NOT-FOUND":
			return {...state,
				isNotFound:action.flag,
				allUsers: []
				};
		case "SET-TOGGLE-USER":
			return {...state,				
				toggleUsersId: action.id
				};	
		case "SET-PAGE":
			return {...state,				
				page: ++state.page
				};
		case "RESET-PAGE":
			return {...state,				
				page: 1
				};	
		default:
			return state;
	}
}
type ActionType = setUsersActionType | setNotFoundActionType | setTotalUsersCountActionType | 
				  setToggleUserActionType | setNextPageActionType | resetPageActionType | addUsersToAllUsersArrayActionType
type setUsersActionType = {
	type: typeof SET_USERS
	usersArray: Array<allUsersItemType>
}
export const setUsers = (usersArray: Array<allUsersItemType>): setUsersActionType => ({type: SET_USERS, usersArray});
type setNotFoundActionType = {
	type: typeof SET_NOT_FOUND
	flag: boolean
}
export const setNotFound = (flag: boolean): setNotFoundActionType => ({type: SET_NOT_FOUND, flag});
type setTotalUsersCountActionType = {
	type: typeof SET_TOTAL_USERS_COUNT
	count: number
}
export const setTotalUsersCount = (count: number): setTotalUsersCountActionType => ({type: SET_TOTAL_USERS_COUNT, count});
type setToggleUserActionType = {
	type: typeof SET_TOGGLE_USER
	id: number | null // ????????????????????????
}
export const setToggleUser = (id: number | null): setToggleUserActionType => ({type: SET_TOGGLE_USER, id});
type setNextPageActionType = {
	type: typeof SET_PAGE
}
export const setNextPage = (): setNextPageActionType => ({type: SET_PAGE});
type resetPageActionType = {
	type: typeof RESET_PAGE
}
export const resetPage = (): resetPageActionType => ({type: RESET_PAGE});
type addUsersToAllUsersArrayActionType = {
	type: typeof ADD_USERS_TO_ARRAY
	usersArray: Array<allUsersItemType>
}
export const addUsersToAllUsersArray = (usersArray: Array<allUsersItemType>): addUsersToAllUsersArrayActionType => ({type: ADD_USERS_TO_ARRAY, usersArray});


export const getUsersThunkCreator = (pageNum: number): ThunkAction<void, AppStateType, unknown, ActionType> => async dispatch => {
	const response = await usersAPI.getAllUsers(pageNum);
	if(response){
		dispatch(setUsers(response.items));
		dispatch(setTotalUsersCount(response.totalCount));
	}
 };

 export const getMoreUsersThunkCreator = (pageNum: number): ThunkAction<void, AppStateType, unknown, ActionType | isLoadingActionType> => async dispatch => {
	dispatch(isLoading(true));
	try {
		const response = await usersAPI.getAllUsers(pageNum);
		if(response){
			dispatch(addUsersToAllUsersArray(response.items));
	}
	} catch (error) {
		console.log(error);		
	} finally {
		dispatch(isLoading(false));
	}	
 };

 export const getFriendsThunkCreator = (flag: boolean, pageNum: number): ThunkAction<void, AppStateType, unknown, ActionType> => async dispatch => {
	dispatch(resetPage());
	const response = await usersAPI.getFriends(flag, pageNum);
	if(response){
		dispatch(setUsers(response.items));
		dispatch(setTotalUsersCount(response.totalCount));
	}
 };

 export const getMoreFriendsThunkCreator = (flag: boolean, pageNum: number): ThunkAction<void, AppStateType, unknown, ActionType> => async dispatch => {
	const response = await usersAPI.getFriends(flag, pageNum);
	if(response){
		dispatch(addUsersToAllUsersArray(response.items));
	}
 };
 
export const followThunkCreator = (id: number, page: number): ThunkAction<void, AppStateType, unknown, ActionType | isLoadingActionType> => async dispatch => {
	dispatch(isLoading(true));
	dispatch(setToggleUser(id));
	try { const response = await usersAPI.followUser(id);
		if(response.resultCode === 0){			
			dispatch(isLoading(true));
			dispatch(getUsersThunkCreator(page));
			dispatch(setToggleUser(null));
		}
	} catch(error){
		console.log(error);		
	} finally {
		dispatch(isLoading(false));
	}
};

export const unfollowThunkCreator = (id: number, page: number): ThunkAction<void, AppStateType, unknown, ActionType | isLoadingActionType> => async dispatch => {
	dispatch(isLoading(true));
	dispatch(setToggleUser(id));
	try { const response = await usersAPI.unfollowUser(id);
		if(response.resultCode === 0){			
			dispatch(isLoading(true));
			dispatch(getUsersThunkCreator(page));
			dispatch(setToggleUser(null));
		}
	} catch(error){
		console.log(error);
		dispatch(isLoading(false));
	}
	dispatch(isLoading(false));
};

export const searchUserThunkCreator = (name: string): ThunkAction<void, AppStateType, unknown, ActionType> => async dispatch => {
	const response = await usersAPI.searchUser(name);
	if(response.items.length !==0){
		dispatch(setUsers(response.items));
	} else if (response.items.length === 0){
		dispatch(setNotFound(true));
		setTimeout(() => {
			dispatch(setNotFound(false));
		}, 5000)
	}
 };