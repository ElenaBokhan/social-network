import React from 'react';
import dialog from './Chat.module.css';
import { Formik, Form, Field } from 'formik';
import { Button } from '../Button/Button';
import  button from '../Button/Button.module.css';

const SendToChatForm: React.FC<{ws:WebSocket}> = ({ws}) => {
	return	<Formik
					initialValues={{ text: ''}}				
					onSubmit={(values: {text:string}, { setSubmitting, resetForm }) => {
						values.text && ws.send(values.text);
						resetForm();						
						setSubmitting(false);
					}}
				>
					{({ isSubmitting }) => (
					<Form className = { dialog.sendMessageForm }>
						<Field	component = "textarea" 
								name = "text"
								type = "text"
								className = { dialog.input }
								placeholder = "Text your message" />
						<Button name = "Send" type="submit" disabled={isSubmitting}>
							<svg className = { button.sendIcon } xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve" height="18px" version="1.1" viewBox="0 0 42349.93 39650.92" xmlnsXlink="http://www.w3.org/1999/xlink"><polygon points="0,0 42349.93,19825.46 0,39650.92 0,24987.12 19215.74,19825.46 0,14663.8 "/></svg>
						</Button>
					</Form>
					)}
			</Formik>		
}  
export default SendToChatForm;
