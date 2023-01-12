import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Login, Signup, UserType, GeneralInfo, Phases } from "./src/screens";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name={"Login"} component={Login} />
        <Stack.Screen name={"Signup"} component={Signup} />
        <Stack.Screen name={"UserType"} component={UserType} />
        <Stack.Screen name={"GeneralInfo"} component={GeneralInfo} />
        <Stack.Screen name={"Phases"} component={Phases} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}