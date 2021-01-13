import React from 'react';
import friends from './Friends.module.css';
import { Field, InjectedFormProps, reduxForm, reset } from 'redux-form';
import { Search } from '../common/Buttons/Search/Search';
import { searchUserThunkCreator } from '../../store/FriendsReducer';
import { useDispatch } from 'react-redux';

let SearchForm: React.FC<InjectedFormProps<SearchUserFormValuesType>> = (props) => {
  const { handleSubmit } = props;
  return <form onSubmit = { handleSubmit } 	className = {friends.searchForm} >
			<Search />
			<Field	className = {friends.statusInput}
					component = "input"
					name = "search"
					type = "text"
					placeholder = "whom search?" />			
		</form>
}
const afterSubmit = (result: any, dispatch: any) =>
	dispatch(reset("searchUser"));

const SearchReduxForm = reduxForm<SearchUserFormValuesType>({ 
  form: "searchUser",
  onSubmitSuccess: afterSubmit,
})(SearchForm)

type SearchUserFormValuesType = {
	search: string
}
const SearchUserForm: React.FC = () => {
	const dispatch = useDispatch()

	const submit = (values: SearchUserFormValuesType) => {
		dispatch(searchUserThunkCreator(values.search));		
	}
	return <SearchReduxForm onSubmit={submit} />

  }
  export default SearchUserForm;