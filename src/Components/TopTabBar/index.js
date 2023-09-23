import * as React from 'react';
import {
  Animated,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {hp, wp, normalize, isIOS, isX} from '../../styles/responsiveScreen';
import colors from '../../assets/color';

const widthx = Dimensions.get('screen').width;
const TopTabBar = props => {
  const [tabName, setTabName] = React.useState('tab1');

  // setTabName(props.userTabName);

  return (
    <View style={styles.container}>
      <View style={styles.btnview}>
        <TouchableOpacity onPress={props.click}>
          {tabName === 'tab1' ? (
            <View style={styles.centeraline}>
              <Text style={styles.textHighlight}>Upcomming</Text>
              <View style={{alignItems: 'flex-start'}}>
                <View style={styles.line}></View>
              </View>
            </View>
          ) : (
            <View style={{width: widthx / 3, alignItems: 'center'}}>
              <Text style={styles.txtcenter}>Upcomming</Text>
            </View>
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}}>
          {tabName === 'tab2' ? (
            <View style={styles.centeraline}>
              <Text style={styles.textHighlight}>Past</Text>
              <View style={{alignItems: 'center'}}>
                <View style={styles.line}></View>
              </View>
            </View>
          ) : (
            <View style={{width: widthx / 3, alignItems: 'center'}}>
              <Text style={styles.txtcenter}>Past</Text>
            </View>
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}}>
          {tabName === 'tab3' ? (
            <View style={styles.centeraline}>
              <Text style={styles.textHighlight}>Cancelled</Text>
              <View style={{alignItems: 'flex-end'}}>
                <View style={styles.line}></View>
              </View>
            </View>
          ) : (
            <View style={{width: widthx / 3, alignItems: 'center'}}>
              <Text style={styles.txtcenter}>Cancelled</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
      <View></View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    marginTop: 50,
    height: hp(5),
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnview: {
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  textHighlight: {
    color: 'yellow',
  },
  line: {
    backgroundColor: 'black',
    height: 4,
    marginTop: hp(2),
    width: widthx / 3,
  },
  centeraline: {
    alignItems: 'center',
  },
  txtcenter: {
    alignItems: 'center',
  },
});
export default TopTabBar;
