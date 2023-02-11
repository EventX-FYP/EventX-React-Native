import { StyleSheet } from "react-native";
import { AppHelper } from "../../helper";

const radius = 12;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppHelper.material.green50,
    height: 110,
    width: "100%",
    borderRadius: radius,
    borderWidth: 0,
    shadowColor: AppHelper.material.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: radius,
    elevation: 5,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  image: {
    height: "100%",
    width: "35%",
    borderTopLeftRadius: radius,
    borderBottomLeftRadius: radius,
  },
  title: {
    width: "60%",
    textAlign: "center",
    alignSelf: "center",
  },
}); 