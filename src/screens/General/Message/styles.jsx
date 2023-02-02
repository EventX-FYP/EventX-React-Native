import { StyleSheet } from "react-native";
import { AppHelper } from "../../../helper";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppHelper.material.white
  },
  searchContainer: {
    padding: 10,
  },
  input: {
    backgroundColor: AppHelper.material.white,
    borderRadius: 20,
  },
  chatList: {
    // flex: 1,
    // height: '100%',
    padding: 10,
    borderRadius: 20,
    backgroundColor: AppHelper.material.white,
  }
});