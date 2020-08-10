import React, { useState, useEffect } from 'react';
import MapView, { Marker, Callout } from 'react-native-maps';
import { StyleSheet, Image, View, Text, TextInput, TouchableOpacity, Keyboard } from 'react-native';
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location';
import { MaterialIcons } from '@expo/vector-icons'; // Importa inúmeros pacotes de icones

import api from '../services/api';
import { connect, dijsconnect, subscribeToNewDevs } from '../services/socket';

function Main({ navigation }){ // Tudo que vem de createStackNavigator recebe uma propriedade única chamada "navigation"

    const [ devs, setDevs ] = useState([]);
    const [ currentRegion, setCurrentRegion ] = useState(null); // Região atual do usuário inicializada como null
    const [ techs, setTechs ] = useState(''); // Pra pegar as tecnlogias informadas pelo usuário no campo de texto de busca
 
    // Só pra lembrar, o useEffect é uma função que chama outras funções
    // Nesse caso, ela irá declarar e chamar a função loadInitialPosition que utiliza os recursos do expo-location. Executa só uma vez
    useEffect(() => {

        async function loadInitialPosition() {
             
            // O granted é um retorno da requestPermissionsAsync que diz se o usuário permitiu ou não, compartilhar suas informações de localização
            const { granted } = await requestPermissionsAsync();
            
            if(granted){
                const { coords } = await getCurrentPositionAsync({
                    enableHighAccuracy: true, // Busca a localização via GPS por ser mais preciso
                });

                const { latitude, longitude } = coords;
                setCurrentRegion({
                    latitude,
                    longitude,
                    latitudeDelta: 0.04, // Cálculos da própria API referentes a zoom no mapa
                    longitudeDelta: 0.04, // Cálculos da própria API referentes a zoom no mapa
                });
            }
        }

        loadInitialPosition();

    }, []);


    useEffect(() => {
        subscribeToNewDevs(dev => setDevs([...devs, dev])); // Isso irá verificar se um novo dev com as características de busca foi adicionado, e irá resetar os devs com os anteriores mais o dev novo. Se o novo dev não corresponder à busca, a variável "dev" vem vazia, e devs recebe apenas os já existentes
    }, [devs]); // Sempre que a variável devs alterar. Será chamada a função subscribeToNewDevs para verificar se um novo dev correspondente às buscas do usuário foi adicionado para ser mostrado em tempo real


    function setupWebsocket(){

        disconnect();

        const { latitude, longitude } = currentRegion;
        
        connect(
            latitude,
            longitude,
            techs,
        );

        
    }

    async function loadDevs() {
        const { latitude, longitude } = currentRegion; // O currentRegion teve sua liatude e longitude setadas no useEffect acima
    
        const response = await api.get('/search', {
            params: {
                latitude,
                longitude,
                techs
            }
        });

        setDevs(response.data.devs); // O .devs no final é pq as informações do desenvolvedor é retornada dentro desse array "devs" no Json. Verificar no Insomnia
        
        setupWebsocket(); // Chama a função para se conectar ao webSocket. Isso será feito só quando o usuário fizer uma busca por devs
    }

    function handleRegionChanged (region) { // A própria função onRegionChangeComplete, passa uma parâmetro "region" na sua definição (ver definição da função). Este é do tipo Region que retorna a latitude, longitude etc
        setCurrentRegion(region);
    }

    if(!currentRegion) {
        // Enquanto não tiver a localização do usuário, o app não vai nem renderizar o mapa
        return null;
    }


    return(
        // O OnPress utilizado no Callout é uma propriedade equivalente ao OnClick, pode ser utilizado em qualquer componente
        // O Callout é o que vai aparecer ao clicarmos na marcação
        // O Image é um component do react-native
        // O Marker é um component do react-native-maps que põe uma marcação no mapa
        // No MapView, o onRegionChangeComplete chama uma função sempre que a localização atual do usuário no mapa muda. Sempre que o usuário arrastar o dedo mexendo na localização do mapa, essa função será acionada

        // A View com o TextInput fica fora do componente de MapView, embora ainda fique sobre o mapa (O que é feito no styles.searchForm)
        // autoCapitaliza="words" quer dizer que cada palavra buscada pelo usuário iniciará com letra maiúscula
        // TouchableOpacity é um botão que diminui sua opacidade ao clicarmos nele
        <>
            <MapView onRegionChangeComplete={handleRegionChanged} style={styles.map} initialRegion={currentRegion} >
               
                {devs.map(dev => {

                    return(
                        <Marker 
                        key={dev._id}
                        coordinate={{ 
                            longitude: dev.location.coordinates[0],
                            latitude: dev.location.coordinates[1], 
                        }}>
                            <Image style={styles.avatar} source={{ uri: dev.avatar_url }} />
                    
                            <Callout onPress={() => {
                            // Navegação
                            // O navigation.navigate passa a tela que será chamada e outros parâmetros opicionais
                            navigation.navigate('Profile', { github_username: dev.github_username });
                            }}>
                                <View style={styles.callout}>
                                    <Text style={styles.devName}>{dev.name}</Text>
                                    <Text style={styles.devBio}>{dev.bio}</Text>
                                    <Text style={styles.devTechs}>{dev.techs.join(', ')}</Text>
                                </View>
                            </Callout>        
                        </Marker>
                    );

                })}
                
            </MapView>
            <View style={styles.searchForm}>
                <TextInput style={styles.searchInput}
                           placeholder="Buscar devs por techs..."
                           placeholderTextColor="#999"
                           autoCapitalize="words"
                           autoCorrect={false}
                           value={techs} // O valor inicial será aquele atribuído no useState
                           onChangeText={text => setTechs(text)} // .toLowerCase()
                />

                <TouchableOpacity onPress={loadDevs} style={styles.loadButton} >
                    <MaterialIcons name="my-location" size={20} color="#FFF"></MaterialIcons>
                </TouchableOpacity>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    map: {
        flex: 1
    },
    avatar: {
        width: 54,
        height: 54,
        borderRadius: 4,
        borderWidth: 4,
        borderColor: '#FFF'
    },
    callout: {
        width: 260,
    },
    devName: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    devBio: {
        color: '#666',
        marginTop: 5,
    },
    devTechs: {
        marginTop: 5,
    },
    searchForm:{
        position: 'absolute', // Faz o input flutuar sobre o mapa
        bottom: 20, // É como se fosse o margin. Distancia 20px debaixo da tela
        //top: 20,
        left: 20,
        right: 20,
        zIndex: 5,
        flexDirection: 'row' // Por padrão o React Native já utiliza o display: flex por PADRÃO
    },
    searchInput: {
        flex: 1,
        height: 50,
        backgroundColor: "#FFF",
        color: "#333", // Cor do texto
        borderRadius: 25, // Deixa o input arredondado
        paddingHorizontal: 20, // Padding só nas laterais
        fontSize: 16,
        shadowColor: "#000", // Os três "Shadows são aplicados só para IOS"
        shadowOpacity: 0.2,
        shadowOffset: {
            width: 4,
            height: 4,
        },
        elevation: 5, // Sombreamento automatico utilizado pelo Android
    },
    loadButton: {
        width: 50,
        height: 50,
        backgroundColor: '#8E4Dff',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 15,
    },
});

export default Main;