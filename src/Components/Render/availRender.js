import React, { createRef, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { View, TouchableOpacity, Image, Dimensions, StyleSheet, FlatList } from 'react-native';
import { wp, hp, normalize } from '../../styles/responsiveScreen';
import colors from '../../assets/color';
import FontText from '../common/FontText';
import SvgIcons from '../../assets/SvgIcons';
import { Availability, salonServices } from '../../Utils/data';

const { width, height } = Dimensions.get('screen')

const AvailabilityRender = (item, index, ref) => {

    const availabilityRef = createRef();
    const [Select_Availability, setSelect_Availability] = useState(0);
    const {t} = useTranslation();
    const _renderItem = (item,index) => {
        return (
            <View ref={ref}>
                <TouchableOpacity
                    onPress={() => setSelect_Availability(index)}
                    style={[styles.press,{  backgroundColor:
                        Select_Availability == index
                            ? '#FD883925'
                            : 'transparent',}]}>
                    <FontText
                        name={'poppins-regular'}
                        size={normalize(14)}
                        style={{
                            color:
                                Select_Availability == index
                                    ? colors.theme
                                    : colors.black,
                        }}>
                        {item.text}
                    </FontText>
                </TouchableOpacity>
            </View>
        )
    }

    return(
        <View
        style={styles.mainView}>
        <FontText
          name={'poppins-semibold'}
          size={normalize(16)}
          pLeft={width * 0.015}
          style={{color: colors.black}}>
          {t('Availability')}
        </FontText>

        <FlatList
          data={Availability} ref={availabilityRef}
          style={styles.flat}
          keyExtractor={(value, index) => index.toString()}
          scrollEnabled={false}
          horizontal={true}
          renderItem={({item, index}) => _renderItem(item,index)}
        />
      </View>
    )
}


export default AvailabilityRender;

const styles = StyleSheet.create({
mainView:{
    flex: 1,
    marginTop: width * 0.02,
    borderBottomWidth: 1,
    borderColor: colors.gray50,
    paddingBottom: width * 0.04,
  },
  press:{
    width: width * 0.27,
    height: width * 0.12,
  
    alignItems: 'center',
    justifyContent: 'center',
},
flat:{
    borderWidth: 1,
    borderColor: colors.gray50,
    marginTop: width * 0.015,
    alignSelf: 'center',
    borderRadius: width * 0.02,
    width: width * 0.8,
  }
})