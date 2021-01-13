import React from 'react';
import postStyle from './Post.module.css';
import { Button } from '../Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { getIsActiveTextarea, getSmallPhoto, getAvatar } from '../../store/selectors/selectors';
import { actions } from '../../store/Actions';
import { Formik, Form, Field } from 'formik';

const { increaseTextarea, addPost } = actions;
const AddPostForm = () => {
	const isActiveTextarea = useSelector(getIsActiveTextarea);
	const smallPhoto = useSelector(getSmallPhoto);
	const avatar = useSelector(getAvatar);	
	const dispatch = useDispatch();
	return	<Formik
					initialValues={{ text: ''}}				
					onSubmit={(values: {text:string}, { setSubmitting, resetForm }) => {
						values.text && dispatch(addPost(values.text));
						setSubmitting(false);					
						resetForm();					
					}}
				>
					{({ isSubmitting }) => (
					<Form className = { postStyle.addPost }>
						<div className = {postStyle.avatarSmall} style = {{backgroundImage: `url(${smallPhoto || process.env.PUBLIC_URL+avatar})`}}></div>
						<Field 	component = "textarea" 
								name = "text"
								type = "text"
								className = {postStyle.input} 
								style = {{height: isActiveTextarea ? "100px": "inherit"}} 
								placeholder = "What's the News?"
								onClick = {() => dispatch(increaseTextarea(true))}
								onBlur = {() => dispatch(increaseTextarea(false))}
						/>
						<Button name = "Add post" type="submit" disabled={isSubmitting}/>
					</Form>
					)}
				</Formik>		
}  
export default AddPostForm;