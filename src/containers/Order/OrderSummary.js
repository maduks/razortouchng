import React, { Component, useState, useEffect, useRef } from 'react';
import { useHeaderHeight } from "@react-navigation/elements"

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  View,
  StyleSheet,
  Image,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  Modal,
  Dimensions,
  I18nManager,
  Text,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback
} from 'react-native';
import {
  hp,
  wp,
  normalize,
  isIOS,
  isX,
  isAndroid,
} from '../../styles/responsiveScreen';
import { SafeAreaView } from 'react-native-safe-area-context';
import fonts from '../../assets/fonts';
import colors from '../../assets/color';
import { ProgressBar, Colors } from 'react-native-paper';
import FontText from '../../Components/common/FontText';
import ImageSlider from '../../Components/ImageSlider/ImageSlider';
import Button from '../../Components/common/Button';
import BackHeader from '../../Components/BackHeader';
import OrderSumCoupan, {
  routeName as OrderSumCoupanRouteName,
} from './OrderSumCoupan';
import { useTranslation } from 'react-i18next';
import BigButton from '../../Components/BigButton';
import Details from '../../Components/common/Appoinment_Detail/Details';
import Price from '../../Components/common/Appoinment_Detail/Price';
import axios from 'axios';
const { width, height } = Dimensions.get('screen');
export const routeName = 'OrderSummary';
import PaymentPop from './PaymentPop';
import globals from '../../assets/globals';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  BarIndicator,

} from 'react-native-indicators';
const OrderSummary = (props) => {
  const ref = useRef(null);
  const [showPayment, setShowPayment] = useState(false);
  const headerHeight = useHeaderHeight();
  const { t } = useTranslation();
  const { navigation } = props;
  const { odata } = props.route.params;
  const { gender } = props.route.params;
  const { dates } = props.route.params;
  const { time } = props.route.params;
  const { price } = props.route.params;
  const { service } = props.route.params;
  const { location } = props.route.params;
  const [couponDiscount, setcouponDiscount] = useState(0);
  const [refcoupondiscount, setRefCouponDiscount] = useState(0);
  const [validcoupon, setValidCoupon] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [phone, setPhone] = useState("");
  const [refcouponCode, setRefCouponCode] = useState("");
  const [disable, setDisable] = useState(false);
  const [userid, setUserId] = useState('');
  const [checkingref, setCheckingRef] = useState(true);
  let [prices, setPrices] = useState(price)
  const [total, setTotal] = useState(0);
  const [vat, setVat] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [cart, setCart] = useState([])

  const osdata = {
    odata: odata,
    gender: gender,
    location: location,
    dates: dates,
    time: time,
    price: prices,
    service: service
  }
  const modalizeRef = useRef();
  const OpenModel = () => {
    setModalVisible({ data: osdata }, !modalVisible);
  };

  const checkcoupon = (dis) => {
    AsyncStorage.getItem('userData').then(
      (value) => {
        // AsyncStorage returns a promise
        //alert(user.name);
        if (value != null) {
          const user = JSON.parse(value);
          const url = globals.base_url + "coupons/" + dis.toLowerCase() + "/" + user.id;
          axios
            .get(url, {
              headers: {
                "Content-type": "application/json",
                "Accept": "application/json"
              }
            })
            .then(function (response) {
              const validCoupons = JSON.parse(JSON.stringify(response.data));
              console.log(validCoupons);
              if (validCoupons > 0) {
                AsyncStorage.setItem('validCoupon', JSON.stringify(validCoupons))
                setValidCoupon("true")
                console.log(prices)
                if (total.toString().includes(',')) {
                  let dis = ((parseInt(validCoupons) * parseInt(total.replace(/,/g, ''))) / 100)
                  let pr = parseInt(total.replace(/,/g, '')) - parseInt(dis)
                  setPrices(pr)
                  setDisable(true)
                  setCouponCode(dis)
                  setcouponDiscount("-" + dis)
                  setTotal(parseInt(vat) + parseInt(pr))
                }
                else {
                  let dis = ((parseInt(validCoupons) * parseInt(total)) / 100)
                  let pr = parseInt(total) - parseInt(dis)
                  setPrices(pr)
                  setDisable(true)
                  setCouponCode(dis)
                  setcouponDiscount("-" + dis)
                  setTotal(parseInt(vat) + parseInt(pr))
                }
              }
              else {
                setValidCoupon("false")
                //alert(validcoupon)
              }
            })
            .catch(function (error) {
              // handle error
              alert(" Input coupon please" + error.message);
            })
        }
      });



  }

  const cancelOrder = () => {
    AsyncStorage.removeItem('cart')
    AsyncStorage.removeItem('validCoupon')
    navigation.navigate('Home')
  }

  const checkRefCoupon = (dis, totals) => {
    const url = globals.base_url + "refcoupons/" + dis;

    axios
      .get(url, {
        headers: {
          "Content-type": "application/json",
          "Accept": "application/json"
        }
      })
      .then(function (response) {

        const validCoupons = JSON.parse(JSON.stringify(response.data));

        console.log(validCoupons)

        if (validCoupons) {

          setRefCouponCode(validCoupons[0].coupon)
          setRefCouponDiscount("Congrats!! REFERRAL DISCOUNT APPLIED, Keep referring to enjoy more discounts")
          setCheckingRef(false)
          AsyncStorage.setItem('validRefCoupon', JSON.stringify(validCoupons[0].percentage))
          setValidCoupon("true")
          console.log(prices)
          if (totals.toString().includes(',')) {
            let dis = ((parseInt(validCoupons[0].percentage) * parseInt(totals.replace(/,/g, ''))) / 100)
            let pr = parseInt(totals.replace(/,/g, '')) - parseInt(dis)
            setPrices(pr)
            setDisable(true)
            setCouponCode(dis)
            setcouponDiscount("-" + dis)
            setTotal(parseInt(vat) + parseInt(pr))
          }
          else {
            let dis = ((parseInt(validCoupons[0].percentage) * parseInt(totals)) / 100)
            let pr = parseInt(totals) - parseInt(dis)
            setPrices(pr)
            setDisable(true)
            setCouponCode(dis)
            setcouponDiscount("-" + dis)
            setTotal(parseInt(vat) + parseInt(pr))
          }


          // if (prices.toString().includes(',')) {
          //   let dis = ((parseInt(validCoupons[0].percentage) * parseInt(prices.replace(/,/g, ''))) / 100)
          //   let pr = parseInt(prices.replace(/,/g, '')) - parseInt(dis)
          //   setPrices(pr)
          //   //setDisable(true)
          //   setCouponCode(dis)
          //   setcouponDiscount(dis)
          //   setTotal(parseInt(vat) + parseInt(pr))
          //   setcouponDiscount(parseInt(dis))

          // }
          // else {
          //   let dis = ((parseInt(10) * parseInt(prices)) / 100)
          //   let pr = parseInt(prices) - parseInt(dis)
          //   setPrices(pr)
          //   //setDisable(true)
          //   setCouponCode(dis)
          //   setcouponDiscount(dis)
          //   setTotal(parseInt(vat) + parseInt(pr))
          //   setcouponDiscount(parseInt(dis))
          // }
        }
        else if (validCoupons == 0) {
          setRefCouponDiscount("You've no REFERRAL discount yet!")
          setCheckingRef(false)
        }
        else {
          // setRefCouponDiscount("You've no REFERRAL discount")
          setCheckingRef(false)
        }

        //alert(validCoupon.id)
        //setProfessionals(allProfessionals); 
      })
      .catch(function (error) {
        // handle error
        alert(" Input coupon please" + error);
      })


  }


  proceedCheckOut = async () => {

    let currentCart = await AsyncStorage.getItem("cart");
    currentCart = JSON.parse(currentCart)
    if (currentCart == null) {
      addToCart(current_service, "PAY")
      navigation.navigate(OrderSumCoupanRouteName, {
        total: total
      })
    }
    else {
      navigation.navigate(OrderSumCoupanRouteName, {
        total: total
      })
    }

  }
  const current_service = {
    professional: odata.name,
    site: odata.site,
    total: total,
    gender: gender,
    dates: dates,
    time: time,
    price: prices,
    location: osdata.location,
    vat: vat,
    phone: phone,
    discount: couponDiscount,
    service: service,
    refcoupon: refcouponCode
  }

  continueShopping = () => {

    addToCart(current_service, "HOME")
  }
  addToCartFromPreviousScreen = async (data) => {
    let flag = false;
    let currentCart = await AsyncStorage.getItem("cart");
    currentCart = JSON.parse(currentCart)
    //check for null
    if (currentCart == null) {
      currentCart = []
    }
    currentCart.map((item) => {
      ((item.professional == data.professional && item.service == data.service) && (item.time == data.time && item.dates == data.dates)) ? flag = true : flag = false
    })
    //check if similar service exists or not
    if (flag == true) {
      //alert('Similar service already exist in your cart')
    }
    else {
      currentCart.push(data)
      await AsyncStorage.setItem('cart', JSON.stringify(currentCart))
      // alert('saved')
    }

  }

  removeItemFromCart = async (key) => {
    let currentCart = await AsyncStorage.getItem("cart");
    currentCart = JSON.parse(currentCart)
    currentCart.splice(key, 1)
    await AsyncStorage.setItem('cart', JSON.stringify(currentCart))
    setCart(currentCart)
    setTotalsfn()
  }

  addToCart = async (data, location) => {
    //AsyncStorage.removeItem('cart')
    // AsyncStorage.removeItem('validCoupon')
    navigation.navigate('Home')
    // let flag = false;
    // let currentCart = await AsyncStorage.getItem("cart");
    // currentCart = JSON.parse(currentCart)
    // //alert(JSON.stringify(data))
    // //check for null
    // if (currentCart == null) {
    //   currentCart = []
    // }
    // currentCart.map((item) => {
    //   ((item.professional == data.professional && item.service == data.service) && (item.time == data.time && item.dates == data.dates)) ? flag = true : flag = false
    // })
    // //check if similar service exists or not
    // if (flag == true) {
    //   alert('Similar service already exist in your cart')
    // }
    // else {
    //   currentCart.push(data)
    //   await AsyncStorage.setItem('cart', JSON.stringify(currentCart), () => {
    //     if (location != "PAY") {
    //       navigation.navigate('Home')
    //     }
    //   })
    // }
  }

  setTotalsfn = () => {
    AsyncStorage.getItem('userData').then(
      async (value) => {
        // AsyncStorage returns a promise
        //alert(user.name);
        if (value != null) {
          const user = JSON.parse(value);
          setUserId(user.id)

          setPhone("0" + user.phone)
          // addToCartFromPreviousScreen(current_service, "")
          let currentCart = await AsyncStorage.getItem("cart");
          currentCart = JSON.parse(currentCart)
          setCart(currentCart)

          let totals = 0
          currentCart.map((item) => {
            totals += parseInt(item.price.replace(/,/g, ''))
          })
          setTotal(totals)

          //
          let refCoup = await AsyncStorage.getItem('validRefCoupon')
          // alert(refCoup)
          let coup = await AsyncStorage.getItem('validCoupon')
          let coupon = JSON.parse(coup)


          if (JSON.parse(coup) > 0) {

            if (total.toString().includes(',')) {
              let dis = ((parseInt(coupon) * parseInt(totals.replace(/,/g, ''))) / 100)
              let pr = parseInt(totals.replace(/,/g, '')) - parseInt(dis)
              setPrices(pr)
              setDisable(true)
              setCouponCode(dis)
              setcouponDiscount("-" + dis)
              setTotal(parseInt(vat) + parseInt(pr))
            }
            else {
              let dis = ((parseInt(coupon) * parseInt(totals)) / 100)
              let pr = parseInt(totals) - parseInt(dis)
              setPrices(pr)
              setDisable(true)
              setCouponCode(dis)
              setcouponDiscount("-" + dis)
              setTotal(parseInt(vat) + parseInt(pr))


            }
          }


          // if (JSON.parse(refCoup) > 0) {

          //   if (total.toString().includes(',')) {
          //     let dis = ((parseInt(coupon) * parseInt(totals.replace(/,/g, ''))) / 100)
          //     let pr = parseInt(totals.replace(/,/g, '')) - parseInt(dis)
          //     setPrices(pr)
          //     setDisable(true)
          //     setCouponCode(dis)
          //     setcouponDiscount("-" + dis)
          //     setTotal(parseInt(vat) + parseInt(pr))
          //   }
          //   else {
          //     let dis = ((parseInt(coupon) * parseInt(totals)) / 100)
          //     let pr = parseInt(totals) - parseInt(dis)
          //     setPrices(pr)
          //     setDisable(true)
          //     setCouponCode(dis)
          //     setcouponDiscount("-" + dis)
          //     setTotal(parseInt(vat) + parseInt(pr))


          //   }
          // }

          checkRefCoupon(user.id, totals)

          console.log("total cart is: " + total)
        }
      }, [cart]);
  }

  useEffect(async () => {

    setTotalsfn()






    // if (prices.toString().includes(',')) {
    //   let vt = ((7.5 * prices.replace(/,/g, '')) / 100)
    //   setVat(0)
    //   //alert(vt)
    //   setTotal(parseInt(totals.replace(/,/g, '')))
    // }
    // else {
    //   let vt = ((7.5 * prices) / 100)
    //   setVat(0)
    //   //alert(vt)
    //   setTotal(parseInt(totals))
    // }

    // setTotal(parseInt(parseInt(price) - parseInt(couponDiscount)));
  }, [])
  return (
    <SafeAreaView style={{ backgroundColor: colors.white, flexDirection: 'column', flex: 1, flexGrow: 1 }}>

      <View style={{
        marginHorizontal: wp(3),
        flexDirection: 'column',
        backgroundColor: colors.white,
        flex: 1,
        flexGrow: 1,
        justifyContent: 'center',
      }}>
        {/* <BackHeader
          title={t('SUMMARY')}
          titleColor="violet"
          BackonPress={() => navigation.goBack()}
        /> */}
        <View
          style={styles.progressBar}>
          <ProgressBar
            progress={0.6}
            color={colors.theme}
            style={styles.progress}
          />
        </View>


        <ScrollView style={{ flexDirection: 'column', flex: 1, flexGrow: 1, }} showsVerticalScrollIndicator={true} >

          <View style={{ flex: 1, marginTop: 10, justifyContent: "flex-end" }}>

            {(validcoupon) == "false" || (validcoupon) == "" ?
              <View style={styles.rec1}>
                <View
                  style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

                  <TextInput
                    style={{
                      paddingLeft: wp(5),
                      fontSize: normalize(14),
                      fontFamily: 'poppins',
                      textAlign: I18nManager.isRTL ? 'right' : 'left',
                    }}
                    placeholder={t('Enter Coupon')}
                    onChangeText={(cd) => setCouponCode(cd)}
                    value={couponCode}
                    placeholderTextColor={colors.black}></TextInput>


                  <TouchableOpacity activeOpacity={0.3} style={styles.btn} onPress={() => checkcoupon(couponCode)} >
                    <FontText
                      name={'poppins-medium'}
                      size={normalize(16)}
                      color={'white'}
                      pLeft={wp(10)}>
                      {t('Apply')}
                    </FontText>
                  </TouchableOpacity>

                </View>

              </View> : null
            }

            {validcoupon == "true" ? <FontText style={{ color: 'green', marginLeft: 20, marginBottom: 10 }}>Valid Coupon! Coupon Applied.</FontText> : null}
            {validcoupon == "false" ? <FontText style={{ color: 'red', marginLeft: 20, marginBottom: 10 }}>Invalid Coupon</FontText> : null}


          </View>


          {
            cart?.map((item, key) => {
              return (

                <View style={{ marginTop: 10, borderWidth: 0.5, borderRadius: 10, borderColor: Colors.grey400, paddingLeft: 5, paddingRight: 5 }}>
                  <View style={styles.rec}>

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Image
                        source={require('../../assets/images/Calendar.png')}
                        style={styles.img2}
                      />
                      <FontText
                        name={'poppins-medium'}
                        size={normalize(11)}
                        pLeft={wp(1)}
                        pRight={wp(4)}
                        color={'Violet'}>
                        {item.dates}
                      </FontText>
                      <View style={styles.round} />
                      <Image
                        source={require('../../assets/images/Timesquare.png')}
                        style={styles.img2}
                      />

                      <FontText
                        style={{ flex: 2 }}
                        name={'poppins-medium'}
                        size={normalize(12)}
                        pLeft={wp(1)}
                        color={'Violet'}>
                        {item.time}
                      </FontText>
                      <TouchableOpacity onPress={() => removeItemFromCart(key)} style={{ marginRight: 4, flex: 1, padding: 5, backgroundColor: Colors.red400, borderRadius: 6, alignItems: 'center' }}>
                        <Text style={{ textAlign: 'center', color: 'white', fontWeight: '500', fontSize: 15 }}>Remove</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={[styles.border, { marginTop: hp(1) }]}></View>
                  <Price Title={t('GENDER_TYPE')} Price={item.gender == 1 ? "Male" : "Female"}
                    TextStyle={{ marginVertical: hp(0.5) }} Font={normalize(11)} Border={true} />
                  <Price Title={t('Service')} Price={item.service}
                    TextStyle={{ marginVertical: hp(0.5) }} Font={normalize(11)} Border={true} />
                  <Price Title={t('Service Cost')} Price={"₦" + item.price}
                    TextStyle={{ marginVertical: hp(0.5) }} Font={normalize(11)} Border={true} />
                  <Price Title={t('Booking With')} Price={item.professional}
                    TextStyle={{ marginVertical: hp(0.5) }} Font={normalize(11)} Border={true} />

                  {item.location !== "" ? <Price Title={t('Location')} Font={normalize(11)} Price={"" + item.location} Border={false} /> : <Price Title={t('Location')} Font={normalize(11)} Price={"" + item.site} Border={false} />}


                </View>

              )

            })

          }

        </ScrollView>
        <View style={{ flexDirection: 'column', height: 150 }}>

        </View>
        <View style={{ flex: 2, position: 'absolute', bottom: 0, backgroundColor: 'white', width: '100%' }}>
          {checkingref ? <BarIndicator color='red' count={9} size={10} animating={checkingref} /> :
            <Text style={{ marginLeft: 5, fontSize: 11, color: 'green' }}>{refcoupondiscount}</Text>}
          <Price Title={t('TOTAL_PRICE')} Price={"₦" + total} Font={normalize(13)} />
          <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
            <View style={{ flex: 1 }}>
              {checkingref ? <Text style={{ textAlignVertical: "center", textAlign: "center", }}>Loading payment...</Text> :
                // <BigButton
                //   style={{ width: '100%', padding: 20 }}
                //   title={t('PAY ₦' + total)} onClick={() => proceedCheckOut()}
                // />

                <TouchableOpacity onPress={() => proceedCheckOut()} style={{ backgroundColor: colors.theme, padding: 20, borderRadius: 7, margin: 5 }}>
                  <Text style={{ color: '#fff', textAlign: 'center', fontWeight: 'bold' }} >
                    {t('Pay ₦' + total)}

                  </Text>
                </TouchableOpacity>

              }
            </View>
            <View style={{ flex: 1 }}>
              <TouchableOpacity onPress={() => continueShopping()} style={{ backgroundColor: colors.theme, padding: 20, borderRadius: 7, margin: 5 }}>
                <Text style={{ color: '#fff', textAlign: 'center', fontWeight: 'bold' }} >
                  Add Service
                </Text>
              </TouchableOpacity>
              {/* <BigButton style={{ width: '100%', padding: 20 }} title={t('ADD SERVICE')} onClick={() => continueShopping()} /> */}
            </View>
            {/* <View style={{ flex: 1 }}>
              <TouchableOpacity onPress={() => cancelOrder()} style={{ backgroundColor: colors.theme, padding: 15, borderRadius: 7, margin: 5 }}>
                <Text style={{ color: '#fff', textAlign: 'center', fontWeight: 'bold' }} >
                  CANCEL ORDER
                </Text>
              </TouchableOpacity>
               <BigButton style={{ width: '100%', padding: 20 }} title={t('CANCEL ORDER')} onClick={() => continueShopping()} /> 
            </View> */}
          </View>
        </View>
        {/* <PaymentPop visible={modalVisible}  data={osdata} onClose={() =>
          setModalVisible(false)
        } /> */}
      </View>
      <View style={{}}>
        <TouchableOpacity onPress={() => cancelOrder()} style={{ backgroundColor: colors.theme, padding: 15, borderRadius: 7, margin: 5 }}>
          <Text style={{ color: '#fff', textAlign: 'center', fontWeight: 'bold' }} >
            Cancel Booking
          </Text>
        </TouchableOpacity>
        {/* <BigButton style={{ width: '100%', padding: 20 }} title={t('CANCEL ORDER')} onClick={() => continueShopping()} />  */}
      </View>
    </SafeAreaView >
  );
};

