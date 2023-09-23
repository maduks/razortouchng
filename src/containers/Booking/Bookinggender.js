//import liraries
import React, { Component, useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import BackHeader from '../../Components/BackHeader';
import { TextInput, ProgressBar, Card } from 'react-native-paper';
import { hp, wp, normalize, isX, isAndroid } from '../../styles/responsiveScreen';
import colors from '../../assets/color';
import FontText from '../../Components/common/FontText';
import SvgIcons from '../../assets/SvgIcons';
import { routeName as BookingservicesRouteName } from './Bookingservices';
import BigButton from '../../Components/BigButton/index'
import { useTranslation } from 'react-i18next';
import { useIsFocused } from '@react-navigation/core';
import TitleSubTitle from '../../Components/TitleSubTitle';

export const routeName = 'Bookinggender';
const { width, height } = Dimensions.get('screen');

// create a component
const Bookinggender = (props) => {

  const { t } = useTranslation();
  const isFocused = useIsFocused();
  useEffect(() => {
    // alert(JSON.stringify(props.route.params))
    setSelectedGender(false);
  }, [isFocused]);
  const [SelectedGender, setSelectedGender] = useState(false);
  const { ddata } = props.route.params;
  const { navigation } = props;

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ marginHorizontal: isAndroid ? wp(0) : wp(3) }}>
        <BackHeader
          title={t('SEL_GEN')}
          titleColor="violet"
          BackonPress={() => navigation.goBack()}
        />
        <ProgressBar
          progress={0.1}
          color={colors.theme}
          style={styles.progress}
        />
        <TitleSubTitle Textstyle={{ marginTop: isAndroid ? hp(-3) : hp(-1) }} SubTitle={t(
          "Select customer's gender to continue booking.",
        )} />
        <View style={styles.subcontainer}>
          <TouchableOpacity onPress={() => setSelectedGender(1)}>
            <View
              style={[
                styles.innerview,
                {
                  backgroundColor:
                    SelectedGender == 1 ? '#FFF8F2' : 'transparent',
                  borderColor: SelectedGender == 1 ? colors.theme : colors.line,
                },
              ]}>
              {SelectedGender == 1 ? (
                <SvgIcons.Roundarrow style={styles.Roundarrow} />
              ) : null}
              {SelectedGender == 1 ? <SvgIcons.MaleO /> : <SvgIcons.Male />}
              <FontText
                name={'poppins-medium'}
                size={normalize(16)}
                color={'violet'}
                pTop={hp(1)}>
                {t('MALE')}
              </FontText>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setSelectedGender(2)}>
            <View
              style={[
                styles.smallerview,
                {
                  backgroundColor:
                    SelectedGender == 2 ? '#FFF8F2' : 'transparent',
                  borderColor: SelectedGender == 2 ? colors.theme : colors.line,
                },
              ]}>
              {SelectedGender == 2 ? (
                <SvgIcons.Roundarrow style={styles.Roundarrow} />
              ) : null}
              {SelectedGender == 2 ? <SvgIcons.FemaleO /> : <SvgIcons.Female />}

              <FontText
                name={'poppins-medium'}
                size={normalize(16)}
                color={'violet'}
                pTop={hp(1)}>
                {t('FEMALE')}
              </FontText>
            </View>
          </TouchableOpacity>

        </View>
      </View>
      <View style={{ flex: 1, justifyContent: 'flex-end', marginBottom: hp(2) }}>
        <BigButton style={{ backgroundColor: SelectedGender ? colors.theme : colors.lightOrngae, }} title={t('SUBMIT')} onClick={() => {
          if (typeof SelectedGender == 'number') {
            navigation.navigate(BookingservicesRouteName, { sdata: ddata, gender: SelectedGender });
          }
        }} />
      </View>
    </SafeAreaView>
  );
};

// define your styles
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
  innerview: {
    paddingHorizontal: isX ? wp(5) : wp(4),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    height: width * 0.4,
    width: width * 0.4,
    borderRadius: 21,
  },
  subcontainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: hp(5),
    marginHorizontal: wp(3),
  },
  smallerview: {
    paddingHorizontal: isX ? wp(5) : wp(4),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    height: width * 0.4,
    width: width * 0.4,
    borderColor: colors.line,
    borderRadius: 21,
  },
  Roundarrow: {
    left: wp(12),
  },
});

//make this component available to the app
export default Bookinggender;
