import React, { useEffect, useRef, useState } from 'react';
import chat from './Chat.module.css';
import SendToChatForm from './SendToChatForm';
import avatar from '../../assets/img/avatar.jpg';

export const Chat: React.FC = () => {
	const ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx');
	return (
		<div className = { chat.container }>
			<div  className = { chat.friendsList }>
				<p>Developers Chat</p>
				<div  className = { chat.dialogWpapper }>					
				</div>
			</div>
			<div className = { chat.MessagesList }>
				<MessagesList ws = {ws}/>
				<SendToChatForm ws = {ws}/>
			</div>
		</div>)	
}

export const MessagesList: React.FC<{ws:WebSocket}> = ({ws}) => {	
	
	const [messages, setMessages] = useState<MessageType[]>([]);	
	const messagesEndRef: any = useRef(null)
	
	const scrollToBottom = () => {
		messagesEndRef.current.scrollIntoView(false)
	  }
	useEffect(scrollToBottom, [messages])
	useEffect(()=>{	
		ws.addEventListener('message', (e) => {					
			setMessages((prevMessages) =>[...prevMessages,...JSON.parse(e.data)])})	
	},[])
	return (
			<div  className = {chat.MessagesField}>				
				{ messages.map( (msg, i) =><Message key = {i} message = {msg}/>) }
				<p ref={ messagesEndRef } />
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
	return 	<div className = {chat.messageItem}>
				<img src = {message.photo || avatar} width = "40px" height = "40px" alt = "avatar"/>															
				<div>
					<span >{message.userName}</span>
					<p>{message.message}</p>
				</div>																							
			</div>
}