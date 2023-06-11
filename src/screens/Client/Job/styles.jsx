import { StyleSheet } from "react-native";
import { AppHelper } from "../../../helper";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerLeft: {
    display: "flex",
    flexDirection: "column",
  },
  headerRight: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "white",
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
    marginTop: 10,
  },
  image: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  description: {
    alignItems: "center",
  },
  textLength: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    maxWidth: "70%",
    textAlign: "center",
    paddingVertical: 10,

  },
  button: {
    backgroundColor: AppHelper.material.green600,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 9999,
    tintColor: "white",
  },
  link: {
    marginVertical: 10,
    color: AppHelper.material.green600,
  },
  step: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  helpCenter: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  helpCenterText: {
    display: "flex",
    flexDirection: "column",
    alignItems: "baseline",
    width: "100%",
    maxWidth: "70%",
  },
  greenText: {
    color: AppHelper.material.green600,
  },
  whiteText: {
    color: "white",
  },
});