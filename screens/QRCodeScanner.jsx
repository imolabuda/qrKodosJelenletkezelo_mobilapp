import React, { useState, useEffect, } from 'react';
import { StyleSheet, Text, View, Button, PermissionsAndroid, } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { getAuth, onAuthStateChanged, } from "firebase/auth";
import { getFunctions, httpsCallable, } from "firebase/functions";

function QRCodeScanner({location_latitude, location_longitude}){
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [token, setToken] = useState('Not yet scanned');
    const [class_, setClass_] = useState("");
    const [time_, setTime_] = useState(new Date());
    const auth = getAuth();
    const [toggle, setToggle] = useState(false);

    console.log(location_latitude);
    console.log(location_longitude);

    //request camera permission
    useEffect( () => {
        askForCameraPermission();
    }, []);
    
    const askForCameraPermission = () => {
        (async () =>{
            const {status} = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status == 'granted')
        })()
    }

    //what happens when we scan qrcode
    const handleQRCOdeScanned = ({type, data}) => {
        setScanned(true);
        setToken(data);
        console.log('Type: ' + type + '\nData' + data);

        try{
            const user = auth.currentUser;
            const functions = getFunctions();
            const getAttendenceSuccessOrNot = httpsCallable(functions, 'getAttendenceSuccessOrNot');
            
            let document = getAttendenceSuccessOrNot({email: user.email, token: data, latitude: location_latitude, longitude: location_longitude})
                .then((result) => {
                    console.log("courseName: " + result.data.courseName);
                    setClass_(result.data.courseName);
                    setTime_(result.data.time);
                    setToggle(true);
                    return result;
                });

        } catch(error){
            console.log(error);
        }
    }

    //check permission and return the screens
    if(hasPermission === null){
        return (
            <View style={styles.container}>
                <Text>Requesting for camera permission...</Text>
            </View>
        )
    }

    if(hasPermission === false){
        return (
            <View style={styles.container}>
                <Text style={{margin: 10}}>No access to camera</Text>
                <Button title={'Allow Camera'} onPress = {() => askForCameraPermission()}/>
            </View>
        )
    }

    if(toggle === true){
        return (
            <View style={styles.success}>
                <Text style = {styles.textarea}>Beíródott a jelenléted a {class_} nevű tantárgyból.</Text>
            </View>
        )
    }

    //return the view
    return (
        <View style={styles.container}>
            <View style={styles.qrcodebox}>
                <BarCodeScanner onBarCodeScanned={ scanned ? undefined : handleQRCOdeScanned} style = {{ height: 550, width: 500, }}/>
            </View>
            {/* <Text style = {styles.textarea}>{token}</Text> */}
            
            {/* {scanned && <Button title={'Scan again!'} onPress={() => setScanned(false)} style={styles.scanagainbutton}/>} */}
        </View>
    )
}

export default QRCodeScanner

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },

    success: {
        flex: 1,
        backgroundColor: '#4BB543',
        alignItems: 'center',
        justifyContent: 'center',
    },

    qrcodebox: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 600,
        width: 350,
        overflow: 'hidden',
        borderRadius: 15,
        backgroundColor: '#0BC5EA'
    },

    scanagainbutton: {
        backgroundColor: '#C4F1F9',
    },

    textarea: {
        textAlign: 'center',
        fontSize: 20,
        marginTop: 10,
    }
});