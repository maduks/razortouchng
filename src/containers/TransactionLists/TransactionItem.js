import React, { Component, useState } from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import colors from '../../assets/color';
import SvgIcons from '../../assets/SvgIcons';
import { hp, wp, normalize, isIOS, isX } from '../../styles/responsiveScreen';
import FontText from '../../Components/common/FontText';
import { useTranslation } from 'react-i18next';
import NumberFormat from 'react-number-format';

const TransactionItem = props => {
  const { t } = useTranslation();
  const { item, onPress, index, Data } = props;



  function currencyFormat(num) {
    return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }
  return (
    <View
      style={[
        styles.container,
        index == Data.length - 1 && { borderBottomWidth: 0 },

      ]}>
      <View style={{ flexDirection: 'row', width: '70%', maxWidth: '70%', }}>
        <View style={styles.mainview}>
          <Image
            style={styles.image}
            source={{ uri: "https://ui-avatars.com/api/?name=" + item.service + "&size=190&bold=true&background=eee&color=000" }}

          />
        </View>
        <View style={{ flex: 2, marginLeft: wp(2) }}>
          <View>
            <FontText
              size={normalize(12)}
              color={'lightViolet'}
              name={'poppins-regular'}
              style={{ marginTop: hp(1) }}>
              {item.dates}
            </FontText>
            <FontText
              size={normalize(14)}
              color={'black'}
              style={{}}
              name={'poppins-semibold'}>
              {t(item.service)}
            </FontText>
          </View>
        </View>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <NumberFormat
          value={item.amount}
          displayType="text"
          thousandSeparator
          prefix="₦"

          renderText={(value) =>
            <Text style={{ color: colors.button, fontFamily: 'poppins-medium', fontWeight: 'bold', marginTop: hp(4), size: normalize(14) }}>{value}</Text>}
        />
        {/* <FontText
          size={normalize(14)}
          color={'button'}
          name={'poppins-medium'}
          style={{ marginTop: hp(1) }}>
          {"₦" + item.amount}
        </FontText> */}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: hp(2),
    marginHorizontal: wp(6),
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderColor: colors.lightViolet,
    justifyContent: 'space-between',
  },
  image: {
    height: hp(9),
    width: hp(9),
    marginVertical: hp(1),
    borderRadius: 14,
    borderColor: colors.white,
    borderWidth: hp(0.5),
  },
  mainview: {
    height: hp(9),
    width: hp(9),
    justifyContent: 'center',
    shadowColor: colors.haircutshadow,
    shadowOpacity: 0.2,
    shadowOffset: { width: hp(0), height: hp(0) },
    elevation: 2,
  },
});
export default TransactionItem;
