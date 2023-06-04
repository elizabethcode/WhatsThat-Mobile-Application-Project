//Users
import React, { Component } from "react";
import {View,Text,Button,TextInput,StyleSheet, ScrollView,} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Define the Users component
export default class Users extends Component {
  constructor(props) {
    super(props);
    // Initialize the component's state
    this.state = {
      searchQuery: "",
      users: [],      
    };
  }

  // Function to retrieve users from the server
  RetrievingUsers = async () => {
    // Check if the search query is not empty
    if (this.state.searchQuery) {
      try {
        // Make a GET request to the server to retrieve users based on the search query
        const response = await fetch(
          `http://localhost:3333/api/1.0.0/search?q=${this.state.searchQuery}`,
          {
            method: "GET",
            headers: {
              "X-Authorization": await AsyncStorage.getItem(
                "app_session_token"
              ),
              "Content-Type": "application/json",
            },
          }
        );

        //Response Status
        if (response.status === 200) {
          const rJson = await response.json();
          console.log(rJson);
          this.setState({ users: rJson });
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

  // Function to handle user search
  HandingUserSearch = (query) => {
    this.setState({ searchQuery: query }, () => {
      this.RetrievingUsers();
    });
  };

  // Function to add a user as a contact
  AddingContacts = async (userId) => {
    try {
      // Make a POST request to add the user as a contact
      const response = await fetch(
        "http://localhost:3333/api/1.0.0/user/" + userId + "/contact",
        {
          method: "POST",
          headers: {
            "X-Authorization": await AsyncStorage.getItem(
              "app_session_token"
            ),
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: userId,
          }),
        }
      );

      //Response status
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
      <View style={styles.OuterContainer}>
        <ScrollView>
          <View style={styles.Header}>
            <Text style={styles.HeaderText}>Users List</Text>
          </View>
          <View style={styles.MainContainer}>
            <TextInput
              style={styles.UserSearchBar}
              placeholder="Search for users"
              onChangeText={this.HandingUserSearch}
              value={this.state.searchQuery}
            />
            {this.state.searchQuery &&
              this.state.users.map((user) => {
                return (
                  <View style={styles.SearchUserContainer} key={user.user_id}>
                    <View style={styles.UserInformationContainer}>
                      <Text style={styles.Headings}>ID: {user.user_id}</Text>
                      <Text style={styles.Headings}>Name: {user.first_name} {user.last_name}
                      </Text>
                      <Text style={styles.Headings}>{user.email}</Text>
                    </View>
                    <View style={styles.AddUserButtonContainer}>
                      <Button style={styles.AddButton}
                        onPress={() => this.AddingContacts(user.user_id)}
                        title=" Add"
                        borderStyle="solid"
                        color="#F98125"
                      />
                    </View>
                  </View>
                );
              })}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    paddingTop: 30,
    paddingHorizontal: 20,
    backgroundColor: "#0d416f",
  },
  OuterContainer: {
    width: "100%",
    height: "100%",
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
  AddButton: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 20,
  },
  UserSearchBar: {
    height: 40,
    borderWidth: 1,
    borderRadius: 50,
    paddingLeft: 10,
    marginBottom: 20,
    color: "white",
  },
  SearchUserContainer: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    marginBottom: 20,
    borderRadius: 100,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginLeft: 50,
    marginRight: 50,
    marginTop: 20,
  },
  UserInformationContainer: {
    flex: 1,
    alignItems: "flex-start",
    paddingLeft: 40,
  },
  AddUserButtonContainer: {
    alignItems: "flex-end",
    marginLeft: 20,
  },
  Headings: {
    fontSize: 18,
    color: "black",
  },
});
