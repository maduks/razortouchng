import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
} from 'react-native';
import { hp, normalize, isAndroid, wp } from '../../styles/responsiveScreen';
import SvgIcons from '../../assets/SvgIcons';
import Details from '../../Components/common/Appoinment_Detail/Details';
import Price from '../../Components/common/Appoinment_Detail/Price';
import Appoinment_Emoji from './Appoinment_Emoji';
import { useTranslation } from 'react-i18next';
import colors from '../../assets/color';
import BackHeader from '../../Components/BackHeader';
import ImageSlider from '../../Components/ImageSlider/ImageSlider';
import FontText from '../../Components/common/FontText';
import globals from '../../assets/globals';
import axios from 'axios';
const { width, height } = Dimensions.get('screen');
export const routeName = 'Appoinment_Detail';
const Appoinment_Detail = props => {
  const [modalVisible, setModalVisible] = useState(false);
  const { bool, data } = props.route.params;
  const [loading, setLoading] = useState(false);

  const { t } = useTranslation();


  const OpenModel = () => {
    setLoading(true)
    const url = globals.base_url + "markdone";
    const configurationObject = {
      url: url,
      method: "POST",
      data: { booking_id: data.id },
    };

    axios(configurationObject)
      .then(function (response) {
        setLoading(false)
        setModalVisible(!modalVisible);
      })
      .catch(function (error) {
        // handle error
        setLoading(false)
        alert(JSON.stringify(error))

      })
      .finally(function () {
        // always executed

      });

  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
        <View
          style={styles.mainView}>
          <BackHeader title={t('APPO_DETAIL')} BackonPress={() => props.navigation.goBack()} />
          {/* <View style={styles.imageSlider}>
            <ImageSlider data={data.image} />
          </View> */}
          <View style={styles.modelView}>
            <View>
              <FontText size={normalize(20)} name={'poppins-medium'} style={styles.salonName} pLeft={wp(1)} pTop={hp(2)}>
                {data.name}
              </FontText>
              <View
                style={styles.addressView}>
                <SvgIcons.Address height={hp(3)} width={hp(3)} />
                <FontText
                  style={styles.nameStyle} pLeft={wp(2)} name={'poppins-regular'} size={normalize(14)}   >
                  {"Razortouchng"}
                </FontText>
              </View>
              {bool == 3 ? (
                <View
                  style={styles.cancel}>
                  <FontText style={{ color: colors.red }} size={normalize(14)}>
                    {'Cancelled on 22 Aug, 2021, 2:34PM'}
                  </FontText>
                </View>
              ) : null}
              <View style={styles.TimeMainView}>
                <View style={styles.date}>
                  <SvgIcons.CalendarCard />
                  <FontText size={normalize(14)}>
                    {data.date_}
                  </FontText>
                  <View style={styles.time} />
                  <SvgIcons.Time />
                  <FontText size={normalize(14)}>
                    {data.time_}
                  </FontText>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.Booking}>
            <FontText size={normalize(15)} name={'poppins-medium'}  >
              {t('BOOKING_NO')}
            </FontText>
            <FontText size={normalize(14)} name={'poppins-regular'}>
              #{data.id}
            </FontText>
          </View>

          <View style={styles.Booking}>
            <FontText size={normalize(16)} name={'poppins-medium'}>
              {t('SERVICE_LIST')}
            </FontText>
            <View style={styles.serviceCountView}>
              <FontText size={normalize(12)} pTop={hp(0.2)}
                style={styles.countText}>
                {1}
              </FontText>
            </View>
          </View>

          <Details
            Title={data.service}
            Price={"₦" + data.price}
            Time={"Service By: " + data.professional}
            Border={true}
          />

          {/* <View style={styles.hr} /> */}

          <View style={styles.hr} />
          <Price Title={t('VAT')} Price={"₦" + data.vat} Border={true} />


          <Price
            Title={t('COUPAN_DIS')}
            Price={data.discount == null ? "₦" + 0 : data.discount}
            Color={colors.green}
            Border={false}
          />


          {/* <View style={styles.CouponCodeMainView}>
            <View
              style={styles.coupanCodeView}>
              <FontText style={styles.Fonts}>Coupon Code HGK675 applied</FontText>
              <FontText size={normalize(12)}
                name={'poppins-medium'} style={{ color: '#00000090' }}>HGK675</FontText>
            </View> 
          
          </View>  */}

          <Price
            Title={t('GRAND_TOTAL')}
            Price={"₦" + data.total}
            Border={false}
            Font={normalize(20)}
          />
          <View style={styles.PayMainView}>
            <Image
              source={require('../../assets/images/wallet.png')}
              resizeMode="stretch"
              style={styles.wallet}
            />
            <View style={styles.PaymentTextView}>
              <FontText size={normalize(10)} name={'poppins-regular'}
                style={{
                  color: '#15093E98',
                }}>
                {t('Payment Status')}
              </FontText>
              <FontText size={normalize(14)} name={'poppins-medium'}>
                {t('Payment Approved')}
              </FontText>
            </View>
            <Image
              source={require('../../assets/images/True.png')}
              resizeMode="stretch"
              style={styles.true}
            />
          </View>
          {bool != 1 ? (
            <View style={styles.CompletMainView}>
              {/* <TouchableOpacity onPress={()=>OpenModel } style={[styles.BtnMainView, { borderWidth: 1 }]}>
                <FontText style={[styles.BtnCancal, { color: '#00000098', }]}>
                  {t('Mark done')}
                </FontText>
              </TouchableOpacity> */}
              <TouchableOpacity style={[styles.BtnMainView, { borderWidth: 1 }]} disabled={loading} onPress={OpenModel}>

                {loading && <ActivityIndicator size="large" color="red" />}
                <Text style={styles.buttonText}>
                  {loading ? "" : "Mark done"}
                </Text>

              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => props.navigation.goBack()}
                style={[styles.BtnMainView, { backgroundColor: colors.red }]}>
                <FontText style={styles.BtnCancal}>{t('Back')}</FontText>
              </TouchableOpacity>
            </View>
          ) : bool == 2 ? (
            <View style={styles.CompletMainView}>
              <TouchableOpacity
                style={[styles.BtnMainView, { backgroundColor: colors.theme }]}>
                <FontText style={[styles.BtnCancal, { color: colors.white }]}>
                  {t('BOOK_AGAIN')}
                </FontText>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => OpenModel('Emoji')}
                style={[styles.BtnMainView, { backgroundColor: colors.white, borderWidth: 1, }]}>
                <FontText style={[styles.BtnCancal, { color: colors.black }]}>
                  {t('WRITE_REVIEW')}
                </FontText>
              </TouchableOpacity>
            </View>
          ) : bool != 3 ? (
            <View style={{ marginBottom: height * 0.03 }} />
          ) : null}
        </View>
      </ScrollView>
      <Modal
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => {
          setModalVisible(false);
        }}>
        <Appoinment_Emoji navigation={props.navigation} salBID={data.id} salN={data.name} salDates={data.date_ + " " + data.time_ + ""} salS={data.service} rattxt={data.ratingText} closeModal={() => setModalVisible(false)} />
      </Modal>
    </SafeAreaView>
  );
};

