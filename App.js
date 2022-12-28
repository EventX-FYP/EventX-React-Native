import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Login, Signup } from "./src/screens";
import { Navigate } from "./src/helper";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name={Navigate("Login")} component={Login} />
        <Stack.Screen name={Navigate("Signup")} component={Signup} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
