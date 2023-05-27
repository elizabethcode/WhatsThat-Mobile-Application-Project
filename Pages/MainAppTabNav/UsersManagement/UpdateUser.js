//UpdateUser
import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import EmailValidator from "email-validator";

export default class UpdateUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      originalData: {},
      first_name: " ",
      last_name: " ",
      email: " ",
      password: " ",
    };
  }

  componentDidMount() {
    this.setState(
      {
        originalData: this.props.route.params.data,
        first_name: this.props.route.params.data.first_name,
        last_name: this.props.route.params.data.last_name,
        email: this.props.route.params.data.email,
      },
      () => {
        console.log(this.state);
      }
    );
  }

  //Update the user Profile and then send to API

  updateProfile = async () => {
    //console.log(this.state)
    console.log("function working");

    //Validation:
    if (!(this.state.email && this.state.password)) {
      this.setState({ error: "Enter a email and password" });
      return;
    } else if (!EmailValidator.validate(this.state.email)) {
      this.setState({ error: "Enter a valid email" });
      return;
    }

    let data = {};

    if (this.state.first_name != this.state.originalData.first_name) {
      // data["first_name"] = this.state.first_name
      data.first_name = this.state.first_name;
    }

    if (this.state.last_name != this.state.originalData.last_name) {
      data["last_name"] = this.state.last_name;
    }

    if (this.state.email != this.state.originalData.email) {
      data["email"] = this.state.email;
    }

    console.log(data);

    //Send Patch request to API
    return fetch(
      `http://localhost:3333/api/1.0.0/user/${this.state.originalData.user_id}`,
      {
        method: "PATCH",
        headers: {
          "X-Authorization": await AsyncStorage.getItem(
            "@whatsThat_session_token"
          ), //"X-Authorization": await AsyncStorage.getItem("@whatsThat_session_token")
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    )
      .then((response) => {
        if (response.status === 200) {
          console.log("User updated");
        } else {
          throw "Something wrong";
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    const navigation = this.props.navigation;

    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>First Name:</Text>
          <TextInput
            style={styles.input}
            value={this.state.first_name}
            onChangeText={(val) => this.setState({ first_name: val })}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Last Name:</Text>
          <TextInput
            style={styles.input}
            value={this.state.last_name}
            onChangeText={(val) => this.setState({ last_name: val })}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email:</Text>
          <TextInput
            style={styles.input}
            value={this.state.email}
            onChangeText={(val) => this.setState({ email: val })}
            //keyboardType="email-address"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password:</Text>
          <TextInput
            style={styles.input}
            value={this.state.password}
            onChangeText={(val) => this.setState({ password: val })}
            secureTextEntry
          />
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => this.updateProfile()}
        >
          <Text style={styles.buttonText}>Save & Update</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffff",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
    paddingVertical: 50,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    marginBottom: 10,
    color: "#212121",
    fontSize: 16,
    fontWeight: "bold",
  },
  input: {
    backgroundColor: "#f4f4f4",
    borderRadius: 10, //30 for more round edge border
    height: 50,
    paddingHorizontal: 20,
    fontSize: 16,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
  button: {
    width: "80%",
    backgroundColor: "#7a7d68",
    borderRadius: 25,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  buttonText: {
    color: "#ffff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    padding: 20,
  },
});
