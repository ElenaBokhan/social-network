import { connect } from 'react-redux';
import { Photos } from './Photos';
import { nextSlide, prevSlide, showSlide } from '../../store/PhotosReducer';
import { getPhotos, getAllPhotos, getSlide, getUnderSlidePhotos, authUserId } from '../../store/selectors/selectors';
import { compose } from 'redux';
import { withoutAuthRedirect } from '../../hoc/withAuthRedirect';


const mapStateToProps = (state, ownProps) => {
	const viewParams =  ownProps.match.params.view;
	return {
	viewParams: viewParams,
	authId: authUserId(state),
	// view: state.PhotosReducer.view,	
	photos: getPhotos(state),	
	numberSlidePhoto: state.PhotosReducer.numberSlidePhoto,
	allPhotos: getAllPhotos(state),
	slide: getSlide(state),
	underSlidePhotos: getUnderSlidePhotos(state),	
	}
}

export const PhotosContainer = compose(connect(mapStateToProps, { nextSlide, prevSlide, showSlide}), withoutAuthRedirect)(Photos)