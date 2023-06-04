//Account profile - working 
// import React, { Component } from "react";
// import {
//   StyleSheet,
//   Text,
//   View,
//   Image,
//   TouchableOpacity,
//   ScrollView,
// } from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// export default class AccountProfile extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       photo: null,
//       profile: {},
//       loading: true,
//     };
//   }

//   componentDidMount() {
//     this.unsubscribe = this.props.navigation.addListener("focus", () => {
//       this.LoginStatus();
//       this.getProfilePic();
//       this.getData();
//     });
//   }

//   componentWillUnmount() {
//     this.unsubscribe();
//   }

//   //checking weather user has logged in or not
//   LoginStatus = async () => {
//     const value = await AsyncStorage.getItem("@whatsThat_session_token");
//     if (value === null) {
//       this.props.navigation.navigate("Login");
//     }
//   };

//   getProfilePic = async () => {
//     const user_id = await AsyncStorage.getItem("whatsThat_user_id");
//     const token = await AsyncStorage.getItem("@whatsThat_session_token");

//     if (user_id && token) {
//       try {
//         const response = await fetch(
//           `http://localhost:3333/api/1.0.0/user/${user_id}/photo`,
//           {
//             method: "GET",
//             headers: {
//               "X-Authorization": token,
//               "Content-Type": "DisplayImage",
//             },
//           }
//         );

//         if (response.ok) {
//           const responseBlob = await response.blob();
//           const data = URL.createObjectURL(responseBlob);
//           this.setState({
//             photo: data,
//             loading: false,
//           });
//         } else {
//           throw new Error("Failed to fetch profile picture");
//         }
//       } catch (error) {
//         console.log(error);
//       }
//     } else {
//       console.log("User ID or session token is missing");
//     }
//   };

//   getData = async () => {
//     const user_id = await AsyncStorage.getItem("whatsThat_user_id");
//     const token = await AsyncStorage.getItem("@whatsThat_session_token");

//     if (user_id && token) {
//       try {
//         const response = await fetch(
//           `http://localhost:3333/api/1.0.0/user/${user_id}`,
//           {
//             headers: {
//               "X-Authorization": token,
//             },
//           }
//         );

//         if (response.status === 200) {
//           const profileData = await response.json();
//           this.setState({
//             profile: profileData,
//             loading: false,
//           });
//         } else {
//           throw new Error("Failed to fetch user information");
//         }
//       } catch (error) {
//         console.log(error);
//       }
//     } else {
//       console.log("User ID or session token is missing");
//     }
//   };

//   logoutSubmit = async () => {
//     console.log("Logout");

//     try {
//       const response = await fetch("http://localhost:3333/api/1.0.0/logout", {
//         method: "POST",
//         headers: {
//           "X-Authorization": await AsyncStorage.getItem(
//             "@whatsThat_session_token"
//           ),
//         },
//       });

