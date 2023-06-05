//ViewList - edited at uni
import React, { Component } from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons} from '@expo/vector-icons';
// import { globalStyles } from '../../globalStyles';

export default class ViewList extends Component {
  constructor(props) {
    super(props);

    // Initialize the component's state
    this.state = {
      chats: [],
    };
  }

  // Load the chats when the component mounts
  componentDidMount(){
    this.unsubscribe = this.props.navigation.addListener('focus', () => {
      this.loadContacts();  
    });
  }

  // Fetch the list of chats from the server
  loadContacts = async () => {
    const token = await AsyncStorage.getItem('app_session_token');
    
    // Make a GET request to fetch the chats
    fetch('http://localhost:3333/api/1.0.0/chat', {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': token,
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        this.setState({ chats: responseJson });
      })
      .catch((ErrorMessage) => {
        console.log(ErrorMessage);
       
      });
  };
 
   // Render each chat item
  displayList = ({ item }) => {
    const timestamp = new Date(item.last_message.timestamp).toLocaleString();
    return (
    <TouchableOpacity
      style={styles.ListElement}
      onPress={() => this.props.navigation.navigate('UpdateChat', { chat_id: item.chat_id })}> 
     
      <TouchableOpacity
            style={styles.ContactAvailability}>
            <Ionicons name="mail-open" size={60} color="black" />
          </TouchableOpacity>
      <View style={styles.ContactDetailsHolder}>

      <Text style={styles.ItemListHeading}>{item.name}</Text>
        <Text style={styles.CreatorContactName}>Creator: {item.creator.first_name} {item.creator.last_name}</Text>
        <Text style={styles.ContactEmailAddress}>{item.last_message.message} : {timestamp}</Text>
        <TouchableOpacity
            style={styles.ContactAvailability}>
            <Ionicons name="ellipse" size={24} color="green" />
          </TouchableOpacity>
          <Text style={styles.ContactAvailability}>active</Text>
   
          <TouchableOpacity onPress={() => this.props.navigation.navigate('AddUserChat', { chat_id: item.chat_id })}
            style={styles.ContactAvailability}>
            <Ionicons name="person-add" size={24} color="green" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.ContactAvailability}>
            <Ionicons name="person-remove" size={24} color="red" />
          </TouchableOpacity>
   
      </View>
    </TouchableOpacity>
);
};
 
  render() {

    return (
      <View style={styles.MainContainer}>
         <View style={styles.Header}>
        <Text style={styles.Heading}>Click Chat To Change</Text>
        </View>

        <TouchableOpacity style={styles.HeaderNavigateButton} onPress={() => this.props.navigation.goBack()}>
                <Ionicons name="chevron-back" size={24} color="white"/>
                </TouchableOpacity>

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
    backgroundColor: '#F6F1F1',
  },
  ContainerList: {
    padding: 20,
  },
 MainContainer: {
    flex: 1,
    backgroundColor: '#F6F1F1',
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
  },
  ContactEmailAddress: {
    fontSize: 16,
    fontStyle:'italic'
  },
  ContactAvailability: {
    fontSize: 15,
    color: '#777',
    marginRight: 10,
 
  },
  Header: {
    backgroundColor: '#146C94',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },

  HeaderButton: {
    backgroundColor: '#146C94',
    flexDirection: 'row',
  },
  Heading: {
    color: '#AFD3E2',
    fontSize: 25,
  },
  HeaderNavigateButton: {
    backgroundColor: '#AFD3E2',
    margin:5,
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  ContainerList: {
    padding: 20,
  },
  ListElement: {
    backgroundColor: '#19A7CE',
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
    color: '#000000',
    marginBottom: 5,
  },
  ItemListText: {
    fontSize: 16,
    color: '#4A641E',
  },
});
