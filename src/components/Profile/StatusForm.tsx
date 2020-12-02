import React from 'react';
import profile from './Profile.module.css';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { Button } from '../Button/Button';
import { contactsType, photosType, updateDataType, uploadPhotoType } from '../../types/types';


// import { Input } from '../common/formFields/formFields';


const StForm: React.FC<InjectedFormProps<statusFormValuesType>> = ({ handleSubmit }) => {
   return <form onSubmit = { handleSubmit } style = {{ display: "flex" }}>			
			<Field	className = {profile.statusInput}
					component = "input"
					name = "status"
					type = "text"
					placeholder = "Is your status update?" 
					autoFocus/>
			<Button name = "Edit"/>
		</form>
}

const StReduxForm = reduxForm<statusFormValuesType>({ 
  form: "editStatus",
})(StForm)

type statusFormValuesType = {
	status: string
}
type propsType = {
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
	editTagStatus: () => void
}
 const StatusForm  = (props: propsType) => {
	const submit = (values: statusFormValuesType) => {
		props.updateStatusThunkCreator(values.status)		
		// props.editTagStatus()
	}
	
		return <StReduxForm onSubmit = { submit } />		
}
export default StatusForm


