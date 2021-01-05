import React from 'react';
import editForm from './EditProfileForm.module.css';
import { Button } from '../Button/Button';
import { Formik, Form, Field } from 'formik';
// import { maxLength200 } from '../../utils/validatators';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../../store/Actions';
import { isLoading, getAboutMe, getContacts, getAuthName, getUserId } from '../../store/selectors/selectors';
import { updateProfileDataThunkCreator } from '../../store/ProfileReducer';

const { showEditFormAC } = actions;

const EditProfileForm: React.FC = () => {
	const loading = useSelector(isLoading);
	const aboutMe = useSelector(getAboutMe);	
	const contacts = useSelector(getContacts);	
	const name = useSelector(getAuthName);
	const userId = useSelector(getUserId);	

	const dispatch = useDispatch();

	type statusFormValuesType = {
		fullName: string | null
		facebook: string | null
		instagram: string | null
		vk: string | null
		lookingForAJob: boolean
		aboutMe: string | null
	}
	return	<div className = {editForm.container} onClick = { () => dispatch(showEditFormAC())}>
 				<div className = {editForm.editBlock} onClick = {(event) => event.stopPropagation()}>
 					<h1 className = {editForm.title}>Update Your Profile</h1>
					<Formik
					initialValues={{ fullName: name, 
									 facebook: contacts.facebook,
									 instagram: contacts.instagram,			
									 vk: contacts.vk,				
									 lookingForAJob: true,				
									 aboutMe: aboutMe				
									 }}				
					onSubmit={(values:statusFormValuesType, { setSubmitting }) => {
						
						const dataValid = {
							id:userId,
							fullName: values.fullName,
							facebook: values.facebook,
							instagram: values.instagram,
							vk: values.vk,
							lookingForAJob: values.lookingForAJob,
							aboutMe: values.aboutMe
						}
						dispatch(updateProfileDataThunkCreator(dataValid));
						setSubmitting(false);						
					}}
				>
					{({ isSubmitting }) => (
					<Form className = {editForm.editProfileForm}>
						<p className = {editForm.titleField}>Your name:</p>
 						<Field className = {editForm.input} component = "input" type="text" name="fullName"/>
 						<p className = {editForm.titleField}>Facebook:</p>
 						<Field className = {editForm.input} component = "input" type="text" name="facebook"/>
						<p className = {editForm.titleField}>Instagram:</p>
						<Field className = {editForm.input} component = "input" type="text" name="instagram"/>
						<p className = {editForm.titleField}>Vkontakte:</p>
						<Field className = {editForm.input} component = "input" type="text" name="vk"/>
						<Field component = "input" type="checkbox" name="lookingForAJob" className = {editForm.checkbox}/>
						<span className = {editForm.titleField}>looking for a job</span>							
						<p className = {editForm.titleAboutMe}>About me:</p>
						<Field className = {editForm.textarea} component = "textarea" type="text" name="aboutMe"/>
						<Button name = "Edit" type="submit" disabled={isSubmitting} isLoading = {loading} />
						<Button name = "Cansel" onclick = {() => dispatch(showEditFormAC())}  />
					</Form>
					)}
					</Formik>
				</div>
 			</div>			
}  
export default EditProfileForm;