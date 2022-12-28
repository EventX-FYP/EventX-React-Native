import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import { Navigate } from "../../helper";

export const Login = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text>Login Page</Text>
            <StatusBar style="auto" />
            <Button style={styles.button} title="Signup" onPress={() => navigation.navigate(Navigate('Signup'))} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "column",
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "space-around",
    },
    button: {
        width: "100%",
        height: 50,
        backgroundColor: "red",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
    }
});
