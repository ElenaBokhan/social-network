import { ThunkAction } from 'redux-thunk';
import { AppStateType, ActionsType } from './redux-store';
import { photosType, contactsType, updateDataType } from './../types/types';
import { profileAPI } from "../api/api";
import { actions } from './Actions';

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
export const ProfileReducer = (state = initialState, action: PropfileActionsType): initialStateType => {
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

type PropfileActionsType = ReturnType<ActionsType<typeof actions>>

export const setProfileDataThunkCreator = (id: number | null): ThunkAction<void, AppStateType, unknown, PropfileActionsType> => async dispatch => {
	try{const response = await profileAPI.getUserProfile(id);
		const regexp = /(?<=\/)[-_@.\w\s\d|А-Яа-я]+$/gi;
		const data = {
			name: response.fullName,
			contacts:{
				facebook: response.contacts.facebook.match(regexp) as string | null,
				instagram: response.contacts.instagram.match(regexp) as string | null,
				vk: response.contacts.vk.match(regexp) as string | null,
			},			
			lookingForAJob: response.lookingForAJob,
			aboutMe: response.aboutMe,
			photos:{
				large: response.photos.large,
				small: response.photos.small
				}
		}
		dispatch(actions.setUserProfileData(data, response.userId,true));
		dispatch(actions.setAuthInfo(response.fullName, response.photos.small))
		
	}catch(error){
		console.error(error)
}
}
export const setProfileUserThunkCreator = (id: number): ThunkAction<void, AppStateType, unknown, PropfileActionsType> => async dispatch => {
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
	dispatch(actions.setUserProfileData(data,response.userId, false));
}

export type dataObjType = {
	userId: number | null
		aboutMe: string | null
		lookingForAJob: boolean
		lookingForAJobDescription: string | null
		fullName: string | null
		contacts: {
			facebook: string
			instagram: string
			vk: string
			github: string | null          
			mainLink: string | null
			twitter: string | null
			website: string | null
			youtube: string | null
		}
}
export const updateProfileDataThunkCreator = (data: updateDataType): ThunkAction<void, AppStateType, unknown, PropfileActionsType> => async dispatch => {
	dispatch(actions.isLoading(true));
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
		dispatch(actions.showEditForm());	
	}
	dispatch(actions.isLoading(false));
}

export const setStatusThunkCreator = (id: number | null): ThunkAction<void, AppStateType, unknown, PropfileActionsType> => async dispatch => {
	dispatch(actions.isLoading(true));
	try {
		const response = await profileAPI.getUserStatus(id);	
		dispatch(actions.setUserStatus(response));	
	} catch (error) {
		console.error(error)
	} finally {
		dispatch(actions.isLoading(false));
	}	
}

export const updateStatusThunkCreator = (status: string): ThunkAction<void, AppStateType, unknown, PropfileActionsType> => async dispatch => {
	dispatch(actions.isLoading(true));
	dispatch(actions.removeUserStatus());
	try {
		const response = await profileAPI.updateUserStatus(status);
		if(response.resultCode===0){
			dispatch(actions.setUserStatus(status));
	}
	} catch (error) {
		console.error(error)
	} finally {
		dispatch(actions.isLoading(false));
	}		
}

export const uploadPhotoThunkCreator = (photo: File): ThunkAction<void, AppStateType, unknown, PropfileActionsType> => async dispatch => {
	const response = await profileAPI.updateUserPhoto(photo);
	if(response.resultCode===0){
		dispatch(actions.setUserPhoto(response.data.photos));
	}
}
