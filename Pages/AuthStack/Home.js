// //Home
// import { Component } from "react";
// import React from "react";
// import { StyleSheet, Text, View, Image } from "react-native";

// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// const Tab = createBottomTabNavigator();

// export default class Home extends Component {
//   //Check Login Successful
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
//     if (value == null) {
//       // if (value != null) {
//       this.props.navigation.navigate("Login");
//     }
//   };

//   render() {
//     const navigation = this.props.navigation;

//     return (
//       <View style={styles.container}>
//         {/* <Image
//          source={require("C:\Users\20012922.AD.001\OneDrive - MMU\Mcomp Computer Science\Year 3\Mobile Application\Assignment\MAD Assignment\WhatsThatAppProject-main\whatsThatLogo.png")}
//           style={styles.imageInfo} 
// /> */}
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#ffff", //White
//     alignItems: "center",
//     justifyContent: "center",
//     paddingHorizontal: 30,
//     paddingVertical: 50,
//   },
//   imageInfo: {
//     width: 200,
//     height: 200,
//     marginBottom: 70,
//   },
//   appView: {
//     backgroundColor: "#f4f4f4", //slight white //Text Input colour #d6d9d0
//     borderRadius: 30,
//     width: "70%",
//     height: 45,
//     marginBottom: 20,
//     alignItems: "center",
//   },
//   TextInput: {
//     height: 50,
//     flex: 1,
//     padding: 10,
//     marginLeft: 20,
//   },
//   createAccountButton: {
//     height: 30,
//     marginBottom: 30,
//     textDecorationLine: "underline",
//   },
// });
