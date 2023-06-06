//UpdatingMessage
import React, { Component } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, FlatList } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AntDesign } from "@expo/vector-icons";

export default class UpdatingMessage extends Component {
  constructor(props) {
    super(props);

    // Initialize state variables
    this.state = {
      message: "",
      error: "",
      submitted: false,
      messages: [],
    };

    this.MessageChangeHandler = this.MessageChangeHandler.bind(this);
    this.UpdatingMessages = this.UpdatingMessages.bind(this);
    this.DeletingMessages = this.DeletingMessages.bind(this);
  }

  componentDidMount() {
    // Add a listener to the focus event
    this.unsubscribe = this.props.navigation.addListener("focus", () => {
      this.MessageChangeHandler();
      this.UpdatingMessages();
      this.DeletingMessages();
    });
  }

  async componentDidMount() {
    try {
      const SessionToken = await AsyncStorage.getItem("app_session_token");

      const headers = {
        "Content-Type": "application/json",
        "X-Authorization": SessionToken,
      };

      const { chat_id } = this.props.route.params;

      // Fetch chat messages from server
      const response = await fetch(
        `http://localhost:3333/api/1.0.0/chat/${chat_id}`,
        {
          headers,
        }
      );

      const responseJson = await response.json();

      // Reverse the order of messages and update state
      this.setState({ messages: responseJson.messages.reverse() });
    } catch (error) {
      console.log(error);
    }
  }

  MessageChangeHandler = (message) => {
    // Update the message state when input changes
    this.setState({ message });
  };

  // Set submitted flag to true and clear error message
  UpdatingMessages = async (message_id) => {
    this.setState({ submitted: true });
    this.setState({ error: "" });

    // Check if message is empty
    if (!this.state.message) {
      this.setState({ error: "*Must enter a message" });
      return;
    }
    try {
      const SessionToken = await AsyncStorage.getItem("app_session_token");
      const headers = {
        "Content-Type": "application/json",
        "X-Authorization": SessionToken,
      };

      const { chat_id } = this.props.route.params;

      // Send a PATCH request to update the message
      const response = await fetch(
        `http://localhost:3333/api/1.0.0/chat/${chat_id}/message/${message_id}`,
        {
          method: "PATCH",
          headers,
          body: JSON.stringify({ message: this.state.message }),
        }
      );

      if (response.ok) {
        // Update the state with the new message
        const newMessages = this.state.messages.map((message) => {
          if (message.message_id === message_id) {
            message.message = this.state.message;
          }
          return message;
        });
        this.setState({ messages: newMessages });
        console.log("message updated: ", message_id);
      } else {
        console.log("Failed to update message");
      }
    } catch (error) {
      console.log(error);
    }
  };

  DeletingMessages = async (message_id) => {
    try {
      const SessionToken = await AsyncStorage.getItem("app_session_token");

      const headers = {
        "Content-Type": "application/json",
        "X-Authorization": SessionToken,
      };

      const { chat_id } = this.props.route.params;

      // Send a DELETE request to delete the message
      const response = await fetch(
        `http://localhost:3333/api/1.0.0/chat/${chat_id}/message/${message_id}`,
        {
          method: "DELETE",
          headers,
        }
      );
      if (response.ok) {
        // Remove the deleted message from the state
        const newMessages = this.state.messages.filter(
          (message) => message.message_id !== message_id
        );
        this.setState({ messages: newMessages });
        console.log("message deleted: ", { message_id });
      } else {
        console.log("Failed to delete message");
      }
    } catch (error) {
      console.log(error);
    }
  };

  DisplayAddedUserList = ({ item }) => {
    const { chat_id } = this.props.route.params;
    const timestamp = new Date(item.timestamp).toLocaleString();
    const authorEmail = item.author.email;
    const { Id } = this.state;
    const isCurrentUser = Id === item.author.user_id;
    return (
      <View style={styles.MainMessageContainer}>
        <View style={styles.OuterMessageTextContainer}>
          <Text style={[styles.MessageText]}>
            {item.message}
            <br></br>
            <TouchableOpacity
              onPress={() => this.UpdatingMessages(item.message_id)}
            >
              <AntDesign
                name="edit"
                size={30}
                color="green"
                style={styles.deleteIcon}
              />
              <Text style={styles.ItemMenuText}>Update</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => this.DeletingMessages(item.message_id)}
            >
              <AntDesign
                name="delete"
                size={30}
                color="red"
                style={styles.deleteIcon}
              />
              <Text style={styles.ItemMenuText}>Delete</Text>
            </TouchableOpacity>
          </Text>

          <Text style={[styles.SentMessage]}>
            Sent from {authorEmail} at: {timestamp}
          </Text>

          <TextInput
            style={[styles.Input]}
            placeholder="Alter your message here"
            value={this.state.message}
            onChangeText={this.MessageChangeHandler}
          />
        </View>
      </View>
    );
  };

  render() {
    const { chat_id } = this.props.route.params;
    const { name } = this.props.route.params;
    return (
      <View style={styles.MainContainer}>
        <View style={styles.Header}>
          <View style={styles.Header}>
            <Text style={styles.HeaderText}>Manage Chat {chat_id} Messages</Text>
          </View>
          <View style={styles.buttonHeader}></View>
        </View>
        <View style={styles.OuterChatContainer}>
          <FlatList
            style={styles.listContainer}
            data={this.state.messages}
            renderItem={this.DisplayAddedUserList}
            keyExtractor={(item, index) => index.toString()}
          />
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
  Header: {
    backgroundColor: "#F98125",
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  HeaderText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 5,
    fontSize: 25,
    marginTop: 5,
  },
  Heading: {
    fontSize: 25,
    color: "#FFFFFF",
  },
  OuterChatContainer: {
    flex: 1,
    padding: 20,
  },
  MainMessageContainer: {
    marginBottom: 10,
  },
  OuterMessageTextContainer: {
    backgroundColor: "#FFFFFF",
    padding: 10,
    borderRadius: 5,
  },
  MessageText: {
    color: "#000000",
    fontSize:16,
    marginBottom: 10,
  },
  SentMessage: {
    color: "#909090",
    marginBottom: 20,
    fontWeight: "bold",
  },
  Input: {
    backgroundColor: "#FFFFFF",
    padding:5,
    borderRadius: 50,
    marginBottom: 10,
    borderRadius:50,
    paddingHorizontal: 10,
    borderColor:"black",
    fontSize:16,
  },
  ItemMenuText: {
    fontSize: 16,
    paddingTop: 10,
    color: "#FFA500",
    paddingRight: 20,
    fontWeight:"bold",
  },
  ItemMenuText2: {
    marginLeft: 10,
    fontSize: 12,
    color: "#FFFFFF",
  },
});