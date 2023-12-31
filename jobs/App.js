import {StyleSheet, Text, View} from 'react-native';
import {TabNavigator, StackNavigator} from '@react-navigation/native';

import AuthScreen from './screens/AuthScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import MapScreen from './screens/MapScreen';
import DeckScreen from './screens/DeckScreen';
import ReviewScreen from './screens/ReviewScreen';
import SettingsScreen from './screens/SettingsScreen';

export default function App() {
  const MainNavigator = TabNavigator({
    welcome: {screen: WelcomeScreen},
    auth: {screen: AuthScreen},
    main: {
      screen: TabNavigator({
        map: {screen: MapScreen},
        deck: {screen: DeckScreen},
        review: {
          screen: StackNavigator({
            review: {screen: ReviewScreen},
            settings: {screen: SettingsScreen},
          }),
        },
      }),
    },
  });

  return (
    <View style={styles.container}>
      <MainNavigator />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
