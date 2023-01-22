import { StyleSheet } from "react-native";
import { AppHelper } from "../helper/AppHelper/AppHelper";

export const inputStyles = StyleSheet.create({
  inputField: {
    height: 40,
    borderColor: AppHelper.material.minBlack,
    borderWidth: 0.4,
    borderRadius: 5,
    padding: 10,
  }
});
