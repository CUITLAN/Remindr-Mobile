import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';

// Componente reutilizable
const AppButton = ({ 
  onPress, 
  title, 
  backgroundColor = '#8a2be2', 
  textColor = '#fff', 
  disabled = false, 
  loading = false 
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.buttonContainer, 
        { backgroundColor: disabled ? '#ccc' : backgroundColor },
      ]}
      activeOpacity={0.8}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text style={[styles.buttonText, { color: textColor }]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

// Estilos del componente
const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 32,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AppButton;
