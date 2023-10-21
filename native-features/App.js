import {StatusBar} from 'expo-status-bar';
import {StyleSheet, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AllPlaces from './screens/AllPlaces';
import AddPlace from './screens/AddPlace';
import IconButton from './components/UI/IconButton';
import {Colors} from './constatns/colors';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <StatusBar style='dark' />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {backgroundColor: Colors.primary500},
            headerTintColor: Colors.gray700,
            contentStyle: {backgroundColor: Colors.gray700},
          }}
        >
          <Stack.Screen
            name='AllPlaces'
            component={AllPlaces}
            options={({navigation}) => ({
              title: 'your favourite places',
              headerRight: ({tintColor}) => (
                <IconButton
                  icon='add'
                  size={24}
                  color={tintColor}
                  onPress={() => {
                    navigation.navigate('Addplace');
                  }}
                />
              ),
            })}
          />
          <Stack.Screen
            name='Addplace'
            component={AddPlace}
            options={{
              title: 'add new place',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
