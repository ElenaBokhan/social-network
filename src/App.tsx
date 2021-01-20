import React, { Component } from 'react';
import { Route, HashRouter } from 'react-router-dom';
import './App.css';
import Main from './components/Main/Main';
import Back from './components/Back/Back';
import Photos from './components/Photos/Photos';
import { Header } from './components/Header/Header';
import Login from './components/Login/Login';
import Friends from './components/Friends/Friends';
import Profile from './components/Profile/Profile';
import Dialogs from './components/Dialogs/Dialogs';
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
						<Route path = "/profile" render = {() => <Profile />} />
						{/* <Route path = "/dialogs/:id" render = {(props)=> <Dialogs id = {+props.match.params.id}/>}/>
						<Route path = "/chat" render = {() => <Chat />}/>
						<Route path = "/photos/:view?" render = {(props) => <Photos view = {props.match.params.view}/>} />
						<Route path = "/friends/:view?" render = {(props) => <Friends view = {props.match.params.view}/>} />
						<Route path = "/auth" render = {() => <Login />} /> */}
						<Back />
					</HashRouter>			
	}
}
	
const mapStateToProps = (state: AppStateType) => ({
	initStatus: state.AppReducer.initialization
})
export default compose<React.ComponentType>( connect(mapStateToProps, { initThunkCreator }))(App);
