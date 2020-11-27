import { connect } from 'react-redux';
import { Dialogs } from './Dialogs';
import { sendMessage } from '../../store/DialogsReducer';
import { authUserId } from '../../store/selectors/selectors';
import { compose } from 'redux';
import { withoutAuthRedirect } from '../../hoc/withAuthRedirect';
import { isLoading } from '../../store/selectors/selectors';

const mapStateToProps = (state, ownProps) => {
	const id = +ownProps.match.params.id;
	return {
		id:id,
		authId: authUserId(state),
		avatar: state.ProfileReducer.avatar,
		dialogs: state.DialogsReducer.dialogsArray,
		messages: state.DialogsReducer.messagesArray,
		isLoading: isLoading(state),
	}
}

export const DialogsContainer = compose(connect(mapStateToProps, { sendMessage }), withoutAuthRedirect)(Dialogs)