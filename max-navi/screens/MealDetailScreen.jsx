import {useLayoutEffect, useContext} from 'react';
import {FavoritesContext} from '../store/context/favorite-context';

import {View, Text, Image, StyleSheet, ScrollView} from 'react-native';

import IconButton from '../components/IconButton';
import List from '../components/MealDetail/List';
import SubTitle from '../components/MealDetail/SubTitle';
import MealDetails from '../components/MealDetails';
import {MEALS} from '../data/dummy-data';

function MealDetailScreen({route, navigation}) {
  const favoriteMealCtx = useContext(FavoritesContext);
  
  const mealId = route.params.mealId;
  const mealIsFavorite = favoriteMealCtx.ids.includes(mealId);
  
  const selectedMeal = MEALS.find((meal) => meal.id === mealId);

  function changeFavoritesHandler() {
    if (mealIsFavorite) {
      favoriteMealCtx.removeFavorite(mealId);
    } else {
      favoriteMealCtx.addFavorite(mealId);
    }
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <IconButton
            icon={mealIsFavorite ? 'star' : 'star-outline'}
            color='white'
            onPress={changeFavoritesHandler}
          />
        );
      },
    });
  }, [navigation, changeFavoritesHandler]);

  return (
    <ScrollView style={styles.rootContainer}>
      <Image style={styles.image} source={{uri: selectedMeal.imageUrl}} />
      <Text style={styles.title}>{selectedMeal.title}</Text>
      <MealDetails
        duration={selectedMeal.duration}
        complexity={selectedMeal.complexity}
        affordability={selectedMeal.affordability}
        textStyle={styles.detailText}
      />
      <View style={styles.listOuterContainer}>
        <View style={styles.listContainer}>
          <SubTitle>Ingredients</SubTitle>
          <List data={selectedMeal.ingredients} />
          <SubTitle>Steps</SubTitle>
          <List data={selectedMeal.steps} />
        </View>
      </View>
    </ScrollView>
  );
}

export default MealDetailScreen;

const styles = StyleSheet.create({
  rootContainer: {
    marginBottom: 32,
  },
  image: {
    width: '100%',
    height: 350,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    margin: 8,
    textAlign: 'center',
    color: 'white',
  },
  detailText: {
    color: 'white',
  },
  listOuterContainer: {
    alignItems: 'center',
  },
  listContainer: {
    width: '80%',
  },
});
