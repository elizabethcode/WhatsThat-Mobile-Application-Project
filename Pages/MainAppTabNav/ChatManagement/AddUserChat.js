//AddUserChat - edited at uni
import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';

export default class AddUserChat extends Component {
  constructor(props) {
    super(props);

    // Initialize state variables
    this.state = {
      user_id: '',
      ErrorMessage: '',
      submitted: false,
    };

    this._onPressButton = this._onPressButton.bind(this);
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
    } catch (ErrorMessage) {
      console.log(ErrorMessage);
    }
  }

  _onPressButton = async () => {
    // Set submitted flag to true and clear error message
    this.setState({ submitted: true });
    this.setState({ ErrorMessage: '' });

    // Check if user_id is empty
    if (!this.state.user_id) {
      this.setState({ ErrorMessage: '*User ID field Required' });
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
    } catch (ErrorMessage) {
      console.log(ErrorMessage);
      // Navigate to the ViewChats screen if an error occurs
      this.props.navigation.navigate('ViewChats');
    }
  };

  render() {
    // Get chat_id from navigation params
    const { chat_id } = this.props.route.params;
    return (
      <View style={styles.MainContainer}>       
        <View style={styles.Header}>
          <Text style={styles.HeaderText}>Add Contact To The Chat: {chat_id}</Text>
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

            {this.state.submitted && !this.state.user_id && <Text style={styles.ErrorMessage}>*User ID is required</Text>}
          </View>

          <View style={styles.loginbtn}>
            <TouchableOpacity onPress={() => this._onPressButton()}>
              <View style={styles.Button}>
                <Text style={styles.TextButton}>Add Contact</Text>
              </View>
            </TouchableOpacity>
          </View>

          {this.state.ErrorMessage && <Text style={styles.ErrorMessage}>{this.state.ErrorMessage}</Text>}
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
  Header: {
    backgroundColor: "#F98125",
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  HeaderText: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom:10,
    marginTop: 10,
   
  },
  FormContainer: {
    padding: 20,
  },
  FormHeading: {
    fontSize: 15,
    color: "#FFFFFF",
    paddingBottom:20,
    fontWeight:"bold",
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
    paddingVertical: 10,
    borderRadius: 50,
    alignItems: "center",
  },
  TextButton: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  ErrorMessage: {
    color: 'red',
    marginTop: 5,
  },
});