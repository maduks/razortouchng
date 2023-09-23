



import React, { createRef, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { View, TouchableOpacity, Image, Dimensions, StyleSheet, FlatList } from 'react-native';
import { wp, hp, normalize } from '../../styles/responsiveScreen';
import colors from '../../assets/color';
import FontText from '../common/FontText';
import SvgIcons from '../../assets/SvgIcons';
import { Availability, Distance, salonServices } from '../../Utils/data';

const { width, height } = Dimensions.get('screen')


const DispatchRender = (item,index,ref) => {
    const {t} = useTranslation();
    const distanceRef = createRef();
const [Selected_Distance, setSelected_Distance] = useState(0);

   const _renderItem = (item,index ) => {
        
    return(
      <TouchableOpacity ref={ref}
        onPress={() => setSelected_Distance(index)}
        style={{
          width: width * 0.2,
          height: width * 0.12,
          backgroundColor:
            Selected_Distance == index ? '#FD883925' : 'transparent',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <FontText
          name={'poppins-regular'}
          size={normalize(14)}
          style={{
            color:
              Selected_Distance == index
                ? colors.theme
                : colors.black,
          }}>
          {item.text}
        </FontText>
      </TouchableOpacity>
    )
}

return(
    <View
    style={{
      flex: 1,
      marginTop: width * 0.02,
      paddingBottom: width * 0.04,
      borderBottomWidth: 1,
      borderColor: colors.gray50,
      marginBottom: Platform.OS == 'ios' ? width * 0.05 : width * 0.03,
    }}>
    <FontText
      name={'poppins-semibold'}
      size={normalize(16)}
      pLeft={width * 0.015}
      style={{color: colors.black}}>
      {t('Distance')}
    </FontText>

    <FlatList
      data={Distance} ref={ distanceRef}
      style={{
        borderWidth: 1,
        borderColor: colors.gray70,
        marginTop: width * 0.015,
        alignSelf: 'center',
        borderRadius: width * 0.02,
        width: width * 0.8,
      }}
      keyExtractor={(value, index) => index.toString()}
      scrollEnabled={false}
      horizontal={true}
      renderItem={({item, index}) => _renderItem(item,index)}
    />
  </View>
)
  }

  export default DispatchRender ;

  const styles = StyleSheet.create({

  })