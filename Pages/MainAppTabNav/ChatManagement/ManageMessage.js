// // //UpdateMessage
//ManageMessage - edited at uni
import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AntDesign } from "@expo/vector-icons";

export default class ManageMessage extends Component {
  constructor(props) {
    super(props);

    // Initialize state variables
    this.state = {
      message: "",
      ErrorMessage: "",
      submitted: false,
      messages: [],
    };

    this.handleMessageChange = this.handleMessageChange.bind(this);
    this.updateMessage = this.updateMessage.bind(this);
    this.deleteMessage = this.deleteMessage.bind(this);
  }

  componentDidMount() {
    // Add a listener to the focus event
    this.unsubscribe = this.props.navigation.addListener("focus", () => {
      this.handleMessageChange();
      this.updateMessage();
      this.deleteMessage();
    });
  }

  async componentDidMount() {
    try {
      const token = await AsyncStorage.getItem("app_session_token");

      const headers = {
        "Content-Type": "application/json",
        "X-Authorization": token,
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
    } catch (ErrorMessage) {
      console.log(ErrorMessage);
    }
  }

  handleMessageChange = (message) => {
    // Update the message state when input changes
    this.setState({ message });
  };

  // Set submitted flag to true and clear ErrorMessage message
  updateMessage = async (message_id) => {
    this.setState({ submitted: true });
    this.setState({ ErrorMessage: "" });

    // Check if message is empty
    if (!this.state.message) {
      this.setState({ ErrorMessage: "*Must enter a message" });
      return;
    }
    try {
      const token = await AsyncStorage.getItem("app_session_token");
      const headers = {
        "Content-Type": "application/json",
        "X-Authorization": token,
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
    } catch (ErrorMessage) {
      console.log(ErrorMessage);
    }
  };

  deleteMessage = async (message_id) => {
    try {
      const token = await AsyncStorage.getItem("app_session_token");

      const headers = {
        "Content-Type": "application/json",
        "X-Authorization": token,
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
    } catch (ErrorMessage) {
      console.log(ErrorMessage);
    }
  };

  displayList = ({ item }) => {
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
              onPress={() => this.updateMessage(item.message_id)}
            >
              <AntDesign
                name="edit"
                size={20}
                color="green"
                style={styles.deleteIcon}
              />
              <Text style={styles.ItemMenuText}>Update</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => this.deleteMessage(item.message_id)}
            >
              <AntDesign
                name="delete"
                size={20}
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
            onChangeText={this.handleMessageChange}
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
            <Text style={styles.HeaderText}>Manage Chat: {chat_id}</Text>
          </View>
          <View style={styles.buttonHeader}></View>
        </View>
        <View style={styles.OuterChatContainer}>
          <FlatList
            style={styles.listContainer}
            data={this.state.messages}
            renderItem={this.displayList}
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
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  HeaderText: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 5,
    marginTop: 5,
  },
  Heading: {
    color: "#FFFFFF",
    fontSize: 25,
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
    borderRadius: 5,
    padding: 10,
  },
  MessageText: {
    color: "#000000",
    marginBottom: 10,
  },
  SentMessage: {
    color: "#808080",
    fontWeight: "bold",
    marginBottom: 10,
  },
  Input: {
    backgroundColor: "#FFFFFF",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  ItemMenuText: {
    fontSize: 16,
    paddingRight: 20,
    paddingTop: 10,
    color: "#FFA500",
  },
  ItemMenuText2: {
    fontSize: 12,
    marginLeft: 10,
    color: "#FFFFFF",
  },
});