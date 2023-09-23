//import liraries

import React, { Component, useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  ScrollView,
  Image
} from 'react-native';
import BlogCustomeCard from './BlogCustomeCard';
import { hp, wp, normalize } from '../../styles/responsiveScreen';
import SvgIcons from '../../assets/SvgIcons';
import FontText from '../../Components/common/FontText';
import colors from '../../assets/color';
import BlogInternalCommet, {
  routeName as BlogInternalCommetRouteName,
} from './BlogInternalCommet';
import Material_Menu from '../../Components/common/Material_Menu/Material_Menu';
import { useTranslation } from 'react-i18next';
import ImageSlider from '../../Components/ImageSlider/ImageSlider';
import { popularBlogData } from '../../Utils/data';
import BackHeader from '../../Components/BackHeader';
import Moment from 'moment';
import globals from '../../assets/globals';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const routeName = 'BlogInternal';
import Spinner from 'react-native-loading-spinner-overlay';
import { SliderBox } from "react-native-image-slider-box";
const { width, height } = Dimensions.get('screen');

// create a component
const BlogInternal = props => {
  const { t } = useTranslation();
  const { navigation } = props;
  const [visible, setVisible] = useState(false);
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);
  function MaterialMenu() {
    setVisible(!visible);
    return null;
  }

  const { data } = props.route.params;


  const [token, setToken] = useState('');

  const url = globals.base_url + "blogs/" + data;

  useEffect(() => {
    getBlogContent();
  }, []);

  const getBlogContent = () => {
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
        },
        timeout: 50000

      })
      .then(function (response) {
        console.log(token)
        // handle success
        const blogData = response.data;
        setContent(blogData);
        setLoading(false)


      })
      .catch(function (error) {
        // handle error
        alert(error);
        setLoading(false)
      })
      .finally(function () {
        // always executed
        //alert('Finally called');
      });
  }

  Moment.locale('en');
  return (
    <SafeAreaView style={styles.container}>
      {loading ? <Spinner
        visible={true}
        overlayColor="rgba(0, 0, 0, 0.95)"
        textContent={'loading....'}

        textStyle={{ color: colors.darkred }}
      /> : null}
      <View style={styles.subContainer}>
        <View style={styles.BackHeader}>
          <BackHeader style={{ marginTop: hp(0.5) }} BackonPress={() => navigation.goBack()} />
          <Image source={{ uri: content.photo }} style={styles.img} />

          <View style={styles.header}>
            <FontText
              style={[styles.javed, { flexWrap: 'wrap', width: '89%' }]}
              size={normalize(12)}
              name={'poppins-medium'}
              color="blackColor">
              {content.title}
            </FontText>
            <FontText
              style={styles.javed}
              size={normalize(10)}
              name={'poppins-regular'}
              color="lightViolet">
              {Moment(content.created_at).format('D MMM yyyy H:mma')}
            </FontText>
          </View>
        </View>
        {/* <TouchableOpacity onPress={() => MaterialMenu()}>
          <SvgIcons.More height={hp(3.5)} width={hp(3.5)} />
          <Material_Menu
            BlogIntenal={true}
            position={{
              position: 'absolute', height: wp(11),
              top: height >= 768 ? hp(12) : hp(7),
            }}
            visible={visible}
            click={() => MaterialMenu()}
          />
        </TouchableOpacity> */}
      </View>

      <ScrollView showsVerticalScrollIndicator={true}>
        <Image style={{
          width: width * 0.9,
          resizeMode: 'contain',
          alignSelf: 'center',
          justifyContent: 'center',
          borderRadius: 3,
          height: wp(50),
        }} source={{ uri: content.photo }} />

        <View
          style={styles.tag}>
          <FontText
            style={styles.nameshop}
            size={normalize(20)}
            name={'poppins-medium'}
            color="blackColor">
            {content.title}
          </FontText>
          <Image source={{ uri: content.photo }}
            style={styles.imageview}
            resizeMode="cover"
          />
          <FontText
            style={styles.javed}
            size={normalize(14)}
            name={'poppins-medium'}
            color="lightViolet">
            {content.description}
          </FontText>

          <FontText
            pTop={wp(4)}
            pBottom={wp(8)}
            style={styles.text}
            size={normalize(15)}
            lineHeightFactor={1.8}
            name={'poppins-regular'}
            color="lightViolet">
            Author : {content.author}
          </FontText>
        </View>

        {/* <FlatList
          style={{marginTop: hp(2) }}
          showsVerticalScrollIndicator={false}
          data={content}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(Value, index) => index.toString()}
          renderItem={({ content }) => {
            return <BlogCustomeCard {...content}></BlogCustomeCard>;
          }}
        /> */}
      </ScrollView>
      {/* //Comment share etc */}
      {/* <View style={styles.pops}>
        <TouchableOpacity
          style={styles.redHeart}>
          <SvgIcons.RedHeart height={hp(4)} width={hp(5)} />
          <FontText
            style={{ marginHorizontal: wp(1) }}
            size={normalize(16)}
            name={'poppins-medium'}
            color="blackColor">
            110
          </FontText>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate(BlogInternalCommetRouteName, { data: data })}>
          <View
            style={styles.chattxt}>
            <SvgIcons.Chat height={hp(4)} width={hp(5)} />
            <FontText
              style={{ marginHorizontal: wp(1) }}
              size={normalize(16)}
              name={'poppins-medium'}
              color="blackColor">
              05
            </FontText>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.shareView}>
          <SvgIcons.Share height={hp(5)} width={hp(5)} />
          <FontText
            style={{ marginHorizontal: wp(1) }}
            size={normalize(16)}
            name={'poppins-medium'}
            color="blackColor">
            {t('SHARE')}
          </FontText>
        </TouchableOpacity>
      </View> */}
    </SafeAreaView>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: { marginLeft: width * 0.02 },
  pops: {
    borderRadius: 10,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    shadowOpacity: 1,
    shadowColor: 'rgba(0,0,0,0.4)',
    elevation: 6,
    backgroundColor: colors.white,
    width: width * 0.9,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    position: 'absolute',
    bottom: height * 0.06,
    alignSelf: 'center',
  },
  javed: {
    marginHorizontal: wp(2),
    flexWrap: 'wrap',

    width: '100%'
  },
  nameshop: { marginBottom: width * 0.05, textAlign: 'left' },
  subContainer: {

    flexDirection: 'row',
    marginHorizontal: wp(4),
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  imageview: {
    width: '99%',
    borderRadius: 10,
    marginVertical: hp(1),
  },
  imag: {
    height: hp(18),
    width: wp(90),
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
    overflow: 'hidden',
  },
  card: {
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    shadowOpacity: 0.22,
    elevation: 6,
    backgroundColor: 'white',
    width: wp(90),
    margin: wp(3),
    borderRadius: 10,
  },
  BackHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  shareView: {
    marginVertical: hp(2),
    flexDirection: 'row',
    alignItems: 'center',
  },
  chattxt: {
    marginVertical: hp(2),
    flexDirection: 'row',
    alignItems: 'center',
  },
  redHeart: {
    marginVertical: hp(2),
    flexDirection: 'row',
    alignItems: 'center',
  },
  tag: {
    width: width * 0.9,
    alignSelf: 'center',
    marginTop: width * 0.05,
  },
  img: {
    width: wp(10),
    height: wp(10),
  }
});

//make this component available to the app
export default BlogInternal;
