// My Login
import React, { Component } from "react";
import { StatusBar } from "expo-status-bar";
import * as EmailValidator from "email-validator";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Text, TextInput, View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { globalStyles } from '../globalStyles';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      error: "",
      submitted: false,
    };
  }

  componentDidMount() {
    // Listen for focus event when the component is mounted
    this.unsubscribe = this.props.navigation.addListener("focus", () => {
      this.checkLoginStatus();
    });
  }

  componentWillUnmount() {
    // Unsubscribe from the focus event when the component is unmounted
    this.unsubscribe();
  }

  checkLoginStatus = async () => {
    // Check if the user is already logged in by checking the token in AsyncStorage
    const token = await AsyncStorage.getItem("app_session_token");
    if (token != null) {
      // If the token exists, navigate to the ProfileNavigator screen
      this.props.navigation.navigate("ProfileNavigator");
    }
  };

  onSubmitLogin = () => {
    // Set the submitted state to true and clear any previous error message
    this.setState({ submitted: true, error: "" });

    if (!(this.state.email && this.state.password)) {
      // Check if both email and password fields are filled
      this.setState({ error: "Please enter both your email and password." });
      return;
    } else if (!EmailValidator.validate(this.state.email)) {
      // Check if the email is valid using the EmailValidator library
      this.setState({ error: "Please enter a valid email address" });
      return;
    }

    const PASSWORD_REGEX = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

    if (!PASSWORD_REGEX.test(this.state.password)) {
      // Check if the password meets the required criteria using a regular expression
      this.setState({
        error:
          "Please enter a stronger password. Your password should be at least 8 characters long, contain a mix of upper and lowercase letters, and include at least one number and a special character (#?!@$%^&*-)",
      });
      return;
    } else {
      console.log(
        "Users Credentials: " + this.state.email + " " + this.state.password
      );
      console.log("Validated and ready to send to the API");

      this.loginSubmit();
    }
  };

  loginSubmit = async () => {
    const data = {
      email: this.state.email,
      password: this.state.password,
    };

    console.log(data);

    try {
      // Make a POST request to the login API endpoint with the user's email and password
      const response = await fetch("http://localhost:3333/api/1.0.0/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.status === 200) {
        // If the login is successful, save the user ID and session token in AsyncStorage
        const rJson = await response.json();
        console.log(rJson);
        await AsyncStorage.setItem("whatsThat_user_id", rJson.id);
        await AsyncStorage.setItem("app_session_token", rJson.token);
        this.setState({ submitted: false });
        this.props.navigation.navigate("ProfileNavigator");
      } else if (response.status === 400) {
        // If the login credentials are invalid, display an error message
        throw new Error("Invalid email or password");
      } else {
        // If an error occurs during login, display a generic error message
        throw new Error("Something went wrong");
      }
    } catch (error) {
      // Handle any errors that occur during the login process
      this.setState({ error: error.message });
      console.log(error);
    }
  };

  render() {
    const navigation = this.props.navigation;

    return (
      <View style={styles.MainContainer}>
        <StatusBar style="auto" />
        <View style={styles.LogoContainer}>
          <Image
            style={styles.MessengerLogo}
            source={require("../App/Images/MessengerLogo.png")}
          />
        </View>

        <View style={styles.InputContainer}>
          <TextInput
            style={styles.TextInput}
            placeholder="Email"
            onChangeText={(email) => this.setState({ email })}
            defaultValue={this.state.email}
          />
          {this.state.submitted && !this.state.email && (
            <Text style={styles.ErrorMessage}>*Must enter an email</Text>
          )}
        </View>

        <View style={styles.InputContainer}>
          <TextInput style={styles.TextInput}
            placeholder="Password"
            onChangeText={(password) => this.setState({ password })}
            defaultValue={this.state.password}
            secureTextEntry={true}
          />

          {this.state.submitted && !this.state.password && (
            <Text style={styles.ErrorMessage}>* Must enter a password</Text>
          )}
        </View>

        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={styles.RegisterButton}>Don't have an account? Register</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.LoginButton} onPress={this.onSubmitLogin}>
          <Text style={globalStyles.ButtonText}>Login</Text>
        </TouchableOpacity>

        {this.state.error && (
          <Text style={styles.ErrorMessage}>{this.state.error}</Text>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    backgroundColor: "#0d416f",
    paddingHorizontal: 30,
    alignItems: "center",
    paddingVertical: 50,
    justifyContent: "center",
  },
  LogoContainer: {
    marginBottom: 30,
    alignItems: "center",
  },
  MessengerLogo: {
    width: 200,
    resizeMode: "contain",
    height: 200,
  },
  InputContainer: {
    backgroundColor: "white",
    borderRadius: 25,
    width: "50%",
    height: "10%",
    alignItems: "center",
    marginBottom: 20,
    flexDirection: "row",
  },
  TextInput: {
    flex: 1,
    width: "100%",
    height: "100%",
    fontSize: 18,
    borderRadius: 50,
    placeholderTextColor: "#7a7d68",
    padding: 20,
  },
  RegisterButton: {
    height: 30,
    marginTop: 20,
    color: "white",
    textDecorationLine: "underline",
  },
  LoginButton: {
    backgroundColor: "#F98125",
    width: "50%",
    height: "10%",
    justifyContent: "center",
    borderRadius: 25,
    alignItems: "center",
    marginTop: 40,
  },
  ErrorMessage: {
    color: "red",
    textAlign: "center",
    marginBottom: 10,
    fontWeight: "bold",
  },
});
