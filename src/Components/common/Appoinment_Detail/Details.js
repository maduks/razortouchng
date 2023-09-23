import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import colors from '../../../assets/color';
import { normalize, wp, hp } from '../../../styles/responsiveScreen';

const { width, height } = Dimensions.get('screen');

const Details = props => {
  return (
    <View
      style={{
        width: wp(90),
        alignSelf: 'center',
        borderBottomWidth: props?.Border ? 1 : 0,
        borderBottomColor: props?.Border ? colors.gray20 : 'tranparent',
        marginVertical: height * 0.008,
        paddingBottom: height * 0.01,
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: width * 0.9,
        }}>
        <Text style={[styles.fonts, { maxWidth: '65%' }]}>{props.Title}</Text>
        <Text style={styles.fonts}>{props.Price}</Text>
      </View>

      <Text style={[styles.fonts, { color: colors.lightViolet }]}>
        {props.Time}
      </Text>
    </View>
  );
};

export default Details;

const styles = StyleSheet.create({
  fonts: {
    fontSize: normalize(13),
    fontFamily: 'poppins-medium',
  },
});
