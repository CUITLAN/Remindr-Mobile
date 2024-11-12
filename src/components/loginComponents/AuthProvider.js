import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingWarning from '../LoadingWarning';
import { Alert } from 'react-native';

// Create the context of the authentication
export const AuthContext = createContext();

// Componente proveedor del contexto de autenticación
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);  // Estado del usuario
  const [loading, setLoading] = useState(true);  // Estado para indicar si se está cargando el usuario

  // Recuperar el estado del usuario de AsyncStorage al cargar la aplicación
  useEffect(() => {
    const loadUserFromAsyncStorage = async () => {
      try {
        const loggedInUser = await AsyncStorage.getItem('user');  // Obtener el usuario de AsyncStorage
        if (loggedInUser) {
          setUser(JSON.parse(loggedInUser)); // Cargar el usuario
        }
      } catch (error) {
        console.error('Error al recuperar el usuario de AsyncStorage', error);
      } finally {
        setLoading(false);  // Una vez que se recupera el usuario, terminamos de cargar
      }
    };
    loadUserFromAsyncStorage();
  }, [user]);

  // Función de login para actualizar el estado y AsyncStorage
  const login = async (userData) => {
    try {
      setUser(userData); // Actualiza el estado del usuario en el contexto
      await AsyncStorage.setItem('user', JSON.stringify(userData)); // Guarda en AsyncStorage
    } catch (e) {
      console.error('Error al guardar el usuario en AsyncStorage', e);
    }
  };

  // Función de logout para limpiar el estado y AsyncStorage
  const logout = () => {
    Alert.alert('¿Seguro que deseas cerrar sesión?',
      'Si cierras sesión, tendrás que volver a iniciar sesión',
      [
        {
          text: 'Cancelar',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel'
        },
        {
          text: 'Cerrar sesión',
          onPress: async () => {
            try {
              setUser(null); // Limpia el estado del usuario
              await AsyncStorage.removeItem('user'); // Limpia AsyncStorage
              // Elimina otros datos si es necesario
            } catch (e) {
              console.error('Error al eliminar el usuario de AsyncStorage', e);
            }
          }
        }
      ]
    );
  };

  // Si está cargando, puedes mostrar un "loading spinner" o algo mientras recuperas el estado del usuario
  if (loading) {
    return <LoadingWarning />;  // Esto evita que renderice el contenido antes de saber si hay un usuario autenticado
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
