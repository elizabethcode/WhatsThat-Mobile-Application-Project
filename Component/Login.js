import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import * as EmailValidator from 'email-validator';
import { globalStyles } from '../globalStyles';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default class LoginScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            //user.1@gmail.com
            //Password123!


            email: 'user.1@gmail.com',
            password: 'Password123!',
            error: '',
            submitted: false,
        };

        this.loginbutton = this.loginbutton.bind(this);
    }

    loginbutton = async () => {
        console.log('Hello');

        this.setState({ submitted: true });
        this.setState({ error: '' });

        if (!(this.state.email && this.state.password)) {
            this.setState({ error: 'Please enter a email and password' });
            return;
        }

        if (!EmailValidator.validate(this.state.email)) {
            this.setState({ error: 'Please enter a valid email' });
            return;
        }

        const PASSWORD_REGEX = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$');
        if (!PASSWORD_REGEX.test(this.state.password)) {
            this.setState({ error: "Please enter a stronger password. It must be 8 character long with a mixture of uppercase and lowercase letters and have special characters and numbers" });
            return;
        }

        console.log('HERE:', this.state.email, this.state.password);

        return fetch('http://localhost:3333/api/1.0.0/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
                {
                    email: this.state.email,
                    password: this.state.password,
                },
            ),
        })
            .then((response) => {
                if (response.status === 200) {
                    return response.json();
                } if (response.status === 400) {
                    throw 'Invalid email or password';
                } else {
                    throw 'Something wrent wrong';
                }
            })
            .then(async (rJson) => {
                console.log(rJson);
                try {
                    await AsyncStorage.setItem('whatsthat_user_id', rJson.id);
                    await AsyncStorage.setItem('whatsthat_session_token', rJson.token);

                    this.setState({ submitted: false });

                    this.props.navigation.navigate('MainAppNavigation');
                } catch {
                    throw 'Something wrent wrong';
                }
            });
    };
    // API REquest to login
    // get the response
    // save the token and the ID
    // send to the contacts screen
    // API REquest to login
    // get the response
    // save the token and the ID
    // send to the contacts screen

    render() {
        return (
            <View style={styles.formContainer}>
                <View style={styles.email}>
                    <Text style={globalStyles.Titles}>Email:</Text>
                    <TextInput
                        style={styles.email_input}
                        placeholder="Enter email"
                        onChangeText={(email) => this.setState({ email })}
                        defaultValue={this.state.email}
                    />

                    <>
                        {this.state.submitted && !this.state.email
                            && <Text style={styles.error}>Email is required</Text>}
                    </>
                </View>

                <View style={styles.password}>
                    <Text style={globalStyles.Titles}>Password:</Text>
                    <TextInput
                        style={styles.password_input}
                        placeholder="Enter password"
                        onChangeText={(password) => this.setState({ password })}
                        defaultValue={this.state.password}
                        secureTextEntry
                    />

                    <>
                        {this.state.submitted && !this.state.password
                            && <Text style={styles.error}>Password is required</Text>}
                    </>
                </View>

                <View style={styles.loginbtn}>
                    <TouchableOpacity onPress={() => this.loginbutton()}>
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>Login</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <>
                    {this.state.error
                        && <Text style={styles.error}>{this.state.error}</Text>}
                </>
                <View style={styles.sign_up_btn}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Register')}>
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>Register</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        alignItems: "stretch",
        justifyContent: "center",
        backgroundColor: "#193A6F",
    },
    email_input: {
        height: 40,
        width: 300,
        fontSize: 16,
        color: 'white',
    },
    password_input: {
        color: "white",
        height: 40,
        width: 300,
        fontSize: 18,
    },
    formContainer: {
        width: "100%",
        height: "100%",
        backgroundColor: "#193A6F",

    },

    Titles:{
        fontSize: 20,
        color: "#F98125",         

    },

    email: {
        marginBottom: 20,
        fontSize: 16,
        color: 'white',
        marginLeft: "40%",
        marginTop: "10%",
    },
    password: {
        fontSize: 16,
        color: 'white',
        marginLeft: "40%",
        paddingBottom: 20,
    },
    loginbtn: {

    },
    signup: {
        justifyContent: 'center',
        textDecorationLine: 'underline',
    },
    button: {
        backgroundColor: '#F98125',
        borderRadius: 60,
        width: "25%",
        marginLeft: "35%",
        marginTop: 20,
        padding: 10,
    },
    buttonText: {
        textAlign: 'center',
        padding: 8,
        color: 'white',
        fontWeight: "bold",
        fontSize: 14,
    },
    error: {
        color: '#F98125',
        fontWeight: '900',
    },
});