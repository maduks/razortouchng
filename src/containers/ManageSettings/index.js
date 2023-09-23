//import liraries
import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { hp, wp, normalize } from '../../styles/responsiveScreen';
import ManageItem from './ManageItem';
import SvgIcons from '../../assets/SvgIcons';
import BackHeader from '../../Components/BackHeader';
import Button from '../../Components/common/Button';
import colors from '../../assets/color';
import FontText from '../../Components/common/FontText';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { routeName as ChangeLanguageRouteName } from '../ChangeLanguage';
import { useTranslation } from 'react-i18next';
import { settingData } from '../../Utils/data';
import TitleSubTitle from '../../Components/TitleSubTitle';
import axios from 'axios';
import globals from '../../assets/globals';
const { width, height } = Dimensions.get('screen');

// create a component
export const routeName = 'ManageSettings';


const ManageSettings = ({ navigation }) => {
  const { t } = useTranslation();
  const Delete = async () => {
    try {
      AsyncStorage.getItem('userData').then(
        (value) => {
          if (value != null) {
            const user = JSON.parse(value);
            //alert(user.id)

            const url = globals.base_url + "account/delete/" + user.id;

            axios
              .post(url, {
                headers: {
                  "Content-type": "application/json",
                  "Accept": "application/json"
                },
                timeout: 50000
              })
              .then(function (response) {
                // alert(JSON.stringify(response.data))
                alert('Your account and user data has been deleted.')
                navigation.navigate('Auth');
              })
              .catch(function (error) {
                // handle error
                alert("" + error);
                setLoading(false)
              })
              .finally(function () {
                // always executed
                // alert('Finally called');
              });
          }
          else {
            //alert('hjk')
          }
        });


    } catch (error) {
      console.log(error);
    }
  }
  const LogOut = async () => {
    try {
      await AsyncStorage.clear();
      navigation.navigate('Auth');
    } catch (error) {
      console.log(error);
    }
  };

  const onItemPress = (item, index) => {
    switch (index) {
      case 0:
        console.log('Item...', item.name);
        break;
      case 1:
        navigation.navigate(ChangeLanguageRouteName);
        break;
      case 2:
        console.log('Item...', item.name);
        break;
      case 3:
        console.log('Item...', item.name);
        break;
      case 4:
        console.log('Item...', item.name);
        break;
      case 5:
        console.log('Item...', item.name);
        break;
      default:
        break;
    }
  };

  const renderItem = ({ item, index }) => {
    let icon;
    switch (index) {
      case 0:
        icon = <SvgIcons.Notify height={hp(2.8)} width={hp(3.2)} />;
        break;
      case 1:
        icon = <SvgIcons.Fill height={hp(2.7)} width={hp(2.7)} />;
        break;
      case 2:
        icon = <SvgIcons.Key height={hp(2.8)} width={hp(2.9)} />;
        break;
      case 3:
        icon = <SvgIcons.Terms height={hp(2.7)} width={hp(3.5)} />;
        break;
      case 4:
        icon = <SvgIcons.ShieldDone height={hp(3)} width={hp(3.2)} />;
        break;
      case 5:
        icon = <SvgIcons.InfoCircle height={hp(3.3)} width={hp(3.3)} />;
        break;
      default:
        break;
    }
    return (
      // <ManageItem
      //   index={index}
      //   item={item}
      //   icon={icon}
      //   onItemPress={() => onItemPress(item, index)}
      // />
      <Text></Text>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <BackHeader
        style={{ paddingTop: 5, marginLeft: width * 0.02 }}
        title={t("SETTING")}
        titleColor="violet"
        BackonPress={() => navigation.goBack()}
      />
      {/* <FlatList
        data={settingData}
        bounces={false}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id}
      /> */}
      <View style={{ padding: 20, marginTop: 20, borderColor: 'grey', borderRadius: 10, borderWidth: 1, marginBottom: 20, marginHorizontal: wp(4), opacity: 0.9 }}>

        <Text style={{ fontWeight: 'bold', fontFamily: 'poppins', fontSize: 19, textAlign: 'center' }}>Account Logout</Text>
        <Text style={{ padding: 10, fontFamily: 'poppins', textAlign: 'center' }}>

          You are about to logout from this account,kindly click on the logout button below to proceed.
          Press the back button by the top left if this action was a mistake.

        </Text>

      </View>

      <View style={styles.log}>
        <Button
          height={hp(8)}
          width={hp(20)}
          onPress={() => LogOut()}
          style={styles.logout}>
          <FontText
            size={normalize(12)}
            color={'white'}
            name={'poppins-regular'}>
            {t("LOGOUT")}
          </FontText>
          <SvgIcons.Logout
            height={hp(2)}
            width={hp(2)}
            style={{ marginLeft: wp(5) }}
          />
        </Button>
      </View>
      <View style={{ width: '100%', height: 1, borderBottomColor: colors.gray, borderBottomWidth: 1 }}></View>
      <View style={{ padding: 20, marginTop: 30, marginBottom: 20, borderColor: 'grey', borderRadius: 10, borderWidth: 1, marginHorizontal: wp(4), opacity: 0.9 }}>

        <Text style={{ fontWeight: 'bold', fontFamily: 'poppins', fontSize: 19, textAlign: 'center' }}>Account Deletion</Text>
        <Text style={{ padding: 10, fontFamily: 'poppins', textAlign: 'center' }}>

          You are about to DELETE this account,kindly click on the DELETE button below to proceed.
          <Text style={{ fontWeight: 'bold' }}>NB: </Text>You cannot retrieve this account after deleting! Press the back button by the top left if this action was a mistake.

        </Text>
      </View>
      <View style={styles.log}>
        <Button
          height={hp(8)}
          width={hp(20)}
          onPress={() => Delete()}
          style={styles.logout}>
          <FontText
            size={normalize(12)}
            color={'white'}
            name={'poppins-regular'}>
            {t("DELETE ACCOUNT")}
          </FontText>

        </Button>
      </View>
      <View style={styles.combers}>
        <Image
          style={{ width: 180, height: 30 }}
          source={require('../../assets/images/razortext_2.png')}
        />
        <FontText
          size={normalize(12)}
          color={'lightViolet'}
          name={'poppins-medium'} pLeft={wp(2)}
          style={styles.appVersion}>
          App Version 2.0.1
        </FontText>
      </View>
    </SafeAreaView>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ffffff' },
  logout: {
    width: '35%',
    flex: null,
    height: 50,
    backgroundColor: colors.red,
    borderRadius: 10,
  },
  combers: { flexDirection: 'row', marginTop: hp(5), flex: 1, justifyContent: 'center' },
  log: { justifyContent: 'center', flexDirection: 'row', flex: 1, marginBottom: 10 },
  appVersion: { marginHorizontal: wp(4), opacity: 0.5 },
});

//make this component available to the app
export default ManageSettings;
