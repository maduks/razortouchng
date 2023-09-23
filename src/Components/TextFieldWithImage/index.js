//import liraries
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  Platform,
  Dimensions,
  TouchableOpacity,
  I18nManager,
} from 'react-native';
import colors from '../../assets/color';
import SvgIcons from '../../assets/SvgIcons';
import {hp, wp, normalize, isIOS, isX} from '../../styles/responsiveScreen';
import FontText from '../common/FontText';

const {width, height} = Dimensions.get('screen');

// create a component
const TextFieldWithImage = React.forwardRef((props, ref) => {
  const {
    Title,
    placeholder,
    textalign,
    value,
    onChangeText,
    TextFieldImage,
    secureTextEntry,
    returnKeyType,
    onSubmitEditing,
    redColor,
    onBlur,
    rightimage,
    onPressRight,
  } = props;

  return (
    <View
      style={[
        styles.container,
        {borderColor: redColor ? '#ff0000' : colors.borderColor},
      ]}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        <Image
          source={TextFieldImage}
          resizeMode="contain"
          style={[
            styles.textFieldImage,
            {tintColor: redColor ? '#ff0000' : colors.black},
          ]}
        />
        <View style={styles.Devider}></View>
      </View>

      <View style={styles.textFieldView}>
        <FontText
          textAlign={textalign}
          style={styles.text}
          size={12}
          name="poppins-regular"
          color="lightViolet">
          {Title}
        </FontText>

        <TextInput
          ref={ref}
          label={Title}
          placeholder={placeholder}
          style={{
            textAlign: I18nManager.isRTL ? 'right' : 'left',
            width: '100%',
            fontFamily: 'poppins-regular',
            fontWeight: '500',
            fontSize: normalize(16),
          }}
          onSubmitEditing={onSubmitEditing}
          onBlur={onBlur}
          value={value}
          onChangeText={onChangeText}
          placeholderTextColor={Platform.OS == 'android' ? colors.gray50 : null}
          secureTextEntry={secureTextEntry}
          returnKeyType={returnKeyType}
        />
      </View>

      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        <TouchableOpacity onPress={onPressRight} activeOpacity={0.7}>
          <Image
            source={rightimage}
            resizeMode="cover"
            style={styles.rightImage}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
});

// define your styles
const styles = StyleSheet.create({
  container: {
    borderRadius: wp(3),
    borderWidth: 0.5,
    flexDirection: 'row',
    marginHorizontal: wp(3),
    alignItems: 'center',
    height: width * 0.18,
  },
  Devider: {
    height: height * 0.06,
    paddingVertical: hp(1),
    width: 1,
    backgroundColor: colors.borderColor,
  },
  textFieldImage: {
    height: width * 0.075,
    width: width * 0.08,
    marginHorizontal: hp(2.5),
    marginVertical: hp(2),
  },
  textFieldView: {
    marginHorizontal: wp(3),
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    height: width * 0.12,
  },
  text: {
    fontWeight: '500',
  },
  txtinput: {
    width: '100%',
    fontFamily: 'poppins-regular',
    fontWeight: 'bold',
    fontSize: normalize(16),
  },
  rightImage: {
    width: wp(6.5),
    height: hp(3),
    marginRight: wp(3.5),
    marginTop: hp(0.5),
    opacity: 0.3,
    tintColor: colors.black,
  },
});

export default TextFieldWithImage;
