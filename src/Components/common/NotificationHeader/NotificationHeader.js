import React from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import SvgIcons from '../../../assets/SvgIcons';
import {normalize, wp} from '../../../styles/responsiveScreen';
import FontText from '../FontText';
import colors from '../../../assets/color';

const {width, height} = Dimensions.get('screen');

const NotificationHeader = props => {
  const {searchStyle,style} = props
  return (
    <View style={[styles.Container, props.ContainerStyle]}>
      <View style={[styles.MainView, style]}>
        <TouchableOpacity onPress={props.navigation}>
          <SvgIcons.arrow />
        </TouchableOpacity>

        <FontText name={'poppins-semibold'} size={normalize(18)}>
          {props.Name}
        </FontText>
      </View>

      <TouchableOpacity style ={{width:'10%'}} activeOpacity={0.7}>
      {props.search ? (
        <Image
          source={require('../../../assets/images/Search.png')}
          resizeMode="contain"
          style={[styles.Search,searchStyle]}
        />
      ) : null}
      </TouchableOpacity>

<TouchableOpacity style ={{width:'5%'}} activeOpacity={0.7}>
      {props.icon ? (
        <Image
          source={require('../../../assets/images/VerticalIcon.png')}
          resizeMode="contain"
          style={styles.Image}
        />
      ) : null}
      </TouchableOpacity>
    </View>
  );
};

export default NotificationHeader;

const styles = StyleSheet.create({
  Container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: width * 0.05,
    height: width * 0.15,
    backgroundColor: colors.white,
  },
  Image: {width: width * 0.07, height: width * 0.052},
  MainView: {
    flexDirection: 'row',
    alignItems: 'center',
    // width: '40%',
    justifyContent: 'space-between',
  },
  Search:{width: width * 0.06, height: width * 0.052,marginLeft:wp(20)}
});
