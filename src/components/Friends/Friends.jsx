import React from 'react';
import friends from './Friends.module.css';
import { NavLink } from 'react-router-dom';
import notFoundAvatar from '../../assets/img/notfound.png';
import { Button } from '../Button/Button';
import avatar from '../../assets/img/avatar.png'
import { useEffect } from 'react';
import SearchUserForm from './SearchUserForm';
import preloader from '../common/Preloader/preloader3.gif';


export const Friends = (props) => {
	const { getUsersThunkCreator, page } = props
	const showMoreUsers = () => {
		props.setNextPage();
		if(props.viewParams === "onlyfriends"){
			props.getMoreFriendsThunkCreator(true, props.page)
		}else if(props.viewParams === "withoutfriends"){
			props.getMoreFriendsThunkCreator(false, props.page)
		} else {
			props.getMoreUsersThunkCreator(props.page);	
		}	
	}
	const showUserProfile = (id) => {
		props.setProfileUserThunkCreator(id);			
	}
	const follow = (id) => {
		props.followThunkCreator(id, props.page);		
	}
	const unfollow = (id) => {
		props.unfollowThunkCreator(id, props.page);		
	}
	useEffect(() => {
		page && getUsersThunkCreator(page);
	},[]);

	return (
		<div className = {friends.container}>			
			<nav className = {friends.nav}>
				<span>Show: </span>
				<NavLink 	to = {`/friends/all`} 
							activeClassName={friends.active}
							onClick = {() => {props.getUsersThunkCreator()} }>all</NavLink>
				<NavLink 	to = {`/friends/onlyfriends`} 
							activeClassName={friends.active}
							onClick = {() => {props.getFriendsThunkCreator(true, props.page)} }>only friends</NavLink>
				<NavLink 	to = {`/friends/withoutfriends`} 
							activeClassName={friends.active}
							onClick = {() => {props.getFriendsThunkCreator(false, props.page)} }>without friends</NavLink>
			</nav>
			<div className={friends.search}>
				<SearchUserForm {...props}/>
			</div>
			{props.isNotFound && <div  className = {friends.notFound}>
									<img src= {notFoundAvatar} alt="notFound" height = "200px"/>
									Unfortunately the user with this name was not found
								</div>}
			<div className = {friends.friendsWrapper}>
				{props.allUsers.map((item, index) => <div  className = {friends.item} key = {index}>
												<NavLink to = {`/profile`} >
												<img 	src= {item.photos.large ? item.photos.large : avatar} 
														className = {props.toggleUsersId  === item.id ? friends.avatarImg : null}
														style = {item.followed===false ? {filter: "opacity(0.4)"}: null}
														alt="avatar" width = "150px" height = "150px"
														onClick = {() => showUserProfile(item.id)}/></NavLink>
												{/* <div style = {{backgroundImage: `url(${props.smallPhoto || process.env.PUBLIC_URL+avatar})`}}></div> */}
												<p className = {friends.nameFriend}>{item.name}</p>
												<p className = {friends.status}>{item.status}</p>
												<Button name = {!item.followed ? "add friend" : "unfriend"}
														onclick = {() => item.followed ?  unfollow(item.id) : follow(item.id)}
														isLoading = {props.toggleUsersId === item.id ? props.isLoading : null}
														disabled = {props.toggleUsersId === item.id}/>
											</div>
										)}
				
			</div>
			<button onClick = { showMoreUsers } 
					className = {friends.showMoreButton}>
					{props.isLoading ? <img src = {preloader} height = "7px" alt="preloader"/>  : "show more"}				
			</button>
		</div>)
	
}
