import React, { useState, createRef, useRef, useEffect } from 'react';
import FontText from '../../Components/common/FontText';
import colors from '../../assets/color';
import SvgIcons from '../../assets/SvgIcons';
import Modal from "react-native-modal";
import TextFieldWithImage from '../../Components/TextFieldWithImage';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Text,
  Platform,
  Linking,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { hp, wp, normalize, isIOS, isX, isAndroid } from '../../styles/responsiveScreen';
import fonts from '../../assets/fonts';
import HeaderWithLogo from '../../Components/HeaderWithLogo'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';
import BigButton from '../../Components/BigButton';
import SmartScrollView from '../../Components/SmartScrollView'
export const routeName = 'Login';
import globals from '../../assets/globals';
import axios from 'axios';
const { width, height } = Dimensions.get('screen');
import Spinner from 'react-native-loading-spinner-overlay';
import LoadingButton from "react-native-loading-button-with-animation";
import { ALERT_TYPE, Dialog, Root, Toast } from 'react-native-alert-notification';
import DeviceInfo from 'react-native-device-info';
import { Modalize } from 'react-native-modalize';
import { SafeAreaView } from 'react-native-safe-area-context';

const Login = ({ navigation }) => {
  const { t } = useTranslation();
  const modalizeRef = useRef(null);

  const PasswordRef = createRef();
  const [hidePassword, setHidePassword] = useState(true);
  const [oldVersion, setOldVersion] = useState();
  const [newVersion, setNewVersion] = useState();
  const [showUpdate, setShowUpdate] = useState(false);
  const [EmailColor, setEmailColor] = useState(false);
  const [PasswordColor, setPasswordColor] = useState(false);
  const [EmailText, setEmailText] = useState('');
  const [PasswordText, setPasswordText] = useState('');
  const [EmailError, setEmailError] = useState(false);
  const [PasswordError, setPasswordError] = useState(false);
  const [EmailChangeBool, setEmailChangeBool] = useState(false);
  const [PasswordChangeBool, setPasswordChangeBool] = useState(false);
  const [UserAlready_Login, setUserAlready_Login] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingscreen, setLoadingScreen] = useState(true);
  // AsyncStorage Values
  const { width, height } = Dimensions.get('screen')

  const [AsyncValue, setAsyncValue] = useState({});


  const GetData = async () => {
    try {
      const data = await AsyncStorage.getItem('UserData');
      setAsyncValue(JSON.parse(data));
    } catch (error) {
      console.log('Error from LogIn Page of AsyncStorage.....', error);
    }
  };
  const openAppStore = () => {
    const link =
      'itms-apps://apps.apple.com/tr/app/id6446280437?l=tr';
    Linking.canOpenURL(link).then(
      (supported) => {
        supported && Linking.openURL(link);
      },
      (err) => console.log(err)
    );
  };
  const openGooglePlay = () => {
    Linking.openURL(
      'https://play.google.com/store/apps/details?id=com.razortouchng'
    );
  };
  const ChangeHandler = Bool => {

    if (EmailChangeBool) {
      EmailValidation();
    }
    if (PasswordChangeBool) {
      PasswordValidation();
    }
  };

  function validateEmail(email) {
    const re =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  const EmailValidation = () => {
    if (!validateEmail(EmailText)) {
      setEmailColor(true);
      setEmailError(true);
    } else {
      setEmailColor(false);
      setEmailError(false);
    }
    setEmailChangeBool(true);
  };

  const PasswordValidation = () => {
    if (PasswordText.length < 8) {
      setPasswordColor(true);
      setPasswordError(true);
    } else {
      setPasswordColor(false);
      setPasswordError(false);
    }
    setPasswordChangeBool(true);
  };

  const submitHandler = async () => {

    setLoading(true)
    EmailValidation();
    PasswordValidation();
    if (
      validateEmail(EmailText) &&
      PasswordText.length != 0 &&
      PasswordText.length > 7

    ) {

      const url = globals.base_url + "login";
      const configurationObject = {
        url: url,
        method: "POST",
        timeout: 50000,
        data: { email: EmailText, password: PasswordText },
      };

      axios(configurationObject)
        .then(function (response) {
          AsyncStorage.setItem('userData', JSON.stringify(response.data.user));
          const user = JSON.parse(JSON.stringify(response.data.user));
          setLoading(false);
          AsyncStorage.setItem('UserPhoneData', user.phone);
          navigation.navigate('Tab')
        })
        .catch(function (error) {
          if (error == "AxiosError: Network Error") {
            Dialog.show({
              type: ALERT_TYPE.WARNING,
              title: 'Internet Connection',
              theme: 'dark',
              textBody: 'Check internet connection and try again',
              button: 'ok',
            })
            setLoading(false);

          }
          else {
            alert('Invalid credentials!')
            // Dialog.show({
            //   type: ALERT_TYPE.WARNING,
            //   title: 'Invalid Login',
            //   theme: 'dark',
            //   textBody: JSON.parse(JSON.stringify(error.response.data.message)),
            //   button: 'ok',
            // })

            setLoading(false);
          }


        })
        .finally(function () {

        });

    }
    else {
      setLoading(false)
    }
  };

  const checkLogin = () => {


    AsyncStorage.getItem('userData').then(
      (value) => {
        if (value != null) {
          setLoadingScreen(false)
          navigation.navigate('Tab');
          setLoadingScreen(false)
        }
        else {
          setLoadingScreen(false)
        }
        //modalizeRef.current?.open();
        const url = globals.base_url + "checkUpdates";
        // AsyncStorage.setItem('@current_version', JSON.stringify(DeviceInfo.getVersion()))
        axios
          .get(url, {
            headers: {
              "Content-type": "application/json",
              "Accept": "application/json"
            }
          })
          .then(function (response) {
            //alert("version: " + JSON.parse(JSON.stringify(response.data[0])).version + " " + DeviceInfo.getVersion())
            if (JSON.parse(JSON.stringify(response.data[0])).update_available == "true") {
              if (JSON.parse(JSON.stringify(response.data[0])).version !== DeviceInfo.getVersion()) {
                setShowUpdate(true)

              }
              else {
                setShowUpdate(false)
              }

              // AsyncStorage.setItem('@old_version',JSON.stringify(DeviceInfo.getVersion()))
            }
            else {
              setShowUpdate(false)
            }

            console.log(response.data)
          })
          .catch(function (error) {
            alert("" + error);
          })

      });
  }

  useEffect(() => {
    modalizeRef.current?.open();
    checkLogin();
  }, []);
  // function customRenderer() {
  //   return (

  //   )
  // }
  return (

    <SmartScrollView alwaysBounceVertical={false}
      showsVerticalScrollIndicator={false}
      applyKeyboardCheck={isIOS}
      style={{ backgroundColor: '#ffffff' }}
    >

      {loadingscreen ? <Spinner
        visible={true}
        overlayColor="rgba(0, 0, 0, 1)"
        textContent={'Fetching data....'}

        textStyle={{ color: colors.darkred }}
      /> :
        <View style={styles.container}>
          <Spinner
            visible={loading}
            textContent={'Logging in please wait...'}
            textStyle={styles.spinnerTextStyle}
          />
          <View>

            <HeaderWithLogo label={t('SKIP_LOGIN')} onPress={() => navigation.navigate('Tab')} />
            <View style={styles.itemView}>
              <FontText
                name={'poppins-medium'}
                size={normalize(22)}
                pRight={wp(2)}
                style={{
                  alignSelf: 'center',
                  justifyContent: 'center',
                }}
                color={'Violet'}>
                {t('LOGIN_TO')} <Text style={{ fontWeight: 'bold', color: colors.lightOrngae }}>Razortouchng</Text>
              </FontText>


            </View>

            <FontText
              name={'poppins-regular'}
              pLeft={wp(3)}
              size={normalize(12)}
              pTop={hp(0.4)}
              style={{
                alignSelf: 'center',
                justifyContent: 'center',
              }}
              color={'lightViolet'}>
              {t('Using your email & password')}
            </FontText>

            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : null}
              keyboardVerticalOffset={Platform.select({ ios: 0, android: 500 })}>
              <View style={{ marginTop: hp(4) }}>
                <TextFieldWithImage
                  TextFieldImage={require('../../assets/images/Message.png')}
                  Title={t('Email')}
                  maxLength={15}
                  value={EmailText}
                  blurOnSubmit={false}
                  autoFocus={true}
                  placeholder={t('YOUR_EMAIL')}
                  returnKeyType="next"
                  onSubmitEditing={() => {
                    EmailValidation();
                    PasswordRef.current.focus();
                  }}
                  onChangeText={val => {
                    setEmailText(val.trim());
                    ChangeHandler();
                  }}
                  redColor={EmailColor}
                  onBlur={() => EmailValidation()}
                />
              </View>

              {EmailError ? (
                <View>
                  <Text style={styles.error}>{t('EMAIL_NOT_VALID')}</Text>
                </View>
              ) : null}

              <View style={{ marginTop: hp(2) }}>
                <TextFieldWithImage
                  TextFieldImage={require('../../assets/images/Password.png')}
                  Title={t('PWD')}
                  maxLength={8}
                  blurOnSubmit={false}
                  placeholder={t('YOUR_PWD')}
                  secureTextEntry={hidePassword}
                  rightimage={
                    hidePassword
                      ? require('../../assets/images/eyeoff.png')
                      : require('../../assets/images/eye.png')
                  }
                  onPressRight={() => {
                    setHidePassword(!hidePassword);
                  }}
                  onSubmitEditing={() => {
                    PasswordValidation();
                  }}
                  onChangeText={val => {
                    setPasswordText(val);
                    ChangeHandler();
                  }}
                  ref={PasswordRef}
                  returnKeyType="done"
                  redColor={PasswordColor}
                  onBlur={() => PasswordValidation()}
                />
              </View>

              {PasswordError ? (
                <View>
                  <Text style={styles.error}>
                    {t('8_CHAR')}
                  </Text>
                </View>
              ) : null}

              {UserAlready_Login && (
                <View>
                  <Text style={styles.userlogin}>User is Not Register</Text>
                </View>
              )}
            </KeyboardAvoidingView>
          </View>

          <View style={{ flex: 1 }}>
            <TouchableOpacity activeOpacity={0.8} style={{ width: wp(40), alignSelf: 'flex-end' }}>
              <FontText
                name={'poppins-medium'}
                size={normalize(14)}
                color={'red'}
                pTop={hp(1)}
                pRight={wp(3)}
                textAlign={'right'}
                onPress={() => navigation.navigate('ForgotPassword')}>
                {t('FG_PWD')}
              </FontText>
            </TouchableOpacity>


          </View>


        </View>
      }
      {!loadingscreen ?
        <View style={styles.bottomView}>
          <Root>
            <TouchableOpacity disabled={loading} onPress={submitHandler}>
              <View
                style={{
                  ...styles.button,
                  backgroundColor: loading ? colors.theme : colors.theme,
                }}
              >
                {loading && <ActivityIndicator size="large" color="yellow" />}
                <Text style={styles.buttonText}>
                  {loading ? "Logging in..." : "Login"}
                </Text>
              </View>
            </TouchableOpacity>
          </Root>


          {/* <BigButton   title={t('LOGIN')} onClick={submitHandler} /> */}

          <View style={styles.sign}>
            <FontText
              size={normalize(14)}
              name={'poppins-regular'}
              pBottom={hp(1)}
              textAlign={'center'}>
              {t("NOT_ACCOUNT")}
            </FontText>
            <TouchableOpacity

              onPress={() => navigation.navigate('signup')}
              activeOpacity={0.8}>
              <FontText
                name={'poppins-semibold'}
                size={normalize(14)}
                color={colors.darkred}
                pLeft={5}>
                {t('SIGN_UP')}
              </FontText>
            </TouchableOpacity>
          </View>
        </View> : null
      }

      <Modal isVisible={showUpdate}>
        <View style={{ flex: 1, marginTop: 90, marginBottom: 40, borderRadius: 25, backgroundColor: 'white', justifyContent: 'center' }}>

          <View style={{ flexDirection: 'row', alignSelf: 'center', }}>
            <Image
              source={require('../../assets/images/update_app.png')}
              style={{
                width: width / 1.5,
                height: width / 1.9,
                resizeMode: "contain",
                alignSelf: "center",

              }}
            />
          </View>
          <View style={{ flexDirection: 'row', alignSelf: 'center', }}>
            <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>App Update</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <FontText
              name={'poppins-regular'}
              pLeft={wp(3)}
              pRight={wp(3)}
              size={normalize(13)}
              pTop={hp(0.4)}
              style={{
                alignSelf: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                color: 'black',
                marginBottom: 20,
                marginTop: 20
              }}
              color={'lightViolet'}>
              <Text style={{ padding: 25 }} >
                We added lots of new services and discounts, to make
                your booking experiece a remarkably smooth as possible. Click on the update button below.</Text>
            </FontText>

          </View>
          <View style={{ flexDirection: 'row', alignSelf: 'center', alignItems: 'center', }}>
            {Platform.OS === 'ios' ? <TouchableOpacity
              onPress={openAppStore}
              style={{
                backgroundColor: colors.theme,
                padding: 15,
                borderRadius: 5,
                width: '40%'
              }}
            >
              <Text style={{ textAlign: 'center', color: '#fff' }}>Update</Text>

            </TouchableOpacity> :
              <TouchableOpacity
                onPress={openGooglePlay}
                style={{
                  backgroundColor: colors.theme,
                  padding: 15,
                  borderRadius: 5,
                  width: '40%'
                }}
              >
                <Text style={{ textAlign: 'center', color: '#fff' }}>Update</Text>

              </TouchableOpacity>
            }
          </View>

        </View>
      </Modal>

    </SmartScrollView>



  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: wp(3),
  },
  img: {
    height: wp(20),
    width: wp(20),
    marginTop: hp(3),
  },
  sign: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: hp(2.5),
    marginBottom: hp(4)
  },
  social: {
    flexDirection: 'row',
    paddingHorizontal: wp(2),
    paddingVertical: wp(2),
    justifyContent: 'center',
    alignItems: 'center',
  },
  socialimg: {
    height: wp(15),
    width: wp(15),
    margin: wp(4),
    borderRadius: wp(8),
  },
  itemView: {
    flexDirection: 'row',
    marginHorizontal: wp(3),
    marginTop: hp(2.5),
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
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
  spinnerTextStyle: {
    color: '#fff',
    fontSize: 14,
  },
  bottomView: {
    flex: 1,
    //justifyContent: 'flex-end',
    // marginBottom: isAndroid ? hp(-2) : hp(2),
    paddingTop: height > 767 ? hp(10) : hp(2)
  },
  error: {
    color: colors.error,
    fontSize: normalize(12),
    marginHorizontal: wp(4),
    marginTop: hp(0.5),
  },
  userlogin: {
    color: '#ff0000',
    fontSize: normalize(16),
    marginHorizontal: wp(4),
    marginTop: hp(1),
  },
});

export default Login;
