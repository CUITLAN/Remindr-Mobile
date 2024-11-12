import React, { useState, useContext } from "react";
import { Button, StyleSheet, TextInput, Text, View, Alert, TouchableWithoutFeedback, StatusBar } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";

//Import components
import AppButton from "../buttonComponents/button";

import { AuthContext } from "./AuthProvider";


const LoginScreen = () => {

  const [username, saveUserName] = useState('');
  const [passwordUser, savePassword] = useState('');

  //We use the dispatch to create a function 
  const dispatch = useDispatch();
  const loginUser = (user) => dispatch(loginUserAction(user));

  const submitLogging = async e => {
    //Prevent the default action
    e.preventDefault();
    //Validate the form
    if (username.trim() === '') {
      Alert.alert('Falta el email', 'Por favor ingresa tu email');
    }
    if (passwordUser.trim() === '') {
      Alert.alert('Falta la contraseña', 'Por favor ingresa una contraseña');
    }

    if (user === username && password === passwordUser) {
      Alert.alert('Login exitoso', 'Bienvenido a my-app')
      navigation.navigate('Home');
    } else {
      Alert.alert('Login fallido', 'Email o password incorrectos')
    }
  }
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <Text style={styles.title}>{`Bienvenido a Remindr\nInicia sesion para continuar!`}</Text>
        <Text style={styles.label}>
          Email:
        </Text>
        <TextInput
          style={styles.input}
          autoCapitalize='none'
          keyboardType="email-address"
          value={username}
          onChangeText={text => saveUserName(text)}
        >
        </TextInput>
        <Text>
          Password:
        </Text>
        <TextInput
          style={styles.input}
          autoCapitalize='none'
          secureTextEntry
          value={passwordUser}
          onChangeText={text => savePassword(text)}
        >
        </TextInput>
        <AppButton
          title="Iniciar Sesion"
          onPress={submitLogging}
          color='#841584'
        />
        <StatusBar style="auto" />
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20
  },
  label: {
    fontSize: 16,
    marginBottom: 8
  },
  input:
  {
    height: 40,
    borderColor: 'gray',
    borderRadius: 4,
    borderWidth: 1,
    marginBottom: 20
  }
});

export default LoginScreen;