import React, { useEffect } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  RefreshControl
} from 'react-native';
import { ALERT_TYPE, Dialog, Root, Toast } from 'react-native-alert-notification';

import axios from 'axios';
import { hp, wp, normalize, isIOS, isX } from '../../styles/responsiveScreen';
import colors from '../../assets/color';
import FontText from '../../Components/common/FontText/index';
import ProfileHeader from '../../Components/Home/ProfileHeader';
import { useTranslation } from 'react-i18next';
import ExclusiveOffer from '../../Components/ExclusiveOffers';
import UpcommingAppointment from '../../Components/UpAppointment';

import ExploreServices from '../../Components/ExploreServices';
import PopularSalonComponent from '../../Components/PopularSalonComponent';
import PopularBlog from '../../Components/PopularBlog';
import globals from '../../assets/globals';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


export const routeName = 'Home';
const Home = ({ navigation }) => {
  const [token, setToken] = useState('');
  const [services, setServices] = useState("");
  const [name, setName] = useState("");
  const [userId, setUserId] = useState("");
  const { t } = useTranslation();

  const [refreshing, setRefreshing] = useState(false);

  const checkLogin = () => {

    AsyncStorage.getItem('userData').then(
      (value) => {
        // AsyncStorage returns a promise


        //alert(user.name);
        if (value != null) {
          const user = JSON.parse(value);
          setName(user.name);
          setToken(globals.token_key);
          setUserId(user.id);
          apiGetServices(value);
          checkRefCoupon(user.id)
          //alert(user.email)
        }
        else {
          //redirect to login page
          // AsyncStorage.setItem('token',globals.token_key);
          //alert('Not Logged')
          navigation.navigate('Login');
        }

        // Setting the value in Text
      });
  }



  const config = {
    headers: {
      "Content-type": "application/json",
      "Accept": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  };
  const apiGetServices = async (token) => {
    const url = globals.base_url + "services";

    await axios
      .get(url, {
        headers: {
          "Content-type": "application/json",
          "Accept": "application/json"
        },
        timeout: 50000
      })
      .then(function (response) {
        console.log(token)
        // handle success
        setServices(JSON.stringify(response.data));
        //alert(JSON.stringify(response.data))
        //alert(JSON.stringify(response.data));
      })
      .catch(function (error) {
        // handle error
        alert("Couldn't conect to internet");
      })
      .finally(function () {
        // always executed
        // alert('Finally called');
      });
  }
  const checkRefCoupon = (dis) => {
    const url = globals.base_url + "checknewcoupon/" + dis;

    axios
      .get(url, {
        headers: {
          "Content-type": "application/json",
          "Accept": "application/json"
        }
      })
      .then(function (response) {

        const validCoupons = JSON.parse(JSON.stringify(response.data));

        console.log(validCoupons)
        if (validCoupons) {
          var v = JSON.parse(JSON.stringify(response.data))

          Dialog.show({
            type: ALERT_TYPE.SUCCESS,
            title: 'Congratulations!',
            textBody: "You have an amazing " + validCoupons[0].percentage + "% discount coupon. Kindly use this coupon '" + validCoupons[0].coupon + "' on your next booking.",
            button: 'Dismiss',
          })

        }

      })
      .catch(function (error) {
        // handle error
        alert(" Input coupon please" + error);
      })
      .finally(function () {
        // always executed
        //alert('Finally called');
      });

  }
  useEffect(() => {
    checkLogin();
    navigation.addListener('focus', () => {
      console.log('Refreshed!');
      //RNRestart.Restart();
    });



  }, [navigation]);


  return (
    <View style={styles.container}>
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}  >
        <Root>
          <View style={{ flex: 1 }}>
            <ProfileHeader
              style={{ width: wp(90), alignSelf: 'center' }} name={name}
              navigation={() => navigation.navigate('HomeNotificationEmpty')}
            />


            {/* Exclusive Offers Section */}
            <ExclusiveOffer navigation={navigation} />

            <ExploreServices navigation={navigation} />
            {/* Upcoming Appointments */}
            <UpcommingAppointment navigation={navigation} />

            {/*  Select Type  ...or...  Gender */}
            {/* <GenderSelection navigation={navigation} /> */}

            {/* Explore By Service */}
            {/* <ExploreServices navigation={navigation} /> */}

            {/* Popular Salons */}
            <PopularSalonComponent navigation={navigation} />

            {/* Popular Blogs */}
            <PopularBlog navigation={navigation} />


          </View>
        </Root>



      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingTop: hp(5),
  },
  searchview: {
    width: wp(92),
    alignSelf: 'center',
    paddingVertical: hp(1.2),
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: wp(3),
    borderRadius: wp(2),
    color: colors.black,
    backgroundColor: colors.white,
    marginTop: hp(2),
  },
  bottomview: {
    backgroundColor: '#fdf2f2',
    paddingHorizontal: wp(4),
    marginBottom: 10,
    flex: 1,
  },
  btn: {
    backgroundColor: colors.red,
    alignItems: 'center',
    width: wp(30),
    paddingVertical: hp(1.5),
    marginLeft: wp(3),
    marginTop: hp(2),
    marginBottom: hp(1),
    borderRadius: wp(3),
  },
  spinnerTextStyle: {
    color: '#fff',
  },
  row: {
    height: '60%',
    justifyContent: 'center',
  },
  img: {
    width: wp(100),
    height: 220,
  },
  txt: {
    fontSize: normalize(14),
    marginHorizontal: wp(3),
    fontFamily: 'poppins-regular',
    color: colors.white,
  },
  btntxt: {
    color: colors.white,
    fontSize: normalize(16),
    fontWeight: '500',
  },
});

export default Home;
