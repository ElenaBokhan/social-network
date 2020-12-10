import { connect } from 'react-redux';
import { MessagesList } from './MessagesList';
import { getMessages, deleteMessage, clearMessageField } from '../../store/DialogsReducer';
import { compose } from 'redux';
import { messagesArrayType } from '../../types/types';
import { AppStateType } from '../../store/redux-store';


const mapStateToProps = (state: AppStateType, OwnProps: ownPropsType): mapStatePropsType => ({	
	id: OwnProps.id,
	messages: state.DialogsReducer.messagesArray,
	isLoadingDialog: state.DialogsReducer.isLoadingDialog
})
type mapStatePropsType = {
	id: number
	messages: Array<messagesArrayType>,
	isLoadingDialog: boolean
}	 
type mapDispatchPropsType = {
	getMessages: (userId: number) => void
	deleteMessage: (messageId: string, userId: number) => void
	clearMessageField: () => void
}
export type ownPropsType = {
	id: number
}	
export const MessagesListContainer = compose(connect<mapStatePropsType,
													 mapDispatchPropsType,
													 ownPropsType, 
													 AppStateType>(mapStateToProps, 
																  { getMessages, 
																	deleteMessage, 
																	clearMessageField }))(MessagesList)


