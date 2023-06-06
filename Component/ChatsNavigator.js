
//Chats Navigator
import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SendingMessage from './SendingMessage';
import ViewingChats from './ViewingChats';
import CreateNewChat from './CreateNewChat';
import ViewingList from './ViewingList';
import AddOrRemoveUserChats from './AddOrRemoveUserChats';
import AddingUserChat from './AddingUserChat';
import DeletingUserChat from './DeletingUserChat';
import UpdatingChat from './UpdatingChat';
import UpdatingMessage from './UpdatingMessage';

const ChatsNavigationStack = createNativeStackNavigator();

export default function ChatsNavigator() {
  return (
      <ChatsNavigationStack.Navigator screenOptions={{ headerShown: false}}>
        <ChatsNavigationStack.Screen name="CreateNewChat" component={CreateNewChat} />
        <ChatsNavigationStack.Screen name="ViewingChats" component={ViewingChats} />
        <ChatsNavigationStack.Screen name="SendingMessage" component={SendingMessage} />      
        <ChatsNavigationStack.Screen name="ViewingList" component={ViewingList} />
        <ChatsNavigationStack.Screen name="AddOrRemoveUserChats" component={AddOrRemoveUserChats} />
        <ChatsNavigationStack.Screen name="AddingUserChat" component={AddingUserChat}/>
        <ChatsNavigationStack.Screen name="DeletingUserChat" component={DeletingUserChat} />
        <ChatsNavigationStack.Screen name="UpdatingChat" component={UpdatingChat}/>
        <ChatsNavigationStack.Screen name="UpdatingMessage" component={UpdatingMessage}/>
      </ChatsNavigationStack.Navigator>
  );
}
