import React, { Screens } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import * as EmailValidator from 'email-validator';

export default class RegisterScreenC extends Screens{

  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      confirmPassword: "",
      error: "",
      submitted: false
    }

    this._onPressButton = this._onPressButton.bind(this)
  }

  _onPressButton() {
    this.setState({ submitted: true })
    this.setState({ error: "" })

    if (!(this.state.email && this.state.password && this.state.confirmPassword)) {
      this.setState({ error: "Must enter email, password and confirm password" })
      return;
    }

    if (!EmailValidator.validate(this.state.email)) {
      this.setState({ error: "Must enter valid email" })
      return;
    }

    const PASSWORD_REGEX = new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")
    if (!PASSWORD_REGEX.test(this.state.password)) {
      this.setState({ error: "Password isn't strong enough (One upper, one lower, one special, one number, at least 8 characters long)" })
      return;
    }

    if (this.state.password !== this.state.confirmPassword) {
      this.setState({ error: "Passwords do not match" })
      return;
    }

    console.log("Button clicked: " + this.state.email + " " + this.state.password + " " + this.state.confirmPassword)
    console.log("Validated and ready to send to the API")

  }

  render() {
    return (
      <View style={styles.container}>

        <View style={styles.formContainer}>
          <View style={styles.email}>
            <Text>Email:</Text>
            <TextInput
              style={{ height: 40, borderWidth: 1, width: "100%" }}
              placeholder="Enter email"
              onChangeText={email => this.setState({ email })}
              defaultValue={this.state.email}
            />

            {this.state.submitted && !this.state.email &&
              <Text style={styles.error}>*Email is required</Text>
            }
          </View>

          <View style={styles.password}>
            <Text>Password:</Text>
            <TextInput
              style={{ height: 40, borderWidth: 1, width: "100%" }}
              placeholder="Enter password"
              onChangeText={password => this.setState({ password })}
              defaultValue={this.state.password}
              secureTextEntry
            />

            {this.state.submitted && !this.state.password &&
              <Text style={styles.error}>*Password is required</Text>
            }
          </View>

          <View style={styles.password}>
            <Text>Confirm Password:</Text>
            <TextInput
              style={{ height: 40, borderWidth: 1, width: "100%" }}
              placeholder="Confirm password"
              onChangeText={confirmPassword => this.setState({ confirmPassword })}
              defaultValue={this.state.confirmPassword}
              secureTextEntry
            />

            {this.state.submitted && !this.state.confirmPassword &&
              <Text style={styles.error}>*Confirm Password is required</Text>
            }
          </View>

          {this.state.error &&
            <Text style={styles.error}>{this.state.error}</Text>
          }

          <View style={styles.registerbtn}>
            <TouchableOpacity onPress={this._onPressButton}>
              <View style={styles.button}>
                <Text style={{ color: "white" }}>Register</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
}