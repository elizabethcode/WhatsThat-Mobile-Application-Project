import React from "react";
import { StyleSheet, View, Button, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
//import CustomInput from "../App/CustomInput/CustomInput";

const NavigateToHome = props => {
  props.navigation.navigate('Home')
}

const RegisterScreen = props => {
  return (

    <View style={styles.container}>

      <View style={styles.regTopView}>
        <Text style={styles.RegisterTitle}>Register</Text>
        <Text style={styles.RegisterDetails}>Enter Your Details to Register</Text>

        <View style={styles.inputContainer}>

          <View style={styles.TitleBox}>

            <Text style={styles.Titles}>Full Name</Text>

            <View style={styles.Inputs}>
              <TextInput
                placeholder=""
                // value={ }
                // onChangeText={text => }
                style={styles.input}
              />
            </View>
          </View>

          <View style={styles.TitleBox}>

            <Text style={styles.Titles}>Username</Text>

            <View style={styles.Inputs}>
              <TextInput
                placeholder=""
                // value={ }
                // onChangeText={text => }
                style={styles.input}
                secureTextEntry
              />
            </View>

            <Text style={styles.Titles}>Email Address</Text>

            <View style={styles.Inputs}>
              <TextInput
                placeholder=""
                // value={ }
                // onChangeText={text => }
                style={styles.input}
                secureTextEntry
              />
            </View>

            <Text style={styles.Titles}>Password</Text>

            <View style={styles.Inputs}>
              <TextInput
                placeholder=""
                // value={ }
                // onChangeText={text => }
                style={styles.input}
                secureTextEntry
              />
            </View>








          </View>
        </View>





      </View>


      <View style={styles.regBottomView}>

        <View style={styles.RegisterButton}>
          <Button style={styles.Buttons}
            title="Register"
            onPress={() => NavigateToRegister(props)}
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

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  regTopView: {
    flex: 5,
    backgroundColor: '#093F6E',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    // height: '100%',
  },

  regBottomView: {
    flex: 2,
    backgroundColor: '#093F6E',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    // width: '100%',
  },

  RegisterTitle: {
    color: 'orange',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'left',
    marginRight: '15%',
    marginTop:'1%',
  },

  RegisterDetails: {
    color: 'orange',
    fontSize: 14,
    textAlign: 'left',
    marginRight: '10%',
  },

  RegisterButton:{
    width: "20%",
    paddingTop: 20,
  },

  HomeButton:{
    paddingTop: 50,
    width: "20%",
  },

  inputContainer: {
    backgroundColor: "#093F6E",
    flex: 1,
    justifyContent: 'left',
    alignItems: 'left',
    width: "30%",
  },


  input: {
    padding: 2,
    width: "100%"
  },

  TitleBox:{
    backgroundColor: "#093F6E",
    alignItems:'left',
    justifyContent: 'left',
    marginRight: "50%",
    marginLeft:"10%",
    marginTop:"3%"
    
  },

  Titles:{
    fontSize:16,
    fontWeight: 'bold',
    paddingLeft:5,
    color:'white',
    paddingBottom:14,
    paddingTop:"5%",

  },

  Inputs: {
    backgroundColor: 'orange',
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderRadius: 4,
    borderColor: "black",
    width: "200%",

  },



});