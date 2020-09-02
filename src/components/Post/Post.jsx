import React from 'react';
import postStyle from './Post.module.css';
import { Bucket } from '../common/Buttons/Bucket/Bucket';
import { Edit } from '../common/Buttons/Edit/Edit';
import AddPostForm from './AddPostForm';

export const Post = (props) => {
	const changeStar = (indexPost, isCliked) =>{
		isCliked ? props.removeStar(indexPost) : props.addStar(indexPost)
	}	
	return 	<>			
			<AddPostForm {...props}/>
			{props.posts.map( (item, index) => {
				return  <section className = {postStyle.post} key = {index}>
							<div className = {postStyle.avatarSmall} style = {{backgroundImage: `url(${props.smallPhoto || process.env.PUBLIC_URL+props.avatar})`}}></div>
							<div className = {postStyle.postInfo}>
								<p className = {postStyle.namePost}>{props.name}</p>
								<p className = {postStyle.date}>{item.date}</p>
								<p className = {postStyle.text}>{item.text}</p>
								<hr/>
								<button onClick = {()=> changeStar(index, item.isClickedStar)} className = {postStyle.star}>
									<svg className = {item.isClickedStar ? postStyle.active : postStyle.starIcon} xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve" height="25px" version="1.1" viewBox="0 0 6.87 6.53" xmlnsXlink="http://www.w3.org/1999/xlink"><path d="M3.43 0l1.05 2.17 2.39 0.33 -1.74 1.66 0.43 2.37 -2.13 -1.13 -2.12 1.13 0.42 -2.37 -1.73 -1.66 2.38 -0.33 1.05 -2.17zm0 1.29l-0.67 1.39 -1.54 0.21 1.12 1.08 -0.27 1.52 1.36 -0.73 1.37 0.73 -0.27 -1.52 1.12 -1.08 -1.54 -0.21 -0.68 -1.39z"/></svg>
								</button>
								<span  className = {postStyle.starScore}>{item.starsScore}</span>
							</div>
							{(props.authId === props.userId)&&	<div className = {postStyle.editBlock}>
																	<Edit />
																	<Bucket onclick = {() => props.removePost(index)}/>
																</div>}
						</section>
	})}
	</>
}
