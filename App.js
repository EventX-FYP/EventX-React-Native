import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Login, Signup, Phases, Planner, Client } from "./src/screens";
import { Provider } from "react-redux";
import store from "./src/store";
import { ScreenNavigator } from "./src/helper";
import { ApolloProvider } from "@apollo/client";
import { client } from "./src/hooks/ApolloClient";
import { Chat } from "./src/screens/General";
import { JobDetail } from "./src/screens/General";
import { Packages } from "./src/screens";

const Stack = createNativeStackNavigator();
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
            <Stack.Screen name={ScreenNavigator.Chat} component={Chat}/>
            <Stack.Screen name={ScreenNavigator.JobDetail} component={JobDetail}/>
            <Stack.Screen name={ScreenNavigator.Packages} component={Packages}/>
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </ApolloProvider>
  );
}