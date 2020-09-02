import React from 'react';
import dialog from './Dialogs.module.css';
import { Field, reduxForm, reset } from 'redux-form';
import { Button } from '../Button/Button';
import  button from '../Button/Button.module.css';

let SendForm = props => {
  const { handleSubmit } = props
  return <form onSubmit = { handleSubmit } className = { dialog.sendMessageForm }>			
			<Field	component = "textarea" 
					name = "text"
					type = "text"
					className = {dialog.input}
					placeholder = "Text your message"/>
			<Button name = "Send" disabled = {props.id === +"0"}
					isLoading = {props.isLoading}>
				<svg className = { button.sendIcon }xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve" height="18px" version="1.1" viewBox="0 0 42349.93 39650.92" xmlnsXlink="http://www.w3.org/1999/xlink"><polygon points="0,0 42349.93,19825.46 0,39650.92 0,24987.12 19215.74,19825.46 0,14663.8 "/></svg>
			</Button>
		</form>
}
const afterSubmit = (result, dispatch) =>
	dispatch(reset("SendForm"));

SendForm = reduxForm({ 
	form: "SendForm",
	onSubmitSuccess: afterSubmit,
})(SendForm)

class SendMessageForm extends React.Component {
	submit = values => {
		// const id = 9123;
		values.text && this.props.sendMessage(this.props.id, values.text);
	}
	render() {
		return <SendForm onSubmit={this.submit} {...this.props} />
	}
  }
  export default SendMessageForm;