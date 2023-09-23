import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  Platform,
} from 'react-native';


import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Cancelled from './Cancelled';
import Past from './Past';
import Upcoming from './Upcoming';
import { hp, wp, normalize, isIOS, isX } from '../../styles/responsiveScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';
import colors from '../../assets/color';
import EmptyDefault from '../../Components/EmptyDefault';
import SvgIcons from '../../assets/SvgIcons';
import BigButton from '../../Components/BigButton';

const { width, height } = Dimensions.get('screen');

const NoAppointment = props => {
  const { t } = useTranslation();
  //const {data} =props.route.params;
  const {width, height} = Dimensions.get('screen');
  const Tab = createMaterialTopTabNavigator();

  // export const routeName = 'Appointment';
  return (
    <SafeAreaView style={{ flex: 1 }}>

<View style={{flex: 1}}>
        <Tab.Navigator
          screenOptions={{
            tabBarInactiveTintColor: colors.gray,
            tabBarActiveTintColor: colors.theme,

            tabBarLabelStyle: {
              fontSize: normalize(15),
              fontFamily: 'poppins-medium',
              textTransform: 'capitalize',
            },
            tabBarIndicatorStyle: {
              borderBottomWidth: 3,
              borderBottomColor: colors.theme,
            },
            tabBarStyle: {
              borderBottomWidth: 1,
              borderBottomColor: colors.lightViolet,
            },
          }}>
          <Tab.Screen name={t('UPCOMING')} component={Upcoming} />
          {/* <Tab.Screen name={t('PAST')} component={Past} /> */}
          {/* <Tab.Screen name={t('CANCELED')} component={Cancelled} /> */}
        </Tab.Navigator>
      </View>
      {/* <EmptyDefault icon={<SvgIcons.AppointmentDefault />} onPress={() => props.navigation.navigate('Appoinment_TopTab')} Title={t('APPO_TAG')} Subtitle={t(
        'HAIRCUTS',
      )} />
      <View style={{ justifyContent: 'flex-end' }}>
        <BigButton title={t('Go Home')} onClick={() => props.navigation.navigate('Home')} style={{ marginBottom: hp(5) }} />
      </View> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default NoAppointment;
