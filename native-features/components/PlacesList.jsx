import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import PlaceItem from './PlaceItem';

const PlacesList = ({places}) => {
  if (!places || places.length === 0) {
    return (
      <View style={styles.fallBackContainer}>
        <Text style={styles.fallBackText}> no places added yet</Text>
      </View>
    );
  }
  return (
    <FlatList
      data={places}
      keyExtractor={(place) => {
        place.id;
      }}
      renderItem={({item}) => <PlaceItem place={item} />}
    />
  );
};

export default PlacesList;

const styles = StyleSheet.create({
  fallBackContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fallBackText: {
    fontSize: 16,
  },
});
