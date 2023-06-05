//AddRemove - edited at uni
import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default class AddRemove extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // Holds the list of chats
      chats: [],
    };
  }

  componentDidMount() {
    // When the component mounts, load the chats
    this.loadContacts();
  }

  // Fetches the list of chats from the server
  loadContacts = async () => {
    const token = await AsyncStorage.getItem("app_session_token");
    fetch("http://localhost:3333/api/1.0.0/chat", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Passes the session token in the request headers
        "X-Authorization": token,
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        // Updates the state with the received list of chats
        this.setState({ chats: responseJson });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Renders each chat item in the list with an option to add users to the chat
  displayList = ({ item }) => (
    <TouchableOpacity
      style={styles.AddingUserToChat}
      onPress={() =>
        // Navigates to the "AddUserChat" screen with the selected chat ID
        this.props.navigation.navigate("AddUserChat", { chat_id: item.chat_id })
      }
    >
      <Text style={styles.Heading}>Add the user to chat</Text>
      <Text style={styles.ItemListHeading}>
        {item.chat_id} - {item.name}
      </Text>
    </TouchableOpacity>
  );

  // Renders each chat item in the list with an option to remove users from the chat
  displayLis = ({ item }) => (
    <TouchableOpacity
      style={styles.RemovingUserFromChat}
      onPress={() =>
        this.props.navigation.navigate("DeleteUserChat", {
          chat_id: item.chat_id,
        })
      }
    >
      <Text style={styles.RemoveUserTitle}>Remove the user from chat</Text>
      <Text style={styles.ItemListHeading}>
        {item.chat_id} - {item.name}
      </Text>
    </TouchableOpacity>
  );

  render() {
    return (
      <View style={styles.MainContainer}>

        <View style={styles.Header}>
          <Text style={styles.HeaderText}>Add Or Remove User</Text>
        </View>
        {/* Renders a FlatList to display the list of chats */}
        <FlatList
          style={styles.DisplayListContainer}
          // Passes the list of chats as data
          data={this.state.chats}
          // Renders each item using the displayList function
          renderItem={this.displayList}
        />

        {/* Renders another FlatList to display the list of chats with an option to remove users */}
        <FlatList
          style={styles.DisplayListContainer}
          // Passes the list of chats as data
          data={this.state.chats}
          // Renders each item using the displayLis function
          renderItem={this.displayLis}
        />
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
    marginBottom: 10,
    marginTop: 10,

  },
  DisplayListContainer: {
    padding: 20,
  },
  Heading: {
    color: "green",
    backgroundColor: "#FF9800",
    padding: 10,
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
  },
  RemoveUserTitle: {
    color: "red",
    backgroundColor: "#FF9800",
    padding: 10,
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
  },
  AddingUserToChat: {
    backgroundColor: "#FF9800",
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
    borderRadius: 5,
  },
  RemovingUserFromChat: {
    backgroundColor: "#FF9800",
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
    borderRadius: 5,
  },
  ItemListHeading: {
    fontSize: 30,
    color: "#FFFFFF",
    textAlign: "center",
  },
});