import { usersAPI } from "../api/api";
import { isLoading } from './AuthReducer';

const SET_USERS = "SET-USERS";
const SET_TOTAL_USERS_COUNT = "SET-TOTAL-USERS-COUNT";
const SET_NOT_FOUND = "SET-NOT-FOUND";
const SET_TOGGLE_USER = "SET-TOGGLE-USER";
const SET_PAGE = "SET-PAGE";
const ADD_USERS_TO_ARRAY = "ADD-USERS-TO-ARRAY";

const initialState = {
	page:1,
	countUsersOnPage:9,
	totalUsers:null,
	allUsers:[],
	isNotFound: false,
	toggleUsersId:null
};

export const FriendsReducer = (state = initialState, action) => {
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
				isNotFound:action.boolean,
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
		default:
			return state;
	}
}

export const setUsers = (usersArray) => ({type: SET_USERS, usersArray});
export const setNotFound = (boolean) => ({type: SET_NOT_FOUND, boolean});
export const setTotalUsersCount = (count) => ({type: SET_TOTAL_USERS_COUNT, count});
export const setToggleUser = (id) => ({type: SET_TOGGLE_USER, id});
export const setNextPage = () => ({type: SET_PAGE});
export const addUsersToAllUsersArray = (usersArray) => ({type: ADD_USERS_TO_ARRAY, usersArray});


export const getUsersThunkCreator = (pageNum) => async dispatch => {
	const response = await usersAPI.getAllUsers(pageNum);
	if(response){
		dispatch(setUsers(response.items));
		dispatch(setTotalUsersCount(response.totalCount));
	}
 };
 export const getMoreUsersThunkCreator = (pageNum) => async dispatch => {
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
 export const getFriendsThunkCreator = (boolean, pageNum) => async dispatch => {
	const response = await usersAPI.getFriends(boolean, pageNum);
	if(response){
		dispatch(setUsers(response.items));
		dispatch(setTotalUsersCount(response.totalCount));
	}
 };
 export const getMoreFriendsThunkCreator = (boolean,pageNum) => async dispatch => {
	const response = await usersAPI.getFriends(boolean, pageNum);
	if(response){
		dispatch(addUsersToAllUsersArray(response.items));
	}
 };
export const followThunkCreator = (id,page) => async dispatch => {
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

export const unfollowThunkCreator = (id, page) => async dispatch => {
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

export const searchUserThunkCreator = (name) => async dispatch => {
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