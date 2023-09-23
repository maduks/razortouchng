import React, { Component, useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Dimensions,
  I18nManager,
} from 'react-native';
import { hp, wp, normalize, isIOS, isX } from '../../styles/responsiveScreen';

import fonts from '../../assets/fonts';
import FontText from '../../Components/common/FontText';
import colors from '../../assets/color';
import Services from './services';
import Reviews from './reviews';
import Photos from './photos/photos';
import About from './about';
import NotificationHeader from '../../Components/common/NotificationHeader/NotificationHeader'
import { useTranslation } from 'react-i18next';
import Bookinggender, { routeName as BookinggenderRouteName } from '../Booking/Bookinggender';
import ImageView from '../../Components/common/ImageView';
import IconView from '../../Components/common/IconView';
import { internalData } from '../../Utils/data';
import BigButton from '../../Components/BigButton';

export const routeName = 'InternalServices';

const { width, height } = Dimensions.get('screen')

const InternalServices = (props) => {
  const { t } = useTranslation();

  const { pdata, Idata } = props.route.params;
  const [adata, setadata] = useState('SERVICES');

  const _mainMenu = item => {
    return (
      <View
        style={{
          height: wp(8),
        }}>
        <TouchableOpacity activeOpacity={0.7} onPress={() => setadata(item.name)}>
          <FontText
            name={'poppins-medium'}
            size={normalize(14)}
            pTop={wp(3)}
            pLeft={wp(7)}
            pRight={I18nManager.isRTL ? wp(10) : wp(0)}
            style={{
              color:
                adata == item.name
                  ? colors.theme
                  : item.name
                    ? colors.lightViolet
                    : colors.theme,

            }}>
            {t(item.name)}
          </FontText>
        </TouchableOpacity>
        <View
          style={{
            borderWidth: wp(0.7),
            borderColor: adata == item.name ? colors.theme : colors.white,
            width: wp(25),
            marginTop: wp(2),
          }}>
          <View style={styles.lline}></View>
        </View>
      </View>

    );
  };



  return (
    <SafeAreaView style={{ backgroundColor: '#fff' }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <NotificationHeader navigation={() => props.navigation.goBack()} Name={t("BACK")} icon={true} search={true} ContainerStyle={{ marginBottom: hp(-2) }} />
          <ImageView pdata={pdata} />
          <IconView />
        </View>
        <View
          style={styles.mainMenu}>
          <FlatList
            style={{ height: wp(11) }}
            horizontal={true}
            scrollEnabled={false}
            showsHorizontalScrollIndicator={false}
            data={internalData}
            renderItem={({ item, index }) => _mainMenu(item)}></FlatList>
        </View>

        <View>
          {adata === 'SERVICES' ? (
            <Services />
          ) : adata === 'REVIEWS' ? (
            <Reviews />
          ) : adata === 'PHOTOS' ? (
            <Photos />
          ) : adata === 'ABOUT' ? (
            <About address={pdata.address} />
          ) : (
            <Services />
          )}
        </View>
        <BigButton title={t("BOOK_NOW")} onClick={() => props.navigation.navigate(BookinggenderRouteName, { ddata: pdata })} style={styles.btn} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginHorizontal: wp(0),
  },
  lline: {
    flex: 1,
    borderWidth: wp(1),
    borderColor: '#d3d3d3',
    marginTop: height > 767 ? hp(-0.1) : hp(-0.2),
    width: wp(130),
    marginLeft: wp(-3),

  },
  btn: {
    backgroundColor: colors['button'], marginVertical: hp(4)
  },
  itemView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp(-1),
    marginHorizontal: wp(3)
  },
  mainMenu: {
    flexDirection: 'row',
    marginTop: hp(0),
    marginHorizontal: wp(0),
    // marginLeft:wp(2)


  },
});

export default InternalServices;
