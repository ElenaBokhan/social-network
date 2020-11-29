import { connect } from 'react-redux';
import { Dialogs } from './Dialogs';
import { sendMessage } from '../../store/DialogsReducer';
import { authUserId } from '../../store/selectors/selectors';
import { compose } from 'redux';
import { withoutAuthRedirect } from '../../hoc/withAuthRedirect';
import { isLoading } from '../../store/selectors/selectors';
import { AppStateType } from '../../store/redux-store';
import { dialogsArrayType, messagesArrayType } from '../../types/types';

type mapStatePropsType = {
	id: number
	authId: number | null
	avatar: string
	dialogs: Array<dialogsArrayType>
	messages: Array<messagesArrayType>
	isLoading: boolean
}
type mapDispatchPropsType = {
	sendMessage: (userId: number, msg: string) => void
}
const mapStateToProps = (state: AppStateType, ownProps: any): mapStatePropsType => {
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

export const DialogsContainer = compose(connect<mapStatePropsType, 
												mapDispatchPropsType,
												{}, AppStateType>(mapStateToProps, { sendMessage }), withoutAuthRedirect)(Dialogs)