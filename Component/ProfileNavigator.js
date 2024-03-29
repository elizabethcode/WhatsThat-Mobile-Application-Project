//profileNavigator
import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AccountProfileScreen from "./AccountProfile";
import EditUserProfileScreen from "./UpdatingUserProfile";
import UpdatingProfilePhotoScreen from "./UpdatingProfilePhoto";

const ProfileNavigationStack = createNativeStackNavigator();

export default function ProfileNavigator() {
  return (
    <ProfileNavigationStack.Navigator screenOptions={{ headerShown: false }}>
      <ProfileNavigationStack.Screen name="AccountProfile" component={AccountProfileScreen} />
      <ProfileNavigationStack.Screen name="UpdatingUserProfile" component={EditUserProfileScreen} />
      <ProfileNavigationStack.Screen name="UpdatingProfilePhoto" component={UpdatingProfilePhotoScreen} />
    </ProfileNavigationStack.Navigator>
  );
} 
