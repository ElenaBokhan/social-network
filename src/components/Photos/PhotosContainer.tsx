import { connect } from 'react-redux';
import { Photos } from './Photos';
import { nextSlide, prevSlide, showSlide } from '../../store/PhotosReducer';
import { getPhotos, getAllPhotos, getSlide, getUnderSlidePhotos, authUserId } from '../../store/selectors/selectors';
import { compose } from 'redux';
import { withoutAuthRedirect } from '../../hoc/withAuthRedirect';
import { albomType } from '../../types/types';
import { AppStateType } from '../../store/redux-store';

type mapStatePropsType = {
	viewParams: string | undefined	
	authId: number | null
	photos: Array<albomType>
	numberSlidePhoto: number
	allPhotos: Array<string>
	slide: Array<string>
	underSlidePhotos: Array<string>
}
type mapDispatchPropsType = {
	nextSlide: () => void
	prevSlide: () => void
	showSlide: (num: number) => void
}
const mapStateToProps = (state: AppStateType, ownProps: any): mapStatePropsType => {
	const viewParams =  ownProps.match.params.view;
	return {
	viewParams: viewParams,
	authId: authUserId(state),
	photos: getPhotos(state),	
	numberSlidePhoto: state.PhotosReducer.numberSlidePhoto,
	allPhotos: getAllPhotos(state),
	slide: getSlide(state),
	underSlidePhotos: getUnderSlidePhotos(state),	
	}
}

export const PhotosContainer = compose(connect<mapStatePropsType,
											   mapDispatchPropsType,
											   {}, AppStateType>(mapStateToProps, { nextSlide, prevSlide, showSlide}), withoutAuthRedirect)(Photos)