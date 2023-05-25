import React, { Component } from 'react';
import { Text, View, TextInput, StyleSheet, ScrollView, Alert, TouchableOpacity } from 'react-native';

import * as EmailValidator from 'email-validator';


export default class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            first_name: "",
            last_name: "",
            email: "",
            password: "",
            confirm_password: "",
            error: "",
            submitted: false
        }

        this.RegisterButton = this.RegisterButton.bind(this)
    }

    RegisterButton = () => {

        this.setState({ submitted: true })
        this.setState({ error: "" })

        if (!(this.state.first_name)) {
            this.setState({ error: "Must enter first name" })
            return;
        }

        if (!(this.state.last_name)) {
            this.setState({ error: "Must enter last name" })
            return;
        }

        if (!(this.state.email && this.state.password)) {
            this.setState({ error: "Must enter email and password" })
            return;
        }

        console.log(this.state.password);
        console.log(this.state.confirm_password);

        if (!EmailValidator.validate(this.state.email)) {
            this.setState({ error: "Must enter valid email" })
            return;
        }

        const PASSWORD_REGEX = new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")
        if (!PASSWORD_REGEX.test(this.state.password)) {
            this.setState({ error: "Password isn't strong enough (One upper, one lower, one special, one number, at least 8 characters long)" })
            return;
        }
        if (this.state.password !== this.state.confirm_password) {
            this.setState({ error: "Password isn't matching)" })
            return;
        }
    


        console.log("HERE:", this.state.email, this.state.password)

        return fetch("http://localhost:3333/api/1.0.0/user", {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            {
            "first_name": this.state.first_name,
            "last_name": this.state.last_name,
            "email": this.state.email,
            "password": this.state.password,
            })   
        })
        .then((response) => {
           if(response.status === 201) 
               return response.json()
           if(response.status === 500)
           {
              throw 'Server error'
           }else if(response.status === 400) {
                throw "Email already exists or password isn't strong enough";
           }else{
                throw 'Something wrent wrong';
           }
        })

        .then((rJson) => {
            console.log("User created with ID: ", rJson);
            this.setState({"error":"User added successfully"})
            this.setState({"submitted":false})
            this.props.navigation.navigate("Login");
        })
        .catch((error) => {
          this.setState({"error": error})
          this.setState({"submitted": false})
        })

            

        //API REquest to login

        //get the response
        //save the token and the ID
        //send to the contacts screen

    }

    render() {
        return (
            // <View style={styles.Container}>
            <View style={styles.formContainer}>
                <View style={styles.email}>
                    <Text style={styles.Titles}>First Name:</Text>
                    <TextInput style={styles.first_name_input}
                        placeholder="Enter first name"
                        onChangeText={first_name => this.setState({ first_name })}
                        defaultValue={this.state.first_name}
                    />

                    <>
                        {this.state.submitted && !this.state.first_name &&
                            <Text style={styles.error}>Please enter first name</Text>
                        }
                    </>
                </View>

                {/* <View style={styles.formContainer}> */}
                    <View style={styles.email}>
                        <Text style={styles.Titles}>Last Name:</Text>
                        <TextInput style={styles.last_name_input}
                            placeholder="Enter last name"
                            onChangeText={last_name => this.setState({ last_name })}
                            defaultValue={this.state.last_name}
                        />

                        <>
                            {this.state.submitted && !this.state.last_name &&
                                <Text style={styles.error}>Please enter last name</Text>
                            }
                        </>
                    </View>


                    {/* <View style={styles.formContainer}> */}
                        <View style={styles.email}>
                            <Text style={styles.Titles}>Email:</Text>
                            <TextInput style={styles.email_input}
                                placeholder="Enter email"
                                onChangeText={email => this.setState({ email })}
                                defaultValue={this.state.email}
                            />

                            <>
                                {this.state.submitted && !this.state.email &&
                                    <Text style={styles.error}>Please enter an email</Text>
                                }
                            </>
                        </View>

                        <View style={styles.password}>
                            <Text style={styles.Titles}>Password:</Text>
                            <TextInput style={styles.password_input}
                                placeholder="Enter password"
                                onChangeText={password => this.setState({ password })}
                                defaultValue={this.state.password}
                                secureTextEntry
                            />

                            <>
                                {this.state.submitted && !this.state.password &&
                                    <Text style={styles.error}>Please enter a password</Text>
                                }
                            </>
                        </View>

                        <View style={styles.password}>
                            <Text style={styles.Titles}>Confirm Password:</Text>
                            <TextInput style={styles.password_input}
                                placeholder="Confirm Password"
                                onChangeText={confirm_password => this.setState({ confirm_password })}
                                defaultValue={this.state.confirm_password}
                                secureTextEntry
                            />

                            <>
                                {this.state.submitted && !this.state.confirm_password &&
                                    <Text style={styles.error}>Please confirm your password</Text>
                                }

                            </>
                        </View>


                        <View style={styles.signupbtn}>
                            <TouchableOpacity onPress={() => this.RegisterButton()}>
                                <View style={styles.button}>
                                    <Text style={styles.buttonText}>Sign Up</Text>
                                </View>
                            </TouchableOpacity>
                            <Text style={styles.error}>{this.state.error}</Text>
                        </View>
                    {/* </View> */}
                </View>
            // </View>


        )
    }
}

    


