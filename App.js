import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TelaDeInicio from './TelaDeInicio';
import TelaCadastroProdutor from './TelaCadastroProdutor';
import TelaLogin from './TelaLogin';
import TelaCadastroConsumidor from './TelaCadastroConsumidor';
import ConfiguracoesConsumidor from './configuracoesConsumidor';
import ConfiguracoesProdutor from './configuracoesProdutor';
import SplashScreen from './components/SplashScreen';

const Stack = createNativeStackNavigator();

function MainNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Inicio">
        <Stack.Screen 
          name="Inicio" 
          component={TelaDeInicio} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="CadastroProdutor" 
          component={TelaCadastroProdutor} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="CadastroConsumidor" 
          component={TelaCadastroConsumidor} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Login" 
          component={TelaLogin} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="configuracoesProdutor" 
          component={ConfiguracoesProdutor} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="configuracoesConsumidor" 
          component={ConfiguracoesConsumidor} 
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simula um tempo de carregamento
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <SplashScreen onLoadingComplete={() => setIsLoading(false)} />;
  }

  return <MainNavigator />;
}