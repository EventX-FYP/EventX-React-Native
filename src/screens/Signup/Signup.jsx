import { SafeAreaView, TextInput, View } from "react-native";
import { Button, Image, Text } from "react-native-ui-lib";
import { images } from "../../assets";
import { StatusBar } from "react-native";
import { styles } from "./styles";
import { TextField } from "react-native-ui-lib/src/incubator";
import React from "react";
import { ScreenNavigator, AppHelper } from "../../helper";
import { useSelector, useDispatch } from "react-redux";
import { UPDATE_USER } from "../../store/types";
import * as Google from "expo-auth-session/providers/google";
import { IOS_CLIENT_ID, ANDROID_CLIENT_ID, EXPO_CLIENT_ID } from "@env";

const googleConfig = {
    expoClientId: EXPO_CLIENT_ID,
    iosClientId: IOS_CLIENT_ID,
    androidClientId: ANDROID_CLIENT_ID,
    scopes: ["profile", "email"],
}

export const Signup = ({ navigation }) => {
    const [request, response, promptAsync] = Google.useAuthRequest(googleConfig);
    const [auth, setAuth] = React.useState({ username: "", password: "", confirmPassword: "" });
    const [error, setError] = React.useState({ email: "Email is required", password: "Please enter password", confirmPassword: "Please enter confirm password" });

    const user = useSelector(state => state.user);
    const dispatch = useDispatch();

    const handleSignupButton = () => {
        if (auth.username === "") {
            alert("Email is required");
            return;
        }
        if (auth.password === "") {
            alert("Password is required");
            return;
        }
        if (auth.confirmPassword === "") {
            alert("Confirm password is required");
            return;
        }
        if (auth.password !== auth.confirmPassword) {
            alert("Password and confirm password does not match");
            return;
        }
        
        dispatch({ type: UPDATE_USER, payload: { ...user, email: auth.username, password: auth.password }})
        navigation.navigate(ScreenNavigator.Phases);
    }

    const handleLoginButton = () => {
        navigation.navigate(ScreenNavigator.Login);
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

    const handleSignupWithGoogle = async () => {
        const result = await promptAsync();
        const { authentication: { accessToken }} = result;
        const userInfo = await fetchUserInfo(accessToken);
        dispatch({ type: UPDATE_USER, payload: { ...user, email: userInfo.email, name: userInfo.name, picture: userInfo.picture  }})
        navigation.navigate(ScreenNavigator.Phases);
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor={AppHelper.material.green500} />
            <Image source={images.SignupIcon} style={styles.image} />
            <View style={styles.infoContainer}>
                <View style={styles.inputContainer}>
                    <Text style={styles.login}>Signup</Text>
                    <View style={styles.inputField}>
                        <Text style={styles.bold}>Email</Text>
                        <TextField value={auth.email} onChangeText={(text) => setAuth({ ...auth, username: text })} error={error.email} style={styles.input} />
                    </View>
                    <View style={styles.inputField}>
                        <Text style={styles.bold}>Password</Text>
                        <TextInput value={auth.password} onChangeText={(text) => setAuth({ ...auth, password: text })} error={error.password} style={styles.input} secureTextEntry />
                    </View>
                    <View style={styles.inputField}>
                        <Text style={styles.bold}>Re-enter Password</Text>
                        <TextInput value={auth.confirmPassword} onChangeText={(text) => setAuth({ ...auth, confirmPassword: text })} error={error.password} style={styles.input} secureTextEntry />
                    </View>
                </View>
                <View style={styles.loginContainer}>
                    <View style={styles.buttonContainer}>
                        <Button label="Signup" style={styles.button} onPress={handleSignupButton}/>
                        <View style={styles.horizontalLine}>
                            <View style={{ borderBottomColor: AppHelper.material.green300, borderBottomWidth: 1, width: "40%" }} />
                            <Text style={{ color: AppHelper.material.green400 }}>Or</Text>
                            <View style={{ borderBottomColor: AppHelper.material.green300, borderBottomWidth: 1, width: "40%" }} />
                        </View>
                        <Button style={styles.googleButton} onPress={handleSignupWithGoogle}>
                            <Image source={images.GoogleIcon} style={styles.googleIcon}/>
                            <Text style={styles.googleText}>Signup With Google</Text>
                        </Button>
                    </View>
                    <View style={styles.SignupContainer}>
                        <Text>Already have an account?  </Text>
                        <Button label="Login" onPress={handleLoginButton} link outline color={AppHelper.material.green400}/>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}