const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "80%",
        alignItems: "stretch",
        justifyContent: "center",
        height:"100%",
    },
    first_name_input: {
        height: 35,
        borderWidth: 1,
        width: "60%",
        color: "white",
        marginLeft:130,
        padding:10,
        borderRadius:50,
        borderColor: "Black",
    },
    last_name_input: {
        height: 35,
        borderWidth: 1,
        width: "60%",
        color: "white",
        marginLeft:130,
        padding:10,
        borderRadius:50,
        borderColor: "Black",
    },

    email_input: {
        height: 35,
        borderWidth: 1,
        width: "60%",
        color: "white",
        marginLeft:130,
        padding:10,
        borderRadius:50,
        borderColor: "Black",
    },
    password_input: {
        height: 35,
        borderWidth: 1,
        width: "60%",
        color: "white",
        marginLeft:130,
        padding:10,
        borderRadius:50,
        borderColor: "Black",
    },
    formContainer: {
        backgroundColor: "#193A6F",
        width:"100%",
        height:"100%",

    },
    Titles:{
        fontWeight: "Bold",
        paddingTop:10,
        paddingBottom:10,
        color:"white",
        fontSize:12,
        marginLeft:140,
    },
    email: {
        marginBottom: 5
    },
    password: {
        marginBottom: 10
    },
    signupbtn: {
                justifyContent: "center",
        textDecorationLine: "underline"

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
        color: "#F98125",
        fontWeight: '900',
        marginLeft:140,
    }
});







































































//edit 1 
// import React, { Component } from 'react';
// import { Text, View, TextInput, StyleSheet, ScrollView, Alert, TouchableOpacity } from 'react-native';

// import * as EmailValidator from 'email-validator';

// export default class Register extends Component {
//     constructor(props) {
//         super(props);

//         this.state = {
//             first_name: "",
//             last_name: "",
//             email: "",
//             password: "",
//             confirm_password: "",
//             error: "",
//             submitted: false
//         }

//         this.RegisterButton = this.RegisterButton.bind(this)
//     }

//     RegisterButton = () => {

//         this.setState({ submitted: true })
//         this.setState({ error: "" })

//         if (!(this.state.first_name)) {
//             this.setState({ error: "Must enter first name" })
//             return;
//         }

//         if (!(this.state.last_name)) {
//             this.setState({ error: "Must enter last name" })
//             return;
//         }

//         if (!(this.state.email && this.state.password)) {
//             this.setState({ error: "Must enter email and password" })
//             return;
//         }

//         console.log(this.state.password);
//         console.log(this.state.confirm_password);

//         if (!EmailValidator.validate(this.state.email)) {
//             this.setState({ error: "Must enter valid email" })
//             return;
//         }

//         const PASSWORD_REGEX = new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")
//         if (!PASSWORD_REGEX.test(this.state.password)) {
//             this.setState({ error: "Password isn't strong enough (One upper, one lower, one special, one number, at least 8 characters long)" })
//             return;
//         }
//         if (this.state.password !== this.state.confirm_password) {
//             this.setState({ error: "Password isn't matching)" })
//             return;
//         }
    


