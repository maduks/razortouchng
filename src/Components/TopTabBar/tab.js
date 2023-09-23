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

const Tab = props => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={props.click} activeOpacity={0.6}>
        {props.isFocus === true ? (
          <View style={styles.centeraline}>
            <Text style={styles.textHighlight}>{props.title}</Text>
            <View style={styles.line}></View>
          </View>
        ) : (
          <View style={{width: widthx / 3 - 20, alignItems: 'center'}}>
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
    color: colors.theme,
    fontSize: normalize(16),
  },
  line: {
    backgroundColor: colors.theme,
    height: 4,
    marginTop: hp(1),
    width: widthx / 3 - 20,
    borderTopEndRadius: 6,
    borderTopStartRadius: 6,
  },
  centeraline: {
    alignItems: 'center',
  },
  txt: {
    fontSize: normalize(16),
    color: colors.topTabFontColor,
    opacity: 0.6,
  },
});
export default Tab;
