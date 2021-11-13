import React from 'react';

import Routes from './src/routes'; // Importa as rotas
import { View, StatusBar, YellowBox } from 'react-native';

// A grande diferença do React Native é seu uso de CSS dentro do próprio componente
// No componente não utilizamos tags normais e sim outros componentes
// Cada componente deve ter um "style" próprio. Portanto, uma tag dentro de outra não herdará styles da anterior
// Na declaração do css, não utliza-se hífen e sim, camelCase. E os valores dos atribuitos devem estar em string


YellowBox.ignoreWarnings([ // Para de mostrar os warnings no app mobile. Note que ele passa em um array, onde a gente especifica os warnings que queremos ignorar. Basta escrever o começo do warning
  'Unrecognized WebSocket',
  'Cannot connect to the Metro server',
]);

export default function App() {
  return (
     // A StatusBar é a aba de notificações, bateria, hora, internet etc. no topo do celular
    // Devemos usar o fragment <> </> pq o React não aceita simplesmente um componente abaixo do outro. Eles devem estar encapsulados por um container
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7D40E7" />
      <Routes />
    </>
  );
}

