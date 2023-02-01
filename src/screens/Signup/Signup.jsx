import { SafeAreaView, View } from "react-native";
import { Button, Image, Text } from "react-native-ui-lib";
import { images } from "../../assets";
import { StatusBar } from "react-native";
import { styles } from "./styles";
import { TextField } from "react-native-ui-lib/src/incubator";
import React from "react";
import { ScreenNavigator, AppHelper } from "../../helper";
import { createUser } from "../../firebase";

export const Signup = ({ navigation }) => {
    const [auth, setAuth] = React.useState({ username: "", password: "", confirmPassword: "" });
    const [error, setError] = React.useState({ email: "Email is required", password: "Please enter password", confirmPassword: "Please enter confirm password" });

    const handleSignupButton = async () => {
        await createUser(auth.username, auth.password)
            .then(() => navigation.navigate(ScreenNavigator.Phases))
    }

    const handleLoginButton = () => {
        navigation.navigate(ScreenNavigator.Login);
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
                        <TextField value={auth.password} onChangeText={(text) => setAuth({ ...auth, password: text })} error={error.password} style={styles.input} />
                    </View>
                    <View style={styles.inputField}>
                        <Text style={styles.bold}>Re-enter Password</Text>
                        <TextField value={auth.confirmPassword} onChangeText={(text) => setAuth({ ...auth, confirmPassword: text })} error={error.password} style={styles.input} />
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
                        <Button style={styles.googleButton} onPress={handleSignupButton}>
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

