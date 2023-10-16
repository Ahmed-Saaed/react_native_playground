import {StyleSheet, Text, View, FlatList} from 'react-native';
import React from 'react';
import {MEALS} from '../data/dummy-data';

const MealsOverviewScreen = ({route}) => {
  const catId = route.params.categoryId;

  const displayedMeals = MEALS.filter((mealItem) => {
    return mealItem.categoryId.indexof(catId) >= 0;
  });

  const renderMealItem = (itemData) => {
    return <View></View>;
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={displayedMeals}
        keyExtractor={(item) => item.id}
        renderItem={renderMealItem}
      />
    </View>
  );
};

export default MealsOverviewScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
