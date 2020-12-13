import { ActionsType } from './redux-store';
import { albomsType } from './../types/types';
import { actions } from './Actions';

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
export const PhotosReducer = (state = initialState, action: PhotoActionsType): initialStateType => {
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

type PhotoActionsType = ReturnType<ActionsType<typeof actions>>

// type MyReturnType<T> = T extends (...args: any[]) => infer R ? R : never