export default Appoinment_Detail;

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.white },
  mainView: {
    marginHorizontal: wp(3),
    justifyContent: 'center',
  },
  imageSlider: { marginTop: hp(-3) },
  TimeMainView: {
    backgroundColor: '#fff1e5',
    width: wp(90),
    height: hp(5),
    justifyContent: 'center',
    alignSelf: 'center',
    paddingHorizontal: wp(3),
    borderRadius: wp(1),
  },
  date: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: wp(55),
  },
  time: {
    width: wp(2),
    borderRadius: wp(4),
    height: wp(2),
    backgroundColor: colors.theme,
  },
  button: {
    display: "flex",
    flexDirection: "row",
    width: wp(92),
    marginTop: 15,
    paddingVertical: isAndroid ? hp(2) : hp(1.5),
    backgroundColor: colors.theme,
    borderRadius: wp(4),
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  buttonText: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 15
  },
  Booking: {
    width: wp(90),
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: hp(2.5),
    marginBottom: hp(0.5)
  },
  hr: {
    width: width,
    alignSelf: 'flex-start',
    marginLeft: wp(-3),
    backgroundColor: '#B9BBFF30',
    height: hp(0.8),
    marginVertical: hp(2),
  },
  salonName: { fontWeight: '600' },
  CouponCodeMainView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: wp(90),
    alignSelf: 'center',
    height: hp(8),
    alignItems: 'center',
  },
  PayMainView: {
    borderRadius: 10,
    width: wp(90),
    height: hp(7),
    alignSelf: 'center',
    backgroundColor: '#FD883915',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: hp(1),
  },
  PaymentTextView: {
    width: wp(55),
    height: hp(5),
    justifyContent: 'space-evenly',
  },
  CompletMainView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: wp(90),
    alignSelf: 'center',
    marginTop: hp(2),
  },
  BtnMainView: {
    width: '48%',
    height: 50,
    alignItems: 'center',
    padding: hp(1),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    marginBottom: 15,
  },
  BtnCancal: {
    color: colors.white,
    fontSize: normalize(16),
    fontFamily: 'poppins-medium',
  },
  addressView: {
    flexDirection: 'row',
    marginVertical: hp(1.5),
    width: wp(90),
  },
  modelView: { width: wp(90), alignSelf: 'center' },
  nameStyle: {
    color: colors.lightViolet,
  },
  cancel: {
    marginVertical: hp(1),
  },
  serviceCountView: { backgroundColor: '#FF474620', width: wp(6), height: wp(6), borderRadius: wp(6) },
  countText: {
    alignSelf: 'center',
    justifyContent: 'center',
    color: colors.red,
  },
  coupanCodeView: {
    height: hp(8),
    justifyContent: 'space-evenly',
    alignItems: 'flex-start',
  },
  wallet: {
    width: wp(8),
    height: wp(8),
  },
  true: {
    width: wp(10),
    height: wp(10),
  },
});
