//UpdateMessage
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
import { Ionicons } from "@expo/vector-icons";

export default class ManageMessage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: "",
      error: "",
      submitted: false,
      messages: [],
    };

    this.handleMessageChange = this.handleMessageChange.bind(this);
    this.updateMessage = this.updateMessage.bind(this);
    this.deleteMessage = this.deleteMessage.bind(this);
  }

  componentDidMount() {
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
      const response = await fetch(
        `http://localhost:3333/api/1.0.0//chat/${chat_id}`, //http://localhost:3333/api/1.0.0//chat/${chat_id}
        {
          headers,
        }
      );

      const rJson = await response.json();

      this.setState({ messages: rJson.messages.reverse() });
    } catch (error) {
      console.log(error);
    }
  }

  handleMessageChange = (message) => {
    this.setState({ message });
  };

  updateMessage = async (message_id) => {
    this.setState({ submitted: true });
    this.setState({ error: "" });

    if (!this.state.message) {
      this.setState({ error: "*Must enter a message" });
      return;
    }
    try {
      const token = await AsyncStorage.getItem("app_session_token");
      const headers = {
        "Content-Type": "application/json",
        "X-Authorization": token,
      };

      const { chat_id } = this.props.route.params;

      const response = await fetch(
        `http://localhost:3333/api/1.0.0/chat/${chat_id}/message/${message_id}`, //http://localhost:3333/api/1.0.0//chat/${chat_id}/message/${message_id}
        {
          method: "PATCH",
          headers,
          body: JSON.stringify({ message: this.state.message }), // pass updated message in the body
        }
      );

      if (response.ok) {
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

  deleteMessage = async (message_id) => {
    try {
      const token = await AsyncStorage.getItem("app_session_token");

      const headers = {
        "Content-Type": "application/json",
        "X-Authorization": token,
      };

      const { chat_id } = this.props.route.params;

      const response = await fetch(
        `http://localhost:3333/api/1.0.0/chat/${chat_id}/message/${message_id}`,
        {
          method: "DELETE",
          headers,
        }
      );
      if (response.ok) {
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

  displayList = ({ item }) => {
    const { chat_id } = this.props.route.params;
    const timestamp = new Date(item.timestamp).toLocaleString();
    const authorEmail = item.author.email;
    const { Id } = this.state;
    const isCurrentUser = Id === item.author.user_id;
    return (
      <View style={styles.messageContainer}>
        <View style={styles.messageTextContainer}>
          <Text style={[styles.messageText]}>
            {item.message}
            <br></br>
            <TouchableOpacity
              onPress={() => this.updateMessage(item.message_id)}
            >
              <Ionicons
                name="create"
                size={20}
                color="green"
                style={styles.deleteIcon}
              />
              <Text style={styles.menuItemText}>Update</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => this.deleteMessage(item.message_id)}
            >
              <Ionicons
                name="trash"
                size={20}
                color="red"
                style={styles.deleteIcon}
              />
              <Text style={styles.menuItemTextt}>Delete</Text>
            </TouchableOpacity>
          </Text>

          <Text style={[styles.messageSent]}>
            Sent from {authorEmail} at: {timestamp}
          </Text>

          <TextInput
            style={[styles.input]}
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
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Manage Chat: {chat_id}</Text>
          <View style={styles.buttonHeader}></View>
        </View>
        <View style={styles.chatContainer}>
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
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  formContainer: {
    padding: 20,
  },
  input: {
    borderRadius: 15,
    padding: 5,
    margin: 5,
    width: "100%",
    fontSize: 18,
    padding: 5,
    marginBottom: 5,
    backgroundColor: "#146C94",
    color: "#19A7CE",
  },
  header: {
    backgroundColor: "#146C94",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },

  buttonHeader: {
    backgroundColor: "#146C94",
    flexDirection: "row",
  },
  title: {
    color: "#146C94",
    fontSize: 25,
  },
  addButton: {
    backgroundColor: "#146C94",
    margin: 5,
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignItems: "center",
    justifyContent: "space-around",
  },
  title: {
    color: "#19A7CE",
    backgroundColor: "#146C94",
    padding: 10,
    fontSize: 25,
  },

  messageText: {
    borderRadius: 15,
    padding: 5,
    margin: 5,
    width: "40%",
    fontStyle: "italic",
    backgroundColor: "#19A7CE",
    color: "black",
    alignSelf: "flex-end",
    flex: 19,
  },
  menuItemText: {
    fontSize: 12,
    marginLeft: 10,
    color: "#146C94",
  },
  menuItemTextt: {
    fontSize: 12,
    marginLeft: 10,
    color: "red",
  },

  messageTextGrey: {
    borderRadius: 15,
    padding: 5,
    margin: 5,
    width: "40%",
    fontStyle: "italic",
    backgroundColor: "#19A7CE",
    color: "#ffffff",
    alignSelf: "flex-end",
    flex: 19,
  },
  messageSent: {
    borderRadius: 15,
    padding: 5,
    margin: 5,
    width: "40%",
    fontStyle: "italic",
    color: "#808080",
    alignSelf: "flex-end",
    flex: 19,
    fontWeight: "bold",
  },
  formLabel: {
    fontSize: 15,
    color: "#146C94",
    flex: 19,
    padding: 5,
    margin: 5,
  },
  email: {
    paddingVertical: 10,
  },

  password: {
    paddingVertical: 10,
  },

  loginbtn: {},
  button: {
    backgroundColor: "#146C94",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#146C94",
  },
});
