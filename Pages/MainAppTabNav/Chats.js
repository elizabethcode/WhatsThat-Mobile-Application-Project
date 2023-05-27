
//Chats
import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//Import all comonents related to CHATS MANAGEMENT
// import Chat from './Chat';
import SendMessage from './ChatManagement/SendMessage';
import ViewChats from './ChatManagement/ViewChats';
import NewChat from './ChatManagement/NewChat';
import ViewList from './ChatManagement/ViewList';
import AddRemove from './ChatManagement/AddRemove';
import AddUserChat from './ChatManagement/AddUserChat';
import DeleteUserChat from './ChatManagement/DeleteUserChat';
import UpdateChat from './ChatManagement/UpdateChat';
import ManageMessage from './ChatManagement/ManageMessage';
// import FullChat from './ChatManagement/FullChat'

const ChatsStack = createNativeStackNavigator();

export default function Chats() {
  return (
    //this holds all the possible pages the user is able to go to through the profile
      <ChatsStack.Navigator screenOptions={{
        headerShown: false, // Hide the header for all screens
      }}>
      {/* <ChatsStack.Screen name="Chat" component={Chat} /> */}
      <ChatsStack.Screen name="NewChat" component={NewChat} />
      <ChatsStack.Screen name="ViewChats" component={ViewChats} />
      <ChatsStack.Screen name="SendMessage" component={SendMessage} />      
      <ChatsStack.Screen name="ViewList" component={ViewList} />
      <ChatsStack.Screen name="AddRemove" component={AddRemove} />
      <ChatsStack.Screen name="AddUserChat" component={AddUserChat}/>
      <ChatsStack.Screen name="DeleteUserChat" component={DeleteUserChat} />
      <ChatsStack.Screen name="UpdateChat" component={UpdateChat}/>
      <ChatsStack.Screen name="ManageMessage" component={ManageMessage}/>

      {/* <ChatsStack.Screen name="FullChat" component={FullChat} /> */}
      </ChatsStack.Navigator>
  );
}
