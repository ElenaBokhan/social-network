import { AppStateType, ActionsType } from './redux-store';
import { ThunkAction } from "redux-thunk";
import { authUserThunkCreator } from "./AuthReducer";
import { getAllDialogs } from "./DialogsReducer";



const initialState = {
	initialization: false,		
};
type initialStateType = typeof initialState
export const AppReducer = (state = initialState, action: initialActionsType): initialStateType => {
	switch (action.type) {
		case "INICIALIZED-SUCCESS":
			return {...state,
				initialization: true
				};		
		default:
			return state;
	}
}
type initialActionsType = ReturnType<ActionsType<typeof actions>>

const actions = {
	initAC: () => ({type: "INICIALIZED-SUCCESS"} as const)
}
 

export const initThunkCreator = (): ThunkAction<Promise<void>, AppStateType, unknown, initialActionsType> => async dispatch => {
	let promiseAuth = dispatch(authUserThunkCreator());
	let promiseAllDialog = dispatch(getAllDialogs());
	Promise.all([promiseAuth, promiseAllDialog]).then(()=> dispatch(actions.initAC()))
};
