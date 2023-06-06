import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Authentication Navigators
import Login from "./Component/Login";
import Register from "./Component/Register";

// bottom Tab Navigators
import ProfilePage from "./Component/ProfileNavigator";
import UsersPage from "./Component/UsersNavigator";
import ContactPage from "./Component/ContactNavigator";
import ChatsPage from "./Component/ChatsNavigator";

const Tab = createBottomTabNavigator();
const AuthStack = createNativeStackNavigator();

function BottomTabNavigation() {
  const RetrievingIconName = (routeName, focused) => {
    const IconNames = {
      Profile: focused ? "person" : "person-outline",
      Users: focused ? "people" : "people-outline",
      Contact: focused ? "mail" : "mail-outline",
      Chats: focused ? "chatbubbles" : "chatbubbles-outline",
    };
    return IconNames[routeName];
  };

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          const iconName = RetrievingIconName(route.name, focused);
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{activeTintColor: "#F98125", inactiveTintColor: "#F98125"}}
    >
      <Tab.Screen name="Profile" component={ProfilePage} options={{ headerShown: false }} />
      <Tab.Screen name="Users" component={UsersPage} options={{ headerShown: false }} />
      <Tab.Screen name="Contact" component={ContactPage} options={{ headerShown: false }} />
      <Tab.Screen name="Chats" component={ChatsPage} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <AuthStack.Navigator>
        <AuthStack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <AuthStack.Screen name="Register" component={Register} options={{ headerShown: false }} />
        <AuthStack.Screen name="ProfileNavigator" component={BottomTabNavigation} options={{ headerShown: false }} />
      </AuthStack.Navigator>
    </NavigationContainer>
  );
}