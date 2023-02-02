import { StyleSheet } from "react-native";
import { AppHelper } from "../../../helper";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: AppHelper.material.white
  },
  searchContainer: {
    padding: 10,
  },
  input: {
    backgroundColor: AppHelper.material.white,
    borderRadius: 20,
  },
  chatList: {
    height: '87%',
    padding: 20,
    margin: 10,
    marginTop: 0,
    backgroundColor: AppHelper.material.white,
    elevation: 2,
    borderRadius: 20,
  },
  noChatContainer: {
    flex: 1,
    flexDirection: 'column',
    // height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});