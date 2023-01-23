import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Login, Signup, UserType, GeneralInfo, Phases, Planner, Client } from "./src/screens";
import { Provider } from "react-redux";
import store from "./src/store";
import { ScreenNavigator } from "./src/helper";
const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name={ScreenNavigator.Login} component={Login} />
          <Stack.Screen name={ScreenNavigator.Signup} component={Signup} />
          <Stack.Screen name={ScreenNavigator.Phases} component={Phases} />
          <Stack.Screen name={ScreenNavigator.Planner} component={Planner} />
          <Stack.Screen name={ScreenNavigator.Client} component={Client} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}