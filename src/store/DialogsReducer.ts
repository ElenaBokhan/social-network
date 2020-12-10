import { AppStateType } from './redux-store';
import { ThunkAction } from 'redux-thunk';
import { messagesArrayType, dialogsArrayType } from './../types/types';
import { dialogsAPI } from "../api/api";
import { isLoading, isLoadingActionType } from './AuthReducer';

const SET_ALL_DIALOGS = "SET-ALL-DIALOGS";
const SET_MESSAGES = "SET-MESSAGES";
const ADD_MESSAGE = "ADD-MESSAGE";
const CLEAR_MESSAGE_FIELD = "CLEAR-MESSAGE-FIELD";
const SET_LOADING_DATA_DIALOG = "SET-LOADING-DATA-DIALOG";


const initialState = {
	dialogsArray:[] as Array<dialogsArrayType>,
	messagesArray:[] as Array<messagesArrayType>,
	isLoadingDialog: false
};
type initialStateType = typeof initialState

export const DialogsReducer = (state = initialState, action: ActionType): initialStateType => {
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
				isLoadingDialog: action.flag};
		default:
			return state;
	}
}
type ActionType = setAllDialogsActionType | setMessagesActionType | addMessageToArrayActionType |
				  clearMessageFieldActionType | isLoadingDialogActionType
type setAllDialogsActionType = {
	type: typeof SET_ALL_DIALOGS
	dataArray: Array<dialogsArrayType>
}
export const setAllDialogs = (dataArray: Array<dialogsArrayType>): setAllDialogsActionType => ({type: SET_ALL_DIALOGS, dataArray});
type setMessagesActionType = {
	type: typeof SET_MESSAGES
	dataArray: Array<messagesArrayType>
}
export const setMessages = (dataArray: Array<messagesArrayType>): setMessagesActionType => ({type: SET_MESSAGES, dataArray});
type addMessageToArrayActionType = {
	type: typeof ADD_MESSAGE
	message: messagesArrayType
}
export const addMessageToArray = (message: messagesArrayType): addMessageToArrayActionType => ({type: ADD_MESSAGE, message});
type clearMessageFieldActionType = {
	type: typeof CLEAR_MESSAGE_FIELD
}
export const clearMessageField = (): clearMessageFieldActionType => ({type: CLEAR_MESSAGE_FIELD});
type isLoadingDialogActionType = {
	type: typeof SET_LOADING_DATA_DIALOG
	flag: boolean
}
export const isLoadingDialog = (flag: boolean): isLoadingDialogActionType => ({type: SET_LOADING_DATA_DIALOG, flag});

export const sendMessage = (userId: number, msg: string): ThunkAction<void, AppStateType, unknown, ActionType | isLoadingActionType> => async dispatch => {
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
export const deleteMessage = (messageId: string, userId: number): ThunkAction<void, AppStateType, unknown, ActionType> => async dispatch => {
	const response = await dialogsAPI.deleteMessages(messageId);
	if(response.resultCode===0){
		dispatch(getMessages(userId))
	}
};

export const getAllDialogs = (): ThunkAction<void, AppStateType, unknown, ActionType> => async dispatch => {
	try { const response = await dialogsAPI.getAllDialogs();
		if(response.length>0){
			dispatch(setAllDialogs(response))
		}
	} catch(error) {
		console.log(error)
	}
 };
export const startDialog = (userId: number): ThunkAction<void, AppStateType, unknown, ActionType> => async dispatch => {
	try{ const response = await dialogsAPI.startDialog(userId);
		if(response.resultCode===0){
			dispatch(getAllDialogs())
		}
	} catch(error) {
		console.log(error)
	}
};
export const getMessages = (userId: number): ThunkAction<void, AppStateType, unknown, ActionType> => async dispatch => {
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