// //Contact
// import * as React from "react";
// import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";

// //Import all comonents related to CONTACTS MANAGEMENT
// import ContactsScreen from "./ContactsManagement/Contacts";
// import ViewBlockContactScreen from "./ContactsManagement/ViewBlockContact";

// const ContactStack = createNativeStackNavigator();

// export default function Contact() {
//   return (
//     <ContactStack.Navigator>
//       <ContactStack.Screen name="Contacts" component={ContactsScreen} />
//       <ContactStack.Screen name="ViewBlockContact" component={ViewBlockContactScreen}
//       />
//     </ContactStack.Navigator>
//   );
// }






import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

//Import all components related to CONTACTS MANAGEMENT
import ContactsScreen from "./ContactsManagement/Contacts";
import ViewBlockContactScreen from "./ContactsManagement/ViewBlockContact";

const ContactNavigationStack = createNativeStackNavigator();

export default function Contact() {
  return (
    <ContactNavigationStack.Navigator>
      <ContactNavigationStack.Screen name="Contacts" component={ContactsScreen} options={{ headerShown: false }} />
      <ContactNavigationStack.Screen name="ViewBlockContact" component={ViewBlockContactScreen} options={{ headerShown: false }} />
    </ContactNavigationStack.Navigator>
  );
}
