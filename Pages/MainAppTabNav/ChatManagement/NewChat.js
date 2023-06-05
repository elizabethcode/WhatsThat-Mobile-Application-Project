//NewChat - edited at uni
import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { globalStyles } from '../../globalStyles';

export default class NewChat extends Component {
  constructor(props) {
    super(props);

    // Initialize state variables
    this.state = {
      name: "",
      ErrorMessage: "",
      submitted: false
    }

    this._onPressButton = this._onPressButton.bind(this)
  }

  _onPressButton = async () => {
    // Set submitted flag to true and clear ErrorMessage message
    this.setState({ submitted: true });
    this.setState({ ErrorMessage: "" });

    // Check if chat name is empty
    if (!this.state.name) {
      this.setState({ ErrorMessage: "*Must enter a chat name & ID " });
      return;
    }

    console.log("Chat Name: " + this.state.name + " . Created! ");

    try {
      const token = await AsyncStorage.getItem('app_session_token');

      const headers = {
        'Content-Type': 'application/json',
        'X-Authorization': token,
      };

      // Send a POST request to create a new chat
      const response = await fetch('http://localhost:3333/api/1.0.0/chat', {
        method: "POST",
        headers,
        body: JSON.stringify({
          "name": this.state.name,
        }),
      });

      const responseJson = await response.json();

      console.log("Chat Created: ", responseJson.token);
      this.props.navigation.navigate("ViewChats");
    } catch (ErrorMessage) {
      console.log(ErrorMessage);
    }
  }

  render() {
    return (
        <View style={styles.Outtercontainer}>
        <View style={styles.Header}>
          <Text style={styles.HeaderText}>Create Chats</Text>
        </View>
      <View style={styles.MainContainer}>
       
        <View style={styles.FormContainer}>
          <View style={styles.email}>
            <Text style={styles.FormHeading}>Chat Name:</Text>
            <TextInput
              style={styles.Input}
              placeholder="Enter chat name"
              onChangeText={name => this.setState({ name })}
              defaultValue={this.state.name}
            />
            {this.state.submitted && !this.state.name &&
              <Text style={styles.ErrorMessage}>*Chat name is required</Text>
            }
          </View>
          <TouchableOpacity onPress={() => this._onPressButton()}>
            <View style={styles.Button}>
              <Text style={styles.TextButton}>Create Chat</Text>
            </View>
          </TouchableOpacity>
          {this.state.ErrorMessage &&
            <Text style={styles.ErrorMessage}>{this.state.ErrorMessage}</Text>
          }

        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('ViewChats')}
        >
          <View style={styles.Button}>
            <Text style={styles.TextButton}>Go to View Chats</Text>
          </View>
        </TouchableOpacity>
        </View>
      </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#193A6F",
    width:"100%",
    height:"100%",
  },
  Outtercontainer:{
    width:"100%",
    height:"100%",
    backgroundColor: "#193A6F",
  },
  Header: {
    backgroundColor: "#F98125",
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  HeaderText: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
  },
  FormContainer: {
    marginBottom: 20,
    width:"70%",
    height:"82%",
  },
  FormHeading: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  MessageInput: {
    height: 50,
    borderWidth: 1,
    backgroundColor: "white",
    width: "100%",
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 50,
  },
  Input: {
  height: 50,
  borderWidth: 1,
  backgroundColor: "white",
  width: "100%",
  marginBottom: 10,
  paddingHorizontal: 10,
  borderRadius: 50,
},
  Button: {
    width: "100%",
    backgroundColor: "#F98125",
    borderRadius: 25,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  TextButton: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  ErrorMessage: {
    color: "red",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 5,
  },
});
