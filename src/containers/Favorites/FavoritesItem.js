import React, {Component} from 'react';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import colors from '../../assets/color';
import SvgIcons from '../../assets/SvgIcons';
import {hp, wp, normalize, isIOS, isX} from '../../styles/responsiveScreen';
import FontText from '../../Components/common/FontText';
import {Rating, AirbnbRating} from 'react-native-ratings';
import {useTranslation} from 'react-i18next';

const FavoritesItem = props => {
  const {t} = useTranslation();
  const {item, onPress} = props;
  const ratingCompleted = () => {
    alert('star ' + ratingCompleted);
  };
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require('../../assets/images/Womenface.png')}
      />
      <View
        style={styles.mainContainer}>
        <View
          style={styles.subView}>
          <FontText size={normalize(14)} name={'poppins-semibold'}>
            {t(item.name)}
          </FontText>
          <SvgIcons.RedHeart style={{marginTop: 3}} />
        </View>
        <FontText
          size={normalize(12)}
          color={'lightViolet'}
          name={'poppins-regular'}
        >
          {t(item.address)}
        </FontText>
        <View
          style={styles.ratView}>
          <View
            style={styles.ratsubView}>
            <FontText
              size={normalize(12)}
              name={'poppins-semibold'}
              style={{marginHorizontal: wp(1)}}>
              {item.rate}
            </FontText>
            <Rating
              imageSize={15}
              jumpValue={1}
              ratingColor={colors.theme}
              selectedColor={colors.theme}
              starContainerStyle={{paddingHorizontal: wp(1)}}
              onFinishRating={() => ratingCompleted}
              style={{paddingVertical: 10, paddingHorizontal: wp(0.5)}}
            />
          </View>
          <FontText size={normalize(12)} name={'poppins-semibold'}>
            {item.content}
          </FontText>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    marginHorizontal: wp(6),
    flexDirection: 'row',
    borderRadius: 10,
    marginVertical: hp(1),
    shadowColor: colors.haircutshadow,
    shadowOpacity: 0.3,
    shadowOffset: {width: hp(1), height: hp(1)},
    shadowRadius: 0.2,
    elevation: 4,
  },
  image: {
    height: hp(16),
    width: hp(14),
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  mainContainer:{
    marginHorizontal: wp(3),
    flex: 1,
    justifyContent: 'center',
  },
  subView:{
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  ratView:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: hp(3),
  },
  ratsubView:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default FavoritesItem;
