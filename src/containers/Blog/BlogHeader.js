import {hp, wp, normalize, isIOS, isX} from '../../styles/responsiveScreen';
import colors from '../../assets/color';
import FontText from '../../Components/common/FontText';
import SvgIcons from '../../assets/SvgIcons';
import React, {Component, useState} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {useTranslation} from 'react-i18next';

const BlogHeader = ({navigation}) => {
  const {t} = useTranslation();
  return (
    <View style={styles.header}>
      <View
        style={styles.MainView}>
        <View style={{flexDirection: 'row'}}>
          <View style={styles.avatarShadow}>
            <Image
              source={require('../../assets/images/avatar.png')}
              resizeMode="cover"
              style={styles.avatar}
            />
          </View>
          <View style={styles.textView}>
            <FontText
              size={normalize(12)}
              opacity={0.5}
              name={'poppins-medium'}
              color={colors.lightViolet}>
              {t('WELCOME_CHAR')}
            </FontText>
            <FontText
              size={normalize(18)}
              name={'poppins-semibold'}
              color={colors.violet}>
              {'Jonathan'}
            </FontText>
          </View>
        </View>
      </View>
      <View style={styles.iconView}>
        <SvgIcons.Notificationwithdot
          height={hp(2.8)}
          width={hp(2.8)}
          style={styles.icon}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  avatarShadow: {
    shadowColor: colors.shadow,
    shadowOffset: {width: 0, height: 4.18},
    shadowOpacity: 1,
    shadowRadius: 30.29,
    elevation: 5,
  },
  textView: {
    marginLeft: wp(3),
    alignSelf: 'center',
  },
  avatar: {
    width: hp(6.5),
    height: hp(6.5),
  },
  iconView: {
    padding: wp(3),
    borderRadius: normalize(50),
    backgroundColor: colors.background,
  },
  icon: {
    alignSelf: 'center',
  },
  MainView:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default BlogHeader;
