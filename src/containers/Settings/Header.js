import React from 'react';
import {StyleSheet, View} from 'react-native';
import {normalize, hp, wp} from '../../styles/responsiveScreen';
import SvgIcons from '../../assets/SvgIcons';
import FontText from '../../Components/common/FontText';

const Header = ({name}) => {
  return (
    <View
      style={StyleSheet.mainView}>
      <View
        style={styles.arrowView}>
        <SvgIcons.arrow height={hp(4)} width={hp(5)} />
      </View>
      <FontText
        size={normalize(22)}
        color={'white'}
        style={{marginTop: hp(1)}}
        name={'poppins-semibold'}
        paddingLeft={hp(2)}>
        {name}
      </FontText>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
mainView:  {
    flexDirection: 'row',
    paddingLeft: hp(2),
    alignContent: 'center',
  },
  arrowView:{
    paddingRight: hp(2),
    paddingLeft: hp(1),
    justifyContent: 'center',
  },
})