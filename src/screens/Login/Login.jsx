import { SafeAreaView, Image, View } from "react-native";
import { Text, Button } from "react-native-ui-lib";
import { images } from "../../assets";
import { AppHelper } from "../../helper/AppHelper/AppHelper";
import React from "react";
import { TextField } from "react-native-ui-lib/src/incubator";
import { StatusBar } from "react-native";
import { styles } from "./styles";
import { inputStyles } from "../../styles";


export const Login = ({ navigation }) => {
    const [auth, setAuth] = React.useState({ email: "", password: "" });
    const [error, setError] = React.useState({ email: "", password: "" });

    const handleLoginButton = () => {
        navigation.navigate("Planner");
    }

    const handleSignupButton = () => {
        navigation.navigate("Signup");
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
                        <TextField value={auth.email} onChangeText={(text) => setAuth({ ...auth, email: text })} error={error.email} style={inputStyles.inputField} />
                    </View>
                    <View style={styles.inputField}>
                        <Text style={styles.bold}>Password</Text>
                        <TextField value={auth.password} onChangeText={(text) => setAuth({ ...auth, password: text })} error={error.password} style={inputStyles.inputField} />
                    </View>
                    <Button label="Forgot Password?" style={styles.forgotPassword} onPress={() => navigation.navigate("Signup")} link outline color={AppHelper.material.green500}/>
                </View>
                <View style={styles.loginContainer}>
                    <View style={styles.buttonContainer}>
                        <Button label="Login" style={styles.button} onPress={handleLoginButton} />
                        <View style={styles.horizontalLine}>
                            <View style={{ borderBottomColor: AppHelper.material.green300, borderBottomWidth: 1, width: "40%" }} />
                            <Text style={{ color: AppHelper.material.green400 }}>Or</Text>
                            <View style={{ borderBottomColor: AppHelper.material.green300, borderBottomWidth: 1, width: "40%" }} />
                        </View>
                        <Button style={styles.googleButton} onPress={handleLoginButton}>
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