import {StyleSheet, Text, View} from 'react-native';
import React, {useContext} from 'react';
import MealsList from '../components/MealsList/MealsList';
import {FavoritesContext} from './../store/context/favorite-context';
import {MEALS} from '../data/dummy-data';

const FavoritesScreen = () => {
  const favoriteMealCtx = useContext(FavoritesContext);
  const favoriteMeals = MEALS.filter((meal) =>
    favoriteMealCtx.ids.includes(meal.id)
  );

  if (favoriteMeals.length === 0) {
    <View>
      <Text></Text>
    </View>;
  }

  return <MealsList items={favoriteMeals} />;
};

export default FavoritesScreen;

const styles = StyleSheet.create({});
