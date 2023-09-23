import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { hp, wp, normalize, isIOS, isX } from '../../styles/responsiveScreen';
import colors from '../../assets/color';
import FontText from '../common/FontText/index';
import SvgIcons from '../../assets/SvgIcons';
import { useTranslation } from 'react-i18next';

const Header = ({ navigation, style, Blog, name }) => {
  const { t } = useTranslation();

  return (
    <View style={[styles.profileView, style]}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Image
          source={{ uri: "https://ui-avatars.com/api/?name=" + name + "" }}
          resizeMode="cover"
          style={styles.avatar}
        />

        {!Blog ? (
          <View style={styles.textView}>
            <FontText
              size={normalize(13)}
              name={'poppins-semibold'}
              lineHeightFactor={1.5}
              style={{ color: colors.lightViolet }}>
              {t('Welcome, ')}{name}
            </FontText>
            {/* <FontText
              size={normalize(18)}
              name={'poppins-medium'}
              lineHeightFactor={1.3}
              style={{color: colors.white}}>
              {name}
            </FontText> */}
          </View>
        ) : (
          <View style={styles.textView}>

          </View>
        )}
      </View>
      <View style={{ flexDirection: 'row' }}>
        {/* {Blog ? null : (
          <TouchableOpacity style={{...styles.iconView, marginRight: wp(1)}}>
            <SvgIcons.Heart height={hp(3)} width={hp(3)} style={styles.icon} />
          </TouchableOpacity>
        )} */}
        <TouchableOpacity style={styles.iconView} onPress={navigation}>
          <SvgIcons.Notification
            height={hp(3)}
            width={hp(3)}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  avatar: {
    width: hp(6),
    height: hp(6),
    borderRadius: 50
  },
  profileView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textView: {
    marginLeft: wp(3),
    alignSelf: 'center',
  },
  iconView: {
    padding: wp(3),
    borderRadius: normalize(50),
    backgroundColor: colors.viewcolor,
  },
  icon: {
    alignSelf: 'center',
  },
});

export default Header;
