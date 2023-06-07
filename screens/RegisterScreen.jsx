import { authentication } from '../firebase';
import { TextInput, Button, StyleSheet, Text, View, } from 'react-native';
import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState, useEffect, } from "react";

export default function RegisterScreen(props) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onPress = () => {
    props.navigation.navigate('LoginScreen');
   };

  const RegisterUser = () => {
    createUserWithEmailAndPassword(authentication, email, password)
    .then((re) => {
      console.log(re);
      console.log(email);
      onPress();
    })
    .catch((err) => {
      console.log(err);
    })
  }

  return (
    <View>
      <TextInput placeholder='Email' value={email} onChangeText={text => setEmail(text)} style={{marginTop:30}}/>
      <TextInput placeholder='Password' value={password} secureTextEntry={true} onChangeText={text => setPassword(text)}/>
      <Button title='Register' onPress={RegisterUser}/>
    </View>
  );
    
}