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
        <View style={styles.container}>
          <TextInput
            style={styles.searchBox}
            placeholder="Search for users"
            onChangeText={this.handleSearch}
            value={this.state.searchQuery}
          />
          {this.state.searchQuery &&
            this.state.users.map((user) => {
              return (
                <View style={styles.userContainer} key={user.user_id}>
                  <View style={styles.userInfoContainer}>
                    <Text style={styles.userId}>{user.user_id}</Text>
                    <Text style={styles.userName}>
                      {user.first_name} {user.last_name}
                    </Text>
                    <Text style={styles.userEmail}>{user.email}</Text>
                  </View>
                  <View style={styles.addButtonContainer}>
                    <Button
                      title="+"
                      onPress={() => this.addContact(user.user_id)}
                      color="#F98125"
                      borderStyle= "solid"
                      borderRadius= "50"
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
  container: {
    flex: 1,
    paddingTop: 30,
    paddingHorizontal: 20,
    backgroundColor: "#0d416f",
  },
  searchBox: {
    height: 40,
    borderWidth: 1,
    borderRadius: 50,
    paddingLeft: 10,
    marginBottom: 20,
    color: "white",
  },
  userContainer: {
    backgroundColor: "#f2f2f2",
    padding: 20,
    marginBottom: 20,
    borderRadius: 100,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginLeft:50,
    marginRight:50,
    marginTop:20,
  },
  userInfoContainer: {
    flex: 1,
    alignItems: "flex-start",
  },
  addButtonContainer: {
    alignItems: "flex-end",
    marginLeft: 20,
  },
  userId: {
    fontSize: 16,
    color: "Black",
    paddingLeft: 40,
  },
  userName: {
    fontSize: 16,
    color: "Black",
    paddingLeft: 40,
  },
  userEmail: {
    fontSize: 16,
    color: "Black",
    paddingLeft: 40,
  },
});
