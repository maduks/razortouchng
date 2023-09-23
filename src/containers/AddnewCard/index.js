//import liraries
import React, { Component, useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Keyboard, Dimensions, KeyboardAvoidingView } from 'react-native';
import colors from '../../assets/color';
import FontText from '../../Components/common/FontText';
import Input from '../../Components/common/Input';
import SvgIcons from '../../assets/SvgIcons';
import { hp, wp, normalize, isIOS, isAndroid } from '../../styles/responsiveScreen';
import SucessFullCard, {
  routeName as SucessFullcardRouteName,
} from '../SucessFullcard';
import BackHeader from '../../Components/BackHeader';
import SmartScrollView from '../../Components/SmartScrollView';
import { useTranslation } from 'react-i18next';
import BigButton from '../../Components/BigButton';
import { ScrollView } from 'react-native-gesture-handler';
import globals from '../../assets/globals';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
export const routeName = 'AddNewCard';
const { width, height } = Dimensions.get('screen')
// create a component
const AddNewCard = ({ navigation, route }) => {
  console.log('Route...........', route);

  const ref_input2 = useRef();
  const ref_input3 = useRef();
  const ref_input4 = useRef();
  const ref_input5 = useRef();
  const [Submit, setSubmit] = useState(false);
  const [Bankname, setname] = useState('');
  const [cardholdername, setcardname] = useState('');
  const [cardnumber, setcardnumber] = useState('');
  const [carddate, setdate] = useState('');
  const [cardcvc, setcvc] = useState('');

  const { t } = useTranslation();

  const limitLength = (string, maxLength) => string.substr(0, maxLength);
  const removeNonNumber = string => string.replace(/[^\d]/g, '');

  const addGaps = (string, gaps) => {
    const offsets = [0].concat(gaps).concat([string.length]);

    return offsets
      .map((end, index) => {
        if (index === 0) return '';
        const start = offsets[index - 1];
        return string.substr(start, end - start);
      })
      .filter(part => part !== '')
      .join(' ');
  };

  const onCardNoHandler = number => {
    const card = { gaps: [4, 8, 12], lengths: [16] };
    const numberSanitized = removeNonNumber(number);
    const maxLength = card.lengths[card.lengths.length - 1];
    const lengthSanitized = limitLength(numberSanitized, maxLength);
    const formatted = addGaps(lengthSanitized, card.gaps);

    return setcardnumber(formatted);
  };

  const onExpiryDateHandler = date => {
    const sanitized = limitLength(removeNonNumber(date), 4);
    const reg = /^[2-9]$/;
    if (reg.test(sanitized)) {
      return setdate(`0${sanitized}`);
    }
    if (sanitized.length > 2) {
      return setdate(
        `${sanitized.substr(0, 2)}/${sanitized.substr(2, sanitized.length)}`,
      );
    }
    return setdate(sanitized);
  };

  useEffect(() => {
    validateDate(carddate);
  }, [carddate]);

  const validateDate = text => {
    if (carddate.length == 2) {
      let str = carddate.concat('/');
      setdate(str);
    } else {
      setdate(text);
    }
  };


  const validateCVC = text => {
    if (cardcvc.length < 3 || cardcvc > 3) {
      setcvc(text);
    } else {
      setcvc(text);
    }
  };



  const validateCard = text => {
    console.log(cardnumber.includes(' '));
    if (cardnumber.includes(' ')) {
      setcardnumber(text);
    } else if (text.length == 4) {
      var temp = ' ';
      let str = text.concat(temp);
      setcardnumber(str);
    } else if (text.length == 8) {
      var temp = ' ';
      let str = text.concat(temp);
      setcardnumber(str);
    } else {
      setcardnumber(text);
    }
  };


  const CVC_Error = Submit && cardcvc.length == 0;
  const Card_Error = Submit && cardnumber.length == 0;
  const Bank_Error = Submit && Bankname.length == 0;
  const Date_Error = Submit && carddate.length == 0;
  const CardHolder_Error = Submit && cardholdername.length == 0;
  const AllField =
  cardnumber.length != 0 &&
  Bankname.length != 0 &&
  carddate.length != 0 &&
  cardholdername.length != 0;

  const submit = () => {
    setSubmit(true)

    if(AllField){
     

        let user_id= ""
         AsyncStorage.getItem('userData').then(
          (value) =>{
            // AsyncStorage returns a promise
            
            const user = JSON.parse(value);
            user_id =user.id;
            
            
       
     
          const url = globals.base_url + "addcards";
          const configurationObject = {
            url: url,
            method: "POST",
            data: { user_id:user_id, card_number:cardnumber,bank:Bankname,valid:carddate,card_name:cardholdername,cvc:cardcvc },
          };
          axios(configurationObject)
          .then(function (response) {
            AsyncStorage.setItem('userCardData',  JSON.stringify(response.data));
            navigation.navigate(SucessFullcardRouteName)
          })
          .catch(function (error) {
            // handle error
           alert(JSON.stringify(error.response.data))
          })
          .finally(function () {
    
          });
        } ); 
    }
    else{
      null
    }
   // {AllField ? navigation.navigate(SucessFullcardRouteName) : null}
  };


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        keyboardVerticalOffset={Platform.select({ios: 0, android: 100})}>
      {/* <SmartScrollView
        alwaysBounceVertical={false}
        showsVerticalScrollIndicator={false}
        applyKeyboardCheck={isIOS}
        contentContainerStyle={{ paddingVertical: hp(0), paddingHorizontal: wp(2), backgroundColor: "#ffffff", flex: 1 }}
      > */}

            <BackHeader
              title={t('NEW_CARD')}
              titleColor="violet"
              BackonPress={() => navigation.goBack()}
            />
            <ScrollView showsVerticalScrollIndicator = {false} bounces ={false}>
        <View style={styles.container}>

            <View style={styles.Bank}>
              <FontText
                size={normalize(16)}
                name={'poppins-medium'}
                style={styles.supportview}
                pLeft={wp(6)}>
                {t('CARD_NO')}
              </FontText>
            </View>

            <Input
              keyboardType={'numeric'}
              maxLength={16}
              onChangeText={onCardNoHandler}
              placeholder={'0000 0000 0000 0000'}
              fontName={'poppins-regular'}
              style={styles.input}
              height={hp(6)}
              width={wp(90)}
              returnKeyType="next"
              onSubmit={() => {
                ref_input2.current.focus();
                Keyboard.dismiss()
              }}
              inputStyle={{
                borderRadius: 10,
                color: 'black',
                paddingLeft: wp(3),
                backgroundColor: colors.viewcolor,
              }}
              withrighticon
              righticon={
                <SvgIcons.Card
                  height={hp(2.5)}
                  width={hp(2.5)}
                  style={{ margin: wp(3) }}
                />
              }
            />

            <View style={styles.ErrorView}>
              <FontText
                size={normalize(14)}
                pLeft={width * 0.02}
                name={'poppins-regular'}
                style={{ color: '#ff0000' }}>
                {Card_Error && t('PLEASE_CARD')}
              </FontText>
            </View>

            <View style={styles.Bank}>
              <FontText
                size={normalize(16)}
                name={'poppins-medium'}
                style={styles.supportview}
                pLeft={wp(6)}>
                {t('BANK_NAME')}
              </FontText>
              <Input
                ref={ref_input2}
                placeholder={t('ENTER_BANK_NAME')}
                maxLength={25}
                returnKeyType="next"
                onSubmit={() => {
                  ref_input3.current.focus();
                  Keyboard.dismiss()
                }}
                inputStyle={{
                  backgroundColor: colors.viewcolor,
                  borderRadius: 10,
                  color: 'black',
                  paddingLeft: wp(3),
                }}
                placeholderTextColor={'lightVoilet'}
                onChangeText={setname}
                fontName={'poppins-regular'}
                style={styles.input}
                height={hp(6)}
                width={wp(90)}></Input>
              <View style={styles.ErrorView}>
                <FontText
                  size={normalize(14)}
                  pLeft={width * 0.02}
                  name={'poppins-regular'}
                  style={{ color: '#ff0000' }}>
                  {Bank_Error && t('PLEASE_BANK')}
                </FontText>
              </View>
            </View>

            <View style={styles.Bank}>
              <FontText
                size={normalize(16)}
                maxLength={5}
                name={'poppins-medium'}
                style={styles.supportview}
                pLeft={wp(6)}>
                {t('VALID')}
              </FontText>
              <Input
                maxLength={5}
                keyboardType={'numeric'}
                inputStyle={{
                  backgroundColor: colors.viewcolor,
                  borderRadius: 10,
                  color: 'black',
                  paddingLeft: wp(3),
                }}
                value={carddate}
                ref={ref_input3}
                onChangeText={val => {
                  validateDate(val);
                }}
                returnKeyType="next"
                onSubmit={() => {
                  ref_input4.current.focus();
                }}
                placeholder={'MM/YY'}
                style={styles.input}
                height={hp(6)}
                width={wp(90)}
                withrighticon
                righticon={
                  <SvgIcons.Calanderblack
                    height={hp(3.5)}
                    width={hp(3.5)}
                    style={{ margin: wp(4) }}
                  />
                }
              />
              <View style={styles.ErrorView}>
                <FontText
                  size={normalize(14)}
                  pLeft={width * 0.02}
                  name={'poppins-regular'}
                  style={{ color: '#ff0000' }}>
                  {Date_Error && t('PLEASE_EXP')}
                </FontText>
              </View>
            
            </View>

            <View style={styles.Bank}>
              <FontText
                size={normalize(16)}
                name={'poppins-medium'}
                style={styles.supportview}
                pLeft={wp(6)}>
                {t('CARD_HOL_NAME')}
              </FontText>
              <Input
                ref={ref_input4}
                placeholder={t('ENTER_FULL_NAME')}
                maxLength={24}
                returnKeyType="done"
                onSubmit={() => {
                  ref_input5.current.focus();
                }}
                inputStyle={{
                  backgroundColor: colors.viewcolor,
                  borderRadius: 10,
                  color: 'black',
                  paddingLeft: wp(3),
                }}
                placeholderTextColor={'lightVoilet'}
                onChangeText={setcardname}
                fontName={'poppins-regular'}
                style={styles.input}
                height={hp(6)}
                width={wp(90)}></Input>
              <View style={styles.ErrorView}>
                <FontText
                  size={normalize(14)}
                  pLeft={width * 0.02}
                  name={'poppins-regular'}
                  style={{ color: '#ff0000' }}>
                  {CardHolder_Error && t('PLZ_FULL_NAME')}
                </FontText>
              </View>
            </View>


            <Input
                maxLength={5}
                keyboardType={'numeric'}
                inputStyle={{
                  backgroundColor: colors.viewcolor,
                  borderRadius: 10,
                  color: 'black',
                  paddingLeft: wp(3),
                }}
                value={cardcvc}
                ref={ref_input5}
                onChangeText={val => {
                  validateCVC(val);
                }}
                returnKeyType="next"
                onSubmit={() => {
                  ref_input4.current.blur();
                  Keyboard.dismiss()
                 
                }}
                placeholder={'cvc'}
                style={styles.input}
                height={hp(6)}
                width={wp(90)}
                withrighticon
                righticon={
                  <SvgIcons.Calanderblack
                    height={hp(3.5)}
                    width={hp(3.5)}
                    style={{ margin: wp(4) }}
                  />
                }
              />
              <View style={styles.ErrorView}>
                <FontText
                  size={normalize(14)}
                  pLeft={width * 0.02}
                  name={'poppins-regular'}
                  style={{ color: '#ff0000' }}>
                  {CVC_Error && t('CVC Number')}
                </FontText>
              </View>
          </View>

          <View style={styles.btn}>
          <BigButton title={t('SAVE_CARD')} onClick={() => submit()} />
        </View>
          </ScrollView>


        </KeyboardAvoidingView>

      {/* </SmartScrollView> */}

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
  supportview: {
    marginTop: hp(3),
    marginBottom: hp(1),
  },
  input: {
    marginHorizontal: hp(2),
  },
  mainview: {
    marginTop: hp(4),
  },
  btn: {marginTop:height > 767 ? '30%' : '15%', marginBottom: hp(5), alignItems: 'center', alignSelf: 'center' },
  ErrorView: {  marginLeft:wp(3)},
});

//make this component available to the app
export default AddNewCard;
