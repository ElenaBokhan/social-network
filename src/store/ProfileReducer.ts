import { ThunkAction } from 'redux-thunk';
import { AppStateType } from './redux-store';
import { photosType } from './../types/types';
import { profileAPI } from "../api/api";
import { isLoading, isLoadingActionType } from "./AuthReducer";

const SET_USER_DATA = "SET-USER-DATA";
const SET_STATUS = "SET-STATUS";
const REMOVE_STATUS = "REMOVE-STATUS";
const SHOW_EDIT_FORM = "SHOW-EDIT-FORM";
const SET_USER_PHOTO = "SET-USER-PHOTO";
const SET_AUTH_INFO = "SET-AUTH-INFO";


type contactsType = {
	facebook: string | null
	instagram: string | null
	vk: string | null
}
const initialState = {
		id: null as number | null,
		isEditMode:false,
		avatar: "/images/noAvatar.jpg" as string,
		avatarFriends:["/images/1.jpg",
						"/images/2.jpg",
						"/images/3.jpg",
						"/images/4.jpg",
						"/images/4.jpg",] as Array<string>,
		status: null as string | null,
		test: false,
		name: null as string | null,
		contacts:{
			facebook: null,
			instagram: null,
			vk: null
		} as contactsType,
		lookingForAJob: false,
		aboutMe: null as string | null,
		isShowEditForm: false,
		photos: {
			large: null,
			small: null
		} as photosType,
		authName: null as string | null,
		authPhoto: null as string | null,
};
type initialStateType = typeof initialState
export const ProfileReducer = (state = initialState, action: ActionType): initialStateType => {
	switch (action.type) {		
		case "SET-USER-DATA":
			return {...state,
					id: action.id,
					isEditMode: action.editMode,
					name:action.data.name,
					contacts:{...state.contacts,
						facebook: action.data.contacts.facebook,
						instagram: action.data.contacts.instagram,
						vk: action.data.contacts.vk,
					},
					lookingForAJob: action.data.lookingForAJob,
					aboutMe: action.data.aboutMe,
					photos:{...state.photos,
						large: action.data.photos.large,
						small: action.data.photos.small
						}
					};
		case "SET-AUTH-INFO":
			return {...state,
					authName:action.name,
					authPhoto: action.photo
				};	
		case "SET-STATUS":
			return {...state,
					status:action.text
				};	
		case "REMOVE-STATUS":
			return {...state,
					status:null
				};
		case "SET-USER-PHOTO":
			return {...state,
					photos:{...state.photos,
						large:action.data.large,
						small:action.data.small}
				};	
		case "SHOW-EDIT-FORM":
			return {...state,
				isShowEditForm:!state.isShowEditForm
				};	
		default:
			return state;
	}
}
type ActionType = setUserProfileDataActionType | setUserStatusActionType | setUserPhotoActionType|
				  setAuthInfoActionType | removeUserStatusActionType | showEditFormActionType
type dataType = {
	aboutMe: string | null
	contacts: contactsType
	lookingForAJob: boolean
	name: string
	photos: photosType
}
type setUserProfileDataActionType = {
	type: typeof SET_USER_DATA
	data: dataType
	id: number
	editMode: boolean
}
export const setUserProfileData = (data: dataType, id: number, editMode: boolean): setUserProfileDataActionType => ({type: SET_USER_DATA, data, id, editMode});
type setUserStatusActionType = {
	type: typeof SET_STATUS
	text: string
}
export const setUserStatus = (text: string): setUserStatusActionType => ({type: SET_STATUS, text});
type setUserPhotoActionType = {
	type: typeof SET_USER_PHOTO
	data: photosType
}
export const setUserPhoto = (data: photosType): setUserPhotoActionType => ({type: SET_USER_PHOTO, data});
type setAuthInfoActionType = {
	type: typeof SET_AUTH_INFO
	name: string
	photo: string
}
export const setAuthInfo= (name: string, photo: string): setAuthInfoActionType => ({type: SET_AUTH_INFO, name, photo});
type removeUserStatusActionType = {
	type: typeof REMOVE_STATUS
}
export const removeUserStatus = (): removeUserStatusActionType => ({type: REMOVE_STATUS});
type showEditFormActionType = {
	type: typeof SHOW_EDIT_FORM
}
export const showEditForm = (): showEditFormActionType => ({type: SHOW_EDIT_FORM});

