//PictureSendServer
import {Camera, CameraType, onCameraReady, CameraPictureOptions} from "expo-camera";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { globalStyles } from '../globalStyles';

export default function PictureSendServer() {
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
                this.props.navigation.navigate("PictureSendServer");
            })
            .catch((err) => {
                console.log(err);
            });
    }

    if (!permission || !permission.granted) {
        return <Text>No access to camera</Text>;
    } else {
        return (
            <View style={styles.MainContainer}>
                <Camera style={styles.camera} type={type} ref={(ref) => setCamera(ref)}>
                    <View style={styles.ButtonContainer}>
                        <TouchableOpacity style={styles.Button} onPress={toggleCameraType}>
                            <Text style={globalStyles.ButtonText}>Flip Camera</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.ButtonContainer}>
                        <TouchableOpacity style={styles.Button} onPress={takePhoto}>
                            <Text style={globalStyles.ButtonText}>Take Photo</Text>
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
});
