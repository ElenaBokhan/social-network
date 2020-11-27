import { connect } from 'react-redux';
import { Header } from './Header';
import { isAuthUser } from '../../store/selectors/selectors';
import { logoutUserThunkCreator } from '../../store/AuthReducer';
import { setProfileDataThunkCreator, setStatusThunkCreator } from '../../store/ProfileReducer';

const mapStateToProps = (state) => ({
	isAuth: isAuthUser(state),
	authId: state.AuthReducer.authUserId,
	userId: state.ProfileReducer.id,
	name: state.ProfileReducer.authName,
	smallPhoto: state.ProfileReducer.authPhoto,	
})
export const HeaderContainer = connect(mapStateToProps,{ logoutUserThunkCreator,
														 setProfileDataThunkCreator, 
														 setStatusThunkCreator })(Header);