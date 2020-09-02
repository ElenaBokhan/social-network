// const VIEW_PHOTOS = "VIEW-PHOTOS";
const SHOW_NEXT_SLIDE = "SHOW-NEXT-SLIDE";
const SHOW_PREV_SLIDE = "SHOW-PREV-SLIDE";
const SHOW_SLIDE = "SHOW-SLIDE";


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
		}},
	// view:"all",
	
	numberSlidePhoto:null,
	// showSlideNumber: null,
};

export const PhotosReducer = (state = initialState, action) => {
	switch (action.type) {
		// case "VIEW-PHOTOS":
		// 	return {...state,
		// 			view: action.view};
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

// export const viewPhotos = (view) => ({type: VIEW_PHOTOS, view});
export const nextSlide = () => ({type: SHOW_NEXT_SLIDE});
export const prevSlide = () => ({type: SHOW_PREV_SLIDE});
export const showSlide = (num) => ({type: SHOW_SLIDE, num});

