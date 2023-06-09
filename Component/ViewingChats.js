//ViewingChats
import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons, Entypo, MaterialIcons } from '@expo/vector-icons';

export default class ViewingChats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chats: [],
    };
  }

  componentDidMount() {
    this.unsubscribe = this.props.navigation.addListener('focus', () => {
      this.LoadingContacts();
    });
  }

  LoadingContacts = async () => {
    const token = await AsyncStorage.getItem('app_session_token');
    fetch('http://localhost:3333/api/1.0.0/chat', {
      method: 'GET',
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
      .catch((error) => {
        console.log(error);
        this.props.navigation.navigate('SendingMessage');
      });
  };

  DeletingChat = async (chatId) => {
    const token = await AsyncStorage.getItem('app_session_token');
    fetch(`http://localhost:3333/api/1.0.0/chat/${chatId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': token,
      },
    })
      .then((response) => {
        if (response.status === 204) {
          this.LoadingContacts();
        } else {
          console.log('Failed to delete the chat');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  DisplayAddedUserList = ({ item }) => {
    const timestamp = new Date(item.last_message.timestamp).toLocaleString();
    return (
      <TouchableOpacity
        style={styles.ListElement}
        onPress={() => this.props.navigation.navigate('SendingMessage', { chat_id: item.chat_id })}
      >
        <TouchableOpacity style={styles.ContactAvailabilityStatus}>
          <Entypo name="message" size={100} color="black" />
        </TouchableOpacity>
        <View style={styles.ContactDetailsHolder}>
          <Text style={styles.ItemListHeading}>{item.name}</Text>
          <Text style={styles.CreatorContactName}>Creator: {item.creator.first_name} {item.creator.last_name}</Text>
          <Text style={styles.ContactEmailAddress}>{item.last_message.message} : {timestamp}</Text>
          <TouchableOpacity style={styles.ContactAvailabilityStatus}>
            <Ionicons name="ellipse" size={24} color="green" />
          </TouchableOpacity>
          <Text style={styles.ContactAvailabilityStatus}>Available</Text>
        </View>
        <TouchableOpacity
          style={styles.DeleteButton}
          onPress={() => this.DeletingChat(item.chat_id)}
        >
          <MaterialIcons name="delete" size={40} color="Black" />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <View style={styles.MainContainer}>
        <View style={styles.Header}>
          <Text style={styles.Heading}>Chats Page</Text>
          <View style={styles.HeaderButton}>
            <TouchableOpacity style={styles.HeaderNavigateButton} onPress={() => this.props.navigation.navigate('CreateNewChat')}>
              <Ionicons name="chatbubble-ellipses-outline" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.HeaderNavigateButton} onPress={() => this.props.navigation.navigate('ViewingList')}>
              <Ionicons name="list-outline" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.HeaderNavigateButton} onPress={() => this.props.navigation.navigate('AddOrRemoveUserChats')}>
              <Ionicons name="people-outline" size={24} color="white" />
            </TouchableOpacity>
          </View>
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
    backgroundColor: '#0d416f',
  },
  ContactDetailsHolder: {
    flex: 1,
    justifyContent: 'center',
  },
  CreatorContactName: {
    fontWeight: 'bold',
    fontSize: 17,
    color: 'black',
  },
  ContactEmailAddress: {
    fontSize: 16,
    color: 'black',
  },
  ContactAvailabilityStatus: {
    fontSize: 15,
    color: 'black',
    marginRight: 10,
  },
  Header: {
    justifyContent: 'space-between',
    backgroundColor: '#F98125',
    alignItems: 'center',
    paddingVertical: 10,
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  HeaderButton: {
    flexDirection: 'row',
    backgroundColor: '#F98125',
  },
  Heading: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 25,
  },
  HeaderNavigateButton: {
    justifyContent: 'space-around',
    borderRadius: 15,
    margin: 5,
    paddingVertical: 5,
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor: '#F98125',
  },
  ContainerList: {
    padding: 20,
  },
  ListElement: {
    marginBottom: 10,
    backgroundColor: '#F98125',
    borderRadius: 5,
    alignItems: 'center',
    padding: 10,
    flexDirection: 'row',
  },
  DeleteButton: {
    top: 10,
    position: 'absolute',
    right: 10,
  },
  ItemListHeading: {
    marginBottom: 5,
    color: 'white',
    fontSize: 20,
  },
});

