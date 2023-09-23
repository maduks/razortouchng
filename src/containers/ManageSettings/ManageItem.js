//import liraries
import React, { useState } from 'react';
import colors from '../../assets/color';
import {
  View,
  StyleSheet,
  Switch,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import FontText from '../../Components/common/FontText';
import { hp, wp, normalize } from '../../styles/responsiveScreen';
import { useTranslation } from 'react-i18next';

const { width, height } = Dimensions.get('screen');

// create a component
const ManageItem = props => {
  const { t } = useTranslation();
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const { item, icon, index, onItemPress } = props;
  return (
    <TouchableOpacity
      onPress={onItemPress}
      style={[styles.container, index == 5 && { borderBottomWidth: 0 }]}>
      <View
        style={styles.icon}>
        {icon}
      </View>
      <View style={styles.mainview}>
        <FontText
          size={normalize(18)}
          name={'poppins-medium'}
          style={styles.name}>
          {t(item.name)}
        </FontText>
        <FontText
          size={normalize(14)}
          color={'lightViolet'}
          name={'poppins-regular'}
          style={styles.info}>
          {t(item.info)}
        </FontText>
      </View>
      {item.name == 'NOTI' ? (
        <View
          style={styles.switch}>
          <Switch
            trackColor={{ false: '#ddd', true: colors.theme }}
            thumbColor={isEnabled ? colors.white : colors.white}
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
      ) : null}
    </TouchableOpacity>
  );
};

// define your styles
const styles = StyleSheet.create({
  toggle: { marginHorizontal: wp(10), marginTop: hp(1) },
  container: {
    flexDirection: 'row',
    borderBottomColor: colors.lightViolet,
    borderBottomWidth: 0.5,
    marginTop: hp(1),
  },
  name: {
    marginTop: hp(1.4),
  },
  info: {
    marginBottom: hp(1.6),
  },
  icon: {
    paddingVertical: hp(1.5),
    paddingHorizontal: wp(2),
    marginHorizontal: wp(4),
    marginTop: hp(0.5),
  },
  switch: {
    position: 'absolute',
    right: width * 0.05,
    top: width * 0.02,
  }
});

//make this component available to the app
export default ManageItem;
