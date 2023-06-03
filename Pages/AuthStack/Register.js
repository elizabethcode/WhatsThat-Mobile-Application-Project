// // Register - working s 
// import { StatusBar } from "expo-status-bar";
// import React, { Component } from "react";
// import { Text, TextInput, View, StyleSheet, TouchableOpacity,ScrollView } from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { globalStyles } from '../../globalStyles';
// import * as EmailValidator from "email-validator";

// export default class Register extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       firstName: "",
//       lastName: "",
//       email: "",
//       password: "",
//       confirmPassword: "",
//       error: "",
//       submitted: false,
//     };

//     this._onSubmitSignup = this._onSubmitSignup.bind(this);
//   }

//   _onSubmitSignup() {
//     this.setState({ submitted: true });
//     this.setState({ error: "" });

//     if (
//       !(
//         this.state.email &&
//         this.state.password &&
//         this.state.firstName &&
//         this.state.lastName &&
//         this.state.confirmPassword
//       )
//     ) {
//       this.setState({ error: "Enter the required fields" });
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

//       this.signupSubmit();
//     }
//   }

//   //Send signup request to API

//   signupSubmit = async () => {
//     const data = {
//       first_name: this.state.firstName,
//       last_name: this.state.lastName,
//       email: this.state.email,
//       password: this.state.password,
//     };

//     console.log(data);

//     fetch("http://localhost:3333/api/1.0.0/user", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(data),
//     })
//       .then((response) => {
//         if (response.status === 201) {
//           return response.json();
//         } else if (response.status === 400) {
//           throw "Email already exists or Invalid email or password";
//         } else {
//           throw "Something went wrong";
//         }
//       })
//       .then((response) => {
//         console.log(response);
//         this.setState({ error: "User added successfully" });
//         this.setState({ submitted: false });
//         this.props.navigation.navigate("Login");
//       })
//       .then(async (rJson) => {
//         console.log(rJson);
//         await AsyncStorage.setItem(
//           "app_session_token",
//           rJson.token
//         );
//         this.props.navigation.navigate("Login"); //Navigate to login page after user registers their account
//       })
//       .catch((error) => {
//         console.log(error);
//         this.setState({ error: error });
//         this.setState({ submitted: false });
//       });
//   };

//   render() {
//     const navigation = this.props.navigation;
//     const {
//       firstName,
//       lastName,
//       email,
//       password,
//       confirmPassword,
//       error,
//       submitted,
//     } = this.state;

//     return (
//       <ScrollView>
//       <View style={globalStyles.OutterContainer}>
//         <View style={globalStyles.header}>
//           <Text style={globalStyles.headerText}>Register</Text>
//         </View>
//         <View style={styles.container}>
//           <StatusBar style="auto" />

//           <View style={styles.appView}>
//             <Text style={styles.inputTitle}>Forename</Text>

//             <TextInput
//               style={styles.TextInput}
//               onChangeText={(firstName) => this.setState({ firstName })}
//               defaultValue={firstName}
//             />

//             <>
//               {submitted && !firstName && (
//                 <Text style={styles.errorMsg}>*Must enter a forename</Text>
//               )}
//             </>

//           </View>

//           <View style={styles.appView}>
//             <Text style={styles.inputTitle}>Surname</Text>
//             <TextInput
//               style={styles.TextInput}
//               onChangeText={(lastName) => this.setState({ lastName })}
//               defaultValue={lastName}
//             />

//             <>
//               {submitted && !lastName && (
//                 <Text style={styles.errorMsg}>*Must enter a surname</Text>
//               )}
//             </>
//           </View>

//           <View style={styles.appView}>
//             <Text style={styles.inputTitle}>Email</Text>
//             <TextInput
//               style={styles.TextInput}
//               onChangeText={(email) => this.setState({ email })}
//               defaultValue={email}
//             />
//             <>
//               {submitted && !email && (
//                 <Text style={styles.errorMsg}>*Must enter an email</Text>
//               )}
//             </>

//           </View>

//           <View style={styles.appView}>
//             <Text style={styles.inputTitle}>Password</Text>
//             <TextInput
//               style={styles.TextInput}
//               onChangeText={(password) => this.setState({ password })}
//               defaultValue={password}
//               secureTextEntry={true}
//             />

//             <>
//               {submitted && !password && (
//                 <Text style={styles.errorMsg}>*Must enter a password</Text>
//               )}
//             </>
//           </View>

