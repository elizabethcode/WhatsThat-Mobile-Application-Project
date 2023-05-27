// //Profile
// import * as React from "react";
// import { Button, View, Text } from "react-native";
// import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";

// //Import all comonents related to USERS MANAGEMENT
// import AccountProfileScreen from "./UsersManagement/AccountProfile";
// import EditUserProfileScreen from "./UsersManagement/EditUserProfile";
// import EditProfilePicScreen from "./UsersManagement/EditProfilePic";
// import UploadPhotoScreen from "./UsersManagement/UploadPhoto";

// const ProfileStack = createNativeStackNavigator();

// export default function Profile() {
//   return (
//     //this holds all the possible pages the user is able to go to through the profile
//     <ProfileStack.Navigator>
//       <ProfileStack.Screen
//         name="AccountProfile"
//         component={AccountProfileScreen}
//       />
//       <ProfileStack.Screen
//         name="EditUserProfile"
//         component={EditUserProfileScreen}
//       />
//       <ProfileStack.Screen
//         name="EditProfilePic"
//         component={EditProfilePicScreen}
//       />
//       <ProfileStack.Screen name="UploadPhoto" component={UploadPhotoScreen} />
//       {/* <ProfileStack.Screen name="Camera" component={CameraScreen} screenOptions={{
//         tabBarShowLabel:false,
//         headerShown:true,}}/> */}
//     </ProfileStack.Navigator>
//   );
// }







import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

//Import all comonents related to USERS MANAGEMENT
import AccountProfileScreen from "./UsersManagement/AccountProfile";
import EditUserProfileScreen from "./UsersManagement/EditUserProfile";
import EditProfilePicScreen from "./UsersManagement/EditProfilePic";
import UploadPhotoScreen from "./UsersManagement/UploadPhoto";

const ProfileStack = createNativeStackNavigator();

export default function Profile() {
  return (
    // This holds all the possible pages the user is able to go to through the profile
    <ProfileStack.Navigator
      screenOptions={{
        headerShown: false, // Hide the header for all screens
      }}
    >
      <ProfileStack.Screen
        name="AccountProfile"
        component={AccountProfileScreen}
      />
      <ProfileStack.Screen
        name="EditUserProfile"
        component={EditUserProfileScreen}
      />
      <ProfileStack.Screen
        name="EditProfilePic"
        component={EditProfilePicScreen}
      />
      <ProfileStack.Screen name="UploadPhoto" component={UploadPhotoScreen} />
    </ProfileStack.Navigator>
  );
}