export const setProfileDataThunkCreator = (id: number): ThunkAction<void, AppStateType, unknown, ActionType> => async dispatch => {
	try{const response = await profileAPI.getUserProfile(id);
		const regexp = /(?<=\/)[-_@.\w\s\d|А-Яа-я]+$/gi;
		const data = {
			name: response.fullName,
			contacts:{
				facebook: response.contacts.facebook.match(regexp),
				instagram: response.contacts.instagram.match(regexp),
				vk: response.contacts.vk.match(regexp),
			},			
			lookingForAJob: response.lookingForAJob,
			aboutMe: response.aboutMe,
			photos:{
				large: response.photos.large,
				small: response.photos.small
				}
		}
		dispatch(setUserProfileData(data,response.userId,true));
		dispatch(setAuthInfo(response.fullName, response.photos.small))
		
	}catch(error){
		console.error(error)
}
}
export const setProfileUserThunkCreator = (id: number): ThunkAction<void, AppStateType, unknown, ActionType> => async dispatch => {
	const response = await profileAPI.getUserProfile(id);
	
	const data = {
		name: response.fullName,
		contacts:{
			facebook: response.contacts.facebook,
			instagram: response.contacts.instagram,
			vk: response.contacts.vk,
		},			
		lookingForAJob: response.lookingForAJob,
		aboutMe: response.aboutMe,
		photos:{
			large: response.photos.large,
			small: response.photos.small
			}
	}
	dispatch(setUserProfileData(data,response.userId, false));
}
type updateDataType = {
	id: number
	fullName: string,
	facebook: string,
	instagram: string,
	vk: string,
	lookingForAJob: boolean,
	aboutMe: string
}
export const updateProfileDataThunkCreator = (data: updateDataType): ThunkAction<void, AppStateType, unknown, ActionType | isLoadingActionType> => async dispatch => {
	dispatch(isLoading(true));
	const dataObj = {
		userId: data.id,
		aboutMe: data.aboutMe,
		lookingForAJob: data.lookingForAJob,
		lookingForAJobDescription: "нет сведений",
		fullName: data.fullName,
		contacts: {
                    facebook: "facebook.com/" + data.facebook,
                    github: "github.com",
                    instagram: "instagram.com/" + data.instagram,
                    mainLink: null,
                    twitter: "https://twitter.com/@sdf",
                    vk: "vk.com/" + data.vk,
                    website: null,
                    youtube: null
                },
	}
	const response = await profileAPI.updateUserProfile(dataObj);
	if(response.resultCode===0){
		dispatch(setProfileDataThunkCreator(dataObj.userId));		
		dispatch(showEditForm());	
	}
	dispatch(isLoading(false));
}

export const setStatusThunkCreator = (id: number): ThunkAction<void, AppStateType, unknown, ActionType | isLoadingActionType> => async dispatch => {
	dispatch(isLoading(true));
	try {
		const response = await profileAPI.getUserStatus(id);	
		dispatch(setUserStatus(response));	
	} catch (error) {
		console.error(error)
	} finally {
		dispatch(isLoading(false));
	}	
}
export type statusType = {
	status: string
}
export const updateStatusThunkCreator = ({status}: statusType): ThunkAction<void, AppStateType, unknown, ActionType | isLoadingActionType> => async dispatch => {
	dispatch(isLoading(true));
	dispatch(removeUserStatus());
	try {
		const response = await profileAPI.updateUserStatus({status});
		if(response.resultCode===0){
			dispatch(setUserStatus(status));
	}
	} catch (error) {
		console.error(error)
	} finally {
		dispatch(isLoading(false));
	}		
}
type uploadPhotoType = {
	lastModified: number
	lastModifiedDate: Date
	name: string
	size: number
	type: string
	webkitRelativePath: string
}
export const uploadPhotoThunkCreator = (photo: uploadPhotoType): ThunkAction<void, AppStateType, unknown, ActionType> => async dispatch => {
	const response = await profileAPI.updateUserPhoto(photo);
	if(response.resultCode===0){
		dispatch(setUserPhoto(response.data.photos));
	}
}
