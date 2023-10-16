import {StatusBar} from 'expo-status-bar';
import {StyleSheet, Text, View} from 'react-native';
import CategoriesScreen from './screens/CategoriesScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MealOverviewScreen from './screens/MealsOverviewScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <StatusBar style='light'></StatusBar>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {backgroundColor: '#351401'},
            headerTintColor: 'white',
            contentStyle: {backgroundColor: '#543f33'},
          }}
        >
          <Stack.Screen name='MealCategories' component={CategoriesScreen} />
          <Stack.Screen
            name='MealOverview'
            component={MealOverviewScreen}
            options={{
              title: 'All categories',
              headerStyle: {backgroundColor: '#351401'},
              headerTintColor: 'white',
              contentStyle: {backgroundColor: '#543f33'},
            }}
          />
        </Stack.Navigator>
        <CategoriesScreen />
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   backgroundColor: '#fff',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
});
