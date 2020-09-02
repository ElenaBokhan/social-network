import * as axios from 'axios';


let instance = axios.create({
	withCredentials: true,
	baseURL: 'https://social-network.samuraijs.com/api/1.0/',	
	headers: { 'API-KEY': 'a08d249f-94b4-4f01-8f0e-c20602ef951f'}
  });
  
  export const authAPI = {
	  
	isAuthUser(){		
		return 	instance.get('/auth/me').then(response => response.data)		
	},
	loginUser(dataUser){
		return 	instance.post('/auth/login', dataUser).then(response => response.data)		
	},
	logoutUser(){
		return 	instance.post('/auth/logout')
		.then(response => response.data);
	},
} 
export const profileAPI = {
	getUserProfile(userId){
		return 	instance.get(`/profile/${userId}`).then(response => response.data)		
	},
	updateUserProfile(data){
		return 	instance.put(`/profile`, data).then(response => response.data)		
	},
	getUserStatus(userId){
		return 	instance.get(`/profile/status/${userId}`).then(response => response.data)		
	},
	updateUserStatus(status){
		return 	instance.put(`/profile/status`, status).then(response => response.data)		
	},
	updateUserPhoto(photo){
		const formData = new FormData();
		formData.append('fileUpload', photo);
		return 	instance.put(`/profile/photo`, formData, {
			headers: {'Content-Type': 'multipart/form-data' }
		}).then(response => response.data)		
	},
} 
export const usersAPI = {
	getAllUsers(pageNum){
		return instance.get(`/users?page=${pageNum}&count=9`).then(response => response.data)
	},
	followUser(id){
		return instance.post(`/follow/${id}`).then(response => response.data)
	},
	unfollowUser(id){
		return instance.delete(`/follow/${id}`).then(response => response.data)
	},
	searchUser(name){
		return instance.get(`/users?term=${name}`).then(response => response.data)
	},
	getFriends(boolean, pageNum){
		return instance.get(`/users?friend=${boolean}&page=${pageNum}&count=9`).then(response => response.data)
	}

}
export const dialogsAPI = {
	getAllDialogs(){
		return instance.get(`/dialogs`).then(response => response.data)
	},
	sendMessage(userId, msg){
		return instance.post(`/dialogs/${userId}/messages`, {body: msg}).then(response => response.data)
	},
	getMessages(userId){
		return instance.get(`/dialogs/${userId}/messages`).then(response => response.data)
	},
	deleteMessages(messageId){
		return instance.delete(`/dialogs/messages/${messageId}`).then(response => response.data)
	},
	startDialog(userId){
		return instance.put(`/dialogs/${userId}`).then(response => response.data)
	},
}