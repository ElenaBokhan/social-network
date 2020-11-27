import { connect } from 'react-redux';
import { Profile } from './Profile';
import { updateProfileDataThunkCreator, uploadPhotoThunkCreator, updateStatusThunkCreator, showEditForm } from '../../store/ProfileReducer';
import { compose } from 'redux';
import { withoutAuthRedirect } from '../../hoc/withAuthRedirect';
import { startDialog } from '../../store/DialogsReducer';
import { authUserId, isLoading } from '../../store/selectors/selectors';


const mapStateToProps = (state) => ({
	editMode: state.ProfileReducer.isEditMode,
	avatar: state.ProfileReducer.avatar,
	largePhoto: state.ProfileReducer.photos.large,
	smallPhoto: state.ProfileReducer.photos.small,
	randomFriends: state.ProfileReducer.avatarFriends,
	authId: authUserId(state),
	isLoading: isLoading(state),
	userId: state.ProfileReducer.id,
	name: state.ProfileReducer.name,
	facebook: state.ProfileReducer.contacts.facebook,
	instagram: state.ProfileReducer.contacts.instagram,
	vk: state.ProfileReducer.contacts.vk,
	aboutMe: state.ProfileReducer.aboutMe,
	job: state.ProfileReducer.lookingForAJob,
	status: state.ProfileReducer.status,
	isShowEditForm: state.ProfileReducer.isShowEditForm
})

export const ProfileContainer = compose(connect(mapStateToProps, {  updateProfileDataThunkCreator,
																	uploadPhotoThunkCreator,
																	updateStatusThunkCreator,
																	showEditForm,
																	startDialog }),
										withoutAuthRedirect)(Profile)



