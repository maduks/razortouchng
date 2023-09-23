//import liraries
import React, { Component, useState, useEffect } from 'react';
import { View, Text, StyleSheet, StatusBar, FlatList } from 'react-native';
import { hp, wp, normalize } from '../../styles/responsiveScreen';
import BackHeader from '../../Components/BackHeader';
import colors from '../../assets/color';
import EmptyDefault from '../../Components/EmptyDefault';
import FontText from '../../Components/common/FontText/index';
import Button from '../../Components/common/Button';
import SvgIcons from '../../assets/SvgIcons';

import TransactionItem from '../TransactionLists/TransactionItem';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import BigButton from '../../Components/BigButton/index'
import { transcationData } from '../../Utils/data';
import globals from '../../assets/globals';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
import axios from 'axios';
export const routeName = 'TransactionLists';
// create a component
const TransactionLists = ({ navigation }) => {
  const Onselect = () => navigation.navigate('HomeMap');
  const [data, setdata] = useState([]);
  const [trandata, setTrandata] = useState([]);
  const { t } = useTranslation();
  const [userid, setUserId] = useState();
  const [loading, setLoading] = useState(true);

  const getTransaction = (id) => {

    const url = globals.base_url + "transactions/" + id;

    axios
      .get(url, {
        headers: {
          "Content-type": "application/json",
          "Accept": "application/json"
        },
        timeout: 50000
      })
      .then(function (response) {

        // handle success
        // setServices(JSON.stringify(response.data));
        //alert(JSON.stringify(response.data))
        setTrandata(response.data)
        setLoading(false)
        //alert(JSON.stringify(response.data));
      })
      .catch(function (error) {
        // handle error
        alert("" + error);
        setLoading(false)
      })
      .finally(function () {
        // always executed
        // alert('Finally called');
      });
  }

  useEffect(() => {

    AsyncStorage.getItem('userData').then(
      (value) => {
        if (value != null) {
          const user = JSON.parse(value);
          //alert(user.id)
          getTransaction(user.id)
        }
        else {
          //alert('hjk')
        }
      });


  }, []);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
      <View style={styles.container}>

        <StatusBar barStyle="dark-content" />
        <BackHeader
          title={t('TRANSC_LIST')}
          titleColor="violet"
          BackonPress={() => navigation.goBack()}
        />
        {loading ? <Spinner
          visible={true}
          overlayColor="rgba(0, 0, 0, 0.15)"

          textStyle={{ color: colors.darkred }}
        /> :
          trandata.length == 0 ? (
            <View
              style={{
                height: hp(72)
              }}>

              <EmptyDefault
                icon={<SvgIcons.AppointmentDefault style={{ height: wp(25), width: wp(25) }} />}
                Title={t('TRANSC_TAG')}
                Subtitle={t(
                  'Whether you want to look younger or look like your age, we are just a booking away.',
                )}
              />
            </View>
          ) : (
            <View>

              <FlatList
                showsVerticalScrollIndicator={false}
                data={trandata}
                bounces={false}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }) => {
                  return (
                    <TransactionItem
                      index={index}
                      Data={trandata}
                      item={item}></TransactionItem>
                  );
                }}
                keyExtractor={item => item.id}
              />
            </View>
          )
        }

        {/* {data.length == 0 ? (
          <BigButton title={t("FIND_SALON")} onClick={Onselect} style={{ marginBottom: hp(2) }} />

        ) : null} */}
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
  button: { color: colors.white },
});

//make this component available to the app
export default TransactionLists;
