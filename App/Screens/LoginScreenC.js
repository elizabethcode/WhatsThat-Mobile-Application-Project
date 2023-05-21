import { NavigationContainer } from "@react-navigation/native";
import React, { useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import * as EmailValidator from 'email-validator';

const NavigateToHome = props => {
  props.navigation.navigate('Home')
}

const LoginScreen = props => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }

    if (!EmailValidator.validate(email)) {
      setError("Please enter a valid email.");
      return;
    }

    if(!(this.state.email && this.state.password)){
      this.setState({error: "Must enter email and password"})
      return;
  }

  if(!EmailValidator.validate(this.state.email)){
      this.setState({error: "Must enter valid email"})
      return;
  }

  const PASSWORD_REGEX = new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")
  if(!PASSWORD_REGEX.test(this.state.password)){
      this.setState({error: "Password isn't strong enough (One upper, one lower, one special, one number, at least 8 characters long)"})
      return;
  }


  console.log("Button clicked: " + this.state.email + " " + this.state.password)
  console.log("Validated and ready to send to the API")

    // Perform login operation here, e.g. check email and password against a database or API.
    // If login is successful, navigate to the desired screen using props.navigation.navigate().
    // For example:
    props.navigation.navigate('Dashboard');
  }

  return (
    <View style={styles.container}>
      <View style={styles.logTopView}>
        <View style={styles.inputContainer}>
          <View style={styles.EmailBox}>
            <Text style={styles.Titles}>Email</Text>
            <View style={styles.inputs}>
              <TextInput
                placeholder="Enter your email"
                value={email}
                onChangeText={setEmail}
                style={styles.input}
                autoCapitalize="none"
                keyboardType="email-address"
              />
            </View>
          </View>
          <View style={styles.passwordBox}>
            <Text style={styles.Titles}>Password</Text>
            <View style={styles.inputs}>
              <TextInput
                placeholder="Enter your password"
                value={password}
                onChangeText={setPassword}
                style={styles.input}
                secureTextEntry
              />
            </View>
          </View>
        </View>
      </View>
      <View style={styles.logBottomView}>
        <Text style={styles.errorText}>{error}</Text>
        <View style={styles.LoginButton}>
          <Button style={styles.Buttons}
            title="Login"
            onPress={handleLogin}
          />
        </View>
        <View style={styles.HomeButton}>
          <Button style={styles.Buttons}
            title="Back to Home"
            onPress={() => NavigateToHome(props)}
          />
        </View>
      </View>
    </View>
  );
}

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logTopView: {
    flex: 1,
    backgroundColor: '#093F6E',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    height: '70%',
  },
  logBottomView: {
    flex: 1,
    backgroundColor: '#093F6E',
    flexDirection: 'column',
    paddingLeft: "40%",
    paddingRight: "40%",
    width: '100%',
    height: '30%',
  },
  inputContainer: {
    backgroundColor: "#093F6E",
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: "40%",
    marginTop: 100,
  },
  inputs: {
    backgroundColor: 'orange',
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderRadius: 4,
    borderColor: "black",
    width: "130%",
    justifyContent: "center",
    alignItems: "center",
  },

  input: {
    padding: 2,
    width: "100%"
  },

 passwordBox: {
    marginRight: "10%",
  },

 Titles: {
      paddingTop: 20,
      paddingBottom: 10,
      fontSize: 18,
      fontWeight: "bold",
      color: "white",
  },

  EmailBox: {
    marginRight: "10%",
  },

  LoginButton: {
    width: "100%",
    paddingTop: 70,
  },

  HomeButton: {
    paddingTop: 60,
    width: "100%",
  },






});
