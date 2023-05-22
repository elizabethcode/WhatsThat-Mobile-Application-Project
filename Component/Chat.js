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

const ChatsStack = createStackNavigator();

export default function Chat() {
return (
      
      <ChatsStack.Navigator  screenOptions={{headerShown: false}}>
      <ChatsStack.Screen name="ViewChats" component={ViewChats} />
      <ChatsStack.Screen name="SendMsg" component={SendMsg} />
      <ChatsStack.Screen name="NewChat" component={NewChat} />
      <ChatsStack.Screen name="ViewList" component={ViewList} />
      <ChatsStack.Screen name="AddRemove" component={AddRemove} />
      <ChatsStack.Screen name="AddUserChat" component={AddUserChat}/>
      <ChatsStack.Screen name="DelUserChat" component={DelUserChat} />
      <ChatsStack.Screen name="UpdateChat" component={UpdateChat}/>
      <ChatsStack.Screen name="UpdateMsg" component={UpdateMsg}/>
      </ChatsStack.Navigator>

  );

}