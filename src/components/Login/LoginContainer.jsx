import { connect } from 'react-redux';
import { isLoading, authUserId } from '../../store/selectors/selectors';
import { loginUserThunkCreator } from '../../store/AuthReducer';
import Login from './Login';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from 'redux';

const mapStateToProps = (state) => ({
	isLoading: isLoading(state),
	authId: authUserId(state)
})

export const LoginContainer = compose(	connect(mapStateToProps, { loginUserThunkCreator }),
										withAuthRedirect) (Login);

