import { SafeAreaView, StyleSheet, Image, TextInput, } from "react-native";
import { Text, Button } from "react-native-ui-lib";
import { images } from "../../assets";
import { AppHelper } from "../../helper/AppHelper/AppHelper";
import { Navigate } from "../../helper";


export const Login = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            {/* <images.LoginSVG style={styles.image}/> */}
            <Image source={images.LoginSVG} style={styles.image} />
            <Text style={styles.login}>Login</Text>
            <TextInput placeholder="Enter Email" style={styles.input} />
            <TextInput placeholder="Enter Password" style={styles.input} keyboardType="visible-password" keyboardAppearance="light" />
            <Button label="Login" style={styles.button} size={Button.sizes.large} backgroundColor={AppHelper.material.green700} onPress={() => navigation.navigate(Navigate("Signup"))} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        paddingTop: 50,
        paddingBottom: 20,
        backgroundColor: AppHelper.material.green50,
        justifyContent: "space-between"
    },
    image: {
        width: 200,
        height: 180,
        resizeMode: "stretch",
    },
    login: {
        fontSize: 30,
        fontWeight: "bold",
    },
    input: {
        width: "80%",
        height: 50,
        backgroundColor: AppHelper.material.green50,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: AppHelper.palette.textColor,
        padding: 10,
        fontSize: 20
    },
    button: {
        width: "80%",
        height: 50,
        borderRadius: 10,
    }
});
