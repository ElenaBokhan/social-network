import { AppStateType, ActionsType } from './redux-store';
import { ThunkAction } from 'redux-thunk';
import { messagesArrayType, dialogsArrayType } from './../types/types';
import { dialogsAPI } from "../api/api";
import { actions } from './Actions';

const initialState = {
	dialogsArray:[] as Array<dialogsArrayType>,
	messagesArray:[] as Array<messagesArrayType>,
	isLoadingDialog: false
};
type initialStateType = typeof initialState

export const DialogsReducer = (state = initialState, action: DialogsActionsType): initialStateType => {
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

type DialogsActionsType = ReturnType<ActionsType<typeof actions>>			  

export const sendMessage = (userId: number, msg: string): ThunkAction<void, AppStateType, unknown, DialogsActionsType> => async dispatch => {
	dispatch(actions.isLoading(true));
	try{const response = await dialogsAPI.sendMessage(userId, msg);
	if(response.resultCode===0){
		dispatch(startDialog(userId));
		dispatch(actions.addMessageToArray(response.data.message))
	}
	}catch(error){
		console.log(error)
	}
	dispatch(actions.isLoading(false));
 };
export const deleteMessage = (messageId: string, userId: number): ThunkAction<void, AppStateType, unknown, DialogsActionsType> => async dispatch => {
	const response = await dialogsAPI.deleteMessages(messageId);
	if(response.resultCode===0){
		dispatch(getMessages(userId))
	}
};

export const getAllDialogs = (): ThunkAction<void, AppStateType, unknown, DialogsActionsType> => async dispatch => {
	try { const response = await dialogsAPI.getAllDialogs();
		if(response.length>0){
			dispatch(actions.setAllDialogs(response))
		}
	} catch(error) {
		console.log(error)
	}
 };
export const startDialog = (userId: number): ThunkAction<void, AppStateType, unknown, DialogsActionsType> => async dispatch => {
	try{ const response = await dialogsAPI.startDialog(userId);
		if(response.resultCode===0){
			dispatch(getAllDialogs())
		}
	} catch(error) {
		console.log(error)
	}
};
export const getMessages = (userId: number): ThunkAction<void, AppStateType, unknown, DialogsActionsType> => async dispatch => {
	dispatch(actions.isLoadingDialog(true));
	try {const response = await dialogsAPI.getMessages(userId);
			if(response.items){
				dispatch(actions.setMessages(response.items));
				dispatch(getAllDialogs());
		}
	} catch(err) {
		console.error()
		
	} finally {
		dispatch(actions.isLoadingDialog(false))
	}	
};