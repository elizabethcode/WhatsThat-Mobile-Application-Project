//DeletingUserChat
import React, { Component } from "react";
import { TextInput, View, TouchableOpacity, Text, StyleSheet} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { globalStyles } from '../globalStyles';

export default class DeletingUserChat extends Component {
  constructor(props) {
    super(props);

    // Initialize state variables
    this.state = {
      user_id: "",
      error: "",
      submitted: false,
    };

    this.OnPressButton = this.OnPressButton.bind(this);
  }

  OnPressButton = async () => {
    // Set submitted flag to true and clear error message
    this.setState({ submitted: true });
    this.setState({ error: "" });

    // Check if user_id is empty
    if (!this.state.user_id) {
      this.setState({ error: "* Must Enter User ID Field" });
      return;
    }

    console.log("Contact: " + this.state.user_id + " deleted ");

    try {
      // Get token from AsyncStorage
      const token = await AsyncStorage.getItem("app_session_token");

      // Set request headers
      const headers = {
        "Content-Type": "application/json",
        "X-Authorization": token,
      };

      // Make a DELETE request to delete a contact
      const response = await fetch(
        "http://localhost:3333/api/1.0.0/user/" + this.state.user_id + "/contact",
        {
          method: "DELETE",
          headers,
          body: JSON.stringify({
            user_id: this.state.user_id,
          }),
        }
      );

      // Parse the response as JSON
      const responseJson = await response.json();

      console.log("User deleted: ", responseJson.token);
    } catch (error) {
      console.log(error);
      // Navigate to the ChatsNavigator screen if an error occurs
      this.props.navigation.navigate("ChatsNavigator");
    }
  };

  render() {
    return (
      <View style={styles.MainContainer}>
        <View style={globalStyles.Header}>
          <Text style={globalStyles.HeaderText}>Delete Contact</Text>
        </View>
        <View style={styles.FormContainer}>
          <View style={styles.UserInputContainer}>
            <Text style={styles.FormHeading}>User ID:</Text>
            <TextInput style={{ Input }}
              placeholder="Enter user_id"
              onChangeText={(user_id) => this.setState({ user_id })}
              defaultValue={this.state.user_id}
            />

            <>
              {this.state.submitted && !this.state.user_id && (
                <Text style={styles.ErrorMessage}>*user_id is required</Text>
              )}
            </>
          </View>

          <View style={styles.loginbtn}>
            <TouchableOpacity onPress={() => this.OnPressButton()}>
              <View style={styles.Button}>
                <Text style={styles.ButtonText}>Delete Contact</Text>
              </View>
            </TouchableOpacity>
          </View>

          <>
            {this.state.error && (
              <Text style={styles.ErrorMessage}>{this.state.error}</Text>
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
    backgroundColor: "#0d416f",
  },
  FormContainer: {
    padding: 20,
  },
  Heading: {
    color: "#F57C00",
    fontWeight: "bold",    
    padding: 10,
    backgroundColor: "#FF9800",
    fontSize: 25,    
    textAlign: "center",
  },
  FormHeading: {
    fontSize: 15,
    paddingBottom: 20,
    color: "#FFFFFF",    
    fontWeight: "bold",
  },
  UserInputContainer: {
    paddingVertical: 10,
  },
  Input: {
    padding: 10,
    backgroundColor: "white",
    paddingVertical: 10,    
    borderWidth: 1,
    height: 40,
    borderRadius: 50,    
  },
  Button: {
    paddingHorizontal: 10,
    alignItems: "center",
    borderRadius: 50,
    paddingVertical: 10,
    backgroundColor: "#F98125",
  },
  ButtonText: {
    fontWeight: "bold",
    fontSize: 15,
    color: "#FFFFFF",
  },
  ErrorMessage: {
    color: "red",
  },
});
