import { SafeAreaView, Image, View, useWindowDimensions } from "react-native";
import { Text, Button } from "react-native-ui-lib";
import { images } from "../../assets";
import React, { useRef } from "react";
import { TextField } from "react-native-ui-lib/src/incubator";
import { StatusBar, TextInput } from "react-native";
import { styles } from "./styles";
import { inputStyles } from "../../styles";
import { ScreenNavigator, AppHelper } from "../../helper";
import { IOS_CLIENT_ID, ANDROID_CLIENT_ID, EXPO_CLIENT_ID } from "@env";
import { BottomSheet } from "../../components";
import * as Google from "expo-auth-session/providers/google";
import { useSelector, useDispatch } from "react-redux";
import { UPDATE_USER } from "../../store/types";

const googleConfig = {
    expoClientId: EXPO_CLIENT_ID,
    iosClientId: IOS_CLIENT_ID,
    androidClientId: ANDROID_CLIENT_ID,
    scopes: ["profile", "email"],
}

export const Login = ({ navigation }) => {
    const [request, response, promptAsync] = Google.useAuthRequest(googleConfig);
    const [auth, setAuth] = React.useState({ username: "", password: "" });
    const loginRef = useRef();
    const { height } = useWindowDimensions();

    const user = useSelector(state => state.user);
    const dispatch = useDispatch();


    const handleLoginButton = async () => {
        if (auth.username === "" || auth.password === "") {
            alert("Please enter email and password");
            return;
        }
        if (auth.username === "noono14252@gmail.com" || auth.username === "haroontahirr100@gmail.com") {
            dispatch({ type: UPDATE_USER, payload: { ...user, type: "client" }})
            navigation.navigate(ScreenNavigator.Client);
        }
        else {
            dispatch({ type: UPDATE_USER, payload: { ...user, type: "planner" }})
            navigation.navigate(ScreenNavigator.Planner);
        }
        // navigation.navigate(ScreenNavigator.Client);
        // loginRef.current.expand();
    }

    const fetchUserInfo = async (token) => {
        const response = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
            method: 'GET',
            headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
            },
        });

        return await response.json();
    }
    const handleLoginWithGoogleButton = async () => {
        const result = await promptAsync();
        const { authentication: { accessToken }} = result;
        const userInfo = await fetchUserInfo(accessToken);
        if (userInfo.email === "noono14252@gmail.com" || userInfo.email === "haroontahirr100@gmail.com") {
            dispatch({ type: UPDATE_USER, payload: { ...user, type: "client" }})
            navigation.navigate(ScreenNavigator.Client);
        }
        else {
            dispatch({ type: UPDATE_USER, payload: { ...user, type: "planner" }})
            navigation.navigate(ScreenNavigator.Planner);
        }
        console.log(userInfo);
    }

    const handleSignupButton = () => {
        navigation.navigate(ScreenNavigator.Signup);
    }

    const handleForgotPasswordButton = async () => {
        // navigation.navigate(ScreenNavigator.ForgotPassword);
        // console.log(loading);
        // console.log(error);
        // console.log(data?.getUserMe);
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
                        <TextInput value={auth.password} onChangeText={(text) => setAuth({ ...auth, password: text })} style={inputStyles.inputField} secureTextEntry />
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
                            <Image source={images.GoogleIcon} style={styles.googleIcon} />
                            <Text style={styles.googleText}>Login With Google</Text>
                        </Button>
                    </View>
                    <View style={styles.SignupContainer}>
                        <Text>Don't have an account?  </Text>
                        <Button label="Signup" onPress={handleSignupButton} link outline color={AppHelper.material.green400}/>
                    </View>
                </View>
            </View>
            <BottomSheet ref={loginRef} activeHeight={height * 0.5} backgroundColor={AppHelper.material.green50} backDropColor={'black'}>
                <View style={{ alignItems: "center" }}>
                    <Text>Bottom Sheet</Text>
                </View>
            </BottomSheet>
        </SafeAreaView>
    );
}