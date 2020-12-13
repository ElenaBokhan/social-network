import React, { useState } from 'react';
import { WrappedFieldProps } from 'redux-form';
import editForm from '../../Profile/EditProfileForm.module.css'

type propsType = {
	current: string
}
export const Textarea: React.FC<WrappedFieldProps & propsType> = ({input, meta: {touched, error}, ...props}) => {	
	const [textValue, setTextValue] = useState(props.current);
	return (
		<>
			<textarea { ...props } { ...input }
					  onChange = { (e) => setTextValue(e.target.value) }
					  value = { textValue } />
			<span className = {editForm.error}>{ touched && error }</span>
		</>
	)
}
export const Input: React.FC<WrappedFieldProps & propsType> = ({input, meta: {touched, error}, ...props}) => {
	const [inputValue, setInputValue] = useState(props.current);
	return (
		<>
			<input 	{...input} {...props} 
					onChange = { (e)=> { setInputValue(e.target.value) } }
				   	value = { inputValue } />
			<span className = {editForm.error}>{ touched && error }</span>
		</>
	)
}