//import liraries
import React, { Component, useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  StatusBar,
  Dimensions,
  Modal,
  ImageBackground,
} from 'react-native';

import colors from '../../assets/color';
import { hp, wp, normalize, isX, isAndroid } from '../../styles/responsiveScreen';
import FontText from '../../Components/common/FontText/index';
import SvgIcons from '../../assets/SvgIcons';
import BackHeader from '../../Components/BackHeader';
import EmptyDefault from '../../Components/EmptyDefault';
import { routeName as AddNewCardRouteName } from '../AddnewCard/index';
import BottomSheet from '../../Components/bottomSheet';
import PaymentSuccess from '../Order/PaymentSucces';
import fonts from '../../assets/fonts';
import { useTranslation } from 'react-i18next';
import BigButton from '../../Components/BigButton';
import { cardData } from '../../Utils/data';
import SmartScrollView from '../../Components/SmartScrollView';

const { width, height } = Dimensions.get('screen');

export const routeName = 'PaymentsMethods';

// create a component
const SavedCards = (props) => {
  const { t } = useTranslation();
 const  { navigation } = props;
  const [modalVisible, setModalVisible] = useState(false);
  const modalizeRef = useRef();
  const [SelectedItem, setSelectedItem] = useState(null);
const {data } = props.route.params;
  const onButtonPress = () => {
    if (SelectedItem == null) {
      console.log('NULL...............');
    } else {
      setModalVisible(true);

    }
  };

  const onOpen = () => {
    modalizeRef.current?.open();
  };
  const onClose = () => {
    modalizeRef.current?.close();
  };

  function _renderItem(item, index) {
    return (
      <View style={styles.box}>
        <TouchableOpacity
          onPress={() => setSelectedItem(index)}
          style={{ marginRight: width * 0.03 }}>
          {SelectedItem == index ? (
            <View
              style={styles.imageview}>
              <Image
                source={require('../../assets/images/PayMent.png')}
                resizeMode="center"
                style={styles.img}
              />
            </View>
          ) : (
            <View
              style={styles.borderView}
            />
          )}
        </TouchableOpacity>
<TouchableOpacity activeOpacity={0.8} onPress={() => setSelectedItem(index)}>
        <ImageBackground
          style={styles.imgBg}
          imageStyle={{ borderRadius: 25 }}
          source={require('../../assets/images/Effects.png')}>
          <FontText
            name={'rubik-bold'}
            style={styles.no}>
            {item.number}
          </FontText>
          {item.card == 'Visa' ? (
            <View
              style={styles.nameView}>
              <FontText
                name={'rubik-regular'}
                style={styles.name}>
                {item.name}
              </FontText>

              <FontText
                style={styles.date}>
                {item.date}
              </FontText>
            </View>
          ) : (
            <View
              style={styles.subname}>
              <FontText
                name={'rubik-regular'}
                style={styles.nameText}>
                {item.name}
              </FontText>
              <SvgIcons.Seprator
                height={hp(3)}
                width={hp(3)}
                style={{ paddingHorizontal: wp(2) }}
              />
              <FontText style={{ color: 'white' }}>22/11</FontText>
            </View>
          )}
        </ImageBackground>
        </TouchableOpacity>
      </View>
    );
  }


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>

      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        <Modal
          visible={modalVisible}
          animationType="slide"
          onRequestClose={() => {
            setModalVisible(false);
          }}>
          <PaymentSuccess
            ViewDetails={() => {
              setModalVisible(false);
              setTimeout(() => {
                navigation.push('OrderSummaryCoupan', { osdata : data,Btn: true });
              }, 100);
            }}
            BackNavigation={() => {
              setModalVisible(false);
              setTimeout(() => {
                navigation.navigate('Home');
              }, 100);
            }}
            closeModal={() => setModalVisible(false)}
          />
        </Modal>

        {cardData.length == 0 ? (
          <BackHeader
            style={{ paddingTop: 5 }}
            title={t('PAYMENT_METHOD')}
            titleColor="violet"
            BackonPress={() => navigation.goBack()}
          />
        ) : (
          <BackHeader
            style={{ paddingTop: 5, paddingHorizontal: width * 0.03 }}
            title={t('SAVE_CARDS')}
            BackonPress={() => navigation.goBack()}
            RightItemLabel={t('USE_NEW_CARD')}
            RightColor="theme"
            titleColor="violet"
            onPress={() => navigation.navigate(AddNewCardRouteName)}
          />
        )}

        {cardData.length == 0 ? (
          <View style={{ flex: 1 }}>
            <EmptyDefault
              image={<SvgIcons.Bag style={{ height: wp(25), width: wp(25) }} />}
              Title={t('ACCOUNT_ADD')}
              Subtitle={t(
                'HAIRCUTS_TAG',
              )}
            />
          </View>
        ) : (
          <View style={{ flex: 1, backgroundColor: colors.white }}>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={cardData}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item, index }) => _renderItem(item, index)}
              keyExtractor={(value, index) => index.toString()}
              style={{
                marginHorizontal: wp(3),
              }}
            />
          </View>
        )}

        <View style={{ justifyContent: 'flex-end', marginBottom: hp(2) }}>
          <BigButton style={{
            backgroundColor:
              typeof SelectedItem == 'number'
                ? colors.theme
                : colors.lightOrngae,
          }} title={t('CONTINUE')} onClick={() => onButtonPress()} />
        </View>

        <BottomSheet
          refname={modalizeRef}
          icon={<SvgIcons.RedTrash height={hp(9)} width={hp(9)} />}
          title={t('DELETE_CARD')}
          textrightbutton={t('DELETE')}
          textleftbutton={t('CANCEL')}
          bottombutton={true}
          oncancelpress={onClose}></BottomSheet>
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
  haircuts: {
    color: colors.lightViolet,
    marginHorizontal: hp(2.5),
    textAlign: 'center',
  },
  button: { color: colors.white },
  box: {
    flex: 1,
    backgroundColor: colors.white,
    flexDirection: 'row',
    justifyContent: 'space-between',

    alignItems: 'center',
    alignSelf: 'center',
  },
  border: {
    borderColor: colors['violet'],
    borderWidth: 0.3,
    marginTop: hp(1),
    opacity: 0.3,
    width: wp(92),
    alignSelf: 'center',
  },
  no: {
    marginTop: hp(13),
    marginHorizontal: hp(4),
    color: 'white',
  },
  btn: {
    fontFamily: fonts['poppins-medium'],
    alignSelf: 'flex-end',
    height: hp(7),
    width: wp(32),
    marginRight: wp(-3),
    justifyContent: 'center',
    borderBottomRightRadius: 14,
    borderTopRightRadius: 14,
    backgroundColor: colors.green,
  },
  imageview: {
    width: width * 0.071,
    height: width * 0.071,
    borderRadius: 50,
  },
  img: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
  },
  borderView: {
    width: width * 0.07,
    height: width * 0.07,
    borderRadius: 50,
    borderWidth: 1,
  },
  imgBg: {
    height: hp(22),
    width: wp(80),
    marginVertical: hp(1),
  },
  nameView: {
    flexDirection: 'row',
    alignItems: 'center',

    justifyContent: 'space-between',
  },
  name: {
    color: 'white',
    marginLeft: wp(7),
  },
  date: { color: 'white', marginHorizontal: wp(4) },
  subname: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nameText: {
    color: 'white',
    marginLeft: wp(7),
  },
});

//make this component available to the app
export default SavedCards;
