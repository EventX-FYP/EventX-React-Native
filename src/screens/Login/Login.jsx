import { StatusBar } from "expo-status-bar";
import { Button, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { Navigate } from "../../helper";

export const Login = ({ navigation }) => {

    return (
        <SafeAreaView style={styles.container}>
            <Text>Login Page</Text>
            <StatusBar style="auto" />
            <Text>Welcome To EventX</Text>
            <Button style={styles.button} title="Signup" onPress={() => navigation.navigate(Navigate('Signup'))} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "column",
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    button: {
        marginTop: 20,
    }
});
