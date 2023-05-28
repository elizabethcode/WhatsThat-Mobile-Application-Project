// //Login

//my login edit
import React, { Component } from "react";
import { StatusBar } from "expo-status-bar";
import * as EmailValidator from "email-validator";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Text, TextInput, View, Image, StyleSheet, TouchableOpacity } from "react-native";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // user.1@gmail.com
      // Password123!
      email: "",
      password: "",
      error: "",
      submitted: false,
    };
  }

  onSubmitLogin = () => {
    this.setState({ submitted: true });
    this.setState({ error: "" });

    if (!(this.state.email && this.state.password)) {
      this.setState({ error: "Please enter an email and password" });
      return;
    } else if (!EmailValidator.validate(this.state.email)) {
      this.setState({ error: "Please enter a valid email" });
      return;
    }

    const PASSWORD_REGEX = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

    if (!PASSWORD_REGEX.test(this.state.password)) {
      this.setState({
        error:
          "Password is too weak. It should contain at least 8 characters including one uppercase letter, one lowercase letter, one digit, and one special character: #?!@$%^&*-",
      });
      return;
    } else {
      console.log("Button clicked: " + this.state.email + " " + this.state.password);
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
      const response = await fetch("http://localhost:3333/api/1.0.0/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.status === 200) {
        const rJson = await response.json();

        await AsyncStorage.setItem("whatsThat_user_id", rJson.id);
        await AsyncStorage.setItem("app_session_token", rJson.token);

        this.setState({ submitted: false });

        this.props.navigation.navigate("Profile");
      } else if (response.status === 400) {
        throw "Invalid email or password";
      } else {
        throw "Something went wrong";
      }
    } catch (error) {
      console.log(error);
    }
  };

  //checking to see if the user is being logged in or not
  LoginStatus = async () => {
    const value = await AsyncStorage.getItem("app_session_token");
    if (value != null) {
      this.props.navigation.navigate("Profile");
    }
  };

  componentDidMount() {
    this.unsubscribe = this.props.navigation.addListener("focus", () => {
      this.LoginStatus();
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const navigation = this.props.navigation;

    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <View style={styles.logoContainer}>
          <Image style={styles.MessengerLogo}
            source={require("../../App/Images/MessengerLogo.png")}
            
            
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput style={styles.textInput}
            placeholder="Email"
            placeholderTextColor="#7a7d68"
            onChangeText={(email) => this.setState({ email })}
            defaultValue={this.state.email}
          />
          {this.state.submitted && !this.state.email && (
            <Text style={styles.errorMsg}>*Must enter an email</Text>
          )}
        </View>

        <View style={styles.inputContainer}>
          <TextInput style={styles.textInput}
            placeholder="Password"
            placeholderTextColor="#7a7d68"
            onChangeText={(password) => this.setState({ password })}
            defaultValue={this.state.password}
            secureTextEntry={true}
          />
          {this.state.submitted && !this.state.password && (
            <Text style={styles.errorMsg}>*Must enter a password</Text>
          )}
        </View>

        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={styles.createAccountButton}>Do you have an account? Register</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.loginButton} onPress={this.onSubmitLogin}>
          <Text style={styles.buttonText}>LOGIN</Text>
        </TouchableOpacity>

        {this.state.error && <Text style={styles.errorMsg}>{this.state.error}</Text>}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0d416f",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
    paddingVertical: 50,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  MessengerLogo: {
    width: 200,
    height: 200,
    resizeMode:"contain",
  },
  inputContainer: {
    backgroundColor: "white",
    borderRadius: 25,
    width: "50%",
    height: 50,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
  },
  createAccountButton: {
    height: 30,
    textDecorationLine: "underline",
    marginTop: 20,
    color: "white",
  },
  loginButton: {
    backgroundColor: "#F98125",
    borderRadius: 25,
    width: "50%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    padding: 20,
  },
  errorMsg: {
    color: "red",
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
});
