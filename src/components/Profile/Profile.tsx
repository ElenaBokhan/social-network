import React from 'react';
import profile from './Profile.module.css';
import { Edit } from '../common/Buttons/Edit/Edit';
import { PostContainer } from '../Post/PostContainer';
import { useState } from 'react';
import StatusForm from './StatusForm';
import EditProfileForm from './EditProfileForm';
import { Button } from '../Button/Button';
import { NavLink } from 'react-router-dom';
import preloader from '../common/Preloader/preloader3.gif';
import { contactsType, photosType, updateDataType, uploadPhotoType } from '../../types/types';

export type propsProfileType = {
	editMode: boolean
	avatar: string
	photo: photosType,	
	randomFriends: Array<string>
	authId: number | null
	isLoading: boolean
	userId: number | null
	name: string | null
	contacts: contactsType	
	aboutMe: string | null
	job: boolean
	status: string | null
	isShowEditForm: boolean
	updateProfileDataThunkCreator: (data: updateDataType) => void
	uploadPhotoThunkCreator: (data: uploadPhotoType) => void
	updateStatusThunkCreator: (status: string) => void
	showEditForm: () => void
	startDialog: (userId: number | null) => void
}
export const Profile = (props: propsProfileType) => {
	const { userId, editMode, isLoading, photo, contacts, isShowEditForm, status,
		    uploadPhotoThunkCreator, randomFriends, name, showEditForm, aboutMe } = props;
	
	const [inputStatus, setInputStatus] = useState(true);

	const editTagStatus = () => {
		setInputStatus(!inputStatus);
	}
	const uploadPhoto = (event: any) =>{
		const photoFile = event.target.files[0];
		photoFile && uploadPhotoThunkCreator(photoFile);		
	}
	return (
		<div className = { profile.container }>
			{ isShowEditForm && <EditProfileForm {...props}/> }			
			<section className = { profile.avatarBlock }>
				<div className = { profile.avatar } style = {{ backgroundImage: `url(${photo.large || process.env.PUBLIC_URL+props.avatar})` }}></div>
				{ editMode 	?	<>	<input className = { profile.changePhoto } type="file" id="fileElem" onChange = {uploadPhoto}/> 
									<label htmlFor="fileElem">Change avatar</label>
								</>
							: 	<div className = { profile.options }>
									<Button name = { "follow" } />
									<NavLink to = { `/dialogs/${userId}` }>
										<Button name = {"write message"} onclick = { ()=> props.startDialog(userId) }/>
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
				{inputStatus 	? 	isLoading ? <img src = {preloader} height = "7px" alt="preloader"/>
											  : <>	<span className = {profile.status}>{ status }</span>
													{editMode && <Edit onclick = {editTagStatus}/>}
												</>
								: <StatusForm editTagStatus = { editTagStatus } {...props}/>}
				<h3>Contacts:</h3>
				<p>Facebook: <span className = { profile.contact }>{contacts.facebook}</span></p>
				<p>Instagram: <span className = { profile.contact }>{contacts.instagram}</span></p>
				<p>VK: <span className = { profile.contact }>{contacts.vk}</span></p>
				<hr />
				<input type="radio" className = { profile.radio } id="radio" checked = {props.job} readOnly/>
					<label htmlFor ="radio" >looking for a job</label>
				<hr />
				<h3>About me:</h3>
				<p>{ aboutMe }</p>
				{ editMode && <div onClick = { showEditForm } className = {profile.editButton}>Edit data</div>}
			</section>			
			<PostContainer />
		</div>
	)
}
