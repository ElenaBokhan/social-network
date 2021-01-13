import React, { useEffect, useRef, useState } from 'react';
import chat from './Chat.module.css';
import SendToChatForm from './SendToChatForm';
import avatar from '../../assets/img/avatar.jpg';
import useSound from 'use-sound';
//@ts-ignore
import soundNewMsg from '../../assets/sound/sound.mp3'
import { useSelector } from 'react-redux';
import { authUserId } from '../../store/selectors/selectors';

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
	const [counter, setCounter] = useState(0);
	const [messages, setMessages] = useState<MessageType[]>([]);	
	const messagesEndRef: any = useRef(null)
	const [play] = useSound(soundNewMsg);
	const authId = useSelector(authUserId);

	const scrollToBottom = () => {
		messagesEndRef.current.scrollIntoView(false);
		const lastMessageId = messages?.[messages.length-1]?.userId
		if( counter > 1 && lastMessageId !== authId) play();
		setCounter(counter+1);		
	}
	const handleNewMessage = (e: any) => {
		setMessages((prevMessages) =>[...prevMessages,...JSON.parse(e.data)])
	}	
	useEffect(()=>{	
		ws.addEventListener("message", handleNewMessage)		
		return function cleanup(){ ws.removeEventListener("message", (e) => handleNewMessage(e))}
		},[])
	useEffect(scrollToBottom, [messages])
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