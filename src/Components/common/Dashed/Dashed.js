import React from 'react';
import {StyleSheet, Text, View, Dimensions} from 'react-native';

const {width} = Dimensions.get('screen');

const Dashed = props => {
  return (
    <View style={[styles.row, props.ContainerStyle]}>
      {[...Array(100)].map((v, i) => (
        <View
          key={i}
          style={{
            width: props.width || width * 0.015,
            height: 1,
            marginRight: width * 0.02,
            backgroundColor: '#000',
          }}
        />
      ))}
    </View>
  );
};

export default Dashed;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    overflow: 'hidden',
  },
});
