import React, {useEffect, useRef, useState} from 'react';
import {
  FlatList,
  StyleSheet,
  View,
  Dimensions,
  Platform,
} from 'react-native';
import {useIsFocused} from '@react-navigation/core';
import {useTranslation} from 'react-i18next';
import colors from '../../assets/color';
import CustomeCard from '../../Components/Card';
import { upComingData } from '../../Utils/data';

const {width, height} = Dimensions.get('screen');
const Cancelled = props => {
  const {t} = useTranslation();
  const FlatListRef = useRef();

  return (
    <View style={{flex: 1, backgroundColor: colors.white}}>
      <FlatList
        ref={FlatListRef}
        data={upComingData}
        keyExtractor={(value, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}) =>  <CustomeCard image ={item.image} salonName ={item.salonName} apointmentDate ={item.apointmentDate}  salonAddress  = {item.address} 
        apointmentTime ={item.apointmentTime} alocateTime ={item.alocateTime} serviceCount ={item.serviceCount} serviceTitle ={item.serviceTitle}
         onPress ={() => props.navigation.navigate('Appoinment_Detail', {bool: 3,data:item}) } 
        />}
      />
    </View>
  );
};

export default Cancelled;

const styles = StyleSheet.create({
});
