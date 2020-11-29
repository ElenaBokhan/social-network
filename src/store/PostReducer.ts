import { postType } from "../types/types";

const ADD_NEW_POST = "ADD-NEW-POST";
const ADD_STAR = "ADD-STAR";
const REMOVE_STAR = "REMOVE-STAR";
const REMOVE_POST = "REMOVE-POST";
const INCREASE_TEXTAREA = "INCREASE-TEXTAREA";


const initialState = {		
		posts: [
			{text:"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minima rerum quibusdam molestiae, nulla ut corrupti! Placeat modi vel dignissimos atque.",
			date: "31 октября 2020",
			starsScore: 36,
			isClickedStar: false}
		] as Array<postType>,
		isActiveTextarea: false
};
type initialStateType = typeof initialState
export const PostReducer = (state = initialState, action: ActionType): initialStateType => {
	switch (action.type) {
		case "ADD-NEW-POST":
			const date = new Date();
			const year = date.getFullYear();
			const monthNum = date.getMonth();
			const month = 'января,февраля,марта,апреля,мая,июня,июля,августа,сентября,октября,ноября,декабря'.split(',');
			const day = date.getDate();	
			return {...state,
					posts: [...state.posts, {text: action.text,
											date: `${day} ${month[monthNum]} ${year}`,
											starsScore: 0,
											isClickedStar: false}],
					isActiveTextarea: false
				};
		case "REMOVE-POST":			
			return {...state,
					posts: state.posts.filter((item, index) => index!==action.index	)
				};
		case "ADD-STAR":
			return {...state,
					posts: state.posts.map((item, index) => {
						if(index===action.index){
							return {...item,
								starsScore: ++item.starsScore,
								isClickedStar:true 
							}
						} else return item
					})
				};
		case "REMOVE-STAR":
			return {...state,
					posts: state.posts.map((item, index) => {
						if(index===action.index){
							return {...item,
								starsScore: --item.starsScore,
								isClickedStar:false 
							}
						} else return item
					})
				};
		case "INCREASE-TEXTAREA":
			return {...state,
				isActiveTextarea: action.flag
				};
		default:
			return state;
	}
}
type ActionType = removeStarActionType | addStarActionType | addPostActionType | 
				  removePostActionType | increaseTextareaActionType
type removeStarActionType = {
	type: typeof REMOVE_STAR
	index: number
}
export const removeStar = (index: number): removeStarActionType => ({type: REMOVE_STAR, index});
type addStarActionType = {
	type: typeof ADD_STAR
	index: number
}
export const addStar = (index: number): addStarActionType => ({type: ADD_STAR, index});
type addPostActionType = {
	type: typeof ADD_NEW_POST
	text: string
}
export const addPost = (text: string): addPostActionType => ({type: ADD_NEW_POST, text});
type removePostActionType = {
	type: typeof REMOVE_POST
	index: number
}
export const removePost = (index: number): removePostActionType => ({type: REMOVE_POST, index});
type increaseTextareaActionType = {
	type: typeof INCREASE_TEXTAREA
	flag: boolean
}
export const increaseTextarea = (flag: boolean): increaseTextareaActionType => ({type: INCREASE_TEXTAREA, flag})