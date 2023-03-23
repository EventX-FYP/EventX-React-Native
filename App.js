import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Login, Signup, Phases, Planner, Client, ClientProfile, EditProfile, SavedPlanner, Analytics, JobPosting, Proposals } from "./src/screens";
import { Chat, JobDetail, PlannerProfile , PostReview} from "./src/screens/General";
import { Home, Task } from "./src/screens/TaskManagement";
import { Provider } from "react-redux";
import store from "./src/store";
import { ScreenNavigator } from "./src/helper";
import { ApolloProvider } from "@apollo/client";
import { client } from "./src/hooks/ApolloClient";
import { Packages } from "./src/screens";
import PackageDetail from "./src/screens/General/PackageDetail/PackageDetail";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const Stack = createNativeStackNavigator();
export default function App() { 
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
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
              <Stack.Screen name={ScreenNavigator.PackageDetail} component={PackageDetail}/>
              <Stack.Screen name={ScreenNavigator.Packages} component={Packages}/>
              <Stack.Screen name={ScreenNavigator.ClientProfile} component={ClientProfile} />
              <Stack.Screen name={ScreenNavigator.EditProfile} component={EditProfile} />
              <Stack.Screen name={ScreenNavigator.SavedPlanner} component={SavedPlanner} />
              <Stack.Screen name={ScreenNavigator.PlannerProfileForClient} component={PlannerProfile} />
              <Stack.Screen name={ScreenNavigator.ClientAnalytics} component={Analytics} />
              <Stack.Screen name={ScreenNavigator.ClientJobPosting} component={JobPosting} />
              <Stack.Screen name={ScreenNavigator.ClientProposals} component={Proposals} />
              <Stack.Screen name={ScreenNavigator.TaskManagementHome} component={Home} />
              <Stack.Screen name={ScreenNavigator.TaskManagementTask} component={Task} />
              <Stack.Screen name={ScreenNavigator.Bid} component={Bid} />
              <Stack.Screen name={ScreenNavigator.PostTestimonials} component={PostReview} />
            </Stack.Navigator>
          </NavigationContainer>
        </Provider>
      </ApolloProvider>
    </GestureHandlerRootView>
  );
}