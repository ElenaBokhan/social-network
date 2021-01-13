import React from 'react';
import dialog from './Dialogs.module.css';
import { Button } from '../Button/Button';
import  button from '../Button/Button.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import { sendMessage } from '../../store/DialogsReducer';
import { isLoading } from '../../store/selectors/selectors';


const SendMessageForm: React.FC<{id: number}> = ({id}) => {	
	
	const loading = useSelector(isLoading);
	const dispatch = useDispatch();

	return	<Formik
					initialValues={{ text: ''}}				
					onSubmit={(values: {text:string}, { setSubmitting, resetForm }) => {
						values.text && dispatch(sendMessage(id, values.text));						
						setSubmitting(false);					
						resetForm();					
					}}
				>
					{({ isSubmitting, handleSubmit }) => (
					<Form className = { dialog.sendMessageForm }
						  onKeyDown={(e) => {
							if (e.key === 'Enter') {
								handleSubmit();	
								e.preventDefault();						
							}}}
						  >						
						<Field	component = "textarea" 
								name = "text"
								type = "text"
								className = { dialog.input }
								placeholder = "Text your message"/>
						<Button name = "Send" disabled = { id === +"0" }
								type="submit"
								isLoading = { loading }>
							<svg className = { button.sendIcon } xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve" height="18px" version="1.1" viewBox="0 0 42349.93 39650.92" xmlnsXlink="http://www.w3.org/1999/xlink"><polygon points="0,0 42349.93,19825.46 0,39650.92 0,24987.12 19215.74,19825.46 0,14663.8 "/></svg>
						</Button>						
					</Form>
					)}
				</Formik>	
}
export default SendMessageForm;