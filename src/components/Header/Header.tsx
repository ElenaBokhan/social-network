import React from 'react';
import headStyles from './Header.module.css';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authUserId, getAuthName, getAuthPhoto, getUserId, isAuthUser } from '../../store/selectors/selectors';
import { setProfileDataThunkCreator, setStatusThunkCreator } from '../../store/ProfileReducer';
import { logoutUserThunkCreator } from '../../store/AuthReducer';

export const Header: React.FC = () => {

	const authId = useSelector(authUserId);
	const isAuth = useSelector(isAuthUser);
	const userId = useSelector(getUserId);
	const name = useSelector(getAuthName);
	const smallPhoto = useSelector(getAuthPhoto);
	const dispatch = useDispatch();

	const showAuthUserData = () => {
		dispatch(setProfileDataThunkCreator(authId));
		dispatch(setStatusThunkCreator(authId));
	}
	const logOut = () => {
		dispatch(logoutUserThunkCreator());
	}
	return 	<div className = {headStyles.header}>
					<div className = {headStyles.menu}>
						<nav>
							<NavLink to = "/home" 	className = {headStyles.menuItem} 
													activeClassName={headStyles.active}>Home</NavLink>
							<NavLink to = "/profile" 	className = {headStyles.menuItem} 
														activeClassName={headStyles.active}
														onClick = {()=> {showAuthUserData()}}
														>Profile</NavLink>
							<NavLink to = "/dialogs/ " className = {headStyles.menuItem} 
														activeClassName={headStyles.active}>Dialogs</NavLink>					
							<NavLink to = "/photos" 	className = {headStyles.menuItem} 
														activeClassName={headStyles.active}>Photos</NavLink>
							<NavLink to = "/friends" 	className = {headStyles.menuItem} 
														activeClassName={headStyles.active}>Friends</NavLink>
						</nav>
						<div className = {headStyles.authBlock}>
							{isAuth ? <>	<div className = {headStyles.avatar} style = {{backgroundImage: `url(${smallPhoto})`}}></div>
												<span className = {headStyles.name}>{name}</span>
												<button className = {headStyles.exit}>
													<svg 	className = {headStyles.exitIcon}
															onClick = { logOut }
														xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve" width="20px" height="31px" version="1.1" viewBox="0 0 0.76 0.92" xmlnsXlink="http://www.w3.org/1999/xlink"><path d="M0.09 0.92l0.52 0c0.01,-0.01 0.03,-0.01 0.04,-0.01 0.03,-0.02 0.05,-0.05 0.06,-0.09 0,-0.04 0,-0.15 -0.01,-0.19 0,0.01 -0.01,0.01 -0.01,0.02l-0.05 0.03c-0.01,0.01 0,0.01 0,0.03 0,0.16 0.01,0.14 -0.18,0.14l-0.31 0c-0.07,0 -0.08,0 -0.08,-0.08l0 -0.62c0,-0.1 0,-0.08 0.23,-0.08 0.05,0 0.1,0 0.15,0 0.04,0 0.14,0 0.16,0 0.04,0.01 0.03,0.08 0.03,0.13 0,0.03 -0.01,0.03 0.02,0.05 0.02,0.01 0.03,0.03 0.04,0.04 0.01,-0.04 0.01,-0.15 0.01,-0.19 -0.01,-0.03 -0.02,-0.05 -0.03,-0.07 -0.02,-0.02 -0.05,-0.03 -0.06,-0.03l-0.53 0c-0.02,0.01 -0.03,0.01 -0.05,0.02 -0.05,0.04 -0.04,0.11 -0.04,0.17 0,0.18 0,0.36 0,0.54 0,0.05 -0.01,0.09 0.01,0.13 0.03,0.04 0.06,0.04 0.08,0.06l0 0zm0.37 -0.66c0,0 0,0.08 0,0.09 -0.03,0 -0.21,0 -0.22,0.01 -0.04,0 -0.03,0.12 -0.03,0.16 0,0.03 0.01,0.04 0.03,0.04 0.01,0.01 0.19,0.01 0.22,0.01 0,0.02 -0.01,0.07 0,0.08 0,0.02 0.01,0.05 0.03,0.04 0.01,-0.01 0.04,-0.03 0.04,-0.04 0.01,0 0.01,-0.01 0.02,-0.01l0.21 -0.18c-0.01,-0.01 -0.03,-0.02 -0.04,-0.03l-0.07 -0.07c-0.03,-0.02 -0.13,-0.11 -0.15,-0.13 -0.02,-0.01 -0.04,0 -0.04,0.03l0 0z"/></svg>
												</button></>
									: <NavLink to = "/auth" className = {headStyles.authLink}>Log in</NavLink>}
						</div>
					</div>
				</div>	
}