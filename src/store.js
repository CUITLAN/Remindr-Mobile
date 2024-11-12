import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Función para guardar el estado en AsyncStorage
const saveToAsyncStorage = async (state) => {
    try {
        const serializedState = JSON.stringify(state);
        await AsyncStorage.setItem('reduxState', serializedState);
    } catch (e) {
        console.error("No se pudo guardar el estado en AsyncStorage", e);
    }
};

// Función para cargar el estado desde AsyncStorage
const loadFromAsyncStorage = async () => {
    try {
        const serializedState = await AsyncStorage.getItem('reduxState');
        if (serializedState === null) {
            console.log("No se encontró estado persistido en AsyncStorage");
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (e) {
        console.error("No se pudo cargar el estado desde AsyncStorage", e);
        return undefined;
    }
};


// Cargar el estado persistido de AsyncStorage antes de crear el store
const initializeStore = async () => {
    try {
        const persistedState = await loadFromAsyncStorage();

        const store = configureStore({
            reducer: rootReducer,
            preloadedState: persistedState,
        });

        store.subscribe(() => {
            saveToAsyncStorage(store.getState());
        });

        return store;
    } catch (e) {
        console.error('Error inicializando el store:', e);
        return configureStore({ reducer: rootReducer });  // Retornar un store básico en caso de error
    }
};


export default initializeStore;
