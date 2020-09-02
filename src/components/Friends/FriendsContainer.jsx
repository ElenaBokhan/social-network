import { connect } from 'react-redux';
import { Friends } from './Friends';
import { getUsersThunkCreator, getMoreUsersThunkCreator, followThunkCreator, unfollowThunkCreator, searchUserThunkCreator, setNextPage, getFriendsThunkCreator, getMoreFriendsThunkCreator } from '../../store/FriendsReducer';
import { setProfileUserThunkCreator } from '../../store/ProfileReducer';
import { authUserId } from '../../store/selectors/selectors';
import { compose } from 'redux';
import { withoutAuthRedirect } from '../../hoc/withAuthRedirect';
import { isLoading } from '../../store/selectors/selectors';


const mapStateToProps = (state, ownProps) => {
	const viewParams =  ownProps.match.params.view;
	return {
		viewParams: viewParams,
		authId: authUserId(state),
		userId: state.ProfileReducer.id,
		allUsers: state.FriendsReducer.allUsers,
		isLoading: isLoading(state),
		isNotFound: state.FriendsReducer.isNotFound,
		toggleUsersId: state.FriendsReducer.toggleUsersId,
		page: state.FriendsReducer.page,
	}
}

export const FriendsContainer = compose(connect(mapStateToProps, {	getUsersThunkCreator,
																	getMoreUsersThunkCreator,		
																	followThunkCreator,
																	unfollowThunkCreator,
																	searchUserThunkCreator,
																	getFriendsThunkCreator,
																	getMoreFriendsThunkCreator,
																	setProfileUserThunkCreator,
																	setNextPage }), withoutAuthRedirect)(Friends)