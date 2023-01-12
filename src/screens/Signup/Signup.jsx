import { SafeAreaView, View } from "react-native";
import { Button, Image, Text } from "react-native-ui-lib";
import { images } from "../../assets";
import { StatusBar } from "react-native";
import { styles } from "./styles";
import { TextField } from "react-native-ui-lib/src/incubator";
import React from "react";
import { AppHelper } from "../../helper/AppHelper/AppHelper";

export const Signup = ({ navigation }) => {
    const [auth, setAuth] = React.useState({ email: "", password: "" });

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor={AppHelper.material.green500}/>
            <Image source={images.SignupIcon} style={styles.signup_image}/>
            <View style={styles.signupContainer}>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Signup</Text>
                    <TextField placeholder="Email" value={auth.email} onChangeText={(text) => setAuth({ ...auth, email: text })} style={styles.input}/>
                    <TextField placeholder="Password" value={auth.password} onChangeText={(text) => setAuth({ ...auth, password: text })} style={styles.input}/>
                </View>

                <View style={styles.loginContainer}>
                    <View style={styles.buttonContainer}>
                        <Button label="Signup" style={styles.button} />
                        <View style={styles.horizontalLine}>
                            <View style={{ borderBottomColor: AppHelper.material.green300, borderBottomWidth: 1, width: "40%" }} />
                            <Text style={{ color: AppHelper.material.green400 }}>Or</Text>
                            <View style={{ borderBottomColor: AppHelper.material.green300, borderBottomWidth: 1, width: "40%" }} />
                        </View>
                        <Button label="Signup With Google" color={AppHelper.black} style={styles.googleButton} iconSource={images.GoogleIcon} iconStyle={styles.googleIcon}/>
                    </View>
                    <View style={styles.alreadyHaveAccount}>
                        <Text>Already have an account?  </Text>
                        <Button label="Login" onPress={() => navigation.navigate("Login")} link outline color={AppHelper.material.green400}/>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}

