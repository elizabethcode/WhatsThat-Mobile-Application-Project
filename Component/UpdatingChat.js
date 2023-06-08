//UpdatingChat
import React, { Component } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, FlatList } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { globalStyles } from '../globalStyles';

export default class UpdatingChat extends Component {
  constructor(props) {
    super(props);

    // Initialize the component's state
    this.state = {
      name: "",
      error: "",
      submitted: false,
    };

    // Bind the event handler to the component instance
    this.OnPressButton = this.OnPressButton.bind(this);
  }

  // Fetch the chat details from the server on component mount
  async componentDidMount() {
    try {
      // Retrieve the user token from AsyncStorage
      const token = await AsyncStorage.getItem("app_session_token");

      // Set the request headers
      const headers = {
        "Content-Type": "application/json",
        "X-Authorization": token,
      };

      // Extract the chat ID from the navigation params
      const { chat_id } = this.props.route.params;

      // Make a GET request to fetch the chat details
      const response = await fetch(
        `http://localhost:3333/api/1.0.0/chat/${chat_id}`,
        {
          headers,
        }
      );

      // Parse the response JSON
      const responseJson = await response.json();

      // Reverse the order of messages and update the component state
      this.setState({ messages: responseJson.messages.reverse() });
    } catch (error) {
      console.log(error);
    }
  }

  // Event handler for the Button press
  OnPressButton = async () => {
    this.setState({ submitted: true });
    this.setState({ error: "" });

    if (!this.state.name) {
      this.setState({ error: "*Must enter a chat name " });
      return;
    }

    // Log the changed chat name to the console
    console.log("Chat Name: " + this.state.name + " . Changed! ");

    try {
      // Retrieve the user token from AsyncStorage
      const token = await AsyncStorage.getItem("app_session_token");

      // Set the request headers
      const headers = {
        "Content-Type": "application/json",
        "X-Authorization": token,
      };

      // Extract the chat ID from the navigation params
      const { chat_id } = this.props.route.params;

      // Make a PATCH request to update the chat name
      const response = await fetch(
        `http://localhost:3333/api/1.0.0/chat/${chat_id}`,
        {
          method: "PATCH",
          headers,
          body: JSON.stringify({
            name: this.state.name,
          }),
        }
      );

      // Parse the response JSON
      const responseJson = await response.json();

      console.log("Chat name changed: ", responseJson.token);
    } catch (error) {
      console.log(error);
      this.props.navigation.navigate("ViewingChats");
    }
  };

  render() {
    const { chat_id } = this.props.route.params;
    return (
      <View style={styles.MainContainer}>

        <View style={styles.Header}>
          <Text style={styles.HeaderText}>Change Chat Name: {chat_id}</Text>
        </View>
        <View style={styles.FormContainer}>
          <View style={styles.OuterInput}>
            <Text style={styles.FormHeading}>Chat Name:</Text>
            <TextInput style={styles.Input}
              placeholder=" Enter chat name"
              onChangeText={(name) => this.setState({ name })}
              defaultValue={this.state.name}
            />

            <>
              {this.state.submitted && !this.state.name && (
                <Text style={styles.error}>*Chat Name is Required</Text>
              )}
            </>
          </View>

          <TouchableOpacity onPress={() => this.OnPressButton()}>
            <View style={styles.Button}>
              <Text style={styles.TextButton}>Update Chat Name</Text>
            </View>
          </TouchableOpacity>
          <>
            {this.state.error && (
              <Text style={styles.error}>{this.state.error}</Text>
            )}
          </>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    backgroundColor: "#193A6F",
  },
  FormContainer: {
    padding: 20,
  },
  Header: {
    marginBottom: 20,
    backgroundColor: "#F98125",
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  HeaderText: {
    padding: 10,
    fontSize: 25,
    color: "#FFFFFF",
    textAlign: "center",
    fontWeight: "bold",
  },
  FormHeading: {
    paddingBottom: 20,
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16,
  },
  OuterInput: {
    paddingBottom: 20,
    paddingVertical: 20,

  },
  Input: {
    fontSize: 18,
    paddingVertical: 10,
    backgroundColor: "white",
    borderRadius: 50,
    padding:20,
    borderWidth: 1,
    height: 40,

  },
  Button: {
    alignItems: "center",
    paddingHorizontal: 10,
    borderRadius: 5,
    borderRadius: 50,
    backgroundColor: "#F98125",
    paddingVertical: 10,
  },
  TextButton: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#FFF",
  },
  error: {
    color: "red",
  },
});