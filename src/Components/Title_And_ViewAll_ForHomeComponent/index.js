import React from 'react';
import { useTranslation } from 'react-i18next';
import { View, Dimensions, TouchableOpacity } from 'react-native';
import colors from '../../assets/color';
import { hp, normalize } from '../../styles/responsiveScreen';
import FontText from '../common/FontText';

const { width, height } = Dimensions.get('screen');

const Title_And_ViewAll_ForHomeComponent = props => {
  const { t } = useTranslation();

  return (
    <View
      style={{
        height: height * 0.04,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: width * 0.9,
        alignSelf: 'center',
        marginLeft: 30,
      }}>
      <FontText
        size={normalize(13)}
        style={{ color: '#f54f49', fontWeight: 'bold' }}
        name={'poppins-medium'}>
        {props.Title}
      </FontText>

      <TouchableOpacity onPress={props.ViewAllPress}>
        {/* <FontText
          size={normalize(15)}
          color="lightViolet"
          name={'poppins-regular'}>
          {props.ViewAll ? t('VIEW_ALL') : ''}
        </FontText> */}
      </TouchableOpacity>
    </View>
  );
};

export default Title_And_ViewAll_ForHomeComponent;
