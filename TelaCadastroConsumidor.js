import { useState } from 'react';
import axios from 'axios';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';

export default function TelaCadastroConsumidor({navigation}) { 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const id_consumidor = 0;
    const telefone = 0;
    const quantidade_seguindo = 0;

    const API_URL = 'http://192.168.1.70:3000';

    const handleCreateAccount = async () => { 
        if(!email || !password) {
            Alert.alert('Erro', 'Favor preencher todos os campos.');
            return;
        }
        
        try {
            const response = await axios.post(`${API_URL}/consumidor`, {
                id_consumidor,
                nome_usuario: email,
                password: password,
                telefone,
                quantidade_seguindo
            });

        if (response.status === 201 || response.data.success) {
            Alert.alert('Sucesso', 'Conta criada com sucesso!');
            navigation.navigate('Login');
      } else {
              Alert.alert('Erro', 'Falha ao criar conta. Tente novamente.');
      }

        } catch (error) {
            const errorMessage = error.response
                ? error.response.data.message 
                : 'Não foi possível conectar ao servidor ou houve um erro no cadastro.';
            
            Alert.alert('Erro no Cadastro', errorMessage);
            console.error('Erro de Cadastro:', error);
        }
    };

    const handleLogin = () => {
        navigation.navigate('Login');
    }

      return (
    <ScrollView contentContainerStyle={styles.ScrollContainer}>
      <Text 
        style={styles.title_cadastro}>Cadastro</Text>
        <Text 
        style={styles.title_consumidor}>Consumidor</Text>

        <View>
          <Text style={styles.label}>E-mail:</Text>
          <TextInput
            style={styles.input_email}
            placeholder="Digite seu E-mail aqui"
            value={email}
            onChangeText={setEmail}
          />
          <Text style={styles.label}>Senha:</Text>
          <TextInput
            style={styles.input_senha}
            placeholder="Digite sua senha aqui"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>
      
      <View>
        <TouchableOpacity style={styles.button} onPress={handleCreateAccount}>
        <Text style={styles.buttonText}>Criar</Text>
        </TouchableOpacity>
        <Text style={styles.loginText}>Já tem uma conta?</Text>
        <TouchableOpacity onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
      </View>
  </ScrollView>
  );
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#a2ab5e',
  },
  title_cadastro: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4f5a00',
    marginTop: "13rem"
  },
  title_consumidor: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4f5a00',
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
  input_email: {
    width: '80%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    marginBottom: 16,
    backgroundColor: '#fff',
    marginTop: ""
  },
  input_senha: {
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
    marginTop: "1rem",
  },
  loginButtonText: {
    fontSize: 14,
    color: '#fffbeb', 
    fontWeight: 'bold',
    textDecorationLine: 'underline', 
  },
});