import React from 'react';
import dialog from './Dialogs.module.css';
import { Field, InjectedFormProps, reduxForm, reset } from 'redux-form';
import { Button } from '../Button/Button';
import  button from '../Button/Button.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { sendMessage } from '../../store/DialogsReducer';
import { isLoading } from '../../store/selectors/selectors';

let SendForm: React.FC<InjectedFormProps<SendMessageFormValuesType, propsType> & propsType> = props => {
	const loading = useSelector(isLoading);
	const { handleSubmit, id } = props
	return <form onSubmit = { handleSubmit } className = { dialog.sendMessageForm }>			
			<Field	component = "textarea" 
					name = "text"
					type = "text"
					className = { dialog.input }
					placeholder = "Text your message"/>
			<Button name = "Send" disabled = { id === +"0" }
					isLoading = { loading }>
				<svg className = { button.sendIcon } xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve" height="18px" version="1.1" viewBox="0 0 42349.93 39650.92" xmlnsXlink="http://www.w3.org/1999/xlink"><polygon points="0,0 42349.93,19825.46 0,39650.92 0,24987.12 19215.74,19825.46 0,14663.8 "/></svg>
			</Button>
		</form>
}
const afterSubmit = (result: any, dispatch: any) =>
	dispatch(reset("SendForm"));

const SendReduxForm = reduxForm<SendMessageFormValuesType, propsType>({ 
	form: "SendForm",
	onSubmitSuccess: afterSubmit,
})(SendForm)

type propsType = {
	id: number
}
type SendMessageFormValuesType = {
	text: string
}
const SendMessageForm: React.FC<{id: number}> = ({id}) => {
	const dispatch = useDispatch();
	const submit = (values: SendMessageFormValuesType) => {		
		values.text && dispatch(sendMessage(id, values.text));
	}
	return <SendReduxForm onSubmit = { submit } id = { id }/>
}
export default SendMessageForm;