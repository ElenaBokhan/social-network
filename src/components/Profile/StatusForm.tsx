import React from 'react';
import profile from './Profile.module.css';
import { Formik, Form, Field } from 'formik';
import { Button } from '../Button/Button';
import { useDispatch } from 'react-redux';
import { updateStatusThunkCreator } from '../../store/ProfileReducer';

const StatusForm: React.FC<{ editTagStatus: () => void }> = ({ editTagStatus }) => {	
	const dispatch = useDispatch();
	return	<Formik
					initialValues={{ status: ''}}				
					onSubmit={(values: {status:string}, { setSubmitting }) => {
						dispatch(updateStatusThunkCreator(values.status));		
						editTagStatus();
						setSubmitting(false);
					}}
				>
					{({ isSubmitting }) => (
					<Form style = {{ display: "flex" }}>
						<Field 	component = "input" 
								name = "status"
								type = "text"
								className = {profile.statusInput} 								 
								placeholder = "Is your status update?"
								autoFocus
						/>
						<Button name = "Edit" type="submit" disabled={isSubmitting}/>
					</Form>
					)}
				</Formik>		
}  
export default StatusForm;


