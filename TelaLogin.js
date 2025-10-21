import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView, Platform } from 'react-native';
import axios from 'axios';
export default function TelaLogin({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const API_URL = 'http://192.168.1.70:3000';

  return (
    <View style={styles.container}>
      <Text 
        style={styles.title}>Login</Text>
      <Text style={styles.label}>E-mail:</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite seu E-mail aqui"
        value={email}
        onChangeText={setEmail}
      />
      <Text style={styles.label}>Senha:</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite sua senha aqui"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
      <Text style={styles.buttonText}>Entrar</Text>
    </TouchableOpacity>
      <Text style={styles.loginText}>Todos os Direitos reservados</Text>
  </View>
  ); 

}
const handleLogin = async () => {
  if (!email || !password) {
    Alert.alert('Erro', 'Por favor, preencha todos os campos.');
    return;
  }
  try {
    const response = await axios.post(`${API_URL}/login`, {
      email: email,
      password: password, 
    });
    const {userId, message} = response.data;
    Alert.alert('Sucesso', message);
    console.log('Login bem-sucedido, ID do usuário:', userId);
  }
  catch (error) {
    const errorMessage = error.response
      ? error.response.data.message
      : 'Ocorreu um erro ao fazer login. Tente novamente.';
    Alert.alert('Erro', errorMessage);
    console.error('Erro ao fazer login:', error);
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#a2ab5e',
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    fontWeight: 'bold',
    color: '#4f5a00',
    marginTop: "10rem"
  },
  label: {
    alignSelf: 'flex-start', 
    marginLeft: '10%', 
    marginTop: 2,
    marginBottom: 5,
    fontSize: 15,
    color: '#4f5a00', 
    fontWeight: 'bold',
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#dd9838', 
    paddingVertical: 10,      
    paddingHorizontal: 40,    
    borderRadius: 30,          
    shadowColor: '#000',       
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginTop: "2rem"
  },
  buttonText: {
    color: '#FFFFFF',        
    fontSize: 20,             
    fontWeight: 'bold',        
    textAlign: 'center',       
  },
  loginText: {
    fontSize: 14,
    color: '#4B3F33',
    marginRight: 5,
    paddingTop: 10,
    marginTop: "1rem",
  },
});