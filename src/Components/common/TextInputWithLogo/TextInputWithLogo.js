import React from 'react';
import {useTranslation} from 'react-i18next';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Image,
  I18nManager,
} from 'react-native';
import colors from '../../../assets/color';

const {width, height} = Dimensions.get('screen');

const TextInputWithLogo = props => {
  const {t} = useTranslation();

  return (
    <View style={[styles.Box, props.ContainerStyle]}>
      {props.BackPress ? (
        <TouchableOpacity
          style={{
            height: '80%',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={props.BackPress}>
          <Image
            source={require('../../../assets/images/BackBtn.png')}
            resizeMode="contain"
            style={{
              width: width * 0.05,
              height: width * 0.05,
              marginLeft: 10,
              tintColor: colors.gray70,
            }}
          />
        </TouchableOpacity>
      ) : null}

      <TouchableOpacity
        onPress={props.FullPress}
        style={{
          flex: 1,
        }}>
        <TextInput
          placeholder={
            props.PlaceHolder
              ? props.PlaceHolder
              : t('SEARCH_LOCATION')
          }
          style={{
            textAlign: I18nManager.isRTL ? 'right' : 'left',
            height: width * 0.1,
            paddingLeft: 10,
          }}
          onFocus={props.onFocus}
        />
      </TouchableOpacity>

      {props.logo ? (
        <TouchableOpacity onPress={props.navigation}>
          <Image
            source={require('../../../assets/images/Search.png')}
            style={{
              width: 25,
              height: 25,
              tintColor: colors.gray,
              marginRight: props.filter ? 0 : 15,
            }}
          />
        </TouchableOpacity>
      ) : null}

      {props.filter ? (
        <TouchableOpacity onPress={props.filterPressed}>
          <Image
            source={require('../../../assets/images/FilterIcon.png')}
            style={{
              width: 25,
              height: 25,
              marginHorizontal: 15,
            }}
          />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default TextInputWithLogo;

const styles = StyleSheet.create({
  Box: {
    height: width * 0.12,
    marginTop: 10,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.viewcolor,
  },
});
