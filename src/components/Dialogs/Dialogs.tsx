import React from 'react';
import dialog from './Dialogs.module.css';
import { NavLink } from 'react-router-dom';
import SendMessageForm from './SendMessageForm';
import { MessagesList } from '../MessagesList/MessagesList';
import { withoutAuthRedirect } from '../../hoc/withAuthRedirect';
import { useSelector } from 'react-redux';
import { getAvatar, getDialogsData } from '../../store/selectors/selectors';


export const Dialogs: React.FC<{id: number}> = ({id}) => {
	
	const avatar = useSelector(getAvatar);
	const dialogs = useSelector(getDialogsData);
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
				{typeof id === "number" && <MessagesList id = { id }/>}
				<SendMessageForm id = { id }/>
			</div>
		</div>)	
}
export default withoutAuthRedirect(Dialogs)