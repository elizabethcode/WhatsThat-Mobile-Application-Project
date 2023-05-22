import React, { Component } from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { MaterialIcons} from '@expo/vector-icons';
export default class AddRemove extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chats: [],
    };
  }

  componentDidMount() {
    this.loadContacts();
  }

  loadContacts = async () => {
    const token = await AsyncStorage.getItem('whatsthat_session_token');
    fetch('http://localhost:3333/api/1.0.0/chat', {
      method: 'GET',
      headers: {
        "X-Authorization": token,
        "Content-Type": "application/json"
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

  displayList = ({ item }) => (
    
    
    <TouchableOpacity
      style={styles.AddItem}
      onPress={() => this.props.navigation.navigate('AddUserChat', { chat_id: item.chat_id })}>
      <Text style={styles.title}>Add the user to chat</Text>
      <Text style={styles.listItemTitle}>{item.chat_id} - {item.name}</Text>
    </TouchableOpacity>
  );

  displayLis = ({ item }) => (
    
    <TouchableOpacity
      style={styles.RemoveItem}
      onPress={() => this.props.navigation.navigate('DelUserChat', { chat_id: item.chat_id })}>
      <Text style={styles.RemoveItemTitle}>Remove the user from chat</Text>
      <Text style={styles.listItemTitle}>{item.chat_id} - {item.name}</Text>
    </TouchableOpacity>
  );
  
  render() {

    return (
      <View style={styles.container}>

        <Text style={styles.title}> Add Or Remove User</Text>
        <FlatList
          style={styles.listContainer}
          data={this.state.chats}
          renderItem={this.displayList}
        />

       <FlatList
          style={styles.listContainer}
          data={this.state.chats}
          renderItem={this.displayLis}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F1F1',
  },
  listContainer: {
    padding: 20,
  },

  title: {
    color: '#AFD3E2',
    backgroundColor: '#146C94',
    padding: 10,
    fontSize: 25,
  },

  RemoveItemTitle: {
    color: '#6b1319',
    backgroundColor: '#d46169',
    padding: 10,
    fontSize: 25,
  },
  RemoveItemText: {
    color: '#1f0103',
    backgroundColor: '#d46169',
    padding: 10,
    fontSize: 25,
  },

  AddItem: {
    backgroundColor: '#AFD3E2',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
    borderRadius: 5,
  },
  RemoveItem: {
    backgroundColor: '#d46169',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
    borderRadius: 5,
  },

  listItemText: {
    fontSize: 18,
    color: '#4A641E',
  },
  listItemTitle: {
    fontSize: 30,
    color: '#00000',
  },
  Icon: {
    alignSelf: 'flex-end',
  },
});