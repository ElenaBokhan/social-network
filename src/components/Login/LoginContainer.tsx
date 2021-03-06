import { connect } from 'react-redux';
import { isLoading, authUserId } from '../../store/selectors/selectors';
import { loginUserThunkCreator } from '../../store/AuthReducer';
import Login from './Login';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from 'redux';
import { AppStateType } from '../../store/redux-store';
import { dataUserType } from '../../types/types';

type mapStatePropsType = {
	isLoading: boolean
	authId: number | null
}
type mapDispatchPropsType = {
	loginUserThunkCreator: (dataUser: dataUserType) => void
}
const mapStateToProps = (state: AppStateType): mapStatePropsType => ({
	isLoading: isLoading(state),
	authId: authUserId(state)
})

export const LoginContainer = compose<React.ComponentType>( connect<mapStatePropsType, 
												mapDispatchPropsType,
												{}, AppStateType>(mapStateToProps, { loginUserThunkCreator }),
																					withAuthRedirect) (Login);

