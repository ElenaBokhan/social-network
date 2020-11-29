import { connect } from 'react-redux';
import { Friends } from './Friends';
import { getUsersThunkCreator, getMoreUsersThunkCreator, followThunkCreator, unfollowThunkCreator, searchUserThunkCreator, setNextPage, getFriendsThunkCreator, getMoreFriendsThunkCreator } from '../../store/FriendsReducer';
import { setProfileUserThunkCreator, setStatusThunkCreator } from '../../store/ProfileReducer';
import { authUserId } from '../../store/selectors/selectors';
import { compose } from 'redux';
import { withoutAuthRedirect } from '../../hoc/withAuthRedirect';
import { isLoading } from '../../store/selectors/selectors';
import { AppStateType } from '../../store/redux-store';
import { allUsersItemType } from '../../types/types';

type mapStatePropsType = {
	viewParams: string
	authId: number | null
	allUsers: Array<allUsersItemType>
	isLoading: boolean
	isNotFound: boolean
	toggleUsersId: number | null
	page: number
}
type mapDispatchPropsType = {
	getUsersThunkCreator: (pageNum: number) => void																
	getMoreUsersThunkCreator: (pageNum: number) => void	
	followThunkCreator: (id: number, page: number) => void
	unfollowThunkCreator: (id: number, page: number) => void
	searchUserThunkCreator: (name: string) => void
	getFriendsThunkCreator: (flag: boolean, pageNum: number) => void
	getMoreFriendsThunkCreator: (flag: boolean, pageNum: number) => void
	setProfileUserThunkCreator: (id: number) => void
	setStatusThunkCreator: (id: number | null) => void
	setNextPage: () => void
}
const mapStateToProps = (state: AppStateType, ownProps: any): mapStatePropsType => {
	const viewParams =  ownProps.match.params.view;
	return {
		viewParams: viewParams,
		authId: authUserId(state),		
		allUsers: state.FriendsReducer.allUsers,
		isLoading: isLoading(state),
		isNotFound: state.FriendsReducer.isNotFound,
		toggleUsersId: state.FriendsReducer.toggleUsersId,
		page: state.FriendsReducer.page,
	}
}

export const FriendsContainer = compose(connect<mapStatePropsType, 
	mapDispatchPropsType,
	{}, AppStateType>(mapStateToProps, {	getUsersThunkCreator,																	
											getMoreUsersThunkCreator,		
											followThunkCreator,
											unfollowThunkCreator,
											searchUserThunkCreator,
											getFriendsThunkCreator,
											getMoreFriendsThunkCreator,
											setProfileUserThunkCreator,
											setStatusThunkCreator,
											setNextPage }), withoutAuthRedirect)(Friends)