import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Login, Signup } from "./src/screens";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name={"Login"} component={Login} />
        <Stack.Screen name={"Signup"} component={Signup} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}