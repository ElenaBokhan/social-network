import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { AppStateType } from '../store/redux-store';
import { isAuthUser } from '../store/selectors/selectors';

export function withAuthRedirect<WCP>(WrappedComponent: React.ComponentType<WCP>){
	const RedirectComponent: React.FC<MapPropsType & DispatchPropsType> = (props) => {
		    let {isAuth, ...restProps} = props
		
		     return  isAuth ? <Redirect to = "/profile" /> : <WrappedComponent {...restProps as unknown as WCP} />
		    }
	let ConnectedAuthRedirectComponent = connect<MapPropsType, {}, WCP, AppStateType>(mapStateToPropsForRedirect, {}) (RedirectComponent)
	return ConnectedAuthRedirectComponent;
}

export function withoutAuthRedirect<WCP>(WrappedComponent: React.ComponentType<WCP>){
	const RedirectComponent: React.FC<MapPropsType & DispatchPropsType> = (props) => {
		    let {isAuth, ...restProps} = props
		
		     return  !isAuth ? <Redirect to = "/auth" /> : <WrappedComponent {...restProps as unknown as WCP} />
		    }
	let ConnectedAuthRedirectComponent = connect<MapPropsType, {}, WCP, AppStateType>(mapStateToPropsForRedirect, {}) (RedirectComponent)
	return ConnectedAuthRedirectComponent;
}
 
let mapStateToPropsForRedirect = (state: AppStateType) => ({
    isAuth: isAuthUser(state)
}as MapPropsType);

type MapPropsType = {
    isAuth: boolean
}

type DispatchPropsType = {}
