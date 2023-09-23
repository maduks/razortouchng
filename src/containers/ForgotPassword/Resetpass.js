import React, { Component, useState, createRef, useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Platform,
  SafeAreaView,
  ActivityIndicator,
  Image,
} from 'react-native';
import BackHeader from '../../Components/BackHeader';
import colors from '../../assets/color';
import TitleSubTitle from '../../Components/TitleSubTitle';
import {
  hp,
  wp,
  normalize,
  isIOS,
  isX,
  isAndroid,
} from '../../styles/responsiveScreen';
import Input from '../../Components/common/Input';
import { useTranslation } from 'react-i18next';
import BigButton from '../../Components/BigButton';
import SmartScrollView from '../../Components/SmartScrollView';
import globals from '../../assets/globals';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('screen');

export const routeName = 'Resetpass';

const Resetpass = ({ route, navigation }) => {
  const [Password, setPassword] = useState('');
  const [NewPassword, setNewPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true);
  const [hideCPassword, setHideCPassword] = useState(true);
  const ConfirmPasswordRef = createRef();
  const [PasswordError, setPasswordError] = useState(0);
  const [ConfirmPasswordError, setConfirmPasswordError] = useState(0);
  const [PasswordChangeBool, setPasswordChangeBool] = useState(false);
  const [ConfirmPasswordChangeBool, setConfirmPasswordChangeBool] = useState(false);
  const { email } = route.params;
  const [loading, setLoading] = useState(false);
  const [Email, setEmail] = useState('');
  const { t } = useTranslation();

  function changeHandler() {
    if (PasswordChangeBool) {
      PasswordValidation();
    }
    if (ConfirmPasswordChangeBool) {
      ConfirmPasswordValidation();
    }
  }

  function PasswordValidation() {
    if (Password.length == 0) {
      setPasswordError(1);
    } else if (Password.length < 7) {
      setPasswordError(2);
    } else {
      setPasswordError(0);
    }
    setPasswordChangeBool(true);
  }

  const ConfirmPasswordValidation = text => {
    if (NewPassword.length == 0) {
      setConfirmPasswordError(1);
    } else if (NewPassword === Password) {
      setNewPassword(NewPassword);
      setConfirmPasswordError(0);
    } else {
      setConfirmPasswordError(2);
    }
    setConfirmPasswordChangeBool(true);
  };

  const SubmitHandler = () => {
    PasswordValidation();
    ConfirmPasswordValidation();
    if (
      Password == NewPassword &&
      Password.length != 0 &&
      NewPassword.length != 0
    ) {
      setLoading(true);
      const url = globals.base_url + "resetpassword";
      const configurationObject = {
        url: url,
        method: "POST",
        data: { password: Password, email: JSON.parse(JSON.stringify(email)) },
      };

      axios(configurationObject)
        .then(function (response) {

          alert('Password Change Was Successful, Login now.')
          setLoading(false)

          navigation.navigate('Login');
        })
        .catch(function (error) {
          if (error == "AxiosError: Network Error") {

            alert("Check internet connection and try again")
            setLoading(false);

          }
          else {
            alert(error)
            setLoading(false);
          }


        })
        .finally(function () {

        });


      //navigation.navigate('Resetpasspopup');
    }
  };




  useEffect(() => {

    AsyncStorage.getItem('emailUpdate').then(
      (value) => {

        if (value != null) {

          setEmail(value);
          //alert(value)

        }

      });

  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
      <SmartScrollView
        alwaysBounceVertical={false}
        showsVerticalScrollIndicator={false}
        applyKeyboardCheck={isIOS}
        contentContainerStyle={styles.containerStyle}
        style={{ flex: 1 }}
      >
        <View style={styles.container}>
          <BackHeader
            BackonPress={() => navigation.navigate('ForgotPassword')}></BackHeader>
          <TitleSubTitle
            Title={t('RES_PWD')}
            SubTitle={t(
              'Enter new password for your account',
            )}
            textalign={'left'}
            pTop={hp(1)}></TitleSubTitle>
          <View style={styles.viewf}>
            <Input
              returnKeyType={'next'}
              placeholderTextColor="green"
              onChangeText={val => {
                setPassword(val);
                changeHandler();
              }}
              maxLength={25}
              secureTextEntry={hidePassword}
              rightimage={
                hidePassword
                  ? require('../../assets/images/eyeoff.png')
                  : require('../../assets/images/eye.png')
              }
              onPressRight={() => {
                setHidePassword(!hidePassword);
              }}
              inputStyle={[styles.input, {
                borderWidth: PasswordError != 0 ? 1 : 0,
                borderColor: PasswordError != 0 ? '#ff0000' : null,
              }]}
              placeholder={t('NEW_PWD')}
              fontSize={normalize(16)}
              onSubmit={() => {
                PasswordValidation();
                ConfirmPasswordRef.current.focus();
              }}
              onBlur={() => PasswordValidation()}></Input>
            <TouchableOpacity
              style={styles.icons}
              onPress={() => setHidePassword(!hidePassword)}>
              {hidePassword ? (
                <Image
                  style={styles.image}
                  source={require('../../assets/images/eyeoff.png')}
                />
              ) : (
                <Image
                  style={styles.image}
                  source={require('../../assets/images/eye.png')}
                />
              )}
            </TouchableOpacity>
          </View>
          {PasswordError == 1 ? (
            <View>
              <Text
                style={styles.pwdError}>
                {t('PLZ_PWD')}
              </Text>
            </View>
          ) : PasswordError == 2 ? (
            <View>
              <Text
                style={styles.pwd2Error}>
                {t('PWD_LONG')}
              </Text>
            </View>
          ) : null}
          <View style={styles.viewf}>
            <Input
              value={NewPassword}
              returnKeyType={'done'}
              placeholderTextColor={'green'}
              onChangeText={val => {
                changeHandler();
                setNewPassword(val);
              }}
              secureTextEntry={hideCPassword}
              maxLength={25}
              ref={ConfirmPasswordRef}
              inputStyle={[styles.confirmInput, {
                borderWidth: ConfirmPasswordError != 0 ? 1 : 0,
                borderColor: ConfirmPasswordError != 0 ? '#ff0000' : null,
              }]}
              placeholder={t('CONFIRM_PWD')}

              fontSize={normalize(16)}
              onSubmit={() => ConfirmPasswordValidation()}
              onBlur={() => ConfirmPasswordValidation()}></Input>
            <TouchableOpacity
              style={styles.icons}
              onPress={() => setHideCPassword(!hideCPassword)}>
              {hideCPassword ? (
                <Image
                  style={styles.image}
                  source={require('../../assets/images/eyeoff.png')}
                />
              ) : (
                <Image
                  style={styles.image}
                  source={require('../../assets/images/eye.png')}
                />
              )}
            </TouchableOpacity>
          </View>
          {ConfirmPasswordError == 1 ? (
            <View>
              <Text
                style={styles.cpwd}>
                {t('PLZ_CONFIRM_PWD')}
              </Text>
            </View>
          ) : ConfirmPasswordError == 2 ? (
            <View>
              <Text
                style={styles.not}>
                {t('NOT_MATCHED')}
              </Text>
            </View>
          ) : null}
        </View>
        <View style={styles.btn}>
          {/* <BigButton title={t("CONFIRM")} onClick={() => SubmitHandler()} /> */}
          <TouchableOpacity disabled={loading} onPress={SubmitHandler}>
            <View
              style={{
                ...styles.button,
                backgroundColor: loading ? colors.theme : colors.theme,
              }}
            >
              {loading && <ActivityIndicator size="large" color="yellow" />}
              <Text style={styles.buttonText}>
                {loading ? "Updating password..." : "Confirm"}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </SmartScrollView>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  containerStyle: { paddingVertical: hp(0), paddingHorizontal: wp(5), backgroundColor: "#ffffff" },
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  viewf: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: isX ? wp(1) : wp(1),
    marginVertical: isX ? wp(2) : wp(2),
    paddingTop: isX ? hp(0) : hp(1),
    fontSize: normalize(16),
    width: wp(80),
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
  icons: {
    marginVertical: hp(4),
    padding: 10,
    height: 25,
    width: 25,
    resizeMode: 'stretch',
    alignItems: 'center',
    position: 'absolute',
    right: -wp(5),
    alignSelf: 'center',
  },
  image: {
    width: wp(6.5),
    height: wp(6.5),
    marginRight: wp(3.5),
    marginTop: hp(-1),
    opacity: 0.3,
  },
  input: {
    backgroundColor: colors.viewcolor,
    borderRadius: 14,
    height: hp(8),
    width: wp(90),
    paddingHorizontal: wp(5),
    paddingRight: wp(15),
    flexDirection: 'row',
  },
  pwdError: {
    color: '#ff0000',
    fontSize: normalize(16),
    marginLeft: width * 0.02,
  },
  pwd2Error: {
    color: '#ff0000',
    fontSize: normalize(16),
    marginLeft: width * 0.025,
  },
  confirmInput: {
    backgroundColor: colors.viewcolor,
    borderRadius: 14,
    height: hp(8),
    width: wp(90),
    paddingHorizontal: wp(5),
    paddingRight: wp(15),
  },
  cpwd: {
    color: '#ff0000',
    fontSize: normalize(16),
    marginLeft: width * 0.025,
  },
  not: {
    color: '#ff0000',
    fontSize: normalize(16),
    marginLeft: width * 0.025,
  },
  btn: {
    // flex: 1,
    // height:'30%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: height > 767 ? hp(40) : hp(35),
    marginBottom: hp(0),
  },
});

export default Resetpass;
