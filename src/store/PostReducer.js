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
		],
		isActiveTextarea: false
};

export const PostReducer = (state = initialState, action) => {
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
				isActiveTextarea: action.boolean
				};
		default:
			return state;
	}
}
export const removeStar = (index) => ({type: REMOVE_STAR, index});
export const addStar = (index) => ({type: ADD_STAR, index});
export const addPost = (text) => ({type: ADD_NEW_POST, text});
export const removePost = (index) => ({type: REMOVE_POST, index});
export const increaseTextarea = (boolean) => ({type: INCREASE_TEXTAREA, boolean})