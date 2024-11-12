//We import the the dependencies from react
import React from "react";
import { Button, StyleSheet, Image, Text, View, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//We import the styles
import logo from '../pictures/logoremindr.png'

//Creates a functional component that will contain the welcome page
const LoadingWarning = () => {
    return (
        <View className={styles.container}>
            <View className={styles.logoRemindr}>
            <Image source={logo} style={{ width: 345, height: 300 }} />
            </View>
            <Text className={styles.title}>Cargando la informacion...</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20
    },
    logoRemindr: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    smallImg: {
        width: '50%',
        height: '50%'
    },
    title: {
        textAlign: 'center',
        fontSize: '1.5rem',
        fontWeight: 'bold'
    }
});

export default LoadingWarning;