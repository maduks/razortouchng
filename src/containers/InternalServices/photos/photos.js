import React, { Component, useState, useEffect } from 'react';
import colors from '../../../assets/color';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { hp, wp, normalize, isIOS, isX } from '../../../styles/responsiveScreen';
import FontText from '../../../Components/common/FontText';
import VideoData from './videoData';
import PhotosView from '../photos/image';
import { useTranslation } from 'react-i18next';

const Photos = props => {
  const { t } = useTranslation();

  const [ActiveBtn, setActiveBtn] = useState(true);

  return (
    <View>
      <View
        style={styles.mainContainer}>
        <TouchableOpacity
          style={[styles.btn, { backgroundColor: ActiveBtn ? colors.theme : '#FD88391A', }]}
          onPress={() => setActiveBtn(true)}>
          <FontText
            size={normalize(14)}
            name={'poppins-medium'}
            pTop={hp(1.5)}
            style={{
              color: ActiveBtn ? colors.white : '#15093E85',
            }}
            textAlign={'center'}
            pLeft={wp(5)}>
            {t('PHOTOS')}
          </FontText>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.btn1, { backgroundColor: ActiveBtn ? '#FD88391A' : colors.theme, }]}
          onPress={() => setActiveBtn(false)}>
          <FontText
            size={normalize(14)}
            name={'poppins-medium'}
            pTop={hp(1.5)}
            style={{
              color: ActiveBtn ? '#15093E85' : colors.white,
            }}
            textAlign={'center'}>
            {t('VIDEOS')}
          </FontText>
        </TouchableOpacity>
      </View>
      <View>{ActiveBtn ? <PhotosView /> : <VideoData />}</View>
    </View>
  );
};

export default Photos;

const styles = StyleSheet.create({
  CompletMainView: {
    borderWidth: 1,
    flexDirection: 'row',
    margin: 10,
    borderWidth: 1,
    borderColor: '#8384A150',
    borderRadius: 10,
    overflow: 'hidden',
  },
  mainContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: hp(1),
  },
  btn: {
    width: wp(25),

    height: hp(6),
    borderBottomLeftRadius: wp(12),
    borderTopLeftRadius: wp(12),
  },
  btn1: {
    width: wp(25),

    // opacity: 0.1,
    height: hp(6),
    borderBottomRightRadius: wp(12),
    borderTopRightRadius: wp(12),
  }
});
