import React, { Component, useState, useRef, useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Modal,
  Dimensions,
} from 'react-native';
import { hp, wp, normalize, isX, isAndroid } from '../../styles/responsiveScreen';
import { SafeAreaView } from 'react-native-safe-area-context';
import fonts from '../../assets/fonts';

import Button from '../../Components/common/Button';
import colors from '../../assets/color';
import FontText from '../../Components/common/FontText';
import BackHeader from '../../Components/BackHeader';
import { useTranslation } from 'react-i18next';
import { Paystack, paystackProps } from 'react-native-paystack-webview';
import AsyncStorage from '@react-native-async-storage/async-storage';
import globals from '../../assets/globals';
import { useNavigation } from '@react-navigation/core';
// import PaymentSuccess, {
//   routeName as PaymentSuccessRouteName,
// } from './PaymentSucces';
import TransactionLists, {
  routeName as TransactionListsRouteName,
} from '../TransactionLists/index';
const { width, height } = Dimensions.get('screen');
// @ts-ignore
import axios from 'axios';
import TitleSubTitle from '../../Components/TitleSubTitle';
import SucessFullDefault from '../../Components/SucessFullDefault/SucessFullDefault';
import SvgIcons from '../../assets/SvgIcons';
import { ALERT_TYPE, Dialog, Root, Toast } from 'react-native-alert-notification';
import { PayWithFlutterwave } from 'flutterwave-react-native';
export const routeName = 'OrderSummaryCoupan';
const OrderSumCoupan = props => {

  const { t } = useTranslation();
  //const { total } = props.route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [total, setTotal] = useState(0);
  const [UserId, setUserId] = useState("");
  const [bookingId, setBookingId] = useState("");
  const [transactsuccess, setTransactSuccess] = useState(false);


  const [transacticon, setTransactIcon] = useState('');
  const [transacttitle, setTransactTitle] = useState('');
  const [processing, setProcessing] = useState(true);

  const navigation = useNavigation();
  //let Bool = props?tu.route?.params?.Btn;
  //const { professional } = props.route.params;
  const modalizeRef = useRef();
  // const { gender } = props.route.params;
  //const { dates } = props.route.params;
  //const { time } = props.route.params;
  //const { price } = props.route.params;
  //const { vat } = props.route.params;
  //const { discount } = props.route.params;
  //const { phone } = props.route.params;
  //const { service } = props.route.params;
  //const { refcoupon } = props.route.params;
  //const { location } = props.route.params;
  const paystackWebViewRef = useRef(paystackProps.PayStackRef);

  const onOpen = () => {
    modalizeRef.current.open();
  }
  const cancelOrder = () => {
    AsyncStorage.removeItem('cart')
    AsyncStorage.removeItem('validCoupon')
    navigation.navigate('Home')
  }

  //const ref = useRef(null);
  const saveTransaction = () => {
    setProcessing(true)
    AsyncStorage.getItem('UserPhoneData').then(
      async (value) => {
        // AsyncStorage returns a promise
        if (value != null) {
          const user = JSON.parse(value);


          let currentCart = await AsyncStorage.getItem("cart");
          currentCart = JSON.parse(currentCart)

          currentCart.map((item) => {


            const url = globals.base_url + "addtransactions";
            const configurationObject = {
              url: url,
              method: "POST",
              data: {
                userid: UserId,
                refcoupon: item.refcoupon,
                service: item.service,
                amount: item.total,
                dates: item.dates + " " + item.time,
                name: name,
                user_id: UserId,
                phone: JSON.stringify(user),
                time_: item.time,
                status: "Active",
                vat: item.vat,
                total: item.total,
                price: item.price,
                discount: item.discount,
                date_: item.dates,
                sex: item.gender == 1 ? "Male" : "Female",
                professional: item.professional,
                service: item.service,
                address: item.location
              },
            };

            axios(configurationObject)
              .then(function (response) {
                //alert(JSON.stringify(response.data))
                AsyncStorage.removeItem('cart')
                AsyncStorage.removeItem('validCoupon')
                setProcessing(false)
                setBookingId(response.data);
                setTransactSuccess(true);
              })
              .catch(function (error) {
                // handle error
                alert('An error occurred' + JSON.stringify(error.response.data))
                setProcessing(false)
              })

          })

        }
        else {
          Dialog.show({
            type: ALERT_TYPE.WARNING,
            title: 'Opps!',
            textBody: "Kindly go to the settings page and update your profile phone number to enable you make bookings. Thank you",
            button: 'ok',
          })
        }

        // Setting the value in Text
      });


  }

  const saveBooking = () => {
    const url = globals.base_url + "addbookings";
    const configurationObject = {
      url: url,
      method: "POST",
      data: {},
    };

    axios(configurationObject)
      .then(function (response) {
        //alert(JSON.stringify(response.data))
        setBookingId(response.data);
        setTransactSuccess(true);
        setProcessing(false)
      })
      .catch(function (error) {
        // handle error
        alert("An errr occured");
        setProcessing(false)
      })
      .finally(function () {
        // always executed

      });
  }

  const onClose = () => {
    modalizeRef.current.close();
  }
  interface RedirectParams {
    status: 'successful' | 'cancelled';
    transaction_id?: string;
    tx_ref: string;
  }

  /* An example function called when transaction is completed successfully or canceled */
  const handleOnRedirect = (data: RedirectParams) => {
    if (data.status == "completed") {
      setProcessing(false)
      saveTransaction()
    }
    else if (data.status == "successful") {
      setProcessing(false)
      saveTransaction()
    }
    else {
      setProcessing(false)

    }

    console.log("success" + data.status);
  };

  /* An example function to generate a random transaction reference */
  const generateTransactionRef = (length) => {
    var result = '';
    var characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return `flw_tx_ref_${result}`;
  };


  useEffect(async () => {

    const { total } = props.route.params;
    setTotal(total)
    AsyncStorage.getItem('userData').then(
      (value) => {
        // AsyncStorage returns a promise
        if (value != null) {
          const user = JSON.parse(value);
          setName(user.name);
          setEmail(user.email)
          setUserId(user.id)
          console.log("phone  email " + user.email + " " + user.id)
        }

      });

  }, []);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView>
        <View
          style={styles.back}>
          {/* <BackHeader
            style={{ marginHorizontal: wp(2) }}
            title={t('SUMMARY')}
            titleColor="violet"
            BackonPress={() => {
              props.navigation.pop();

            }}
          /> */}

          <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>

            <ScrollView style={{ bottom: hp(0) }}>
              {transactsuccess === true ?
                <View style={{ flex: 1, height: '100%', backgroundColor: colors.white }}>
                  <View style={{ backgroundColor: colors.theme, height: hp(1) }} />
                  <View style={{ height: '45%' }}>
                    {/* Cross Image */}
                    <TouchableOpacity
                      style={styles.cross}
                      onPress={props.closeModal}>

                    </TouchableOpacity>
                    <SucessFullDefault Title={t('Yay! Booking Sucessfully Placed.')} />

                    {/* <Dashed width={wp(2)} ContainerStyle={{ width: wp(90), alignSelf: 'center' }} /> */}
                    <View
                      style={{ flexDirection: 'row', justifyContent: 'space-around' }}>

                    </View>
                    {/* <Dashed width={wp(3)} ContainerStyle={{ width: wp(90), alignSelf: 'center', marginVertical: hp(1) }} /> */}
                  </View>
                  <View style={{ height: '45%' }}>
                    <View style={[styles.itemView1, { marginTop: height < 767 ? hp(2) : hp(0) }]}>

                      <View style={styles.round1}>

                      </View>
                    </View>



                  </View>

                  <View
                    style={styles.homebtn}>
                    <Button
                      onPress={() => navigation.navigate('Blog')}
                      position="rowCenter"
                      height={isX ? hp(6.5) : hp(8)}
                      width={wp(50)}
                      style={styles.mainbtn}>
                      <FontText
                        name={'poppins-medium'}
                        size={normalize(16)}
                        textAlign={'center'}>
                        {t('Your Transaction')}
                      </FontText>
                    </Button>

                    <Button
                      position="rowCenter"
                      height={isX ? hp(6.5) : hp(8)}
                      width={wp(50)}
                      style={styles.backbtn}>
                      <FontText
                        name={'poppins-medium'}
                        size={normalize(16)}
                        textAlign={'center'}
                        color={'white'}>
                        {'Booking Id:'} {bookingId}
                      </FontText>
                    </Button>
                  </View>

                </View> :

                processing ? <View style={{
                  flex: 1,
                  marginTop: hp(0),
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <SvgIcons.Filter height={wp(40)} width={wp(40)} />

                  <View
                    style={{
                      flexDirection: 'column',
                      justifyContent: 'center',
                      paddingHorizontal: wp(2),
                      alignItems: 'center',

                      //paddingVertical: hp(2),
                    }}>
                    <SvgIcons.InfoCircle height={wp(20)} width={wp(20)} />

                    <TitleSubTitle
                      name={'poppins-medium'}
                      Textstyle={{ fontWeight: '800', paddingBottom: hp(1) }}
                      Title={'PAYMENT'}
                      SubTitle={' While making payment, You can click on the "Change Payment Method" at the bottom of the PAYMENT SCREEN, if your card is rejected. Then select Bank Transfer or USSD.'}
                      textalign={'center'}
                    />
                  </View>
                </View> : <View style={{
                  flex: 1,
                  marginTop: hp(3),
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <SvgIcons.SadEmoji height={wp(40)} width={wp(40)} />

                  <View
                    style={{
                      justifyContent: 'center',
                      paddingHorizontal: wp(2),
                      // paddingVertical: hp(2),
                    }}>

                    <TitleSubTitle
                      name={'poppins-medium'}
                      Textstyle={{ fontWeight: '700', width: wp(85), paddingBottom: hp(1.5) }}
                      Title={"Couldn't process payment at the moment, please try again"}
                      textalign={'center'}
                    />

                    {/* <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                      <Button
                        onPress={() => navigation.goBack()}

                        height={isX ? hp(6.5) : hp(8)}

                        style={{
                          backgroundColor: colors.theme,
                          borderRadius: 14,
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          marginBottom: hp(0),
                          marginLeft: 20,
                          marginRight: 20


                        }}>
                        <FontText
                          name={'poppins-medium'}
                          size={normalize(16)}
                          color={'white'}
                          textAlign={'center'}>
                          {t('Go back')}
                        </FontText>
                      </Button>
                    </View> */}
                  </View>

                </View>
              }
            </ScrollView>
            {
              transactsuccess != true ?
                <View>
                  <TouchableOpacity style={{
                    padding: 20, borderRadius: 10, margin: 10, backgroundColor: colors.theme,
                  }} onPress={() => paystackWebViewRef.current.startTransaction()}>
                    <Text style={{ color: '#fff', textAlign: 'center' }}>Pay With Paystack</Text>
                  </TouchableOpacity>
                  <PayWithFlutterwave
                    onRedirect={handleOnRedirect}
                    style={{
                      margin: 10

                    }}
                    options={{
                      tx_ref: generateTransactionRef(10),
                      authorization: 'FLWPUBK-ef8df844238374aa49e47a6b2ad8946b-X',
                      customer: {
                        email: email
                      },
                      amount: total,
                      currency: 'NGN',
                      payment_options: 'banktransfer',
                    }}
                  />
                  <TouchableOpacity style={{ padding: 20, borderRadius: 10, margin: 10, backgroundColor: colors.theme, }} onPress={() => cancelOrder()}>
                    <Text style={{ color: '#fff', textAlign: 'center' }}>Cancel Booking</Text>
                  </TouchableOpacity>
                </View> : null


            }

            {/* <SucessFullDefault Title={t('Couldnt process payment at the moment, please try again')} /> */}
            {transactsuccess != true ?
              <View style={{
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {/* FLWPUBK_TEST-d12535a8035d0022eac35dd399f53de5-X */}

                <View style={{ width: '100%', marginLeft: 20, marginRight: 20 }}>
                  <Paystack
                    paystackKey="pk_live_91a797181ccefb96d68dd89c9e11ff976f305dd1"
                    billingEmail={email}
                    amount={total}
                    channels={['bank', 'ussd', 'bank_transfer']}
                    onCancel={(e) => {
                      // handle response here
                    }}
                    onSuccess={(res) => {
                      setProcessing(false)
                      saveTransaction();
                    }}
                    ref={paystackWebViewRef}
                  />

                  {/* <TouchableOpacity style={{
                    backgroundColor: colors.theme,
                    borderRadius: 10,
                    alignSelf: 'center',
                    width: '100%',
                    padding: 21
                  }} onPress={() => paystackWebViewRef.current.startTransaction()}>
                    <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 15, textAlign: 'center' }}>Pay With Paystack</Text>
                  </TouchableOpacity> */}
                </View>
                {/* <Paystack
            paystackKey="pk_live_91a797181ccefb96d68dd89c9e11ff976f305dd1"
            amount={total}
            billingEmail={email}
            billingName={name}
            billingMobile={phone}
            handleWebViewMessage={() => alert('hi')}
            activityIndicatorColor='red'
            channels={['card', 'bank', 'ussd', 'bank_transfer']}
            onCancel={(e) => {
              setProcessing(false)
              // navigation.navigate('Home')
            }}
            // onSuccess={async (response) => {
            //   alert('hmmm')
            //   console.log("SUCCESS CallBack : ", response)
            // }}
            onSuccess={(res) => {
              // handle response here
              //saveBooking();
              setProcessing(false)
              saveTransaction();
            }}
            autoStart={false}
          /> */}




              </View> : null}
          </SafeAreaView>

          {/* pk_test_4dcb8ae95c018e4cbef4168f2a5e686034f5776b */}
          {/* pk_live_91a797181ccefb96d68dd89c9e11ff976f305dd1 */}
        </View>


      </ScrollView>
    </SafeAreaView>
  );
};

export default OrderSumCoupan;

const styles = StyleSheet.create({
  safe: { backgroundColor: colors.white, flex: 1 },
  back: {
    flex: 1,
    marginHorizontal: wp(0)
  },
  progress: {
    marginHorizontal: wp(3),
    height: hp(1),
    borderRadius: 14,
    marginTop: hp(0),
  },
  itemView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: wp(5)
  },
  itemView1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: wp(3),
  },
  locimg: {
    height: wp(7),
    width: wp(7),
    marginTop: hp(1),
    marginLeft: wp(3),
  },
  rec: {
    height: hp(7),
    width: wp(90),
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: hp(2),
    backgroundColor: colors.lighttheme,
    borderRadius: 7,
    marginLeft: wp(0),
  },
  img2: {
    height: wp(7),
    width: wp(7),
    marginLeft: wp(4),
    alignSelf: 'center',
    alignItems: 'center',
  },
  round: {
    height: wp(2),
    width: wp(2),
    borderRadius: 50,
    backgroundColor: colors.theme,
  },
  border: {
    borderColor: colors['violet'],
    borderWidth: 0.3,
    marginTop: hp(1),
    opacity: 0.3,
    width: wp(87),
    alignSelf: 'center',
    backgroundColor: 'black',
  },
  progressBar: {
    width: width * 0.95,
    alignSelf: 'center',
  },
  round1: {
    height: wp(8),
    width: wp(8),
    borderRadius: 50,
    marginBottom: hp(1),
    lineHeight: 20,
    backgroundColor: colors.lighttheme,
  },
  coupan: {
    width: wp(100),
    backgroundColor: '#B9BBFF30',
    height: hp(0.8),
    marginTop: hp(2),
    marginLeft: wp(0)
  },
  total: {
    width: wp(100),
    height: hp(1),
    backgroundColor: '#B9BBFF',
    marginTop: hp(3),
    marginLeft: wp(-3),
    opacity: 0.2,
  },
  line1: {
    height: hp(6),
    borderWidth: 0.5,
    opacity: 0.5,
    borderColor: colors['lightViolet'],
    marginTop: hp(2.5),
  },
  itemView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemView1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: wp(4),
  },
  border: {
    borderColor: colors['violet'],
    borderWidth: 0.3,
    marginTop: hp(1),
    opacity: 0.3,
    width: wp(92),
    alignSelf: 'center',
    backgroundColor: "#000000"
  },
  round1: {
    height: wp(8),
    width: wp(8),
    borderRadius: 50,
    marginTop: hp(2),
    lineHeight: 20,
    backgroundColor: colors.lighttheme,
  },
  rec1: {
    marginTop: hp(2),
    backgroundColor: '#E8F8F6',
    borderStyle: 'dashed',
    borderColor: colors.green,
    borderWidth: 2,
    height: hp(7),
    width: wp(90),
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 14,
    marginBottom: hp(10),
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
  backbtn: {
    borderRadius: 14,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp(0),
    alignSelf: 'center',
    position: 'absolute',
    bottom: wp(0),
    marginLeft: wp(-3),
  },
  mainbtn: {
    backgroundColor: colors.theme,
    borderRadius: 14,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp(0),
    position: 'absolute',
    bottom: wp(0),
    marginLeft: wp(45),
  },
  cross:
  {
    width: wp(10),
    height: wp(10),
    alignSelf: 'flex-end',
    marginRight: wp(1),
    alignItems: 'center',
    justifyContent: 'center',
  },
  homebtn: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    height: '4%',
    bottom: hp(0),
    marginBottom: hp(8),
  },

  btnView: { justifyContent: 'flex-end', flex: 1, marginBottom: height < 767 ? hp(4) : hp(0) }
});