//         console.log("HERE:", this.state.email, this.state.password)

//         return fetch("http://localhost:3333/api/1.0.0/user", {
//         method: 'post',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(
//             {
//             "first_name": this.state.first_name,
//             "last_name": this.state.last_name,
//             "email": this.state.email,
//             "password": this.state.password,
//             })   
//         })
//         .then((response) => {
//            if(response.status === 201) 
//                return response.json()
//            if(response.status === 500)
//            {
//               throw 'Server error'
//            }else if(response.status === 400) {
//                 throw "Email already exists or password isn't strong enough";
//            }else{
//                 throw 'Something wrent wrong';
//            }
//         })

//         .then((rJson) => {
//             console.log("User created with ID: ", rJson);
//             this.setState({"error":"User added successfully"})
//             this.setState({"submitted":false})
//             this.props.navigation.navigate("Login");
//         })
//         .catch((error) => {
//           this.setState({"error": error})
//           this.setState({"submitted": false})
//         })

            

//         //API REquest to login

//         //get the response
//         //save the token and the ID
//         //send to the contacts screen

//     }

//     render() {
//         return (
//             <View style={styles.formContainer}>
//                 <View style={styles.email}>
//                     <Text>First Name:</Text>
//                     <TextInput style={styles.first_name_input}
//                         placeholder="Enter first name"
//                         onChangeText={first_name => this.setState({ first_name })}
//                         defaultValue={this.state.first_name}
//                     />

//                     <>
//                         {this.state.submitted && !this.state.first_name &&
//                             <Text style={styles.error}>Please enter first name</Text>
//                         }
//                     </>
//                 </View>

//                 <View style={styles.formContainer}>
//                     <View style={styles.email}>
//                         <Text>Last Name:</Text>
//                         <TextInput style={styles.last_name_input}
//                             placeholder="Enter last name"
//                             onChangeText={last_name => this.setState({ last_name })}
//                             defaultValue={this.state.last_name}
//                         />

//                         <>
//                             {this.state.submitted && !this.state.last_name &&
//                                 <Text style={styles.error}>Please enter last name</Text>
//                             }
//                         </>
//                     </View>


//                     <View style={styles.formContainer}>
//                         <View style={styles.email}>
//                             <Text>Email:</Text>
//                             <TextInput style={styles.email_input}
//                                 placeholder="Enter email"
//                                 onChangeText={email => this.setState({ email })}
//                                 defaultValue={this.state.email}
//                             />

//                             <>
//                                 {this.state.submitted && !this.state.email &&
//                                     <Text style={styles.error}>Please enter an email</Text>
//                                 }
//                             </>
//                         </View>

//                         <View style={styles.password}>
//                             <Text>Password:</Text>
//                             <TextInput style={styles.password_input}
//                                 placeholder="Enter password"
//                                 onChangeText={password => this.setState({ password })}
//                                 defaultValue={this.state.password}
//                                 secureTextEntry
//                             />

//                             <>
//                                 {this.state.submitted && !this.state.password &&
//                                     <Text style={styles.error}>Please enter a password</Text>
//                                 }
//                             </>
//                         </View>

//                         <View style={styles.password}>
//                             <Text>Confirm Password:</Text>
//                             <TextInput style={styles.password_input}
//                                 placeholder="Confirm Password"
//                                 onChangeText={confirm_password => this.setState({ confirm_password })}
//                                 defaultValue={this.state.confirm_password}
//                                 secureTextEntry
//                             />

//                             <>
//                                 {this.state.submitted && !this.state.confirm_password &&
//                                     <Text style={styles.error}>Please confirm your password</Text>
//                                 }

//                             </>
//                         </View>


//                         <View style={styles.signupbtn}>
//                             <TouchableOpacity onPress={() => this.RegisterButton()}>
//                                 <View style={styles.button}>
//                                     <Text style={styles.buttonText}>Sign Up</Text>
//                                 </View>
//                             </TouchableOpacity>
//                             <Text style={styles.error}>{this.state.error}</Text>
//                         </View>
//                     </View>
//                 </View>
//             </View>


