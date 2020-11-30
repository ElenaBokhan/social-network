export type dialogsArrayType = {
	hasNewMessages: boolean
	id: number
	lastDialogActivityDate: string
	lastUserActivityDate: string
	newMessagesCount: number
	photos: photosType
	userName: string
}
export type messagesArrayType = {
	addedAt: string
    body: string
    deletedByRecipient?: boolean
    deletedBySender?: boolean
    distributionId?: number | null
    id: string
    isSpam?: boolean
    recipientId: number
    recipientName?: string
	senderId: number
	senderName: string
	translatedBody: null
	viewed?: boolean
}
export type photosType = {    
	large: string | null
	small: string | null
}
export type contactsType = {
	facebook: string | null
	instagram: string | null
	vk: string | null
}
export type allUsersItemType = {
	followed: boolean
	id: number
	name: string
	photos: photosType
	status: null | string
	uniqueUrlName: null | string
}
export type updateDataType = {
	id: number
	fullName: string,
	facebook: string,
	instagram: string,
	vk: string,
	lookingForAJob: boolean,
	aboutMe: string
}
export type uploadPhotoType = {
	lastModified: number
	lastModifiedDate: Date
	name: string
	size: number
	type: string
	webkitRelativePath: string
}
export type postType = {
	text: string
	date: string
	starsScore: number
	isClickedStar: boolean
}
export type albomType = {
	name: string
	data: Array<string>
}
export type albomsType = {
	[key: number]: albomType
}
export type dataUserType = {
	captcha: boolean
	email: string
	password: string
	rememberMe: boolean
}