import { AppStateType } from './redux-store';
import { ThunkAction } from "redux-thunk";
import { authUserThunkCreator } from "./AuthReducer";
import { getAllDialogs } from "./DialogsReducer";

const INICIALIZED_SUCCESS = "INICIALIZED_SUCCESS";

const initialState = {
	initialization: false,		
};
type initialStateType = typeof initialState
export const AppReducer = (state = initialState, action: ActionType): initialStateType => {
	switch (action.type) {
		case "INICIALIZED_SUCCESS":
			return {...state,
				initialization: true
				};		
		default:
			return state;
	}
}
type ActionType = initActionType
type initActionType = {
	type: typeof INICIALIZED_SUCCESS
}
export const initAC = (): initActionType => ({type: INICIALIZED_SUCCESS});

export const initThunkCreator = (): ThunkAction<Promise<void>, AppStateType, unknown, ActionType> => async dispatch => {
	let promiseAuth = dispatch(authUserThunkCreator());
	let promiseAllDialog = dispatch(getAllDialogs());
	Promise.all([promiseAuth, promiseAllDialog]).then(()=> dispatch(initAC()))
};
