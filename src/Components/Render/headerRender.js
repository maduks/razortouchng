import React from 'react';
import { useTranslation } from 'react-i18next';
import { View,TouchableOpacity,Image, Dimensions,StyleSheet } from 'react-native';
import { wp,hp,normalize } from '../../styles/responsiveScreen';
import colors from '../../assets/color';
import FontText from '../common/FontText';

const {width,height} = Dimensions.get('screen')

const RenderHeader = (props) => 
{

    const {onRenderHeader,onPress,Title} = props;
const {t} = useTranslation;

    return (
    <View style={styles.FilterMainView}>
      <View style={{flex: 1}} />

      <View style={{flex: 1}}>
        <FontText
          name={'poppins-semibold'}
          size={normalize(20)}
          style={{color: colors.black}}>
          {Title}
        </FontText>
      </View>

      <TouchableOpacity
        onPress={onPress}
        style={[styles.Image, {marginRight: width * 0.05}]}>
        <Image
          source={require('../../assets/images/Cross.png')}
          resizeMode="contain"
          style={[styles.Image]}
        />
      </TouchableOpacity>
    </View>
  )
}

export default RenderHeader;



const styles =  StyleSheet.create({
    FilterMainView: {
        flexDirection: 'row',
        width: width,
        paddingTop: width * 0.07,
      },
      Image: {
        width: width * 0.07,
        height: width * 0.07,
      },
})