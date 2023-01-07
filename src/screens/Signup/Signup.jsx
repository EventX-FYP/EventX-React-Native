import { Text, View, StyleSheet } from "react-native";
import { Button } from "react-native-ui-lib";
import { AppHelper } from "../../helper/AppHelper/AppHelper";

export const Signup = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text>Signup Page</Text>
            <Button label="Signup" onPress={() => navigation.navigate("Login")}/>
        </View>
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
});