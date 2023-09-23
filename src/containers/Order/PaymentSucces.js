import React, { Component, useState } from 'react';
import {
  View,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { hp, wp, normalize, isIOS, isX, isAndroid } from '../../styles/responsiveScreen';
import { SafeAreaView } from 'react-native-safe-area-context';
import fonts from '../../assets/fonts';
import colors from '../../assets/color';
import FontText from '../../Components/common/FontText';
import Button from '../../Components/common/Button';
import SvgIcons from '../../assets/SvgIcons';
import DashedLine from 'react-native-dashed-line';
import { useTranslation } from 'react-i18next';
import SucessFullDefault from '../../Components/SucessFullDefault/SucessFullDefault';
import Dashed from '../../Components/common/Dashed/Dashed';
import Details from '../../Components/common/Appoinment_Detail/Details';
import Price from '../../Components/common/Appoinment_Detail/Price';

const { height, width } = Dimensions.get('screen')

const PaymentSuccess = props => {
  const { t } = useTranslation();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
      <ScrollView style={{ bottom: hp(0) }}>
        <View style={{ flex: 1, height: '100%', backgroundColor: colors.white }}>
          <View style={{ backgroundColor: colors.theme, height: hp(1) }} />
          <View style={{ height: '45%' }}>
            {/* Cross Image */}
            <TouchableOpacity
              style={styles.cross}
              onPress={props.closeModal}>
              <Image
                source={require('../../assets/images/Cross.png')}
                resizeMode="contain"
                style={{
                  width: wp(7),
                  height: wp(7),
                  marginRight: wp(10),
                  marginTop: hp(3),
                }}
              />
            </TouchableOpacity>
            <SucessFullDefault Title={t('YAY_ORDER')} Subtitle={t(
              'PWD_TAG_2',
            )} />
            <Dashed width={wp(3)} ContainerStyle={{ width: wp(90), alignSelf: 'center' }} />
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
              <TouchableOpacity>
                <SvgIcons.Share
                  width={wp(10)}
                  height={hp(10)}
                  style={{ top: hp(-1) }}
                />
                <FontText
                  name={'poppins-medium'}
                  size={normalize(12)}
                  pTop={hp(0)}
                  style={{ marginLeft: wp(0), marginTop: hp(-3) }}>
                  {t('SHARE')}
                </FontText>
              </TouchableOpacity>
              <View style={styles.line1} />
              <TouchableOpacity>
                <SvgIcons.Location
                  width={wp(10)}
                  height={hp(10)}
                  style={{ top: hp(-1) }}
                />
                <FontText
                  name={'poppins-medium'}
                  size={normalize(12)}
                  pTop={hp(0)}
                  style={{ marginLeft: wp(0), marginTop: hp(-3) }}>
                  {t('LOCATION')}
                </FontText>
              </TouchableOpacity>
            </View>
            <Dashed width={wp(3)} ContainerStyle={{ width: wp(90), alignSelf: 'center', marginVertical: hp(1) }} />
          </View>
          <View style={{ height: '45%' }}>
            <View style={[styles.itemView1, { marginTop: height < 767 ? hp(2) : hp(0) }]}>
              <FontText
                name={'poppins-medium'}
                size={normalize(18)}
                pTop={hp(2)}>
                {t('SERVICE_LIST')}
              </FontText>
              <View style={styles.round1}>
                <FontText
                  name={'poppins-medium'}
                  size={normalize(12)}
                  pTop={hp(1)}
                  pLeft={wp(3)}
                  pRight={wp(3)}
                  color={'theme'}>
                  3
                </FontText>
              </View>
            </View>
            <Details
              Title="Men’s Fancy Hair Cut"
              Price="$20"
              Time="20 Min"
              Border={true}
            />
            <Details Title="Hair Spa" Price="$50.08" Time="30 Min" Border={true} />
            <Details
              Title="Oil Treatment"
              Price="$30.08"
              Time="30 Min"
              Border={true}
            />

            <Price Title={t('CGST')} Price="$02.08" Border={true} Font={normalize(14)} />
            <Price Title={t('SGST')} Price="$02.08" Border={true} Font={normalize(14)} />
            <View style={{ marginTop: hp(2) }}>
              <Price Title={t('TOTAL_SERVICE')} Price={t("5_IT")} Font={normalize(16)} />
              <Price Title={t('TOTAL_PRICE')} Price="$125.06" Font={normalize(16)} />
            </View>

            <View style={styles.rec1}>
              <View
                style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <FontText
                  name={'poppins-medium'}
                  size={normalize(14)}
                  pLeft={wp(3)}>
                  {t('COUPAN_APPLIED')}
                </FontText>
                <FontText
                  name={'poppins-semibold'}
                  size={normalize(14)}
                  style={{ color: colors.green }}
                  pRight={wp(3)}>
                  #MFJKJHGK675
                </FontText>
              </View>
            </View>
          </View>
        </View>

        <View
          style={styles.homebtn}>
          <Button
            onPress={props.BackNavigation}
            position="rowCenter"
            height={isX ? hp(6.5) : hp(8)}
            width={wp(50)}
            style={styles.backbtn}>
            <FontText
              name={'poppins-medium'}
              size={normalize(16)}
              textAlign={'center'}>
              {t('BACK_HOME')}
            </FontText>
          </Button>

          <Button
            onPress={props.ViewDetails}
            position="rowCenter"
            height={isX ? hp(6.5) : hp(8)}
            width={wp(50)}
            style={styles.mainbtn}>
            <FontText
              name={'poppins-medium'}
              size={normalize(16)}
              textAlign={'center'}
              color={'white'}>
              {t('VIEW_DETAIL')}
            </FontText>
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PaymentSuccess;

const styles = StyleSheet.create({
  line1: {
    height: hp(6),
    borderWidth: 0.5,
    opacity: 0.5,
    borderColor: colors['lightViolet'],
    marginTop: hp(2.5),
  },
  itemView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemView1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: wp(4),
  },
  border: {
    borderColor: colors['violet'],
    borderWidth: 0.3,
    marginTop: hp(1),
    opacity: 0.3,
    width: wp(92),
    alignSelf: 'center',
    backgroundColor: "#000000"
  },
  round1: {
    height: wp(8),
    width: wp(8),
    borderRadius: 50,
    marginTop: hp(2),
    lineHeight: 20,
    backgroundColor: colors.lighttheme,
  },
  rec1: {
    marginTop: hp(2),
    backgroundColor: '#E8F8F6',
    borderStyle: 'dashed',
    borderColor: colors.green,
    borderWidth: 2,
    height: hp(7),
    width: wp(90),
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 14,
    marginBottom: hp(10),
  },
  btn: {
    fontFamily: fonts['poppins-medium'],
    alignSelf: 'flex-end',
    height: hp(7),
    width: wp(32),
    marginRight: wp(-3),
    justifyContent: 'center',
    borderBottomRightRadius: 14,
    borderTopRightRadius: 14,
    backgroundColor: colors.green,
  },
  backbtn: {
    borderRadius: 14,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp(0),
    alignSelf: 'center',
    position: 'absolute',
    bottom: wp(0),
    marginLeft: wp(-3),
  },
  mainbtn: {
    backgroundColor: colors.theme,
    borderRadius: 14,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp(0),
    position: 'absolute',
    bottom: wp(0),
    marginLeft: wp(45),
  },
  cross:
  {
    width: wp(10),
    height: wp(10),
    alignSelf: 'flex-end',
    marginRight: wp(1),
    alignItems: 'center',
    justifyContent: 'center',
  },
  homebtn: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    height: '4%',
    bottom: hp(0),
    marginBottom: hp(8),
  },
});
