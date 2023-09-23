import React, { createRef, useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  FlatList,
  Image,
  TouchableOpacity,
  Platform,
  ScrollView,
  Keyboard,
  KeyboardAvoidingView,
} from 'react-native';
import FontText from './common/FontText';
import { normalize } from '../styles/responsiveScreen';
import DropDownPicker from 'react-native-dropdown-picker';
import { useTranslation } from 'react-i18next';
import colors from '../assets/color';
import RenderHeader from './Render/headerRender';
import SalonRender from './Render/salonRender';
import ServiceRender from './Render/serviceRender';
import RatingRender from './Render/ratingRender';
import AvailabilityRender from './Render/availRender';
import DispatchRender from './Render/dispatchRender';

const { width, height } = Dimensions.get('screen')

const FilterCustomeRender = (props, ref) => {
  const { t } = useTranslation();

  const [Filter_Apply, setFilter_Apply] = useState(true);

  // Drop Down
  const [DropDown_open, setDropDown_Open] = useState(false);
  const [DropDown_value, setDropDown_value] = useState(null);
  const [DropDown_items, setDropDown_Items] = useState([
    { label: t('Men'), value: 'Men' },
    { label: t('Women'), value: 'Women' },
    { label: t('Others'), value: 'Others' },
  ]);

  return (
    <View style={styles.Container}>
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        {/* Sort By and Nearest */}
        <View style={styles.FilterHeaderMainView}   >

          <View style={styles.SortBy}>
            <Image
              source={require('../assets/images/sort.png')}
              resizeMode="contain"
              style={[styles.Image]}
            />
            <FontText
              name={'poppins-medium'}
              size={normalize(16)}
              pLeft={width * 0.015}
              style={{ color: colors.black }}>
              {t('Sort by')}
            </FontText>
          </View>

          <View style={[styles.SortBy, { flex: 2.5 }]}>
            <DropDownPicker
              open={DropDown_open}
              value={DropDown_value}
              items={DropDown_items}
              setOpen={i => {
                setDropDown_Open(i);
                Keyboard.dismiss();
              }}
              setValue={setDropDown_value}
              setItems={setDropDown_Items}
              placeholder={t('Nearest')}
              placeholderStyle={{
                fontSize: normalize(16),
                fontFamily: 'poppins-regular',
              }}
              containerStyle={Platform.OS == 'ios' && { zIndex: 100 }}
              textStyle={{ fontSize: normalize(16) }}
            />
          </View>
        </View>

        {/* Salon type */}
        <SalonRender />

        {/* Services */}
        <ServiceRender />

        {/* Ratings */}
        <RatingRender />

        {/*  Availability */}
        <AvailabilityRender />

        {/*  Distance */}
        <DispatchRender />

      </ScrollView>

      <View style={styles.FilterApplyMainView}>

        <TouchableOpacity
          onPress={() => {
            setFilter_Apply(!Filter_Apply);
            props.clear()
          }}
          style={[
            styles.FilterApplySubView,
            { backgroundColor: !Filter_Apply ? colors.theme : null },
          ]}>
          <Text
            style={[
              styles.FilterApplyText,
              { color: !Filter_Apply ? colors.white : colors.black },
            ]}>
            {t('Clear All')}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            setFilter_Apply(!Filter_Apply);
            props.apply()
          }}
          style={[
            styles.FilterApplySubView,
            { backgroundColor: Filter_Apply ? colors.theme : null },
          ]}>
          <Text
            style={[
              styles.FilterApplyText,
              { color: Filter_Apply ? colors.white : colors.black },
            ]}>
            {t('Apply')}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const CommonRender = (props, fref) => {
  const { crossPress, headerTitle, Header, modelClose, filterView } = props;

  return (
    <View style={{ flex: 1 }}>
      {Header ? <RenderHeader Title={headerTitle} onPress={crossPress} /> : null}
      {filterView ? <FilterCustomeRender clear={crossPress} apply={crossPress} /> : null}
    </View>
  )
}



export default CommonRender;

const styles = StyleSheet.create({
  Image: {
    width: width * 0.07,
    height: width * 0.07,
  },
  Container: {
    backgroundColor: colors.white,
    width: width,
    paddingHorizontal: 20,
    flex: 1,
  },
  SortBy: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    flex: 1,
    height: width * 0.1,
  },
  FilterHeaderMainView: {
    flex: 1,
    flexDirection: 'row',
    marginVertical: width * 0.05,
  },
  FilterApplyMainView: {
    width: width * 0.95,
    height: width * 0.17,
    marginHorizontal: -20,
    marginBottom: Platform.OS == 'ios' ? width * 0.05 : width * 0.03,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  FilterApplySubView: {
    alignItems: 'center',
    justifyContent: 'center',
    height: width * 0.14,
    borderRadius: width * 0.05,
    width: width * 0.46,
  },
  FilterApplyText: {
    fontFamily: 'poppins-medium',
    fontSize: normalize(18),
  },
})