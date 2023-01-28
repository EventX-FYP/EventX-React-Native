import { StyleSheet } from "react-native";
import { AppHelper } from "../../../helper";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppHelper.material.white,
    padding: 10,
    height: "100%",
  },
  searchContainer: {
    // flex: 1,
    backgroundColor: AppHelper.material.white,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    height: "10%"
  },
  searchInput: {
    backgroundColor: AppHelper.material.white,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: AppHelper.material.green300,
    height: 50,
    width: "70%",
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 10,
    fontSize: 16,
  },
  searchButton: {
    backgroundColor: AppHelper.material.green500,
    borderRadius: 10,
    height: 50,
    width: "20%",
    marginBottom: 10,
  },
  searchButtonLabel: {
    color: AppHelper.material.white,
    fontSize: 16,
    fontWeight: "bold",
  },
  searchResultContainer: {
    flex: 1,
    backgroundColor: AppHelper.material.white,
    // paddingBottom: 22,
    // marginBottom: 10,
    height: "90%",
  },
  list: {
    paddingTop: 10,
    paddingBottom: 22,

  }
});