//       if (response.status === 200) {
//         await AsyncStorage.removeItem("@whatsThat_session_token");
//         await AsyncStorage.removeItem("whatsThat_user_id");
//         this.props.navigation.navigate("Login");
//       } else if (response.status === 401) {
//         console.log("Unauthorised");
//         await AsyncStorage.removeItem("@whatsThat_session_token");
//         await AsyncStorage.removeItem("whatsThat_user_id");
//         this.props.navigation.navigate("Login");
//       } else if (response.status === 500) {
//         console.log("Server Error");
//         await AsyncStorage.removeItem("@whatsThat_session_token");
//         await AsyncStorage.removeItem("whatsThat_user_id");
//         this.props.navigation.navigate("Login");
//       } else {
//         throw new Error("Server Error");
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   render() {
//     const navigation = this.props.navigation;

//     if (this.state.loading) {
//       return <Text>Loading...</Text>;
//     } else {
//       return (
//         <ScrollView>
//           <View style={styles.header}>
//             <Text style={styles.headerText}>Users List</Text>
//           </View>
//           <View style={styles.container}>
//             <Image
//               source={{
//                 uri: this.state.photo,
//               }}
//               style={styles.profileImage}
//             />

//             <TouchableOpacity style={styles.button} onPress={() =>
//               navigation.navigate("EditProfilePic", {
//                 data: this.state.profile,
//               })
//             }
//             >
//               <Text style={styles.buttonText}>Edit Profile Photo</Text>
//             </TouchableOpacity>

//             <View style={styles.inputContainer}>
//               <Text style={styles.label}>
//                 Name: {this.state.profile.first_name}{" "}
//                 {this.state.profile.last_name}
//               </Text>
//               <Text style={styles.label}>
//                 Email: {this.state.profile.email}{" "}
//               </Text>

//               <TouchableOpacity
//                 style={styles.button}
//                 onPress={() =>
//                   navigation.navigate("EditUserProfile", {
//                     data: this.state.profile,
//                   })
//                 }
//               >
//                 <Text style={styles.buttonText}>Edit Profile</Text>
//               </TouchableOpacity>

//               <TouchableOpacity
//                 style={styles.button}
//                 onPress={this.logoutSubmit}
//               >
//                 <Text style={styles.buttonText}>Logout</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </ScrollView>
//       );
//     }
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//     paddingHorizontal: 30,
//     paddingVertical: 50,
//     backgroundColor: "#193A6F",
//     height: "100%",
//   },
//   header: {
//     backgroundColor: "#F98125",
//     paddingVertical: 15,
//     paddingHorizontal: 20,
//   },
//   headerText: {
//     fontSize: 25,
//     fontWeight: "bold",
//     color: "#FFFFFF",
//     textAlign: "center",
//     marginBottom: 10,
//     marginTop: 10,

//   },
//   // title: {
//   //   fontSize: 20,
//   //   fontWeight: "bold",
//   //   color: "#FFFFFF",
//   //   textAlign: "center",
//   //   marginBottom: 20,
//   // },
//   profileImage: {
//     width: 180,
//     height: 180,
//     borderWidth: 4,
//     borderStyle: "solid",
//     borderColor: "#F98125",
//     borderRadius: 200,
//     marginTop: -35,
//   },
//   inputContainer: {
//     marginBottom: 0,
//   },
//   label: {
//     // marginBottom: 10,
//     color: "#F98125",
//     fontSize: 16,
//     fontWeight: "bold",
//   },
//   button: {
//     width: "80%",
//     backgroundColor: "#F98125",
//     borderRadius: 25,
//     height: 50,
//     justifyContent: "center",
//     alignItems: "center",
//     marginTop: 10,
//   },
//   buttonText: {
//     color: "white",
//     fontSize: 18,
//     fontWeight: "bold",
//     textAlign: "center",
//   },
// });




//AccountProfile.js - my edit
import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default class AccountProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      profile: {},
      photo: null,      
      loading: true,
    };
  }

  componentDidMount() {
    this.unsubscribe = this.props.navigation.addListener("focus", () => {
      this.LoginStatus();
      this.RetrievingProfilePicture();
      this.RetrievingData();
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  //checking whether user has logged in or not
  LoginStatus = async () => {
    const value = await AsyncStorage.getItem("app_session_token");
    if (value === null) {
      this.props.navigation.navigate("Login");
    }
  };

  // Retrieves profile picture from the server
  RetrievingProfilePicture = async () => {
    const user_id = await AsyncStorage.getItem("whatsThat_user_id");
    const token = await AsyncStorage.getItem("app_session_token");

    if (user_id && token) {
      try {
        const response = await fetch(
          `http://localhost:3333/api/1.0.0/user/${user_id}/photo`,
          {
            method: "GET",
            headers: {
              "X-Authorization": token,
              "Content-Type": "DisplayImage",
            },
          }
        );

        if (response.ok) {
          const responseBlob = await response.blob();
          const data = URL.createObjectURL(responseBlob);
          this.setState({
            photo: data,
            loading: false,
          });
        } else {
          throw new Error("Failed to fetch profile picture");
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("User ID or session token is missing");
    }
  };

  // Retrieves user data from the server
  RetrievingData = async () => {
    const token = await AsyncStorage.getItem("app_session_token");
    const user_id = await AsyncStorage.getItem("whatsThat_user_id");   

    if (user_id && token) {
      try {
        const response = await fetch(
          `http://localhost:3333/api/1.0.0/user/${user_id}`,
          {
            headers: {
              "X-Authorization": token,
            },
          }
        );

        if (response.status === 200) {
          const profileData = await response.json();
          this.setState({
            profile: profileData,
            loading: false,
          });
        } else {
          throw new Error("Failed to fetch user information");
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("User ID or session token is missing");
    }
  };

  // Logs out the user by sending a request to the server
  LogoutSubmit = async () => {
    console.log("Logout");

    try {
      const response = await fetch("http://localhost:3333/api/1.0.0/logout", {
        method: "POST",
        headers: {
          "X-Authorization": await AsyncStorage.getItem(
            "app_session_token"
          ),
        },
      });

      if (response.status === 200) {
        await AsyncStorage.removeItem("app_session_token");
        await AsyncStorage.removeItem("whatsThat_user_id");
        this.props.navigation.navigate("Login");
      } else if (response.status === 401) {
        console.log("Unauthorised");
        await AsyncStorage.removeItem("app_session_token");
        await AsyncStorage.removeItem("whatsThat_user_id");
        this.props.navigation.navigate("Login");
      } else if (response.status === 500) {
        console.log("Server Error");
        await AsyncStorage.removeItem("app_session_token");
        await AsyncStorage.removeItem("whatsThat_user_id");
        this.props.navigation.navigate("Login");
      } else {
        throw new Error("Server Error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const navigation = this.props.navigation;

    if (this.state.loading) {
      return <Text>Loading...</Text>;
    } else {
      return (
        <View style={styles.OuterContainer}>
          <View style={styles.Header}>
            <Text style={styles.HeaderText}>Profile</Text>
          </View>
          <View style={styles.MainContainer}>
            <Image
              source={{
                uri: this.state.photo,
              }}
              style={styles.ProfilePhoto}
            />
            <View style={styles.InputContainer}>
              <Text style={styles.Heading}>
                Name: {this.state.profile.first_name}{" "}
                {this.state.profile.last_name}
              </Text>
              <Text style={styles.Heading}>
                Email: {this.state.profile.email}{" "}
              </Text>
            </View>
            <TouchableOpacity style={styles.Button}
              onPress={() =>
                navigation.navigate("EditProfilePic", {
                  data: this.state.profile,
                })
              }
            >
              <Text style={styles.TextButton}>Update Profile Picture</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.Button}
              onPress={() =>
                navigation.navigate("EditUserProfile", {
                  data: this.state.profile,
                })
              }
            >
              <Text style={styles.TextButton}>Update Profile</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.Button}
              onPress={this.LogoutSubmit}
            >
              <Text style={styles.TextButton}>Logout</Text>
            </TouchableOpacity>

          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  OuterContainer:{
    height:"100%",
  },
  MainContainer: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#193A6F",
    justifyContent: "center",
  },
  Header: {    
    paddingVertical: 10,
    backgroundColor: "#F98125",
    paddingHorizontal: 15,
  },
  HeaderText: {
    fontWeight: "bold",
    marginBottom: 10,
    fontSize: 25,
    textAlign: "center",
    marginTop: 5,
    color: "#FFFFFF",
  },
  ProfilePhoto: {
    borderStyle: "solid",
    borderWidth: 4,
    borderColor: "#F98125",
    borderRadius: 200,
    height: 180,
    width: 180,
  },
  InputContainer: {
  },
  Heading: {
    fontSize: 16,
    color: "#FFFFFF",
    marginBottom: 5,
    fontWeight: "bold",
    marginTop: 10,
  },
  Button: {
    width: "60%",
    marginTop: 10,
    borderRadius: 25,
    backgroundColor: "#F98125",
    alignItems: "center",
    height: 50,
    justifyContent: "center",
  },
  TextButton: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
});
