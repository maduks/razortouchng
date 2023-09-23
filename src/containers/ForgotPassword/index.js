import React, { Component, useState } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  ActivityIndicator,
  Keyboard,
} from 'react-native';
import BackHeader from '../../Components/BackHeader';
import colors from '../../assets/color';
import FontText from '../../Components/common/FontText';
import TitleSubTitle from '../../Components/TitleSubTitle';
import { SafeAreaView } from 'react-native-safe-area-context';
import { hp, wp, normalize, isIOS, isX, isAndroid } from '../../styles/responsiveScreen';
import Input from '../../Components/common/Input';
import { useTranslation } from 'react-i18next';
import BigButton from '../../Components/BigButton';
import SmartScrollView from '../../Components/SmartScrollView';
import AsyncStorage from '@react-native-async-storage/async-storage';

import globals from '../../assets/globals';
import axios from 'axios';
const { width, height } = Dimensions.get('screen');

export const routeName = 'ForgotPassword';

const ForgotPassword = ({ navigation }) => {
  const [Email, setEmail] = useState('');
  const [EmailError, setEmailError] = useState(false);
  const [EmailChangeBool, setEmailChangeBool] = useState(false);
  const [validemail, setValidEmail] = useState(0);
  const [recognizeText, setRecognizeText] = useState("");
  const [rcolor, setRColor] = useState("");
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  function validateEmail(email) {
    const re =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
  const ChangeHandler = () => {
    if (EmailChangeBool) {
      Emailvalidation();
    }
  };

  function Emailvalidation() {
    if (!validateEmail(Email)) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
    setEmailChangeBool(true);
  }

  const SubmitHandler = () => {
    Emailvalidation();
    if (validateEmail(Email)) {
      setLoading(true)
      setRecognizeText("")
      const url = globals.base_url + "check-mail";
      const configurationObject = {
        url: url,
        method: "POST",
        data: { email: Email },
      };

      axios(configurationObject)
        .then(function (response) {

          setValidEmail(true)
          setLoading(false)
          AsyncStorage.setItem('emailUpdate', Email);
          if (JSON.parse(JSON.stringify(response.data.message)) == "Email found") {
            navigation.navigate('Resetpass', {
              email: Email,

            });
          }
          // 

        })
        .catch(function (error) {
          console.log(JSON.stringify(error))
          if (error == "AxiosError: Network Error") {

            alert("Check internet connection and try again")
            setValidEmail(true)
            setLoading(false);


          }
          else {

            setRecognizeText("Unrecognized email address")
            setRColor("red")
            setValidEmail(true)
            setLoading(false);

          }


        })
        .finally(function () {

        });
      // 
      //
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <SmartScrollView
        alwaysBounceVertical={false}
        showsVerticalScrollIndicator={false}
        applyKeyboardCheck={isIOS}
        contentContainerStyle={{ paddingVertical: hp(0) }}
      >
        <BackHeader BackonPress={() => navigation.navigate('Login')} ></BackHeader>
        <TitleSubTitle
          Title={t('FG')}
          SubTitle={t(
            'EMAIL_TAG',
          )}
          textalign={'left'}
          pTop={hp(1)}></TitleSubTitle>
        <View style={styles.viewg}>
          <Input
            value={Email}
            onChangeText={val => {
              setEmail(val.trim());
              ChangeHandler();
            }}
            inputStyle={{
              backgroundColor: colors.viewcolor,
              borderRadius: 14,
              height: width * 0.15,
              paddingHorizontal: wp(5),
              borderWidth: EmailError ? 1 : 0,
              borderColor: EmailError ? '#ff0000' : null,
            }}
            fontSize={normalize(16)}
            height={hp(4)}
            width={hp(90)}
            maxLength={50}
            placeholder={t('EMAIL_ADD')}
            placeholdertextcolor={colors.lightViolet}
            onSubmitEditingHandler={() => Keyboard.dismiss()
            }
          />
          {validemail ? <Text style={{ color: { rcolor }, padding: 10 }}>{recognizeText}.</Text> : <Text style={{ color: "red", padding: 10 }}></Text>}
        </View>
        {EmailError ? (
          <View>
            <Text
              style={styles.eamilError}>
              {t('EMAIL_NOT_VALID')}
            </Text>
          </View>
        ) : null}
        <View
          style={styles.btnView}>
          <View
            style={styles.btn}>
            <FontText
              size={normalize(14)}
              name={'poppins-medium'}
              textAlign={'center'} >
              {t('REM_PWD')}
            </FontText>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <FontText
                name={'poppins-medium'}
                size={normalize(14)}
                color={'red'}>
                {t('LOGIN')}
              </FontText>
            </TouchableOpacity>
          </View>

          <View style={styles.mainBtnView}>
            {/* <BigButton title={t('SUBMIT')} onClick={() => SubmitHandler()} /> */}


            <TouchableOpacity disabled={loading} onPress={SubmitHandler}>
              <View
                style={{
                  ...styles.button,
                  backgroundColor: loading ? colors.theme : colors.theme,
                }}
              >
                {loading && <ActivityIndicator size="large" color="yellow" />}
                <Text style={styles.buttonText}>
                  {loading ? "Verifying email..." : "Submit"}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </SmartScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: wp(4),
  },
  viewg: {
    marginHorizontal: hp(1),
    marginVertical: hp(2),
  },
  button: {
    display: "flex",
    flexDirection: "row",
    width: wp(92),
    paddingVertical: isAndroid ? hp(2) : hp(1.5),
    backgroundColor: colors.theme,
    borderRadius: wp(4),
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15
  },
  btn: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: height < 767 ? isAndroid ? hp(40) : hp(47) : hp(47),
  },
  eamilError: {
    color: '#ff0000',
    fontSize: normalize(16),
    marginLeft: width * 0.05,
    marginTop: -width * 0.02,
  },
  btnView: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  mainBtnView: { justifyContent: 'flex-end', alignItems: 'center', marginTop: hp(1) },
});

export default ForgotPassword;
