// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Open up App.js to start working on your app!</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

import * as Location from 'expo-location';
import React from "react";
import { NativeBaseProvider, Box } from "native-base";
import LoginForm from "./components/LoginForm";
import QRCodeScanner from './components/QRCodeScanner';

export default function App() {

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
    <NativeBaseProvider>
      <QRCodeScanner/>
    </NativeBaseProvider>
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
