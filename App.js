//completed
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



































// wcam
// // import React, { Component } from 'react';
// // import LoginScreen from './Component/Login';
// // import Register from './Component/Register';
// // import ViewContacts from './Component/ViewContacts';
// // import { NavigationContainer } from '@react-navigation/native';
// // import { createNativeStackNavigator } from '@react-navigation/native-stack';
// // import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// // import UpdateProfile from './Component/UpdateProfile';
// // import CameraScreen from './Component/Camera';
// // // import ViewBlockedContacts from './Component/ViewBlockedContacts';
// // import Chats from './Component/Chats';
// // // import ViewChats from './Component/ViewChats';
// // import Profile from './Component/Profile';
// // import Users from './Component/User';
// // import BlockedContacts from './Component/BlockedContacts';

// // const Stack = createNativeStackNavigator();
// // const Tab = createBottomTabNavigator();

// // function TabNavigation() {
// //   return (
// //       <Tab.Navigator initialRouteName="Profile"> 
// //       <Tab.Screen name="Users" component={Users}/>
// //         <Tab.Screen name="UpdateProfile" component={UpdateProfile}/>
// //         <Tab.Screen name="ViewContacts" component={ViewContacts}/>
// //         <Tab.Screen name="Camera" component={CameraScreen}/>
// //         <Tab.Screen name="Chats" component={Chats}/>
// //         {/* <Tab.Screen name="ViewBlockedContacts" component={ViewBlockedContacts}/> */}
// //         {/* <Tab.Screen name="Chat" component={AddChat}/> */}
// //         {/* <Tab.Screen name="ViewChats" component={ViewChats}/> */}
// //         <Tab.Screen name="Profile" component={Profile} options={{ headerLeft: false }} />

// //       </Tab.Navigator>
// //   );
// // }

// // export default class App extends Component {

// //   render() {
// //     return (
// //         <NavigationContainer>
// //           <Stack.Navigator>
// //             <Stack.Screen name="Login" component={LoginScreen} />
// //             <Stack.Screen name="Register" component={Register} />
// //             <Stack.Screen name="MainAppNavigation" component={TabNavigation} options={{headerShown: false}}/>
// //             <Stack.Screen name="BlockedContacts" component={BlockedContacts} />
// //           </Stack.Navigator>
// //         </NavigationContainer>
// //     )
// //   }
// // }
















// import { Component } from "react";
// import React from "react";

// import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// import Ionicons from "react-native-vector-icons/Ionicons";

// //Authentication Navigators
// import LoginScreen from "./Pages/AuthStack/Login";
// import SignupScreen from "./Pages/AuthStack/Register";
// // import HomeScreen from "./Pages/AuthStack/Home";

// //MainAppNav Tab Navigators
// import ProfileScreen from "./Pages/MainAppTabNav/Profile";
// import UsersScreen from "./Pages/MainAppTabNav/Users";
// import ContactScreen from "./Pages/MainAppTabNav/Contact"; //Stack 
// import ChatsScreen from "./Pages/MainAppTabNav/Chats";

// const Tab = createBottomTabNavigator();
// const AuthStack = createNativeStackNavigator();

// function TabNavigation() {
//   return (
//     <Tab.Navigator
//       screenOptions={({ route }) => ({
//         tabBarIcon: ({ focused, color, size }) => {
//           let iconName;

//           if (route.name === "Home") {
//             iconName = focused ? "home-sharp" : "home-outline";
//           } else if (route.name === "Profile") {
//             iconName = focused
//               ? "person-circle-sharp"
//               : "person-circle-outline";
//           } else if (route.name === "Users") {
//             iconName = focused ? "book-sharp" : "book-outline";
//           } else if (route.name === "Contact") {
//             iconName = focused
//               ? "people-circle-sharp"
//               : "people-circle-outline";
//           } else if (route.name === "Chats") {
//             iconName = focused ? "chatbubbles-sharp" : "chatbubbles-outline";
//           }
//           // else if (route.name === "Users") {
//           //     iconName = focused ? "book-sharp" : "book-outline"
//           //   } else if (route.name === "Chats") {
//           //     iconName = focused ? "chatbubbles-sharp" : "chatbubbles-outline"
//           //  }

//           return <Ionicons name={iconName} size={size} color={color} />;
//         },
//       })}
//       tabBarOptions={{
//         activeTintColor: "black",
//         inactiveTintColor: "black",
//       }}
//     >
//       {/* <Tab.Screen
//         name="Home"
//         component={HomeScreen}
//         options={{ tabBarBadge: 5 }}
//       /> */}
//       <Tab.Screen name="Profile" component={ProfileScreen} />
//       <Tab.Screen name="Users" component={UsersScreen} />
//       <Tab.Screen name="Contact" component={ContactScreen} />
//       <Tab.Screen name="Chats" component={ChatsScreen} />
//     </Tab.Navigator>
//   );
// }

// export default class App extends Component {
//   render() {
//     return (
//       <NavigationContainer>
//         <AuthStack.Navigator
//           initialRouteName="Login" //view current page on application
//           screenOptions={{
//             headerShown: false,
//           }}
//         >
//           <AuthStack.Screen name="Login" component={LoginScreen} />
//           <AuthStack.Screen name="Signup" component={SignupScreen} />
//           <AuthStack.Screen name="Profile" component={TabNavigation} />
//         </AuthStack.Navigator>
//       </NavigationContainer>
//     );
//   }
// }
