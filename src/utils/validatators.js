export const emptyField = (value) => {
	if (value) return  undefined
	return "Field is Required"
}

export const maxLength200 = value  => {
	if (value && (value.length > 200)) return `Max length is 200 symbols`
	return undefined
}