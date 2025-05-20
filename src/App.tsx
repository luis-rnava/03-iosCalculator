/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {useEffect, type PropsWithChildren} from 'react';
import {StatusBar, Text, View} from 'react-native';
import {CalculatorScreen} from './presentation/screens/CalculatorScreen';
import {styles} from './config/theme/app-theme';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function App() {
  return (
    <View style={{paddingTop: 20, ...styles.background}}>
      <StatusBar barStyle={'light-content'} backgroundColor={'black'} />
      <CalculatorScreen />
    </View>
  );
}

export default App;
