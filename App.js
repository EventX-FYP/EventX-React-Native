import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Login, Signup, Phases, Planner, Client, ClientProfile, EditProfile, SavedPlanner, Analytics } from "./src/screens";
import { Chat, JobDetail, PlannerProfile } from "./src/screens/General";
import { Provider } from "react-redux";
import store from "./src/store";
import { ScreenNavigator } from "./src/helper";
import { ApolloProvider } from "@apollo/client";
import { client } from "./src/hooks/ApolloClient";

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
            <Stack.Screen name={ScreenNavigator.ClientProfile} component={ClientProfile} />
            <Stack.Screen name={ScreenNavigator.EditProfile} component={EditProfile} />
            <Stack.Screen name={ScreenNavigator.SavedPlanner} component={SavedPlanner} />
            <Stack.Screen name={ScreenNavigator.PlannerProfileForClient} component={PlannerProfile} />
            <Stack.Screen name={ScreenNavigator.ClientAnalytics} component={Analytics} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </ApolloProvider>
  );
}