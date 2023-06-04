//CameraSendServer
import {
    Camera,
    CameraType,
    onCameraReady,
    CameraPictureOptions,
} from "expo-camera";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function CameraSendServer() {
    // Initialize state variables
    const [type, setType] = useState(CameraType.back);
    const [permission, requestPermission] = Camera.useCameraPermissions();
    const [camera, setCamera] = useState(null);

    // Function to toggle the camera type (front or back)
    function toggleCameraType() {
        setType((current) =>
            current === CameraType.back ? CameraType.front : CameraType.back
        );
        console.log("Camera: ", type);
    }

    // Function to take a picture using the camera
    async function TakePicture() {
        if (camera) {
            const options = {
                quality: 0.5,
                base64: true,
                onPictureSaved: (data) => sendToServer(data),
            };
            const data = await camera.takePictureAsync(options);
        }
    }

    // Function to send the captured picture to the server
    async function sendToServer(data) {
        // Get authentication token and user ID from AsyncStorage
        // const auth = await AsyncStorage.getItem('@whatsThat_session_token');
        const user_id = await AsyncStorage.getItem("whatsThat_user_id");

        // Fetch the picture data from the base64 string
        let res = await fetch(data.base64);
        let blob = await res.blob();

        // Send the picture to the server
        return fetch("http://localhost:3333/api/1.0.0/user/" + user_id + "/photo", {
            method: "POST",
            headers: {
                "Content-Type": "image/png",
                "X-Authorization": await AsyncStorage.getItem("app_session_token" ),
            },
            body: blob,
        })
            .then((response) => {
                console.log("Photo added successfully", response);
                this.props.navigation.navigate("CameraSendServer");
            })
            .catch((err) => {
                console.log(err);
            });
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
        padding: 5,
        margin: 5,
        backgroundColor: "steelblue",
    },
    Button: {
        height: "100%",
        width: "100%",

    },
    TextLabel: {
        color: "#ddd",
        fontWeight: "bold",
        fontSize: 14,
    },
});
