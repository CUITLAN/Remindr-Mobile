import React, { useContext, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, StyleSheet, Text, Keyboard, TouchableWithoutFeedback, TextInput, Button, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

//Import components
import AppButton from "../buttonComponents/button";

import { AuthContext } from "../loginComponents/AuthProvider";

import { saveUserAction, updateUserAction } from "../../actions/userActions";
import { verifyTokenAction, resendTokenAction } from "../../actions/numberActions";

const AuthNumberScreen = () => {
    //Access the auth context to get the user log, if the user is logged in
    const { user: authUser } = useContext(AuthContext);

    const users = useSelector(state => state.users.users);
    const number = useSelector(state => state.phones.phones);

    const navigation = useNavigation();
    console.log(number);
    useEffect(() => {
        // Función asíncrona dentro del useEffect
        const fetchData = async () => {
            try {
                const reduxState = await AsyncStorage.getItem('reduxState');  // Espera a que la promesa se resuelva
                console.log(reduxState);
                if (reduxState !== null) {
                    const parsedState = JSON.parse(reduxState);  // Parsear el estado JSON
                    const users = parsedState?.users?.users;
                    const phone = parsedState?.phones?.phones;

                    // Si no hay usuarios o teléfono, navega a la pantalla "NewUser"
                    if (!users || !phone) {
                        navigation.navigate('NewUser');
                    }
                } else {
                    // Si no hay nada en AsyncStorage, navega a "NewUser"
                    navigation.navigate('NewUser');
                }
            } catch (error) {
                console.error('Error al obtener o parsear el estado de AsyncStorage:', error);
                // Manejar errores y posiblemente redirigir al usuario
                navigation.navigate('NewUser');
            }
        };
        fetchData();  // Llama la función asíncrona
    }, [users, number, navigation])

    // local state for the user token and the remaining time    
    const [userToken, saveUserToken] = useState('');
    const [remainingTime, setRemainingTime] = useState(0);

    const dispatch = useDispatch();
    const saveUser = (user) => dispatch(saveUserAction(user));
    const updateUser = (userData) => dispatch(updateUserAction(userData));
    const verifyToken = (tokenData) => dispatch(verifyTokenAction(tokenData));
    const resendToken = (phone) => dispatch(resendTokenAction(phone));

    // Cargar el tiempo restante desde localStorage al cargar el componente
    useEffect(() => {
        const fetchEndTime = async () => {
            const storedEndTime = await AsyncStorage.getItem('endTime');  // Espera a que se resuelva la promesa
            if (storedEndTime) {
                const currentTime = Date.now();
                const timeLeft = Math.floor((new Date(storedEndTime) - currentTime) / 1000);

                if (timeLeft > 0) {
                    setRemainingTime(timeLeft);  // Actualiza el estado si queda tiempo
                }
            }
        };

        fetchEndTime();  // Llama la función asíncrona
    }, []);


    // Temporizador para reducir el tiempo restante
    useEffect(() => {
        let interval;
        if (remainingTime > 0) {
            interval = setInterval(() => {
                setRemainingTime(prevTime => {
                    if (prevTime > 0) {
                        return prevTime - 1;
                    } else {
                        clearInterval(interval);
                        AsyncStorage.removeItem('endTime'); // Eliminar cuando termina el temporizador
                        return 0;
                    }
                });
            }, 1000);
        }

        return () => clearInterval(interval);
    }, [remainingTime]);


    const submitToken = async (e) => {
        e.preventDefault();
        const data = {
            userToken,
            number
        }
        const verify = await verifyToken(data);
        if (!verify) {
            Alert.alert('Error', 'El token es incorrecto');
        }
        if (verify) {
            if (!authUser) {
                const { name, lastName, email, password } = users;
                const phone = number;

                const savedUser = await saveUser({ name, lastName, email, password, phone });
                if (savedUser === true) {
                    Alert.alert('Usuario registrado', 'Tu usuario ha sido registrado exitosamente');
                    navigation.navigate('LoginUser');
                }
                if (savedUser === 'User not saved') {
                    Alert.alert('Error', 'El numero ya esta registrado');
                }
                if (savedUser === 'The email is already registered') {
                    Alert.alert('Error', 'El correo ya esta registrado');
                }

            } else {
                //Section to update the user phone
                const storedUserData = AsyncStorage.getItem('userData');
                const userData = storedUserData ? JSON.parse(storedUserData) : null;
                const userId = userData?._id;
                try {
                    const updateData = await updateUser({
                        userId,
                        field: 'phone',
                        value: number
                    });
                    if (updateData) {
                        Alert.alert('Telefono actualizado', 'Tu telefono ha sido actualizado exitosamente');
                        navigation.navigate('EditUser');
                    } else {
                        Alert.alert('Error', 'Hubo un error al actualizar el telefono');
                    }
                } catch (error) {
                    Alert.alert('Error', 'Hubo un error al actualizar el telefono');
                }
            }
        }
    }

    const submitResendToken = async () => {
        try {
            // Verificar si el tiempo restante es mayor a 0
            if (remainingTime > 0) {
                Alert.alert('Error', 'Debes esperar a que el tiempo termine para reenviar el token');
                return;
            }

            const sendToken = await resendToken({ phone: number });

            if (sendToken === true) {
                Alert.alert('Token reenviado', 'Se ha reenviado un token a tu whatsapp');
                const endTime = new Date(Date.now() + 600 * 1000); // 10 minutos
                await AsyncStorage.setItem('endTime', endTime.toISOString()); // Guarda como cadena
                setRemainingTime(600);  // Establece el tiempo restante a 600 segundos (10 minutos)
            } else if (sendToken === 'Too many requests') {
                Alert.alert('Error', 'Has hecho demasiadas solicitudes, intenta más tarde');
                return;
            } else if (sendToken === "Campos incompletos") {
                Alert.alert('Error', 'Los campos están incompletos');
                return;
            }
        } catch (error) {
            console.error('Error en submitResendToken:', error);
        }
    };

    const renderTime = () => {
        if (remainingTime > 0) {
            const minutes = Math.floor(remainingTime / 60);
            const seconds = remainingTime % 60;
            return (
                <Text>Vuelve a enviar el código en: {`${minutes}:${seconds < 10 ? '0' : ''}${seconds}`}</Text>
            );
        }
        return null;
    };

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style = {styles.container}>
                <Text style = {styles.title}>Autentica tu numero</Text>
                <Text style = {styles.label}>Ingresa el código de seguridad de 6 dígitos que se envió a tu número de teléfono.</Text>
                <View>
                    <TextInput
                        style={styles.input}
                        keyboardType="numeric"
                        maxLength={6}
                        value={userToken}
                        onChangeText={text => saveUserToken(text)}
                    />
                    <AppButton title="Enviar" onPress={submitToken} />
                    <Text style = {styles.labelForgott}>¿No se envió un código de seguridad?</Text>
                    <AppButton title="Reenviar código" onPress={submitResendToken} backgroundColor="#4CAF50" paddingHorizontal={18} paddingVertical={6} />
                    {renderTime()}
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'flex-start',
        padding: 20,
        backgroundColor: '#fff',
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
    labelForgott: {
        fontSize: 16,
        textAlign: 'center',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderRadius: 4,
        borderWidth: 1,
        marginBottom: 20
    }
});

export default AuthNumberScreen;