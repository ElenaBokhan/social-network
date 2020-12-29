import React from 'react';
import dialog from '../Dialogs/Dialogs.module.css';
import { useEffect } from 'react';
import { Bucket } from '../common/Buttons/Bucket/Bucket';
import preloader from '../common/Preloader/preloader3.gif';
import { getMessagesData, isLoadingDialog } from '../../store/selectors/selectors';
import { actions } from '../../store/Actions';
import { deleteMessage, getMessages } from '../../store/DialogsReducer';
import { useDispatch, useSelector } from 'react-redux';

const { clearMessageField } = actions
type propsType = { id: number }

export const MessagesList: React.FC<propsType> = (props) => {
	const { id } = props;
	const isLoading = useSelector(isLoadingDialog);
	const messages = useSelector(getMessagesData)
	const dispatch = useDispatch();

	const deleteMsg = (idMsg: string, id: number) => {
		dispatch(deleteMessage(idMsg, id))
	}
	useEffect(()=>{
		id===0 && dispatch(clearMessageField());
		id && dispatch(getMessages(id));
	},[id, dispatch])
	return (
			<div  className = {dialog.MessagesField}>
				{isLoading ? 	<>  
										<img src = {preloader} height = "12px" alt="preloader"/>
										<p>Please waiting, gialog is loading</p>
									</>
								 : 	messages.length===0 ? <p>No one dialog is not selected</p>
								 :	messages.map((item,index) =>{
								 		return 	<div className = {dialog.messageItem} 
													style = { !item.viewed ? {backgroundColor: "rgba(255, 200, 0, .1)"}: undefined}
													key = {index}>															
													<div className="messageBody">
														<span >{item.senderName}</span>
														<p>{item.body}</p>
													</div>
													<div className = {dialog.buttonWrapper}>
														<Bucket onclick = {() => deleteMsg(item.id, id)}/>
													</div>										
												</div> })}
			</div>			
		)	
}
