import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  StyleSheet, 
  Alert,
  ActivityIndicator,
  Image 
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function App() {
  const [userData, setUserData] = useState({
    username: 'Zé_do_alface',
    description: '',
    displayName: '',
    phone: '',
    profilePhoto: null
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [isEditing, setIsEditing] = useState({
    description: false,
    displayName: false,
    phone: false
  });

  // Placeholders
  const placeholders = {
    description: 'Digite a sua história e a da sua produção aqui...',
    displayName: 'Digite o seu nome ou o nome da sua empresa aqui...',
    phone: 'Digite o seu número aqui'
  };

  useEffect(() => {
    loadUserData();
    requestPermission();
  }, []);

  const requestPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissão necessária', 'Precisamos de acesso à galeria para adicionar fotos.');
    }
  };

  const loadUserData = async () => {
    try {
      setLoading(true);
      // Simulando carregamento de dados
      setTimeout(() => {
        setUserData({
          username: 'Zé_do_alface',
          description: '',
          displayName: '',
          phone: '',
          profilePhoto: null
        });
        setLoading(false);
      }, 1000);
    } catch (error) {
      Alert.alert('Erro', 'Erro ao carregar dados');
      setLoading(false);
    }
  };

  // Selecionar foto da galeria
  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets[0].uri) {
        await uploadPhoto(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível selecionar a imagem');
    }
  };

  // Tirar foto com a câmera
  const takePhoto = async () => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permissão necessária', 'Precisamos de acesso à câmera para tirar fotos.');
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets[0].uri) {
        await uploadPhoto(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível tirar a foto');
    }
  };

  // Fazer upload da foto (simulado)
  const uploadPhoto = async (photoUri) => {
    try {
      setUploadingPhoto(true);
      
      // Simulando upload
      setTimeout(() => {
        setUserData(prev => ({
          ...prev,
          profilePhoto: photoUri
        }));
        setHasChanges(true);
        setUploadingPhoto(false);
        Alert.alert('Sucesso', 'Foto atualizada com sucesso!');
      }, 1500);
      
    } catch (error) {
      Alert.alert('Erro', 'Erro ao fazer upload da foto');
      setUploadingPhoto(false);
    }
  };

  // Mostrar opções para foto
  const showPhotoOptions = () => {
    Alert.alert(
      'Alterar Foto',
      'Escolha uma opção:',
      [
        {
          text: 'Tirar Foto',
          onPress: takePhoto,
        },
        {
          text: 'Escolher da Galeria',
          onPress: pickImage,
        },
        ...(userData.profilePhoto ? [{
          text: 'Remover Foto',
          onPress: removePhoto,
          style: 'destructive',
        }] : []),
        {
          text: 'Cancelar',
          style: 'cancel',
        },
      ]
    );
  };

  // Remover foto
  const removePhoto = () => {
    setUserData(prev => ({
      ...prev,
      profilePhoto: null
    }));
    setHasChanges(true);
  };

  // Manipular foco do campo
  const handleFocus = (field) => {
    setIsEditing(prev => ({
      ...prev,
      [field]: true
    }));
  };

  // Manipular perda de foco
  const handleBlur = (field) => {
    setIsEditing(prev => ({
      ...prev,
      [field]: false
    }));
  };

  // Atualizar campo específico
  const updateField = (field, value) => {
    setUserData(prev => ({
      ...prev,
      [field]: value
    }));
    setHasChanges(true);
  };

  // Obter valor para exibição
  const getDisplayValue = (field) => {
    if (userData[field] === '' && !isEditing[field]) {
      return '';
    }
    return userData[field];
  };

  // Salvar alterações (simulado)
  const saveChanges = async () => {
    if (!hasChanges) return;

    try {
      setSaving(true);
      
      // Simulando salvamento
      setTimeout(() => {
        setHasChanges(false);
        setSaving(false);
        Alert.alert('Sucesso', 'Dados atualizados com sucesso!');
      }, 1500);
      
    } catch (error) {
      Alert.alert('Erro', 'Erro ao salvar dados');
      setSaving(false);
    }
  };

  // Fazer logout
  const handleLogout = () => {
    Alert.alert(
      'Sair',
      'Tem certeza que deseja sair?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Sair', 
          style: 'destructive',
          onPress: async () => {
            // Simulando logout
            setTimeout(() => {
              Alert.alert('Sucesso', 'Logout realizado com sucesso');
            }, 1000);
          }
        }
      ]
    );
  };

  // Mudar de conta
  const handleChangeAccount = () => {
    Alert.alert('Mudar de Conta', 'Funcionalidade em desenvolvimento');
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#ffffff" />
        <Text style={styles.loadingText}>Carregando...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Photo Section */}
      <View style={styles.photoSection}>
        <TouchableOpacity onPress={showPhotoOptions} style={styles.photoContainer}>
          {userData.profilePhoto ? (
            <Image 
              source={{ uri: userData.profilePhoto }} 
              style={styles.profilePhoto}
            />
          ) : (
            <View style={styles.placeholderPhoto}>
              <Text style={styles.placeholderText}>+</Text>
              <Text style={styles.placeholderSubtext}>Adicionar Foto</Text>
            </View>
          )}
          {uploadingPhoto && (
            <View style={styles.uploadOverlay}>
              <ActivityIndicator color="#ffffff" size="small" />
            </View>
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={showPhotoOptions}>
          <Text style={styles.changePhotoText}>Alterar Foto</Text>
        </TouchableOpacity>
      </View>

      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.username}>{userData.username}</Text>
        <TextInput
          style={styles.descriptionInput}
          value={getDisplayValue('description')}
          onChangeText={(text) => updateField('description', text)}
          onFocus={() => handleFocus('description')}
          onBlur={() => handleBlur('description')}
          placeholder={placeholders.description}
          placeholderTextColor="#666"
          multiline
          numberOfLines={3}
        />
      </View>

      {/* Separator */}
      <View style={styles.separator} />

      {/* Name Change Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Alterar nome:</Text>
        <TextInput
          style={styles.textInput}
          value={getDisplayValue('displayName')}
          onChangeText={(text) => updateField('displayName', text)}
          onFocus={() => handleFocus('displayName')}
          onBlur={() => handleBlur('displayName')}
          placeholder={placeholders.displayName}
          placeholderTextColor="#666"
        />
      </View>

      {/* Contact Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Contato:</Text>
        <TextInput
          style={styles.textInput}
          value={getDisplayValue('phone')}
          onChangeText={(text) => updateField('phone', text)}
          onFocus={() => handleFocus('phone')}
          onBlur={() => handleBlur('phone')}
          placeholder={placeholders.phone}
          placeholderTextColor="#666"
          keyboardType="phone-pad"
        />
      </View>

      {/* Save Button */}
      {hasChanges && (
        <TouchableOpacity 
          style={styles.saveButton} 
          onPress={saveChanges}
          disabled={saving}
        >
          {saving ? (
            <ActivityIndicator color="#ffffff" />
          ) : (
            <Text style={styles.saveButtonText}>Salvar Alterações</Text>
          )}
        </TouchableOpacity>
      )}

      {/* Separator */}
      <View style={styles.separator} />

      {/* Account Actions */}
      <View style={styles.section}>
        <TouchableOpacity 
          style={styles.accountButton} 
          onPress={handleChangeAccount}
        >
          <Text style={styles.accountButtonText}>Mudar de Conta</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.logoutButton} 
          onPress={handleLogout}
        >
          <Text style={styles.logoutButtonText}>Sair</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#4F5A00',
    marginTop: 10,
  },
  photoSection: {
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  photoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  profilePhoto: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#4F5A00',
  },
  placeholderPhoto: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: '#4F5A00',
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: {
    fontSize: 32,
    color: '#666',
    fontWeight: '300',
  },
  placeholderSubtext: {
    fontSize: 12,
    color: '#000000',
    marginTop: 5,
  },
  uploadOverlay: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#A2AB5E',
    alignItems: 'center',
    justifyContent: 'center',
  },
  changePhotoText: {
    color: '#4F5A00',
    fontSize: 14,
    fontWeight: '600',
  },
  header: {
    padding: 20,
    paddingBottom: 15,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 10,
    textAlign: 'center',
  },
  descriptionInput: {
    fontSize: 14,
    color: '#000000',
    lineHeight: 20,
    textAlignVertical: 'top',
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#4F5A00',
    minHeight: 80,
  },
  separator: {
    height: 1,
    backgroundColor: '#333333',
    marginHorizontal: 20,
    marginVertical: 10,
  },
  section: {
    padding: 20,
    paddingTop: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 10,
  },
  textInput: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 12,
    color: '#000000',
    fontSize: 14,
    borderWidth: 1,
    borderColor: '#4F5A00',
  },
  saveButton: {
    backgroundColor: '#DF9838',
    margin: 20,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  accountButton: {
    paddingVertical: 12,
  },
  accountButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },
  logoutButton: {
    paddingVertical: 12,
    marginTop: 5,
  },
  logoutButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#D80004',
  },
});