//         )
//     }
// }

    


// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         width: "80%",
//         alignItems: "stretch",
//         justifyContent: "center"
//     },
//     first_name_input: {
//         height: 40,
//         borderWidth: 1,
//         width: "100%",
//     },
//     last_name_input: {
//         height: 40,
//         borderWidth: 1,
//         width: "100%",
//     },

//     email_input: {
//         height: 40,
//         borderWidth: 1,
//         width: "100%",
//     },
//     password_input: {
//         height: 40,
//         borderWidth: 1,
//         width: "100%",
//     },
//     formContainer: {

//     },
//     email: {
//         marginBottom: 5
//     },
//     password: {
//         marginBottom: 10
//     },
//     signupbtn: {

//     },
//     signup: {
//         justifyContent: "center",
//         textDecorationLine: "underline"
//     },
//     button: {
//         marginBottom: 30,
//         backgroundColor: '#2196F3'
//     },
//     buttonText: {
//         textAlign: 'center',
//         padding: 20,
//         color: 'white'
//     },
//     error: {
//         color: "red",
//         fontWeight: '900'
//     }
// }); 




















//this is my edit
// import React, { Component } from 'react';
// import { Text, View, TextInput, StyleSheet, ScrollView, Alert, TouchableOpacity } from 'react-native';

// import * as EmailValidator from 'email-validator';

// export default class Register extends Component {
//     constructor(props) {
//         super(props);

//         this.state = {
//             FirstName: "",
//             LastName: "",
//             email: "",
//             password: "",
//             confirm_password: "",
//             error: "",
//             submitted: false,
//         }

//         this.RegisterButton = this.RegisterButton.bind(this)
//     }

//     RegisterButton = () => {

//         this.setState({ submitted: true })
//         this.setState({ error: "" })

//         if (!(this.state.FirstName)) {
//             this.setState({ error: "Must enter first name" })
//             return;
//         }

//         if (!(this.state.LastName)) {
//             this.setState({ error: "Must enter last name" })
//             return;
//         }

//         if (!(this.state.email && this.state.password)) {
//             this.setState({ error: "Must enter email and password" })
//             return;
//         }

//         console.log(this.state.password);
//         console.log(this.state.confirm_password);

//         if (!EmailValidator.validate(this.state.email)) {
//             this.setState({ error: "Must enter valid email" })
//             return;
//         }

//         const PASSWORD_REGEX = new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")
//         if (!PASSWORD_REGEX.test(this.state.password)) {
//             this.setState({ error: "Password isn't strong enough (One upper, one lower, one special, one number, at least 8 characters long)" })
//             return;
//         }
//         if (this.state.password !== this.state.confirm_password) {
//             this.setState({ error: "Password isn't matching)" })
//             return;
//         }
    


//         console.log("HERE:", this.state.email, this.state.password)

//         return fetch("http://localhost:3333/api/1.0.0/user", {
//         method: 'post',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(
//             {
//             "FirstName": this.state.FirstName,
//             "LastName": this.state.LastName,
//             "email": this.state.email,
//             "password": this.state.password,
//             })   
//         })
//         .then((response) => {
//            if(response.status === 201) 
//                return response.json()
//            if(response.status === 500)
//            {
//               throw 'Server error'
//            }else if(response.status === 400) {
//                 throw "Email already exists or password isn't strong enough";
//            }else{
//                 throw 'Something wrent wrong';
//            }
//         })

//         .then((rJson) => {
//             console.log("User created with ID: ", rJson);
//             this.setState({"error":"User added successfully"})
//             this.setState({"submitted":false})
//             this.props.navigation.navigate("Login");
//         })
//         .catch((error) => {
//           this.setState({"error": error})
//           this.setState({"submitted": false})
//         })

            

//         //API REquest to login

//         //get the response
//         //save the token and the ID
//         //send to the contacts screen

//     }

//     render() {
//         return (
//             <View style={styles.FormContainer}>
//                 <View style={styles.email}>
//                     <Text style={styles.Titles}>First Name:</Text>
//                     <TextInput style={styles.Inputs}
//                         placeholder="Enter first name"
//                         onChangeText={FirstName => this.setState({ FirstName })}
//                         defaultValue={this.state.FirstName}
//                     />

