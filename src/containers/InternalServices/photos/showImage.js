import React, {Component, useState, useEffect} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  FlatList,
} from 'react-native';
import {hp, wp, normalize, isIOS, isX} from '../../../styles/responsiveScreen';
import FontText from '../../../Components/common/FontText';
import colors from '../../../assets/color';
import {useNavigation} from '@react-navigation/core';
import { useTranslation } from 'react-i18next';


export const routeName = 'ShowImage';

const ShowImage = props => {
  const onScrollOfExclusiveOffers = e => {

    if (e.nativeEvent) {
      const Slide = Math.ceil(
        e.nativeEvent.contentOffset.x / e.nativeEvent.layoutMeasurement.width,
      );
    }
  };

  const ImageSlider = (item, index) => {
    return (
      <View style={{width: wp(100), height: hp(40)}}>
        <Image
          source={item}
          style={styles.image}></Image>
      </View>
    );
  };
  const navigation = useNavigation();
  const {t} = useTranslation();
  const {data, images} = props.route.params;
  return (
    <SafeAreaView
      style={styles.mainContainer}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.subContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={require('../../../assets/images/arrow.png')}
              style={styles.backArrow}
            />
          </TouchableOpacity>
          <FontText
            name={'poppins-semibold'}
            size={normalize(18)}
            pTop={hp(0.2)}
            pLeft={wp(5)}
            style={{color: colors.white}}>
            {t("PHOTOS")}
          </FontText>
        </View>
        <View
          style={styles.imageView}>
          <FlatList
            data={images}
            onScroll={e => onScrollOfExclusiveOffers(e)}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            keyExtractor={(value, index) => index.toString()}
            renderItem={({item}) => ImageSlider(item)}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ShowImage;

const styles = StyleSheet.create({
  backArrow:{
    height: wp(8),
    width: wp(8),
    marginLeft: wp(5),
    tintColor: colors.white,
  },
  image:{
    alignSelf: 'center',
    width: wp(100),
    height: hp(40),
    marginHorizontal: wp(10),
  },
  mainContainer:{flex: 1, backgroundColor: colors.violet, height: '100%'},
  subContainer:{flexDirection: 'row', justifyContent: 'flex-start'},
  imageView:{
    width: wp(100),
    height: hp(40),
    marginVertical: hp(22),
  },
})