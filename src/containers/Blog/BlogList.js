//import liraries
import React, { Component, useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { hp, wp, normalize } from '../../styles/responsiveScreen';
import FontText from '../../Components/common/FontText';
import SvgIcons from '../../assets/SvgIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import colors from '../../assets/color';
import Moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import globals from '../../assets/globals';
import axios from 'axios';
import BlogInternal, { routeName as BlogInternalRouteName } from './BlogInternal';

const { width, height } = Dimensions.get('screen');

// create a component
const BlogList = props => {
  const { item, onPress, navigation } = props;
  const [token, setToken] = useState('');
  const url = globals.base_url + "blogs";
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
          // AsyncStorage.setItem('token',globals.token_key);
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
          onPress={() => navigation.navigate(BlogInternalRouteName, { data: value.id })}>
          <View style={styles.container}>
            <Image
              style={styles.image}
              source={require('../../assets/images/Womenface.png')}
            />
            <View
              style={styles.subView}>
              <View
                style={styles.nameView}>
                <FontText size={normalize(13)} name={'poppins-medium'}>
                  {value.title}
                </FontText>
              </View>
              <View
                style={styles.javedView}>
                <SvgIcons.Javed height={hp(4)} width={hp(4)} />
                <View
                  style={styles.nameTxt}>
                  <FontText
                    style={styles.javed}
                    size={normalize(12)}
                    name={'poppins-medium'}
                    color="blackColor">
                    {value.author}
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
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowColor: 'rgba(49, 60, 100, 0.15)',
    shadowRadius: 8,
    width: width * 0.85,
    alignSelf: 'center',
    elevation: 5,
    borderRadius: 10,
    marginVertical: width * 0.02,
  },
  image: {
    height: hp(16),
    width: hp(14),
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  javed: {
    marginHorizontal: wp(2),
  },
  subView: {
    marginHorizontal: wp(3),
    flex: 1,
  },
  nameView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp(2),
  },
  javedView: {
    flexDirection: 'row',
    marginTop: hp(2),
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  nameTxt: {
    marginLeft: width * 0.015,
    justifyContent: 'space-evenly',
  },
});

//make this component available to the app
export default BlogList;
