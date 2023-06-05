//ViewChats - uni edit
import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons, Entypo, MaterialIcons } from '@expo/vector-icons';
// import { globalStyles } from '../../globalStyles';

export default class ViewChats extends Component {
  constructor(props) {
    super(props);

    // Initialize the component's state
    this.state = {
      // Holds the list of chats
      chats: [],
    };
  }

  // Load the chats when the component mounts
  componentDidMount(){
    // Set up a listener for the focus event
    this.unsubscribe = this.props.navigation.addListener('focus', () => {
      this.loadContacts();
    });
  }

  // Fetch the list of chats from the server
  loadContacts = async () => {
    // Retrieve the user token from AsyncStorage
    const token = await AsyncStorage.getItem('app_session_token');
    
    // Make a GET request to fetch the chats
    fetch('http://localhost:3333/api/1.0.0/chat', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Authorization": token,
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        this.setState({ chats: responseJson });
      })
      .catch((ErrorMessage) => {
        console.log(ErrorMessage);
        this.props.navigation.navigate("SendMessage");
      });
  };


  // Render each chat item
  displayList = ({ item }) => {
    const timestamp = new Date(item.last_message.timestamp).toLocaleString();
    return (

    <TouchableOpacity
      style={styles.ListElement}
      onPress={() => this.props.navigation.navigate('SendMessage', { chat_id: item.chat_id })}> 
     
      <TouchableOpacity
            style={styles.ContactAvailabilityStatus}>
            <Entypo name="message" size={100} color="black" />
          </TouchableOpacity>
      <View style={styles.ContactDetailsHolder}>

      <Text style={styles.ItemListHeading}>{item.name}</Text>
        <Text style={styles.CreatorContactName}>Creator: {item.creator.first_name} {item.creator.last_name}</Text>
        <Text style={styles.ContactEmailAddress}>{item.last_message.message} : {timestamp}</Text>
        <TouchableOpacity
            style={styles.ContactAvailabilityStatus}>
            <Ionicons name="ellipse" size={24} color="green" />
          </TouchableOpacity>
          <Text style={styles.ContactAvailabilityStatus}>Available</Text>
      </View>
    </TouchableOpacity>

  );
};
 

  render() {
    return (
    <View style={styles.MainContainer}>
    <View style={styles.Header}>
      <Text style={styles.Heading}>Chats Page</Text>
      <View style={styles.HeaderButton}>
        <TouchableOpacity style={styles.HeaderNavigateButton} onPress={() => this.props.navigation.navigate("NewChat")}>
          <Ionicons name="chatbubble-ellipses-outline" size={24} color="white" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.HeaderNavigateButton} onPress={() => this.props.navigation.navigate("ViewList")}>
          <Ionicons name="list-outline" size={24} color="white" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.HeaderNavigateButton} onPress={() => this.props.navigation.navigate("AddRemove")}>
          <Ionicons name="people-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>

    <FlatList
      style={styles.ContainerList}
      data={this.state.chats}
      renderItem={this.displayList}
    />
  </View>
    );
  }
}

const styles = StyleSheet.create({
MainContainer: {
  flex: 1,
  backgroundColor: '#0d416f',
},
ImageContainer: {
  height: 60,
  borderRadius: 30,
  overflow: 'hidden',
  marginRight: 10,
},
OnlineStatusIndicator: {
  position: 'absolute',
  bottom: 0,
  right: 0,
  width: 15,
  height: 15,
  borderRadius: 7.5,
  backgroundColor: 'green',
  borderWidth: 2,
  borderColor: 'white',
},
ContactDetailsHolder: {
  flex: 1,
  justifyContent: 'center',
},
CreatorContactName: {
  fontSize: 17,
  fontWeight: 'bold',
  color: 'black',
},
ContactEmailAddress: {
  fontSize: 16,
  color: 'black',
},
ContactAvailabilityStatus: {
  fontSize: 15,
  // color: '#777',
  marginRight: 10,
  // color: 'white',
  color: 'black',
},
Header: {
  backgroundColor: '#F98125',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingVertical: 10,
  paddingHorizontal: 20,
},
HeaderButton: {
  backgroundColor: '#F98125',
  flexDirection: 'row',
},
Heading: {
  color: 'white',
  fontSize: 25,
  fontWeight: 'bold',
},
HeaderNavigateButton: {
  backgroundColor: '#F98125',
  margin: 5,
  borderRadius: 15,
  paddingHorizontal: 10,
  paddingVertical: 5,
  alignItems: 'center',
  justifyContent: 'space-around',
},
ContainerList: {
  padding: 20,
},
ListElement: {
  backgroundColor: '#F98125',
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: 10,
  borderRadius: 5,
  padding: 10,
},
IconContainer: {
  marginRight: 10,
},
ContactDetailsHolder: {
  flex: 1,
},
ItemListHeading: {
  fontSize: 20,
  color: 'white ',
  marginBottom: 5,
},
ItemListText: {
  fontSize: 16,
  color: '#FFFFFF',
},
});