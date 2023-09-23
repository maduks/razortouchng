import React, {Component, useState, useEffect, useRef} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import BackHeader from '../../Components/BackHeader';
import colors from '../../assets/color';
import FontText from '../../Components/common/FontText';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {hp, wp, normalize, isIOS, isX} from '../../styles/responsiveScreen';
import {useTranslation} from 'react-i18next';
import SucessFullDefault from '../../Components/SucessFullDefault/SucessFullDefault';
import BigButton from '../../Components/BigButton';
import SmartScrollView from '../../Components/SmartScrollView';

const {width, height} = Dimensions.get('screen');

export const routeName = 'Verification';
const Verification = ({navigation}) => {
  const [seconds, setSeconds] = useState(60);
  const {t} = useTranslation();

  useEffect(() => {
    if (seconds > 0) {
      setTimeout(() => setSeconds(seconds - 1), 1000);
    }
  });

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.white}}>
      <SmartScrollView>
      <View style={styles.container}>
        <BackHeader
          BackonPress={() => navigation.navigate('ForgotPassword')}
        ></BackHeader>
        <SucessFullDefault
                Title={t('EMAIL_SENT')}
                Subtitle={t('OTP_TAG')} />
        <OTPInputView
          style={styles.otp}
          pinCount={4}
          editable={true}
          autoFocusOnLoad={false}
          codeInputFieldStyle={styles.otpinput}
          onCodeFilled={code => {
            console.log(`Code is ${code}, you are good to go!`);
          }}
        />
        <View style={{marginHorizontal: 25}}>
          <FontText
            name={'poppins-medium'}
            size={normalize(14)}
            textAlign={'right'}
            color={'lightViolet'}>
            {t('RESEND_CODE')}
            <FontText color={'theme'}>
              {`00:${seconds < 10 ? '0' : ''}`}
              {seconds}
              {t('SEC')}
            </FontText>
          </FontText>
        </View>
        <View
          style={styles.subView}>
          <View
            style={styles.link}>
            <FontText
              size={normalize(14)}
              name={'poppins-medium'}
              textAlign={'center'}>
              {t('NOT_LINK')}
            </FontText>
            <TouchableOpacity>
              <FontText
                name={'poppins-medium'}
                size={normalize(14)}
                color={'red'}>
                {t('RESEND')}
              </FontText>
            </TouchableOpacity>
          </View>
          <View style ={styles.btnView}>
            <BigButton title = {t("SUBMIT")} onClick = {() => navigation.navigate('Resetpass')} />
          </View>
        </View>
       
      </View>
    
      </SmartScrollView>
    
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: wp(5),
  },
  sucess: {
    alignSelf: 'center',
  },
  otpinput: {
    width: width * 0.17,
    height: width * 0.15,
    borderWidth: 0,
    borderRadius: 14,
    fontSize: normalize(20),
    margin: wp(1),
    color: colors.violet,
    backgroundColor: colors.viewcolor,
    fontWeight: 'bold',
  },
  otp:{
    height: hp(10),
    width: wp(90),
    justifyContent: 'space-between',
    alignSelf: 'center',
    // paddingVertical:hp(2),
    // marginTop:height > 767 ? hp(1) : hp(7)
  },
  subView:{
    // flexDirection:'column',
    paddingTop: height> 767? hp(22) :  hp(15),
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: hp(0),
    alignSelf: 'center',
  },link:{
    // flex:1,
    flexDirection: 'row',
    // height:'80%',
    justifyContent: 'center',
    // marginTop: isX ? hp(22) : hp(8),
    marginBottom: hp(1),
  },
  btnView:{justifyContent:'flex-end',alignItems:'center',marginBottom:hp(2),flex:1},
});
export default Verification;
