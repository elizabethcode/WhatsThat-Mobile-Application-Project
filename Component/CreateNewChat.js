//CreateNewChat
import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { globalStyles } from '../globalStyles';

export default class CreateNewChat extends Component {
  constructor(props) {
    super(props);

    // Initialize state variables
    this.state = {
      name: "",
      error: "",
      submitted: false
    }

    this.OnPressButton = this.OnPressButton.bind(this)
  }

  OnPressButton = async () => {
    // Set submitted flag to true and clear error message
    this.setState({ submitted: true });
    this.setState({ error: "" });

    // Check if chat name is empty
    if (!this.state.name) {
      this.setState({ error: "*Must enter a chat name & ID " });
      return;
    }

    console.log("Chat Name: " + this.state.name + " has been successfully created! ");

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
      this.props.navigation.navigate("ViewingChats");
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
        <View style={styles.Outercontainer}>
        <View style={globalStyles.Header}>
          <Text style={globalStyles.HeaderText}>Create a New Chat</Text>
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
          <TouchableOpacity onPress={() => this.OnPressButton()}>
            <View style={styles.Button}>
              <Text style={globalStyles.ButtonText}>Create Chat</Text>
            </View>
          </TouchableOpacity>
          {this.state.error &&
            <Text style={styles.ErrorMessage}>{this.state.error}</Text>
          }

        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('ViewingChats')}
        >
          <View style={styles.Button}>
            <Text style={globalStyles.ButtonText}>Go to View Chats</Text>
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
    justifyContent: "center",
    width:"100%",
    alignItems: "center",
    height:"100%",
    backgroundColor: "#193A6F",
  },
  Outercontainer:{
    backgroundColor: "#193A6F",
    width:"100%",
    height:"100%",
  },
  FormContainer: {
    width:"70%",
    marginBottom: 20,
    height:"82%",
  },
  FormHeading: {
    fontWeight: "bold",
    color: "white",
    marginBottom: 5,
    fontSize: 16,
  },
  MessageInput: {
    paddingHorizontal: 10,
    backgroundColor: "white",
    width: "100%",
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 50,
    height: 50,
  },
  Input:{
    marginBottom: 10,
    borderWidth:1,
    width:"100%",
    height:50,
    paddingHorizontal: 10,
    backgroundColor:"white",
    borderRadius:50,
  },
  Button: {
    width: "100%",
    justifyContent: "center",
    backgroundColor: "#F98125",
    height: 50,
    alignItems: "center",
    borderRadius: 25,
    marginTop: 10,
  },
  ErrorMessage: {
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 5,
    color: "red",
  },
});