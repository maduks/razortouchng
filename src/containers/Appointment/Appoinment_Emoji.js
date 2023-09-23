import React, { useState, useRef } from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  I18nManager,
  ActivityIndicator,
  Keyboard
} from 'react-native';
import BottomSheet from '../../Components/bottomSheet';
import FontText from '../../Components/common/FontText';
import SvgIcons from '../../assets/SvgIcons';
import { hp, isAndroid, normalize, wp, isIOS } from '../../styles/responsiveScreen';
import { useTranslation } from 'react-i18next';
import colors from '../../assets/color';
import BigButton from '../../Components/BigButton/index'
import SmartScrollView from '../../Components/SmartScrollView';
import { Buttons, Emojis, Stars } from '../../Utils/data';
import AsyncStorage from '@react-native-async-storage/async-storage';
import globals from '../../assets/globals';
import axios from 'axios';
const { width, height } = Dimensions.get('screen');

const Appoinment_Emoji = (props, item) => {
  const { t } = useTranslation();
  const [ActiveEmoji, setActiveEmoji] = useState(4);
  const [servicereview, setServiceReview] = useState('');
  const [review, setReview] = useState('');
  const [loading, setLoading] = useState(false);
  const [Focus, setFocus] = useState(true);
  const [activeButton, setActiveButton] = useState(8);

  const modalizeRef = useRef();

  const setBorder = (value, index) => {
    setServiceReview(value)
    setActiveButton(index)

  }
  const onOpen = () => {
    if (servicereview.length < 1) {
      alert('kindly select a review text');
      setLoading(false)
    }
    else if (review.length < 1) {
      alert('kindly write a review note');
      setLoading(false)
    }

    else {
      setLoading(true)
      const url = globals.base_url + "makereview";
      const configurationObject = {
        url: url,
        method: "POST",
        data: { booking_id: props.salBID, professional: props.salN, service: props.salS, rating: servicereview, review: review, dates: props.salDates },
      };

      axios(configurationObject)
        .then(function (response) {
          setLoading(false)
          modalizeRef.current?.open();
        })
        .catch(function (error) {
          // handle error
          setLoading(false)
          alert(JSON.stringify(error))

        })
        .finally(function () {
          // always executed

        });
    }


  };
  const onClose = () => {
    modalizeRef.current.close();
    props.closeModal();
    //props.navigation.navigate('homeRouteName')

  };
  return (
    <SafeAreaView
      style={{ flex: 1, height: height, backgroundColor: colors.white }}>
      <SmartScrollView
        alwaysBounceVertical={false}
        showsVerticalScrollIndicator={false}
        applyKeyboardCheck={isIOS}
        contentContainerStyle={{ paddingVertical: hp(0) }}
        style={{ flex: 1 }}>
        <View style={styles.border} />
        <View style={styles.subBorder} />

        {/* Emoji */}
        <View>
          {/* Cross Image */}
          <TouchableOpacity
            style={styles.CrossView}
            onPress={props.closeModal}>
            <Image

              source={require('../../assets/images/Cross.png')}
              resizeMode="contain"
              style={styles.crossIcon}
            />
          </TouchableOpacity>
          {/* Emojis */}
          <View style={styles.EmojisBackView}>
            {Emojis.map((item, index) => (
              <TouchableOpacity
                onPress={() => setActiveEmoji(index)}
                activeOpacity={0.5}
                style={[
                  styles.EmojisMainView,
                  {
                    borderWidth: ActiveEmoji == index ? 1 : 0,
                    borderColor: ActiveEmoji == index ? colors.theme : null,
                  },
                ]}>
                <Image
                  source={ActiveEmoji == index ? item.Image : item.GreyImage}
                  resizeMode="cover"
                  style={styles.imageView}
                />
              </TouchableOpacity>
            ))}
          </View>
          <View
            style={styles.bad}>
            <FontText name="poppins-medium" size={normalize(20)}>
              {t('Leave us a review')}
            </FontText>
            <FontText
              name="poppins-regular"
              pTop={height * 0.01}
              pureColor={colors.lightViolet}
              size={normalize(14)}>
              {t('How was our service?')}
            </FontText>
          </View>
          <View
            style={styles.btnView}>
            {Buttons.map((value, index) => (
              <TouchableOpacity
                onPress={() => setBorder(value.text, index)}
                style={[styles.btnSubView,
                {
                  borderWidth: activeButton == index ? 1 : 0,
                  borderColor: activeButton == index ? colors.black : null,
                },
                ]}>

                <Text style={{ color: colors.gray80 }}>{t(value.text)}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View
          style={styles.nameView}>
          <View
            style={styles.profile}>
            <Image
              source={{ uri: "https://ui-avatars.com/api/?name=" + props.salN + "&size=120&bold=true&background=eee&color=000" }}

              //source={require('../../assets/images/RatingEmoji.png')}
              resizeMode="contain"
              style={styles.rating}
            />

            <View style={styles.nameText}>
              <Text style={styles.nametxt}>{props.salN}</Text>
              <View
                style={styles.ratingView}>
                <Text
                  style={styles.ratingText}>
                  {props.rattxt}
                </Text>
                <View style={styles.starView}>
                  <FontText
                    name="poppins-regular"
                    pTop={height * 0.01}
                    pureColor={colors.lightViolet}
                    size={normalize(14)}>
                    {props.salS}
                  </FontText>

                </View>
              </View>
            </View>
          </View>
          <View style={styles.ti}>
            <TextInput
              style={styles.textInput}
              placeholder={t('NOTE')}
              multiline={true}
              blurOnSubmit={true}
              onSubmitEditing={() => { Keyboard.dismiss() }}
              returnKeyType={'done'}
              onChangeText={(rv) => setReview(rv)}

            />
          </View>
        </View>
        <View style={{ flexDirection: 'column', justifyContent: 'flex-end', marginVertical: hp(3) }}>


          <TouchableOpacity disabled={loading} onPress={onOpen}>
            <View
              style={{
                ...styles.button,
                backgroundColor: loading ? colors.theme : colors.theme,
              }}
            >
              {loading && <ActivityIndicator size="large" color="yellow" />}
              <Text style={styles.buttonText}>
                {loading ? "Submitting..." : "Submit"}
              </Text>
            </View>
          </TouchableOpacity>
          {/* <BigButton title ={t('SUBMIT')} onClick ={onOpen} /> */}
        </View>
      </SmartScrollView>
      <BottomSheet
        refname={modalizeRef}
        icon={
          <SvgIcons.ThankYou
            height={hp(12)}
            width={hp(12)}
          />
        }
        title={t('FEEDBACK')}
        subTitlec={
          t('Thank you for you candid review, we promise to always serve you better.')
        }

        RightItemIcon={<SvgIcons.Cross height={hp(5)} width={hp(5)} />}
        oncancelpress={onClose}></BottomSheet>
    </SafeAreaView>
  );
};

export default Appoinment_Emoji;

const styles = StyleSheet.create({
  EmojisBackView: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: hp(1),
    width: wp(90),
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  EmojisMainView: {
    width: wp(15),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    height: wp(15),
  },
  border: { backgroundColor: '#15093E99', height: hp(4) },
  subBorder: { backgroundColor: colors.theme, height: hp(0.5) },
  CrossView: {
    width: wp(10),
    alignSelf: 'flex-end',
    alignItems: 'center',
    justifyContent: 'center',
  },
  crossIcon: {
    width: wp(8),
    height: wp(8),
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
  imageView: {
    width: wp(12),
    height: wp(12),
  },
  bad: {
    alignSelf: 'center',
    width: wp(50),
    alignItems: 'center',
    marginTop: wp(3.5),
  },
  btnView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    width: width,
    marginVertical: hp(1),
  },
  btnSubView: {
    borderWidth: 1,
    borderColor: colors.gray50,
    alignItems: 'center',
    justifyContent: 'center',
    width: wp(44),
    height: wp(12),
    marginVertical: hp(0.7),
    borderRadius: 10,
  },
  nameView: {
    flex: 1,
    alignItems: 'center',
    marginTop: hp(1.5),
  },
  profile: {
    flexDirection: 'row',
    alignSelf: 'center',
    width: wp(90),
    alignItems: 'center',
    justifyContent: 'space-between',
  }, rating: {
    width: wp(18),
    height: wp(18),
  },
  nameText: {
    flex: 1,
    paddingLeft: 10,
  },
  nametxt: {
    fontSize: normalize(16),
    fontFamily: 'poppins-regular',
    fontWeight: '600',
    textAlign: 'left',
  },
  ratingView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  ratingText: {
    fontSize: normalize(16),
    fontFamily: 'poppins-medium',
  },
  starView: { marginLeft: 3, flexDirection: 'row' },
  starImage: {
    width: wp(4),
    height: wp(4),
    marginHorizontal: wp(1),
  },
  ti: {
    width: wp(90),
    height: height > 767 ? hp(25) : hp(20),
    borderWidth: 0.5,
    borderColor: colors.gray80,
    marginTop: hp(1.5),
    borderRadius: 10,
    alignSelf: 'center',
    flex: 1,
  },
  textInput: {
    marginLeft: wp(5),
    fontSize: normalize(16),
    fontWeight: '400',
    fontFamily: 'poppins-regular',
    paddingTop: hp(2),
    textAlign: I18nManager.isRTL ? 'right' : 'left',
  },
  keyboard: {
    width: wp(90),
    height: hp(20),
    borderWidth: 0.5,
    borderColor: colors.gray80,
    marginTop: hp(1.5),
    borderRadius: 10,
    alignSelf: 'center',
  }, input: {
    marginHorizontal: wp(2),
    marginTop: Platform.OS == 'ios' ? 10 : 0,
  }
});

