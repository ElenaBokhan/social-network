import React, { Component } from 'react';
import { Route, HashRouter } from 'react-router-dom';
import './App.css';
import Main from './components/Main/Main';
import Back from './components/Back/Back';
import {PhotosContainer} from './components/Photos/PhotosContainer';
import { HeaderContainer } from './components/Header/HeaderContainer';
import { LoginContainer } from './components/Login/LoginContainer';
import { FriendsContainer } from './components/Friends/FriendsContainer';
import { ProfileContainer } from './components/Profile/ProfileContainer';
import { DialogsContainer } from './components/Dialogs/DialogsContainer';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { initThunkCreator } from './store/AppReducer';
import BackLoad from './components/BackLoad/BackLoad';

class App extends Component {
	componentDidMount(){
		this.props.initThunkCreator()
	}
	render(){
		return !this.props.initStatus 
				? 	<BackLoad /> 
				:	<HashRouter>
						<HeaderContainer />
						<Route path = "/home" render = {() => <Main />} />
						<Route path = "/" exact render = {() => <Main />} />
						<Route path = "/profile" render = {() => <ProfileContainer />} />
						<Route path = "/dialogs/:id" render = {(props)=> <DialogsContainer {...props}/>}/>
						<Route path = "/photos" exact render = {(props) => <PhotosContainer {...props}/>} />
						<Route path = "/photos/:view" render = {(props) => <PhotosContainer {...props}/>} />
						<Route path = "/friends" render = {(props) => <FriendsContainer {...props}/>} />
						<Route path = "/friends/:view" render = {(props) => <FriendsContainer {...props}/>} />
						<Route path = "/auth" render = {() => <LoginContainer />} />
						<Back />
					</HashRouter>			
	}
}
	
const mapStateToProps = (state) => ({
	initStatus: state.AppReducer.initialization
})
export default compose( connect(mapStateToProps, { initThunkCreator }))(App);
