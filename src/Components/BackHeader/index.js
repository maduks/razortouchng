//import liraries
import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {hp, wp, normalize, isIOS, isX} from '../../styles/responsiveScreen';
import Button from '../common/Button';
import FontText from '../common/FontText';
import SvgIcons from '../../assets/SvgIcons';
import colors from '../../assets/color';
// create a component
const BackHeader = props => {
  const {
    RightItemLabel,
    onPress,
    BackonPress,
    title,
    RightColor,
    titleColor,
    BackIcon,
    pLeft,
    marginLeft,
    style,
  } = props;

  return (
    <View style={[styles.container, style]}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginLeft: marginLeft,
        }}>
        <TouchableOpacity onPress={BackonPress} style={{padding: 5}}>
          {BackIcon == 'arrow' ? (
            <SvgIcons.arrow
              style={{height: hp(10), width: hp(10), marginHorizontal: 5}}
            />
          ) : (
            <SvgIcons.arrowblack
              style={{height: hp(10), width: hp(10), marginHorizontal: 6}}
            />
          )}
        </TouchableOpacity>
        {title != null && (
          <FontText
            style={styles.title}
            size={normalize(20)}
            name="poppins-semibold"
            color={titleColor}
            lines={1}
            pLeft={pLeft}>
            {title}
          </FontText>
        )}
      </View>
      {RightItemLabel != null && (
        <Button flex={null} type="opacity" height={hp(4)} onPress={onPress}>
          <FontText
            style={styles.text}
            size={normalize(14)}
            name="poppins-semibold"
            color={RightColor}
            lines={1}>
            {RightItemLabel}
          </FontText>
        </Button>
      )}

    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingTop: hp(1),
    paddingVertical: hp(2),
  },
  text: {
    padding: 10,
    fontWeight: 'bold',
  },
  title: {
    fontWeight: '600',
    marginHorizontal: wp(2),
  },
});

//make this component available to the app
export default BackHeader;
