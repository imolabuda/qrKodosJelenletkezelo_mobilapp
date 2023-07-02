import * as Location from 'expo-location';
import React, { useState, useEffect, } from "react";
import { NativeBaseProvider, Box } from "native-base";
import LoginScreen from "./screens/LoginScreen";
import QRCodeScanner from './screens/QRCodeScanner';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { authentication } from './firebase';
import { TextInput, Button, StyleSheet, Text, View, PermissionsAndroid, } from 'react-native';
import { createUserWithEmailAndPassword } from "firebase/auth";
import RegisterScreen from './screens/RegisterScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  
  const [location_longitude, setLocation_longitude] = useState(0);
  const [location_latitude, setLocation_latitude] = useState(0);

  useEffect (() => {
    (async () => {
      let {status} = await Location.requestForegroundPermissionsAsync();
      if(status == 'granter'){
        console.log("Permission granted");
      }else{
        console.log("Permission not granted");
      }

      const loc = await Location.getCurrentPositionAsync();
      setLocation_latitude(loc.coords.latitude);
      setLocation_longitude(loc.coords.longitude);
      console.log(location_latitude);
      console.log(location_longitude);
    })();

  },[]);

  // const requestLocationPermission = async () => {
  //   try {
  //     const granted = await PermissionsAndroid.request([
  //       PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  //     ]);

  //     if (
  //       granted['android.permission.ACCESS_FINE_LOCATION'] ===
  //         PermissionsAndroid.RESULTS.GRANTED
  //     ) {
  //       console.log('Location permissions granted.');
  //       navigator.geolocation.setRNConfiguration(config);
  //       Geolocation.setRNConfiguration(config);
  //       navigator.geolocation = require('@react-native-community/geolocation');

  //       Geolocation.getCurrentPosition(info => handleLocationInfo(info));
  //     } else {
  //       console.log('Location permissions denied.');
  //     }
  //   } catch (err) {
  //     console.warn('Failed to request location permissions:', err);
  //   }
  // };

  // requestLocationPermission();

  // const handleLocationInfo = ((info) => {
  //   console.lof(info);
  //   setLocation(info);
  // })

  // useEffect(() => {
  //   requestLocationPermission();
  // }, [])

//GETTING THE LOCATION OF THE DEVICE
// useEffect(() => {
//     (async () => {
//       const { status } = await Location.requestForegroundPermissionsAsync();
//       if (status !== 'granted') {
//         console.log('Permission to access location was denied');
//         return;
//       }
//       const location = await Location.getCurrentPositionAsync({});
//       console.log('Location permission granted', location);
//     })();
//   }, []);

  return (
    // <NavigationContainer>
    // <Stack.Navigator>
    //   <Stack.Screen options={{ headearShown: false}} name="Login" component={LoginScreen} />
    //   <Stack.Screen name="QR code scanned" component={QRCodeScanner} />
    // </Stack.Navigator>
    // </NavigationContainer>

    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{ headearShown: false}} name="Login" component={LoginScreen} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        <Stack.Screen name="QrCodeScanner">
          {props => (
            <QRCodeScanner {...props} location_latitude={location_latitude} location_longitude={location_longitude}/>
          )}
        </Stack.Screen>
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
      </Stack.Navigator>
     </NavigationContainer>
  );
    
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
