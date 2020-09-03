import { dialogsAPI } from "../api/api";
import { isLoading } from './AuthReducer';

const SET_ALL_DIALOGS = "SET-ALL-DIALOGS";
const SET_MESSAGES = "SET-MESSAGES";
const ADD_MESSAGE = "ADD-MESSAGE";
const CLEAR_MESSAGE_FIELD = "CLEAR-MESSAGE-FIELD";
const SET_LOADING_DATA_DIALOG = "SET-LOADING-DATA-DIALOG";

const initialState = {
	dialogsArray:[],
	messagesArray:[],
	isLoadingDialog: false
};

export const DialogsReducer = (state = initialState, action) => {
	switch (action.type) {		
		case "SET-ALL-DIALOGS":
			return {...state,
				dialogsArray:[...action.dataArray]
				};
		case "SET-MESSAGES":
			return {...state,
				messagesArray:[...action.dataArray]
				};
		case "ADD-MESSAGE":
			return {...state,
				messagesArray:[...state.messagesArray, action.message]
				};
		case "CLEAR-MESSAGE-FIELD":
			return {...state,
				messagesArray:[]
				};
		case "SET-LOADING-DATA-DIALOG":
			return {...state,
				isLoadingDialog: action.boolean};
		default:
			return state;
	}
}

export const setAllDialogs = (dataArray) => ({type: SET_ALL_DIALOGS, dataArray});
export const setMessages = (dataArray) => ({type: SET_MESSAGES, dataArray});
export const addMessageToArray = (message) => ({type: ADD_MESSAGE, message});
export const clearMessageField = () => ({type: CLEAR_MESSAGE_FIELD});
export const isLoadingDialog = (boolean) => ({type: SET_LOADING_DATA_DIALOG, boolean});

export const sendMessage = (userId, msg) => async dispatch => {
	dispatch(isLoading(true));
	try{const response = await dialogsAPI.sendMessage(userId, msg);
	if(response.resultCode===0){
		dispatch(startDialog(userId));
		dispatch(addMessageToArray(response.data.message))
	}
	}catch(error){
		console.log(error)
	}
	dispatch(isLoading(false));
 };
export const deleteMessage = (messageId, userId) => async dispatch => {
	const response = await dialogsAPI.deleteMessages(messageId);
	if(response.resultCode===0){
		dispatch(getMessages(userId))
	}
};

export const getAllDialogs = () => async dispatch => {
	try { const response = await dialogsAPI.getAllDialogs();
		if(response.length>0){
			dispatch(setAllDialogs(response))
		}
	} catch(error) {
		console.log(error)
	}
 };
export const startDialog = (userId) => async dispatch => {
	try{ const response = await dialogsAPI.startDialog(userId);
		if(response.resultCode===0){
			dispatch(getAllDialogs())
		}
	} catch(error) {
		console.log(error)
	}
};
export const getMessages = (userId) => async dispatch => {
	dispatch(isLoadingDialog(true));
	try {const response = await dialogsAPI.getMessages(userId);
			if(response.items){
				dispatch(setMessages(response.items));
				dispatch(getAllDialogs());
		}
	} catch(err) {
		console.error()
		
	} finally {
		dispatch(isLoadingDialog(false))
	}
	
};