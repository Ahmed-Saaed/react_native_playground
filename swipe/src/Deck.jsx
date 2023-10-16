import {
  StyleSheet,
  Text,
  View,
  Animated,
  PanResponder,
  Dimensions,
} from 'react-native';
import React from 'react';

const WIDTH = Dimensions.get('window').width;
const SWIPE_THERESHOLD = WIDTH * 0.25;
const SWIPE_OUT_DURATION = 250;

const Deck = ({renderCard, data}) => {
  const position = new Animated.ValueXY();

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (event, gesture) => {
      position.setValue({x: gesture.dx, y: gesture.dy});
    },
    onPanResponderRelease: (event, gesture) => {
      if (gesture.dx > SWIPE_THERESHOLD) {
        forceSwipe('right');
      } else if (gesture.dx < -SWIPE_THERESHOLD) {
        forceSwipe('left');
      } else {
        resetPosition();
      }
    },
  });

  const onSwipeComplete = (direction) => {
    const {onSwipeLeft, onSwipeRight} = props;
    direction === 'right' ? onSwipeRight() : onSwipeLeft();
  };

  const forceSwipe = (direction) => {
    const x = direction === 'right' ? WIDTH : -WIDTH;
    Animated.timing(position, {
      toValue: {x, y: 0},
      duration: SWIPE_OUT_DURATION,
    }).start(() => onSwipeComplete(direction));
  };

  const resetPosition = () => {
    Animated.spring(position, {
      toValue: {x: 0, y: 0},
    }).start();
  };

  const getCardStyle = () => {
    const rotate = position.x
      .interpolate({
        inputRange: [-WIDTH * 1.5, 0, WIDTH * 1.5],
        outputRange: ['-1200deg', '0deg', '120deg'],
      })
      .start();

    return {
      ...position.getLayout(),
      transform: [{rotate}],
    };
  };
  const renderCards = () => {
    data.map((item, index) => {
      if (index === 0) {
        return (
          <Animated.View
            key={item.id}
            style={getCardStyle()}
            {...panResponder.panHandlers}
          >
            {renderCard(item)}
          </Animated.View>
        );
      }
    });
  };

  return <View>{renderCards()}</View>;
};

export default Deck;

const styles = StyleSheet.create({});
