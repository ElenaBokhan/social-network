import React from 'react';
import buttonStyle from './Button.module.css';
import preloader from '../common/Preloader/preloader3.gif';

export const Button = (props) => {
	return <button 	onClick = {props.onclick} 
					className = {buttonStyle.button}
					disabled = {props.disabled}>					 
				{props.isLoading ? <img src = {preloader} height = "7px" alt="preloader"/>  : props.name}
				{props.children}
			</button>
}

