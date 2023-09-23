import React from 'react';
import {View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {normalize, hp, wp, isX, isAndroid} from '../../styles/responsiveScreen';
import colors from '../../assets/color';
import FontText from '../common/FontText';
import SvgIcons from '../../assets/SvgIcons';

const SettingComponents = props => {
  const {icon} = props;
  return (
    <TouchableOpacity
      style={[styles.accview, props.style]}
      activeOpacity={0.7}
      onPress={() => {
        props.onClick();
      }}>
      <View style={styles.iconview}>
        
          {icon}
       

        <View>
          <FontText
            size={normalize(18)}
            name={'poppins-medium'}
            color={props?.fontColor ? 'red' : 'black'}
            pLeft={ wp(2) }
            textAlign="left">
            {props.title}
          </FontText>

          {props?.subtitle ? (
            <View style={styles.row}>
              <FontText
                size={normalize(14)}
                name={'poppins-regular'}
                style={{color: '#8384A1'}}
                pLeft={wp(2)}
                textAlign="left">
                {props.subtitle}
              </FontText>
            </View>
          ) : null}
        </View>
        { props.Border ?  
        <View style = {{backgroundColor: colors['gray-light'],
    height: hp(0.3),}} />
 : null }
      </View>
    </TouchableOpacity>
  );
};

export default SettingComponents;

export const styles = StyleSheet.create({
  accview: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: wp(4),
    marginVertical: hp(2),
  },
  iconview: {
    flexDirection: 'row',
    // alignItems: 'center',
    justifyContent: 'center',
    // marginTop:hp(1)
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp(0.7),
  },
  img1: {
    height: wp(8),
    width: wp(8),
    resizeMode: 'contain',
  },
});
