import { SafeAreaView, Image, View } from "react-native";
import { Text, Button } from "react-native-ui-lib";
import { images } from "../../assets";
import { AppHelper } from "../../helper/AppHelper/AppHelper";
import React from "react";
import { TextField } from "react-native-ui-lib/src/incubator";
import { StatusBar } from "react-native";
import { styles } from "./styles";


export const Login = ({ navigation }) => {
    const [auth, setAuth] = React.useState({ email: "", password: "" });
    const [error, setError] = React.useState({ email: "", password: "" });

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor={AppHelper.material.green500} />
            <Image source={images.LoginIcon} style={styles.image} />
            <View style={styles.infoContainer}>
                <View style={styles.inputContainer}>
                    <Text style={styles.login}>Login</Text>
                    <TextField placeholder="Email" value={auth.email} onChangeText={(text) => setAuth({ ...auth, email: text })} error={error.email} style={styles.input} />
                    <TextField placeholder="Password" value={auth.password} onChangeText={(text) => setAuth({ ...auth, password: text })} error={error.password} style={styles.input} />
                </View>
                <View style={styles.loginContainer}>
                    <View style={styles.buttonContainer}>
                        <Button label="Login" style={styles.button} />
                        <View style={styles.horizontalLine}>
                            <View style={{ borderBottomColor: AppHelper.material.green300, borderBottomWidth: 1, width: "40%" }} />
                            <Text style={{ color: AppHelper.material.green400 }}>Or</Text>
                            <View style={{ borderBottomColor: AppHelper.material.green300, borderBottomWidth: 1, width: "40%" }} />
                        </View>
                        <Button label="Login With Google" color={AppHelper.black} style={styles.googleButton} iconSource={images.GoogleIcon} iconStyle={styles.googleIcon}/>
                    </View>
                    <View style={styles.SignupContainer}>
                        <Text>Don't have an account?  </Text>
                        <Button label="Signup" onPress={() => navigation.navigate("GeneralInfo")} link outline color={AppHelper.material.green400}/>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}