// date will be in format: "1686490040512"
export const convertDateToDayMonthYear = (date) => {
	const d = new Date(parseInt(date));
	const day = d.getDate();
	const month = d.getMonth() + 1;
	const year = d.getFullYear();
	return `${day}/${month}/${year}`;
}

// date will be in format: "1686490040512"
export const convertToDate = (date) => {
	const d = new Date(parseInt(date));
	return d;
}