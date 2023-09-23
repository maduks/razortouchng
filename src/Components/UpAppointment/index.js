//import liraries
import React, { Component, useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import {
  BarIndicator,

} from 'react-native-indicators';
import { hp, wp, normalize, isIOS, isX } from '../../styles/responsiveScreen';
import Title_And_ViewAll_ForHomeComponent from '../Title_And_ViewAll_ForHomeComponent';

import { useTranslation } from 'react-i18next';

import colors from '../../assets/color';
import globals from '../../assets/globals';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
// create a component

const { width, height } = Dimensions.get('screen');


const UpcommingAppointment = ({ props, navigation }) => {
  const { t } = useTranslation();

  const [userId, setUserId] = useState("");
  const [bookings, setBookings] = useState([]);
  const [showLoader, setShowLoader] = useState(true)

  //navigation.navigate(bookingdetailsrouteName,{});
  const apiGetBookings = async (id) => {
    const url = globals.base_url + "bookings/" + id;
    await axios
      .get(url, {
        headers: {
          "Content-type": "application/json",
          "Accept": "application/json"
        }, timeout: 50000
      })
      .then(function (response) {
        // handle success
        setShowLoader(false)
        setBookings(JSON.parse(JSON.stringify(response.data)));
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
    <View style={{ marginTop: 0, flex: 1 }}>
      <View style={{ marginBottom: 0 }}>
        <Title_And_ViewAll_ForHomeComponent
          ViewAllPress={() => props.navigation.navigate('Appointment')}
          Title={t('UPCOMING_APPO')}
          ViewAll={true}
        />
      </View>
      {showLoader == true ? <BarIndicator color='white' count={9} size={10} animating={showLoader} /> :
        <FlatList
          data={bookings}
          keyExtractor={(value, index) => index.toString()}
          horizontal={true}
          style={{ paddingLeft: wp(4) }}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) =>

            <TouchableOpacity onPress={() => navigation.navigate('Appoinment_Detail',
              {


                id: 'jane',
                age: 25,
                data: item

              }

            )}>
              <View style={styles.UpComingRenderItemMainView}>
                <View style={styles.upcomming}>
                  <Image
                    source={{ uri: "https://ik.imagekit.io/paysupport/razortouch/schedule_zMCdKDfcb.png?ik-sdk-version=javascript-1.4.3&updatedAt=1655380604009" }}
                    resizeMode="stretch"
                    style={styles.UpCominImage}
                  />
                </View>

                <View style={styles.upview}>
                  <Text style={styles.UpCominName}>{item.service}</Text>

                  <View style={styles.UpCominDateTimeMainView}>
                    <Text style={styles.UpCominDateTime}>{item.date_}</Text>
                    <View
                      style={[styles.ExclusiveOfferDOTs, { backgroundColor: colors.theme }]}
                    />
                    <Text style={[styles.UpCominDateTime, { marginLeft: 0 }]}>
                      {item.time_}
                    </Text>


                  </View>
                  <Text style={styles.UpCominName}>Professional:  {item.professional}</Text>
                </View>
              </View>
            </TouchableOpacity>

          }
          contentContainerStyle={{ paddingRight: hp(3) }}
        />}
      {bookings.length == 0 && showLoader == false ? <Text style={{ color: '#fff', marginLeft: 10, padding: 10 }}>You have no bookings yet</Text> : null}
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  UpCominDateTime: {
    color: colors.lightViolet,
    fontSize: normalize(12),
  },

  ExclusiveOfferDOTs: {
    width: 8,
    height: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.white,
    marginHorizontal: 3,
  },

  upcomming: {
    width: '35%',
    padding: 8,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  UpCominImage: {

    width: wp(15),
    height: wp(15),
    borderRadius: wp(4),
  },
  UpCominDateTimeMainView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '95%',
    flexWrap: 'wrap'
  },
  UpComingRenderItemMainView: {
    flexDirection: 'row',
    marginHorizontal: wp(4),
    borderRadius: wp(2),
    width: wp(72),
    shadowOffset: {
      width: 5,
      height: wp(0.5),
    },
    shadowColor: 'black',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    backgroundColor: colors.offwhite,
    paddingVertical: hp(1),
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 8,
    marginVertical: hp(1),
  },
  upview: {
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    width: '62%',
    height: '50%',
  },
  UpCominName: {
    color: colors.black,
    fontSize: normalize(10),
    fontFamily: 'poppins-medium',
    fontWeight: '500',
    flexWrap: 'wrap'

  },
});

//make this component available to the app
export default UpcommingAppointment;
