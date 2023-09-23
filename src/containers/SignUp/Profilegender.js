import React, {Component, useState,useEffect} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {SafeAreaView} from 'react-native-safe-area-context';
import {TextInput, ProgressBar, Card} from 'react-native-paper';
import Logo from '../../Components/common/logo';
import FontText from '../../Components/common/FontText';
import colors from '../../assets/color';
import BackHeader from '../../Components/BackHeader';
import SvgIcons from '../../assets/SvgIcons';
import TitleSubTitle from '../../Components/TitleSubTitle';
import Button from '../../Components/common/Button';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,

} from 'react-native';
import globals from '../../assets/globals';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  hp,
  wp,
  normalize,
  isIOS,
  isX,
  isAndroid,
} from '../../styles/responsiveScreen';
import {useTranslation} from 'react-i18next';
import BigButton from '../../Components/BigButton';

const {width, height} = Dimensions.get('screen');

export const routeName = 'Profilegender';


const Profilegender = ({navigation}) => {
  let userId= "";


     useEffect(() => {
      AsyncStorage.getItem('userData')
      .then((value) => {
        const user = JSON.parse(value);
        userId =user.id;
        // alert(`${user.name} ${user.email} ${user.password}`);
      })
      .catch((error) => {
        console.log(error);
      });
  });
  const [SelectedGender, setSelectedGender] = useState(0);
  const {t} = useTranslation();
  const UpdateUserData = (data)=>{
      
      const url = globals.base_url + "users/"+userId;
      //alert(url)
      const configurationObject = {
        url: url,
        method: "PUT",
        data: { gender:SelectedGender==0 ? "Male" : "Female" },
      };
   
      axios(configurationObject)
      .then(function (response) {
        
        AsyncStorage.setItem('UserGenderData', SelectedGender==0 ? "Male" : " Female");
        navigation.navigate('Profilenum');
      })
      .catch(function (error) {
        // handle error
       alert(error);
      })
      .finally(function () {
        // always executed
       
      });
     };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.white}}>
      <View style={styles.container}>
        <BackHeader
          BackonPress={() => navigation.navigate('Accountcreated')}
          // RightItemLabel={t('SKIP')}
          onPress={() => navigation.navigate('Tab')}
        />

        <ProgressBar
          progress={0.4}
          color={colors.theme}
          style={styles.progress}
        />

        <View style={{marginTop: width * 0.02}}>
          <TitleSubTitle
            Title={t('WHAT_GENDER')}
            SubTitle={t(
              'Kindly select your gender below to proceed. Thank you.',
            )}
            textalign={'left'}
            pTop={hp(1)}
          />
        </View>

        <View style={styles.subcontainer}>
          <TouchableOpacity onPress={() => setSelectedGender(0)}>
            <View
              style={[
                styles.innerview,
                {
                  backgroundColor:
                    SelectedGender == 0 ? '#FFF8F2' : 'transparent',
                  borderColor: SelectedGender == 0 ? colors.theme : colors.line,
                },
              ]}>
              {SelectedGender == 0 ? (
                <SvgIcons.Roundarrow style={styles.Roundarrow} />
              ) : null}
              {SelectedGender == 0 ? <SvgIcons.MaleO /> : <SvgIcons.Male />}
 
              <FontText
                name={'poppins-medium'}
                size={normalize(16)}
                color={'violet'}
                pTop={hp(1)}
                style={{fontWeight: 'bold'}}>
                {t('MALE')}
              </FontText>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setSelectedGender(1)}>
            <View
              style={[
                styles.innerview1,
                {
                  backgroundColor:
                    SelectedGender == 1 ? '#FFF8F2' : 'transparent',
                  borderColor: SelectedGender == 1 ? colors.theme : colors.line,
                },
              ]}>
              {SelectedGender == 1 ? (
                <SvgIcons.Roundarrow style={styles.Roundarrow} />
              ) : null}
              {SelectedGender == 1 ? <SvgIcons.FemaleO /> : <SvgIcons.Female />}


              <FontText
                name={'poppins-medium'}
                size={normalize(16)}
                color={'violet'}
                pTop={hp(1)}
                style={{fontWeight: 'bold'}}>
                {t('FEMALE')}
              </FontText>
            </View>
          </TouchableOpacity>

          {/* <TouchableOpacity
            onPress={() => setSelectedGender(2)}
            style={{paddingTop: hp(1.5)}}>
            <View
              style={[
                styles.innerview1,
                {
                  backgroundColor:
                    SelectedGender == 2 ? '#FFF8F2' : 'transparent',
                  borderColor: SelectedGender == 2 ? colors.theme : colors.line,
                },
              ]}>
              {SelectedGender == 2 ? (
                <SvgIcons.Roundarrow style={styles.Roundarrow} />
              ) : null}
              {SelectedGender == 2 ? <SvgIcons.OtherO /> : <SvgIcons.Other />}
              <FontText
                name={'poppins-medium'}
                size={normalize(16)}
                color={'violet'}
                pTop={hp(1)}
                style={{fontWeight: 'bold'}}>
                {t('OTHER')}
              </FontText>
            </View>
          </TouchableOpacity> */}
        </View>
        <View style ={{flex:1,justifyContent:'flex-end'}}>        
          <BigButton title = {t('SUBMIT')} onClick ={() => UpdateUserData()} style ={{marginBottom : hp(2)}} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: wp(5),
  },
  progress: {
    marginHorizontal: wp(3),
    height: hp(1),
    borderRadius: 14,
  },
  subcontainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: hp(2),
    marginHorizontal: wp(3),
  },
  innerview: {
    paddingHorizontal: isX ? wp(5) : wp(4),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    height: width * 0.4,
    width: width * 0.4,
    borderRadius: 21,
  },
  innerview1: {
    paddingHorizontal: isX ? wp(5) : wp(4),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    height: width * 0.4,
    width: width * 0.4,
    borderColor: colors.line,
    borderRadius: 21,
  },
  Roundarrow: {
    position: 'absolute',
    right: width * 0.05,
    top: width * 0.05,
  },
});
export default Profilegender;
