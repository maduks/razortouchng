import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, TextInput} from 'react-native';
import colors from '../../assets/color';
import SvgIcons from '../../assets/SvgIcons';
import {hp, wp, normalize, isIOS, isX} from '../../styles/responsiveScreen';
import FontText from '../common/FontText';
import TitleSubTitle from '../TitleSubTitle';

// create a component
const SucessFullDefault = props => {
  const {Title, Subtitle } = props;

  return (
    <View style={styles.container}>
      <SvgIcons.Sucess height = {props.height,wp(40)}  width = {props.width,wp(40)}  />

      <View
        style={{
          justifyContent: 'center',
          paddingHorizontal: wp(2),
          // paddingVertical: hp(2),
       
        }}>
        <TitleSubTitle
          name={'poppins-medium'}

          Textstyle={{fontWeight: '700',width:wp(85),paddingBottom:hp(1.5)}}
          Title={Title}
          SubTitle={Subtitle}
          textalign={'center'}
        />
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: hp(3),
    alignItems: 'center',
    justifyContent:'center'
  },
});
export default SucessFullDefault;
