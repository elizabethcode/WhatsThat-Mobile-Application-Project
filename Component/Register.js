// Register
import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import { Text, TextInput, View, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { globalStyles } from '../globalStyles';
import * as EmailValidator from "email-validator";

export default class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      confirmPassword: "",
      error: "",
      submitted: false,
    };

    this.OnSubmitRegister = this.OnSubmitRegister.bind(this);
  }

  // Function called when register button is clicked
  OnSubmitRegister() {
    this.setState({ submitted: true });
    this.setState({ error: "" });

    // Check if all required fields are filled
    if (!(this.state.firstName && this.state.lastName && this.state.email && this.state.password && this.state.confirmPassword)) {
      this.setState({ error: "Please fill in all the required fields" });
      return;
    } else if (!EmailValidator.validate(this.state.email)) {
      this.setState({ error: "Please enter a valid email address" });
      return;
    }

    // Check password strength using a regular expression
    const PASSWORD_REGEX = new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$");

    if (!PASSWORD_REGEX.test(this.state.password)) {
      this.setState({
        error:
          "Please enter a stronger password. Your password should be at least 8 characters long, contain a mix of upper and lowercase letters, and include at least one number and a special character (#?!@$%^&*-)",
      });
      return;
    } else {
      console.log(
        "Register button clicked. Email: " + this.state.email + ", Password: " + this.state.password
      );
      console.log("Validation successful. Ready to submit to the API.");

      this.RegisterSubmit();
    }
  }

  // Send register request to API
  RegisterSubmit = async () => {
    const data = {
      first_name: this.state.firstName, last_name: this.state.lastName,
      email: this.state.email, password: this.state.password,
    };

    console.log(data);

    // Make the API request to register the user
    fetch("http://localhost:3333/api/1.0.0/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

      //different response handlers
      .then((response) => {
        if (response.status === 201) {
          return response.json();
        } else if (response.status === 400) {
          throw "An error occurred during registration. Please check your email and password. Make sure your email doesn't exits or make sure your email or password is valid";
        } else if (response.status === 500) {
          throw "Something unexpected happened. Please try again.";
        }
      })

      // Handle the successful response from the server after registration
      .then((response) => {
        console.log(response);
        this.setState({ error: "Registration successful! You can now log in." });
        this.setState({ submitted: false });
        this.props.navigation.navigate("Login");
      })

      // Store the received token in AsyncStorage (assuming it's part of the response JSON)
      .then(async (rJson) => {
        console.log(rJson);
        await AsyncStorage.setItem("app_session_token", rJson.token);
        this.props.navigation.navigate("Login");
      })

      // Handle any errors that occurred during the API request or response handling
      .catch((error) => {
        console.log(error);
        this.setState({ error: error });
        this.setState({ submitted: false });
      });
  };

  render() {
    const navigation = this.props.navigation;
    const { firstName, lastName, email, password, confirmPassword, error, submitted, } = this.state;

    return (
      <ScrollView>
        <View style={globalStyles.OuterContainer}>
          <View style={globalStyles.Header}>
            <Text style={globalStyles.HeaderText}>Register</Text>
          </View>
          <View style={styles.MainContainer}>
            <StatusBar style="auto" />
            <View style={styles.FormField}>
              <Text style={styles.TitleInput}>Forename</Text>

              <TextInput
                style={styles.TextInput}
                onChangeText={(firstName) => this.setState({ firstName })}
                defaultValue={firstName}
              />

              <>
                {submitted && !firstName && (
                  <Text style={styles.ErrorMessage}>* Must enter a forename</Text>
                )}
              </>

            </View>

            <View style={styles.FormField}>
              <Text style={styles.TitleInput}>Surname</Text>
              <TextInput
                style={styles.TextInput}
                onChangeText={(lastName) => this.setState({ lastName })}
                defaultValue={lastName}
              />

              <>
                {submitted && !lastName && (
                  <Text style={styles.ErrorMessage}>* Must enter a surname</Text>
                )}
              </>
            </View>

            <View style={styles.FormField}>
              <Text style={styles.TitleInput}>Email</Text>
              <TextInput
                style={styles.TextInput}
                onChangeText={(email) => this.setState({ email })}
                defaultValue={email}
              />
              <>
                {submitted && !email && (
                  <Text style={styles.ErrorMessage}>* Must enter an email</Text>
                )}
              </>

            </View>

            <View style={styles.FormField}>
              <Text style={styles.TitleInput}>Password</Text>
              <TextInput
                style={styles.TextInput}
                onChangeText={(password) => this.setState({ password })}
                defaultValue={password}
                secureTextEntry={true}
              />

              <>
                {submitted && !password && (
                  <Text style={styles.ErrorMessage}>* Must enter a password</Text>
                )}
              </>
            </View>

            <View style={styles.FormField}>
              <Text style={styles.TitleInput}>Confirm Password</Text>
              <TextInput style={styles.TextInput}
                onChangeText={(confirmPassword) =>
                  this.setState({ confirmPassword })
                }
                defaultValue={confirmPassword}
                secureTextEntry={true}
              />

              <>
                {submitted && confirmPassword !== password && (
                  <Text style={styles.ErrorMessage}>* Passwords do not match</Text>
                )}
              </>
            </View>

            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text style={styles.LoginButton}>Already have an account? Login</Text>
            </TouchableOpacity>

            <View>
              {error && (
                <Text style={styles.ErrorMessage}>{error}</Text>
              )}
            </View>
            <View style={styles.ButtonContainer}>
              <View style={styles.Button}>
                <TouchableOpacity onPress={this.OnSubmitRegister}>
                  <Text style={styles.TextButton}>Register</Text>
                </TouchableOpacity>
              </View>
            </View>
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
  FormField: {
    backgroundColor: "#f4f4f4",
    borderRadius: 50,
    marginBottom: 20,
    width: "60%",
    height: 45,
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  TextInput: {
    flex: 1,
    width: "100%",
    paddingLeft: 10,
    borderRadius: 50,
    color: "black",
    height: "100%",
  },
  TitleInput: {
    fontWeight: "bold",
    color: "#333333",
    marginRight: 10,
  },
  LoginButton: {
    marginBottom: -15,
    textDecorationLine: "underline",
    color: "#FFFFFF",
  },
  ButtonContainer: {
    alignItems: "center",
    width: "60%",
    justifyContent: "center",
    paddingBottom: 14,
  },
  Button: {
    width: "100%",
    alignItems: "center",
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    backgroundColor: "#F98125",
    marginTop: 30,
  },
  TextButton: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
    padding: 20,
  },
  ErrorMessage: {
    color: "red",
    marginTop: 25,
    fontWeight: "650",
    textAlign: "center",
  },
});

