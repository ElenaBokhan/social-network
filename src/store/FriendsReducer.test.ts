import { actions } from './Actions';
import { FriendsReducer, initialStateType } from './FriendsReducer';

test('page incremented', () => {
	const state: initialStateType = {
		page:1,
		countUsersOnPage:9,
		totalUsers:null,
		allUsers:[],
		isNotFound: false,
		toggleUsersId:null
	};
	const newState = FriendsReducer(state, actions.setNextPage())
	expect(newState.page).toBe(2)
})

