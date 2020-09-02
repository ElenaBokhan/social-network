import React from 'react';
import dialog from '../Dialogs/Dialogs.module.css';
import { useEffect } from 'react';
import { Bucket } from '../common/Buttons/Bucket/Bucket';
import preloader from '../common/Preloader/preloader3.gif';

export const MessagesList = (props) => {
	const { id, getMessages, clearMessageField, messages, isLoadingDialog } = props;

	useEffect(()=>{
		id===0 && clearMessageField();
		id && getMessages(id)
	},[id, getMessages])
	return (
			<div  className = {dialog.MessagesField}>
				{isLoadingDialog ? <><img src = {preloader} height = "12px" alt="preloader"/>
									<p>Please waiting, gialog is loading</p></>
								 : 	messages.length===0 ? <p>No one dialog is not selected</p>
								 						:	messages.map((item,index) =><div 	className = {dialog.messageItem} 
																								style = { !item.viewed ? {backgroundColor: "rgba(255, 200, 0, .1)"}: null}
																								key = {index}>															
																							<div className="messageBody">
																								<span >{item.senderName}</span>
																								<p>{item.body}</p>
																							</div>
																							<Bucket onclick = {()=>props.deleteMessage(item.id, props.id)}/>
																						</div> )}
			</div>			
		)	
}
