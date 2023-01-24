import { StyleSheet } from "react-native";
import { AppHelper } from "../../helper";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppHelper.material.green50,
    borderRadius: 10,
    padding: 10,
    height: 150,
    width: 250,
    marginRight: 10,
    justifyContent: "space-between",
    shadowColor: AppHelper.material.greenA400,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  topRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    // alignItems: "center",
  },
  info: {
    display: "flex",
    flexDirection: "row",
    // justifyContent: "space-between",
    // height: "30%",
  },
  infoText: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    marginLeft: 10,
    height: "55%",
  },
  infoName: {
    display: "flex",
    flexDirection: "row",
    // justifyContent: "center",
    alignItems: "center",
  },
  status: {
    color: AppHelper.material.green500,
    fontWeight: "bold",
    marginLeft: 5,
  },
  bottomRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  maxLimit: {
    maxWidth: 120,
  },

});