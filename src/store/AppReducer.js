import { authUserThunkCreator } from "./AuthReducer";
import { getAllDialogs } from "./DialogsReducer";

const INICIALIZED_SUCCESS = "INICIALIZED_SUCCESS";

const initialState = {
	initialization: false,		
};

export const AppReducer = (state = initialState, action) => {
	switch (action.type) {
		case "INICIALIZED_SUCCESS":
			return {...state,
				initialization: true
				};		
		default:
			return state;
	}
}

export const initAC = () => ({type: INICIALIZED_SUCCESS});

export const initThunkCreator = () => async dispatch => {
let promiseAuth = dispatch(authUserThunkCreator());
let promiseAllDialog = dispatch(getAllDialogs());
// let promiseSetProfileData = dispatch(setProfileDataThunkCreator());

Promise.all([promiseAuth, promiseAllDialog]).then(()=> dispatch(initAC()))
};
