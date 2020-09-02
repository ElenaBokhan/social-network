import React, { useState } from 'react';
import editForm from '../../Profile/EditProfileForm.module.css'

export const Textarea = ({input, meta, ...props}) => {	
	const [textValue, setTextValue] = useState(props.current);
	return (
		<>
			<textarea { ...input } { ...props } value = { textValue } onChange = { (e)=> { setTextValue(e.target.value) } }/>
			<span className = {editForm.error}>{ meta.touched && meta.error }</span>
		</>
	)
}
export const Input = ({input, meta, ...props}) => {
	const [inputValue, setInputValue] = useState(props.current);
	return (
		<>
			<input {...input} {...props} value = { inputValue } onChange = { (e)=> { setInputValue(e.target.value) } }/>
			<span className = {editForm.error}>{meta.touched && meta.error}</span>
		</>
	)
}