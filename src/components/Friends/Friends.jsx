import React from 'react';
import friends from './Friends.module.css';
import { NavLink } from 'react-router-dom';
import notFoundAvatar from '../../assets/img/notfound.png';
import { Button } from '../Button/Button';
import avatar from '../../assets/img/avatar.png';
import SearchUserForm from './SearchUserForm';
import preloader from '../common/Preloader/preloader3.gif';


export const Friends = (props) => {
	const { getUsersThunkCreator, page,	getFriendsThunkCreator,	getMoreFriendsThunkCreator, 
			getMoreUsersThunkCreator, setProfileUserThunkCreator, followThunkCreator,
			unfollowThunkCreator, setStatusThunkCreator, isNotFound, allUsers,	toggleUsersId, 
			isLoading, setNextPage,	viewParams } = props;

	const showMoreUsers = () => {
		setNextPage();
		if(viewParams === "onlyfriends"){
			getMoreFriendsThunkCreator(true, page)
		}else if(viewParams === "withoutfriends"){
			getMoreFriendsThunkCreator(false, page)
		} else {
			getMoreUsersThunkCreator(page);	
		}	
	}
	const showUserProfile = (id) => {		
		setProfileUserThunkCreator(id);	
		setStatusThunkCreator(id)		
	}
	const follow = (id) => {
		followThunkCreator(id, page);		
	}
	const unfollow = (id) => {
		unfollowThunkCreator(id, page);		
	}
	return (
		<div className = { friends.container }>			
			<nav className = { friends.nav }>
				<span>Show: </span>
				<NavLink 	to = {`/friends/all`} 
							activeClassName = { friends.active }
							onClick = { () => getUsersThunkCreator() }>all</NavLink>
				<NavLink 	to = {`/friends/onlyfriends`} 
							activeClassName = { friends.active }
							onClick = { () => getFriendsThunkCreator(true, page) }>only friends</NavLink>
				<NavLink 	to = {`/friends/withoutfriends`} 
							activeClassName = { friends.active }
							onClick = { () => getFriendsThunkCreator(false, page) }>without friends</NavLink>
			</nav>
			<div className={friends.search}>
				<SearchUserForm {...props}/>
			</div>
			{isNotFound && <div  className = { friends.notFound }>
								<img src = { notFoundAvatar } alt="notFound" height = "200px"/>
								Unfortunately the user with this name was not found
							</div>}
			<div className = {friends.friendsWrapper}>
				{allUsers.map((item, index) => 	<div className = { friends.item } 
													 key = { index }
													 onClick = { () => showUserProfile(item.id) }>
													<NavLink to = {`/profile`} >
													<img 	src = { item.photos.large ? item.photos.large : avatar } 
															className = { toggleUsersId === item.id ? friends.avatarImg : null }
															style = { item.followed === false ? {filter: "opacity(0.4)"} : null }
															alt = "avatar" width = "150px" height = "150px"
															/>
															</NavLink>
													<p className = { friends.nameFriend }>{ item.name }</p>
													<p className = { friends.status }>{ item.status }</p>
													<Button name = { !item.followed ? "add friend" : "unfriend" }
															onclick = { () => item.followed ? unfollow(item.id) : follow(item.id)}
															isLoading = { toggleUsersId === item.id ? isLoading : null }
															disabled = { toggleUsersId === item.id }/>
												</div>
										)}
			</div>
			<button onClick = { showMoreUsers } 
					className = { friends.showMoreButton }>
					{ isLoading ? <img src = { preloader } height = "7px" alt = "preloader"/> : "show more"}
			</button>
		</div>)
	
}
