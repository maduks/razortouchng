import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import colors from '../../../assets/color';
import { normalize } from '../../../styles/responsiveScreen';

const { width, height } = Dimensions.get('screen');

const Price = props => {
  return (
    <View
      style={[{
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: width * 0.9,
        alignSelf: 'center',
        paddingBottom: height * 0.02,
        borderBottomWidth: props?.Border ? 1 : 0,
        borderBottomColor: props?.Border ? colors.gray20 : 'transparent',
        marginVertical: height * 0.007,

      }, props.TextStyle]}>
      <Text
        style={[styles.Fonts, { color: props?.Color, fontSize: props?.Font }]}>
        {props.Title}
      </Text>
      <Text style={[styles.Fonts, { color: props?.Color, fontSize: props.Font }]}>
        {props.Price}
      </Text>
    </View>
  );
};

export default Price;

const styles = StyleSheet.create({
  Fonts: {
    fontSize: normalize(12),
    fontFamily: 'poppins-medium',
    maxWidth: '50%'
  },
});
