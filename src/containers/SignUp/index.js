import React, { createRef, useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  KeyboardAvoidingView,
  Text,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import { hp, wp, normalize, isX, isAndroid } from '../../styles/responsiveScreen';
import colors from '../../assets/color';
import FontText from '../../Components/common/FontText';
import TextFieldWithImage from '../../Components/TextFieldWithImage';
import TitleSubTitle from '../../Components/TitleSubTitle';
import fonts from '../../assets/fonts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';
import SvgIcons from '../../assets/SvgIcons';
import globals from '../../assets/globals';
import axios from 'axios';
import { ALERT_TYPE, Dialog, Root, Toast } from 'react-native-alert-notification';

export const routeName = 'SignUp';

const SignUp = ({ navigation }) => {
  const fullname = createRef();
  const EmailRef = createRef();
  const PasswordRef = createRef();
  const PhoneRef = createRef();
  const [hidePassword, setHidePassword] = useState(true);
  const [hideCPassword, setHideCPassword] = useState(true);
  const [EmailColor, setEmailColor] = useState(false);
  const [PasswordColor, setPasswordColor] = useState(false);
  const [PhoneColor, setPhoneColor] = useState(false);
  const [EmailText, setEmailText] = useState(null);
  const [PasswordText, setPasswordText] = useState('');
  const [PhoneText, setPhoneText] = useState('');
  const [EmailError, setEmailError] = useState(false);
  const [PasswordError, setPasswordError] = useState(0);
  const [EmailChangeBool, setEmailChangeBool] = useState(false);
  const [PasswordChangeBool, setPasswordChangeBool] = useState(false);
  const [PhoneChangeBool, setPhoneChangeBool] =
    useState(false);
  const [PhoneError, setPhoneError] = useState(0);
  const [FullNameText, setFullNameText] = useState('');
  const [FullNameError, setFullNameError] = useState(false);
  const [FullNameChangeBool, setFullNameChangeBool] = useState(false);
  const [FullNameColor, setFullNameColor] = useState(false);
  const [referaltext, setReferalText] = useState('');
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  const ChangeHandler = () => {
    if (FullNameChangeBool) {
      FullNameValidation();
    }
    if (EmailChangeBool) {
      EmailValidation();
    }
    if (PasswordChangeBool) {
      PasswordValidation();
    }
    // if (PhoneChangeBool) {
    //   PhoneValidation();
    // }
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
    if (PasswordText.length == 0) {
      setPasswordColor(true);
      setPasswordError(1);
    } else if (PasswordText.length < 7) {
      setPasswordColor(true);
      setPasswordError(2);
    } else {
      setPasswordColor(false);
      setPasswordError(0);
    }
    setPasswordChangeBool(true);
  };

  // const PhoneValidation = () => {
  //   if (PhoneText.length == 0 ) {
  //     setPhoneColor(true);
  //     setPhoneError(1);
  //   } else {
  //     setPhoneColor(true);
  //     setPhoneError(1);
  //   }
  //   setPhoneChangeBool(true);
  // };

  const FullNameValidation = () => {
    if (FullNameText.length < 1) {
      setFullNameError(true);
      setFullNameColor(true);
    } else {
      setFullNameError(false);
      setFullNameColor(false);
    }
    setFullNameChangeBool(true);
  };
  const SendData = (data) => {
    setLoading(true)
    const user = {
      name: FullNameText,
      email: EmailText,
      password: PasswordText
    };



    const url = globals.base_url + "users";
    const configurationObject = {
      url: url,
      method: "POST",
      data: { name: FullNameText, email: EmailText, password: PasswordText, referals: referaltext },
    };

    axios(configurationObject)
      .then(function (response) {
        setLoading(false)

        //alert(JSON.stringify(response.data))
        if (JSON.stringify(response.status == 200)) {
          AsyncStorage.setItem('userData', JSON.stringify(response.data));
          navigation.navigate('Accountcreated');
        }

      })
      .catch(function (error) {
        setLoading(false)
        if (error.response.data.errors == "The email has already been taken.") {
          alert("You probably have an account with us because, " + error.response.data.errors)
          setLoading(false)

        }
        else {
          alert(error.response.data);
          setLoading(false);
        }
      })
      .finally(function () {
        // always executed

      });
  }
  const submitHandler = async () => {
    FullNameValidation();
    EmailValidation();
    PasswordValidation();
    //PhoneValidation();

    if (
      FullNameText.length != 0 &&
      validateEmail(EmailText) &&
      PasswordText.length != 0
    ) {
      const Obj = {
        name: validateEmail(EmailText),
        email: EmailText,
        password: PasswordText,
      };
      SendData(Obj)
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }} >
      <View style={styles.contain}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : null}
          keyboardVerticalOffset={Platform.select({ ios: 0, android: 500 })}>
          <View style={styles.headerLogo}>
            <Image style={{ width: 100, height: 60, marginTop: 5 }} source={{ uri: "https://ik.imagekit.io/paysupport/razortouch/Touch__1_-1_hZ7YLSAgR.png?ik-sdk-version=javascript-1.4.3&updatedAt=1653512560717" }} />
            {/* 
            <TouchableOpacity
              onPress={() => navigation.navigate('Tab')}
              activeOpacity={0.7}
              style={styles.skipbtn}>
              <FontText
                style={styles.text}
                size={14}
                name="Poppins-medium"
                color="theme"
                lines={1}>
                {t('SKIP_SIGNUP')}
              </FontText>
            </TouchableOpacity> */}
          </View>

          <TitleSubTitle
            Textstyle={{
              marginHorizontal: 0, marginTop: hp(2), alignItems: 'center',
              alignSelf: 'center',
              justifyContent: 'center',
            }}
            Title={t('ACCOUNT')}
            // SubTitle={t('EMAIL_&_PASSWORD')}
            textalign={'left'}
          />
          <ScrollView
            alwaysBounceVertical={true}
            showsVerticalScrollIndicator={false}>
            <View style={{ marginTop: hp(2) }}>
              <TextFieldWithImage
                TextFieldImage={require('../../assets/images/Adduser.png')}
                height={15}
                Title={t('FULL_NAME')}
                maxLength={15}
                ref={fullname}
                returnKeyType={'next'}
                placeholder={t('YOUR_NAME')}
                onSubmitEditing={() => {
                  FullNameValidation();
                  EmailRef.current.focus();
                }}
                onChangeText={val => {
                  setFullNameText(val.trim());
                  ChangeHandler();
                }}
                redColor={FullNameColor}
                onBlur={() => FullNameValidation()}
              />
            </View>

            {FullNameError ? (
              <View>
                <Text style={styles.error}>
                  {t('YOUR_FULL_NAME')}
                </Text>
              </View>
            ) : null}

            <View style={{ marginTop: hp(2) }}>
              <TextFieldWithImage
                TextFieldImage={require('../../assets/images/Message.png')}
                Title={t('EMAIL')}
                maxLength={15}
                blurOnSubmit={false}
                autoFocus={true}
                placeholder={t('YOUR_EMAIL')}
                returnKeyType="next"
                ref={EmailRef}
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
                onPressRight={() => setHidePassword(!hidePassword)}
                placeholder={t('YOUR_PWD')}
                secureTextEntry={hidePassword}
                rightimage={
                  hidePassword
                    ? require('../../assets/images/eyeoff.png')
                    : require('../../assets/images/eye.png')
                }
                onSubmitEditing={() => {
                  PasswordValidation();

                  //PasswordRef.current.focus();
                }}
                onChangeText={val => {
                  setPasswordText(val);
                  ChangeHandler();
                }}
                ref={PasswordRef}
                returnKeyType="next"
                redColor={PasswordColor}
                onBlur={() => PasswordValidation()}
              />
            </View>

            {PasswordError == 1 ? (
              <View>
                <Text style={styles.error}>{t('PLZ_PWD')}</Text>
              </View>
            ) : PasswordError == 2 ? (
              <View>
                <Text style={styles.error}>
                  {t('8_CHAR')}
                </Text>
              </View>
            ) : null}

            {/* <View style={{ marginTop: hp(2) }}>
              <TextFieldWithImage
                TextFieldImage={require('../../assets/images/Phone.png')}
                Title={t('Phone number')}
                maxLength={11}
                ref={PhoneRef}
                clearTextOnFocus={true}
                blurOnSubmit={false}
                placeholder={t('Enter Phone Number')}
                onSubmitEditing={() => PhoneValidation()}
                onChangeText={val => {
                  setPhoneText(val);
                  ChangeHandler();
                }}
                returnKeyType="done"
                redColor={PhoneColor}
                onBlur={() => PhoneValidation()}
              />
            </View>

            {PhoneError == 1 ? (
              <View>
                <Text style={styles.error}>
                  {t('PLZ_CONFIRM_PWD')}
                </Text>
              </View>
            ) : PhoneError == 2 ? (
              <View>
                <Text style={styles.error}>{t('NOT_MATCHED')}</Text>
              </View>
            ) : null}  */}

            {/* <View style={styles.social}>
              <TouchableOpacity activeOpacity={0.8}>
                <Image
                  source={require('../../assets/images/Google.png')}
                  style={styles.socialimg}
                />
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.8}>
                <Image
                  source={require('../../assets/images/twitter.png')}
                  style={styles.socialimg}
                />
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.8}>
                <Image
                  source={require('../../assets/images/facebook.png')}
                  style={styles.socialimg}
                />
              </TouchableOpacity>
            </View> */}
            <View style={{ marginTop: hp(2) }}>
              <TextFieldWithImage
                TextFieldImage={require('../../assets/images/ot.png')}
                Title={t('Referral Code (optional)')}
                maxLength={15}
                blurOnSubmit={false}
                autoFocus={true}
                placeholder={t('Referral code')}
                returnKeyType="next"
                ref={EmailRef}
                onChangeText={val => {
                  setReferalText(val.trim());
                  ChangeHandler();
                }}
                redColor={EmailColor}

              />
            </View>
            <View style={{ justifyContent: 'flex-end' }}>
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
                      {loading ? "Creating account..." : "Sign up"}
                    </Text>
                  </View>
                </TouchableOpacity>
              </Root>




              {/* <TouchableOpacity
                onPress={submitHandler}
                style={styles.loginbtn}
                activeOpacity={0.8}>
                <FontText
                  name={'poppins-semibold'}
                  size={normalize(16)}
                  textAlign={'center'}
                  color={'white'}>
                  {t('SIGN_UP')}
                </FontText>
              </TouchableOpacity> */}

              <View style={styles.sign}>
                <FontText
                  size={normalize(14)}
                  name={'poppins-medium'}
                  textAlign={'center'}>
                  {t('ALREADY_ACCOUNT')}
                </FontText>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Login')}
                  activeOpacity={0.8}>
                  <FontText
                    name={'poppins-semibold'}
                    size={normalize(14)}
                    color={'red'}
                    pLeft={5}>
                    {t('LOGIN')}
                  </FontText>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  contain: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: wp(3),
  },
  social: {
    flexDirection: 'row',
    marginVertical: hp(1),
    justifyContent: 'center',
  },
  socialimg: {
    height: wp(13),
    width: wp(13),
    margin: 10,
  },
  button: {
    display: "flex",
    flexDirection: "row",
    width: wp(92),
    marginTop: 15,
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
  loginbtn: {
    backgroundColor: colors.theme,
    borderRadius: wp(3),
    justifyContent: 'center',
    alignSelf: 'center',
    paddingVertical: isX ? hp(2) : hp(2),
    width: wp(90),
  },
  sign: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: hp(2.5),
    marginBottom: hp(4)
  },
  headerLogo: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginHorizontal: wp(4),
    paddingTop: isX ? hp(5) : hp(2),
  },
  skipbtn: {
    backgroundColor: colors.box,
    paddingVertical: hp(1),
    paddingHorizontal: hp(1.5),
    borderRadius: wp(2),
  },
  error: {
    color: '#ff0000',
    fontSize: normalize(11),
    marginTop: hp(1),
    marginHorizontal: wp(4),
  },
});

export default SignUp;
