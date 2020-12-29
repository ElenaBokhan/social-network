import React from 'react';
import postStyle from './Post.module.css';
import { Field, InjectedFormProps, reduxForm, reset } from 'redux-form';
import { Button } from '../Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { getIsActiveTextarea, getSmallPhoto, getAvatar } from '../../store/selectors/selectors';
import { actions } from '../../store/Actions';

const { increaseTextarea, addPost } = actions;

let PostForm: React.FC<InjectedFormProps<formValuesType> > = props => {
  	const { handleSubmit } = props
	const isActiveTextarea = useSelector(getIsActiveTextarea);
	const smallPhoto = useSelector(getSmallPhoto);
	const avatar = useSelector(getAvatar);	
	const dispatch = useDispatch();

  return <form onSubmit = { handleSubmit } className = { postStyle.addPost }>
			<div className = {postStyle.avatarSmall} style = {{backgroundImage: `url(${smallPhoto || process.env.PUBLIC_URL+avatar})`}}></div>
			<Field	component = "textarea" 
					name = "text"
					type = "text"
					className = {postStyle.input} 
					style = {{height: isActiveTextarea ? "100px": "inherit"}} 
					placeholder = "What's the News?"
					onClick = {() => dispatch(increaseTextarea(true))}
					onBlur = {() => dispatch(increaseTextarea(false))}/>
			<Button name = "Add post"/>
		</form>
}
const afterSubmit = (result: any, dispatch: any) =>
	dispatch(reset("addPost"));

const PostReduxForm = reduxForm<formValuesType>({ 
	form: "addPost",
	onSubmitSuccess: afterSubmit,
})(PostForm)

type formValuesType = {	text: string | null }

const AddPostForm: React.FC = () => {
	const dispatch = useDispatch();
	const submit = (values: formValuesType) => {
		values.text && dispatch(addPost(values.text));
	}
	return <PostReduxForm onSubmit={ submit } />
}
  export default AddPostForm;