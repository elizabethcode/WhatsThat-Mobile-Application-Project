//UpdatingProfilePhoto
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Camera, CameraType } from "expo-camera";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { globalStyles } from '../globalStyles';

export default function UpdatingProfilePhoto({ navigation }) {
  // Initialize state variables
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [camera, setCamera] = useState(null);

  useEffect(() => {
    // Request camera permission on component mount
    requestPermission();
  }, []);

  // Function to toggle the camera type (front or back)
  const toggleCameraType = () => {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
    console.log("Camera: ", type);
  };

  // Function to send the captured picture to the server
  const sendToServer = async (data) => {
    const user_id = await AsyncStorage.getItem("whatsThat_user_id");

    // Fetch the picture data from the URI
    let res = await fetch(data.uri);
    let blob = await res.blob();

    // Send the picture to the server
    return fetch(
      `http:localhost:3333/api/1.0.0/user/${user_id}/photo`,
      {
        method: "POST",
        headers: {
          "Content-Type": "image/png",
          "X-Authorization": await AsyncStorage.getItem(
            "app_session_token"
          ),
        },
        body: blob,
      }
    )
      .then((response) => {
        console.log("Picture added successfully", response);
        navigation.navigate("AccountProfile");
      })
      .catch((err) => {
        console.log(err);
      });
  };

      // Function to take a picture using the camera
      async function TakePicture() {
        if (camera) {
          const options = { quality: 0.5, base64: true };
          const data = await camera.takePictureAsync(options);
    
          console.log(data.uri);
    
          sendToServer(data);
        }
      }

  // Check camera permission and render the camera view
  if (!permission || !permission.granted) {
    return <Text>No access to camera</Text>;
  } else {
    return (
      <View style={styles.MainContainer}>
        <Camera style={styles.camera} type={type} ref={(ref) => setCamera(ref)}>
          <View style={styles.ButtonContainer}>
            <TouchableOpacity style={styles.Button} onPress={toggleCameraType}>
              <Text style={styles.TextLabel}>Flip Camera</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.ButtonContainer}>
            <TouchableOpacity style={styles.Button} onPress={TakePicture}>
              <Text style={styles.TextLabel}>Take Photo</Text>
            </TouchableOpacity>
          </View>
        </Camera>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
  },
  ButtonContainer: {
    alignSelf: "flex-end",
    backgroundColor: "#F98125",
    margin: 10,
    borderRadius: 50,
    padding: 20,
  },
  Button: {
    width: "100%",
    height: "100%",
  },
  TextLabel: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
  },
});