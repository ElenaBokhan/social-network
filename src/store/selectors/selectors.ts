import { AppStateType } from "../redux-store";

export const getPhotos = (state: AppStateType) => {
	const data = Object.entries(state.PhotosReducer.images.albom).map(([id,{name,data}])=>({name,data}));	
return data;
}

export const getAllPhotos = (state: AppStateType) => {	
	const data = Object.entries(state.PhotosReducer.images.albom).map(([id,{name,data}])=>data);
	const newData = data.flat();

return newData;
}
export const getNumberOfSlide = (state: AppStateType) => {	
	return state.PhotosReducer.numberSlidePhoto;
}
export const getSlide = (state: AppStateType) => {
	const num = state.PhotosReducer.numberSlidePhoto;
	const slide = getAllPhotos(state).filter((item,index) => index===num);
return slide;
}
export const getUnderSlidePhotos = (state: AppStateType) => {	
	const num = state.PhotosReducer.numberSlidePhoto;
	const UnderSlidePhotos = getAllPhotos(state).filter((item,index) => index >= num && index < num+4 )
return UnderSlidePhotos;
}

//-----------------------------------------------------------------

export const isAuthUser = (state: AppStateType) => {
	return state.AuthReducer.isAuth;
}
export const isLoading = (state: AppStateType) => {
	return state.AuthReducer.isLoading;
}
export const authUserId = (state: AppStateType) => {
	return state.AuthReducer.authUserId;
}

//-----------------------------------------------------------------

export const getUserId = (state: AppStateType) => {
	return state.ProfileReducer.id;
}
export const getAuthName = (state: AppStateType) => {
	return state.ProfileReducer.name;
}
export const getAuthPhoto = (state: AppStateType) => {
	return state.ProfileReducer.authPhoto;
}
export const getAvatar = (state: AppStateType) => {
	return state.ProfileReducer.avatar;
}
export const getPhoto = (state: AppStateType) => {
	return state.ProfileReducer.photos;
}
export const getSmallPhoto = (state: AppStateType) => {
	return state.ProfileReducer.photos.small;
}
export const getAvatarFriends = (state: AppStateType) => {
	return state.ProfileReducer.avatarFriends;
}
export const getContacts = (state: AppStateType) => {
	return state.ProfileReducer.contacts;
}
export const getAboutMe = (state: AppStateType) => {
	return state.ProfileReducer.aboutMe;
}
export const getEditMode = (state: AppStateType) => {
	return state.ProfileReducer.isEditMode;
}
export const getStatus = (state: AppStateType) => {
	return state.ProfileReducer.status;
}
export const isLookingForAJob = (state: AppStateType) => {
	return state.ProfileReducer.lookingForAJob;
}
export const isShowEditForm = (state: AppStateType) => {
	return state.ProfileReducer.isShowEditForm;
}
//-----------------------------------------------------------------

export const getPostData = (state: AppStateType) => {
	return state.PostReducer.posts;
}
export const getIsActiveTextarea = (state: AppStateType) => {
	return state.PostReducer.isActiveTextarea;
}

//-----------------------------------------------------------------
export const isLoadingDialog = (state: AppStateType) => {
	return state.DialogsReducer.isLoadingDialog;
}
export const getMessagesData = (state: AppStateType) => {
	return state.DialogsReducer.messagesArray;
}
export const getDialogsData = (state: AppStateType) => {
	return state.DialogsReducer.dialogsArray;
}