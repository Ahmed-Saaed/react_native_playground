import {StyleSheet, Text, View, component, Animated} from 'react-native';
import React from 'react';

const Ball = () => {
  const position = new Animated.ValueXY(0, 0);
  Animated.spring(position, {
    toValue: {x: 200, y: 500},
  }).start();
  return (
    <Animated.View style={position.getLayout()}>
      <View style={styles.ball} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  ball: {
    height: 60,
    width: 60,
    borderRadius: 30,
    borderWidth: 30,
    borderColor: 'black',
  },
});

export default Ball;
