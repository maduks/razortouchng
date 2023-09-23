import React from 'react';
import {Text} from 'react-native';
import colors from '../../../assets/color';
import fonts from '../../../assets/fonts';
import {normalize} from '../../../styles/responsiveScreen';
import SvgIcons from '../../assets/SvgIcons';

const arrownameheader = ({
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
  textAlign,
  textDecoration,
  onLayout,
}) => {
  const arrownameheader = size;
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
    textAlign,
    textDecorationLine: textDecoration,
    textDecorationColor: textDecoration ? pureColor || colors[color] : null,
    textDecorationStyle: textDecoration ? 'solid' : null,
  };
  return (
    <View>
      <View
        style={{
          paddingRight: hp(2),
          paddingLeft: hp(1),
          justifyContent: 'center',
        }}>
        <SvgIcons.arrow height={hp(4)} width={hp(5)} />
      </View>
      <Text
        allowFontScaling={false}
        numberOfLines={lines}
        onLayout={onLayout}
        style={[textStyle, style]}>
        {children}
      </Text>
    </View>
  );
};

arrownameheader.defaultProps = {
  size: normalize(14),
  name: 'roboto-regular',
  color: 'default',
  lineHeightFactor: 1.2,
  lines: 0,
  opacity: 1,
  textAlign: 'left',
  pTop: 0,
  pLeft: 0,
  pRight: 0,
  pBottom: 0,
  textDecoration: null,
};

export default arrownameheader;
