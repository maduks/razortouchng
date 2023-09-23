import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ImageBackground,
} from 'react-native';
import colors from '../../assets/color';
import SvgIcons from '../../assets/SvgIcons';
import FontText from '../../Components/common/FontText';
import Logo from '../../Components/common/logo';
import {hp, isX, normalize, wp} from '../../styles/responsiveScreen';
import Button from '../../Components/common/Button/index';
import fonts from '../../assets/fonts';
import {useFocusEffect, useNavigation} from '@react-navigation/core';
import LinearGradient from 'react-native-linear-gradient';
import BackHeader from '../../Components/BackHeader';
import { useTranslation } from 'react-i18next';

const {width, height} = Dimensions.get('screen');

// For Modal
const ModalData = [
  {
    text: 'PHOTO',
    icon: <SvgIcons.CheckMark />,
  },
  {
    text: 'BUILD',
    icon: <SvgIcons.CheckMark />,
  },
  {
    text: 'BLOG',
    icon: <SvgIcons.CheckMark />,
  },
];

const SkipUser = props => {
  console.log(props);
  const {t} =useTranslation(); 

  const Nav = useNavigation();

  const [EmailText, setEmailText] = useState('');
  const [SaveBtn, setSaveBtn] = useState(false);
  const [visible, setVisible] = useState(true);

  useFocusEffect(
    React.useCallback(() => {
      setVisible(true);
      setEmailText('');
      setSaveBtn(false);
    }, []),
  );

  function validEmail(Email) {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return reg.test(Email);
  }

  const Email_Error =
    SaveBtn && (EmailText.length == 0 || !validEmail(EmailText));

  const SubmitBtn = () => {
    setSaveBtn(true);

    if (EmailText.length != 0 && validEmail(EmailText)) {
      Nav.navigate('SignUp');
      setVisible(false);
    }
  };

  const navigation = () => {
    props.navigation.navigate('SignUp');
    setTimeout(() => {
      setVisible(false);
    }, 150);
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.white}}>
      {props.route.params.Appoinment ? (
        <Text
          style={styles.apopText}>
          {t('APPOI')}
        </Text>
      ) : (
        <LinearGradient
          colors={[colors.darkorange, colors.darkred]}
          style={styles.linearGradient}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}>
          <View style={styles.cont}>
            <ImageBackground
              style={{height: hp(29), width: wp(100)}}
              resizeMode="contain"
              source={require('../../assets/images/pattern.png')}>
              {/* <Header name="Profile" /> */}
              <BackHeader
                title={t("PROFILE")}
                titleColor="white"
                BackIcon="arrow"
                BackonPress={() => navigation.goBack()}
              />
              <View style={styles.viewimage}>
                <View>
                  <Image
                    style={styles.profile}
                    source={require('../../assets/images/avatar.png')}
                  />
                </View>
                <View style={styles.viewdisplay}>
                  <FontText
                    size={normalize(22)}
                    color={'white'}
                    name={'poppins-semibold'}>
                    {'Jonathan Dave'}
                  </FontText>

                  <FontText
                    size={normalize(14)}
                    color={'white'}
                    name={'poppins-regular'}>
                    jonath@gmail.com
                  </FontText>
                </View>
              </View>
            </ImageBackground>
          </View>
        </LinearGradient>
      )}

      <Modal
        visible={visible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => {
          Nav.navigate('Home');
          setVisible(false);
        }}>
        <View
          style={styles.subView}>
          <View
            style={styles.model}>
            {/* Content Goes Here */}
            <View
              style={{height: width * 0.015, backgroundColor: colors.theme}}
            />
            <TouchableOpacity
              style={styles.crossView}
              onPress={() => {
                Nav.navigate('Home');
                setVisible(false);
              }}>
              <Image
                source={require('../../assets/images/Cross.png')}
                resizeMode="contain"
                style={{
                  width: width * 0.07,
                  height: width * 0.07,
                }}
              />
            </TouchableOpacity>

            <ScrollView showsVerticalScrollIndicator={false}>
              <KeyboardAvoidingView
                behavior={Platform.OS == 'ios' && 'position'}>
                <View
                  style={styles.logo}>
                  <Logo></Logo>

                  <View
                    style={styles.welcome}>
                    <FontText
                      name={'poppins-medium'}
                      size={normalize(24)}
                      color={'Violet'}>
                      {'WELCOME'}
                    </FontText>

                    {/* Combers Logo */}
                    <SvgIcons.Combers style={{marginTop: width * 0.025}} />
                  </View>
                </View>

                <View
                  style={styles.logoTag}>
                  <FontText name={'poppins-semibold'} size={normalize(20)}>
                    {t("LOGIN_TAG")}
                  </FontText>

                  <FlatList
                    data={ModalData}
                    style={{marginTop: width * 0.03}}
                    keyExtractor={(value, index) => index.toString()}
                    scrollEnabled={false}
                    renderItem={({item}) => (
                      <View
                        style={styles.icon}>
                        {item.icon}

                        <FontText
                          style={styles.iconText}
                          name={'poppins-medium'}
                          size={normalize(14)}>
                          {item.text}
                        </FontText>
                      </View>
                    )}
                  />
                </View>

                <View
                  style={styles.email}>
                  <FontText name={'poppins-medium'} size={normalize(18)}>
                    {t("YOUR_EMAIL")}
                  </FontText>

                  <TextInput
                    placeholder={'Ex: jonathan@gmail.com'}
                    style={styles.emailInput}
                    value={EmailText}
                    onChangeText={val => setEmailText(val.trim())}
                  />

                  {Email_Error && (
                    <View
                      style={styles.emailError}>
                      <Text style={{fontSize: normalize(14), color: '#ff0000'}}>
                        {EmailText.length == 0
                          ? t('ENTER_EMAIL')
                          : t('YOUR_EMAIL')}
                      </Text>
                    </View>
                  )}

                  <Button
                    onPress={() => SubmitBtn()}
                    height={isX ? hp(6.5) : hp(8)}
                    width={wp(90)}
                    style={styles.btn}>
                    <FontText
                      name={'poppins-semibold'}
                      size={normalize(16)}
                      textAlign={'center'}
                      color={'white'}>
                      {t('CONTINUE')}
                    </FontText>
                  </Button>

                  <View style={styles.sign}>
                    <FontText
                      size={normalize(15)}
                      name={'poppins-medium'}
                      textAlign={'center'}>
                      {t("NOT_ACCOUNT")}
                    </FontText>
                    <TouchableOpacity onPress={() => navigation()}>
                      <FontText
                        name={'poppins-semibold'}
                        size={normalize(15)}
                        color={'red'}
                        pLeft={5}>
                        {t("SIGN_UP")}
                      </FontText>
                    </TouchableOpacity>
                  </View>

                  <View
                    style={{
                      marginBottom: width * 0.05,
                    }}>
                    <FontText
                      name={'poppins-medium'}
                      size={normalize(14)}
                      color={'Violet'}
                      textAlign={'center'}>
                      {t("SOCIAL")}
                    </FontText>

                    <View style={styles.social}>
                      <TouchableOpacity>
                        <Image
                          source={require('../../assets/images/Google.png')}
                          style={styles.socialimg}
                        />
                      </TouchableOpacity>

                      <TouchableOpacity>
                        <Image
                          source={require('../../assets/images/twitter.png')}
                          style={styles.socialimg}
                        />
                      </TouchableOpacity>

                      <TouchableOpacity>
                        <Image
                          source={require('../../assets/images/facebook.png')}
                          style={styles.socialimg}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </KeyboardAvoidingView>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default SkipUser;

