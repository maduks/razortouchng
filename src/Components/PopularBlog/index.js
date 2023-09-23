//import liraries
import React, { Component, useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Moment from 'moment';
import { hp, wp, normalize, isIOS, isX } from '../../styles/responsiveScreen';
import Title_And_ViewAll_ForHomeComponent from '../Title_And_ViewAll_ForHomeComponent';
import { useTranslation } from 'react-i18next';
import colors from '../../assets/color';
import globals from '../../assets/globals';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
// create a component
const { width, height } = Dimensions.get('screen');

const PopularBlog = ({ props, navigation }) => {
  const { t } = useTranslation();
  const [token, setToken] = useState('');
  const [blogs, setBlogs] = useState([]);
  const url = globals.base_url + "blogs";

  useEffect(() => {
    getBlogs();
  }, []);

  const getBlogs = async () => {
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
          // alert('Not Logged')
        }
      });

    await axios
      .get(url, {
        headers: {
          "Content-type": "application/json",
          "Accept": "application/json",
          "Authorization": `Bearer ${token}`
        },
        timeout: 50000
      })
      .then(function (response) {
        console.log(token)
        // handle success
        const allBanners = response.data;
        setBlogs(allBanners);
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
  const PopularBlogsRenderItem = (item, index) => {
    Moment.locale('en');
    return (
      // <TouchableOpacity
      //   activeOpacity={0.7}
      //   onPress={() => navigation.navigate('BlogInternal',{data: item})}
      //   style={styles.PopularBlogsMainView}>
      //   <Image source={item.coverImg} resizeMode="cover" style={styles.blogimg} />
      //   <View style={styles.bigtxt}>
      //     <Text style={styles.PopularBlogsMainText}>{item.text}</Text>
      //     <View style={styles.imgview}>
      //       <Image source={item.blogImg} resizeMode="contain" style={styles.img} />
      //       <View style={{marginLeft: width * 0.02}}>
      //         <Text style={styles.txt}>{item.name}</Text>
      //         <Text style={styles.smalltxt}>{item.date}</Text>
      //       </View>
      //     </View>
      //   </View>
      // </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => navigation.navigate('BlogInternal', { data: item.id })}
        style={styles.PopularBlogsMainView}>
        <Image source={{ uri: item.photo }} resizeMode="cover" style={styles.blogimg} />
        <View style={styles.bigtxt}>
          <Text style={styles.PopularBlogsMainText}>{item.title}</Text>
          <View style={styles.imgview}>
            {/* <Image source={item.blogImg} resizeMode="contain" style={styles.img} /> */}
            <View style={{ marginLeft: width * 0.02 }}>
              <Text style={styles.txt}>Author: {item.author}</Text>
              <Text style={styles.smalltxt}> {Moment(item.created_at).format('d MMM yyyy')}  </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ marginVertical: hp(1.5) }}>
      <View style={{ marginVertical: 8 }}>
        <Title_And_ViewAll_ForHomeComponent
          Title={t('POPULAR_BLOG')}
          ViewAll={true}
          ViewAllPress={() => navigation.navigate('HomeMap')}
        />
      </View>
      <View>
        <FlatList
          data={blogs}
          keyExtractor={(value, index) => index.toString()}
          horizontal={true}
          style={{ paddingHorizontal: wp(5) }}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => PopularBlogsRenderItem(item, index)}
        />
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  PopularBlogsMainView: {
    width: width * 0.8,
    height: width * 0.32,
    borderRadius: 10,
    flexDirection: 'row',
    backgroundColor: colors.white,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowColor: 'rgba(49, 60, 100, 0.1)',
    shadowOpacity: 1,
    shadowRadius: 20,
    marginBottom: 20,
    elevation: 8,
    marginRight: width * 0.04,
  },
  PopularBlogsMainText: {
    fontSize: 14,
    fontFamily: 'poppins-medium',
    width: '100%',
    paddingVertical: 5,
    paddingHorizontal: 2,
    width: '85%',
    alignSelf: 'center',
    marginTop: 5,
  },
  blogimg: {
    width: wp(30),
    height: '100%',
    marginRight: wp(2),
  },
  img: {
    width: wp(10),
    height: '100%',
    marginTop: wp(1),
  },
  imgview: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(2),
    marginTop: hp(0.2),
    justifyContent: 'space-between',
    width: wp(35),
    marginLeft: wp(2),
  },
  txt: {
    fontSize: normalize(14),
    fontFamily: 'poppins-medium',
  },
  smalltxt: {
    fontSize: normalize(10),
    color: '#07192980',
    fontFamily: 'poppins-regular',
  },
  bigtxt: {
    width: '60%',
    justifyContent: 'space-between',
  },
});

//make this component available to the app
export default PopularBlog;
