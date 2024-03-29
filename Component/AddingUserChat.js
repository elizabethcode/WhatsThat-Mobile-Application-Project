//AddingUserChat
import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { globalStyles } from '../globalStyles';

export default class AddingUserChat extends Component {
  constructor(props) {
    super(props);

    // Initialize state variables
    this.state = {
      error: '',
      user_id: '',      
      submitted: false,
    };

    this.OnPressButton = this.OnPressButton.bind(this);
  }

  async componentDidMount() {
    try {
      // Get token from AsyncStorage
      const token = await AsyncStorage.getItem('app_session_token');

      // Set request headers
      const headers = {
        'Content-Type': 'application/json',
        'X-Authorization': token,
      };

      // Get chat_id from navigation params
      const { chat_id } = this.props.route.params;

      // Make a GET request to retrieve chat messages
      const response = await fetch(`http://localhost:3333/api/1.0.0/chat/${chat_id}`, {
        headers,
      });

      // Parse the response as JSON
      const responseJson = await response.json();

      // Reverse the order of messages and update state
      this.setState({ messages: responseJson.messages.reverse() });
    } catch (error) {
      console.log(error);
    }
  }

  OnPressButton = async () => {
    // Set submitted flag to true and clear error message
    this.setState({ submitted: true });
    this.setState({ error: '' });

    // Check if user_id is empty
    if (!this.state.user_id) {
      this.setState({ error: '*User ID field Required' });
      return;
    }

    try {
      // Get token from AsyncStorage
      const token = await AsyncStorage.getItem('app_session_token');

      // Set request headers
      const headers = {
        'Content-Type': 'application/json',
        'X-Authorization': token,
      };

      // Get chat_id from navigation params
      const { chat_id } = this.props.route.params;

      // Make a POST request to add user to the chat
      const response = await fetch(`http://localhost:3333/api/1.0.0/chat/${chat_id}` + '/user/' + this.state.user_id, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          user_id: this.state.user_id,
        }),
      });

      const responseJson = await response.json();

      console.log('User Added: ', responseJson.token);
    } catch (error) {
      console.log(error);
      // Navigate to the ViewingChats screen if an error occurs
      this.props.navigation.navigate('ViewingChats');
    }
  };

  render() {
    // Get chat_id from navigation params
    const { chat_id } = this.props.route.params;
    return (
      <View style={styles.MainContainer}>       
        <View style={globalStyles.Header}>
          <Text style={globalStyles.HeaderText}>Adding Contact to the Chat: {chat_id}</Text>
        </View>
        <View style={styles.FormContainer}>
          <View style={styles.UserInputContainer}>
            <Text style={styles.FormHeading}>User ID:</Text>
            <TextInput
              style={styles.UserInput}
              placeholder="Enter user_id"
              onChangeText={(user_id) => this.setState({ user_id })}
              defaultValue={this.state.user_id}
            />

            {this.state.submitted && !this.state.user_id && <Text style={styles.ErrorMessage}>* Must Enter User ID</Text>}
          </View>

          <View style={styles.loginbtn}>
            <TouchableOpacity onPress={() => this.OnPressButton()}>
              <View style={styles.Button}>
                <Text style={styles.ButtonText}>Add Contact</Text>
              </View>
            </TouchableOpacity>
          </View>

          {this.state.error && <Text style={styles.ErrorMessage}>{this.state.error}</Text>}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    backgroundColor: '#0d416f',
  },
  FormContainer: {
    padding: 20,
  },
  FormHeading: {    
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight:"bold",
    paddingBottom:20,
  },
  UserInputContainer: {
    paddingVertical: 10,
  },
  UserInput: {
    height: 40,
    borderWidth: 1,
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 50,
    paddingHorizontal: 10,
  },
  Button: {
    backgroundColor: "#F98125",
    paddingHorizontal: 10,    
    borderRadius: 50,
    paddingVertical: 10,
    alignItems: "center",
  },
  ButtonText: {
    fontSize: 15,    
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  ErrorMessage: {
    color: 'red',
    marginTop: 5,
  },
});