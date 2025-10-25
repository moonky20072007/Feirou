import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TelaDeInicio from './TelaDeInicio';
import TelaCadastroProdutor from './TelaCadastroProdutor';
import TelaLogin from './TelaLogin';
import TelaCadastroConsumidor from './TelaCadastroConsumidor';
import configuracoesConsumidor from './configuracoesConsumidor';
import configuracoesProdutor from './configuracoesProdutor';

const Stack = createNativeStackNavigator();

function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Inicio'>
                <Stack.Screen 
                    name='Inicio' 
                    component={TelaDeInicio} 
                    options={{headerShown: false}}
                />
                <Stack.Screen 
                    name='CadastroProdutor' 
                    component={TelaCadastroProdutor} 
                    options={{headerShown: false}}
                />
                <Stack.Screen 
                    name='CadastroConsumidor' 
                    component={TelaCadastroConsumidor} 
                    options={{headerShown: false}}
                />
                <Stack.Screen 
                    name='Login' 
                    component={TelaLogin} 
                    options={{headerShown: false}}
                />
                <Stack.Screen 
                    name='configuracoesProdutor' 
                    component={configuracoesProdutor} 
                    options={{headerShown: false}}
                />
                <Stack.Screen 
                    name='configuracoesConsumidor' 
                    component={configuracoesConsumidor} 
                    options={{headerShown: false}}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
export default App;