//           <View style={styles.appView}>
//             <Text style={styles.inputTitle}>Confirm Password</Text>
//             <TextInput
//               style={styles.TextInput}
//               onChangeText={(confirmPassword) =>
//                 this.setState({ confirmPassword })
//               }
//               defaultValue={confirmPassword}
//               secureTextEntry={true}
//             />

//             <>
//               {submitted && confirmPassword !== password && (
//                 <Text style={styles.errorMsg}>*Passwords do not match</Text>
//               )}
//             </>
//           </View>

//             <TouchableOpacity onPress={() => navigation.navigate("Login")}>
//               <Text style={styles.createAccountButton}>
//                 Already have an account? Sign In
//               </Text>
//             </TouchableOpacity>

//           <View>
//             {error && (
//               <Text style={styles.errorMsg}>{error}</Text>
//             )}
//           </View>
//           <View style={styles.buttonContainer}>
//             <View style={styles.button}>
//               <TouchableOpacity onPress={this._onSubmitSignup}>
//                 <Text style={styles.buttonText}>Register</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//       </View>
//       </ScrollView>
//     );
//   }
// }


// const styles = StyleSheet.create({
//   // OutterContainer:{
//   //   height:"100%",
//   // },
//   container: {
//     flex: 1,
//     backgroundColor: "#0d416f",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   // header: {
//   //   backgroundColor: "#F98125",
//   //   paddingVertical: 10,
//   //   paddingHorizontal: 15,
//   // },
//   // headerText: {
//   //   fontSize: 25,
//   //   fontWeight: "bold",
//   //   color: "#FFFFFF",
//   //   textAlign: "center",
//   //   marginBottom: 10,
//   //   marginTop: 5,
//   // },
//   appView: {
//     backgroundColor: "#f4f4f4",
//     borderRadius: 50,
//     width: "60%",
//     height: 45,
//     marginTop: 20,
//     marginBottom: 20,
//     flexDirection: "row",
//     alignItems: "center",
//     paddingHorizontal: 10,
//   },
//   TextInput: {
//     flex: 1,
//     paddingLeft: 10,
//     color: "black",
//     borderRadius: 50,
//     width: "100%",
//     height: "100%",
//   },
//   inputTitle: {
//     fontWeight: "bold",
//     marginRight: 10,
//     color: "#333333",
//   },
//   createAccountButton: {
//     marginBottom: -15,
//     textDecorationLine: "underline",
//     color: "#FFFFFF",
//   },
//   buttonContainer: {
//     paddingBottom: 14,
//     width: "60%",
//     alignItems: "center",
//     justifyContent: "center",

//   },
//   button: {
//     width: "100%",
//     backgroundColor: "#F98125",
//     borderRadius: 25,
//     height: 50,
//     justifyContent: "center",
//     alignItems: "center",
//     marginTop: 30,
//   },
//   buttonText: {
//     color: "#FFFFFF",
//     fontSize: 18,
//     fontWeight: "bold",
//     textAlign: "center",
//     padding: 20,
//   },
//   errorMsg: {
//     color: "red",
//     fontWeight: "650",
//     marginTop: 25,
//     textAlign: "center",
//   },
// });













// Register- Completed
import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import { Text, TextInput, View, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { globalStyles } from '../../globalStyles';
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
        <View style={globalStyles.OutterContainer}>
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
              <TextInput
                style={styles.TextInput}
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
              <Text style={styles.LoginButton}>
                Already have an account? Login
              </Text>
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
    backgroundColor: "#0d416f",
    alignItems: "center",
    justifyContent: "center",
  },
  FormField: {
    backgroundColor: "#f4f4f4",
    borderRadius: 50,
    width: "60%",
    height: 45,
    marginTop: 20,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  TextInput: {
    flex: 1,
    paddingLeft: 10,
    color: "black",
    borderRadius: 50,
    width: "100%",
    height: "100%",
  },
  TitleInput: {
    fontWeight: "bold",
    marginRight: 10,
    color: "#333333",
  },
  LoginButton: {
    marginBottom: -15,
    textDecorationLine: "underline",
    color: "#FFFFFF",
  },
  ButtonContainer: {
    paddingBottom: 14,
    width: "60%",
    alignItems: "center",
    justifyContent: "center",

  },
  Button: {
    width: "100%",
    backgroundColor: "#F98125",
    borderRadius: 25,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
  TextButton: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    padding: 20,
  },
  ErrorMessage: {
    color: "red",
    fontWeight: "650",
    marginTop: 25,
    textAlign: "center",
  },
});









