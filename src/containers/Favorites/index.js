//import liraries
import React, {Component, useState} from 'react';
import {View, Text, StyleSheet, StatusBar, FlatList} from 'react-native';
import BackHeader from '../../Components/BackHeader';
import colors from '../../assets/color';
import EmptyDefault from '../../Components/EmptyDefault';
import FontText from '../../Components/common/FontText/index';
import Button from '../../Components/common/Button';
import SvgIcons from '../../assets/SvgIcons';
import {hp, wp, normalize} from '../../styles/responsiveScreen';
import FavoritesItem from './FavoritesItem';
import {useTranslation} from 'react-i18next';
import {SafeAreaView} from 'react-native';
import BigButton from '../../Components/BigButton';
import { favData } from '../../Utils/data';

export const routeName = 'Favorites';
Arrays = [];
// create a component
const Favorites = ({navigation}) => {
  const {t} = useTranslation();
  const [Data, setData] = useState([]);

  const Onselect = () => navigation.navigate('HomeMap');
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.white}}>
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <BackHeader
          title={t('FAV')}
          titleColor="violet"
          BackonPress={() => navigation.goBack()}
        />
        {Data.length == 0 || null ? (
          <View
            style={{
              height: hp(72),
            }}>
            <EmptyDefault
              onPress={() => setData(favData)}
              icon={
                <SvgIcons.Favorites style={{height: wp(25), width: wp(25)}} />
              }
              Title={t('TRANSC_TAG')}
              Subtitle={t(
                'HAIRCUTS',
              )}
            />
          </View>
        ) : (
          <View>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={favData}
              bounces={false}
              showsHorizontalScrollIndicator={false}
              renderItem={({item}) => {
                return <FavoritesItem item={item}></FavoritesItem>;
              }}
              keyExtractor={item => item.id}
            />
          </View>
        )}
        {Data.length == 0 ? (
          <BigButton title ={t("FIND_SALON")} onClick ={Onselect}  style ={{marginBottom : hp(2)}} />
        ) : null}
      </View>
    </SafeAreaView>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  button: {color: colors.white},
});

//make this component available to the app
export default Favorites;
