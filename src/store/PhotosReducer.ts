import { albomsType } from './../types/types';
const SHOW_NEXT_SLIDE = "SHOW-NEXT-SLIDE";
const SHOW_PREV_SLIDE = "SHOW-PREV-SLIDE";
const SHOW_SLIDE = "SHOW-SLIDE";


type imagesType = {
	albom: albomsType
}
const initialState = {
	images:{
		albom:{
			1:{
				name: "Julia Birthday",
				data:[	"/images/julia2.jpg",
						"/images/julia3.jpg",
						"/images/julia4.jpg",
						"/images/julia5.jpg",
					]
			},
			2:{
				name: "Metafest",
				data:[	"/images/meta1.jpg",
						"/images/meta2.jpg",
						"/images/meta3.jpg",
						"/images/meta4.jpg",
						"/images/meta5.jpg",
						"/images/meta6.jpg",
						"/images/meta7.jpg",
					]
			},
			3:{
				name: "Zavolga",
				data:[	"/images/zavolga2.jpg",
						"/images/zavolga3.jpg",
						"/images/zavolga4.jpg",
						"/images/zavolga5.jpg",
					]
			},			
		}} as imagesType,		
	numberSlidePhoto: -1,
};

type initialStateType = typeof initialState
export const PhotosReducer = (state = initialState, action: ActionType): initialStateType => {
	switch (action.type) {		
		case "SHOW-NEXT-SLIDE":
			return {...state,
					numberSlidePhoto: ++state.numberSlidePhoto};
		case "SHOW-PREV-SLIDE":
			return {...state,
					numberSlidePhoto: --state.numberSlidePhoto};
		case "SHOW-SLIDE":
			return {...state,
				numberSlidePhoto:action.num
				};	
		default:
			return state;
	}
}
type ActionType = nextSlideActionType | prevSlideActionType | showSlideActionType
type nextSlideActionType = {
	type: typeof SHOW_NEXT_SLIDE
}
export const nextSlide = (): nextSlideActionType => ({type: SHOW_NEXT_SLIDE});
type prevSlideActionType = {
	type: typeof SHOW_PREV_SLIDE
}
export const prevSlide = (): prevSlideActionType => ({type: SHOW_PREV_SLIDE});
type showSlideActionType = {
	type: typeof SHOW_SLIDE
	num: number
}
export const showSlide = (num: number): showSlideActionType => ({type: SHOW_SLIDE, num});

