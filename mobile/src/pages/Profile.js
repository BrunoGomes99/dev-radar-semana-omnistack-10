import React from 'react';
import { View } from 'react-native'; // View é um componente do próprio React Native. É similar a uma div
import { WebView } from 'react-native-webview';

function Profile({ navigation }){ // Parâmetro recebido da createStackNavigator

    // Como lá no Main.js é passado esse parâmetro no navigation.navigate. Aqui podemos recuperar esse parâmetro
    const githubUsername = navigation.getParam('github_username');

    return(
        <WebView style={{ flex: 1}} source={{ uri: `https://github.com/${githubUsername}` }}>

        </WebView>
    );
}

export default Profile;