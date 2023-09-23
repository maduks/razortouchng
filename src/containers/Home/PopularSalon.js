import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  FlatList,
  Image,
  TouchableOpacity,
  Platform,
  ScrollView,
  Keyboard,
  SafeAreaView,
} from 'react-native';
import TextInputWithLogo from '../../Components/common/TextInputWithLogo/TextInputWithLogo';
import FontText from '../../Components/common/FontText';
import {normalize, wp} from '../../styles/responsiveScreen';
import {Modalize} from 'react-native-modalize';
import SvgIcons from '../../assets/SvgIcons';
import colors from '../../assets/color';
import DropDownPicker from 'react-native-dropdown-picker';
import {useTranslation} from 'react-i18next';

import Index from '../../Components/common/PopularSalonAndBestInRating_HomePage/Index';
import { upComingData } from '../../Utils/data';

const {width, height} = Dimensions.get('screen');

const PopularSalon = props => {
  const {t} = useTranslation();

  const booknow = () => {
    props.navigation.navigate('Bookinggender');
  };

  const PopularSalon = [
    {
      image: require('../../assets/images/PopularSalons.png'),
      name: 'Mane Beautilocks',
      location: '210 New York Street',
      rating: '3.0',
      stars: require('../../assets/images/Stars.png'),
      open: 'Close',
    },
    {
      image: require('../../assets/images/PopularSalons.png'),
      name: 'Mane Beautilocks',
      location: '510 Welcome Street',
      rating: '3.0',
      stars: require('../../assets/images/Stars.png'),
      open: 'Open',
    },
  ];

  const BestInRatingsdata = [
    {
      image: require('../../assets/images/PopularSalons.png'),
      name: 'Mane Beautilocks',
      location: '210 New York Street',
      rating: '3.0',
      stars: require('../../assets/images/Stars.png'),
      open: 'Close',
    },
    {
      image: require('../../assets/images/PopularSalons.png'),
      name: 'Mane Beautilocks',
      location: '510 Welcome Street',
      rating: '3.0',
      stars: require('../../assets/images/Stars.png'),
      open: 'Open',
    },
  ];


  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.white}}>
      <TextInputWithLogo
        ContainerStyle={{
          width: width * 0.9,
          alignSelf: 'center',
          backgroundColor: colors.viewcolor,
          height: width * 0.13,
        }}
        logo={true}
        filter={true}
        PlaceHolder={t('SEARCH_SAL')}
        BackPress={() => props.navigation.goBack()}
        filterPressed={() => {
          Keyboard.dismiss();
          setTimeout(() => {
            ModalizeRef_2.current.open();
          }, 50);
        }}
        navigation={() => props.navigation.navigate('HomeSearch')}
      />


      <View
        style={{
          flex: 1,
          alignItems: 'center',
          paddingTop: width * 0.05,
        }}>
        <FlatList
          data={
            props?.route?.params?.BestInratings_Bool
              ? BestInRatingsdata
              : PopularSalon
          }
          keyExtractor={(value, index) => index.toString()}
          showsHorizontalScrollIndicator={false}
          renderItem={({item, index}) => (
            <Index
              ChangeWidth={true}
              {...item}
              navigation={() => props.navigation.navigate('InternalServices')}
              bookNow={booknow}
            />
          )}
        />


      </View>

      {/* For Filter */}
      {/* <Modalize
        ref={ModalizeRef_2}
        modalStyle={styles.ModalStyle}
        handleStyle={{backgroundColor: colors.gray50}}
        modalHeight={height * 0.82}
        handlePosition="inside"
        HeaderComponent={RenderHeader}
        customRenderer={FilterCustomeRender}
      /> */}
    </SafeAreaView>
  );
};

export default PopularSalon;

const styles = StyleSheet.create({
  map: {
    flex: 1,
    marginTop: 10,
  },
  Image: {
    width: width * 0.07,
    height: width * 0.07,
  },
  Round: {
    flex: 1,
    position: 'absolute',
    top: height * 0.4,
    right: width * 0.05,
    shadowOffset: {width: 0, height: 3.09},
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    shadowOpacity: 1,
    shadowRadius: 16.2,
  },
  RoundIcon: {
    backgroundColor: colors.white,
    padding: 10,
    borderRadius: 50,
    width: width * 0.12,
    alignSelf: 'flex-end',
    marginBottom: width * 0.02,
    elevation: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ViewLIstMainView: {
    width: width * 0.33,
    backgroundColor: colors.white,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 25,
    elevation: 15,
  },
  ViewMapMainView: {
    backgroundColor: colors.white,
    width: width * 0.35,
    height: 50,
    position: 'absolute',
    right: width * 0.01,
    bottom: height * 0.08,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    shadowOffset: {width: 0, height: 4},
    shadowColor: 'rgba(0, 0, 0, 0.15)',
    shadowOpacity: 1,
    shadowRadius: 16,
    elevation: 7,
  },
  ModalStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  FilterMainView: {
    flexDirection: 'row',
    width: width,
    paddingTop: width * 0.07,
  },
  Container: {
    backgroundColor: colors.white,
    width: width,
    paddingHorizontal: 20,
    flex: 1,
  },
  SortBy: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    flex: 1,
    height: width * 0.1,
  },
  FilterHeaderMainView: {
    flex: 1,
    flexDirection: 'row',
    marginVertical: width * 0.05,
  },
  SalonTypeMainView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: width * 0.025,
    paddingHorizontal: width * 0.02,
  },
  EmptyBox: {
    width: width * 0.05,
    height: width * 0.05,
    borderWidth: 1,
    borderColor: colors.black,
  },
  FilterApplyMainView: {
    width: width * 0.95,
    height: width * 0.17,
    marginHorizontal: -20,
    marginBottom: Platform.OS == 'ios' ? width * 0.05 : width * 0.03,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  FilterApplySubView: {
    alignItems: 'center',
    justifyContent: 'center',
    height: width * 0.14,
    borderRadius: width * 0.05,
    width: width * 0.46,
  },
  FilterApplyText: {
    fontFamily: 'poppins-medium',
    fontSize: normalize(18),
  },
  PopularBlogsMainView: {
    width: width * 0.8,
    height: width * 0.3,
    marginRight: 10,
    marginLeft: 5,
    borderRadius: 10,
    flexDirection: 'row',
    backgroundColor: colors.white,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowColor: 'rgba(49, 60, 100, 0.1)',
    shadowOpacity: 1,
    shadowRadius: 20,
    marginBottom: 20,
    elevation: 8,
  },
  PopularBlogsMainText: {
    fontSize: 14,
    fontFamily: 'poppins-medium',
    width: '100%',
    paddingVertical: 5,
    paddingHorizontal: 2,
    width: '85%',
    alignSelf: 'center',
    marginTop: 5,
  },
});
