import { authentication } from '../firebase';
import { TextInput, Button, StyleSheet, Text, View, } from 'react-native';
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import React, { useState, useEffect, } from "react";
import { Drawer } from 'native-base';
import QRCodeScanner from './QRCodeScanner';
import { useNavigation } from '@react-navigation/native';

export default function LoginScreen (props) {

  const [isSignedIn, setIsSignedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const SignInUser = () => {
    signInWithEmailAndPassword(authentication, email, password)
    .then((re) => {
      setIsSignedIn(true);
      console.log(email);
      onPress2();
    })
    .catch((err) => {
      console.log(err);
    })
  }

  const SignOutUser = () => {
    signOut(authentication)
    .then((re) => {
      setIsSignedIn(false);
    })
    .catch((err) => {
      console.log(err);
    })
  }

   const onPress = () => {
    props.navigation.navigate('RegisterScreen');
   };

   const onPress2 = () => {
    props.navigation.navigate('QrCodeScanner');
  };

  return (
    <View>
      <TextInput placeholder='Email' value={email} onChangeText={text => setEmail(text)} style={{marginTop:30}}/>
      <TextInput placeholder='Password' value={password} secureTextEntry={true} onChangeText={text => setPassword(text)}/>
      {isSignedIn===true?
        <Button title='Sign out' onPress={SignOutUser}/>
        :
        <Button title='Sign in' onPress={SignInUser}/>
      }

      <Button title='Register' onPress={onPress}/>
      
    </View>
  );
    
}











// import { KeyboardAvoidingView, TouchableOpacity } from 'react-native'
// import React, { useState, useEffect, }  from 'react'
// import { StyleSheet, Text, View } from 'react-native'
// import { TextInput } from 'react-native'
// import { getAuth } from 'firebase/auth'

// const auth = getAuth();

// function LoginScreen(){
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   function handleSignUp() {
//     auth
//     .createUserWithEmailAndPassword(email, password)
//     .then(userCredentials => {
//       const user = required(userCredentials.user);
//       console.log(user.email);
//     })
//     .catch(error => alert(error.message))
//   }

//   return (
//     <KeyboardAvoidingView
//       style = {styles.container}
//       behavior = "padding"
//     >
//       <View style = {styles.inputContainer}>
//         <TextInput
//           placeholder ='Email'
//           value = { email }
//           onChange = {text => setEmail(text)}
//           style = {styles.input}
//         />

//         <TextInput
//           placeholder ='Password'
//           value = { password }
//           onChange = {text => setPassword(text)}
//           style = {styles.input}
//           secureTextEntry
//         />

//       </View>

//       <View style = {styles.buttonContainer}>
//         <TouchableOpacity
//           onPress={() => { }}
//           style = {styles.button}>
//           <Text style={styles.buttonText}>Login</Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           onPress={handleSignUp}
//           style = {[styles.button, styles.buttonOutline]}>
//           <Text style={styles.buttonOutlineText}>Register</Text>
//         </TouchableOpacity>
//       </View>
//     </KeyboardAvoidingView>
//   )
// }

// export default LoginScreen

// const styles =  StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   inputContainer: {
//     width: '80%',
//   },
//   input:{
//     backgroundColor: 'white',
//     paddingHorizontal: 15,
//     paddingVertical: 10,
//     borderRadius: 10,
//     marginTop: 5,
//   },
//   buttonContainer: {
//     width: '60%',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 40,
//   },
//   button: {
//     backgroundColor: '#0782F9',
//     width: '100%',
//     padding: 15,
//     borderRadius: 10,
//     alignItems: 'center'
//   },
//   buttonText: {
//     color: 'white',
//     fontWeight: '700',
//     fontSize: 16,
//   },
//   buttonOutline: {
//     backgroundColor: 'white',
//     marginTop: 5,
//     borderColor: '#0782F9',
//     borderWidth: 2,
//   },
//   buttonOutlineText: {
//     color: '#0782F9',
//     fontWeight: '700',
//     fontSize: 16,
//   },
// });
