import { connect } from 'react-redux';
import { Post } from './Post';
import { actions } from '../../store/Actions';
import { AppStateType } from '../../store/redux-store';
import { postType } from '../../types/types';
const { addStar, removeStar, addPost, removePost, increaseTextarea } = actions;

type mapStatePropsType = {
	name: string | null
	avatar: string
	posts: Array<postType>
	isActiveTextarea: boolean
	smallPhoto: string | null
}
type mapDispatchPropsType = {
	addStar: (index: number) => void
	removeStar: (index: number) => void
	addPost: (text: string) => void
	removePost: (index: number) => void
	increaseTextarea: (flag: boolean) => void
}
const mapStateToProps = (state: AppStateType): mapStatePropsType => ({
	name: state.ProfileReducer.name,
	avatar: state.ProfileReducer.avatar,
	posts: state.PostReducer.posts,
	isActiveTextarea: state.PostReducer.isActiveTextarea,
	smallPhoto: state.ProfileReducer.photos.small,
})

export const PostContainer = connect<mapStatePropsType,
									 mapDispatchPropsType,
									 {}, AppStateType>(mapStateToProps, { addStar, removeStar, addPost, removePost, increaseTextarea })(Post)