const styles = StyleSheet.create({
  social: {
    flexDirection: 'row',
    marginTop: hp(1),
    justifyContent: 'center',
    alignItems: 'center',
  },
  apopText:{
    fontSize: normalize(20),
    fontWeight: 'bold',
    fontFamily: 'Poppins-medium',
    textAlign: 'center',
    paddingVertical: width * 0.05,
  },
  subView:{
    backgroundColor: colors.gray70,
    flex: 1,
  },
  socialimg: {
    height: wp(13),
    width: wp(13),
    margin: 10,
    borderRadius: 50,
  },
  model:{
    backgroundColor: colors.white,
    height: height >= 768 ? height * 0.83 : height * 0.76,
    width: width,
    position: 'absolute',
    bottom: 0,
  },
  sign: {
    flexDirection: 'row',
    alignSelf: 'center',
    fontFamily: fonts['poppins-Regular'],
    marginTop: width * 0.03,
    marginBottom: width * 0.02,
  },
  logo:{
    flexDirection: 'row',
    alignItems: 'center',
    width: width * 0.9,
    alignSelf: 'center',
    marginVertical: width * 0.03,
  },
  linearGradient: {
    height: hp(29),
    width: wp(100),
  },
  profile: {
    height: hp(12),
    width: hp(12),
  },
  viewimage: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: hp(1),
    paddingHorizontal: wp(4),
  },
  crossView:{
    width: width * 0.09,
    alignSelf: 'flex-end',
    marginRight: width * 0.03,
    alignItems: 'center',
    justifyContent: 'center',
  },

  viewdisplay: {
    paddingVertical: hp(1),
    paddingHorizontal: wp(3),
  },
  arrow: {
    height: hp(4),
    width: hp(5),
    marginTop: hp(6),
  },
  name: {
    fontSize: normalize(22),
    color: colors.white,
  },
  logoTag:{
    width: width * 0.9,
    alignSelf: 'center',
    marginTop: width * 0.02,
  },
  welcome:{
    marginLeft: width * 0.05,
    justifyContent: 'space-between',
  },
  icon:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: width * 0.02,
    alignItems: 'flex-start',
    paddingHorizontal: width * 0.02,
  },
  iconText:{
    width: width * 0.78,
    color: colors.lightViolet,
  },
  email:{
    width: width * 0.9,
    alignSelf: 'center',
    marginTop: width * 0.05,
    flex: 1,
  },
  emailInput:{
    width: width * 0.88,
    alignSelf: 'center',
    marginTop: width * 0.03,
    height: width * 0.13,
    paddingHorizontal: width * 0.03,
    fontSize: normalize(14),
    backgroundColor: '#00000009',
    borderRadius: width * 0.035,
  },
  emailError:{
    backgroundColor: colors.white,
    marginTop: width * 0.017,
    marginBottom: -width * 0.01,
    width: width * 0.82,
    alignSelf: 'center',
  },
  btn:{
    flex: null,
    backgroundColor: colors.theme,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: width * 0.04,
    width: width * 0.88,
  },
});
