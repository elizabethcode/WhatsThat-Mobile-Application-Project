// //Login
// import { StatusBar } from "expo-status-bar";
// import React, { Component } from "react";
// import {
//   StyleSheet,
//   Text,
//   View,
//   Image,
//   TextInput,
//   TouchableOpacity,
// } from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// import * as EmailValidator from "email-validator";

// export default class Login extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       email: "user1@gmail.com",
//       password: "Password123!", 
//       error: "",
//       submitted: false,
//     };

//     this._onSubmitLogin = this._onSubmitLogin.bind(this);
//   }

//   _onSubmitLogin() {
//     this.setState({ submitted: true });
//     //reset error message
//     this.setState({ error: "" });

//     //validate email and password

//     if (!(this.state.email && this.state.password)) {
//       this.setState({ error: "Enter a email and password" });
//       return;
//     } else if (!EmailValidator.validate(this.state.email)) {
//       this.setState({ error: "Enter a valid email" });
//       return;
//     }

//     const PASSWORD_REGEX = new RegExp(
//       "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
//     );

//     if (!PASSWORD_REGEX.test(this.state.password)) {
//       this.setState({
//         error:
//           "Password is too weak. Only use, numbers, letters(One upper and one Lower), and these special characters:?=.*?[#?!@$%^&*-",
//       });
//       return;
//     } else {
//       console.log(
//         "Button clicked: " + this.state.email + " " + this.state.password
//       );
//       console.log("Validated and ready to send to the API");

//       this.loginSubmit;
//     }
//   }

//   //Send login request to API

//   loginSubmit = async () => {
//     const data = {
//       email: this.state.email,
//       password: this.state.password,
//     };

//     console.log(data);

//     fetch("http://localhost:3333/api/1.0.0/login", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(data),
//     })
//       .then((response) => {
//         if (response.status === 200) {
//           return response.json();
//         } else if (response.status === 400) {
//           throw "Invalid email or password";
//         } else {
//           throw "Something went wrong";
//         }
//       })
//       .then(async (responseJson) => {
//         console.log(responseJson);
//         try {
//           await AsyncStorage.setItem("whatsThat_user_id", responseJson.id);
//           await AsyncStorage.setItem(
//             "@whatsThat_session_token",
//             responseJson.token
//           ); //Store the session token

//           this.setState({ Submitted: false });

//           this.props.navigation.navigate("Home"); //navigate to MainApp screen
//         } catch {
//           throw "Something went wrong";
//         }
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };

//   //Check Login Successful - Send to MainApp if already logged in

//   componentDidMount() {
//     this.unsubscribe = this.props.navigation.addListener("focus", () => {
//       this.checkLoggedIn();
//     });
//   }

//   componentWillUnmount() {
//     this.unsubscribe();
//   }

//   checkLoggedIn = async () => {
//     const value = await AsyncStorage.getItem("@whatsThat_session_token");
//     if (value != null) {
//       // if (value == null) { if then go to Home
//       this.props.navigation.navigate("Home");
//     }
//   };

//   render() {
//     const navigation = this.props.navigation;
//     return (
//       <View style={styles.container}>
//         <StatusBar style="auto" />
//         <View style={styles.appView}>
//           <View style={styles.email}>
//             <TextInput
//               style={styles.TextInput}
//               //value={email}
//               placeholder="Enter your Email:"
//               placeholderTextColor="#7a7d68" //text colour
//               onChangeText={(email) => this.setState({ email })}
//               defaultValue={this.state.email}
//             />

//             <>
//               {this.state.submitted && !this.state.email && (
//                 <Text style={styles.errorMsg}>*Email is required</Text>
//               )}
//             </>
//           </View>
//         </View>

//         <View style={styles.appView}>
//           {/* <View style={styles.password}> */}
//           <TextInput
//             style={styles.TextInput}
//             placeholder="Enter your Password:"
//             placeholderTextColor="#7a7d68" //text colour
//             onChangeText={(password) => this.setState({ password })}
//             defaultValue={this.state.password}
//             secureTextEntry={true}
//           />

//           <>
//             {this.state.submitted && !this.state.password && (
//               <Text style={styles.errorMsg}>*Password is required</Text>
//             )}
//           </>
//         </View>

//         <View>
//           <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
//             <Text style={styles.createAccountButton}>
//               Don't have an account?
//             </Text>
//           </TouchableOpacity>
//         </View>

//         <View style={styles.button}>
//           <TouchableOpacity onPress={this.loginSubmit}>
//             <View>
//               <Text style={styles.buttonText}>LOGIN</Text>
//             </View>
//           </TouchableOpacity>
//         </View>

//         <>
//           {this.state.error && (
//             <Text style={styles.errorMsg}>{this.state.error}</Text>
//           )}
//         </>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#ffff",
//     alignItems: "center",
//     justifyContent: "center",
//     paddingHorizontal: 30,
//     paddingVertical: 50,
//   },
//   imageLogo: {
//     width: 200,
//     height: 200,
//     marginBottom: 70,
//   },
//   appView: {
//     backgroundColor: "#f4f4f4", //slight white //Text Input colour #d6d9d0
//     borderRadius: 10, //change to 30 for more round edges
//     width: "70%",
//     height: 45,
//     marginBottom: 20,
//     flexDirection: "row", // added this to align the icon and input field horizontally
//     alignItems: "center",
//     paddingHorizontal: 10, // added padding to the input field to align text properly
//   },
//   buttonText: {
//     height: 50,
//     flex: 1,
//     padding: 10,
//     marginLeft: 20,
//     paddingLeft: 10, // added padding to the input field to align text properly
//   },
//   createAccountButton: {
//     height: 30,
//     marginBottom: 30,
//     textDecorationLine: "underline",
//     marginTop: 20, // added margin to separate the create account button from the login button
//   },
//   button: {
//     width: "80%",
//     backgroundColor: "#7a7d68",
//     borderRadius: 25,
//     height: 50,
//     justifyContent: "center",
//     alignItems: "center",
//     marginTop: 40,
//   }, //login button colour #7a7d68 #b8beb2
//   buttonText: {
//     color: "#ffff",
//     fontSize: 18,
//     fontWeight: "bold",
//     textAlign: "center",
//     padding: 20,
//   },
//   errorMsg: {
//     color: "red",
//     fontWeight: "650",
//     marginBottom: 10,
//     textAlign: "center",
//   },
// });























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
      email: "user.1@gmail.com",
      password: "Password123!",
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
        const responseJson = await response.json();

        await AsyncStorage.setItem("whatsThat_user_id", responseJson.id);
        await AsyncStorage.setItem("@whatsThat_session_token", responseJson.token);

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
    const value = await AsyncStorage.getItem("@whatsThat_session_token");
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
            <Text style={styles.errorMsg}>*Email is required</Text>
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
            <Text style={styles.errorMsg}>*Password is required</Text>
          )}
        </View>

        <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
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
