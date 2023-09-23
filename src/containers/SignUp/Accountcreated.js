import React, { Component, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TextInput, ProgressBar } from 'react-native-paper';
import FontText from '../../Components/common/FontText';
import colors from '../../assets/color';
import BackHeader from '../../Components/BackHeader';
import SvgIcons from '../../assets/SvgIcons';
import TitleSubTitle from '../../Components/TitleSubTitle';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import { hp, wp, normalize, isIOS, isX } from '../../styles/responsiveScreen';
import { useTranslation } from 'react-i18next';
import SucessFullDefault from '../../Components/SucessFullDefault/SucessFullDefault';

const { width, height } = Dimensions.get('screen');

export const routeName = 'Accountcreated';

const Accountcreated = ({ navigation }) => {
  const { t } = useTranslation();
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1,padding:15 }}>
          <BackHeader
            BackonPress={() => navigation.navigate('SignUp') }
            // RightItemLabel={t('SKIP')}
            onPress={() => navigation.navigate('Tab')}
          />
          <View style={{ flex: 1 }}>
            <SucessFullDefault Title={t('SUCCESFULLY')} Subtitle={t(
              'Kindly complete your profile setup in some few seconds',
            )} />
          </View>
          <View style={styles.subcontainer}>
            <FontText
              name={'poppins-semibold'}
              size={normalize(18)}
              pTop={hp(2)}
              pLeft={wp(5)}
              color={'violet'}>
              Complete your profile (2/4)
            </FontText>

            <ProgressBar
              progress={0.2}
              color={colors.theme}
              style={styles.progress}
            />
            <View style={styles.itemview}>
              <SvgIcons.Roundarrow style={{ marginTop: hp(1.4) }} />
              <FontText
                name={'poppins-medium'}
                size={normalize(16)}
                pLeft={wp(5)}
                pTop={hp(1)}
                textAlign={'center'}
                pBottom={hp(1)}
                color={'theme'}
                style={{ fontWeight: 'bold' }}>
                {t('EMAIL')}
              </FontText>
            </View>
            <View style={styles.itemview}>
              <SvgIcons.Roundarrow style={{ marginTop: hp(0.4) }} />
              <FontText
                name={'poppins-medium'}
                size={normalize(16)}
                pLeft={wp(5)}
                textAlign={'center'}
                pBottom={hp(1)}
                color={'theme'}
                style={{ fontWeight: 'bold' }}>
                {t('NAME')}
              </FontText>
            </View>
            <View style={styles.itemview}>
              <SvgIcons.Round style={{ marginTop: hp(0.4) }} />
              <FontText
                name={'poppins'}
                size={normalize(16)}
                pLeft={wp(5)}
                textAlign={'center'}
                pBottom={hp(1)}
                color={'lightViolet'}>
                {t('GENDER')}
              </FontText>
            </View>
            {/* <View style={styles.itemview}>
              <SvgIcons.Round style={{ marginTop: hp(0.4) }} />
              <FontText
                name={'poppins'}
                size={normalize(16)}
                pLeft={wp(5)}
                textAlign={'center'}
                pBottom={hp(1)}
                color={'lightViolet'}>
                {t('P_PHOTO')}
              </FontText>
            </View> */}
            <View style={styles.itemview}>
              <SvgIcons.Round style={{ marginTop: hp(0.4) }} />
              <FontText
                name={'poppins'}
                size={normalize(16)}
                pLeft={wp(5)}
                textAlign={'center'}
                pBottom={hp(1)}
                color={'lightViolet'}>
                {t('PHONE')}
              </FontText>
            </View>
          </View>

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.navigate('Profilegender')}
            style={styles.touchableOpacityStyle}>
            <SvgIcons.Arrowright />
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: wp(5),
  },
  safe: { flex: 1, backgroundColor: colors.white },
  subcontainer: {
    borderColor: colors.borderColor,
    borderWidth: 0.5,
    justifyContent: 'center',
    borderRadius: 14,
    width: width * 0.89,
    alignSelf: 'center',
    paddingBottom: 10,
  },
  progress: {
    marginHorizontal: wp(5),
    marginVertical: wp(4),
    height: hp(1),
    borderRadius: 14,
  },
  itemview: {
    flexDirection: 'row',
    marginHorizontal: wp(6),
  },
  touchableOpacityStyle: {
    width: width * 0.13,
    height: width * 0.13,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    backgroundColor: colors.theme,
    position: 'absolute',
    right: 15,
    bottom: 10,
  },
});
export default Accountcreated;
