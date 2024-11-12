import React, { useState, useEffect } from "react";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import initializeStore from './store';  // Aquí importas tu función async

import NewUserScreen from "./components/NewUserScreen";
import RegisterUserScreen from "./components/registerComponents/RegisterUserScreen";
import RegisterNumberScreen from "./components/numberComponents/RegisterNumberScreen";
import AuthNumberScreen from "./components/numberComponents/AuthNumberScreen";
import LoginScreen from "./components/loginComponents/LoginScreen";

import { AuthProvider } from "./components/loginComponents/AuthProvider";


const Stack = createNativeStackNavigator();

const App = () => {
  const [store, setStore] = useState(null);  // El estado para guardar el store

  // Cargar el store de manera asíncrona
  useEffect(() => {
    const setupStore = async () => {
      const initializedStore = await initializeStore();  // Inicializa el store
      setStore(initializedStore);  // Guarda el store en el estado
    };

    setupStore();  // Llama la función para cargar el store
  }, []);

  // Mostrar una pantalla de carga mientras el store se está inicializando
  if (!store) {
    return null;  // Puedes reemplazar esto con un componente de carga, si lo prefieres
  }
  return (
    <Provider store={store}>
      <AuthProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="NewUserScreen">
            <Stack.Screen name="NewUser" component={NewUserScreen} options={{ title: 'Bienvenido' }} />
            <Stack.Screen name="RegisterUser" component={RegisterUserScreen} options={{ title: 'Registrar informacion de usuario' }} />
            <Stack.Screen name="RegisterNumber" component={RegisterNumberScreen} options={{ title: 'Registrar numero' }} />
            <Stack.Screen name="AuthNumber" component={AuthNumberScreen} options={{ title: 'Autenticar numero' }} />
            <Stack.Screen name="LoginUser" component={LoginScreen} options={{ title: 'Login Usuario' }} />
          </Stack.Navigator>
        </NavigationContainer>
      </AuthProvider>
    </Provider>
  );
}

export default App;