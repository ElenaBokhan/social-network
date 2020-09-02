import React from 'react';
import profile from './Profile.module.css';
import { Field, reduxForm } from 'redux-form';
import { Button } from '../Button/Button';


let StForm = props => {
  const { handleSubmit } = props;
  return <form onSubmit = { handleSubmit } style = {{display: "flex"}}>			
			<Field	className = {profile.statusInput}
					component = "input"
					name = "status"
					type = "text"
					placeholder = "Is your status update?" 
					autoFocus/>
			<Button name = "Edit"/>
		</form>
}

StForm = reduxForm({ 
  form: "editStatus",
})(StForm)

class StatusForm extends React.Component {
	submit = values => {
		this.props.updateStatusThunkCreator(values)
		console.log(values);
		this.props.editTag()
	}
	render() {
		return <StForm onSubmit={this.submit} {...this.props} />
	}
  }
  export default StatusForm;