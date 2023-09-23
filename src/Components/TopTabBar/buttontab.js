import * as React from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {hp, wp, normalize, isIOS, isX} from '../../styles/responsiveScreen';
import colors from '../../assets/color';

const widthx = Dimensions.get('screen').width;

const ButtonTab = props => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={props.click} activeOpacity={0.6}>
        {props.isFocus === true ? (
          <View
            style={
              props.tabButton == 'Completed'
                ? styles.completeview
                : styles.disputeview
            }>
            <Text style={styles.textHighlight}>{props.title}</Text>
          </View>
        ) : (
          <View
            style={
              props.tabButton == 'Completed' ? styles.normalleft : styles.normal
            }>
            <Text style={styles.txt}>{props.title}</Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    alignItems: 'center',
  },
  textHighlight: {
    color: colors.white,
    fontSize: normalize(16),
    fontWeight: '500',
    paddingVertical: hp(1),
  },
  completeview: {
    backgroundColor: colors.theme,
    height: hp(5),
    width: widthx / 2 - 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopStartRadius: hp(1),
    borderBottomStartRadius: hp(1),
  },
  disputeview: {
    backgroundColor: colors.theme,
    height: hp(5),
    width: widthx / 2 - 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopEndRadius: hp(1),
    borderBottomEndRadius: hp(1),
  },
  normal: {
    width: widthx / 2 - 20,
    alignItems: 'center',
    backgroundColor: colors.white,
    height: hp(5),
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: colors.lightViolet,
    borderBottomWidth: 0.5,
    borderTopWidth: 0.5,
    borderLeftWidth: 0.5,
    borderTopStartRadius: hp(1),
    borderBottomStartRadius: hp(1),
  },
  normalleft: {
    width: widthx / 2 - 20,
    alignItems: 'center',
    backgroundColor: colors.white,
    height: hp(5),
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: colors.lightViolet,
    borderBottomWidth: 0.5,
    borderTopWidth: 0.5,
    borderRightWidth: 0.5,
    borderTopEndRadius: hp(1),
    borderBottomEndRadius: hp(1),
  },
  centeraline: {
    alignItems: 'center',
  },
  txt: {
    fontSize: normalize(16),
    color: colors.topTabFontColor,
    opacity: 0.6,
    paddingVertical: hp(1),
  },
});
export default ButtonTab;
