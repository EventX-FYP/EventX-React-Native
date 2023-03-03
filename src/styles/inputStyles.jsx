import { StyleSheet } from "react-native";
import { AppHelper } from "../helper/AppHelper/AppHelper";

export const inputStyles = StyleSheet.create({
  inputField: {
    height: 40,
    borderColor: AppHelper.material.minBlack,
    borderWidth: 0.4,
    borderRadius: 5,
    padding: 10,
  },
  inputFieldWhite: {
    borderColor: AppHelper.material.white,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    height: 40,
  }
});
