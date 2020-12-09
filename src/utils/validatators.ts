
export type emptyFieldType = typeof emptyField
export const emptyField = (value: string | null): string | undefined => {
	if (value) return  undefined
	return "Field is Required"
}
export type maxLengthType = typeof maxLength200
export const maxLength200 = (value: string | null): string | undefined => {
	if (value && (value.length > 200)) return `Max length is 200 symbols`
	return undefined
}
export type  validatorsType = maxLengthType | emptyFieldType