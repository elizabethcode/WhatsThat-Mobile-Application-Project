//UpdateChat - edited at uni
import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
// import { globalStyles } from '../../globalStyles';

export default class UpdateChat extends Component {
  constructor(props) {
    super(props);

    // Initialize the component's state
    this.state = {
      name: "",
      ErrorMessage: "",
      submitted: false,
    };

    // Bind the event handler to the component instance
    this._onPressButton = this._onPressButton.bind(this);
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
    } catch (ErrorMessage) {
      console.log(ErrorMessage);
    }
  }

  // Event handler for the Button press
  _onPressButton = async () => {
    this.setState({ submitted: true });
    this.setState({ ErrorMessage: "" });

    if (!this.state.name) {
      this.setState({ ErrorMessage: "*Must enter a chat name " });
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
    } catch (ErrorMessage) {
      console.log(ErrorMessage);
      this.props.navigation.navigate("ViewChats");
    }
  };

  render() {
    const { chat_id } = this.props.route.params;
    return (
      <View style={styles.MainContainer}>
        <Text style={styles.Heading}>Change Chat Name: {chat_id}</Text>
        <View style={styles.FormContainer}>
          <View style={styles.OuterInput}>
            <Text style={styles.FormHeading}>Chat Name:</Text>
            <TextInput
              style={{ height: 40, borderWidth: 1, paddingVertical: 10 }}
              placeholder=" Enter chat name"
              onChangeText={(name) => this.setState({ name })}
              defaultValue={this.state.name}
            />

            <>
              {this.state.submitted && !this.state.name && (
                <Text style={styles.ErrorMessage}>*Chat Name is Required</Text>
              )}
            </>
          </View>

          <View style={styles.loginbtn}>
            <TouchableOpacity onPress={() => this._onPressButton()}>
              <View style={styles.Button}>
                <Text style={styles.TextButton}>Change Chat Name</Text>
              </View>
            </TouchableOpacity>
          </View>

          <>
            {this.state.ErrorMessage && (
              <Text style={styles.ErrorMessage}>{this.state.ErrorMessage}</Text>
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
    backgroundColor: "#F6F1F1",
  },
  FormContainer: {
    padding: 20,
  },

  Heading: {
    color: "#AFD3E2",
    backgroundColor: "#146C94",
    padding: 10,
    fontSize: 25,
  },
  FormHeading: {
    fontSize: 15,
    color: "#000000",
  },
  OuterInput: {
    paddingVertical: 10,
  },
  Button: {
    backgroundColor: "#146C94",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  TextButton: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#000000",
  },
  ErrorMessage: {
    color: "red",
  },
});