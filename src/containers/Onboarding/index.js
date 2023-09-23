import React from 'react';
import {View, StyleSheet, FlatList, Text, TouchableOpacity} from 'react-native';
import colors from '../../assets/color';
import FontText from '../../Components/common/FontText';
import Logo from '../../Components/common/logo';
import {hp, wp, normalize, isX} from '../../styles/responsiveScreen';
import SvgIcons from '../../assets/SvgIcons';
import {useTranslation} from 'react-i18next';
import BigButton from '../../Components/BigButton';
import { onBoardingData } from '../../Utils/data';

export const routeName = 'Onboarding';

const Onboarding = ({navigation}) => {
  const {t} = useTranslation();
  const _renderItems = (item, index) => {
    return (
      <View style={styles.rowview}>
        <View style={styles.square}>
          <SvgIcons.Vector width={hp(5)} height={hp(5)} />
        </View>
        <View>
          <FontText
            size={normalize(18)}
            name={'poppins-medium'}
            color="black"
            pLeft={wp(4)}
            textAlign="left">
            {t(item.name)}
          </FontText>
          <FontText
            size={normalize(14)}
            name={'poppins-regular'}
            color="lightViolet"
            pLeft={wp(4)}
            textAlign="left">
            {t(item.sub)}
          </FontText>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Logo />
      {/* <FontText
        name={'poppins-medium'}
        size={normalize(26)}
        pTop={hp(1)}
        color={'Violet'}>
        {t('WELCOME')}
      </FontText> */}
      
      <FontText
              name={'poppins-medium'}
              size={normalize(22)}
              pRight={wp(2)}
              style={{alignSelf: 'center',
              justifyContent: 'center',}}
              color={'Violet'}>
              {t('Welcome To')} <Text style={{fontWeight:'bold',color:colors.lightOrngae}}>Razortouchng</Text>
            </FontText>
      <FlatList
        scrollEnabled={false}
        data={onBoardingData}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => _renderItems(item)}
      />
      <BigButton title ={t("CONTINUE")}  onClick = {() => navigation.navigate('Login')} style ={{marginBottom:hp(4)}}  />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
    paddingTop: isX ? hp(7.5) : hp(5.5),
    paddingHorizontal: wp(4.5),
    backgroundColor: colors.white,
  },
  square: {
    height: wp(15),
    width: wp(15),
    backgroundColor: colors.lightOrange1,
    borderRadius: wp(3),
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowview: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: hp(2.5),
  },
});

export default Onboarding;
