//import liraries
import React, { Component, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, FlatList, ImageBackground } from 'react-native';
import { hp, wp, normalize, isIOS, isX } from '../../styles/responsiveScreen';
import Title_And_ViewAll_ForHomeComponent from '../Title_And_ViewAll_ForHomeComponent';
import { useTranslation } from 'react-i18next';
import { FACIALS, SPACONTENT, HAIRCUT, CONTENT, PEDICURE, MASSAGE, MANICURE } from '../../Utils/data';
import { BottomSheet } from 'react-native-elements';
import colors from '../../assets/color';
import AsyncStorage from '@react-native-async-storage/async-storage';
import globals from '../../assets/globals';
import { routeName as bookinggenderrouteName } from '../../containers/Booking/Bookinggender';
import axios from 'axios';
import SvgIcons from '../../assets/SvgIcons';
import BottomProf from '../../Components/PopularSalonComponent/bottomprof';
import BottomSpaProf from '../PopularSalonComponent/bottomspaprof';
// create a component
import {
  BarIndicator,

} from 'react-native-indicators';

// import { ScrollView } from 'react-native-gesture-handler';


const ExploreServices = ({ props, navigation }) => {
  const { t } = useTranslation();
  const [token, setToken] = useState('');

  const [bottomSheet, setbotttomSheet] = useState(false);

  const [services, setServices] = useState([]);
  const [name, setName] = useState('');
  const url = globals.base_url + "services";
  const [showLoader, setShowLoader] = useState(true)


  const [listDataSource, setListDataSource] = (
    (name === "Hair Cut" || name === "Hair Tint") ? useState(CONTENT) : // if  // else if 
      useState(SPACONTENT)   //ELSE IF
    // else 
  );

  useEffect(() => {
    getServices();
  }, []);
  const closeBottom = () => {

    setbotttomSheet(false)
  }
  const updateCategory = (names) => {
    setName(names)
    setbotttomSheet(true)

    if (names == "Hair Cut") {
      setListDataSource(HAIRCUT)
    }
    else if (names == "Facials") {
      setListDataSource(FACIALS)
    } else if (names == "Pedicure") {
      setListDataSource(PEDICURE)
    } else if (names == "Massage") {
      setListDataSource(MASSAGE)
    } else if (names == "Manicure") {
      setListDataSource(MANICURE)
    }

  }

  const getServices = async () => {
    AsyncStorage.getItem('token').then(
      (value) => {
        if (value) {
          setToken(value);
        }
        else {
          //redirect to login page
          //AsyncStorage.setItem('token',globals.token_key);
          //  alert('Not Logged')
        }
      });

    await axios
      .get(url, {
        headers: {
          "Content-type": "application/json",
          "Accept": "application/json",
          "Authorization": `Bearer ${token}`
        }, timeout: 50000
      })
      .then(function (response) {
        setShowLoader(false)
        const allServices = response.data;
        setServices(allServices);
      })
      .catch(function (error) {
        // handle error
        alert(error);
      })
      .finally(function () {
        // always executed
        //alert('Finally called');
      });
  }

  console.log(services)
  const [Hidden_ExplorByServices, setHidden_ExplorByServices] = useState(false);
  const Item = ({ name }) => {
    return (
      <View style={{ flexDirection: 'column', margin: 10, borderRadius: 5, padding: 10, borderColor: '#eee', borderWidth: 1 }}>
        <Text style={{ fontWeight: 'bold', color: colors.black }}>{name.category_name}</Text>
        {name.subcategory.map((item, key, index) => (
          <View style={{ flexDirection: 'row', padding: 6 }}>
            <Text style={{ color: 'grey', fontWeight: '500', textAlign: 'left', flex: 1 }}>{item.val}</Text>
            <Text style={{ flex: 1 }}> ----------------------- </Text>
            <Text style={{ color: '#333', fontWeight: 'bold', textAlign: 'left' }}>₦ {item.price}</Text>
          </View>
        ))}
      </View>
    );
  }

  const renderItem = ({ item }) => (
    <Item name={item} />
  );
  const ExplorbyServiceRenderItem = (value, index) => {
    return (

      <View>
        <TouchableOpacity onPress={() =>
          updateCategory(value.name)
        } style={styles.exploreview}>
          <ImageBackground imageStyle={{
            borderTopLeftRadius: 6,
            borderTopRightRadius: 6
          }} source={{ uri: value.photo }} resizeMode="stretch" style={styles.img} >

          </ImageBackground>
          <Text style={styles.serviceName}>{value.name}</Text>
        </TouchableOpacity>

        <BottomSheet
          enablePanDownToClose={true}
          onBackdropPress={() => setbotttomSheet(false)}
          initialPosition={"90%"}  //200, 300
          snapPoints={["50%", "100%"]}
          isBackDrop={true}
          isBackDropDismisByPress={true}
          isRoundBorderWithTipHeader={true}
          isVisible={bottomSheet}
          containerStyle={{ backgroundColor: 'rgba(0.5, 0.50, 0, 0.40)' }}
          modalProps={{
            animationType: 'fade',
            hardwareAccelerated: true,
          }}
        >

          <View style={{ backgroundColor: '#fff', borderTopLeftRadius: 10, borderTopRightRadius: 10 }}>
            <View style={{ flexDirection: 'row', marginHorizontal: 25, alignContent: 'center' }}>
              <Text style={{ alignSelf: 'center', flex: 1, marginTop: 10, fontWeight: 'bold' }}></Text>
              <TouchableOpacity onPress={() => setbotttomSheet(false)}>
                <SvgIcons.Close
                  height={hp(3)}
                  width={hp(3)}
                  fill={colors.box}
                  stroke={'#FCE77D'}
                  style={{ margin: 5 }}
                />

                {/* <Text style={{ alignSelf: 'center', marginTop: 10, paddingHorizontal: 0, fontSize: 22, fontWeight: 'bold', alignItems: 'flex-end' }}>X</Text> */}

              </TouchableOpacity>
            </View>
            <View>
              <Text style={{ textAlign: 'center', fontWeight: 'bold', margin: 9 }}>Services</Text>
              <FlatList
                data={listDataSource}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
              />
            </View>

            <ScrollView>
              {
                name == "Hair Cut" || name == "Hair Tint" ?
                  <BottomProf func={() => closeBottom()} navigation={navigation} />
                  : <BottomSpaProf func={() => closeBottom()} navigation={navigation} />
              }
            </ScrollView>

          </View>
        </BottomSheet >

      </View >








    );
  };

  return (
    <View style={{ marginVertical: 10, paddingHorizontal: wp(4) }}>
      <Title_And_ViewAll_ForHomeComponent
        Title={t('Our Services Categories')}
        ViewAll={false}
      />

      {showLoader == true ? <BarIndicator color='white' count={9} size={10} animating={showLoader} /> :
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{ flexDirection: 'row', width: '100%', }}>
          <View style={styles.row}>
            {services.map((value, index) =>
              ExplorbyServiceRenderItem(value, index),
            )}

            {Hidden_ExplorByServices &&
              services.map((value, index) =>
                ExplorbyServiceRenderItem(value, index),
              )}
          </View>
        </ScrollView>
      }

    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  exploreview: {
    width: wp(23),
    marginHorizontal: wp(1.2),
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 6,
  },
  img: {
    width: '100%',
    height: wp(19),
    borderRadius: 100,

    borderWidth: 0,
  },
  ShowMoreMainView: {
    borderWidth: wp(0.2),
    padding: hp(1),
    flexDirection: 'row',
    justifyContent: 'center',
    width: wp(85),
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: wp(2),
    borderColor: '#8384A180',
  },
  ShowMoreImage: {
    width: wp(7),
    height: wp(7),
    marginHorizontal: wp(1),
    alignSelf: 'center',
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: hp(1),
  },
  serviceName: {
    fontSize: normalize(10),
    marginVertical: hp(1),
    color: colors.black,
    fontWeight: 'bold'
  },

  showmore: {
    fontSize: normalize(14),
    color: colors.white,
    fontFamily: 'poppins-regular',
  },
});

//make this component available to the app
export default ExploreServices;
