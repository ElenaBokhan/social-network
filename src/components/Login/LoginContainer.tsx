import { connect } from 'react-redux';
import { isLoading, authUserId } from '../../store/selectors/selectors';
import { Login } from './Login';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from 'redux';
import { AppStateType } from '../../store/redux-store';


type mapStatePropsType = {
	isLoading: boolean
	authId: number | null
}
// type mapDispatchPropsType = {
// 	loginUserThunkCreator: (dataUser: dataUserType) => void
// }
const mapStateToProps = (state: AppStateType): mapStatePropsType => ({
	isLoading: isLoading(state),
	authId: authUserId(state)
})

export const LoginContainer = compose<React.ComponentType>( connect<mapStatePropsType, 
												{},
												{}, AppStateType>(mapStateToProps, {}),
																					withAuthRedirect) (Login);

