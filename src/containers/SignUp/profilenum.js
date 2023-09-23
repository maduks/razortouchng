import React, { useRef, useState, useEffect } from 'react';
import { ProgressBar } from 'react-native-paper';
import FontText from '../../Components/common/FontText';
import colors from '../../assets/color';
import BackHeader from '../../Components/BackHeader';
import SvgIcons from '../../assets/SvgIcons';
import Button from '../../Components/common/Button';
import SmartScrollView from '../../Components/common/SmartScrollView';
import TitleSubTitle from '../../Components/TitleSubTitle';
import PhoneInput from 'react-native-phone-number-input';
import globals from '../../assets/globals';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {
  View,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  I18nManager, Text
} from 'react-native';
import { hp, wp, normalize, isIOS, isX } from '../../styles/responsiveScreen';
import { useTranslation } from 'react-i18next';
import BigButton from '../../Components/BigButton';

export const routeName = 'Profilenum';
const { width, height } = Dimensions.get('screen');

const Profilenum = ({ navigation }) => {
  const { t } = useTranslation();
  // const phoneInput = useRef(null);
  const [valid, setValid] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const phoneInput = useRef(null);
  const [formattedValue, setFormattedValue] = useState("");
  const [value, setValue] = useState("");

  let userId = "";
  AsyncStorage.getItem('userData')
    .then((value) => {
      const user = JSON.parse(value);
      userId = user.id;
      // alert(`${user.name} ${user.email} ${user.password}`);
    })
    .catch((error) => {
      console.log(error);
    });

  const updatePhone = () => {
    //alert(value)
    if (phoneInput.current?.isValidNumber(value) && value.length >= 10) {
      const url = globals.base_url + "users/" + userId;
      const configurationObject = {
        url: url,
        method: "PUT",
        data: { phone: value },
      };
      axios(configurationObject)
        .then(function (response) {
          AsyncStorage.setItem('UserPhoneData', value);
          navigation.navigate('Login');

        })
        .catch(function (error) {
          // handle error
          alert(error);
        })
        .finally(function () {
          // always executed

        });
    }
    else {
      alert('Invalid phone number')
    }
    const checkValid = phoneInput.current?.isValidNumber(value);
    setShowMessage(true);
    setValid(checkValid ? checkValid : false);

    // alert(url)

  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
      <SmartScrollView
        alwaysBounceVertical={false}
        showsVerticalScrollIndicator={false}
        applyKeyboardCheck={isIOS}
        style={styles.container}>
        <BackHeader
          BackonPress={() => navigation.navigate('Profilegender')}
          // RightItemLabel={t('SKIP')}
          onPress={() => navigation.navigate('Tab')}
        />
        <ProgressBar
          progress={0.8}
          color={colors.theme}
          style={styles.progress}
        />
        {showMessage && (
          <View style={styles.message}>

          </View>
        )}
        <View style={{ marginVertical: 10 }}>
          <TitleSubTitle
            Title={t('YOUR_PHONE_NO')}
            SubTitle={t(
              'PHONE_NO_TAG',
            )}
            textalign={'left'}
            pTop={hp(1)}
          />
        </View>
        <View style={styles.viewf}>
          <SvgIcons.Phone height={hp(3)} width={width * 0.1} />
          <SvgIcons.Line4
            height={hp(4)}
            width={width * 0.05}
            style={styles.line}
          />
          <PhoneInput
            ref={phoneInput}
            defaultCode="NG"
            returnKeyType={'done'}
            autoFocus={true}
            onChangeText={(text) => {
              setValue(text);
            }}
            layout="second"
            textInputStyle={{
              fontWeight: 'bold',
              textAlign: I18nManager.isRTL ? 'right' : 'left',
            }}
            containerStyle={{
              height: width * 0.18,
              width: width * 0.7,
              backgroundColor: colors.viewcolor,
            }}
            textInputProps={{
              maxLength: 10,
            }}
          />
        </View>

      </SmartScrollView>
      <BigButton title={t('SUBMIT')} onClick={() => updatePhone()} style={{ justifyContent: 'flex-end', marginBottom: hp(2) }} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: wp(5),
  },
  progress: {
    marginHorizontal: wp(3),
    height: hp(1),
    borderRadius: 14,
  },
  line: {
    alignSelf: 'center',
    justifyContent: 'center',
  },
  viewf: {
    flexDirection: 'row',
    fontSize: normalize(16),
    width: width * 0.9,
    alignItems: 'center',
    backgroundColor: colors.viewcolor,
    borderRadius: 20,
    paddingLeft: 7,
  },
});
export default Profilenum;
