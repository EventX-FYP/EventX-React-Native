import { SafeAreaView, Image, View } from "react-native";
import { Text, Button } from "react-native-ui-lib";
import { images } from "../../assets";
import React from "react";
import { TextField } from "react-native-ui-lib/src/incubator";
import { StatusBar } from "react-native";
import { styles } from "./styles";
import { inputStyles } from "../../styles";
import { ScreenNavigator, AppHelper } from "../../helper";
import { GET_USER_ME } from "../../graphql/queries";
import { useQuery } from "@apollo/client";
import { signIn } from "../../firebase";
import { IOS_CLIENT_ID, ANDROID_CLIENT_ID, EXPO_CLIENT_ID } from "@env";

import * as Google from "expo-auth-session/providers/google";

const googleConfig = {
    expoClientId: EXPO_CLIENT_ID,
    iosClientId: IOS_CLIENT_ID,
    androidClientId: ANDROID_CLIENT_ID,
    scopes: ["profile", "email"],
}



export const Login = ({ navigation }) => {
    const [request, response, promptAsync] = Google.useAuthRequest(googleConfig);
    const [auth, setAuth] = React.useState({ username: "", password: "" });

    const { data } = useQuery(GET_USER_ME);

    const handleLoginButton = async () => {
        await signIn(auth.username, auth.password)
            .then(() => navigation.navigate(ScreenNavigator.Client))
            .catch((error) => alert("Error", error));
        // navigation.navigate(ScreenNavigator.Client);
    }

    const handleLoginWithGoogleButton = async () => {
        await promptAsync()
            .then((result) => console.log(result));
    }

    const handleSignupButton = () => {
        navigation.navigate(ScreenNavigator.Signup);
    }

    const handleForgotPasswordButton = async () => {
        // navigation.navigate(ScreenNavigator.ForgotPassword);
        // console.log(loading);
        // console.log(error);
        console.log(data?.getUserMe);
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor={AppHelper.material.green500} />
            <Image source={images.LoginIcon} style={styles.image} />
            <View style={styles.infoContainer}>
                <View style={styles.inputContainer}>
                    <Text style={styles.login}>Login</Text>
                    <View style={styles.inputField}>
                        <Text style={styles.bold}>Email</Text>
                        <TextField value={auth.email} onChangeText={(text) => setAuth({ ...auth, username: text })} style={inputStyles.inputField} />
                    </View>
                    <View style={styles.inputField}>
                        <Text style={styles.bold}>Password</Text>
                        <TextField value={auth.password} onChangeText={(text) => setAuth({ ...auth, password: text })} style={inputStyles.inputField} />
                    </View>
                    <Button label="Forgot Password?" style={styles.forgotPassword} onPress={handleForgotPasswordButton} link outline color={AppHelper.material.green500}/>
                </View>
                <View style={styles.loginContainer}>
                    <View style={styles.buttonContainer}>
                        <Button label="Login" style={styles.button} onPress={handleLoginButton} />
                        <View style={styles.horizontalLine}>
                            <View style={{ borderBottomColor: AppHelper.material.green300, borderBottomWidth: 1, width: "40%" }} />
                            <Text style={{ color: AppHelper.material.green400 }}>Or</Text>
                            <View style={{ borderBottomColor: AppHelper.material.green300, borderBottomWidth: 1, width: "40%" }} />
                        </View>
                        <Button style={styles.googleButton} onPress={handleLoginWithGoogleButton}>
                            <Image source={images.GoogleIcon} style={styles.googleIcon}/>
                            <Text style={styles.googleText}>Login With Google</Text>
                        </Button>
                    </View>
                    <View style={styles.SignupContainer}>
                        <Text>Don't have an account?  </Text>
                        <Button label="Signup" onPress={handleSignupButton} link outline color={AppHelper.material.green400}/>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}