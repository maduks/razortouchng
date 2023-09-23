import React, { Component, useState, useEffect } from 'react';
import { View, Image, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { hp, wp, normalize, isIOS, isX } from '../../../styles/responsiveScreen';
import colors from '../../../assets/color';
import { routeName as ShowImageRouteName } from './showImage';
import { useNavigation } from '@react-navigation/core';
import { blankdata } from '../../../Utils/data';

const PhotosView = () => {
  const navigation = useNavigation();

  function _renderImage(item, index) {
    return (
      <TouchableOpacity activeOpacity={0.7}
        onPress={() =>
          navigation.navigate(ShowImageRouteName, {
            data: item,
            images: blankdata,
          })
        }>
        <View
          style={styles.imageView}>
          <Image
            style={styles.img}
            source={item}
          />
        </View>
      </TouchableOpacity>
    )
  }
  return (
    <View>
      <FlatList
        data={blankdata}
        renderItem={({ item }) => _renderImage(item)}
        numColumns={2}></FlatList>
    </View>
  );
};

export default PhotosView;

const styles = StyleSheet.create({
  imageView: {
    flexDirection: 'column',

    backgroundColor: colors.lightgrey,
    width: wp(40),
    height: hp(18),
    borderRadius: wp(5),
    marginVertical: hp(1),
    justifyContent: 'center',
    marginRight: wp(-2.5),
    marginHorizontal: wp(7),
  },
  img: {
    width: wp(40),
    height: hp(18),
    borderRadius: wp(5),
  },
})
