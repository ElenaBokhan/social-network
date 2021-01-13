import React from 'react';
import profile from './Profile.module.css';
import { Edit } from '../common/Buttons/Edit/Edit';
import { Post } from '../Post/Post';
import { useState } from 'react';
import StatusForm from './StatusForm';
import EditProfileForm from './EditProfileForm';
import { Button } from '../Button/Button';
import { NavLink } from 'react-router-dom';
import preloader from '../common/Preloader/preloader3.gif';
import { withoutAuthRedirect } from '../../hoc/withAuthRedirect';
import { actions } from '../../store/Actions';
import { uploadPhotoThunkCreator } from '../../store/ProfileReducer';
import { startDialog } from '../../store/DialogsReducer';
import { useDispatch, useSelector } from 'react-redux';
import { getAvatar, getEditMode, getPhoto, isShowEditForm, getAvatarFriends, isLookingForAJob, isLoading, getStatus, getUserId, getName, getContacts, getAboutMe } from '../../store/selectors/selectors';

const { showEditFormAC } = actions;

export const Profile: React.FC = () => {
	const editMode = useSelector(getEditMode);
	const avatar = useSelector(getAvatar);
	const photo = useSelector(getPhoto);
	const randomFriends = useSelector(getAvatarFriends);
	const loading = useSelector(isLoading);
	const userId = useSelector(getUserId);
	const name = useSelector(getName);
	const contacts = useSelector(getContacts);
	const aboutMe = useSelector(getAboutMe);
	const job = useSelector(isLookingForAJob);
	const status = useSelector(getStatus);
	const showEditForm = useSelector(isShowEditForm);
	const dispatch = useDispatch();

	const [inputStatus, setInputStatus] = useState(true);

	const editTagStatus = () => {
		setInputStatus(!inputStatus);
	}
	const uploadPhoto = (event: any) =>{
		const photoFile = event.target.files[0];
		photoFile && dispatch(uploadPhotoThunkCreator(photoFile));		
	}
	return (
		<div className = { profile.container }>
			{ showEditForm && <EditProfileForm /> }			
			<section className = { profile.avatarBlock }>
				<div className = { profile.avatar } style = {{ backgroundImage: `url(${photo.large || process.env.PUBLIC_URL+avatar})` }}></div>
				{ editMode 	?	<>	<input className = { profile.changePhoto } type="file" id="fileElem" onChange = {uploadPhoto}/> 
									<label htmlFor="fileElem">Change avatar</label>
								</>
							: 	<div className = { profile.options }>
									<Button name = { "follow" } />
									<NavLink to = { `/dialogs/${userId}` }>
										<Button name = {"write message"} onclick = { ()=> dispatch(startDialog(userId as number)) }/>
									</NavLink>
								</div>}
					<h3  className = {profile.titleFriends}>Friends</h3>
					{ randomFriends.map((item, index) => <div 	style = {{ backgroundImage: `url(${process.env.PUBLIC_URL+item})` }}
																className = {profile.avatarFriend}
																key = { index }>																	
														 </div>)}
			</section>
			<section className = {profile.info}>
				<p className = {profile.name}>{ name }</p>
				{inputStatus 	? 	loading ? <img src = {preloader} height = "7px" alt="preloader"/>
											  : <>	<span className = {profile.status}>{ status }</span>
													{editMode && <Edit onclick = { editTagStatus }/>}
												</>
								: <StatusForm editTagStatus = { editTagStatus } />}
				<h3>Contacts:</h3>
				<p>Facebook: <span className = { profile.contact }>{contacts.facebook}</span></p>
				<p>Instagram: <span className = { profile.contact }>{contacts.instagram}</span></p>
				<p>VK: <span className = { profile.contact }>{contacts.vk}</span></p>
				<hr />
				<input type="radio" className = { profile.radio } id="radio" checked = {job} readOnly/>
					<label htmlFor ="radio" >looking for a job</label>
				<hr />
				<h3>About me:</h3>
				<p>{ aboutMe }</p>
				{ editMode && <div onClick = { () => dispatch(showEditFormAC()) } className = {profile.editButton}>Edit data</div>}
			</section>			
			<Post />
		</div>
	)
}
export default withoutAuthRedirect(Profile)
