import * as Location from 'expo-location';
import React, { useState, useEffect, } from "react";
import { NativeBaseProvider, Box } from "native-base";
import LoginScreen from "./screens/LoginScreen";
import QRCodeScanner from './screens/QRCodeScanner';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { authentication } from './firebase';
import { TextInput, Button, StyleSheet, Text, View, } from 'react-native';
import { createUserWithEmailAndPassword } from "firebase/auth";
import RegisterScreen from './screens/RegisterScreen';

const Stack = createNativeStackNavigator();

export default function App() {

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
        <Stack.Screen name="QrCodeScanner" component={QRCodeScanner} />
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
