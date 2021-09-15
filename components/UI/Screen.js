import React from 'react';
import {View, StyleSheet} from 'react-native';

const Screen = props => {
  return (
    <View style={{...styles.screen, ...props.style}}>{props.children}</View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#ffeded',
    padding: 10,
  },
});

export default Screen;
