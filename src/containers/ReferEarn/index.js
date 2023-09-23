//import liraries
import React, { Component, useEffect, useState } from 'react';
import { View, Text, StyleSheet, StatusBar, Share } from 'react-native';
import { hp, wp, normalize } from '../../styles/responsiveScreen';
import BackHeader from '../../Components/BackHeader';
import colors from '../../assets/color';
import FontText from '../../Components/common/FontText/index';
import Button from '../../Components/common/Button';
import SvgIcons from '../../assets/SvgIcons';
import TitleSubTitle from '../../Components/TitleSubTitle';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const routeName = 'ReferEarn';

// create a component
const ReferEarn = ({ navigation }) => {
  const { t } = useTranslation();
  const [ref, setRef] = useState();

  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          'Use my referral code  ' + ref + ' to sign up on the razortouch booking app to get instant discount',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType 
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };
  useEffect(() => {
    AsyncStorage.getItem('userData').then(
      (value) => {
        if (value != null) {
          const user = JSON.parse(value);
          setRef(user.ref);
        }
      });


  }, []);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <BackHeader
          title={t('REFER')}
          titleColor="violet"
          BackonPress={() => navigation.goBack()}
        />
        <View
          style={styles.titleView}>
          <TitleSubTitle
            textalign={'center'}
            Title={t('INVITE_COMBER')}
            SubTitle={t(
              'HAIRCUTS',
            )}
          />
        </View>
        <SvgIcons.Frame
          height={wp(40)}
          width={wp(80)}
          style={styles.frame}
        />
        <FontText
          size={normalize(18)}
          textAlign={'center'}
          name={'poppins-medium'}
          style={styles.code}>
          {t('REF_CODE')}
        </FontText>
        <View
          style={styles.refrealBox}>
          <FontText
            size={normalize(28)}
            name={'poppins-semibold'}
            color={'theme'}>
            {ref}
          </FontText>
        </View>
        <View
          style={styles.btn}>
          <Button
            onPress={() => onShare()}
            height={hp(8.5)}
            width={hp(8.5)}
            style={styles.btnView}>
            <SvgIcons.ShareArrow height={hp(5)} width={hp(4)} />
          </Button>
          <FontText
            size={normalize(14)}
            name={'poppins-regular'}
            style={styles.text}>
            {t('SHARE')}
          </FontText>
        </View>
      </View>
    </SafeAreaView>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  code: {
    marginTop: hp(3),
    marginHorizontal: wp(25),
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: colors.lightViolet,
  },
  titleView: {
    marginTop: hp(2),
    paddingHorizontal: wp(2),
  },
  frame: { marginTop: hp(1), alignSelf: 'center' },
  refrealBox: {
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: hp(8),
    width: wp(80),
    marginHorizontal: wp(10),
    marginTop: hp(1),
    backgroundColor: colors.viewbox,
    borderStyle: 'dashed',
    borderWidth: hp(0.2),
    borderColor: colors.theme,
  },
  btn: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnView: {
    marginTop: hp(5),
    justifyContent: 'center',
    alignItems: 'center',
    flex: null,
    backgroundColor: colors.theme,
    borderRadius: 50,
  },
});

//make this component available to the app
export default ReferEarn;
