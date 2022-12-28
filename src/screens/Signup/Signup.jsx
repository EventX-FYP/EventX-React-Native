import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";

export const Signup = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text>Signup Page</Text>
            <StatusBar style="auto" />
            <Button title="Go Back" onPress={() => navigation.goBack()} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});
