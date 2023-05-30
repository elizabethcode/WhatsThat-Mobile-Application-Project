// // //EditUserProfile
import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import EmailValidator from 'email-validator';
import { ScrollView } from 'react-native-web';

export default class EditUserProfile extends Component {

    constructor(props) {
        super(props);

        this.state = {
            originalData: {},
            first_name: " ",
            last_name: " ",
            email: " ",
            password: " "
        }
    }

    componentDidMount() {
        this.setState({
            originalData: this.props.route.params.data,
            first_name: this.props.route.params.data.first_name,
            last_name: this.props.route.params.data.last_name,
            email: this.props.route.params.data.email
        }, () => {
            console.log(this.state)
        })
    }

    //Update the user Profile and then send to API
    updateProfile = async () => {

        //Validation:
        if (!(this.state.email && this.state.password)) {
            this.setState({ error: "Enter an email and password" })
            return;
        } else if (!EmailValidator.validate(this.state.email)) {
            this.setState({ error: "Enter a valid email" })
            return;
        }

        let data = {}

        if (this.state.first_name !== this.state.originalData.first_name) {
            data.first_name = this.state.first_name
        }

        if (this.state.last_name !== this.state.originalData.last_name) {
            data.last_name = this.state.last_name
        }

        if (this.state.email !== this.state.originalData.email) {
            data.email = this.state.email
        }

        // Send Patch request to API
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
        <View style={styles.header}>
          <Text style={styles.headerText}> Update Profile</Text>
        </View>

        <View style={styles.MainContainer}>
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
          <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => this.updateProfile()}>
            <Text style={styles.buttonText}>Update</Text>
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
    backgroundColor: "#0d416f",
    alignItems: "center",
    justifyContent: "center",
    // paddingHorizontal: 30,
    // paddingVertical: 50,
  },
  header: {
    backgroundColor: "#F98125",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  headerText: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 10,
    marginTop: 5,
  },
  inputContainer: {
    marginBottom: 20,
    width:"60%",
  },
  label: {
    marginBottom: 10,
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  input: {
    backgroundColor: "#1A2E44",
    borderRadius: 50,
    height: 50,
    paddingHorizontal: 5,
    fontSize: 16,
    color: "#FFFFFF",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
  buttonContainer: {
    paddingBottom: 10,
    width: "60%",
    alignItems: "center",
    justifyContent: "center",

  },
  button: {
    width: "100%",
    backgroundColor: "#F98125",
    borderRadius: 25,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: 'center',
    padding: 20,
    marginLeft: 20,
    marginRight: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#FFFFFF",
  },
});
