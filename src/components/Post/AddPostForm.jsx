import React from 'react';
import postStyle from './Post.module.css';
import { Field, reduxForm, reset } from 'redux-form';
import { Button } from '../Button/Button';

let PostForm = props => {
  const { handleSubmit } = props
  return <form onSubmit = { handleSubmit } className = { postStyle.addPost }>
			<div className = {postStyle.avatarSmall} style = {{backgroundImage: `url(${props.smallPhoto || process.env.PUBLIC_URL+props.avatar})`}}></div>
			<Field	component = "textarea" 
					name = "text"
					type = "text"
					className = {postStyle.input} 
					style = {{height: props.isActiveTextarea ? "100px": "inherit"}} 
					placeholder = "What's the News?"
					onClick = {() => props.increaseTextarea(true)}
					onBlur = {() => props.increaseTextarea(false)}/>
			<Button name = "Add post"/>
		</form>
}
const afterSubmit = (result, dispatch) =>
	dispatch(reset("addPost"));

PostForm = reduxForm({ 
  form: "addPost",
  onSubmitSuccess: afterSubmit,
})(PostForm)

class AddPostForm extends React.Component {
	submit = values => {
		values.text && this.props.addPost(values.text);
	}
	render() {
		return <PostForm onSubmit={this.submit} {...this.props} />
	}
  }
  export default AddPostForm;