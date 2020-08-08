import { connect } from 'react-redux';
import { Photos } from './Photos';
import { viewPhotos, nextSlide, prevSlide } from '../../store/PhotosReducer';
import { getPhotos, getAllPhotos, getSlide, getUnderSlidePhotos } from '../../store/selectors/selectors';


const mapStateToProps = (state) => ({
	view: state.PhotosReducer.view,
	source: state.PhotosReducer.photosArray,
	photos: getPhotos(state),	
	numberSlidePhoto: state.PhotosReducer.numberSlidePhoto,
	allPhotos: getAllPhotos(state),
	slide: getSlide(state),
	underSlidePhotos: getUnderSlidePhotos(state),
})

export const PhotosContainer = connect(mapStateToProps, {viewPhotos, nextSlide, prevSlide})(Photos)