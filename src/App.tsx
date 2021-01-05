import React, { Component } from 'react';
import { Route, HashRouter } from 'react-router-dom';
import './App.css';
import Main from './components/Main/Main';
import Back from './components/Back/Back';
import { PhotosContainer } from './components/Photos/Photos';
import { Header } from './components/Header/Header';
import { LoginContainer } from './components/Login/LoginContainer';
import { FriendsContainer } from './components/Friends/FriendsContainer';
import { ProfileContainer } from './components/Profile/Profile';
import { DialogsContainer } from './components/Dialogs/DialogsContainer';
import { Chat } from './components/Chat/Chat';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { initThunkCreator } from './store/AppReducer';
import BackLoad from './components/BackLoad/BackLoad';
import { AppStateType } from './store/redux-store';

type PropsType = {
	initStatus: boolean
	initThunkCreator: () => void
}
class App extends Component<PropsType> {	
	componentDidMount(){
		this.props.initThunkCreator()
	}
	render(){
		return !this.props.initStatus 
				? 	<BackLoad /> 
				:	<HashRouter>
						<Header />
						<Route path = "/home" render = {() => <Main />} />
						<Route path = "/" exact render = {() => <Main />} />
						<Route path = "/profile" render = {() => <ProfileContainer />} />
						<Route path = "/dialogs/:id" render = {(props)=> <DialogsContainer {...props}/>}/>
						<Route path = "/chat" render = {() => <Chat />}/>
						<Route path = "/photos/:view?" render = {(props) => <PhotosContainer {...props}/>} />
						<Route path = "/friends/:view?" render = {(props) => <FriendsContainer {...props}/>} />
						<Route path = "/auth" render = {() => <LoginContainer />} />
						<Back />
					</HashRouter>			
	}
}
	
const mapStateToProps = (state: AppStateType) => ({
	initStatus: state.AppReducer.initialization
})
export default compose<React.ComponentType>( connect(mapStateToProps, { initThunkCreator }))(App);
