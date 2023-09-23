import React, { Component, useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Dimensions,
  KeyboardAvoidingView,
  ActivityIndicator
} from 'react-native';
import { hp, wp, normalize, isIOS } from '../../styles/responsiveScreen';
import { ALERT_TYPE, Dialog, Root, Toast } from 'react-native-alert-notification';

import SvgIcons from '../../assets/SvgIcons';
import FontText from '../../Components/common/FontText';
import colors from '../../assets/color';
import Input from '../../Components/common/Input';
import Button from '../../Components/common/Button';
import BackHeader from '../../Components/BackHeader';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import ImageCropPicker, { openCamera } from 'react-native-image-crop-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import globals from '../../assets/globals';
import axios from 'axios';
export const routeName = 'PersonalInformation';
const { width, height } = Dimensions.get('screen');
const PersonalInformation = (props) => {
  const ref_input2 = useRef();
  const ref_input3 = useRef();
  const [fullname, setfullname] = useState('');
  const [Phonenumber, setPhoneNumber] = useState(0);
  const [email, setemail] = useState('');
  const [loading, setLoading] = useState(false);
  const [SaveBtn, setSaveBtn] = useState(false);
  const { t } = useTranslation();
  const [IsImage, setIsImage] = useState(null);
  const [userId, setUserId] = useState();

  // For Gender
  const [gender, setgendex] = useState(0);
  var data = ['MALE', 'FEMALE'];

  const { navigation: { goBack } } = props;
  function validEmail(Email) {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return reg.test(Email);
  }

  const SaveChanges = () => {
    console.log('Save chnages');

    setSaveBtn(!SaveBtn);
    setLoading(true)
    if (AllField && Phonenumber.length == 11) {
      const url = globals.base_url + "users/" + userId;
      const configurationObject = {
        url: url,
        method: "PUT",
        timeout: 50000,
        data: { phone: Phonenumber, email: email, gender: gender == 0 ? "Male" : 'Female', name: fullname },
      };
      axios(configurationObject)
        .then(function (response) {
          setLoading(false)
          AsyncStorage.setItem('UserPhoneData', Phonenumber);
          setPhoneNumber(Phonenumber)
          Dialog.show({
            type: ALERT_TYPE.SUCCESS,
            title: 'Success',
            theme: 'dark',
            textBody: 'Profile updated!!',
            button: 'close',
          })

        })
        .catch(function (error) {
          // handle error
          Dialog.show({
            type: ALERT_TYPE.DANGER,
            title: 'Error',
            textBody: 'Please check internet connetion...',
            button: 'close',
          })
          setLoading(false)
        })
        .finally(function () {
          // always executed

        })
    } else {
      setLoading(false)
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: 'Error',
        textBody: 'Fill all fields!!',
        button: 'close',
      })
    }

  };



  // Form validation

  const FirstName_Error = SaveBtn && fullname.length == 0;
  const Phone_Error =
    SaveBtn && (Phonenumber.length == 0 || Phonenumber.length < 10);
  const Email_Error = SaveBtn && (email.length == 0 || !validEmail(email));

  const AllField = fullname.length != 0 && Phonenumber != null ? Phonenumber.length != 0 : 0 && email.length != 0;
  useEffect(() => {

    AsyncStorage.getItem('UserPhoneData').then(
      (value) => {
        // AsyncStorage returns a promise
        setPhoneNumber(value)




      });

    AsyncStorage.getItem('userData').then(
      (value) => {
        // AsyncStorage returns a promise

        const user = JSON.parse(value);
        setUserId(user.id)
        setfullname(user.name);

        setemail(user.email)
        if (user.gender == "Male") {
          setgendex(0);
        }
        else if (user.gender == "Female") {
          setgendex(1);
        }

      });

  }, []);
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <BackHeader
          style={{ paddingTop: hp(1) }}
          title={t('PERSONAL_INFO')}
          titleColor="violet"
          BackonPress={() => goBack()}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          <KeyboardAvoidingView
            behavior={Platform.OS == 'ios' ? 'position' : null}>
            <View style={styles.image}>
              <View style={styles.profileview}>
                {IsImage ? <Image
                  style={styles.profile}
                  source={{ uri: IsImage.path }}
                /> : <Image
                  style={styles.profile}
                  source={{ uri: 'https://ui-avatars.com/api/?name=' + fullname + "&background=fff" }}
                />}

              </View>

              {/* <TouchableOpacity activeOpacity={0.7} onPress={() => OpenGallery()}
                style={styles.picView}>
                <SvgIcons.Camera
                  height={hp(2)}
                  width={hp(2)}
                  style={styles.camera}
                />
              </TouchableOpacity> */}
            </View>

            <View style={styles.smallcontainer}>
              <FontText
                size={normalize(16)}
                pLeft={wp(3)}
                name={'poppins-medium'}
                paddingVertical={hp(2)}
                style={styles.namecontainer}>
                {t('FULL_NAME')}
              </FontText>
              <Input
                placeholder={t('ENTER_NAME')}
                fontSize={normalize(16)}
                returnKeyType="next"
                blurOnSubmit={false}
                maxLength={25}
                editable={true}
                inputStyle={styles.nameInput}
                onChangeText={val => setfullname(val.trim())}
                onSubmit={() => {
                  ref_input2.current.focus();
                }}
                value={fullname}

                fontName={'poppins-regular'}
                style={styles.input}
                height={hp(6)}
                width={hp(90)}></Input>


              <View style={styles.ErrorView}>
                <Text style={styles.ErrorText}>
                  {FirstName_Error && t('YOUR_FULL_NAME')}
                </Text>
              </View>


              <FontText
                size={normalize(16)}
                pLeft={width * 0.03}
                name={'poppins-medium'}
                style={styles.namecontainer}>
                {t('PHONE_NO')}
              </FontText>
              <Input
                keyboardType={'numeric'}
                editable={true}
                placeholder={t('PLZ_PHONE_NO')}
                maxLength={11}
                returnKeyType="next"
                blurOnSubmit={false}
                inputStyle={styles.phoneInput}
                // placeholderviolet={' lightViolet'}
                onSubmit={() => {
                  ref_input3.current.focus();
                }}
                ref={ref_input2}
                onChangeText={setPhoneNumber}
                value={Phonenumber}
                fontName={'poppins-regular'}
                style={styles.input}
                height={hp(6)}
                width={hp(90)}></Input>

              <View style={styles.ErrorView}>
                <Text style={styles.ErrorText}>
                  {Phone_Error
                    ? SaveBtn && Phonenumber.length == 0
                      ? t('PLZ_PHONE_NO')
                      : t('VALID_PHONE_NO')
                    : null}
                </Text>
              </View>

              <FontText
                size={normalize(16)}
                pLeft={width * 0.03}
                name={'poppins-medium'}
                style={styles.namecontainer}>
                {t('EMAIL_ADD')}
              </FontText>
              <Input
                placeholder={t('YOUR_EMAIL')}
                returnKeyType="done"
                editable={false}
                onSubmit={() => {
                  ref_input3.current.blur();
                }}
                ref={ref_input3}
                inputStyle={styles.emailInput}
                onChangeText={val => setemail(val.trim())}
                value={email}
                fontName={'poppins-regular'}
                style={styles.input}
                height={hp(6)}
                width={hp(90)}></Input>

              <View style={styles.ErrorView}>
                <Text style={styles.ErrorText}>
                  {Email_Error
                    ? SaveBtn && email.length == 0
                      ? t('YOUR_EMAIL')
                      : t('EMAIL_INVALID')
                    : null}
                </Text>
              </View>

              <FontText
                size={normalize(16)}
                pLeft={width * 0.03}
                name={'poppins-medium'}
                style={styles.namecontainer}>
                {t('YOUR_GENDER')}
              </FontText>
              <View
                style={styles.radiobtn}>
                {data.map((item, index) => {
                  return (
                    <TouchableOpacity onPress={() => setgendex(index)}>
                      <View
                        style={styles.radioView}>
                        <View
                          style={[styles.radioStyle, {
                            borderColor:
                              index === gender
                                ? colors.theme
                                : colors.lightViolet,
                          }]}>
                          <View
                            style={[styles.radioStyle1, {
                              backgroundColor:
                                index == gender ? colors.theme : colors.white,
                            }]}></View>
                        </View>

                        <FontText
                          size={normalize(16)}
                          name={'poppins-regular'}
                          color={index === gender ? 'violet' : 'lightViolet'}>
                          {t(item)}
                        </FontText>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>

        <View style={styles.lastbutton}>

          <Button
            height={hp(7)}
            width={wp(20)}
            onPress={() => goBack()}
            style={styles.cancelbtn}>
            <FontText
              size={normalize(16)}
              color={'lightViolet'}
              name={'poppins-semibold'}
              style={{
                marginTop: hp(0.5),
              }}>
              {t('CANCEL')}
            </FontText>
          </Button>




          <Root>
            <Button
              height={hp(7)}
              width={wp(45)}
              onPress={() => SaveChanges()

              }
              style={styles.submitbtn}>
              {loading && <ActivityIndicator size="large" color="yellow" />}
              <Text style={styles.buttonText}>

              </Text>
              <FontText
                size={normalize(16)}
                color={'white'}
                name={'poppins-semibold'}>
                {loading ? "Updating..." : t('SAVE_CHANG')}
              </FontText>
            </Button>
          </Root>
        </View>
      </View>
    </SafeAreaView>
  );
};

// define your styles
const styles = StyleSheet.create({

  safe: { flex: 1, backgroundColor: '#ffffff' },
  lastbutton: {
    marginVertical: hp(1.5),
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: width * 0.9,
    alignSelf: 'center',
    paddingLeft: width * 0.05,
  },
  namecontainer: { marginHorizontal: hp(1.5) },
  input: {
    marginTop: hp(1.5),
    marginBottom: hp(3),
    marginHorizontal: hp(1.5),
  },
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  profile: {
    height: hp(10),
    width: hp(10),
    borderColor: colors.white,
    borderWidth: hp(0.9),
    borderRadius: hp(10),
  },
  profileview: {
    height: hp(15),
    width: hp(15),
    borderRadius: hp(10),
    justifyContent: 'center',
    alignItems: 'center',

    shadowColor: colors.lightViolet,
    shadowOpacity: 0.5,
    shadowOffset: { width: hp(0), height: hp(1.5) },
    shadowRadius: 10,
    elevation: 10,
  },
  image: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  smallcontainer: {
    marginTop: hp(6),
    paddingHorizontal: hp(1.5),
  },
  ErrorView: {
    width: width * 0.88,
    alignSelf: 'center',
    marginTop: -width * 0.04,
    marginBottom: width * 0.02,
    marginLeft: wp(2)
  },
  ErrorText: {
    fontSize: normalize(14),
    color: '#ff0000',
  },
  picView: {
    height: hp(4.5),
    width: hp(4.5),
    backgroundColor: colors.theme,
    borderRadius: hp(2.3),
    padding: wp(2),
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: wp(35),
    top: hp(15),
    zIndex: 1,
    elevation: 11,
  },
  camera: { justifyContent: 'center', alignItems: 'center' },
  nameInput: {
    backgroundColor: colors.viewcolor,
    borderRadius: 10,
    color: colors.lightViolet,
    paddingLeft: wp(3),
  },
  phoneInput: {
    backgroundColor: colors.viewcolor,
    borderRadius: 10,
    color: colors.lightViolet,
    paddingLeft: wp(3),
  },
  emailInput: {
    backgroundColor: colors.viewcolor,
    borderRadius: 10,
    color: colors.lightViolet,
    paddingLeft: wp(3),
  }, radiobtn: {
    flexDirection: 'row',
    marginHorizontal: wp(4),
    justifyContent: 'space-between',
    marginVertical: hp(2),
  }, radioView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioStyle: {
    height: hp(3),
    width: hp(3),
    borderRadius: hp(1.5),
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: hp(1),

  },
  radioStyle1: {
    height: hp(1.5),
    width: hp(1.5),
    borderRadius: hp(0.77),

  }, cancelbtn: {
    flex: null,
    borderRadius: 10,
  },
  submitbtn: {
    flex: null,
    backgroundColor: colors.theme,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: hp(2),
  },
});

//make this component available to the app
export default PersonalInformation;
