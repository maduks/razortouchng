import React, { useEffect, useRef, useState } from 'react';
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { normalize, wp, hp } from '../../styles/responsiveScreen';
import SvgIcons from '../../assets/SvgIcons';
import { useIsFocused } from '@react-navigation/core';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';
import colors from '../../assets/color';
import CustomeCard from '../../Components/Card';

import EmptyDefault from '../../Components/EmptyDefault';
import FontText from '../../Components/common/FontText';
import Details from '../../Components/common/Appoinment_Detail/Details';
import Price from '../../Components/common/Appoinment_Detail/Price';
import Appoinment_Emoji from './Appoinment_Emoji';
import BackHeader from '../../Components/BackHeader';
const { width, height } = Dimensions.get('screen');



import { useNavigation } from '@react-navigation/native';


const Upcoming = (props) => {
  const { t } = useTranslation();
  const FlatListRef = useRef();
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const bool = 1;
  //const { id} = props.route.params;


  const apiGetBookings = (id) => {
    const url = globals.base_url + "bookings/" + id;
    axios
      .get(url, {
        headers: {
          "Content-type": "application/json",
          "Accept": "application/json"
        }
      })
      .then(function (response) {
        // handle success
        setShowLoader(false)
        setdata(JSON.parse(JSON.stringify(response.data)));
        alert(data)
        //alert(JSON.stringify(response.data))  chupezng@gmail.com Revolution21q!

      })
      .catch(function (error) {
        // handle error
        alert("" + error);
      })
      .finally(function () {
        // always executed
        // alert('Finally called');
      });
  }
  const viewdetails = (item) => {
    navigation.navigate('Appoinment_TopTab');
  };
  useEffect(() => {
    AsyncStorage.getItem('userData').then(
      (value) => {
        if (value != null) {
          const user = JSON.parse(value);
          setUserId(user.id);

          apiGetBookings(user.id);
        }
      });


  }, []);


  return (
    <View style={{ backgroundColor: colors.white }}>
      <EmptyDefault icon={<SvgIcons.AppointmentDefault />} onPress={() => props.navigation.navigate('Appoinment_TopTab')} Title={t('APPO_TAG')} Subtitle={t(
        'HAIRCUTS',
      )} />


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
                  {data.salonName}
                </FontText>
                <View
                  style={styles.addressView}>
                  <SvgIcons.Address height={hp(3)} width={hp(3)} />
                  <FontText
                    style={styles.nameStyle} pLeft={wp(2)} name={'poppins-regular'} size={normalize(14)}   >
                    {data.address}
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
                      {data.apointmentDate}
                    </FontText>
                    <View style={styles.time} />
                    <SvgIcons.Time />
                    <FontText size={normalize(14)}>
                      {data.apointmentTime}
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
                #MFJKJHGK675
              </FontText>
            </View>

            <View style={styles.Booking}>
              <FontText size={normalize(16)} name={'poppins-medium'}>
                {t('SERVICE_LIST')}
              </FontText>
              <View style={styles.serviceCountView}>
                <FontText size={normalize(12)} pTop={hp(0.2)}
                  style={styles.countText}>
                  {data.serviceCount}
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
              Border={false}
            />
            <View style={styles.hr} />
            <View style={styles.CouponCodeMainView}>
              <View
                style={styles.coupanCodeView}>
                <FontText style={styles.Fonts}>Coupon Code HGK675 applied</FontText>
                <FontText size={normalize(12)}
                  name={'poppins-medium'} style={{ color: '#00000090' }}>HGK675</FontText>
              </View>
              <View>
                <FontText size={normalize(12)}
                  name={'poppins-medium'} style={{ color: colors.green }}>-$2.09</FontText>
              </View>
            </View>
            <View style={styles.hr} />
            <Price Title={t('ITEM_TOTAL')} Price="$110.00" Border={true} />
            <Price Title={t('VAT_TAX')} Price="$3.08" Border={true} />
            <Price
              Title={t('COUPAN_DIS')}
              Price="-$02.08"
              Color={colors.green}
              Border={false}
            />
            <Price
              Title={t('GRAND_TOTAL')}
              Price="$ 104.02"
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
                  {t('PAY_SUCCESS')}
                </FontText>
                <FontText size={normalize(14)} name={'poppins-medium'}>
                  {t('PAY_CARD')}
                </FontText>
              </View>
              <Image
                source={require('../../assets/images/True.png')}
                resizeMode="stretch"
                style={styles.true}
              />
            </View>
            {bool == 1 ? (
              <View style={styles.CompletMainView}>
                <TouchableOpacity style={[styles.BtnMainView, { borderWidth: 1 }]}>
                  <FontText style={[styles.BtnCancal, { color: '#00000098', }]}>
                    {t('RESCHEDULE')}
                  </FontText>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => props.navigation.goBack()}
                  style={[styles.BtnMainView, { backgroundColor: colors.red }]}>
                  <FontText style={styles.BtnCancal}>{t('CANCEL')}</FontText>
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
            ) : bool == 3 ? (
              <View style={{ marginBottom: height * 0.03 }} />
            ) : null}
          </View>
        </ScrollView>
        {/* <Modal
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <Appoinment_Emoji  salN = {data.salonName} rattxt = {data.ratingText} closeModal={() => setModalVisible(false)} />
      </Modal> */}
      </SafeAreaView>
      {/* <FlatList
        ref={FlatListRef}
        data={upComingData}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) =>
          <CustomeCard image={item.image} salonName={item.salonName} apointmentDate={item.apointmentDate} salonAddress={item.address}
            apointmentTime={item.apointmentTime} alocateTime={item.alocateTime} serviceCount={item.serviceCount} serviceTitle={item.serviceTitle}
            onPress={() => props.navigation.navigate('Appoinment_Detail', { bool: 1, data: item })}
          />}
      /> */}
    </View>
  );
};


export default Upcoming;

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
