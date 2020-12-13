import { AppStateType, ActionsType } from './redux-store';
import { ThunkAction } from 'redux-thunk';
import { allUsersItemType } from './../types/types';
import { usersAPI } from "../api/api";
import { actions } from './Actions';

const initialState = {
	page:1,
	countUsersOnPage:9,
	totalUsers:null as number | null,
	allUsers:[] as Array<allUsersItemType>,
	isNotFound: false,
	toggleUsersId:null as number | null
};
type initialStateType = typeof initialState
export const FriendsReducer = (state = initialState, action: FriendsActionsType): initialStateType => {
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
type FriendsActionsType = ReturnType<ActionsType<typeof actions>>

export const getUsersThunkCreator = (pageNum: number): ThunkAction<void, AppStateType, unknown, FriendsActionsType> => async dispatch => {
	const response = await usersAPI.getAllUsers(pageNum);
	if(response){
		dispatch(actions.setUsers(response.items));
		dispatch(actions.setTotalUsersCount(response.totalCount));
	}
 };

 export const getMoreUsersThunkCreator = (pageNum: number): ThunkAction<void, AppStateType, unknown, FriendsActionsType> => async dispatch => {
	dispatch(actions.isLoading(true));
	try {
		const response = await usersAPI.getAllUsers(pageNum);
		if(response){
			dispatch(actions.addUsersToAllUsersArray(response.items));
	}
	} catch (error) {
		console.log(error);		
	} finally {
		dispatch(actions.isLoading(false));
	}	
 };

 export const getFriendsThunkCreator = (flag: boolean, pageNum: number): ThunkAction<void, AppStateType, unknown, FriendsActionsType> => async dispatch => {
	dispatch(actions.resetPage());
	const response = await usersAPI.getFriends(flag, pageNum);
	if(response){
		dispatch(actions.setUsers(response.items));
		dispatch(actions.setTotalUsersCount(response.totalCount));
	}
 };

 export const getMoreFriendsThunkCreator = (flag: boolean, pageNum: number): ThunkAction<void, AppStateType, unknown, FriendsActionsType > => async dispatch => {
	const response = await usersAPI.getFriends(flag, pageNum);
	if(response){
		dispatch(actions.addUsersToAllUsersArray(response.items));
	}
 };
 
export const followThunkCreator = (id: number, page: number): ThunkAction<void, AppStateType, unknown, FriendsActionsType> => async dispatch => {
	dispatch(actions.isLoading(true));
	dispatch(actions.setToggleUser(id));
	try { const response = await usersAPI.followUser(id);
		if(response.resultCode === 0){			
			dispatch(actions.isLoading(true));
			dispatch(getUsersThunkCreator(page));
			dispatch(actions.setToggleUser(null));
		}
	} catch(error){
		console.log(error);		
	} finally {
		dispatch(actions.isLoading(false));
	}
};

export const unfollowThunkCreator = (id: number, page: number): ThunkAction<void, AppStateType, unknown, FriendsActionsType> => async dispatch => {
	dispatch(actions.isLoading(true));
	dispatch(actions.setToggleUser(id));
	try { const response = await usersAPI.unfollowUser(id);
		if(response.resultCode === 0){			
			dispatch(actions.isLoading(true));
			dispatch(getUsersThunkCreator(page));
			dispatch(actions.setToggleUser(null));
		}
	} catch(error){
		console.log(error);
		dispatch(actions.isLoading(false));
	}
	dispatch(actions.isLoading(false));
};

export const searchUserThunkCreator = (name: string): ThunkAction<void, AppStateType, unknown, FriendsActionsType> => async dispatch => {
	const response = await usersAPI.searchUser(name);
	if(response.items.length !==0){
		dispatch(actions.setUsers(response.items));
	} else if (response.items.length === 0){
		dispatch(actions.setNotFound(true));
		setTimeout(() => {
			dispatch(actions.setNotFound(false));
		}, 5000)
	}
 };