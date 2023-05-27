import React, { Component } from "react";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  ScrollView,
  Button,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      searchQuery: "",
    };
  }

  getUsers = async () => {
    if (this.state.searchQuery) {
      try {
        const response = await fetch(
          `http://localhost:3333/api/1.0.0/search?q=${this.state.searchQuery}`, 
          {
            method: "GET",
            headers: {
              "X-Authorization": await AsyncStorage.getItem(
                "@whatsThat_session_token"
              ),
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 200) {
          const responseJson = await response.json();
          console.log(responseJson);
          this.setState({ users: responseJson });
          console.log("Success");
        } else if (response.status === 404) {
          throw "No Current Users/Contacts";
        } else {
          console.log("Does Not Work", [{ text: "OK" }]);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  handleSearch = (query) => {
    this.setState({ searchQuery: query }, () => {
      this.getUsers();
    });
  };

  addContact = async (userId) => {
    try {
      const response = await fetch(
        "http://localhost:3333/api/1.0.0/user/" + userId + "/contact",
        {
          method: "POST",
          headers: {
            "X-Authorization": await AsyncStorage.getItem(
              "@whatsThat_session_token"
            ),
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: userId,
          }),
        }
      );

      if (response.status === 200) {
        console.log("Success", "User added as contact", [{ text: "OK" }]);
      } else {
        console.log("Error" + userId);
      }
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <ScrollView>
        <View style={styles.FriendSec}>
          <TextInput
            style={styles.SearchBox}
            placeholder="Search for users..."
            onChangeText={this.handleSearch}
            value={this.state.searchQuery}
          />
          {this.state.searchQuery &&
            this.state.users.map((user) => {
              return (
                <View style={styles.UserContainer} key={user.user_id}>
                  <View style={{ alignItems: "flex-start" }}>
                    <View>
                      <Text>{user.user_id}</Text>
                      <Text>
                        {user.first_name} {user.last_name}
                      </Text>
                      <Text>{user.email}</Text>
                    </View>
                  </View>
                  <View style={{ alignItems: "flex-end" }}>
                    <Button
                      title="+"
                      onPress={() => this.addContact(user.user_id)}
                    />
                  </View>
                </View>
              );
            })}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  FriendSec: {
    flex: 1,
    paddingTop: 30,
    paddingHorizontal: 20,
    backgroundColor: "#ffffff",
  },
  FriendTitle: {
    fontSize: 28,
    fontWeight: "bold",
    paddingBottom: 20,
  },
  UserContainer: {
    backgroundColor: "#f2f2f2",
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
  },
  SearchBox: {
    height: 40,
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 10,
    marginBottom: 20,
  },
});
