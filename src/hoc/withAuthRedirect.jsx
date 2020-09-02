import React from 'react';
import { Redirect } from 'react-router-dom';

export const withAuthRedirect = (Component) => {
	class RedirectComponent extends React.Component {
		render(){
			return 	<>
						{this.props.authId ? <Redirect to = "/profile"/> : <Component {...this.props}/>}
					</>
		}
	}
	return RedirectComponent;
}
export const withoutAuthRedirect = (Component) => {
	class RedirectComponent extends React.Component {
		render(){
			return 	<>
						{!this.props.authId ? <Redirect to = "/auth"/> : <Component {...this.props}/>}
					</>
		}
	}
	return RedirectComponent;
}

