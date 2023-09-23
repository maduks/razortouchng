//import liraries
import React, { Component, useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  UIManager,
  LayoutAnimation,
  Dimensions,
  Platform,
  Text,
} from 'react-native';
import {
  hp,
  wp,
  normalize,
  isIOS,
  isX,
  isAndroid,
} from '../../styles/responsiveScreen';
import BackHeader from '../../Components/BackHeader';
import { TextInput, ProgressBar, Card, RadioButton } from 'react-native-paper';
import colors from '../../assets/color';
import FontText from '../../Components/common/FontText';
import SvgIcons from '../../assets/SvgIcons';
import { routeName as BookingDateRouteName } from './BookingDate';
import { CONTENT } from '../../Utils/data';
import { FEMALECONTENT } from '../../Utils/data';
import { SPACONTENT } from '../../Utils/data';
import fonts from '../../assets/fonts';
import { useTranslation } from 'react-i18next';
import SmartScrollView from '../../Components/SmartScrollView';
import BigButton from '../../Components/BigButton';
import globals from '../../assets/globals';
import axios from 'axios';

import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const { width, height } = Dimensions.get('screen');

export const routeName = 'Bookingservices';

const ExpandableComponent = ({
  item,
  onClickFunction,
  SelectedService,
  setSelectedService,
  setSelectedLocation,
  setIsHomeService,
  SelectedPrice,
  setSelectedPrice,
  setSelectedSub,
  SelectedButton,
  setSelectedButton,
}) => {
  const { t } = useTranslation();

  const [layoutHeight, setLayoutHeight] = useState(0);
  const [location, setLocation] = useState('');

  useEffect(() => {

    if (item.isExpanded) {
      setLayoutHeight(null);
    } else {
      setLayoutHeight(0);
    }


  }, [item.isExpanded]);

  return (
    <View>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onClickFunction}
        style={styles.header}>
        <View
          style={styles.subContainer}>
          <FontText
            name={'poppins-medium'}
            size={normalize(14)}
            color={'Violet'}
            textAlign={'left'}>
            {t(item.category_name)}
          </FontText>

          <TouchableOpacity activeOpacity={0.7} onPress={() => onClickFunction(!item.isExpanded)}>
            {item.isExpanded ? (
              <SvgIcons.Vectors style={{ marginTop: hp(0.8) }} />
            ) : (
              <SvgIcons.Down style={{ marginTop: hp(0.8) }} />
            )}
          </TouchableOpacity>
        </View>

        {item.isExpanded ? (
          <View style={styles.lineE} />
        ) : (
          <View style={styles.line0} />
        )}
        <View
          style={{
            height: layoutHeight,
            overflow: 'hidden',
          }}>


          {
            item.subcategory[0].sub == "homeservice" ?

              <View>
                {setIsHomeService(true)}
                <Text>Residential Address</Text>
                <GooglePlacesAutocomplete
                  placeholder='Location...'
                  minLength={2}
                  autoFocus={false}
                  returnKeyType={'default'}
                  fetchDetails={true}
                  styles={{

                    textInput: {
                      height: 38,
                      borderColor: 'grey',
                      borderWidth: 1,
                      color: '#5d5d5d',
                      fontSize: 16,

                    },
                    predefinedPlacesDescription: {

                      color: '#1faadb',
                    },
                  }}

                  onPress={(data, details = null) => {
                    // 'details' is provided when fetchDetails = true
                    console.log(data, details);
                    setLocation(JSON.parse(JSON.stringify(data)).description)
                    setSelectedLocation(JSON.parse(JSON.stringify(data)).description)

                  }}
                  query={{
                    key: 'AIzaSyDmp2bTJO1byN1KH9sl2G9eLP2sQKUcMas',
                    language: 'en',
                    components: 'country:ng',
                  }}
                />
              </View>

              : null
          }

          {item.subcategory.map((item, key, index) => (
            <View key={key}>

              <View style={styles.itemView}>
                <View
                  style={styles.val}>
                  <TouchableOpacity onPress={() => {
                    setSelectedButton(item.val);
                    setSelectedService(item.val)
                    setSelectedPrice(item.price);
                    setSelectedSub(item.sub)
                  }}>
                    <FontText style={styles.text01}>{t(item.val)}</FontText>


                  </TouchableOpacity>
                </View>
                <View
                  style={styles.btnView}>
                  <TouchableOpacity
                    style={styles.radioPress}
                    onPress={() => {
                      setSelectedButton(item.val);
                      setSelectedService(item.val)
                      setSelectedPrice(item.price);
                      setSelectedSub(item.sub);
                    }}
                  >
                    <FontText style={styles.text03}>₦{item.price}</FontText>
                    {SelectedButton === item.val ? (
                      <SvgIcons.RadioOn style={styles.Radio} />
                    ) : (
                      <SvgIcons.RadioOff style={styles.Radio} />
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </View>
      </TouchableOpacity>
    </View>
  );
};

// // create a component
const Bookingservices = (props) => {
  //alert('here')
  const { t } = useTranslation();
  const [SelectedButton, setSelectedButton] = useState(false);
  const [SelectedService, setSelectedService] = useState("");
  const [SelectedPrice, setSelectedPrice] = useState("");
  const [SelectedSub, setSelectedSub] = useState("");
  const [SelectedLocation, setSelectedLocation] = useState("");
  const [IsHomeService, setIsHomeService] = useState("")
  const { sdata } = props.route.params;
  const { gender } = props.route.params;
  const [multiSelect] = useState(false);
  const url = globals.base_url + "servicelist";

  // if(sdata.category=="Spa")
  // {
  //   const [listDataSource, setListDataSource] = seState(SPACONTENT);

  // }
  const [listDataSource, setListDataSource] = (
    (sdata.category === "Spa") ? useState(SPACONTENT) : // if  // else if 
      (gender === 1 && sdata.category === "Hair Cut") ? useState(CONTENT) : // else if
        (gender === 2 && sdata.category === "Hair Cut") ? useState(FEMALECONTENT) :
          useState([])  //ELSE IF
    // else 
  );
  //const [listDataSource, setListDataSource] = gender =="1" ? useState(CONTENT) : useState(FEMALECONTENT);



  if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
  const { navigation } = props;
  const updateLayout = index => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    let array = [...listDataSource];

    if (multiSelect) {
      array[index].isExpanded = !array[index].isExpanded;
    } else {
      array && array.map((value, placeindex) =>
        placeindex === index
          ? (array[placeindex].isExpanded = !array[placeindex].isExpanded)
          : (array[placeindex].isExpanded = false),
      );
    }
    setListDataSource(array);

  };

  const onContinue = (item) => {

    if (IsHomeService == true && SelectedLocation == "" && SelectedSub == "homeservice") {
      alert('Please enter home service location')
    }
    else {
      SelectedButton ?
        navigation.navigate(BookingDateRouteName, {
          // time: item.val,
          // dataa: CONTENT,
          tdata: sdata,
          location: SelectedLocation,
          price: SelectedPrice,
          service: SelectedService,
          gender: gender
        }) : null

    }
    //alert("service "+SelectedPrice + SelectedService)

  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ marginHorizontal: wp(3) }}>
        <BackHeader
          title={t('SELECT_SERVICE')}
          titleColor="violet"
          BackonPress={() => navigation.goBack()}
        />
      </View>
      <ProgressBar
        progress={0.3}
        color={colors.theme}
        style={styles.progress}
      />
      <SmartScrollView
        alwaysBounceVertical={false}
        showsVerticalScrollIndicator={false}
        applyKeyboardCheck={isIOS}
        contentContainerStyle={{ paddingVertical: hp(2) }}
        style={{ flex: 1 }}>
        {listDataSource.map((item, key) => (
          <ExpandableComponent
            key={item.category_name}
            onClickFunction={() => {
              updateLayout(key);
            }}
            SelectedButton={SelectedButton}
            setSelectedButton={setSelectedButton}
            SelectedPrice={SelectedPrice}
            setSelectedPrice={setSelectedPrice}
            SelectedService={SelectedService}
            setSelectedService={setSelectedService}
            setSelectedLocation={setSelectedLocation}
            setIsHomeService={setIsHomeService}
            setSelectedSub={setSelectedSub}

            item={item}
          />
        ))}
      </SmartScrollView>
      <View style={{ justifyContent: 'flex-end', marginBottom: hp(2), alignItems: 'center', alignSelf: 'center' }}>
        <BigButton title={t('CONTINUE')} onClick={onContinue} style={{ backgroundColor: SelectedButton ? colors.theme : colors.lightOrngae }} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  progress: {
    marginHorizontal: wp(5),
    height: hp(1),
    borderRadius: 14,
  },
  subContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btnView: {
    width: '50%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  radioPress: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  val: {
    width: '50%',
  },
  Radio: {
    width: '20%',
  },
  header: {
    marginLeft: wp(5),
    marginRight: wp(3.5),
    padding: 15,
    borderColor: colors.lightgrey,
    marginTop: hp(2),
    borderRadius: 14,
    borderWidth: 0.5,
  },
  line0: {
    borderWidth: 0,
    borderColor: colors.lightgrey,
    marginTop: hp(2),
    marginBottom: hp(-1.8),
    marginLeft: wp(-4.2),
    width: wp(91),
  },
  lineE: {
    borderWidth: 0.5,
    borderColor: colors.lightgrey,
    marginTop: hp(2),
    marginBottom: hp(3),
    marginLeft: wp(-4.2),
    width: wp(91),
  },
  itemView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: hp(1),
  },
  text01: {
    fontFamily: fonts['poppins-medium'],
    fontSize: normalize(14),
    fontWeight: '500',
    color: colors.violet,
  },
  text02: {
    fontFamily: fonts['poppins-medium'],
    fontSize: normalize(12),
    fontWeight: '500',
    marginRight: wp(0),
    opacity: 0.5,
    textAlign: 'left',
    color: colors.violet,
    marginTop: isAndroid ? hp(0.5) : hp(-0.5),
  },
  text03: {
    textAlign: 'right',
    fontFamily: fonts['poppins-medium'],
    fontSize: normalize(14),
    fontWeight: '500',
    color: colors.violet,
    marginRight: width * 0.02,
  },
});

//make this component available to the app
export default Bookingservices;
