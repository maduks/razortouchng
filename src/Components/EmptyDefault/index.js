//import liraries
import React from 'react';
import {View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import SvgIcons from '../../assets/SvgIcons';
import {hp, wp, normalize, isIOS, isX} from '../../styles/responsiveScreen';
import TitleSubTitle from '../TitleSubTitle';

// create a component
const EmptyDefault = props => {
  const {Title, Subtitle, DefaultImage, image,icon} = props;

  return (
    <TouchableOpacity onPress={props.onPress} activeOpacity={0.8} style={styles.container}>
   {/* <Image source={image} /> */}
   {icon}
      <View style={styles.view}>
        <TitleSubTitle
          Textstyle={{fontWeight: '500',fontFamily:'poppins-medium',justifyContent:'center',paddingBottom:hp(2.5),marginTop:hp(-5)}}
          Title={Title}
          SubTitle={Subtitle}
          textalign={'center'}
        />
      </View>
    </TouchableOpacity>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  view: {
    flex:0.7,
    justifyContent: 'center',
    paddingHorizontal: wp(6),
    // paddingVertical: hp(4),
  },
  icon: {
    // flex:0.5,
    height: hp(25),
    width: hp(25),
  },
});

export default EmptyDefault;