const styles = StyleSheet.create({
  progress: {
    marginHorizontal: wp(3),
    height: hp(1),
    borderRadius: 14,
  },
  locimg: {
    height: wp(6),
    width: wp(6),
    marginTop: hp(1),
    marginBottom: hp(1),
    marginLeft: wp(2),
  },
  rec: {
    height: hp(5),
    width: wp(90),
    alignSelf: 'center',
    justifyContent: 'center',

    marginTop: hp(2),
    backgroundColor: colors.lighttheme,
    borderRadius: 7,
    marginLeft: wp(0),
  },
  img2: {
    height: wp(6),
    width: wp(6),
    marginLeft: wp(3),
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
    marginTop: hp(1.5),
    opacity: 0.3,
    width: wp(90),

    alignSelf: 'center',
    backgroundColor: 'black',
  },
  round1: {
    height: wp(8),
    width: wp(8),
    borderRadius: 50,
    marginTop: hp(0.3),
    lineHeight: 20,
    backgroundColor: colors.lighttheme,
  },
  rec1: {
    marginTop: hp(1),
    backgroundColor: '#eee',
    borderStyle: 'dashed',
    borderColor: colors.theme,
    borderWidth: 2,
    height: hp(5),
    width: wp(85),
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 14,
    marginBottom: hp(1),
  },
  btn: {
    fontFamily: fonts['poppins-medium'],
    alignSelf: 'flex-end',
    height: hp(5),
    width: wp(32),
    marginRight: isAndroid ? wp(-0.5) : wp(-0.4),
    justifyContent: 'center',
    borderBottomRightRadius: 14,
    borderTopRightRadius: 14,

    backgroundColor: colors.theme,
  },
  itemView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: wp(3),
  },
  itemView1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: wp(1.7),
  },
  progressBar: {
    width: width * 0.95,
    alignSelf: 'center',
  },
  container: {
    flex: 1,
  },
  inner: {
    padding: 24,
  },
  header: {
    fontSize: 36,
    marginBottom: 48,
  },
  input: {
    height: 40,
    borderColor: "#000000",
    borderBottomWidth: 1,
    marginBottom: 36,
  },
  btnContainer: {
    backgroundColor: "white",
    marginTop: 12,
  },
});

export default OrderSummary;
