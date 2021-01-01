import React, { useEffect, useState } from 'react';
import dialog from './Dialogs.module.css';
import SendToChatForm from './SendToChatForm';
import avatar from '../../assets/img/avatar.jpg';

export const Chat: React.FC = () => {
	const ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx');
	return (
		<div className = { dialog.container }>
			<div  className = { dialog.friendsList }>
				<p>Developers Chat</p>
				<div  className = { dialog.dialogWpapper }>					
				</div>
			</div>
			<div className = { dialog.MessagesList }>
				<MessagesList ws = {ws}/>
				<SendToChatForm ws = {ws}/>
			</div>
		</div>)	
}

export const MessagesList: React.FC<{ws:WebSocket}> = ({ws}) => {	
	
	const [messages, setMessages] = useState<MessageType[]>([]);	
	

	useEffect(()=>{	
		ws.addEventListener('message', (e) => {			
			console.log(e.data)
			setMessages((prevMessages) =>[...prevMessages,...JSON.parse(e.data)])})	
	},[ws])
	return (
			<div  className = {dialog.MessagesField}>				
				{ messages.map( (msg, i) =><Message key = {i} message = {msg}/>) }
			</div>			
		)	
}
type MessageType =   {
	message: string
	photo: string
	userId: number
	userName: string
}
export const Message: React.FC<{message:MessageType}> = ( {message} ) => {	
	return 	<div className = {dialog.messageItem}>
				<img src = {message.photo || avatar} width = "40px" alt = "avatar"/>															
				<div>
					<span >{message.userName}</span>
					<p>{message.message}</p>
				</div>																							
			</div>
}