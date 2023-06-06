//ViewingList
import React, { Component } from 'react';
import { View, TouchableOpacity, Text,StyleSheet, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
// import { globalStyles } from '../globalStyles';

export default class ViewingList extends Component {
  constructor(props) {
    super(props);

    // Initialize the component's state
    this.state = {
      chats: [],
    };
  }

  // Load the chats when the component mounts
  componentDidMount() {
    this.unsubscribe = this.props.navigation.addListener('focus', () => {
      this.LoadingContacts();
    });
  }

  // Fetch the list of chats from the server
  LoadingContacts = async () => {
    const SessionToken = await AsyncStorage.getItem('app_session_token');

    // Make a GET request to fetch the chats
    fetch('http://localhost:3333/api/1.0.0/chat', {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': SessionToken,
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        this.setState({ chats: responseJson });
      })
      .catch((error) => {
        console.log(error);

      });
  };

  // Render each chat item
  DisplayAddedUserList = ({ item }) => {
    const timestamp = new Date(item.last_message.timestamp).toLocaleString();
    return (
      <TouchableOpacity
        style={styles.ListElement}
        onPress={() => this.props.navigation.navigate('UpdatingChat', { chat_id: item.chat_id })}>

        <TouchableOpacity
          style={styles.ContactAvailability}>
          <Ionicons name="mail-open" size={100} color="black" />
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
          <View style={styles.IconsContainer}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('AddingUserChat', { chat_id: item.chat_id })}
              style={styles.ContactAvailability}>
              <Ionicons name="person-add" size={24} color="green" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.ContactAvailability1}>
              <Ionicons name="person-remove" size={24} color="red" />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  render() {

    return (
      <View style={styles.MainContainer}>
        <View style={styles.Header}>
          <Text style={styles.HeaderText}>Selecte Chat To Update</Text>
          <TouchableOpacity style={styles.HeaderNavigateButton} onPress={() => this.props.navigation.goBack()}>
            <Ionicons name="chevron-back" size={24} color="white" />
          </TouchableOpacity>
        </View>



        <FlatList
          style={styles.ContainerList}
          data={this.state.chats}
          renderItem={this.DisplayAddedUserList}
        />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    backgroundColor: '#193A6F',
  },
  Header: {
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    alignItems: 'center',
    backgroundColor: '#F98125',
    paddingHorizontal: 15,
  },
  HeaderText: {
    fontWeight: "bold",
    fontSize: 25,
    textAlign: "center",
    padding: 10,
    color: "#FFFFFF",
  },
  ContainerList: {
    padding: 20,
  },
  ImageContainer: {
    marginRight: 10,
    height: 60,
    overflow: 'hidden',
    borderRadius: 30,
  },
  OnlineStatusIndicator: {
    backgroundColor: 'green',
    position: 'absolute',
    width: 15,
    height: 15,
    borderWidth: 2,
    borderRadius: 7.5,
    borderColor: 'white',
  },
  ContactDetailsHolder: {
    flex: 1,
    justifyContent: 'center',
  },
  CreatorContactName: {
    fontWeight: 'bold',
    fontSize: 17,
  },
  ContactEmailAddress: {
    fontStyle: 'italic',
    fontSize: 16,
  },
  ContactAvailability: {
    fontSize: 15,
    marginRight: 10,
    color: '#777',
  },
  ContactAvailability1:{
    marginRight: 10,
    fontSize: 15,
    marginLeft: 40,
    color: '#777',
  },
  HeaderButton: {
    flexDirection: 'row',
    backgroundColor: '#146C94',
  },
  Heading: {
    fontSize: 25,
    color: '#AFD3E2',
  },
  HeaderNavigateButton: {
    backgroundColor: '#193A6F',
    height: 45,
    borderRadius: 50,
    justifyContent: 'center',
    width: 45,
    alignItems: 'center',

  },
  ContainerList: {
    padding: 20,
  },
  ListElement: {
    backgroundColor: '#F98125',
    padding: 10,
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'center',
    borderRadius: 5,

  },
  IconContainer: {
    marginRight: 10,
  },
  ContactDetailsHolder: {
    flex: 1,
  },
  ItemListHeading: {
    color: '#000000',
    fontSize: 20,
    marginBottom: 5,
  },
  ItemListText: {
    fontSize: 16,
    color: '#4A641E',
  },
  IconsContainer: {
    alignItems: 'center',
    marginRight: 10,
    flexDirection: 'row',

  },
});

