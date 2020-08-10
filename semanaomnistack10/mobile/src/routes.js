import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Main from './pages/Main';
import Profile from './pages/Profile';

// Routes será um componente. Embora não tenha HTML, ele é um componente
const Routes = createAppContainer( //Cria o App. Usado só uma vez no código
    createStackNavigator({ // Determina as rotas existentes no app (Main e Profile). Isso no primeiro parâmetro da função
        Main: {
            screen: Main, // O screen especifica qual componente vai ser renderizado
            navigationOptions: { // Permite customizar a tela
                title: "DevRadar"
            },
        },
        Profile: {
            screen: Profile,
            navigationOptions: {
                title: "Perfil no Github"
            }
        }
    }, { // O segundo parâmetro de createStackNavigation é o defaultNavigationOptions, que aplica os estilos e costumizações para todas as rotas de maneira Default
        defaultNavigationOptions: {
            headerTintColor: "#FFF", // Muda a cor do título do header
            headerTitleAlign: "justify", //Centraliza o título
           // headerBackTitleVisibla: false,
            headerStyle: {
                backgroundColor: "#7D40E7",
            }
        }
    })
);

export default Routes;

// Todo esse código está na documentação do React Navigation