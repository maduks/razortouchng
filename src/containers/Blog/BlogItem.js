//import liraries
import React, { Component, useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { hp, wp, normalize } from '../../styles/responsiveScreen';
import FontText from '../../Components/common/FontText';
import SvgIcons from '../../assets/SvgIcons';
import colors from '../../assets/color';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { routeName as BlogInternalRouteName } from './BlogInternal';
import { useTranslation } from 'react-i18next';
import globals from '../../assets/globals';
import axios from 'axios';
import Moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
const { width, height } = Dimensions.get('screen');

// create a component
const BlogItem = props => {
  const { t } = useTranslation();
  const [token, setToken] = useState('');
  const url = globals.base_url + "blogs";
  const { item, onPress, navigation } = props;
  const [blogs, setBlogs] = useState([]);

  const getBlogs = () => {

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
          //alert('Not Logged')
        }
      });

    axios
      .get(url, {
        headers: {
          "Content-type": "application/json",
          "Accept": "application/json",
          "Authorization": `Bearer ${token}`
        }
      })
      .then(function (response) {
        console.log(token)
        // handle success

        const allBlogs = JSON.stringify(response.data);
        setBlogs(allBlogs);

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

  useEffect(() => {
    getBlogs();

  }, []);




  return (
    <View style={styles.maincontainer}>
      {item.map((value, index) => (

        <TouchableOpacity
          onPress={() =>
            navigation.navigate(BlogInternalRouteName, { data: value.id })
          }>
          <View>
            <Image
              resizeMode="stretch"
              style={styles.image}
              source={{ uri: value.photo }}
            />
          </View>
          <View style={styles.box}>
            <FontText
              style={styles.mainfont}
              size={normalize(18)}
              name={'poppins-semibold'}
              color="blackColor">
              {value.title}
            </FontText>
            <FontText
              style={styles.mainfont}
              size={normalize(12)}
              name={'poppins-regular'}
              color="lightViolet">
              {value.description.substring(0, 100)}...
            </FontText>
          </View>
          <View
            style={styles.cardFooter}>
            <View
              style={styles.subView}>
              <SvgIcons.Javed height={hp(4)} width={hp(4)} />
              <View
                style={styles.nameView}>
                <FontText
                  style={styles.javed}
                  size={normalize(12)}
                  name={'poppins-medium'}
                  color="blackColor">
                  {item.name}
                </FontText>
                <FontText
                  style={styles.javed}
                  size={normalize(10)}
                  name={'poppins-regular'}
                  color="lightViolet">
                  {Moment(item.created_at).format('d MMM yyyy')}
                </FontText>
              </View>
            </View>
            {/* <View style={styles.iconView}>
            <SvgIcons.Javedheart
              height={hp(5)}
              width={hp(5)}
              style={styles.icon}
            />
          </View> */}
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  maincontainer: {
    backgroundColor: colors.white,
    shadowOffset: { width: hp(0), height: hp(0.2) },
    shadowColor: colors.lightViolet,
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 7,
    borderRadius: wp(6),
    width: wp(85),
    alignSelf: 'center',
    borderTopLeftRadius: wp(6),
    borderTopRightRadius: wp(6),
    marginVertical: wp(2),
  },
  box: {
    marginVertical: hp(2),
    marginHorizontal: hp(1.5),
  },
  mainfont: {
    marginHorizontal: wp(3),
    marginVertical: hp(0.7),

  },
  javed: {
    marginHorizontal: wp(2),
  },
  image: {
    width: width * 0.85,
    height: 150
  },
  iconView: {
    borderColor: 'yellow',
    borderRadius: normalize(50),
    backgroundColor: 'white',
  },
  icon: {
    alignSelf: 'center',
  },
  cardFooter: {
    flexDirection: 'row',
    marginHorizontal: wp(3),
    marginBottom: hp(1),
    justifyContent: 'space-between',
  },
  subView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nameView: {
    marginLeft: wp(2),
    justifyContent: 'space-evenly',
  },
});

//make this component available to the app
export default BlogItem;
