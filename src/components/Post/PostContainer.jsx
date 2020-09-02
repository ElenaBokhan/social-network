import { connect } from 'react-redux';
import { Post } from './Post';
import { addStar, removeStar, addPost, removePost, increaseTextarea } from '../../store/PostReducer';


const mapStateToProps = (state) => ({
	name: state.ProfileReducer.name,
	avatar: state.ProfileReducer.avatar,
	posts: state.PostReducer.posts,
	isActiveTextarea: state.PostReducer.isActiveTextarea,
	smallPhoto: state.ProfileReducer.photos.small,
})

export const PostContainer = connect(mapStateToProps, { addStar, removeStar, addPost, removePost, increaseTextarea })(Post)