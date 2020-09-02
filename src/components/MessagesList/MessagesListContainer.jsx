import { connect } from 'react-redux';
import { MessagesList } from './MessagesList';
import { getMessages, deleteMessage, clearMessageField } from '../../store/DialogsReducer';
import { compose } from 'redux';


const mapStateToProps = (state) => ({	
	messages: state.DialogsReducer.messagesArray,
	isLoadingDialog: state.DialogsReducer.isLoadingDialog
})
	 

export const MessagesListContainer = compose(connect(mapStateToProps, { getMessages, deleteMessage, clearMessageField }))(MessagesList)


