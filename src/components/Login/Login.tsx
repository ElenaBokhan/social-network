import React from 'react';
import { Field, InjectedFormProps, reduxForm, WrappedFieldProps } from 'redux-form';
import loginStyles from './Login.module.css';
import { Button } from '../Button/Button';
import { emptyField, validatorsType  } from '../../utils/validatators';
import { useDispatch, useSelector } from 'react-redux';
import { authUserId, isLoading } from '../../store/selectors/selectors';
import { loginUserThunkCreator } from '../../store/AuthReducer';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';


const Input: React.FC<WrappedFieldProps> = ({input, meta:{error, touched}, ...props}) => {	
	return (
		<div className = {error && touched ? loginStyles.error : undefined}>
			<input {...input} {...props}/>
			<span>{touched && error}</span>
		</div>
	)
}

function createField <KeysType extends string> (component: React.FC<WrappedFieldProps> | React.Component<WrappedFieldProps> | string, 
												type: string,
												name: KeysType, 
												validate: Array<validatorsType>, 
												props = {} ) {
	return <Field {...props}
				  component = { component } 				   
				  type = { type }
				  name = { name } 
				  validate = { validate } 
				   />
} 
const AuthForm: React.FC<InjectedFormProps<loginFormValuesType, propsType> & propsType> = props => {
	const { handleSubmit } = props;
	const isLoadingData = useSelector(isLoading);

	return 	<div className = {loginStyles.container}>
					<div className = {loginStyles.loginBlock}>
						<form  onSubmit={handleSubmit}>
							{props.error && <span className = {loginStyles.errorMsg}>{props.error}</span>}
							<p className = {loginStyles.title}>LOGIN</p>
							{ createField<loginFormValuesTypeKeys>(Input, "text", "login", [emptyField]) }							
							<p className = {loginStyles.title}>PASSWORD</p>
							{ createField<loginFormValuesTypeKeys>(Input, "password", "password", [emptyField]) }							
							{ createField<loginFormValuesTypeKeys>("input", "checkbox", "rememberMe", [], {className:loginStyles.checkbox}) }							
							<span className = {loginStyles.title}>Remember me</span>
							<Button name = "log in" isLoading = {isLoadingData}>
								<svg className = {loginStyles.exitIcon} xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve"  height="18px" version="1.1" viewBox="0 0 0.76 0.92" xmlnsXlink="http://www.w3.org/1999/xlink"><path d="M0.09 0.92l0.52 0c0.01,-0.01 0.03,-0.01 0.04,-0.01 0.03,-0.02 0.05,-0.05 0.06,-0.09 0,-0.04 0,-0.15 -0.01,-0.19 0,0.01 -0.01,0.01 -0.01,0.02l-0.05 0.03c-0.01,0.01 0,0.01 0,0.03 0,0.16 0.01,0.14 -0.18,0.14l-0.31 0c-0.07,0 -0.08,0 -0.08,-0.08l0 -0.62c0,-0.1 0,-0.08 0.23,-0.08 0.05,0 0.1,0 0.15,0 0.04,0 0.14,0 0.16,0 0.04,0.01 0.03,0.08 0.03,0.13 0,0.03 -0.01,0.03 0.02,0.05 0.02,0.01 0.03,0.03 0.04,0.04 0.01,-0.04 0.01,-0.15 0.01,-0.19 -0.01,-0.03 -0.02,-0.05 -0.03,-0.07 -0.02,-0.02 -0.05,-0.03 -0.06,-0.03l-0.53 0c-0.02,0.01 -0.03,0.01 -0.05,0.02 -0.05,0.04 -0.04,0.11 -0.04,0.17 0,0.18 0,0.36 0,0.54 0,0.05 -0.01,0.09 0.01,0.13 0.03,0.04 0.06,0.04 0.08,0.06l0 0zm0.37 -0.66c0,0 0,0.08 0,0.09 -0.03,0 -0.21,0 -0.22,0.01 -0.04,0 -0.03,0.12 -0.03,0.16 0,0.03 0.01,0.04 0.03,0.04 0.01,0.01 0.19,0.01 0.22,0.01 0,0.02 -0.01,0.07 0,0.08 0,0.02 0.01,0.05 0.03,0.04 0.01,-0.01 0.04,-0.03 0.04,-0.04 0.01,0 0.01,-0.01 0.02,-0.01l0.21 -0.18c-0.01,-0.01 -0.03,-0.02 -0.04,-0.03l-0.07 -0.07c-0.03,-0.02 -0.13,-0.11 -0.15,-0.13 -0.02,-0.01 -0.04,0 -0.04,0.03l0 0z"/></svg>
							</Button>
							<p className = {loginStyles.addition}>Для тестового просмотра используйте пару логин/пароль: <br/><strong>free@socialnet.com / free</strong></p>
						</form>
					</div>
				</div>	
}
const AuthReduxForm = reduxForm<loginFormValuesType, propsType >({ form: 'login'})(AuthForm)

type propsType = {	
	authId: number | null	
}
type loginFormValuesType = {
	login: string
	password: string
	rememberMe: boolean
}
type loginFormValuesTypeKeys = Extract<keyof loginFormValuesType, string>

export const Login = () => {

	const authId = useSelector(authUserId);
	const dispatch = useDispatch();

	const submit = (values: loginFormValuesType) => {
		let {login, password, rememberMe} = values;
		password = password.trim();
		if(login === "free@socialnet.com" && password === "free") {
			login = "clevergirl_777@mail.ru";
			password = "hellen";
		}
		
		dispatch(loginUserThunkCreator({email:login, password, rememberMe, captcha:true}));
		
	}
	return <AuthReduxForm onSubmit={submit} authId = {authId}/>	
}
export default withAuthRedirect(Login);


