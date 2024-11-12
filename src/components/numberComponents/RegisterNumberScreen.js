import React, {useState} from "react";
import { useDispatch } from "react-redux";
import { Button, StyleSheet, Keyboard, TouchableWithoutFeedback, Text, View, Alert, TextInput } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';

//Import the components
import AppButton from "../buttonComponents/button";

import { setPhoneAction } from "../../actions/numberActions";

const RegisterNumberScreen = () => {

    const [lada, saveLada] = useState('');
    const [number, saveNumber] = useState('');

    const dispatch = useDispatch();
    const navigation = useNavigation();

    const setPhone = (phone) => dispatch(setPhoneAction(phone));

    const handleSubmitRegister = async () => {
        if(lada.trim() === ''){
            Alert.alert('Falta el lada', 'Por favor ingresa tu lada');
            return;
        }
        if(number.trim() === ''){
            Alert.alert('Falta el telefono', 'Por favor ingresa tu telefono');
            return;
        }
        if(lada && number){
            AsyncStorage.setItem('lada', lada);
            AsyncStorage.setItem('number', number);
            const sendToken = await setPhone({lada, number});
            if(sendToken === true){
                Alert.alert('Token enviado', 'Se ha enviado un token a tu telefono');
                navigation.navigate('AuthNumber');
            } else if(sendToken === 'Too many requests'){
                Alert.alert('Error', 'Has hecho demasiadas solicitudes, intenta mas tarde');
            } else if(sendToken === 'number already exist'){
                Alert.alert('Error', 'El numero ya esta registrado');
            }
        }
    }
    return(
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.container}>
                <Text style={styles.title}>Registra tu numero de Whatssapp</Text>
                <Text style={styles.label}>Ingresa tu Lada</Text>   
                <TextInput
                    style={styles.input}
                    placeholder="Lada"
                    keyboardType="numeric"
                    maxLength={3}
                    value={lada}
                    onChangeText={text => saveLada(text)}
                />
                <Text style={styles.label}>Ingresa tu numero de telefono</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Numero de telefono"
                    keyboardType="numeric"
                    maxLength={10}
                    value={number}
                    onChangeText={text => saveNumber(text)}
                />
                <AppButton title="Siguiente" onPress={handleSubmitRegister} />
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        padding: 20,
        backgroundColor: '#fff'
    },
    title:{
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20
    },
    label: {
        fontSize: 16,
        marginBottom: 8
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderRadius: 4,
        borderWidth: 1,
        marginBottom: 20
    }
});

export default RegisterNumberScreen;