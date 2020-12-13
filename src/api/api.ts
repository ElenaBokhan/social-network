import { dataObjType } from './../store/ProfileReducer';
import { dataUserType, photosType, allUsersItemType, dialogsArrayType, messagesArrayType } from './../types/types';
import axios from 'axios';


let instance = axios.create({
	withCredentials: true,
	baseURL: 'https://social-network.samuraijs.com/api/1.0/',	
	headers: { 'API-KEY': 'a08d249f-94b4-4f01-8f0e-c20602ef951f'}
  });

  export enum resoultCodeEnum {
	success = 0,
	error = 1,
  }
  type responseIsAuthUser = {
	  data: { id: number, email: string, login: string }
	  resultCode: resoultCodeEnum
	  messages: Array<string>
  }
  type responseloginUser = {
	data: { userId: number }
	resultCode: resoultCodeEnum
	messages: Array<string>
  }
  type responselogoutUser = {	
	resultCode: resoultCodeEnum	
  }
  export const authAPI = {	  
	isAuthUser(){		
		return 	instance.get<responseIsAuthUser>('/auth/me').then(response => response.data)		
	},
	loginUser(dataUser: dataUserType){
		return 	instance.post<responseloginUser>('/auth/login', dataUser).then(response => response.data)		
	},
	logoutUser(){
		return 	instance.post<responselogoutUser>('/auth/logout')
		.then(response => response.data);
	},
} 
	type responseResultObject = {
		data: {}
		fieldsErrors: Array<string>
		messages: Array<string>
		resultCode: resoultCodeEnum
	}
	type responseSendMsg = {
		data: {
			message: messagesArrayType
		}
		fieldsErrors: Array<string>
		messages: Array<string>
		resultCode: resoultCodeEnum
	}
	type responseUpdatePhoto = {
		data: {
			photos: photosType
		}
		fieldsErrors: Array<string>
		messages: Array<string>
		resultCode: resoultCodeEnum
	}
	export type responsegetUserProfile = {
		userId: number
		aboutMe: string | null
		lookingForAJob: boolean
		lookingForAJobDescription: string | null
		fullName: string
		photos: {small: string | null, large: string | null}
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

export const profileAPI = {
	getUserProfile(userId: number | null){
		return 	instance.get<responsegetUserProfile>(`/profile/${userId}`).then(response => response.data)		
	},
	updateUserProfile(data: dataObjType){
		return 	instance.put<responseResultObject>(`/profile`, data).then(response => response.data)		
	},
	getUserStatus(userId: number | null){
		return 	instance.get<string>(`/profile/status/${userId}`).then(response => response.data)		
	},
	updateUserStatus(status: string){
		return 	instance.put<responseResultObject>(`/profile/status`, {status: status}).then(response => response.data)		
	},
	updateUserPhoto(photo: File){
		const formData = new FormData();
		formData.append('fileUpload', photo);
		return 	instance.put<responseUpdatePhoto>(`/profile/photo`, formData, {
			headers: {'Content-Type': 'multipart/form-data' }
		}).then(response => response.data)		
	},
} 
type responseGetUsers = {
	error: boolean
	items: Array<allUsersItemType>
	totalCount: number
}
export const usersAPI = {
	getAllUsers(pageNum: number){
		return instance.get<responseGetUsers>(`/users?page=${pageNum}&count=9`).then(response => response.data)
	},
	followUser(id: number){
		return instance.post<responseResultObject>(`/follow/${id}`).then(response => response.data)
	},
	unfollowUser(id: number){
		return instance.delete<responseResultObject>(`/follow/${id}`).then(response => response.data)
	},
	searchUser(name: string){
		return instance.get<responseGetUsers>(`/users?term=${name}`).then(response => response.data)
	},
	getFriends(flag: boolean, pageNum: number){
		return instance.get<responseGetUsers>(`/users?friend=${flag}&page=${pageNum}&count=9`).then(response => response.data)
	}
}

type responseGetMessages = {
	error: boolean
	items: Array<messagesArrayType>
	totalCount: number
}
export const dialogsAPI = {
	getAllDialogs(){
		return instance.get<Array<dialogsArrayType>>(`/dialogs`).then(response => response.data)
	},
	sendMessage(userId: number, msg: string){
		return instance.post<responseSendMsg>(`/dialogs/${userId}/messages`, {body: msg}).then(response => response.data)
	},
	getMessages(userId: number){
		return instance.get<responseGetMessages>(`/dialogs/${userId}/messages`).then(response => response.data)
	},
	deleteMessages(messageId: string){
		return instance.delete<responseResultObject>(`/dialogs/messages/${messageId}`).then(response => response.data)
	},
	startDialog(userId: number){
		return instance.put<responseResultObject>(`/dialogs/${userId}`).then(response => response.data)
	},
}