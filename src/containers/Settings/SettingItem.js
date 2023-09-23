//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import FontText from '../../Components/common/FontText';
import { hp, wp, normalize, isIOS, isX } from '../../styles/responsiveScreen';
import colors from '../../assets/color';
import { useTranslation } from 'react-i18next';
// create a component

const SettingItem = ({ item, icon, onevent }) => {
  const { t } = useTranslation();
  return (
    <View style={{ flexDirection: 'row', backgroundColor: colors.white }}>
      <View style={styles.mainview}>
        <View style={styles.viewe}>{icon}</View>
        <TouchableOpacity onPress={() => onevent(item.name)}>
          <View style={styles.viewfont}>
            <FontText
              size={normalize(18)}
              name={'poppins-regular'}
              color={'violet'}>
              {t(item.name)}
            </FontText>

            <FontText
              size={normalize(14)}
              name={'poppins-regular'}
              color={'violet'}
              opacity={0.5}>
              {t(item.info)}
            </FontText>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};
// define your styles
const styles = StyleSheet.create({
  mainview: {
    backgroundColor: colors.white,
    flexDirection: 'row',
    width: wp(100),
  },

  viewe: {
    paddingHorizontal: wp(5),
    paddingVertical: hp(2.8),
  },
  viewfont: {
    paddingVertical: hp(2),
  },
});

//make this component available to the app
export default SettingItem;
