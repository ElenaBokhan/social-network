import React, { Component } from 'react';
import main from './Main.module.css';
import boy from '../../assets/img/boy.png';
import girl from '../../assets/img/girl.png';


class Main extends Component {
	constructor(props){
		super(props)
		this.state = {
		randomNumForAnimation: null
	}
	}
	
	// randomNum(min=0, max=29 ){
	// 	debugger
	// 	// const randomNum = Math.floor(min + Math.random() * (max - min));
	// 	this.setState({randomNumForAnimation: randomNum})
	// }
	// componentDidMount(){
	// 	const interval = Math.floor(Math.random() * 1000);
	// 	// alert (window.innerHeight)
	// setInterval(()=>{
		
	// 		setTimeout(() =>{
	// 				const randomNum = Math.floor(Math.random() * Math.floor(window.innerWidth/43));
	// 				this.setState({randomNumForAnimation: randomNum})
	// 			}, interval)				
	// 	}, interval)
	// }
	// componentWillUnmount(){
	// 	clearTimeout(timerId);
	// }
		
	render(){
		const boyArray = [];
		const boyAmount =  Math.floor(window.innerWidth/43);
		for(let i=0; i<boyAmount;i++){
			boyArray.push(i);
		}
		return 	<div>
					<div className = {main.back}>
						{boyArray.map(index => <img src = {index%2===0 ? boy : girl} 
						width = "33px"
						height = "60px"
						key = {index} 
						className = {index===this.state.randomNumForAnimation ? main.animate : null}/>)}
					<p>Social_NET</p>
					{boyArray.reverse().map(index => <img src = {index%2===0 ? boy : girl} 
						width = "33px"
						height = "60px"
						key = {index} 
						className = {index+5===this.state.randomNumForAnimation ? main.animate : null}/>)}
					</div>
				</div>
	}
}

export default Main;