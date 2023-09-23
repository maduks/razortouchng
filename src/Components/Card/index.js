import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import {hp, wp, normalize, isIOS, isX} from '../../styles/responsiveScreen';
import colors from '../../assets/color';
import FontText from '../common/FontText';
import SvgIcons from '../../assets/SvgIcons';
import {SliderBox} from 'react-native-image-slider-box';
import { TouchableOpacity } from 'react-native-gesture-handler';

const screenWidth = Dimensions.get('window').width;

const CustomeCard = props => {
  console.log('images....',props.item)
  return (

    <View style={{...styles.card, ...props.style}}>
       <TouchableOpacity  activeOpacity={0.7} onPress={ props.onPress}>
      <View style={styles.imag}>
        <SliderBox

          images={props.image}
          dotColor="white"
          inactiveDotColor="rgba(0, 0, 0, 0)"
          resizeMode={'cover'}
          dotStyle={{
            width: 11,
            height: 11,
            borderRadius:20,
            marginHorizontal: 0,
            padding: 0,
            margin: 0,
            borderWidth: 1.5,
            borderColor: 'white',
          }}

        />
      </View>

      <View style={styles.ispast}>
        <FontText
          size={normalize(18)}
          name="Poppins-Regular"
          color="blackColor"
          pTop={hp(1)}
          lines={1}
          style={styles.name1}>
          {props.salonName}
        </FontText>
        {props.tabTitle == 'Past' ? (
          <View style={styles.dateview}>
            <SvgIcons.CalendarCard height={hp(2)} width={hp(2)} />
            <FontText
              style={styles.timedetail}
              size={normalize(12)}
              name="Poppins-Regular"
              color="violet"
              lines={1}>
              {props.apointmentDate}
            </FontText>
          </View>
        ) : (
          <View></View>
        )}
      </View>

      {props.tabTitle == 'Past' ? null : (
        <View style={styles.details}>
          <SvgIcons.Address height={hp(3)} width={hp(3)} />
          <FontText
            style={styles.addtxt}
            size={normalize(14)}
            name="Poppins-Regular"
            color="lightViolet"
            lines={2}>
            {props.salonAddress}
          </FontText>
        </View>
      )}

      {props.tabTitle == 'Past' ? (
        <View></View>
      ) : (
        <View style={styles.detailslist}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <SvgIcons.CalendarCard height={hp(2)} width={hp(2)} />
            <FontText
              style={styles.timedetail}
              size={normalize(12)}
              name="Poppins-Regular"
              color="violet"
              lines={1}>
              {props.apointmentDate}
            </FontText>
            <SvgIcons.Dot
              height={hp(1)}
              width={hp(1)}
              style={styles.dotalline}
            />
          </View>

          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <SvgIcons.Time height={hp(2)} width={hp(2)}  />
            <FontText
              style={styles.timedetail}
              size={normalize(12)}
              name="Poppins-Regular"
              color="violet"
              lines={1}>
              {props.apointmentTime}
            </FontText>
            <SvgIcons.Dot
              height={hp(1)}
              width={hp(1)}
              style={styles.dotalline}
            />
          </View>

          <View style={styles.minview}>
            <FontText
              style={styles.timemin}
              size={normalize(12)}
              name="Poppins-Regular"
              color="greenColor"
              lines={1}>
              {props.alocateTime}
            </FontText>
          </View>
        </View>
      )}
      <View style={styles.detailsservice}>
        <FontText size={15} name="Poppins-SemiBold" color="black" lines={1}>
          {props.serviceTitle}
        </FontText>
        <View style={styles.round}>
          <FontText
            size={14}
            name="Poppins-SemiBold"
            color="red"
            lines={1}>
            {props.serviceCount}e
          </FontText>
        </View>
      </View>
      </TouchableOpacity>
    </View>

  );
};

const styles = StyleSheet.create({
  card: {
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 5,
    shadowOpacity: 0.22,
    elevation: 6,
    backgroundColor: 'white',
    width: (screenWidth / 3 - 10) * 3,
    margin: wp(3),
    borderRadius: 20,
  },

  details: {
    flexDirection: 'row',
    marginLeft: hp(1.5),
    marginRight: hp(1.5),
    marginTop: hp(1),
  },
  detailslist: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    justifyContent: 'space-between',
    alignSelf: 'center',
    // marginTop:hp(-2)
  },
  detailsservice: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: hp(2.5),
    // marginTop: hp(-2),
    marginBottom: hp(1.5),
  },

  dotalline: {
    margin: wp(2),
  },
  minview: {
    // height: '40%',
    width: wp(25),
    backgroundColor: colors.lightGreen,
    borderRadius: hp(1),
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical:hp(1)
  },
  round: {
    width: hp(4),
    height: hp(4),
    borderRadius: hp(4),
    backgroundColor: colors.lightRed,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: hp(1),
  },
  name: {
    fontWeight: '600',
    // marginTop: hp(1.5),
    marginLeft: hp(1),
  },
  name1: {
    fontWeight: '600',
    marginLeft: 10,
  },
  addtxt: {
    fontWeight: '400',
    paddingLeft: wp(1),
    width: wp(80),
  },
  timedetail: {
    fontWeight: '500',
    paddingLeft: wp(1),
  },
  timemin: {
    fontWeight: '500',
    width:'50%'
    // paddingVertical:hp(2)
  },
  imag: {
    height: hp(20),
    width: (screenWidth / 3 - 10) * 3,
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    overflow: 'hidden',
  },
  ispast: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginTop: hp(1.5),
    marginLeft: hp(1),
    justifyContent: 'space-between',
    marginRight: hp(2),
  },
  dateview: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CustomeCard;
