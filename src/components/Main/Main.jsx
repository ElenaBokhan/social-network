import React, { Component } from 'react';
import main from './Main.module.css';
import cn from 'classnames';


class Main extends Component {
	constructor(props){
		super(props)
		this.state = {
		randomNumForAnimation: null,
		row: 6,
		timerId:null,
		timerOutId:null,
		}
	}	
	
	componentDidMount(){
		const interval = Math.floor(Math.random() * 1000);
		this.setState({timerId :setInterval(()=>{
			this.setState({timerOutId: setTimeout(() =>{
				const randomNum = Math.floor(Math.random() * Math.floor(window.innerWidth/35*this.state.row));
				this.setState({randomNumForAnimation: randomNum})
				}, interval)})
			}, interval)}
		)
	}

	componentWillUnmount(){
		clearInterval(this.state.timerId);
		clearTimeout(this.state.timerOutId);
	}
		
	render(){
		const peopleArray = [];		
		const boyAmount =  Math.floor((window.innerWidth-3*this.state.row)/35*this.state.row);
		for(let i=0; i<boyAmount;i++){
			peopleArray.push(i);
		}
		return 	(
					<div className = {main.back}>						
								<div className = {main.mainDarkBack}>
									<p className = {main.nameSocial}>Social</p>
									<p className = {main.nameNetwork}>network</p>
									<div className={cn(main.borderAnimate, main.oneB)}></div>
									<div className={cn(main.borderAnimate, main.twoB)}></div>
									<div className={cn(main.borderAnimate, main.threeB)}></div>
									<div className={cn(main.borderAnimate, main.fourB)}></div>
								</div>
						<section className = {main.friendsWrapper}>
							<div className = {[main.onePhoto, main.friend].join(' ')}></div>
							<div className = {[main.twoPhoto, main.friend].join(' ')}></div>
							<div className = {[main.threePhoto, main.friend].join(' ')}></div>
							<div className = {[main.fourPhoto, main.friend].join(' ')}></div>							
						</section>
						
					</div>
		)
	}
}

export default Main;