import React, { Component,useRef, useState } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Alert,
  Pressable,
} from 'react-native';

import { hp, wp, normalize, isX, isAndroid } from '../../styles/responsiveScreen';
import colors from '../../assets/color';
import { ProgressBar, Colors, Modal } from 'react-native-paper';
import FontText from '../../Components/common/FontText';
import SvgIcons from '../../assets/SvgIcons';
import { useNavigation } from '@react-navigation/core';
import { useTranslation } from 'react-i18next';
import TitleSubTitle from '../../Components/TitleSubTitle';
import BigButton from '../../Components/BigButton';
import OrderSumCoupan, {
  routeName as OrderSumCoupanRouteName,
} from './OrderSumCoupan';


const { width, height } = Dimensions.get('screen');

const PaymentPop = props => {
s
  const { t } = useTranslation();

  const [Selected, setSelected] = useState(0);
  const navigation = useNavigation();

  const  onContinue = () =>  {
   navigation.navigate('SavedCards',{data:props.data});
    props.onClose();
  };

  return (
    <Modal style={styles.model}
      visible={props.visible}
      transparent={true}
      animationType="slide"
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
      >
      <View
        style={styles.maincontainer}>
        <View
          style={styles.subView}>
          <View
            style={styles.border}
          />
          <TouchableOpacity activeOpacity={0.7}
            style={styles.btn}
            onPress={() => props.onClose()}>
            <SvgIcons.Cross height={hp(5)} width={hp(5)} />
          </TouchableOpacity>
          <View style={{ marginLeft: wp(2) }}>
            <TitleSubTitle Title={t('PAY_OPTION')} Textstyle={{ marginTop: hp(-2), paddingBottom: hp(1) }} SubTitle={t(
              'You are about to pay using your debit card, kindly click on continue to proceed.',
            )} />
          </View>
          <FlatList
            data={[
              { icon: <SvgIcons.Card />, text: t('Pay Using Paystack') },
              // { icon: <SvgIcons.CheckMark />, text: t('Add Card Details') },
              // { icon: <SvgIcons.Gpay />, text: t('GPAY') },
            ]}
            keyExtractor={(value, index) => index.toString()}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) =>
            <TouchableOpacity
            onPress={() =>setSelected(index)}
            style={[styles.icon, {
              borderColor:
                Selected == index ? colors.theme : 'rgba(115, 118, 170, 0.3)',
              backgroundColor:
                Selected == index ? colors.viewbox : 'transparent',
            }]}>
            <View
              style={[styles.iconView, {
                backgroundColor:
                  Selected == index ? colors.white : 'transparent',
              }]}>
              {item.icon}
            </View>
            <FontText
              style={{ marginLeft: width * 0.05 }}
              name={'poppins-medium'}
              size={normalize(17)}>
              {item.text}
            </FontText>
            <View
              style={styles.imageview}>
              {Selected == index ? (
                <Image
                  source={require('../../assets/images/PayMent.png')}
                  resizeMode="contain"
                  style={styles.image}
                />
              ) : null}
            </View>
          </TouchableOpacity>}
          />
             <View style={styles.btnView}>
          <BigButton title={t('CONTINUE')}  onClick={() => navigation.navigate(OrderSumCoupanRouteName,{osdata:null})} />
        </View>
        </View>
      </View>

     </Modal>
  );
};

export default PaymentPop;

const styles = StyleSheet.create({
  maincontainer: {
    backgroundColor: '#00000090',
  },
  subView: {
    bottom: 0,
    backgroundColor: colors.white,
    right: 0,
    width: width,
    height: height > 768 ? height * 0.62 : height * 0.75,
  },
  rec: {
    width: wp(90),
    height: hp(12),
    alignSelf: 'center',
    marginTop: hp(1),
    borderRadius: wp(3),
    borderWidth: wp(0.2),
    paddingVertical: wp(1.5),
    justifyContent: 'center',
  },
  round: {
    width: wp(18),
    height: wp(18),
    backgroundColor: colors.white,
    borderRadius: wp(9),
    paddingTop: hp(1.8),
    marginLeft: wp(3),
    shadowColor: colors.white,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 5.46,
    elevation: 9,
  },
  border: {
    width: width,
    backgroundColor: colors.theme,
    height: width * 0.015,
  },
  model: {
    flex:1,
    height: height < 767 ? isAndroid ?  height * 0.87  :  height * 0.95 : height*0.87,
    justifyContent:'flex-end',
  },
  Card: {
    alignSelf: 'center',
    top: hp(2.8),
  },
  apple: {
    alignSelf: 'center',
    top: hp(1.5),
  },
  gpay: {
    alignSelf: 'center',
    top: hp(2),
  },
  icon: {
    borderWidth: 1,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    width: width * 0.9,
    paddingHorizontal: width * 0.03,
    alignSelf: 'center',
    marginTop: width * 0.05,
    height: width * 0.2,
    borderRadius: width * 0.03,
  },
  iconView: {
    borderRadius: 100,
    width: width * 0.15,
    height: width * 0.15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageview: {
    position: 'absolute',
    right: width * 0.08,
  },
  image: {
    width: width * 0.06,
    height: width * 0.06,
  },
  btn: {
    alignSelf: 'flex-end',
    marginRight: wp(1),
    alignItems: 'center',
    justifyContent: 'center',
  },
  cross: {
    width: wp(7),
    height: wp(7),
    marginRight: wp(10),
    marginTop: hp(3),
  },
  btnView: {justifyContent: 'flex-end', marginBottom: height > 767 ? hp(2.5) : hp(3.5) },
});
