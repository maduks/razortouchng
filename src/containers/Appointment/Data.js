import React, { Component, useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Platform,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import { hp, wp, normalize, isIOS, isX } from '../../styles/responsiveScreen';
import Tab from '../../Components/TopTabBar/tab';
import FontText from '../../Components/common/FontText';
import colors from '../../assets/color';
import CustomeCard from '../../Components/Card';
import ButtonTab from '../../Components/TopTabBar/buttontab';
import FloatingButton from '../../Components/common/FloatingButton';
import Material_Menu from '../../Components/common/Material_Menu/Material_Menu';
import { useTranslation } from 'react-i18next';
import { upComingData } from '../../Utils/data';

export const routeName = 'Appointment';

const screenWidth = Dimensions.get('window').width;

const Appointment_TopTab = ({ navigation }) => {
  const [tabTitle, setTabTitle] = useState('Upcoming');
  const [tabButton, setTabButton] = useState('Completed');
  const [PastCompleteBtn, setPastCompleteBtn] = useState(false);
  const [Open, setOpen] = useState(false);

  const renderItem = item => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('Appoinment_Detail', { Data: item.item })
        }>
        <CustomeCard tabTitle={tabTitle} item={item.item} />
      </TouchableOpacity>
    );
  };

  function MaterialMenu() {
    setOpen(!Open);
    return null;
  }
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <View>
        <FontText
          style={styles.titleTxt}
          size={22}
          name="Poppins-SemiBold"
          color="blackColor"
          lines={1}>
          {t('APPOI')}
        </FontText>
      </View>

      <View style={styles.lineSet}>
        <View style={styles.tabView}>
          <Tab
            title="Upcoming"
            isFocus={tabTitle === 'Upcoming' ? true : false}
            click={() => {
              setTabTitle('Upcoming');
              setPastCompleteBtn(false);
            }}
          />
          <Tab
            title="Past"
            isFocus={tabTitle === 'Past' ? true : false}
            click={() => {
              setTabTitle('Past');
              setPastCompleteBtn(true);
            }}
          />
          {/* <Tab
            title="Cancelled"
            isFocus={tabTitle === 'Cancelled' ? true : false}
            click={() => {
              setTabTitle('Cancelled');
              setPastCompleteBtn(false);
            }}
          /> */}
        </View>
        <View style={styles.bottomline}></View>
      </View>
      {/* Complete Button */}
      {PastCompleteBtn ? (
        <View>
          <View style={styles.buttontabview}>
            <ButtonTab
              title={t("COMPLETED")}
              tabButton={tabButton}
              isFocus={tabButton === 'Completed' ? true : false}
              click={() => {
                setTabButton('Completed');
              }}
            />
            <ButtonTab
              title={t("IN")}
              tabButton={tabButton}
              isFocus={tabButton === 'InDispute' ? true : false}
              click={() => {
                setTabButton('InDispute');
              }}
            />
          </View>
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
          </View>
        </View>
      ) : null}
      <FlatList
        data={upComingData}
        keyExtractor={(value, index) => index.toString()}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />

      {PastCompleteBtn ? (
        <View style={styles.floatinBtn}>
          <FloatingButton onPress={MaterialMenu} />
          <Material_Menu visible={Open} click={() => MaterialMenu()} />
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  tabView: {
    flexDirection: 'row',
    marginTop: 30,
  },
  titleTxt: {
    fontSize: normalize(24),
    marginTop: Platform.OS === 'ios' ? hp(10) : hp(3),
  },
  bottomline: {
    height: 1,
    width: '100%',
    backgroundColor: colors.tabBorderColor,
  },
  lineSet: {
    width: (screenWidth / 3 - 20) * 3,
  },
  buttontabview: {
    flexDirection: 'row',
    marginTop: hp(1),
  },
  floatinBtn: {
    position: 'absolute',
    right: 20,
    bottom: 20,
  },
  timedetail: {
    fontWeight: '500',
    marginLeft: 0,
  },
  iconview: {
    width: hp(2.5),
    height: hp(2.5),
  },
  filtericon: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginVertical: hp(1.5),
    marginRight: hp(0),
  },
});

export default Appointment_TopTab;
