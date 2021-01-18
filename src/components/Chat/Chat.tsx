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
	const [sound, setSound] = useState<boolean>(true);
	return (
		<div className = { chat.container }>
			<div  className = { chat.friendsList }>
				<p>Developers Chat</p>
				{sound ? <svg onClick = {()=> setSound(!sound)} className = { chat.soundIcon } xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve" height="25px" version="1.1" viewBox="0 0 9416.05 8172.98" xmlnsXlink="http://www.w3.org/1999/xlink"><path d="M266.79 2279.29l2246.02 0 3374.31 -2279.29 0 8172.98 -3374.32 -2279.29 -2512.8 0 0 -3614.41 266.79 0zm6891.92 -1467.28c230.1,87.56 450.17,199.91 657.05,333.99 209.57,135.81 402.08,291.44 574.35,463.71 321.82,321.81 581.78,707.83 760.04,1138.21 171.33,413.63 265.9,865.81 265.9,1338.57 0,472.75 -94.57,924.93 -265.9,1338.57 -178.27,430.37 -438.22,816.39 -760.04,1138.21 -172.27,172.27 -364.78,327.89 -574.34,463.71 -206.88,134.08 -426.94,246.43 -657.06,334l-361.62 137.61 0 -590.15 171.95 -65.88c195.37,-74.84 379.46,-168.83 549.79,-279.49 171.68,-111.53 332.79,-242.55 480.65,-390.41 273.12,-273.12 492.5,-597.73 641.31,-956.97 143.55,-346.57 222.77,-727.89 222.77,-1129.19 0,-401.3 -79.24,-782.64 -222.77,-1129.19 -148.8,-359.24 -368.19,-683.85 -641.31,-956.97 -147.89,-147.89 -308.99,-278.91 -480.66,-390.43 -170.33,-110.65 -354.41,-204.63 -549.79,-279.47l-171.95 -65.86 0 -590.15 361.62 137.59zm48.98 1251.13c72.21,46.28 142.46,96.91 210.37,151.58 70.78,56.96 135.51,114.79 193.88,173.16 434.7,434.7 703.61,1035.28 703.61,1698.61 0,323.68 -64.93,633.72 -182.56,917.71 -122.48,295.69 -300.7,560.54 -521.05,780.9 -58.37,58.37 -123.11,116.21 -193.88,173.16 -67.9,54.66 -138.16,105.3 -210.37,151.58l-410.6 263.14 0 -653.63 121.93 -79.13c54.65,-35.46 107.23,-73.64 157.46,-114.31 46.87,-37.94 95.24,-81.84 144.84,-131.44 171.65,-171.65 309.29,-375.08 402.32,-599.67 89.83,-216.9 139.43,-456.08 139.43,-708.31 0,-252.24 -49.6,-491.42 -139.43,-708.32 -93.03,-224.59 -230.67,-428.01 -402.32,-599.66 -49.6,-49.6 -97.97,-93.49 -144.84,-131.44 -50.23,-40.67 -102.81,-78.85 -157.46,-114.31l-121.93 -79.12 0 -653.63 410.6 263.13zm-4346.95 624.32l0 2798.06 2492.81 1683.86 0 -6165.78 -2492.81 1683.86zm-533.57 125.4l-1793.58 0 0 2547.26 1793.58 0 0 -2547.26z"/></svg>
					   : <svg onClick = {()=> setSound(!sound)} className = { chat.soundIcon } xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve" height="25px" version="1.1" viewBox="0 0 10422.59 8598.72" xmlnsXlink="http://www.w3.org/1999/xlink"><path d="M280.68 2398.02l2363.02 0 3550.08 -2398.02 0 8598.72 -3550.09 -2398.02 -2643.69 0 0 -3802.69 280.68 0zm10141.91 531.99l-1369.36 1369.37 1369.36 1369.36 -396.91 396.91 -1369.36 -1369.36 -1369.37 1369.36 -396.91 -396.91 1369.37 -1369.36 -1369.37 -1369.37 396.91 -396.91 1369.37 1369.37 1369.36 -1369.37 396.91 396.91zm-7412.84 -102.55l0 2943.81 2622.67 1771.58 0 -6486.96 -2622.67 1771.58zm-561.37 131.93l-1887.01 0 0 2679.95 1887.01 0 0 -2679.95z"/></svg>
				}	
			</div>
			<div className = { chat.MessagesList }>
				<MessagesList ws = {ws} sound = {sound}/>
				<SendToChatForm ws = {ws} />
			</div>
		</div>)	
}

export const MessagesList: React.FC<{ws:WebSocket, sound:boolean}> = ({ws, sound}) => {	
	const [counter, setCounter] = useState(0);
	const [messages, setMessages] = useState<MessageType[]>([]);	
	const messagesEndRef: any = useRef(null)
	const [play] = useSound(soundNewMsg);
	const authId = useSelector(authUserId);

	const scrollToBottom = () => {
		messagesEndRef.current.scrollIntoView(false);
		const lastMessageId = messages?.[messages.length-1]?.userId
		if( counter > 1 && lastMessageId !== authId && sound) play();
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