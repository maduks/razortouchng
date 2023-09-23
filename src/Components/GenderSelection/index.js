//import liraries
import React, {Component, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {hp, wp, normalize, isIOS, isX} from '../../styles/responsiveScreen';
import Title_And_ViewAll_ForHomeComponent from '../Title_And_ViewAll_ForHomeComponent';
import {useTranslation} from 'react-i18next';
import colors from '../../assets/color';
// create a component

const GenderSelection = props => {
  const {t} = useTranslation();

  const [Gender, setGender] = useState(0);

  return (
    <View style={{marginVertical: 10, paddingHorizontal: wp(4)}}>
      <View style={{marginVertical: 10}}>
        <Title_And_ViewAll_ForHomeComponent
          Title={t('SELECT_TYPE')}
          ViewAll={false}
        />
      </View>

      <View style={styles.row}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={[
            styles.TypeMainView,
            {
              paddingRight: wp(5),
              borderColor: Gender == 0 ? colors.orange : colors.borderGray,
            },
          ]}
          onPress={() => setGender(0)}>
          <Image
            source={require('../../assets/images/MEN.png')}
            resizeMode="contain"
            style={styles.img}
          />
          <Text style={styles.SelectTypeName}>{t('MEN')}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.7}
          style={[
            styles.TypeMainView,
            {
              width: '34%',
              borderColor: Gender == 1 ? colors.red : colors.borderGray,
            },
          ]}
          onPress={() => setGender(1)}>
          <Image
            source={require('../../assets/images/MEN.png')}
            resizeMode="contain"
            style={styles.img}
          />
          <Text style={styles.SelectTypeName}>{t('WOMEN')}</Text>
        </TouchableOpacity>

        {/* <TouchableOpacity
          activeOpacity={0.7}
          style={[
            styles.TypeMainView,
            {
              borderColor: Gender == 2 ? colors.red : colors.borderGray,
            },
          ]}
          onPress={() => setGender(2)}>
          <Image
            source={require('../../assets/images/MEN.png')}
            resizeMode="contain"
            style={styles.img}
          />
          <Text style={styles.SelectTypeName}>{t('UNISEX')}</Text>
        </TouchableOpacity> */}
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  TypeMainView: {
    flexDirection: 'row',
    padding: wp(2),
    borderRadius: wp(10),
    alignItems: 'center',
    borderWidth: wp(0.2),
    borderColor: colors.orange,
    width: '30%',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  SelectTypeName: {
    color:colors.white,
    fontSize: normalize(12),
    fontFamily: 'poppins-medium',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  img: {
    width: wp(12),
    height: wp(12),
    marginRight: wp(2),
  },
});

//make this component available to the app
export default GenderSelection;
