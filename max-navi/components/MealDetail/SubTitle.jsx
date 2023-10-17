import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const SubTitle = ({children}) => {
  return (
    <View style={styles.subtitleContainer}>
      <Text style={styles.subtitle}>{children}</Text>
    </View>
  );
};

export default SubTitle;

const styles = StyleSheet.create({
  subtitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    margin: 6,
    textAlign: 'center',
    borderBottomColor: 'white',
    borderBottomWidth: 2,
  },
  subtitleContainer: {
    padding: 6,
    margin: 4,
    marginHorizontal: 4,
    borderBottomColor: 'white',
    borderBottomWidth: 2,
  },
});
