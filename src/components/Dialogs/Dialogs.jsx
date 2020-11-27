import React from 'react';
import dialog from './Dialogs.module.css';
import { NavLink } from 'react-router-dom';
import SendMessageForm from './SendMessageForm';
import { MessagesListContainer } from '../MessagesList/MessagesListContainer';


export const Dialogs = (props) => {
	const { dialogs, avatar, id } = props;
	const regexp = /[-\d]+(?=T)/gi;

	return (
		<div className = { dialog.container }>
			<div  className = { dialog.friendsList }>
				<p>Your dialogs</p>
				<div  className = { dialog.dialogWpapper }>
					{dialogs.map((item,index) => {
						return 	<NavLink to = { `/dialogs/${item.id}` } 
										 className = { dialog.friendItem } 
										 key = { index }
										 activeClassName = { dialog.active }>
									<div style = {{ backgroundImage: `url(${item.photos.small || process.env.PUBLIC_URL+avatar})` }}></div>
									<span >{ item.userName }</span>
									<i>Last { item.lastDialogActivityDate.match(regexp) }</i>
									{item.newMessagesCount !==0 && <div className = { dialog.newMsg }>{ item.newMessagesCount } &#9993;</div>}
								</NavLink> })}
				</div>
			</div>
			<div className = { dialog.MessagesList }>
				{typeof id === "number" && <MessagesListContainer {...props}/>}
				<SendMessageForm {...props}/>
			</div>
		</div>)	
}
