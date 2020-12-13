import { dataType, photosType, allUsersItemType, dialogsArrayType, messagesArrayType } from './../types/types';

export const actions = {

    //-- Profile actions ---

	setUserProfileData: (data: dataType, id: number, editMode: boolean) => ({type: "SET-USER-DATA", data, id, editMode} as const),
	setUserStatus: (text: string) => ({type: "SET-STATUS", text} as const),
	setUserPhoto: (data: photosType) => ({type: "SET-USER-PHOTO", data} as const),
	setAuthInfo: (name: string, photo: string | null) => ({type: "SET-AUTH-INFO", name, photo} as const),
	removeUserStatus: () => ({type: "REMOVE-STATUS"} as const),
	showEditForm: () => ({type: "SHOW-EDIT-FORM"} as const),

    //-- Auth actions ---

    authUser: (email: string, id: number, login: string) => ({type: "AUTH-USER", email, id, login} as const),
	removeUserData: () => ({type: "REMOVE-USER-DATA"} as const),
    isLoading: (flag: boolean) => ({type: "SET-LOADING-DATA", flag} as const),
    
    //-- Friends actions ---

    setUsers: (usersArray: Array<allUsersItemType>) => ({type: "SET-USERS", usersArray} as const),
	setNotFound: (flag: boolean) => ({type: "SET-NOT-FOUND", flag} as const),
	setTotalUsersCount: (count: number) => ({type: "SET-TOTAL-USERS-COUNT", count} as const),
	setToggleUser: (id: number | null) => ({type: "SET-TOGGLE-USER", id} as const),
	setNextPage: () => ({type: "SET-PAGE"} as const),
	resetPage: () => ({type: "RESET-PAGE"} as const),
	addUsersToAllUsersArray: (usersArray: Array<allUsersItemType>) => ({type: "ADD-USERS-TO-ARRAY", usersArray} as const),

    //-- Dialogss actions ---

    setAllDialogs: (dataArray: Array<dialogsArrayType>) => ({type: "SET-ALL-DIALOGS", dataArray} as const),
	setMessages: (dataArray: Array<messagesArrayType>) => ({type: "SET-MESSAGES", dataArray} as const),
	addMessageToArray: (message: messagesArrayType) => ({type: "ADD-MESSAGE", message} as const),
	clearMessageField: () => ({type: "CLEAR-MESSAGE-FIELD"} as const),
	isLoadingDialog: (flag: boolean) => ({type: "SET-LOADING-DATA-DIALOG", flag} as const),

    //-- Photo actions ---

    nextSlide: () => ({type: "SHOW-NEXT-SLIDE"} as const),
	prevSlide: () => ({type: "SHOW-PREV-SLIDE"} as const),
    showSlide: (num: number) => ({type: "SHOW-SLIDE", num} as const),
    
    //-- Post actions ---

    removeStar: (index: number) => ({type: "REMOVE-STAR", index} as const),
    addStar: (index: number) => ({type: "ADD-STAR", index} as const),
    addPost: (text: string) => ({type: "ADD-NEW-POST", text} as const),
    removePost: (index: number) => ({type: "REMOVE-POST", index} as const),
    increaseTextarea: (flag: boolean) => ({type: "INCREASE-TEXTAREA", flag} as const),
}