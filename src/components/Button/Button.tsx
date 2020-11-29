import React from 'react';
import buttonStyle from './Button.module.css';
import preloader from '../common/Preloader/preloader3.gif';
type propsType = {
	onclick?: () => void
	disabled?: boolean
	isLoading?: boolean | null
	name: string
	children?: React.ReactNode
}
export const Button: React.FC<propsType> = ({ onclick, disabled, isLoading, name, children }) => {
	
	return <button 	onClick = {onclick} 
					className = {buttonStyle.button}
					disabled = {disabled}>
				{isLoading ? <img src = {preloader} height = "7px" alt="preloader"/>  : name}
				{children}
			</button>
}

