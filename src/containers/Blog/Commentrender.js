//import liraries
import React, {Component, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import colors from '../../assets/color';
import SvgIcons from '../../assets/SvgIcons';
import FontText from '../../Components/common/FontText';
import {hp, wp, normalize, isIOS, isX} from '../../styles/responsiveScreen';

// create a component
const Commentrender = props => {

  return (
    <View style={styles.maincontainer}>
      <View style={styles.container}>
        <View style={{flexDirection: 'row', marginTop: hp(1)}}>
          <SvgIcons.Javed height={hp(4)} width={hp(4)} />
          <FontText
            size={normalize(16)}
            name={'poppins-medium'}
            style={styles.nameView}>
            {props.name}
          </FontText>
        </View>
        <FontText
          size={normalize(12)}
          name={'poppins-medium'}
          color="lightViolet"
          style={styles.dateView}>
          {props.date}
        </FontText>
      </View>
      <FontText
        size={normalize(14)}
        name={'poppins-regular'}
        color="lightViolet"
        style={styles.infoView}>
        {props.info}
      </FontText>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.3)',
  },
  container: {
    flexDirection: 'row',

    justifyContent: 'space-between',
  },
  nameView:{
    justifyContent: 'center',
    marginHorizontal: wp(2),
  },
  dateView:{
    justifyContent: 'center',
    marginTop: hp(0.4),
  },
  infoView:{
    marginLeft: wp(8.7),
    marginTop: hp(1.5),
    marginBottom: hp(2),
  },
});

//make this component available to the app
export default Commentrender;
