import React, { Component, useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Image,
  FlatList,
  ImageBackground,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { hp, wp, normalize, isIOS, isX } from '../../styles/responsiveScreen';
import colors from '../../assets/color';
import SvgIcons from '../../assets/SvgIcons';
import Constants from '../../Utils/data';
import SettingItem from './SettingItem';
import FontText from '../../Components/common/FontText/index';
import Header from './Header';
import LinearGradient from 'react-native-linear-gradient';
import BackHeader from '../../Components/BackHeader';
import Personalinformation, {
  routeName as PersonalinformationRouteName,
} from '../PersonalInformation/index';

// import SucessFullCard, {
//   routeName as SucessFullCardRouteName,
// } from '../SucessFullCard/index';

import Terms, { routeName as TermsRoute } from '../Terms';

import Favorites, { routeName as FavoritesRouteName } from '../Favorites/index';
import ReferEarn, { routeName as ReferEarnRouteName } from '../ReferEarn/index';
import ManageSettings, {
  routeName as ManageSettingsRouteName,
} from '../ManageSettings';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';

export const routeName = 'Setting';
//import liraries

//make this component available to the ap

const Settings = (props) => {
  const [SkipModal, setSkipModal] = useState(false);
  const { t } = useTranslation();
  const { navigation } = props;
  const [fullname, setfullname] = useState('');
  const [Phonenumber, setPhoneNumber] = useState('');
  const [email, setemail] = useState('');
  useEffect(async () => {
    try {
      await AsyncStorage.getItem('userData').then(
        (value) => {
          // AsyncStorage returns a promise

          const user = JSON.parse(value);
          setfullname(user.name);
          setPhoneNumber(user.phone);
          setemail(user.email)
          if (user.gender == "Male") {
            setgendex(0);
          }
          else if (user.gender == "Female") {
            setgendex(1);
          }
        });
    } catch (error) {
      console.log('Errror from  AsyncStorage.......', error);
    }
  }, []);

  const itemSeparator = () => (
    <View
      style={{
        backgroundColor: 'black',
        opacity: 0.5,
        height: 0.5,
      }}
    />
  );
  // navigation.setOptions({tabBarVisible: false});
  const renderItem = ({ item, index }) => {
    let icon;
    switch (index) {
      case 0:
        icon = <SvgIcons.flatlist1 height={hp(2.5)} width={hp(3.2)} />;
        break;
      case 1:
        icon = <SvgIcons.flatlist2 height={hp(2.5)} width={hp(3)} />;
        break;
      case 2:
        icon = <SvgIcons.flatlist3 height={hp(3.2)} width={hp(3.2)} />;
        break;
      case 3:
        icon = <SvgIcons.flatlist4 height={hp(2.7)} width={hp(3.2)} />;
        break;
      case 4:
        icon = <SvgIcons.flatlist5 height={hp(2.7)} width={hp(3.2)} />;
        break;
      case 5:
        icon = <SvgIcons.flatlist6 height={hp(2.7)} width={hp(3.2)} />;
        break;

      default:
        break;
    }
    return <SettingItem item={item} icon={icon} onevent={onevent} />;
  };

  const onevent = namess => {

    if (namess == 'PERSONAL_INFO') {
      navigation.navigate(PersonalinformationRouteName);
    } else if (namess == 'PAYMENT_METHOD') {
      navigation.navigate(PaymentsMethodsRouteName);
    } else if (namess == 'TRANSC_LIST') {
      navigation.navigate(TransactionListsRouteName);
    } else if (namess == 'FAV_SALON') {
      navigation.navigate(FavoritesRouteName);
    } else if (namess == 'SETTING') {
      navigation.navigate(ManageSettingsRouteName);
    } else if (namess == 'REFER') {
      navigation.navigate(ReferEarnRouteName);
    } else if (namess == 'Manage Account') {
      navigation.navigate(ManageSettingsRouteName);
    } else if (namess == 'TERMS') {
      navigation.navigate(TermsRoute);
    } else {

    }

  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="default" />

      <LinearGradient
        colors={[colors.darkred, colors.darkred]}
        style={styles.linearGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}>
        <View>
          <ImageBackground
            style={{ height: hp(29), width: wp(100) }}
            resizeMode="contain"
            source={require('../../assets/images/pattern.png')}>
            <BackHeader
              title={t('PROFILE')}
              titleColor="white"
              BackIcon="arrow"
              BackonPress={() => navigation.goBack()}
            />
            <View style={styles.viewimage}>
              <View>
                <Image
                  style={styles.profile}
                  source={{ uri: 'https://ui-avatars.com/api/?name=' + fullname + "&background=fff" }}
                />
              </View>
              <View style={styles.viewdisplay}>
                <FontText
                  size={normalize(22)}
                  color={'white'}
                  name={'poppins-semibold'}>
                  {fullname}
                </FontText>

                <FontText
                  size={normalize(14)}
                  color={'white'}
                  name={'poppins-regular'}>
                  {email}
                </FontText>
              </View>
            </View>
          </ImageBackground>
        </View>
      </LinearGradient>


      <FlatList
        showsVerticalScrollIndicator={false}
        data={Constants.settingData1}
        bounces={false}
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={itemSeparator}
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  linearGradient: {
    height: hp(29),
    width: wp(100),
  },
  profile: {
    height: hp(10),
    width: hp(10),
    borderRadius: 50
  },
  viewimage: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: hp(1),
    paddingHorizontal: wp(4),
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
});

export default Settings;