//                     <>
//                         {this.state.submitted && !this.state.FirstName &&
//                             <Text style={styles.error}>Please enter first name</Text>
//                         }
//                     </>
//                 </View>

//                 <View style={styles.formContainer}>
//                     <View style={styles.email}>
//                         <Text style={styles.Titles}>Last Name:</Text>
//                         <TextInput style={styles.Inputs}
//                             placeholder="Enter last name"
//                             onChangeText={LastName => this.setState({ LastName })}
//                             defaultValue={this.state.LastName}
//                         />

//                         <>
//                             {this.state.submitted && !this.state.LastName &&
//                                 <Text style={styles.error}>Please enter last name</Text>
//                             }
//                         </>
//                     </View>


//                     <View style={styles.formContainer}>
//                         <View style={styles.Email}>
//                             <Text style={styles.Titles}>Email:</Text>
//                             <TextInput style={styles.Inputs}
//                                 placeholder="Enter email"
//                                 onChangeText={email => this.setState({ email })}
//                                 defaultValue={this.state.email}
//                             />

//                             <>
//                                 {this.state.submitted && !this.state.email &&
//                                     <Text style={styles.error}>Please enter an email</Text>
//                                 }
//                             </>
//                         </View>

//                         <View style={styles.password}>
//                             <Text style={styles.Titles}>Password:</Text>
//                             <TextInput style={styles.Inputs}
//                                 placeholder="Enter password"
//                                 onChangeText={password => this.setState({ password })}
//                                 defaultValue={this.state.password}
//                                 secureTextEntry
//                             />

//                             <>
//                                 {this.state.submitted && !this.state.password &&
//                                     <Text style={styles.error}>Please enter a password</Text>
//                                 }
//                             </>
//                         </View>

//                         <View style={styles.password}>
//                             <Text style={styles.Titles}>Confirm Password:</Text>
//                             <TextInput style={styles.Inputs}
//                                 placeholder="Confirm Password"
//                                 onChangeText={confirm_password => this.setState({ confirm_password })}
//                                 defaultValue={this.state.confirm_password}
//                                 secureTextEntry
//                             />

//                             <>
//                                 {this.state.submitted && !this.state.confirm_password &&
//                                     <Text style={styles.error}>Please confirm your password</Text>
//                                 }

//                             </>
//                         </View>


//                         <View style={styles.signupbtn}>
//                             <TouchableOpacity onPress={() => this.RegisterButton()}>
//                                 <View style={styles.button}>
//                                     <Text style={styles.buttonText}>Sign Up</Text>
//                                 </View>
//                             </TouchableOpacity>
//                             <Text style={styles.error}>{this.state.error}</Text>
//                         </View>
//                     </View>
//                 </View>
//             </View>


//         )
//     }
// }

    


// const styles = StyleSheet.create({
//     FormContainer:{
//         backgroundColor: "#193A6F",
//         width:"100%",
//         height:"100%",
//     },
//     container: {
//         flex: 1,
//         width: "80%",
//         alignItems: "stretch",
//         justifyContent: "center",
//         height:"100%",

//     },

//     Titles:{
//         fontWeight: "Bold",
//         paddingTop:10,
//         paddingBottom:10,
//         color:"white",
//         fontSize:12,
//         marginLeft:140,
//     },

//     Inputs: {
//         height: 35,
//         borderWidth: 1,
//         width: "60%",
//         color: "white",
//         marginLeft:130,
//         padding:10,
//         borderRadius:50,
//         borderColor: "Black",
//     },

//     signup: {
//         justifyContent: "center",
//         textDecorationLine: "underline"
//     },

//     button: {
//         backgroundColor: '#F98125',
//         borderRadius: 60,
//         width: "50%",
//         marginLeft: "25%",
//         marginTop: 13,
//         padding: 5,

//     },
//     buttonText: {
//         textAlign: 'center',
//         padding: 8,
//         color: 'white',
//         fontWeight: "bold",
//         fontSize: 14,
//     },

//     error: {
//         color: "#F98125",
//         fontWeight: '900',
//         marginLeft:140,
//     }
// });