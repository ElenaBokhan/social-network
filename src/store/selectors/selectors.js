export const getPhotos = (state) => {
	const data = Object.entries(state.PhotosReducer.images.albom).map(([id,{name,data}])=>({name,data}));	
return data;
}

export const getAllPhotos = (state) => {	
	const data = Object.entries(state.PhotosReducer.images.albom).map(([id,{name,data}])=>data);
	const newData = data.flat();

return newData;
}
export const getSlide = (state) => {
	const num = state.PhotosReducer.numberSlidePhoto;
	const slide = getAllPhotos(state).filter((item,index) => index===num);
return slide;
}
export const getUnderSlidePhotos = (state) => {	
	const num = state.PhotosReducer.numberSlidePhoto;
	const UnderSlidePhotos = getAllPhotos(state).filter((item,index) => index >= num && index < num+4 )
return UnderSlidePhotos;
}

//--------------------------------------------------------------------------------------

export const isAuthUser = (state) => {
	return state.AuthReducer.isAuth;
}

export const isLoading = (state) => {
	return state.AuthReducer.isLoading;
}
export const authUserId = (state) => {
	return state.AuthReducer.authUserId;
}