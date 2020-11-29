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
    deletedByRecipient: boolean
    deletedBySender: boolean
    distributionId: number | null
    id: string
    isSpam: boolean
    recipientId: number
    recipientName: string
	senderId: number
	senderName: string
	translatedBody: null
	viewed: boolean
}
export type photosType = {
    small: null | string
    large: null | string   
}