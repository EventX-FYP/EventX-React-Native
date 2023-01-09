import { StyleSheet } from "react-native";
import { AppHelper } from "../../helper/AppHelper/AppHelper";
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppHelper.material.green50,
    alignItems: "center",
    justifyContent: "space-around",
    paddingBottom: 20,
  },
  scrollView: {
    width: "100%",
  },
  signup_image: {
    width: 200,
    height: 200,
    resizeMode: "stretch",
  },
  signupContainer: {
    flex: 1,
    width: "80%",
    justifyContent: "space-between",
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: AppHelper.material.minBlack,
    borderRadius: 5,
    padding: 10,
  },
  inputContainer: {
    width: "100%",
    height: "30%",
    justifyContent: "space-between",
  },
  label: {
    fontSize: 28,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: AppHelper.material.green600,
    borderRadius: 5,
  },
  googleButton: {
    backgroundColor: AppHelper.material.white,
    color: AppHelper.orange,
    borderRadius: 5,
  },
  horizontalLine: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  googleIcon: {
    width: 15,
    height: 15,
  },
  loginContainer: {
    width: "100%",
    height: "40%",
    justifyContent: "space-between",
  },
  alreadyHaveAccount: {
    width: "100%",
    height: "10%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    width: "100%",
    height: "60%",
    justifyContent: "space-between",
  },
});