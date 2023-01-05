import { SafeAreaView, StyleSheet, Image, TextInput } from "react-native";
import { Text } from "react-native-ui-lib";
import { images } from "../../assets";
import { AppHelper } from "../../helper/AppHelper/AppHelper";

export const Login = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <Image source={images.SVG1} style={styles.image}/>
            <Text style={styles.login}>Login</Text>
            <TextInput placeholder="Enter Email" style={styles.input} keyboardType="email-address"/>
            <TextInput placeholder="Enter Password" style={styles.input} keyboardType="visible-password" keyboardAppearance="light" />
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
        height: 170,
        resizeMode: "stretch"
    },
    login: {
        fontSize: 30,
        fontWeight: "bold",
        color: AppHelper.material.green700
    },
    input: {
        width: "80%",
        height: 50,
        backgroundColor: AppHelper.material.green50,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: AppHelper.material.green700,
        padding: 10,
        fontSize: 20
    }
});
