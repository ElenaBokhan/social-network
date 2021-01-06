import React from 'react';
import friends from './Friends.module.css';
import { NavLink } from 'react-router-dom';
import notFoundAvatar from '../../assets/img/notfound.png';
import { Button } from '../Button/Button';
import avatar from '../../assets/img/avatar.png';
import SearchUserForm from './SearchUserForm';
import preloader from '../common/Preloader/preloader3.gif';
import { withoutAuthRedirect } from '../../hoc/withAuthRedirect';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUserData, isNotFound, getToggleUsersId, getPage } from '../../store/selectors/selectors';
import { getUsersThunkCreator, getMoreUsersThunkCreator, followThunkCreator, unfollowThunkCreator, getFriendsThunkCreator, getMoreFriendsThunkCreator } from '../../store/FriendsReducer';
import { setProfileUserThunkCreator, setStatusThunkCreator } from '../../store/ProfileReducer';
import { actions } from '../../store/Actions';

const { setNextPage } = actions;

export const Friends: React.FC<{view: string}> = ({ view }) => {

	const allUsers = useSelector(getAllUserData);
	const isFound = useSelector(isNotFound);
	const toggleUsersId = useSelector(getToggleUsersId);
	const page = useSelector(getPage);
	const dispatch = useDispatch();

	const showMoreUsers = () => {
		dispatch(setNextPage());
		if(view === "onlyfriends"){
			dispatch(getMoreFriendsThunkCreator(true, page));
		}else if(view === "withoutfriends"){
			dispatch(getMoreFriendsThunkCreator(false, page));
		} else {
			dispatch(getMoreUsersThunkCreator(page));	
		}	
	}
	const showUserProfile = (id: number) => {		
		dispatch(setProfileUserThunkCreator(id));	
		dispatch(setStatusThunkCreator(id));
	}
	const follow = (id: number) => {
		dispatch(followThunkCreator(id, page));		
	}
	const unfollow = (id: number) => {
		dispatch(unfollowThunkCreator(id, page));		
	}
	return (
		<div className = { friends.container }>			
			<nav className = { friends.nav }>
				<span>Show: </span>
				<NavLink 	to = {`/friends/all`} 
							activeClassName = { friends.active }
							onClick = { () => dispatch(getUsersThunkCreator()) }>all</NavLink>
				<NavLink 	to = {`/friends/onlyfriends`} 
							activeClassName = { friends.active }
							onClick = { () => dispatch(getFriendsThunkCreator(true, page)) }>only friends</NavLink>
				<NavLink 	to = {`/friends/withoutfriends`} 
							activeClassName = { friends.active }
							onClick = { () => dispatch(getFriendsThunkCreator(false, page)) }>without friends</NavLink>
			</nav>
			<div className={friends.search}>
				<SearchUserForm />
			</div>
			{isFound && <div  className = { friends.notFound }>
								<img src = { notFoundAvatar } alt="notFound" height = "200px"/>
								Unfortunately the user with this name was not found
							</div>}
			<div className = {friends.friendsWrapper}>
				{allUsers.map((item, index) => 	<div className = { friends.item } 
													 key = { index }
													 onClick = { () => showUserProfile(item.id) }>
													<NavLink to = {`/profile`} >
													<img 	src = { item.photos.large ? item.photos.large : avatar } 
															className = { toggleUsersId === item.id ? friends.avatarImg : undefined }
															style = { item.followed === false ? {filter: "opacity(0.4)"} : undefined }
															alt = "avatar" width = "150px" height = "150px"
															/>
															</NavLink>
													<p className = { friends.nameFriend }>{ item.name }</p>
													<p className = { friends.status }>{ item.status }</p>
													<Button name = { !item.followed ? "add friend" : "unfriend" }
															onclick = { () => item.followed ? unfollow(item.id) : follow(item.id)}
															isLoading = { toggleUsersId === item.id ? isFound : null }
															disabled = { toggleUsersId === item.id }/>
												</div>
										)}
			</div>
			<button onClick = { showMoreUsers } 
					className = { friends.showMoreButton }>
					{ isFound ? <img src = { preloader } height = "7px" alt = "preloader"/> : "show more"}
			</button>
		</div>)
	
}
export default withoutAuthRedirect(Friends)