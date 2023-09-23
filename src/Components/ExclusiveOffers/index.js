//import liraries
import React, { Component, useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
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
import { SliderBox } from "react-native-image-slider-box";
const { width, height } = Dimensions.get('screen');



const ExRenderItem = (item, index) => {
  return (
    <View>

      <SliderBox images={item.photo} />
    </View>

  );
};

const ExclusiveOffer = props => {
  const [ActiveDots, setActiveDots] = useState(0);
  const { t } = useTranslation();





  const [token, setToken] = useState('');
  const [banners, setBanners] = useState([]);
  const url = globals.base_url + "banners";
  const [showLoader, setShowLoader] = useState(true)
  useEffect(() => {
    getBanners();
  }, []);

  const getBanners = async () => {
    AsyncStorage.getItem('token').then(
      (value) => {
        // AsyncStorage returns a promise
        // Adding a callback to get the value
        if (value) {
          setToken(value);

        }
        else {
          //redirect to login page
          //AsyncStorage.setItem('token',globals.token_key);
          // alert('Not Logged')
        }
      });

    await axios
      .get(url, {
        headers: {
          "Content-type": "application/json",
          "Accept": "application/json",
          "Authorization": `Bearer ${token}`
        }, timeout: 50000
      })
      .then(function (response) {
        console.log(token)
        // handle success
        setShowLoader(false)
        const allBanners = response.data;
        setBanners(allBanners);
      })
      .catch(function (error) {
        // handle error
        alert(error);
      })
      .finally(function () {
        // always executed
        //alert('Finally called');
      });
  }








  return (
    <View>
      {showLoader == true ? <BarIndicator color='white' count={9} size={10} animating={showLoader} />
        : <SliderBox images={banners}
          dotColor={"#FFEE58"}
          inactiveDotColor="#90A4AE"
          paginationBoxVerticalPadding={20}
          autoplay
          circleLoop
          resizeMethod={'resize'}
          resizeMode={'cover'}
          dotStyle={{
            width: 5,
            height: 5,
            borderRadius: 5,
            marginHorizontal: 0,
            padding: 0,
            margin: 0,
            backgroundColor: "rgba(128, 128, 128, 0.92)"
          }}
          ImageComponentStyle={{ borderRadius: 5, width: '100%', height: 240, marginTop: 10 }}
          imageLoadingColor="#2196F3"
        />
      }
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    marginHorizontal: wp(4),
  },
  list: {
    width: wp(90),
    alignSelf: 'center',
  },
  ImageBackground: {
    flex: 1,
    marginVertical: 5,
    marginRight: 2,
    borderRadius: 10,
    overflow: 'hidden',
  },
  UseCode: {
    width: '68%',
    textAlign: 'center',
    marginTop: hp(2),
    fontSize: normalize(12),
    padding: wp(2),
    borderRadius: wp(2),
    overflow: 'hidden',
    backgroundColor: colors.darkblue,
    color: colors.white,
    fontFamily: 'poppins-medium',
    fontWeight: 'bold',
  },
  Offer: {
    color: colors.white,
    marginTop: hp(0.5),
    marginLeft: 3,
    fontSize: normalize(8),
    width: '90%',
  },
  ExclusiveOfferDOTsView: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: width * 0.025,
    alignSelf: 'center',
  },
  ExclusiveOfferDOTs: {
    width: 8,
    height: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.white,
    marginHorizontal: 3,
  },
  img: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    height: '100%',
    width: wp(40),
  },
  view: {
    width: '70%',
    flex: 1,
    padding: 15,
  },
  img1: {
    width: '100%',
    height: hp(8),
  },
});

//make this component available to the app
export default ExclusiveOffer;
