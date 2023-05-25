import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import SendMsg from './SendMsg';
import ViewChats from './ViewChats';
import NewChat from './NewChat';
import ViewList from './ViewList';
import AddRemove from './AddRemove';
import AddUserChat from './AddUserChat';
import DelUserChat from './DelUserChat';
import UpdateChat from './UpdateChat';
import UpdateMsg from './UpdateMsg';

const StackChat = createStackNavigator();

export default function Chats() {
return (
      
      <StackChat.Navigator  screenOptions={{headerShown: false}}>
      <StackChat.Screen name="ViewChats" component={ViewChats} />
      <StackChat.Screen name="SendMsg" component={SendMsg} />
      <StackChat.Screen name="NewChat" component={NewChat} />
      <StackChat.Screen name="ViewList" component={ViewList} />
      <StackChat.Screen name="AddRemove" component={AddRemove} />
      <StackChat.Screen name="AddUserChat" component={AddUserChat}/>
      <StackChat.Screen name="DelUserChat" component={DelUserChat} />
      <StackChat.Screen name="UpdateChat" component={UpdateChat}/>
      <StackChat.Screen name="UpdateMsg" component={UpdateMsg}/>
      </StackChat.Navigator>

  );

}