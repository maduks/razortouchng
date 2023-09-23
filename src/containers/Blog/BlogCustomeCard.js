import React, {Component, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {hp, wp, normalize, isIOS, isX} from '../../styles/responsiveScreen';
import FontText from '../../Components/common/FontText';

const BlogCustomeCard = props => {

  return (
    <View
      style={{
        width: wp(90),
        alignSelf: 'center',
      }}>
      <FontText
        size={normalize(20)}
        pBottom={wp(2)}
        name={'poppins-medium'}
        color="blackColor">
        {props.created_date}
        
      </FontText>

      <FontText
        size={normalize(15)}
        pTop={wp(2)}
        lineHeightFactor={1.8}
        name={'poppins-regular'}
        color="lightViolet">
        {props.description}
      </FontText>

      <FontText
        pTop={wp(4)}
        pBottom={wp(5)}
        size={normalize(15)}
        lineHeightFactor={1.8}
        name={'poppins-regular'}
        color="lightViolet">
        {props.Text2}
      </FontText>

      <Image
        source={require('../../assets/images/Womenhair.png')}
        style={styles.imageview}
        resizeMode="cover"
      />

      <FontText
        pTop={wp(4)}
        pBottom={wp(8)}
        style={styles.text}
        size={normalize(15)}
        lineHeightFactor={1.8}
        name={'poppins-regular'}
        color="lightViolet">
        {props.Text3}
      </FontText>
    </View>
  );
};

const styles = StyleSheet.create({
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
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 5,
    shadowOpacity: 0.22,
    elevation: 6,
    backgroundColor: 'white',
    width: wp(90),
    margin: wp(3),
    borderRadius: 10,
  },
});

export default BlogCustomeCard;
