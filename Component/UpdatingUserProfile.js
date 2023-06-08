//UpdatingUserProfile
import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from "react-native";
import { ScrollView } from 'react-native-web';
import EmailValidator from 'email-validator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { globalStyles } from '../globalStyles';

export default class UpdatingUserProfile extends Component {

  constructor(props) {
    super(props);

    // Initialize state variables
    this.state = {
      originalData: {},
      first_name: " ",
      last_name: " ",
      email: " ",
      password: " "
    }
  }

  componentDidMount() {
    // Set the initial state values based on the received data
    this.setState({
      originalData: this.props.route.params.data,
      first_name: this.props.route.params.data.first_name,
      last_name: this.props.route.params.data.last_name,
      email: this.props.route.params.data.email
    }, () => {
      console.log(this.state)
    })
  }

  // Function to update the user profile and send the updated data to the API
  UpdatingUserProfile = async () => {

    //Validation:
    if (!(this.state.email && this.state.password)) {
      this.setState({ error: "Enter an email and password" })
      return;
    } else if (!EmailValidator.validate(this.state.email)) {
      this.setState({ error: "Enter a valid email" })
      return;
    }

    let data = {}


    // Check if the email has been changed
    if (this.state.email !== this.state.originalData.email) {
      data.email = this.state.email
    }

    // Check if the first name has been changed
    if (this.state.first_name !== this.state.originalData.first_name) {
      data.first_name = this.state.first_name
    }

    // Check if the last name has been changed
    if (this.state.last_name !== this.state.originalData.last_name) {
      data.last_name = this.state.last_name
    }


    // Send a PATCH request to the API with the updated data
    return fetch(`http://localhost:3333/api/1.0.0/user/${this.state.originalData.user_id}`, {
      method: 'PATCH',
      headers: {
        "X-Authorization": await AsyncStorage.getItem("app_session_token"),
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then((response) => {
        if (response.status === 200) {
          console.log("User updated")
          this.props.navigation.navigate("AccountProfile");
        } else {
          throw "Something went wrong"
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }
  render() {

    const navigation = this.props.navigation;
    console.log('Edit Post');

    return (
      <ScrollView>
        <View style={styles.Header}>
          <Text style={styles.HeaderText}> Update Profile</Text>
        </View>

        <View style={styles.MainContainer}>
          <View style={styles.InputContainer}>
            <Text style={styles.TextLabel}>First Name:</Text>
            <TextInput
              style={styles.Input}
              value={this.state.first_name}
              onChangeText={(val) => this.setState({ first_name: val })}
            />
          </View>

          <View style={styles.InputContainer}>
            <Text style={styles.TextLabel}>Last Name:</Text>
            <TextInput
              style={styles.Input}
              value={this.state.last_name}
              onChangeText={(val) => this.setState({ last_name: val })}
            />
          </View>

          <View style={styles.InputContainer}>
            <Text style={styles.TextLabel}>Email:</Text>
            <TextInput
              style={styles.Input}
              value={this.state.email}
              onChangeText={(val) => this.setState({ email: val })}
            />
          </View>

          <View style={styles.InputContainer}>
            <Text style={styles.TextLabel}>Password:</Text>
            <TextInput
              style={styles.Input}
              value={this.state.password}
              onChangeText={(val) => this.setState({ password: val })}
              secureTextEntry
            />
          </View>
          <View style={styles.ButtonContainer}>
            <TouchableOpacity style={styles.Button} onPress={() => this.UpdatingUserProfile()}>
              <Text style={styles.TextButton}>Update</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#0d416f",
    justifyContent: "center",
  },
  Header: {
    backgroundColor: "#F98125",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  HeaderText: {
    marginBottom: 10,
    fontSize: 25,
    textAlign: "center",
    fontWeight: "bold",
    color: "#FFFFFF",
    marginTop: 5,
  },
  InputContainer: {
    width: "60%",
    marginBottom: 20,
  },
  TextLabel: {
    marginBottom: 10,
    fontWeight: "bold",
    fontSize: 16,
    color: "#FFFFFF",
  },
  Input: {
    height: 50,
    fontSize: 16,
    color: "#FFFFFF",
    backgroundColor: "#1A2E44",
    borderRadius: 50,
    paddingHorizontal: 5,
  },
  ErrorMessage: {
    color: "red",
    marginBottom: 10,
  },
  ButtonContainer: {
    alignItems: "center",
    paddingBottom: 10,
    justifyContent: "center",
    width: "60%",
  },
  Button: {
    backgroundColor: "#F98125",
    justifyContent: "center",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    width: "100%",
    marginTop: 10,
  },
  TextButton: {
    color: "#FFFFFF",
    fontSize: 18,
    marginRight: 20,
    textAlign: 'center',
    padding: 20,
    fontWeight: "bold",
    marginLeft: 20,

  },
  Title: {
    marginBottom: 20,
    fontWeight: "bold",
    fontSize: 24,
    color: "#FFFFFF",
  },
});
