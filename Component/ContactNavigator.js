//ContactNavigator
import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ContactsScreen from "./Contacts";
import ViewBlockContactScreen from "./DisplayBlockedContact";

const ContactNavigationStack = createNativeStackNavigator();

export default function ContactNavigator() {
  return (
    <ContactNavigationStack.Navigator>
      <ContactNavigationStack.Screen name="Contacts" component={ContactsScreen} options={{ headerShown: false }} />
      <ContactNavigationStack.Screen name="DisplayBlockedContact" component={ViewBlockContactScreen} options={{ headerShown: false }} />
    </ContactNavigationStack.Navigator>
  );
}
