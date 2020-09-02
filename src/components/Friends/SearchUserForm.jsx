import React from 'react';
import friends from './Friends.module.css';
import { Field, reduxForm, reset } from 'redux-form';
import { Search } from '../common/Buttons/Search/Search';

let SearchForm = props => {
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
const afterSubmit = (result, dispatch) =>
	dispatch(reset("searchUser"));

SearchForm = reduxForm({ 
  form: "searchUser",
  onSubmitSuccess: afterSubmit,
})(SearchForm)

class SearchUserForm extends React.Component {
	submit = values => {
		this.props.searchUserThunkCreator(values.search)
		console.log(values);	
	}
	render() {
		return <SearchForm onSubmit={this.submit} {...this.props} />
	}
  }
  export default SearchUserForm;