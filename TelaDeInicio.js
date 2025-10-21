import { useState } from "react";
import axios from "axios";
import { View, Text, Image, StyleSheet, TouchableOpacity} from "react-native";

export default function TelaDeInicio({ navigation }) {
  const API_URL = 'http://192.168.1.70:3000';
    const handleComprarPress = () => {
      navigation.navigate('CadastroConsumidor');
    };
  
    const handleVenderPress = () => {
      navigation.navigate('CadastroProdutor');
    };

    return (
      <View style={styles.container}>
        <Image 
          source={require('./assets/logo.jpg')} 
          style={styles.logo} 
        />
        <View style={styles.buttonArea}>
          <TouchableOpacity style={[styles.button, styles.comprarbutton]} onPress={handleComprarPress}>
            <Text style={[styles.buttonText, styles.buttonText1]}>Deseja comprar?</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.venderbutton]} onPress={handleVenderPress}>
            <Text style={[styles.buttonText, styles.buttonText2]}>Deseja vender?</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.footerText}>Todos os Direitos reservados®</Text>
        </View>
    );
}


const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#4F5A00",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  logo: {
    width: 250, 
    height: 82,
    resizeMode: "contain",
    marginBottom: 40,
  },
  button: {
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff", 
    borderWidth: 2, 
  },
  buttonArea: {
    backgroundColor: "#FFFFFF", 
    borderRadius: 25, 
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 6 }, 
    shadowRadius: 10,
    elevation: 8,
    width: "90%",
    maxWidth: 450, 
    paddingVertical: 68, 
    paddingHorizontal: 32, 
    alignItems: "center",
  },
  footerText: {
    fontSize: 15,
    color: "#6B8E23", 
    marginTop: 40,
    textAlign: 'center',
  },
  comprarbutton: {
    borderColor: "#6B8E23",
  },
  venderbutton: {
    borderColor: "#AA6700",
  },
});
