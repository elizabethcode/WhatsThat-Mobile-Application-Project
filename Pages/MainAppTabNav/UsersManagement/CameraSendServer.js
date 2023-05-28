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
    const [type, setType] = useState(CameraType.back);
    const [permission, requestPermission] = Camera.useCameraPermissions();
    const [camera, setCamera] = useState(null);

    function toggleCameraType() {
        setType((current) =>
            current === CameraType.back ? CameraType.front : CameraType.back
        );
        console.log("Camera: ", type);
    }

    async function takePhoto() {
        if (camera) {
            const options = {
                quality: 0.5,
                base64: true,
                onPictureSaved: (data) => sendToServer(data),
            };
            const data = await camera.takePictureAsync(options);
        }
    }

    //to be able to upload the user's profile picture
    async function sendToServer(data) {
        // Get these from AsyncStorage
        // const auth = await AsyncStorage.getItem('@whatsThat_session_token');
        const user_id = await AsyncStorage.getItem("whatsThat_user_id");

        let res = await fetch(data.base64);
        let blob = await res.blob();

        return fetch("http://localhost:3333/api/1.0.0/user/" + user_id + "/photo", {
            method: "POST",
            headers: {
                "Content-Type": "image/png",
                "X-Authorization": await AsyncStorage.getItem(
                    "app_session_token"
                ),
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

    if (!permission || !permission.granted) {
        return <Text>No access to camera</Text>;
    } else {
        return (
            <View style={styles.container}>
                <Camera style={styles.camera} type={type} ref={(ref) => setCamera(ref)}>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
                            <Text style={styles.text}>Flip Camera</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button} onPress={takePhoto}>
                            <Text style={styles.text}>Take Photo</Text>
                        </TouchableOpacity>
                    </View>
                </Camera>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    buttonContainer: {
        alignSelf: "flex-end",
        padding: 5,
        margin: 5,
        backgroundColor: "steelblue",
    },
    button: {
        width: "100%",
        height: "100%",
    },
    text: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#ddd",
    },
});
