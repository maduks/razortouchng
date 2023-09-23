//import liraries
import React from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {hp, wp, normalize, isIOS, isX} from '../../styles/responsiveScreen';
import Title_And_ViewAll_ForHomeComponent from '../Title_And_ViewAll_ForHomeComponent';
import {useTranslation} from 'react-i18next';
import Index from '../../Components/common/PopularSalonAndBestInRating_HomePage/Index';
import {routeName as bookinggenderrouteName} from '../../containers/Booking/Bookinggender';
import {routeName as InternalServicesRouteName} from '../../containers/InternalServices';
import { upComingData } from '../../Utils/data';

// create a component

const BestRating = ({props, navigation}) => {
  const {t} = useTranslation();

  const PopularSalons = [
    {
      image: require('../../assets/images/PopularSalons.png'),
      name: 'Mane Beautilocks',
      location: '2/250 Cambridge St',
      rating: '3.0',
      stars: require('../../assets/images/Stars.png'),
      open: 'Open',
    },
    {
      image: require('../../assets/images/PopularSalons.png'),
      name: 'Mane Beautilocks',
      location: '2/250 Cambridge St',
      rating: '3.0',
      stars: require('../../assets/images/Stars.png'),
      open: 'Open',
    },
  ];

  const booknow = (item) => {
    navigation.navigate(bookinggenderrouteName,{ddata:item});
  };

  const onNavigate = (item) => {
    navigation.navigate(InternalServicesRouteName,{
      // console.log('data....',item)
      pdata : item}
    );
  };

  return (
    <View style={{marginBottom: 7}}>
      <View style={{marginVertical: 7}}>
        <Title_And_ViewAll_ForHomeComponent
          Title={t('BEST_RATING')}
          ViewAll={true}
          ViewAllPress={() =>
            navigation.navigate('HomeMap'
            )
          }
        />
      </View>

      <View style={{flexDirection: 'row'}}>
        <FlatList
          data={upComingData}
          keyExtractor={(value, index) => index.toString()}
          horizontal={true}
          style={{paddingLeft: wp(4)}}
          showsHorizontalScrollIndicator={false}
          renderItem={({item, index}) => (
            <Index
              navigation={() => onNavigate(item)}
              bookNow={() => booknow(item)}
              {...item}
            />
          )}
        />
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({});

//make this component available to the app
export default BestRating;
