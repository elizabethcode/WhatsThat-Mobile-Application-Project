//AccountProfile
import React, { Component } from "react";
import {View, Text, Image, TouchableOpacity, StyleSheet} from "react-native";
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
    const SessionToken = await AsyncStorage.getItem("app_session_token");
    if (SessionToken === null) {
      this.props.navigation.navigate("Login");
    }
  };

  // Retrieves profile picture from the server
  RetrievingProfilePicture = async () => {
    const user_id = await AsyncStorage.getItem("whatsThat_user_id");
    const SessionToken = await AsyncStorage.getItem("app_session_token");

    if (user_id && SessionToken) {
      try {
        const response = await fetch(
          `http://localhost:3333/api/1.0.0/user/${user_id}/photo`,
          {
            method: "GET",
            headers: {
              "X-Authorization": SessionToken,
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
          throw new Error("Unable to fetch profile picture");
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("Unable to Find Session Token or User ID");
    }
  };

  // Retrieves user data from the server
  RetrievingData = async () => {
    const SessionToken = await AsyncStorage.getItem("app_session_token");
    const user_id = await AsyncStorage.getItem("whatsThat_user_id");   

    if (user_id && SessionToken) {
      try {
        const response = await fetch(
          `http://localhost:3333/api/1.0.0/user/${user_id}`,
          {
            headers: {
              "X-Authorization": SessionToken,
            },
          }
        );

        console.log(response.status, SessionToken)
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
      console.log("Missing User ID or session Token");
    }
  };

  // Logs out the user by sending a request to the server
  LogoutSubmit = async () => {
    console.log("Logout");

    try {
      const response = await fetch("http://localhost:3333/api/1.0.0/logout", {
        method: "POST",
        headers: {
          "X-Authorization": await AsyncStorage.getItem("app_session_token"),
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
              source={{uri: this.state.photo}}  
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
                navigation.navigate("UpdatingProfilePhoto", {
                  data: this.state.profile,
                })
              }
            >
              <Text style={styles.TextButton}>Update Profile Picture</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.Button}
              onPress={() =>
                navigation.navigate("UpdatingUserProfile", {
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
    marginTop: 5,
    fontSize: 25,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 10,
    color: "#FFFFFF",
  },
  ProfilePhoto: {
    borderStyle: "solid",
    width: 180,
    borderColor: "#F98125",
    borderRadius: 200,
    borderWidth: 4,
    height: 180,

  },
  InputContainer: {
  },
  Heading: {
    marginTop: 10,
    color: "#FFFFFF",
    marginBottom: 5,
    fontSize: 16,
    fontWeight: "bold",
  },
  Button: {
    width: "60%",
    marginTop: 10,
    alignItems: "center",
    borderRadius: 25,
    height: 50,
    backgroundColor: "#F98125",
    justifyContent: "center",
  },
  TextButton: {
    fontWeight: "bold",
    fontSize: 18,
    color: "white",
    textAlign: "center",
  },
});
