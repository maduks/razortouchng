import React from 'react';
import {Text} from 'react-native';
import colors from '../../../assets/color';
import fonts from '../../../assets/fonts';
import {normalize} from '../../../styles/responsiveScreen';

const FontText = ({
  children,
  style,
  color,
  pureColor,
  size,
  name,
  lineHeightFactor,
  lines,
  opacity,
  pTop,
  pLeft,
  pRight,
  pBottom,
  onPress,
  textAlign,
  textDecoration,
  onLayout,
  mTop,
  mLeft,
  mRight,
  mBottom,
}) => {
  const fontSize = size;
  const textStyle = {
    fontSize,
    fontFamily: fonts[name],
    color: pureColor || colors[color],
    lineHeight: fontSize * lineHeightFactor,
    opacity,
    paddingTop: pTop,
    paddingLeft: pLeft,
    paddingRight: pRight,
    paddingBottom: pBottom,
    marginTop: mTop,
    marginLeft: mLeft,
    marginRight: mRight,
    marginBottom: mBottom,
    textAlign,
    textDecorationLine: textDecoration,
    textDecorationColor: textDecoration ? pureColor || colors[color] : null,
    textDecorationStyle: textDecoration ? 'solid' : null,
  };
  return (
    <Text
      allowFontScaling={false}
      numberOfLines={lines}
      onLayout={onLayout}
      onPress={onPress}
      style={[textStyle, style]}>
      {children}
    </Text>
  );
};

FontText.defaultProps = {
  size: normalize(14),
  name: 'Poppins-Regular',
  color: 'default',
  lineHeightFactor: 1.5,
  lines: 0,
  opacity: 1,
  textAlign: 'left',
  pTop: 0,
  pLeft: 0,
  pRight: 0,
  pBottom: 0,
  mTop: 0,
  mLeft: 0,
  mRight: 0,
  mBottom: 0,
  textDecoration: null,
};

export default FontText;
