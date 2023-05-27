// Import necessary modules and components
import React, { Component } from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet, FlatList, TextInput, KeyboardAvoidingView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

export default class ChatApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chats: [],
      chatName: '',
      newChatName: '',
      usersToAdd: '',
      messageText: '',
    };
  }

  componentDidMount() {
    this.unsubscribe = this.props.navigation.addListener('focus', () => {
      this.loadChats();
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  loadChats = async () => {
    const token = await AsyncStorage.getItem('@whatsThat_session_token');
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
      });
  };

  createChat = async () => {
    const token = await AsyncStorage.getItem('@whatsThat_session_token');
    fetch('http://localhost:3333/api/1.0.0/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': token,
      },
      body: JSON.stringify({
        name: this.state.chatName,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        this.loadChats();
        this.setState({ chatName: '' });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  addUserToChat = async (chatId) => {
    const token = await AsyncStorage.getItem('@whatsThat_session_token');
    fetch(`http://localhost:3333/api/1.0.0/chat/${chatId}/user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': token,
      },
      body: JSON.stringify({
        user_email: this.state.usersToAdd,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        this.loadChats();
        this.setState({ usersToAdd: '' });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  deleteChat = async (chatId) => {
    const token = await AsyncStorage.getItem('@whatsThat_session_token');
    fetch(`http://localhost:3333/api/1.0.0/chat/${chatId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': token,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          this.loadChats();
        } else {
          Alert.alert('Error', 'Failed to delete the chat.');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  updateChat = async (chatId) => {
    const token = await AsyncStorage.getItem('@whatsThat_session_token');
    fetch(`http://localhost:3333/api/1.0.0/chat/${chatId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': token,
      },
      body: JSON.stringify({
        name: this.state.newChatName,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        this.loadChats();
        this.setState({ newChatName: '' });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  sendMessage = async (chatId) => {
    const token = await AsyncStorage.getItem('@whatsThat_session_token');
    fetch(`http://localhost:3333/api/1.0.0/chat/${chatId}/message`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': token,
      },
      body: JSON.stringify({
        message: this.state.messageText,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        this.loadChats();
        this.setState({ messageText: '' });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  renderChatItem = ({ item }) => {
    const timestamp = new Date(item.last_message.timestamp).toLocaleString();
    return (
      <TouchableOpacity
        style={styles.listItem}
        onPress={() => this.props.navigation.navigate('UpdateChat', { chat_id: item.chat_id })}>
        <TouchableOpacity style={styles.contactStatus}>
          <Ionicons name="mail-open" size={60} color="black" />
        </TouchableOpacity>
        <View style={styles.contactInfoContainer}>
          <Text style={styles.listItemTitle}>{item.name}</Text>
          <Text style={styles.contactName}>Creator: {item.creator.first_name} {item.creator.last_name}</Text>
          <Text style={styles.contactEmail}>{item.last_message.message} : {timestamp}</Text>
          <TouchableOpacity style={styles.contactStatus}>
            <Ionicons name="ellipse" size={24} color="green" />
          </TouchableOpacity>
          <Text style={styles.contactStatus}>active</Text>
          <TouchableOpacity onPress={() => this.addUserToChat(item.chat_id)} style={styles.contactStatus}>
            <Ionicons name="person-add" size={24} color="green" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.contactStatus}>
            <Ionicons name="person-remove" size={24} color="red" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => this.deleteChat(item.chat_id)} style={styles.deleteButton}>
          <Ionicons name="trash" size={24} color="white" />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <View style={styles.header}>
          <Text style={styles.title}>Click Chat To Change</Text>
        </View>

        <TouchableOpacity style={styles.addButton} onPress={() => this.props.navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="white" />
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          placeholder="Enter chat name"
          value={this.state.chatName}
          onChangeText={(text) => this.setState({ chatName: text })}
        />

        <Button title="Create Chat" onPress={this.createChat} />

        <FlatList
          style={styles.listContainer}
          data={this.state.chats}
          renderItem={this.renderChatItem}
        />

        <TextInput
          style={styles.input}
          placeholder="Enter user email to add"
          value={this.state.usersToAdd}
          onChangeText={(text) => this.setState({ usersToAdd: text })}
        />

        <TextInput
          style={styles.input}
          placeholder="Enter new chat name"
          value={this.state.newChatName}
          onChangeText={(text) => this.setState({ newChatName: text })}
        />

        <Button title="Update Chat" onPress={() => this.updateChat(chatId)} />

        <TextInput
          style={styles.input}
          placeholder="Enter message"
          value={this.state.messageText}
          onChangeText={(text) => this.setState({ messageText: text })}
        />

        <Button title="Send Message" onPress={() => this.sendMessage(chatId)} />
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F1F1',
  },
  header: {
    backgroundColor: '#146C94',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  title: {
    color: '#AFD3E2',
    fontSize: 25,
  },
  addButton: {
    backgroundColor: '#AFD3E2',
    margin: 5,
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  input: {
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  listContainer: {
    padding: 20,
  },
  listItem: {
    backgroundColor: '#19A7CE',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    borderRadius: 5,
    padding: 10,
  },
  contactStatus: {
    fontSize: 15,
    color: '#777',
    marginRight: 10,
  },
  contactInfoContainer: {
    flex: 1,
  },
  listItemTitle: {
    fontSize: 20,
    color: '#000000',
    marginBottom: 5,
  },
  contactName: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  contactEmail: {
    fontSize: 16,
    fontStyle: 'italic',
  },
  deleteButton: {
    backgroundColor: 'red',
    borderRadius: 15,
    padding: 5,
    marginLeft: 10,
  },
});
