//import liraries
import React, { Component, useState, useEffect } from 'react';
import { Calendar, LocaleConfig } from 'react-native-calendars';

import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
  Text,
  Dimensions,
} from 'react-native';
import { ALERT_TYPE, Dialog, Root, Toast } from 'react-native-alert-notification';

import { hp, wp, normalize, isX } from '../../styles/responsiveScreen';
import BackHeader from '../../Components/BackHeader';
import { TextInput, ProgressBar, Card } from 'react-native-paper';
import colors from '../../assets/color';
import { routeName as ordersummaryRouteName } from '../Order/OrderSummary';
import Moment from 'moment';
import { useIsFocused, useNavigation } from '@react-navigation/core';
import { useTranslation } from 'react-i18next';
import { calenderData, dateData, timeData } from '../../Utils/data';
const { width, height } = Dimensions.get('screen');
import axios from 'axios';
import globals from '../../assets/globals';
import Spinner from 'react-native-loading-spinner-overlay';
import DatePicker from 'react-native-date-picker'
import AsyncStorage from '@react-native-async-storage/async-storage';
export const routeName = 'BookingDate';

console.log('data is...', timeData)

const BookingDate = props => {
  const { t } = useTranslation();
  const isFocused = useIsFocused();
  const { tdata } = props.route.params;
  const { price } = props.route.params;
  const { service } = props.route.params;
  const { gender } = props.route.params;
  const { location } = props.route.params;
  const [SelectDate, setSelectDate] = useState(calenderData);
  const navigation = useNavigation();
  const [time, setTime] = useState('');
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState('');
  const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false)
  const [phone, setPhone] = useState();

  const onPressHandler = (item, MainIndex) => {



  };
  useEffect(async () => {
    let data = await AsyncStorage.getItem('userData')
    data = JSON.parse(data)
    setPhone("0" + data.phone)

  })

  function continues(value) {

    setTime(value);
    setLoading(true)

    // if (SelectDate.length > 6 & time != '') {
    //alert(tdata.site + " " + location)
    const data = {
      professional: tdata.name,
      site: tdata.site,
      total: price,
      gender: gender,
      dates: SelectDate,
      time: value,
      price: price,
      location: location,
      vat: 0,
      phone: phone,
      discount: 0,
      service: service,
      refcoupon: ''
    }
    const url = globals.base_url + "check_booking";
    const configurationObject = {
      url: url,
      method: "POST",
      timeout: 50000,
      data: { time_: time, date_: SelectDate, professional: tdata.name },
    };

    axios(configurationObject)
      .then(async function (response) {
        //alert(JSON.stringify(response.data))
        if (JSON.parse(JSON.stringify(response.data)) == "Booking exists with same time and date.Kindly select different dates or professional.") {
          Dialog.show({
            type: ALERT_TYPE.WARNING,
            title: 'Opps!',
            textBody: JSON.parse(JSON.stringify(response.data)),
            button: 'ok',
          })
          setLoading(false)
        }
        else {
          setLoading(false)
          // alert('hi')

          await addToCartFromPreviousScreen(data)
          navigation.navigate(ordersummaryRouteName, {
            odata: tdata,
            price: price,
            service: service,
            gender: gender,
            dates: SelectDate,
            location: location,
            time: value
          })
        }
      })
      .catch(function (error) {
        // handle error
        Dialog.show({
          type: ALERT_TYPE.WARNING,
          title: 'Opps!',
          textBody: "Couldn't process this request at the moment, check internet connections." + JSON.stringify(error.response.data),
          button: 'ok',
        })
        setLoading(false)
      })



  };

  addToCartFromPreviousScreen = async (data) => {

    let flag = false;
    let currentCart = await AsyncStorage.getItem("cart");
    currentCart = JSON.parse(currentCart)

    //check for null
    if (currentCart == null) {
      currentCart = []
    }
    currentCart.map((item) => {
      ((item.professional == data.professional && item.service == data.service) && (item.time == data.time && item.dates == data.dates)) ? flag = true : flag = false
    })
    //check if similar service exists or not
    if (flag == true) {
      //alert('Similar service already exist in your cart')
    }
    else {
      currentCart.push(data)
      await AsyncStorage.setItem('cart', JSON.stringify(currentCart))
      // alert('saved')
    }

  }

  return (
    <SafeAreaView style={styles.container}>

      {loading ? <Spinner
        visible={true}
        overlayColor="rgba(0, 0, 0, 0.95)"
        textContent={'Checking bookings....'}

        textStyle={{ color: colors.darkred }}
      /> : null}
      <View style={{ marginHorizontal: wp(3) }}>
        <BackHeader
          title={t('SEL_DATE')}
          titleColor="violet"
          BackonPress={() => navigation.goBack()}
        />
      </View>

      <ProgressBar
        progress={0.5}
        color={colors.theme}
        style={styles.progress}
      />


      <View style={styles.flatView}>
        <View >

          <Calendar

            style={{
              borderWidth: 2,

              margin: 20,
              borderRadius: 10,
              borderColor: '#eee',
              height: height / 2.3
            }}

            minDate={Moment(Moment().date(1)).subtract(1, 'months').endOf('month').format('DD MMM YYYY')}
            onDayPress={day => {
              setSelectDate(Moment(day).month(Moment(day).month() - 1).format("DD MMM YYYY"));

              setOpen(true)

              setSelected(day.dateString);
            }}
            markedDates={{
              [selected]: {
                selected: true,
                disableTouchEvent: true, selectedColor: colors.theme, selectedDotColor: 'orange'
              }
            }}

          />

        </View>

      </View>
      {/* Time component */}
      <View>
        <View
          style={styles.time}>




        </View>

        <Root>
          <View style={{ marginTop: 3 }}>
            <DatePicker
              modal
              mode='time'
              open={open}
              date={date}
              minuteInterval={30}
              onConfirm={(date) => {
                setOpen(false)
                setTime(Moment(date.toLocaleTimeString(), "HH:mm:ss").format("hh:mm A"))
                continues(Moment(date.toLocaleTimeString(), "HH:mm:ss").format("hh:mm A"))
              }}

              onCancel={() => {
                setOpen(false)
              }}
            />
            {/* <DatePicker
              mode="time"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              is24Hour={false}
              minuteInterval={30}//setTime(selectedTime)
              onTimeChange={selectedTime => continues(selectedTime)}
              options={{ mainColor: colors.red, selectedTextColor: colors.white }}

            /> */}
          </View>
        </Root>
      </View>

      {/* <View style ={styles.btnView}>
        
        <BigButton style ={{backgroundColor: !false ? colors.theme : colors.lightOrngae,}} title ={t('CONTINUE')} onClick ={() => {
          onPressHandler()
        }}  />
      </View> */}

    </SafeAreaView>
  );
};

