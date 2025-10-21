import axios from 'axios';
import { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function TelaCadastroProdutor({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [nomeEmpresa, setNomeEmpresa] = useState('');
  const id_produtor = 0;
  const telefone = 0;
  const quantidade_seguindo = 0;
  const quantidade_seguidores = 0;
  const quantidade_posts = 0;
  const descricao_perfil = '';  

  //const { id_produtor, nome_usuario, email, senha, CPF_CNPJ, telefone, quantidade_seguindo, quantidade_seguidores, quantidade_posts, descricao_perfil } = req.query;
  const API_URL = 'http://192.168.1.70:3000';
  const handleCreateAccount = async () => {
      if(!email || !password || !cnpj || !nomeEmpresa) {
        Alert.alert('Erro', 'Favor preencher todos os campos.');
        return;
      }
      
try {
  //const response2 = await axios.get('${API_URL}/produtor');
  const response = await axios.post(`${API_URL}/produtor`, {
    id_produtor,
    nome_usuario: nomeEmpresa,
    email,
    senha: password,
    CPF_CNPJ: cnpj,
    telefone,
    quantidade_seguindo,
    quantidade_seguidores,
    quantidade_posts,
    descricao_perfil
    
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
    : 'Ocorreu um erro ao criar a conta. Tente novamente.';

  Alert.alert('Erro', errorMessage);
  console.error('Erro ao criar conta:', error);
} 
    };

  const handleLogin = () => {
    navigation.navigate('Login');
  };

  return (

      <View style={styles.container}>
      <Text 
        style={styles.title}>Cadastro</Text>
        <Text 
        style={styles.title}>Vendedor</Text>
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
      <Text style={styles.label}>CNPJ/CPF:</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite seu CNPJ ou CPF aqui"
        value={cnpj}
        onChangeText={setCnpj}
        keyboardType="numeric"
        maxLength={14}
      />
      <Text style={styles.label}>Nome da Empresa:</Text>
      <TextInput
        style={styles.inputLong} 
        placeholder="Digite o seu nome ou o nome da sua empresa aqui"
        value={nomeEmpresa}
        onChangeText={setNomeEmpresa}
        multiline={true} 
        numberOfLines={3}
      />
      <TouchableOpacity style={styles.button} onPress={handleCreateAccount}>
      <Text style={styles.buttonText}>Criar</Text>
    </TouchableOpacity>
      <Text style={styles.loginText}>Já tem uma conta?</Text>
      <TouchableOpacity onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>

  </View>
    
    
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
  title: {
    fontSize: 24,
    marginBottom: 16,
    fontWeight: 'bold',
    color: '#4f5a00',
    marginTop: "10rem",
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
    marginTop: "0.5rem",
  },
  buttonText: {
    color: '#FFFFFF',        
    fontSize: 20,             
    fontWeight: 'bold',        
    textAlign: 'center',       
  },
  inputLong: {
    width: '80%',
    height: 70,
    backgroundColor: '#fff',
    borderRadius: 4,
    paddingHorizontal: 15,
    paddingVertical: 10, 
    marginBottom: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    textAlignVertical: 'top',
  },
  loginText: {
    fontSize: 14,
    color: '#4B3F33',
    marginRight: 5,
    paddingTop: 10,
    textAlign: 'center',
    marginTop: "1rem",
  },
  loginButtonText: {
    fontSize: 14,
    marginTop: 5,
    color: '#fffbeb', 
    fontWeight: 'bold',
    textDecorationLine: 'underline', 
  },
});