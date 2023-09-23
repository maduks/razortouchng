import React from 'react';
import {TouchableOpacity, StyleSheet, Dimensions} from 'react-native';
import colors from '../../../assets/color';
import {hp} from '../../../styles/responsiveScreen';
import SvgIcons from '../../../assets/SvgIcons';

const {width, height} = Dimensions.get('screen');

export default FloatingButton = props => (
  <TouchableOpacity
    onPress={props.onPress}
    style={[props.style, styles.button]}
    activeOpacity={0.5}>
    <SvgIcons.Filter height={hp(3.5)} width={hp(3.5)} />
  </TouchableOpacity>
);
const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.theme,
    width: width * 0.15,
    height: width * 0.15,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
  },
});
