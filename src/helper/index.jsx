export const FalseError = (error) => {
	const regex = /null is not an object \(evaluating '[A-Za-z]{4}.[A-Za-z]+'\)/;
	return regex.test(error);
}

export { Navigate } from './Navigate/Navigate';
export { CountryStateCityAPI } from './API/CountryStateCity';
export * from './ScreenNavigator/ScreenNavigator';
export * from './AppHelper/AppHelper';
export * from './Icons/Icons';
export * from "./AppHelper/Gallery";
export { cloudinaryUpload } from "./Cloudinary";
export { convertDateToDayMonthYear, convertToDate } from "./Date";