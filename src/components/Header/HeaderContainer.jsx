import { connect } from 'react-redux';
import { Header } from './Header';
import { isAuthUser } from '../../store/selectors/selectors';
import { authUserThunkCreator, logoutUserThunkCreator } from '../../store/AuthReducer';
import { getAllDialogs } from '../../store/DialogsReducer';
import { setProfileDataThunkCreator } from '../../store/ProfileReducer';

const mapStateToProps = (state) => ({
	isAuth: isAuthUser(state),
	authId: state.AuthReducer.authUserId,
	userId: state.ProfileReducer.id,
	name: state.ProfileReducer.name,
	smallPhoto: state.ProfileReducer.photos.small,	
})
export const HeaderContainer = connect(mapStateToProps,{ authUserThunkCreator, logoutUserThunkCreator, setProfileDataThunkCreator, getAllDialogs })(Header);