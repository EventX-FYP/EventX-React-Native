import { SafeAreaView, StyleSheet, Image, TextInput, View } from "react-native";
import { Text, Button } from "react-native-ui-lib";
import { images } from "../../assets";
import { AppHelper } from "../../helper/AppHelper/AppHelper";
import React from "react";
import { TextField } from "react-native-ui-lib/src/incubator";


export const Login = ({ navigation }) => {
    const [auth, setAuth] = React.useState({ email: "", password: "" });
    const [error, setError] = React.useState({ email: "", password: "" });

    React.useEffect(() => {
        console.log(auth);
    }, [auth]);

    return (
        <SafeAreaView style={styles.container}>
            <Image source={images.LoginIcon} style={styles.image} />
            <View style={styles.infoContainer}>
                <View style={styles.inputContainer}>
                    <Text style={styles.login}>Login</Text>
                    <TextField placeholder="Email" value={auth.email} onChangeText={(text) => setAuth({ ...auth, email: text })} error={error.email} style={styles.input} />
                    <TextField placeholder="Password" value={auth.password} onChangeText={(text) => setAuth({ ...auth, password: text })} error={error.password} style={styles.input} />
                </View>
                <View style={styles.loginContainer}>
                    <View style={styles.buttonContainer}>
                        <Button label="Login" style={styles.button} onPress={() => navigation.navigate("Signup")} />
                        <View style={styles.horizontalLine}>
                            <View style={{ borderBottomColor: AppHelper.material.green300, borderBottomWidth: 1, width: "40%" }} />
                            <Text style={{ color: AppHelper.material.green400 }}>Or</Text>
                            <View style={{ borderBottomColor: AppHelper.material.green300, borderBottomWidth: 1, width: "40%" }} />
                        </View>
                        <Button label="Login With Google" color={AppHelper.black} animateLayout style={styles.googleButton} onPress={() => navigation.navigate("Signup")} iconSource={images.GoogleIcon} iconStyle={styles.googleIcon}/>
                    </View>
                    <View style={styles.SignupContainer}>
                        <Text>Don't have an account?  </Text>
                        <Button label="Signup" onPress={() => navigation.navigate("UserType")} link outline color={AppHelper.material.green400}/>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    inputContainer: {
        width: "100%",
        height: "30%",
        justifyContent: "space-between",
    },
    infoContainer: {
        width: "80%",
        height: "70%",
        backgroundColor: AppHelper.material.green50,
        justifyContent: "space-between",
    },
    container: {
        flex: 1,
        alignItems: "center",
        paddingTop: 50,
        paddingBottom: 20,
        backgroundColor: AppHelper.material.green50,
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
        backgroundColor: AppHelper.material.white,
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
