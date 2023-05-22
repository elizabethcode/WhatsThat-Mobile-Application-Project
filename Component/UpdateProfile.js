//working
import React, { Component } from 'react';
import { Text, View, TextInput, StyleSheet, ScrollView, Alert, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import ContactScreen from './Component/ViewContacts';
// import Profile from './Component/Profile';
// import Chats from './Component/Chats';

export default class UpdateProfile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            updated_first_name: "",
            updated_last_name: "",
            error: "",
            submitted: false
        }

        this.updateprofile = this.updateprofile.bind(this)
    }

    componentDidMount() {
        this.getData();
    }
    updateprofile = async () => {
        this.setState({ submitted: true })
        this.setState({ error: "" })
        let to_send = {};

        if (!(this.state.updated_first_name)) {
            this.setState({ error: "Must enter first name" })
            return;
        }


        if (!(this.state.updated_last_name)) {
            this.setState({ error: "Must enter last name" })
            return;
        }
        else {
            this.patchData();
        }
    }

    async getData() {
        return fetch("http://localhost:3333/api/1.0.0/user/" + await AsyncStorage.getItem("whatsthat_user_id"), {
            method: "GET",
            headers: {
                'X-Authorization': await AsyncStorage.getItem("whatsthat_session_token")
            },
            //POST and PATCH use body: data
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson)
                this.setState({
                    isLoading: false,
                    profileInformation: responseJson
                })
            })
            .catch((error) => {
                console.log(error)
            })
    }

    async patchData() {
        const to_send = {}
        if (this.state.profileInformation.first_name != this.state.updated_first_name) {
            to_send.first_name = this.state.updated_first_name
        }

        if (this.state.profileInformation.last_name != this.state.updated_last_name) {
            to_send.last_name = this.state.updated_last_name
        }


        return fetch("http://localhost:3333/api/1.0.0/user/" + await AsyncStorage.getItem("whatsthat_user_id"), {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': await AsyncStorage.getItem("whatsthat_session_token")
            },
            body: JSON.stringify(to_send)
        })
            .then((response) => {
                console.log("Item updated");
                this.props.navigation.navigate('Profile')
                //Navigate to profile page
            })
            .catch((error) => {
                console.log(error);
            })
    }




    //API REquest to login

    //get the response
    //save the token and the ID
    //send to the contacts screen

    render() {
        return (
            <View style={styles.ExternalformContainer}>
                <View style={styles.formContainer}>
                    <View style={styles.email}>
                        <Text style={styles.NameTitle}>First Name:</Text>
                        <TextInput style={styles.NameInput}
                            placeholder="Enter First Name"
                            onChangeText={updated_first_name => this.setState({ updated_first_name })}
                            defaultValue={this.state.updated_first_name}
                        />

                        <>
                            {this.state.submitted && !this.state.first_name &&
                                <Text style={styles.error}>Please enter first name</Text>
                            }
                        </>
                    </View>

                    <View style={styles.formContainer}>
                        <View style={styles.email}>
                            <Text style={styles.NameTitle}>Last Name:</Text>
                            <TextInput style={styles.NameInput}
                                placeholder="Enter Last Name"
                                onChangeText={updated_last_name => this.setState({ updated_last_name })}
                                defaultValue={this.state.updated_last_name}
                            />

                            <>
                                {this.state.submitted && !this.state.last_name &&
                                    <Text style={styles.error}>Please Enter Last Name</Text>
                                }
                            </>
                        </View>

                        <View style={styles.signupbtn}>
                            <TouchableOpacity onPress={() => this.updateprofile()}>
                                <View style={styles.button}>
                                    <Text style={styles.buttonText}>Update Profile</Text>
                                </View>
                            </TouchableOpacity>
                            {/* <Text style={styles.error}>{this.state.error}</Text> */}
                        </View>
                    </View>
                </View>












            </View>



        );
    }
}

const styles = StyleSheet.create({
    ExternalformContainer:{
        backgroundColor: "#193A6F",
        width:"100%",
        height:"100%",
    },
    formContainer: {
        flex: 1,
        width: "80%",
        alignItems: "stretch",
        justifyContent: "center",
        backgroundColor: "#193A6F",
    },

    NameTitle:{
        fontSize: 18,
        color: "white",
        fontWeight: "bold",
        padding: 10, 
        textAlign: "center",

    }, 


    NameInput:{
        width:"40%",
        height: 30,
        color: "white",
        marginLeft: "20%",
        padding: 20,


    },

    // FirstNameInput: {
    //     height: 40,
    //     borderWidth: 1,
    //     width: "100%",
    //     backgroundColor:"#193A6F",
    // },
    // last_name_input: {
    //     height: 40,
    //     borderWidth: 1,
    //     width: "100%",
    // },

    email_input: {
        height: 40,
        borderWidth: 1,
        width: "100%",
    },
    password_input: {
        height: 40,
        borderWidth: 1,
        width: "100%",
    },
    formContainer: {

    },
    email: {
        marginBottom: 5
    },
    password: {
        marginBottom: 10
    },
    signupbtn: {

    },
    signup: {
        justifyContent: "center",
        textDecorationLine: "underline"
    },
    button: {
        backgroundColor: '#F98125',
        borderRadius: 60,
        width: "50%",
        marginLeft: "25%",
        marginTop: 13,
        padding: 5,
    },
    buttonText: {
        textAlign: 'center',
        padding: 8,
        color: 'white',
        fontWeight: "bold",
        fontSize: 14,
    },
    error: {
        color: "red",
        fontWeight: '900'
    }
});