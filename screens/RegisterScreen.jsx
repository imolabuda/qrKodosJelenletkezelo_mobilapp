import { authentication } from '../firebase';
import { TextInput, Button, StyleSheet, Text, View, Pressable, Platform, KeyboardAvoidingView, } from 'react-native';
import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState, useEffect, } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { getFirestore, collection, getDocs, doc, setDoc, addDoc } from 'firebase/firestore/lite';
import { db } from '../firebase';

// import bcrypt from 'bcryptjs';

// import isaac from "isaac";

// bcrypt.setRandomFallback((len) => {
// 	const buf = new Uint8Array(len);

// 	return buf.map(() => Math.floor(isaac.random() * 256));
// });
// // SALT should be created ONE TIME upon sign up
// const salt = bcrypt.genSaltSync(10)
// const hashedPassword = ""

export default function RegisterScreen(props) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [showPicker, setShowPicker] = useState(false);
  const [date, setDate] = useState(new Date());

  const onPress = () => {
    props.navigation.navigate('LoginScreen');
  };

  const RegisterUser = () => {
    createUserWithEmailAndPassword(authentication, email, password)
    .then((re) => {
      console.log(re);
      console.log(email);
      getData();
      onPress();
    })
    .catch((err) => {
      console.log(err);
    })
  };

  const toggleDatepicker = () => {
    setShowPicker(!showPicker);
  };

  const onChange = ({ type }, selectedDate) => {
    if(type == "set"){
        const currentDate = selectedDate;
        setDate(currentDate);
        if(Platform.OS === "android"){
            toggleDatepicker();
            setDateOfBirth(currentDate.toDateString());
        }
    } else{
        toggleDatepicker();
    }
  };

  const getData = async () => {
    try {
      const document = await addDoc(collection(db, "Students"), {
        dateOfBirth: dateOfBirth,
        studentEmail: email,
        studentName: name,
      });
      console.log("Document written with ID: ", document.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  return (
    <KeyboardAvoidingView
       style = {styles.container}
       behavior = "padding"
    >
      <View style = {styles.inputContainer}>
        <Text style={styles.text}>E-mail address</Text>
        <TextInput placeholder='E-mail..' value={email} onChangeText={text => setEmail(text)} style = {styles.input}/>
        <Text style={styles.text}>Full name</Text>
        <TextInput placeholder='Name..' value={name} onChangeText={text => setName(text)} style={styles.input}/>
        <Text style={styles.text}>Date of birth</Text>
        {showPicker && (
          <DateTimePicker
              style={styles.input}
              mode="date"
              display="spinner"
              value={date}
              onChange={onChange}
              maximumDate={new Date('2010-12-30')}
              minimumDate={new Date('1970-1-1')}
          />
        ) }
        
        {(!showPicker) && (
          <Pressable onPress={toggleDatepicker}>
              <TextInput
                  style={styles.input}
                  placeholder="Sat Aug 21 2000"
                  value={dateOfBirth.toString()}
                  onChangeText={setDateOfBirth}
                  placeholderTextColor="#0987A0"
                  editable={false}
              />
          </Pressable>
        )}

        <Text style={styles.text}>Password</Text>
        <TextInput placeholder='Password..' value={password} secureTextEntry={true} onChangeText={text => setPassword(text)} style={styles.input}/>

        <View style={styles.buttonBox}>
          <Button title='Register' style={styles.button} onPress={RegisterUser}/>
        </View>
        
      </View>
    </KeyboardAvoidingView>
  );

}

const styles =  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    text:{
      fontWeight: '300',
      fontSize: 16,
      marginTop: 10,
    },
    inputContainer: {
      width: '80%',
    },
    input:{
      backgroundColor: 'white',
      paddingHorizontal: 15,
      paddingVertical: 10,
      borderRadius: 10,
      marginTop: 5,
    },
    buttonContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 40,
      width: '60%',
    },
    button: {
      backgroundColor: '#0782F9',
      width: '100%',
      padding: 15,
      borderRadius: 10,
      alignItems: 'center',
      marginTop: 30
    },
    buttonOutline: {
      backgroundColor: 'white',
      marginTop: 5,
      borderColor: '#0782F9',
      borderWidth: 2,
    },
    buttonBox: {
      marginTop: 15,
    },
  });