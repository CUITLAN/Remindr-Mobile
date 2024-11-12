import React, { useState } from 'react';
import { Button, StyleSheet, Keyboard, TouchableWithoutFeedback, Text, TextInput, View, Alert } from 'react-native';
import { useDispatch, useSelector } from "react-redux";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";

//Import the components
import AppButton from "../buttonComponents/button";

import { createUserAction } from "../../actions/userActions";

const RegisterUserScreen = () => {
    //State del componente
    const [name, setName] = useState('');
    const [lastName, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [comparative, setValidatePassword] = useState('');

    const dispatch = useDispatch();
    const navigation = useNavigation();
    const createUser = (user) => dispatch(createUserAction(user));

    const handleSubmitRegister = async () => {
        if (name.trim() === '') {
            Alert.alert('Falta el nombre', 'Por favor ingresa tu nombre');
            return;
        }
        if (lastName.trim() === '') {
            Alert.alert('Falta el apellido', 'Por favor ingresa tu apellido');
            return;
        }
        if (email.trim() === '') {
            Alert.alert('Falta el email', 'Por favor ingresa tu email');
            return;
        }
        if (password.trim() === '') {
            Alert.alert('Falta la contraseña', 'Por favor ingresa una contraseña');
            return;
        }
        if (comparative.trim() === '') {
            Alert.alert('Falta la confirmacion de la contraseña', 'Por favor confirma tu contraseña');
            return;
        }
        if (password !== comparative) {
            Alert.alert('Las contraseñas no coinciden', 'Por favor verifica que las contraseñas sean iguales');
            return;
        }

        createUser({
            name,
            lastName,
            email,
            password
        }).then(() => {
            navigation.navigate('RegisterNumber');    
        });
    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.container}>
                <Text style = {styles.title}>Crea una cuenta</Text>
                <View>
                    <Text style = {styles.label}>Nombre</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Ingresa tu nombre"
                        value={name}
                        onChangeText={text => setName(text)}
                    />
                    <Text style = {styles.label}>Apellido</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Ingresa tu apellido"
                        value={lastName}
                        onChangeText={text => setLastname(text)}
                    />
                    <Text style = {styles.label}>Email</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Ingresa tu email"
                        autoCapitalize='none'
                        keyboardType="email-address"
                        value={email}
                        onChangeText={text => setEmail(text)}
                    />
                    <Text style = {styles.label}>Contraseña</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Ingresa tu contraseña"
                        autoCapitalize='none'
                        secureTextEntry
                        value={password}
                        onChangeText={text => setPassword(text)}
                    />
                    <Text style = {styles.label}>Confirma tu contraseña</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Confirma tu contraseña"
                        autoCapitalize='none'
                        secureTextEntry
                        value={comparative}
                        onChangeText={text => setValidatePassword(text)}
                    />
                    <AppButton
                        title="Enviar"
                        onPress={handleSubmitRegister}
                    />
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        padding: 20,
        backgroundColor: '#fff',
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderRadius: 4,
        borderWidth: 1,
        marginBottom: 12,
        paddingLeft: 8,
    },
    title : {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    }
});

export default RegisterUserScreen;