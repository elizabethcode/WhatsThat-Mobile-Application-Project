
// // import React, { Component } from 'react';
// // import Login from './Component/Login';
// // import Register from './Component/Register';
// // import ViewContacts from './Component/ViewContacts';
// // import Profile from './Component/Profile';
// // import { NavigationContainer } from '@react-navigation/native';
// // import { createNativeStackNavigator } from '@react-navigation/native-stack';
// // import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// // import Home from './Component/Home';
// // import UpdateProfile from './Component/UpdateProfile';
// // import CameraScreen from './Component/Camera';
// // import ViewBlockedContacts from './Component/ViewBlockedContacts';
// // import AddChat from './Component/Chat';
// // import ViewChats from './Component/ViewChats';
// // const Stack = createNativeStackNavigator();
// // const Tab = createBottomTabNavigator();

// // function TabNavigation() {
// //   return (
// //       <Tab.Navigator initialRouteName="Profile"> 
// //         <Tab.Screen name="Profile" Component={Profile} options={{ headerLeft: false }} />
// //         <Tab.Screen name="UpdateProfile" Component={UpdateProfile}/>
// //         <Tab.Screen name="ViewContacts" Component={ViewContacts}/>
// //         <Tab.Screen name="Camera" Component={CameraScreen}/>
// //         <Tab.Screen name="ViewBlockedContacts" Component={ViewBlockedContacts}/>
// //         <Tab.Screen name="Chat" Component={AddChat}/>
// //         <Tab.Screen name="ViewChats" Component={ViewChats}/>



// //       </Tab.Navigator>
// //   )
// // }

// // export default class App extends Component {

// //   render() {
// //     return (
// //         <NavigationContainer>
// //           <Stack.Navigator initialRouteName="Home">
// //             <Stack.Screen name="Home" Component={Home} />
// //             <Stack.Screen name="Login" Component={Login} />
// //             <Stack.Screen name="Register" Component={Register} />
// //             <Stack.Screen name="MainAppNavigation" Component={TabNavigation} options={{headerShown: false}}/>
// //           </Stack.Navigator>
// //         </NavigationContainer>
// //     )
// //   }
// // }








// import React, { Component } from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { View, Text, ScrollView } from "react-native-web";
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// // import HomeScreen from "./Component/HomeScreen"
// // import LoginScreen from "./App/Screens/LoginScreenC"
// // import RegisterScreen from "./App/Screens/RegisterScreen"

// // import HomeScreen from './App/Screens/HomeScreen';
// import LoginScreen from './Component/Login';
// import RegisterScreen from './Component/Register';
// import ContactScreen from './Component/ViewContacts';
// import Profile from './Component/Profile';
// import Chats from './Component/Chats';
// import UpdateProfile from './Component/UpdateProfile';
// // import Camera from './Component/Camera';
// import CameraSendServer from './Component/CameraSendServer';
// import EditProfilePic from './Component/EditProfilePic';
// // import { Camera } from 'expo-camera';

// // import LogOutScreen from "./Conponents/Contacts";

// const Stack = createNativeStackNavigator();
// const Tab = createBottomTabNavigator();

// function TabNavigation() {
//   return (
//     <Tab.Navigator>
//       <Tab.Screen name="Contacts" component={ContactScreen} options={{ headerLeft: false }} />
//       <Tab.Screen name="Chats" component={Chats} options={{ headerLeft: false }} />
//       <Tab.Screen name="Profile" component={Profile} options={{ headerLeft: false }} />
//     </Tab.Navigator>
//   );
// }

// export default class App extends Component {

//   render() {
//     return (
//       <NavigationContainer>
//         <Stack.Navigator initialRouteName="Login">
//           <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
//           <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: true }} />
//           <Stack.Screen name="MainAppNavigation" component={TabNavigation} options={{ headerShown: false }} />
//         </Stack.Navigator>
//       </NavigationContainer>

//     )
//   }
// }






import React, { Component } from 'react';
import LoginScreen from './Component/Login';
import Register from './Component/Register';
import ViewContacts from './Component/ViewContacts';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import UpdateProfile from './Component/UpdateProfile';
import CameraScreen from './Component/Camera';
// import ViewBlockedContacts from './Component/ViewBlockedContacts';
import AddChat from './Component/Chat';
// import ViewChats from './Component/ViewChats';
import Profile from './Component/Profile';
import Users from './Component/User';
import BlockedContacts from './Component/BlockedContacts';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function TabNavigation() {
  return (
      <Tab.Navigator initialRouteName="Profile"> 
      <Tab.Screen name="Users" component={Users}/>
        <Tab.Screen name="UpdateProfile" component={UpdateProfile}/>
        <Tab.Screen name="ViewContacts" component={ViewContacts}/>
        <Tab.Screen name="Camera" component={CameraScreen}/>
        {/* <Tab.Screen name="ViewBlockedContacts" component={ViewBlockedContacts}/> */}
        <Tab.Screen name="Chat" component={AddChat}/>
        {/* <Tab.Screen name="ViewChats" component={ViewChats}/> */}
        <Tab.Screen name="Profile" component={Profile} options={{ headerLeft: false }} />

      </Tab.Navigator>
  );
}

export default class App extends Component {

  render() {
    return (
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="MainAppNavigation" component={TabNavigation} options={{headerShown: false}}/>
            <Stack.Screen name="BlockedContacts" component={BlockedContacts} />
          </Stack.Navigator>
        </NavigationContainer>
    )
  }
}

