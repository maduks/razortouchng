import React, {Component, useState, useEffect} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import BackHeader from '../../Components/BackHeader';
import colors from '../../assets/color';
import SucessFullDefault from '../../Components/SucessFullDefault/SucessFullDefault';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  hp,
  wp,
} from '../../styles/responsiveScreen';
import {useTranslation} from 'react-i18next';
import BigButton from '../../Components/BigButton';

export const routeName = 'Resetpasspopup';

const Resetpasspopup = ({navigation}) => {
  const {t} = useTranslation();
  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.container}>
        <BackHeader
          BackonPress={() => navigation.navigate('Resetpass')}></BackHeader>
        <SucessFullDefault
                Title={t('PWD_REST')}
                Subtitle={t('PWD_TAG_2')} />
        <View style ={styles.btnView}>
          <BigButton title = {t('BACK_LOGIN')} onClick ={() =>  navigation.navigate('Login')} />
          </View>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  mainContainer:{backgroundColor: colors.white, flex: 1},
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: wp(5),
  },
  sucess: {
    marginTop: hp(4),
    marginHorizontal: hp(11.5),
  },
  btnView:{flex:1,justifyContent:'flex-end',alignItems:'center',marginBottom:hp(5)},
});
export default Resetpasspopup;
