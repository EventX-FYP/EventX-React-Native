import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Login, Signup, Phases, Planner, Client } from "./src/screens";
import { Provider } from "react-redux";
import store from "./src/store";
import { ScreenNavigator } from "./src/helper";
import { ApolloProvider } from "@apollo/client";
import { client } from "./src/hooks/ApolloClient";

const Stack = createStackNavigator();

export default function App() { 
  return (
    <ApolloProvider client={client}>
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
    </ApolloProvider>
  );
}