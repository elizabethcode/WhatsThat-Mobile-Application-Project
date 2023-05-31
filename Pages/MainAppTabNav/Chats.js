
//Chats Navigator
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

const ChatsNavigationStack = createNativeStackNavigator();

export default function Chats() {
  return (
    //this holds all the possible pages the user is able to go to through the profile
      <ChatsNavigationStack.Navigator screenOptions={{ headerShown: false}}>
        {/* <ChatsStack.Screen name="Chat" component={Chat} /> */}
        <ChatsNavigationStack.Screen name="NewChat" component={NewChat} />
        <ChatsNavigationStack.Screen name="ViewChats" component={ViewChats} />
        <ChatsNavigationStack.Screen name="SendMessage" component={SendMessage} />      
        <ChatsNavigationStack.Screen name="ViewList" component={ViewList} />
        <ChatsNavigationStack.Screen name="AddRemove" component={AddRemove} />
        <ChatsNavigationStack.Screen name="AddUserChat" component={AddUserChat}/>
        <ChatsNavigationStack.Screen name="DeleteUserChat" component={DeleteUserChat} />
        <ChatsNavigationStack.Screen name="UpdateChat" component={UpdateChat}/>
        <ChatsNavigationStack.Screen name="ManageMessage" component={ManageMessage}/>

      {/* <ChatsStack.Screen name="FullChat" component={FullChat} /> */}
      </ChatsNavigationStack.Navigator>
  );
}
