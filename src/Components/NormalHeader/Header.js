import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {hp, normalize, wp} from '../../styles/responsiveScreen';
import colors from '../../assets/color';

const Header = props => {
  return (
    <View style={styles.Container}>
      <TouchableOpacity onPress={props.LeftClick}>
        <Image
          source={props.Left}
          resizeMode="contain"
          style={styles.BackBtn}
        />
      </TouchableOpacity>

      <Text style={{fontSize: normalize(18), fontFamily: 'poppins-medium'}}>
        {props.Head}
      </Text>

      <TouchableOpacity onPress={props.RightClick}>
        <Image source={props?.Right} style={styles.BackBtn} />
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  Container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.white,
    paddingHorizontal: wp(1),
  },
  BackBtn: {
    width: wp(10),
    height: hp(3),
    marginLeft: 10,
  },
});
