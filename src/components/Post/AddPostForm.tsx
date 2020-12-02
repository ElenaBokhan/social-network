import React from 'react';
import postStyle from './Post.module.css';
import { Field, InjectedFormProps, reduxForm, reset } from 'redux-form';
import { Button } from '../Button/Button';
import { propsPostType } from './Post';
type IProps = propsPostType
let PostForm: React.FC<InjectedFormProps<formValuesType, IProps> & IProps> = props => {
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
const afterSubmit = (result: any, dispatch: any) =>
	dispatch(reset("addPost"));

const PostReduxForm = reduxForm<formValuesType, IProps>({ 
  form: "addPost",
  onSubmitSuccess: afterSubmit,
})(PostForm)
type formValuesType = {
	text: string | null
}
class AddPostForm extends React.Component<propsPostType> {
	submit = (values: formValuesType) => {
		values.text && this.props.addPost(values.text);
	}
	render() {
		return <PostReduxForm onSubmit={this.submit} {...this.props} />
	}
  }
  export default AddPostForm;