export default BookingDate;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },

  progress: {
    marginHorizontal: wp(5),
    height: hp(1),
    borderRadius: 14,
  },
  dateTime: {
    marginLeft: wp(3),
    marginRight: wp(-1),
    marginTop: hp(2),
    height: height > 767 ? hp(8) : hp(10),
    width: wp(14),
    borderRadius: wp(3),
  },
  timeView: {
    width: wp(20),
    height: wp(12),
    borderColor: colors.theme,
    borderWidth: wp(0.3),
    borderRadius: wp(2),
    marginHorizontal: wp(1.4),
    marginVertical: hp(0.5),
    alignItems: 'center',
    justifyContent: 'center',
  },
  DateView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: width * 0.9,
    alignSelf: 'center',
    marginVertical: width * 0.05,
  },
  Backbtn: {
    width: width * 0.08,
    height: width * 0.08,
  },
  flatView: { marginTop: width * 0.02, marginBottom: width * 0.1 },
  time: {
    marginTop: hp(0),
    flexDirection: 'row',
    width: width * 0.9,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  dot: {
    width: wp(2.5),
    height: wp(2.5),
    marginTop: hp(1.2),
    marginRight: wp(-25),
    marginLeft: wp(12),
  },
  greyDot: {
    width: wp(2.5),
    height: wp(2.5),
    marginTop: hp(1.2),
    marginRight: wp(-25),
    marginLeft: wp(1.5),
  },
  btnView: { flex: 1, justifyContent: 'flex-end', marginBottom: hp(2) },
});
