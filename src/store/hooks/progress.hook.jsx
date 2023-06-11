import { useDispatch, useSelector } from "react-redux";
import { START_PROGESS, STOP_PROGESS } from "../types";

export const useProgress = () => {
	const dispatch = useDispatch();
	const progress = useSelector(state => state.progress);

	const startProgress = () => {
		dispatch({ type: START_PROGESS })
		return true;
	}

	const stopProgress = () => {
		dispatch({ type: STOP_PROGESS })
		return true;
	}

	return { progress, startProgress, stopProgress };
}