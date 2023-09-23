//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { hp, wp, normalize, isIOS, isX } from '../../styles/responsiveScreen';
import SucessFullDefault from '../../Components/SucessFullDefault/SucessFullDefault';
import colors from '../../assets/color';
import { SafeAreaView } from 'react-native-safe-area-context';
import BackHeader from '../../Components/BackHeader';
import { useTranslation } from 'react-i18next';
import BigButton from '../../Components/BigButton';

export const routeName = 'SucessFullCard';

// create a component
const SucessFullCard = ({ navigation }) => {
  const { t } = useTranslation();
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <BackHeader
        style={{ paddingTop: 5 }}
        title={t('PAYMENT_METHOD')}
        titleColor="violet"
        BackonPress={() => navigation.goBack()}
      />
      <SucessFullDefault
        Title={t('CARD_SUCCES')}
        Subtitle={t(
          'PWD_TAG',
        )}
      />
      <View style={{ justifyContent: 'flex-end', marginBottom: hp(2) }}>
        <BigButton title={t('MORE_CARD')} onClick={() => navigation.navigate('PaymentsMethods')} />

      </View>
    </SafeAreaView>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  card: {
    color: colors.white,
  },
});

//make this component available to the app
export default SucessFullCard;
