//We import the the dependencies from react
import React from "react";
import { Button, StyleSheet, Image, Text, View, Alert } from 'react-native';
import { useNavigation } from "@react-navigation/native";

//Import the components
import AppButton from "./buttonComponents/button";
//We import the styles
import logo from '../pictures/logoremindr.png';

const NewUserScreen = () => {
    const navigation = useNavigation();
    return (
        <View style={Styles.container}>
            <View syle={Styles.logoSlogan}>
                <Image source={logo} style={Styles.image} />
                <Text style={Styles.title}>Remindr</Text>
                <Text style={Styles.title}>Notificaciones inteligentes para estudiantes</Text>
                <Text style={Styles.title}>inteligentes</Text>
            </View>
            <View>
                <AppButton title="Crear cuenta" onPress={() => navigation.navigate('RegisterUser')} />
                <AppButton title="Iniciar sesion" onPress={() => navigation.navigate('LoginUser')} />
            </View>
        </View>
    );
};

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        padding: 20,
        backgroundColor: '#fff',
    },
    logoSlogan: {
        textAlign: 'center',
    },
    image: {
        width: 100,
        height: 100,
        alignSelf: 'center',
    },
    title: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 500
    }
});


export default NewUserScreen;