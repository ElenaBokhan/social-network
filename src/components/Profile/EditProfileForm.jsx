import React from 'react';
import { Field, reduxForm } from 'redux-form';
import editForm from './EditProfileForm.module.css';
import { Button } from '../Button/Button';
import { maxLength200 } from '../../utils/validatators';
import { Input, Textarea } from '../common/formFields/formFields';


let EditForm = props => {
	
	const { handleSubmit, contacts } = props;
	return 	<div className = {editForm.container} onClick = {props.showEditForm}>
					<div className = {editForm.editBlock} onClick = {(event) => event.stopPropagation()}>
						<h1 className = {editForm.title}>Update Your Profile</h1>
						<form  onSubmit={handleSubmit} className = {editForm.editProfileForm}>
							<p className = {editForm.titleField}>Your name:</p>
							<Field className = {editForm.input} component = {Input} current = {props.name} type="text" name="fullName"/>
							<p className = {editForm.titleField}>Facebook:</p>
							<Field className = {editForm.input} component = {Input} current = {contacts.facebook} type="text" name="facebook"/>
							<p className = {editForm.titleField}>Instagram:</p>
							<Field className = {editForm.input} component = {Input} current = {contacts.instagram} type="text" name="instagram"/>
							<p className = {editForm.titleField}>Vkontakte:</p>
							<Field className = {editForm.input} component = {Input} current = {contacts.vk} type="text" name="vk"/>
							<Field component = "input" type="checkbox" name="lookingForAJob" className = {editForm.checkbox}/>
							<span className = {editForm.titleField}>looking for a job</span>							
							<p className = {editForm.titleAboutMe}>About me:</p>
							<Field className = {editForm.textarea} component = {Textarea} validate = {[maxLength200]} current = {props.aboutMe} type="text" name="aboutMe"/>
							<Button name = "Edit" isLoading = {props.isLoading} />
							<Button name = "Cansel" onclick = {props.showEditForm} />
						</form>
					</div>
				</div>	
}
EditForm = reduxForm({ form: "updateUserProfile"})(EditForm)

export default class EditProfileForm extends React.Component {
	submit = values => {		
		const {fullName, facebook, instagram, vk, lookingForAJob, aboutMe} = values;
		const dataValid = {
			id:this.props.userId,
			fullName: fullName || this.props.name,
			facebook: facebook || this.props.facebook,
			instagram: instagram || this.props.instagram,
			vk: vk || this.props.vk,
			lookingForAJob: lookingForAJob || this.props.lookingForAJob,
			aboutMe: aboutMe || this.props.aboutMe
		}
		this.props.updateProfileDataThunkCreator(dataValid)
	}
	render() {
		return <EditForm onSubmit={this.submit} {...this.props}/>
	}
}



