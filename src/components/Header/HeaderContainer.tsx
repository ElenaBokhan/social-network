import { connect } from 'react-redux';
import { Header } from './Header';
import { isAuthUser } from '../../store/selectors/selectors';
import { logoutUserThunkCreator } from '../../store/AuthReducer';
import { setProfileDataThunkCreator, setStatusThunkCreator } from '../../store/ProfileReducer';
import { AppStateType } from '../../store/redux-store';

type mapStatePropsType = {
	isAuth: boolean
	authId: number | null
	userId: number | null
	name: string | null
	smallPhoto: string | null
}
type mapDispatchPropsType = {
	logoutUserThunkCreator: () => void
	setProfileDataThunkCreator: (id: number | null) => void 
	setStatusThunkCreator: (id: number | null) => void 
}
const mapStateToProps = (state: AppStateType): mapStatePropsType => ({
	isAuth: isAuthUser(state),
	authId: state.AuthReducer.authUserId,
	userId: state.ProfileReducer.id,
	name: state.ProfileReducer.authName,
	smallPhoto: state.ProfileReducer.authPhoto,	
})
export const HeaderContainer = connect<mapStatePropsType, 
									   mapDispatchPropsType,
									   {}, AppStateType>(mapStateToProps,{ logoutUserThunkCreator,
																							setProfileDataThunkCreator, 
																							setStatusThunkCreator })(Header);