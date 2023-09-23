//import liraries
import React, {Component, useRef, useState,useEffect} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  SafeAreaView,
  StatusBar,
  Dimensions,
  Modal,
  Text
} from 'react-native';

import colors from '../../assets/color';
import {hp, wp, normalize, isX, isAndroid} from '../../styles/responsiveScreen';
import FontText from '../../Components/common/FontText/index';
import Button from '../../Components/common/Button';
import SvgIcons from '../../assets/SvgIcons';
import BackHeader from '../../Components/BackHeader';
import EmptyDefault from '../../Components/EmptyDefault';
import SavedCardItem from '../SavedCard/SavedCardItem';
import {routeName as AddNewCardRouteName} from '../AddnewCard/index';
import BottomSheet from '../../Components/bottomSheet';
import PaymentSuccess from '../Order/PaymentSucces';
import {useTranslation} from 'react-i18next';
import BigButton from '../../Components/BigButton';
import home,{routeName as homeRouteName} from '../Home/index'
import { cardData } from '../../Utils/data';
import globals from '../../assets/globals';
import axios from 'axios';
const {width, height} = Dimensions.get('screen');
import AsyncStorage from '@react-native-async-storage/async-storage';


export const routeName = 'PaymentsMethods';

// create a component
const PaymentsMethods = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [card,setCard] = useState([]);
  const modalizeRef = useRef();
  const {t} = useTranslation();

  const onButtonPress = () => {
    if (cardData.length == 0) {
      navigation.navigate(AddNewCardRouteName);
    } else {
      OpenModel('PaymentSuccess');
    }
  };

  const onOpen = () => {
    modalizeRef.current?.open();
  };
  const onClose = () => {
    modalizeRef.current?.close();
  };

  const OpenModel = () => {
    setModalVisible(!modalVisible);
  };

  const onBackHomePress = () => {
    setModalVisible(false);
    // onClose();
    navigation.navigate(homeRouteName);
  };

  const onViewDetailPress = () => {
    setModalVisible(false);
    navigation.push('OrderSummaryCoupan', { Btn: true });
    

  };

     

  const apiGetCards=(token)=>{
    AsyncStorage.getItem('userData').then(
      (value) =>{
        const user = JSON.parse(value);
    const url = globals.base_url + "cards/"+user.id;
    
    axios
      .get(url,{
        headers: {
          "Content-type": "application/json",
          "Accept": "application/json",
          "Authorization": `Bearer ${token}` 
        }})
      .then(function (response) {
        console.log(token)
        // handle success
        setCard(JSON.stringify(response.data));
        
        //alert()
        //alert(JSON.parse(JSON.stringify(response.data)));
      })
      .catch(function (error) {
        // handle error
       alert("" +error);
      })
      .finally(function () {
        // always executed
       // alert('Finally called');
      });

    } ); 
    }
    
    useEffect(() => {
      apiGetCards();
    }, []);


  



  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        <Modal
          visible={modalVisible}
          animationType="slide"
          onRequestClose={() => {
            setModalVisible(false);
          }}>
          <PaymentSuccess
            closeModal={() => setModalVisible(false)}
            BackNavigation={onBackHomePress}
            ViewDetails={onViewDetailPress}
          />
        </Modal>
        {card.length == 0 ? (
          <BackHeader
            style={styles.back}
            title={t('PAY_METHOD')}
            titleColor="violet"
            BackonPress={() => navigation.goBack()}
          />
        ) : (
          <BackHeader
            style={styles.back1}
            title={t('SAVE_CARDS')}
            BackonPress={() => navigation.goBack()}
            RightItemLabel={t('USE_NEW_CARD')}
            RightColor="theme"
            titleColor="violet"
            onPress={() => navigation.navigate(AddNewCardRouteName)}
          />
        )}

        {card.length == 0 ? (
          <View style={{flex: 1}}>
            <EmptyDefault
              image={<SvgIcons.Bag style={{height: wp(25), width: wp(25)}} />}
              Title={t('ACCOUNT_ADD')}
              Subtitle={t(
                'HAIRCUTS',
              )}
            />
          </View>
        ) : (
          <View style={styles.data}>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={card}
              showsHorizontalScrollIndicator={false}
              renderItem={({item}) => {
                return (
                     <View>
                  // <SavedCardItem item={item} onPress={onOpen}></SavedCardItem>
                  {item.map((items, index) => (
                  <FontText>hey {items.id}</FontText>
                  ))}
                  </View>
                );
              }}
              keyExtractor={(value, index) => index.toString()}
              style={{
                marginHorizontal: wp(3),
              }}
            />
           <Text> </Text>
          </View>
        )}
        <View style ={styles.btn}>
          <BigButton title =  {t('CONTINUE')} onClick ={onButtonPress} />
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
  safe:{flex: 1, backgroundColor: colors.white},
  haircuts: {
    color: colors.lightViolet,
    marginHorizontal: hp(2.5),
    textAlign: 'center',
  },
  button: {color: colors.white},
  back:{paddingTop: 5,paddingHorizontal:wp(3)},
  back1:{paddingTop: 5, paddingHorizontal: width * 0.03},
  data:{flex: 1, backgroundColor: colors.white},
  btn:{justifyContent:'flex-end',marginBottom:hp(2)},
  imgebg:{
    height: hp(22),
    width: wp(80),
    marginVertical: hp(1),
  },
  number:{
    marginTop: hp(13),
    marginHorizontal: hp(4),
    color: 'white',
  },
  visaView:{
    flexDirection: 'row',
    alignItems: 'center',

    justifyContent: 'space-between',
  },
  visaText:{
    color: 'white',

    marginLeft: wp(7),
  },dateText:{color: 'white', marginHorizontal: wp(4)},
  nameView:{
    flexDirection: 'row',
    alignItems: 'center',
  },
  nameText:{
    color: 'white',
    // backgroundColor: 'yellow',
    marginLeft: wp(7),
  },
});

//make this component available to the app
export default PaymentsMethods;
