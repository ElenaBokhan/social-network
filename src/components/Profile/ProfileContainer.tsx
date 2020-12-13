import { connect } from 'react-redux';
import { Profile } from './Profile';
import { updateProfileDataThunkCreator, uploadPhotoThunkCreator, updateStatusThunkCreator } from '../../store/ProfileReducer';
import { compose } from 'redux';
import { withoutAuthRedirect } from '../../hoc/withAuthRedirect';
import { startDialog } from '../../store/DialogsReducer';
import { authUserId, isLoading } from '../../store/selectors/selectors';
import { AppStateType } from '../../store/redux-store';
import { contactsType, photosType, updateDataType } from '../../types/types';
import { actions } from '../../store/Actions';

const { showEditForm } = actions;

type mapStatePropsType = {
	editMode: boolean
	avatar: string
	photo: photosType,	
	randomFriends: Array<string>
	authId: number | null
	isLoading: boolean
	userId: number | null
	name: string | null
	contacts: contactsType	
	aboutMe: string | null
	job: boolean
	status: string | null
	isShowEditForm: boolean
}
type mapDispatchPropsType = {
	updateProfileDataThunkCreator: (data: updateDataType) => void
	uploadPhotoThunkCreator: (data: File) => void
	updateStatusThunkCreator: (status: string) => void
	showEditForm: () => void
	startDialog: (userId: number) => void
}
const mapStateToProps = (state: AppStateType): mapStatePropsType => ({
	editMode: state.ProfileReducer.isEditMode,
	avatar: state.ProfileReducer.avatar,
	photo: state.ProfileReducer.photos,	
	randomFriends: state.ProfileReducer.avatarFriends,
	authId: authUserId(state),
	isLoading: isLoading(state),
	userId: state.ProfileReducer.id,
	name: state.ProfileReducer.name,
	contacts: state.ProfileReducer.contacts,	
	aboutMe: state.ProfileReducer.aboutMe,
	job: state.ProfileReducer.lookingForAJob,
	status: state.ProfileReducer.status,
	isShowEditForm: state.ProfileReducer.isShowEditForm
})

export const ProfileContainer = compose<React.ComponentType>(connect<mapStatePropsType, 
												mapDispatchPropsType,
												{}, AppStateType>(mapStateToProps, {updateProfileDataThunkCreator,
																					uploadPhotoThunkCreator,
																					updateStatusThunkCreator,
																					showEditForm,
																					startDialog }),
										withoutAuthRedirect)(Profile)



