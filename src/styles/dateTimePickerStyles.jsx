import { StyleSheet } from "react-native";
import { AppHelper } from "../helper/AppHelper/AppHelper";

export const dateTimePickerStyles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 40,
    borderColor: AppHelper.material.minBlack,
    borderWidth: 0.4,
    borderRadius: 5,
    padding: 10,
  },
  date: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  time: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dateText: {
    flex: 1,
    textAlign: "left",
  },
  timeText: {
    flex: 1,
    textAlign: "left",
  },
  icon: {
    flex: 1,
    textAlign: "right",
  },
});