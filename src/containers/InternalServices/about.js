import React, { Component, useState, useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { hp, wp, normalize, isAndroid } from '../../styles/responsiveScreen';
import FontText from '../../Components/common/FontText';
import colors from '../../assets/color';
import SvgIcons from '../../assets/SvgIcons';
import { useTranslation } from 'react-i18next';
import { timeData } from '../../Utils/data';


const About = props => {

  const social = [
    { icon: <SvgIcons.Internet /> },
    { icon: <SvgIcons.Twitteri /> },
    { icon: <SvgIcons.Facebook /> },
    { icon: <SvgIcons.Instagram /> },
    { icon: <SvgIcons.Printrest /> }
  ]

  const { t } = useTranslation();
  const [isSelected, setisSelected] = useState(false);

  const _time = (item, index) => {
    return (
      <View style={styles.timeContainer}>
        <FontText
          size={normalize(14)}
          name={'poppins-medium'}
          pTop={hp(0)}
          pLeft={wp(15)}
          pBottom={hp(1)}>
          {t(item.name)}
        </FontText>

        <FontText
          size={normalize(14)}
          name={'poppins-medium'}
          pTop={hp(0)}
          // pLeft={wp(15)}
          pRight={wp(2)}
          pBottom={hp(0)}>
          {item.time}
        </FontText>
      </View>
    );
  };

  return (
    <View>
      <View style={styles.reviewBox}>
        <FontText
          name={'poppins-medium'}
          size={normalize(16)}
          pTop={hp(1)}
          textAlign={'left'}
          style={styles.about}>
          {t('ABOUT_US')}
        </FontText>
        <FontText
          name={'poppins-medium'}
          size={normalize(14)}
          opacity={0.5}
          pTop={hp(0.5)}
          textAlign={'left'}>
          {t('ABOUT_TAG')}
        </FontText>
      </View>
      <View style={styles.lline} />
      <View style={styles.cContainer}>
        <Image
          style={styles.location}
          source={require('../../assets/images/locationr.png')}
        />
        <FontText
          size={normalize(16)}
          name={'poppins-medium'}
          textAlign={'left'}
          style={styles.locationtxt}
          pLeft={wp(3)}>
          {props.address}
        </FontText>
      </View>
      <View style={styles.lline} />
      <View style={styles.c2Container}>
        <Image
          style={styles.clock}
          source={require('../../assets/images/clock.png')}
        />
        <FontText
          size={normalize(16)}
          name={'poppins-medium'}
          textAlign={'left'}
          pTop={hp(1)}
          pBottom={hp(3.2)}
          pLeft={wp(3)}
          style={styles.open}>
          {t('OPEN')}
        </FontText>
        <Image
          style={styles.dot}
          source={require('../../assets/images/dot.png')}
        />
        <FontText
          size={normalize(16)}
          name={'poppins-medium'}
          textAlign={'left'}
          pTop={hp(1)}
          // pBottom={hp(3.2)}
          pLeft={wp(1)}
          style={styles.close}>
          {t('CLOSED') + ('9PM')}
        </FontText>
        <TouchableOpacity onPress={() => setisSelected(!isSelected)}>
          {isSelected ? (
            <SvgIcons.Vectors style={styles.drop} />
          ) : (
            <SvgIcons.Down style={styles.drop} />
          )}
        </TouchableOpacity>
      </View>
      {/* <View> */}
      {isSelected ? (
        <FlatList
          data={timeData}
          renderItem={({ item }) => _time(item)}></FlatList>
      ) : null}

      <View style={styles.lline} />
      <View style={styles.cContainer}>
        <Image
          style={styles.call}
          source={require('../../assets/images/Call.png')}
        />
        <FontText
          size={normalize(16)}
          name={'poppins-medium'}
          textAlign={'left'}
          pTop={hp(1)}
          pBottom={hp(2)}
          pLeft={wp(5)}
          style={styles.calltxt}>
          415-200-8066
        </FontText>
      </View>
      <View style={styles.lline} />
      <FlatList showsHorizontalScrollIndicator={false} scrollEnabled ={false} horizontal ={true} data={social} renderItem={ ({item,index}) => {return(
        <TouchableOpacity  style={styles.icon1}>
          {item.icon}
        </TouchableOpacity>
      )}} />
    </View>
  );
};

export default About;

const styles = StyleSheet.create({
  timeContainer: {
    marginHorizontal: wp(3),
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp(0),
    height: hp(5),
    marginBottom: hp(0),
  },
  about: { fontWeight: '500' },
  reviewBox: {
    height: hp(20),
    width: wp(90),
    marginVertical: hp(2),
    alignSelf: 'center',
  },
  cContainer: {
    flexDirection: 'row',
    width: wp(90),
  },
  c2Container: {
    flexDirection: 'row',
    width: wp(90),
    height: isAndroid ? hp(9.7) : hp(3.5),
    marginBottom: isAndroid ? hp(1) : hp(4),
  },
  location: {
    tintColor: colors.theme,
    width: wp(8),
    height: hp(4.5),
    marginLeft: wp(5),
    marginTop: isAndroid ? hp(2) : hp(1),
  },
  locationtxt: {
    marginTop: isAndroid ? hp(2) : hp(1),
    marginBottom: isAndroid ? hp(2) : hp(3.5),
    width: wp(80),
    fontWeight: '500',
  },
  clock: {
    tintColor: colors.theme,
    width: wp(8.3),
    height: wp(8.3),
    marginLeft: wp(5),
    marginTop: isAndroid ? hp(2.7) : hp(0.5),
  },
  open: {
    color: '#0D8B47',
    marginTop: isAndroid ? hp(2.5) : hp(0),
    marginBottom: isAndroid ? hp(0) : hp(0.5),
  },
  dot: {
    marginLeft: wp(0.5),
    marginTop: isAndroid ? hp(4.9) : hp(2.2),
  },
  close: { marginTop: isAndroid ? hp(2.5) : hp(0), fontWeight: '500' },
  call: {
    tintColor: colors.theme,
    width: wp(8),
    height: hp(4),
    marginLeft: wp(5),
    marginTop: isAndroid ? hp(1.8) : hp(0.5),
  },
  calltxt: {
    marginTop: isAndroid ? hp(1) : hp(0),
    marginBottom: isAndroid ? hp(1) : hp(1.5),
    fontWeight: '500',
  },
  icon1: {
    marginLeft: wp(6),
    marginTop: isAndroid ? hp(2) : hp(0),
    alignSelf: 'center',
    marginRight: wp(8),
  },
  lline: {
    borderWidth: wp(0.3),
    borderColor: colors.lightgrey,
    top: isAndroid ? hp(-1) : hp(-2),
    width: wp(130),
    marginLeft: wp(-3),
    marginTop: isAndroid ? hp(2) : hp(1),
  },
  drop: { marginTop: isAndroid ? hp(4.5) : hp(2), marginLeft: wp(3) },
});
