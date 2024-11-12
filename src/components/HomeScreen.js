import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function HomeScreen() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/users');
                const data = await response.json();
                setItems(data);
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        }
        fetchItems();
    }, []);

    const Styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            oadding: 20
        },
        item: {
            padding: 10,
            fontSize: 18,
            height: 44,
        }
    })


    return (
        <View style={Styles.container}>
            {loading ? <Text>Cargando datos...</Text> : (
                <FlatList
                    data={items}
                    renderItem={({ item }) => <Text style={Styles.item}>{item.name}</Text>}
                    keyExtractor={item => item.id.toString()}
                />
            )}
        </View>
    );
}
