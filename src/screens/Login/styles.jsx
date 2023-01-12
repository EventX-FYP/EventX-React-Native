import { StyleSheet } from "react-native";
import { AppHelper } from "../../helper/AppHelper/AppHelper";
export const styles = StyleSheet.create({
  inputContainer: {
      width: "100%",
      height: "30%",
      justifyContent: "space-between",
  },
  infoContainer: {
      width: "80%",
      height: "70%",
      backgroundColor: AppHelper.material.white,
      justifyContent: "space-between",
  },
  container: {
      flex: 1,
      alignItems: "center",
      paddingBottom: 20,
      backgroundColor: AppHelper.material.white,
      justifyContent: "space-between"
  },
  image: {
      width: "50%",
      height: "25%",
      resizeMode: "stretch",
  },
  login: {
      fontSize: 30,
      fontWeight: "bold",
  },
  googleIcon: {
      width: 15,
      height: 15,
      resizeMode: "stretch",
  },
  input: {
      height: 40,
      borderWidth: 1,
      borderColor: AppHelper.material.minBlack,
      borderRadius: 5,
      padding: 10,
  },
  button: {
      backgroundColor: AppHelper.material.green600,
      borderRadius: 5,
  },
  googleButton: {
      backgroundColor: AppHelper.light,
      color: AppHelper.orange,
      borderRadius: 5,
  },
  loginContainer: {
      width: "100%",
      height: "40%",
      justifyContent: "space-between",
  },
  buttonContainer: {
      width: "100%",
      height: "60%",
      justifyContent: "space-between",
  },
  horizontalLine: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
  },
  SignupContainer: {
      width: "100%",
      height: "10%",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
  },
});