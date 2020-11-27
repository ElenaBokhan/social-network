import { profileAPI } from "../api/api";
import { isLoading } from "./AuthReducer";

const SET_USER_DATA = "SET-USER-DATA";
const SET_STATUS = "SET-STATUS";
const REMOVE_STATUS = "REMOVE-STATUS";
const SHOW_EDIT_FORM = "SHOW-EDIT-FORM";
const SET_USER_PHOTO = "SET-USER-PHOTO";
const SET_USER_ID = "SET-USER-ID";
const SET_AUTH_INFO = "SET-AUTH-INFO";



const initialState = {
		id: null,
		isEditMode:false,
		avatar: "/images/noAvatar.jpg",
		avatarFriends:["/images/1.jpg",
						"/images/2.jpg",
						"/images/3.jpg",
						"/images/4.jpg",
						"/images/4.jpg",],
		status: null,
		test:false,
		name:null,
		contacts:{
			facebook: null,
			instagram: null,
			vk: null
		},
		lookingForAJob: false,
		aboutMe:null,
		isShowEditForm: false,
		photos: {
			large:null,
			small:null
		},
		authName: null,
		authPhoto:null
		
};

export const ProfileReducer = (state = initialState, action) => {
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
		case "SET-USER-ID":
			return {...state,
					id:action.id
				};
		case "REMOVE-STATUS":
			return {...state,
					status:null
				};
		case "SET-USER-PHOTO":
			return {...state,
					photos:{...state.photos,
						large:action.data.data.photos.large,
						small:action.data.data.photos.small}
				};	
		case "SHOW-EDIT-FORM":
			return {...state,
				isShowEditForm:!state.isShowEditForm
				};	
		default:
			return state;
	}
}
export const setUserProfileData = (data, id, editMode) => ({type: SET_USER_DATA, data, id, editMode});
export const setUserStatus = (text) => ({type: SET_STATUS, text});
export const setUserPhoto = (data) => ({type: SET_USER_PHOTO, data});
export const setUserId = (id) => ({type: SET_USER_ID, id});
export const setAuthInfo= (name, photo) => ({type: SET_AUTH_INFO, name, photo});

export const removeUserStatus = () => ({type: REMOVE_STATUS});
export const showEditForm = () => ({type: SHOW_EDIT_FORM});

export const setProfileDataThunkCreator = id => async dispatch => {
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
export const setProfileUserThunkCreator = id => async dispatch => {
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
export const updateProfileDataThunkCreator = data => async dispatch => {
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

export const setStatusThunkCreator = id => async dispatch => {
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
export const updateStatusThunkCreator = ({status}) => async dispatch => {
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
export const uploadPhotoThunkCreator = photo => async dispatch => {
	const response = await profileAPI.updateUserPhoto(photo);
	if(response.resultCode===0){
		dispatch(setUserPhoto(response));
	}
}
