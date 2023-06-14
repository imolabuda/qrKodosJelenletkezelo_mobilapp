import React, { useState, useEffect, } from 'react';
import { StyleSheet, Text, View, Button, } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

function QRCodeScanner(){
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [text, setText] = useState('Not yet scanned');

    const askForCameraPermission = () => {
        (async () =>{
            const {status} = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status == 'granted')
        })()
    }

    //request camera permission
    useEffect( () => {
        askForCameraPermission();
    }, []);

    //what happens when we scan qrcode
    const handleQRCOdeScanned = ({type, data}) => {
        setScanned(true);
        setText(data);
        console.log('Type: ' + type + '\nData' + data);
        fetch('https://us-central1-qrcodeproject-c6d04.cloudfunctions.net/createAttendence', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
        },
            body: JSON.stringify({
                attendenceToken: text,
                classID: 19,
                studentID: 58,
            }),
        });
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

    //return the view
    return (
        <View style={styles.container}>
            <View style={styles.qrcodebox}>
                <BarCodeScanner onBarCodeScanned={ scanned ? undefined : handleQRCOdeScanned} style = {{ height: 550, width: 500, }}/>
            </View>
            <Text style = {styles.textarea}>{text}</Text>

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