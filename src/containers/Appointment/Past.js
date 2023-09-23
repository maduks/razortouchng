import React, { useEffect, useRef, useState } from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import FontText from '../../Components/common/FontText';
import ButtonTab from '../../Components/TopTabBar/buttontab';
import { hp, normalize } from '../../styles/responsiveScreen';
import SvgIcons from '../../assets/SvgIcons';
import FloatingButton from '../../Components/common/FloatingButton';
import Material_Menu from '../../Components/common/Material_Menu/Material_Menu';
import { useIsFocused } from '@react-navigation/core';
import { useTranslation } from 'react-i18next';
import colors from '../../assets/color';
import CustomeCard from '../../Components/Card';
import { upComingData } from '../../Utils/data';

const { width, height } = Dimensions.get('screen');

const Past = props => {
  const FlatListRef = useRef();
  const { t } = useTranslation();
  const [tabButton, setTabButton] = useState('Completed');
  const [Open, setOpen] = useState(false);
  function MaterialMenu() {
    setOpen(!Open);
    return null;
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.MainView}>
        <View style={styles.buttontabview}>
          <ButtonTab
            title={t('COMPLETED')}
            tabButton={tabButton}
            isFocus={tabButton === 'Completed' ? true : false}
            click={() => {
              setTabButton('Completed');
            }}
          />
          <ButtonTab
            title={t('IN')}
            tabButton={tabButton}
            isFocus={tabButton === 'InDispute' ? true : false}
            click={() => {
              setTabButton('InDispute');
            }}
          />
        </View>
        {tabButton === 'InDispute' ? null : (
          <View style={styles.filtericon}>
            <Image
              source={require('../../assets/images/filter-edit.png')}
              style={styles.iconview}
            />
            <FontText
              style={styles.timedetail}
              size={normalize(14)}
              name="Poppins-Regular"
              color="lightViolet"
              lines={1}>
              {t('FILTER')}
            </FontText>
          </View>)}
        <FlatList
          ref={FlatListRef}
          data={upComingData}
          style={tabButton === 'InDispute' ? { marginVertical: hp(2) } : { marginVertical: 0 }}
          keyExtractor={(value, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => <CustomeCard tabTitle='Past' image={item.image} salonName={item.salonName} apointmentDate={item.apointmentDate} salonAddress={item.salonAddress}
            apointmentTime={item.apointmentTime} alocateTime={item.alocateTime} serviceCount={item.serviceCount} serviceTitle={item.serviceTitle}
            onPress={() => props.navigation.navigate('Appoinment_Detail', { bool: 2, data: item })}
          />}
        />
      </View>
      {tabButton === 'InDispute' ? null : (
        <View style={styles.floatinBtn}>
          <FloatingButton onPress={MaterialMenu} />
          <Material_Menu visible={Open} click={() => MaterialMenu()} />
        </View>
      )}
    </SafeAreaView>
  );
};

export default Past;

const styles = StyleSheet.create({
  MainView: { flex: 1, backgroundColor: colors.white },
  CompletMainView: {
    borderWidth: 1,
    flexDirection: 'row',
    margin: 10,
    borderWidth: 1,
    borderColor: '#8384A150',
    borderRadius: 10,
    overflow: 'hidden',
  },
  timedetail: {
    fontWeight: '500',
    marginLeft: 5,
  },
  floatinBtn: {
    position: 'absolute',
    right: 20,
    bottom: 20,
  },
  buttontabview: {
    flexDirection: 'row',
    marginTop: hp(1),
    alignSelf: 'center',
  },
  filtericon: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginVertical: hp(1.5),
    marginRight: hp(2.5),
  },
  iconview: {
    width: hp(2.5),
    height: hp(2.5),
  },
});
