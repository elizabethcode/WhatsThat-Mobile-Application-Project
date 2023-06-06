//AddOrRemoveUserChats
import React, { Component } from "react";
import {Text, View, TouchableOpacity, FlatList, StyleSheet} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default class AddOrRemoveUserChats extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // Holds the list of chats
      chats: [],
    };
  }

  componentDidMount() {
    // When the component mounts, load the chats
    this.LoadingContacts();
  }

  // Fetches the list of chats from the server
  LoadingContacts = async () => {
    const SessionToken = await AsyncStorage.getItem("app_session_token");
    fetch("http://localhost:3333/api/1.0.0/chat", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Passes the session SessionToken in the request headers
        "X-Authorization": SessionToken,
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
  DisplayAddedUserList = ({ item }) => (
    <TouchableOpacity
      style={styles.AddingUserToChat}
      onPress={() =>
        // Navigates to the "AddingUserChat" screen with the selected chat ID
        this.props.navigation.navigate("AddingUserChat", { chat_id: item.chat_id })
      }
    >
      <Text style={styles.Heading}>Add a User to the Chat</Text>
      <Text style={styles.ItemListHeading}>
        {item.chat_id} - {item.name}
      </Text>
    </TouchableOpacity>
  );

  // Renders each chat item in the list with an option to remove users from the chat
  DisplayRemoveUserList = ({ item }) => (
    <TouchableOpacity
      style={styles.RemovingUserFromChat}
      onPress={() =>
        this.props.navigation.navigate("DeleteUserChat", {
          chat_id: item.chat_id,
        })
      }
    >
      <Text style={styles.RemoveUserTitle}>Remove a User from the Chat</Text>
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
          // Renders each item using the DisplayAddedUserList function
          renderItem={this.DisplayAddedUserList}
        />

        {/* Renders another FlatList to display the list of chats with an option to remove users */}
        <FlatList
          style={styles.DisplayListContainer}
          // Passes the list of chats as data
          data={this.state.chats}
          // Renders each item using the DisplayRemoveUserList function
          renderItem={this.DisplayRemoveUserList}
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
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  HeaderText: {
    textAlign: "center",
    fontSize: 25,    
    color: "#FFFFFF",    
    marginBottom: 10,
    fontWeight: "bold",
    marginTop: 10,

  },
  DisplayListContainer: {
    padding: 20,
  },
  Heading: {
    color: "green",  
    fontSize: 25,
    backgroundColor: "#7EC8E3",
    fontWeight: "bold",
    padding: 10,
    textAlign: "center",
  },
  RemoveUserTitle: {
    color: "red",    
    padding: 10,    
    fontWeight: "bold",
    backgroundColor: "#7EC8E3",
    textAlign: "center",
    fontSize: 25,
  },
  AddingUserToChat: {   
    paddingVertical: 10,
    backgroundColor: "#7EC8E3",
    marginBottom: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  RemovingUserFromChat: {
    marginBottom: 10,    
    paddingVertical: 10,
    borderRadius: 5,
    backgroundColor: "#7EC8E3",
    paddingHorizontal: 20,
  },
  ItemListHeading: {
    color: "#FFFFFF",
    fontSize: 30,
    textAlign: "center",
  },
});

