//import liraries
import React, { Component, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  I18nManager,
  Dimensions,
} from 'react-native';
import BackHeader from '../../Components/BackHeader';
import Commentrender from './Commentrender';
import { hp, wp, normalize, isX } from '../../styles/responsiveScreen';
import colors from '../../assets/color';
import Input from '../../Components/common/Input';
import { useTranslation } from 'react-i18next';
import BigButton from '../../Components/BigButton/index'

export const routeName = 'BlogInternalCommet';

const Data = [
  {
    id: 0,
    name: 'Javed Habib',

    date: '15 days ago ',
    info: 'Whether you want to look younger or embrace your age, these haircuts will make you Whether you want to look younger or embrace your age',
  },
  {
    id: 1,
    name: 'Javed Habib',

    date: ' 15 days ago ',
    info: 'debit Whether you want to look younger or embrace your age, these haircuts will make you Whether you want to look younger or embrace your age',
  },
];

// create a component
const BlogInternalCommet = props => {
  const { data } = props.route.params;
  const { t } = useTranslation();
  const { item, onPress, navigation } = props;

  return (
    <SafeAreaView style={styles.maincontainer}>
      <BackHeader
        title={`${t('COMMENTS')} (5)`}
        titleColor="violet"
        BackonPress={() => navigation.goBack()}
      />
      <View style={styles.container}>
        <FlatList
          style={{ marginTop: hp(2) }}
          showsVerticalScrollIndicator={false}
          data={Data}
          bounces={false}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => {
            return <Commentrender {...item}></Commentrender>;
          }}
          keyExtractor={item => item.id}
        />
      </View>
      <View style={styles.box}>
        <Input
          placeholder={t('WRITE_COM')}
          fontSize={normalize(12)}
          name={'poppins-medium'}
          placeholderTextColor={'line'}
          inputStyle={[styles.input, { textAlign: I18nManager.isRTL ? 'right' : 'left', }]}></Input>
      </View>

      <View style={styles.btn}>
        <BigButton title={t("SUBMIT")} onClick={() => navigation.goBack()} />
      </View>
    </SafeAreaView>
  );
};

// define your styles
const styles = StyleSheet.create({
  button: { color: colors.white },
  box: {
    marginTop: hp(3.5),
    height: hp(12),
    width: wp(84.5),
    backgroundColor: colors.viewcolor,
    marginHorizontal: wp(6),
    borderRadius: 15,
  },
  maincontainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    paddingHorizontal: wp(6),
  },
  input: {
    backgroundColor: colors.viewcolor,
    borderRadius: 10,
    color: colors.line,
    paddingLeft: wp(3),
  },
  btn: { justifyContent: 'flex-end', flex: 1, marginBottom: hp(2) },
});

//make this component available to the app
export default BlogInternalCommet;
