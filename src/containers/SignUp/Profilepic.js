import React, { Component, useState, useRef, useCallback } from 'react';
import FontText from '../../Components/common/FontText';
import colors from '../../assets/color';
import BackHeader from '../../Components/BackHeader';
import SvgIcons from '../../assets/SvgIcons';
import { Modalize } from 'react-native-modalize';
import ImagePicker from 'react-native-image-crop-picker';
import TitleSubTitle from '../../Components/TitleSubTitle';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import { hp, wp, normalize, isIOS, isX } from '../../styles/responsiveScreen';
import { useTranslation } from 'react-i18next';
import { ProgressBar } from 'react-native-paper';
import BigButton from '../../Components/BigButton';
import ImageCropPicker from 'react-native-image-crop-picker';

const { width, height } = Dimensions.get('screen');

export const routeName = 'Profilepic';

const Profilepic = ({ navigation }) => {
  const { t } = useTranslation();

  const close = () => setVisible(false);

  const modalizeRef = useRef();

  const onOpen = () => {
    modalizeRef.current?.open();
  };

  const onClose = () => {
    modalizeRef.current.close();
  }

  const [isImage, setIsImage] = useState(null);

  const openCamera = () => {
    ImageCropPicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(image => {
        console.log('images', image)
        setIsImage(image);
       // alert(image.path)

      })

  };

  const chooseImage = () => {
    ImageCropPicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      setIsImage(image);
      //alert(image.path)
      
      onClose();
    });
  };




  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
      <View style={styles.container}>
        <BackHeader
          BackonPress={() => navigation.navigate('Profilegender')}
          RightItemLabel={t('SKIP')}
          onPress={() => navigation.navigate('Tab')}
        />

        <View style={{ flex: 1 }}>
          <ProgressBar
            progress={0.6}
            color={colors.theme}
            style={styles.progress}
          />

          <TitleSubTitle
            Title={t('UPLOAD_PROFILE')}
            SubTitle={t(
              "Kindly select a display picture from your phone's galerry",
            )}
            textalign={'left'}
            pTop={hp(1)}
          />
          <TouchableOpacity style={styles.subcontainer} onPress={onOpen}>

              <View style={styles.round}>
              {isImage ?
                <Image source={{ uri: isImage.path }} style={styles.imageView} />
                : null}

              </View>
          </TouchableOpacity>
        </View>

        <View
          style={styles.jpg}>
          <FontText
            name={'poppins-semibold'}
            size={normalize(14)}
            textAlign={'center'}
            color={'lightViolet'}>
            {t('JPG')}
          </FontText>
          <BigButton title={t('SUBMIT')} onClick={() => navigation.navigate('Profilenum')} style={{ marginBottom: hp(2) }} />

        </View>

        <Modalize ref={modalizeRef} withHandle={false} modalHeight={hp(30)}>
          <FontText
            name={'poppins-medium'}
            size={normalize(16)}
            textAlign={'center'}
            pTop={hp(2)}
            color={'violet'}>
            {("CHOOSE")}
          </FontText>
          <View
            style={styles.camera}>
            <TouchableOpacity style={styles.item} onPress={() => openCamera()}>
              <Image
                source={require('../../assets/images/camera.png')}
                style={styles.camerapic}
              />
              <FontText
                name={'poppins-medium'}
                size={normalize(16)}
                pTop={hp(1)}
                color={'violet'}>
                {t("CAMERA")}
              </FontText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.item} onPress={chooseImage}>
              <Image
                source={require('../../assets/images/gallery.png')}
                style={styles.galleryPic}
              />
              <FontText
                name={'poppins-medium'}
                size={normalize(16)}
                pTop={hp(1)}
                color={'violet'}>
                {t("GALL")}
              </FontText>
            </TouchableOpacity>
          </View>
        </Modalize>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: wp(5),
  },
  progress: {
    marginHorizontal: wp(3),
    marginVertical: wp(2),
    height: hp(1),
    borderRadius: 14,
  },
  round: {
    height: wp(50),
    width: wp(50),
    backgroundColor: colors.lighttheme,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  imageView:{
    height: wp(50),
    width: wp(50),
    borderRadius: 100,
  },
  subcontainer: {
    alignSelf: 'center',
    justifyContent: 'center',
    height: height * 0.45,
  },
  item: { justifyContent: 'center', alignItems: 'center' },
  jpg: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: height * 0.02,
  },
  camera: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: wp(15),
  },
  camerapic: { height: wp(12), width: wp(12), marginTop: hp(5) },
  galleryPic: { height: wp(12), width: wp(12), marginTop: hp(5) },
});

export default Profilepic;
